"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zen_Dots } from "next/font/google";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

type Star = { top: number; left: number; size: number; delay: number; glow: boolean };
function generateStars(count = 100): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    delay: Math.random() * 5,
    glow: Math.random() < 0.3,
  }));
}

const topics = [
  "Smart Agriculture & Water Sustainability",
  "Renewable Energy Optimization",
  "AI in Sports Analytics",
  "Space Debris Management",
  "Rural Development",
  "Health Tech Innovations",
];

export default function IdeathonPage() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => setStars(generateStars()), []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#001e24] to-[#002429] text-white overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" suppressHydrationWarning>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              top: `${s.top}%`, left: `${s.left}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              background: s.glow
                ? "radial-gradient(circle,#fff 0%,#fff 60%,transparent 100%)"
                : "#fff",
              opacity: s.glow ? 1 : 0.7,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.h1
          className={`${zenDots.className} text-6xl md:text-8xl font-extrabold mb-4 tracking-tight`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          I‑DEATHON 2025
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A 48-hour sprint of innovation—join teams, solve pressing challenges, and compete for top honors. Your ideas, our platform, endless possibilities.
        </motion.p>
      </section>

      {/* Sponsored Topics Clover Layout */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {topics.map((topic, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, rotate: topic.length % 2 === 0 ? -2 : 2 }}
              className="relative bg-[#00353b]/80 py-8 px-6 rounded-3xl backdrop-blur-md shadow-2xl border border-white/10"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent transform-gpu rotate-6 rounded-3xl pointer-events-none"
              />
              <p className="relative z-10 text-2xl md:text-3xl font-semibold text-center">
                {topic}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 text-center py-12">
        <motion.button
          className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-yellow-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Learn More & Register
        </motion.button>
      </section>

      {/* Global Keyframes */}
      <style jsx global>{`
        @keyframes twinkle { 0%,100% { opacity:0.3; transform:scale(1);} 50% { opacity:1; transform:scale(1.5);} }
        .animate-twinkle { animation: twinkle 5s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
