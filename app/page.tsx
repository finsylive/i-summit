// app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";

import HomePage        from "./home/page";
import AssociationPage from "./association/page";
import ProgramsPage    from "./programs/page";
import IdeathonPage    from "./ideathon/page";
import RoadmapPage     from "./RoadMap/page";
import RewardsPage     from "./rewards/page";

// Utility: clamp a number between min/max
const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(v, min), max);

// Intro overlay component
function IntroOverlay({ progress }: { progress: MotionValue<number> }) {
  const [locked, setLocked] = useState(true);

  // 1. Unlock (and unmount) when progress ≥ 1
  useEffect(() => {
    const unsub = progress.onChange((v) => {
      if (v >= 1 && locked) setLocked(false);
    });
    return unsub;
  }, [progress, locked]);

  // 2. Disable native page scroll while locked
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  // 3. Wheel handler drives our progress 0→1
  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!locked) return;
      e.preventDefault();
      const delta = e.deltaY * 0.0025; // tweak sensitivity here
      progress.set(clamp(progress.get() + delta, 0, 1));
    },
    [locked, progress]
  );

  // 4. Derived animations
  const galaxyScale    = useTransform(progress, [0, 1],      [1,   1.6]);
  const galaxyOpacity  = useTransform(progress, [0, 0.7, 1], [1,   1,   0]);
  const hintOpacity    = useTransform(progress, [0, 0.3],    [1,   0]);
  const hintY          = useTransform(progress, [0, 1],      [0,  -30]);

  return (
    <AnimatePresence>
      {locked && (
        <motion.div
          key="intro"
          onWheel={onWheel}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="fixed inset-0 z-50"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Galaxy BG */}
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/galaxy.jpg')",
              scale: galaxyScale,
              opacity: galaxyOpacity,
              willChange: "transform, opacity",
            }}
          />

          {/* Bottom gradient */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black"
            style={{ opacity: galaxyOpacity }}
          />

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-16 w-full text-center text-white uppercase tracking-wider select-none"
            style={{
              opacity: hintOpacity,
              y: hintY,
              willChange: "transform, opacity",
            }}
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main App component
export default function App() {
  // single motion value driving both intro + content
  const progress = useMotionValue(0);

  // Content lifts & fades in as progress goes 0.4 → 1
  const contentY       = useTransform(progress, [0.4, 1],   [100,   0]);
  const contentOpacity = useTransform(progress, [0.4, 0.8], [0,     1]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* ① Galaxy intro */}
      <IntroOverlay progress={progress} />

      {/* ② Main content */}
      <motion.main
        className="relative z-10"
        style={{
          y:        contentY,
          opacity:  contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <HomePage />
        <AssociationPage />
        <ProgramsPage />
        <IdeathonPage />
        <RoadmapPage />
        <RewardsPage />
      </motion.main>
    </div>
  );
}
