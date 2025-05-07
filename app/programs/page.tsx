// app/programs/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zen_Dots } from "next/font/google";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

/* ---------- STARFIELD UTILS ---------- */
type Star = { top: number; left: number; size: number; delay: number; glow: boolean };
function generateStars(count = 120): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    delay: Math.random() * 5,
    glow: Math.random() < 0.3,
  }));
}

/* ---------- CONTENT DATA ---------- */
const sessions = [
  {
    name: "Dr. Aisha Verma",
    topic: "AI in Healthcare",
    image: "/sessions/aisha.jpg",
  },
  {
    name: "Mr. Rohit Menon",
    topic: "Web3 & Decentralization",
    image: "/sessions/rohit.jpg",
  },
  {
    name: "Ms. Priya Singh",
    topic: "Startup Fundraising 101",
    image: "/sessions/priya.jpg",
  },
];

const workshops = [
  {
    title: "React Deep Dive",
    desc: "Build dynamic UIs with hooks, context, and suspense.",
    image: "/workshops/react.jpg",
  },
  {
    title: "Figma Prototyping",
    desc: "Turn wireframes into interactive prototypes in minutes.",
    image: "/workshops/figma.jpg",
  },
  {
    title: "Data Science Bootcamp",
    desc: "Hands-on with Python, pandas, and scikit-learn pipelines.",
    image: "/workshops/datasci.jpg",
  },
];

export default function ProgramsPage() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#002429] via-[#00353b] to-[#001e24] text-white">
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" suppressHydrationWarning>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              background: s.glow
                ? "radial-gradient(circle, #fff 0%, #fff 60%, transparent 100%)"
                : "#fff",
              boxShadow: s.glow ? "0 0 6px 2px rgba(255,255,255,0.9)" : "none",
              opacity: s.glow ? 1 : 0.7,
            }}
          />
        ))}
      </div>

      {/* Tiny background meteors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-10 left-20 opacity-70 blur-sm" />
        <div className="animate-meteor-delay absolute w-1 h-1 bg-white rounded-full top-1/3 right-1/4 opacity-60 blur-sm" />
        <div className="animate-meteor absolute w-1 h-1 bg-yellow-400 rounded-full top-2/3 left-1/3 opacity-50 blur-sm" />
      </div>

      {/* Content */}
      <section className="relative container mx-auto px-6 py-16">
        <h1 className={`${zenDots.className} text-5xl md:text-6xl font-extrabold text-center mb-12`}>
          Other Programs
        </h1>

        {/* Speaker Sessions */}
        <h2 className={`${zenDots.className} text-3xl font-semibold mb-6`}>Speaker Sessions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sessions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#00353b]/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg cursor-pointer transform-gpu"
            >
              <div className="relative w-full h-48">
                <Image src={s.image} alt={s.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{s.name}</h3>
                <p className="text-gray-300">{s.topic}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workshops */}
        <h2 className={`${zenDots.className} text-3xl font-semibold mb-6`}>Workshops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#00353b]/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg cursor-pointer transform-gpu"
            >
              <div className="relative w-full h-48">
                <Image src={w.image} alt={w.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{w.title}</h3>
                <p className="text-gray-300">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global keyframes for stars & meteors */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.8); }
        }
        @keyframes meteor {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0.7; }
          100% { transform: translate(300px, 600px) scale(0.4); opacity: 0; }
        }
        .animate-twinkle       { animation: twinkle 4s ease-in-out infinite; }
        .animate-meteor        { animation: meteor 5s linear infinite; }
        .animate-meteor-delay  { animation: meteor 6s linear infinite 2s; }
      `}</style>
    </main>
  );
}
