// app/roadmap/page.tsx
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Zen_Dots } from "next/font/google";

// ----------- FONT ------------
const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

// ----------- STARFIELD ------------
type Star = { top: number; left: number; size: number; delay: number; glow: boolean };
function generateStars(count = 150): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.6,
    delay: Math.random() * 5,
    glow: Math.random() < 0.25,
  }));
}

// ----------- ROADMAP DATA ------------
const roadmap = [
  { title: "Phase 1 — Ideation",  desc: "Market research, vision setting, early mock-ups.",                     img: "/roadmap/phase1.png" },
  { title: "Phase 2 — Prototype", desc: "Clickable Figma prototype & core tech spike.",                         img: "/roadmap/phase2.png" },
  { title: "Phase 3 — MVP Launch",desc: "Beta release to early adopters, feedback loops begin.",               img: "/roadmap/phase3.png" },
  { title: "Phase 4 — Scale",     desc: "Infra hardening, performance, growth loops, partnerships.",           img: "/roadmap/phase4.png" },
];

// -------------------------------- PAGE --------------------------------
export default function RoadmapPage() {
  // ★ Stars
  const [stars, setStars] = useState<Star[]>([]);
  useLayoutEffect(() => setStars(generateStars()), []);

  // ★ Section height
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  useLayoutEffect(() => {
    if (containerRef.current) {
      setSectionHeight(containerRef.current.offsetHeight);
    }
  }, []);

  // ★ Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ★ Meteor settings
  const HEAD_SIZE = 24;   // px
  const FLAME_LEN = 100;  // px (now longer)

  const tailScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const meteorY    = useTransform(scrollYProgress, v => v * Math.max(sectionHeight - HEAD_SIZE, 0));
  const burnY      = useTransform(scrollYProgress, v => v * Math.max(sectionHeight - HEAD_SIZE, 0) - FLAME_LEN);

  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-gradient-to-b from-[#002429] via-[#00353b] to-[#004d59]">
      {/* Starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" suppressHydrationWarning>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              background: s.glow
                ? "radial-gradient(circle, #ffffff 0%, #ffffff 60%, transparent 100%)"
                : "#ffffff",
              boxShadow: s.glow ? "0 0 6px 2px rgba(255,255,255,0.9)" : "none",
              opacity: s.glow ? 1 : 0.8,
            }}
          />
        ))}
      </div>

      {/* Tiny background meteors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-10 left-10 opacity-70 blur-sm" />
        <div className="animate-meteor-delay absolute w-1 h-1 bg-yellow-400 rounded-full top-1/3 right-1/4 opacity-60 blur-sm" />
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-2/3 left-1/3 opacity-80 blur-sm" />
      </div>

      {/* Roadmap */}
      <section ref={containerRef} className="relative container mx-auto px-4 pt-32 pb-24">
        {/* Long tail */}
        <motion.div
          style={{ scaleY: tailScaleY, transformOrigin: "top" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] transform-gpu rounded-full pointer-events-none bg-[linear-gradient(180deg,transparent_0%,#b3e5ff_30%,#ffffff_70%,transparent_100%)] shadow-[0_0_12px_2px_rgba(179,229,255,0.8)]"
        />

        {/* Meteor + Flame group */}
        <motion.div
          style={{ y: meteorY }}
          className="absolute left-1/2 -translate-x-1/2 transform-gpu pointer-events-none"
        >
          {/* 🔥 Shiny Flame */}
          <motion.div
            style={{ y: burnY }}
            className="w-[8px] h-[100px] -translate-y-[100px] rounded-full blur-lg transform-gpu pointer-events-none bg-[linear-gradient(180deg,transparent_0%,rgba(179,229,255,0.6)_20%,#ffffff_100%)] shadow-[0_0_30px_15px_rgba(179,229,255,0.9)] animate-flame"
          />
          {/* ☄️ Meteor Head */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white via-blue-200 to-blue-500 shadow-[0_0_20px_6px_rgba(179,229,255,0.9)]" />
        </motion.div>

        <h1 className={`${zenDots.className} mb-20 text-center text-5xl md:text-6xl font-extrabold`}>
          Product&nbsp;Roadmap
        </h1>

        <div className="flex flex-col gap-36">
          {roadmap.map((step, idx) => (
            <RoadmapCard key={idx} {...step} flip={idx % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes meteor {
          0%   { transform: translate(0,0) scale(1); opacity: 0.8; }
          100% { transform: translate(300px,600px) scale(0.4); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.8); }
        }
        @keyframes flame {
          0%,100% { opacity: 0.75; transform: scaleX(1); }
          50%     { opacity: 1;    transform: scaleX(1.3); }
        }
        .animate-meteor        { animation: meteor 5s linear infinite; }
        .animate-meteor-delay  { animation: meteor 6s linear infinite 2s; }
        .animate-twinkle       { animation: twinkle 4s ease-in-out infinite; }
        .animate-flame         { animation: flame 1s ease-in-out infinite; }
      `}</style>
    </main>
  );
}

// ---------------------- CARD ----------------------
type CardProps = { title: string; desc: string; img: string; flip?: boolean };
function RoadmapCard({ title, desc, img, flip = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.4 }}
      className={`relative flex flex-col md:flex-row items-center gap-10 ${flip ? "md:flex-row-reverse" : ""}`}
    >
      <motion.div style={{ y: yImg }} className="w-full md:w-1/2">
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl shadow-lg">
          <Image src={img} alt={title} fill className="object-cover" />
        </div>
      </motion.div>

      <div className="w-full md:w-1/2">
        <h2 className={`${zenDots.className} mb-4 text-3xl md:text-4xl font-bold`}>{title}</h2>
        <p className="text-lg leading-relaxed text-gray-200" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>

      <span className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-ml-2.5 w-5 h-5 rounded-full bg-blue-400 border-4 border-[#00353b] shadow-[0_0_8px_2px_rgba(179,229,255,0.8)]" />
    </motion.div>
  );
}
