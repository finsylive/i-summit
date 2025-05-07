// app/home/page.tsx
"use client";

import Image from "next/image";
import { Zen_Dots } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

/* ---------- STARFIELD ---------- */
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

export default function HomePage() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => setStars(generateStars()), []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#002429] via-[#00353b] to-[#004d59] text-white overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" suppressHydrationWarning>
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

      {/* Meteors (tiny + burning) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-10 left-10 opacity-70 blur-sm" />
        <div className="animate-meteor-delay absolute w-1 h-1 bg-yellow-400 rounded-full top-20 left-1/2 opacity-60 blur-sm" />
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-1/3 right-10 opacity-80 blur-sm" />
        <div className="meteor-burning absolute" />
      </div>

      {/* ---- Main content (margin reduced) ---- */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-24 right-6 md:right-12 text-center"
        >
          <p className="text-sm md:text-base mb-2">Platform Partner</p>
          <Image
            src="/partner-logo.png"
            alt="Partner Logo"
            width={200}
            height={60}
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center mt-8"
        >
          <motion.div
            className="w-72 h-72 md:w-80 md:h-80 relative mb-6"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/ai-head.png"
              alt="AI Head Logo"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <p className={`${zenDots.className} text-sm tracking-widest mb-1`}>
            IIT MADRAS PAN BS
          </p>
          <h1
            className={`${zenDots.className} relative text-6xl md:text-8xl font-extrabold tracking-wide text-center mb-2 overflow-hidden`}
          >
            <span className="relative z-10">I-Summit &apos;25</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </h1>
          <p className={`${zenDots.className} text-sm md:text-base mb-4`}>
            11th – 30th May
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`${zenDots.className} text-xl mb-8`}
          >
            Collaborate. Create. Conquer.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all"
          >
            Register Here
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, repeat: Infinity, duration: 3 }}
            className="mt-16 flex flex-col items-center"
          >
            <span className="text-xs tracking-wider mb-1">SCROLL</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Global keyframes & styles */}
      <style jsx global>{`
        @keyframes meteor {
          0% { transform: translate(0,0) scale(1); opacity: 0.8; }
          100% { transform: translate(300px,600px) scale(0.5); opacity: 0; }
        }
        @keyframes meteorBurn {
          0%   { transform: translate(-200px,-200px) scale(0.9) rotate(45deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate(400px,600px) scale(0.3) rotate(45deg); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.8); }
        }
        .animate-meteor        { animation: meteor 5s linear infinite; }
        .animate-meteor-delay  { animation: meteor 6s linear infinite 2s; }
        .animate-twinkle       { animation: twinkle 4s ease-in-out infinite; }
        .meteor-burning {
          top: 20%;
          left: -10%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, #c3e7ff 60%, #5bbcff 100%);
          filter: blur(0.4px);
          box-shadow: 0 0 10px 4px #a8e1ff, 0 0 18px 6px #69c0ff;
          animation: meteorBurn 6s linear infinite;
        }
        .meteor-burning::before {
          content: \"\";
          position: absolute;
          right: 50%;
          top: 50%;
          transform: translate(50%, -50%) rotate(45deg);
          width: 200px;
          height: 5px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.9) 0%,
            rgba(155,215,255,0.85) 35%,
            rgba(0,0,0,0) 100%
          );
          filter: blur(4px);
        }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}
