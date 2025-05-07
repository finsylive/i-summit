"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zen_Dots } from "next/font/google";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

// ---------- STARFIELD UTILITIES ----------
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

interface Reward { title: string; desc: string; icon: string; }
const rewards: Reward[] = [
  { title: 'Gold Badge', desc: 'Earned for completing 10 tasks', icon: '/icons/gold.png' },
  { title: 'Silver Badge', desc: 'Earned for completing 5 tasks', icon: '/icons/silver.png' },
  { title: 'Bronze Badge', desc: 'First task completion', icon: '/icons/bronze.png' },
  { title: 'Star Performer', desc: 'Top contributor of the month', icon: '/icons/star.png' },
  { title: 'MVP', desc: 'Most Valuable Participant', icon: '/icons/mvp.png' },
];

export default function RewardsPage() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#001e24] to-[#002429] text-white">
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
                ? 'radial-gradient(circle,#fff 0%,#fff 60%,transparent 100%)'
                : '#fff',
              boxShadow: s.glow ? '0 0 6px 2px rgba(255,255,255,0.9)' : 'none',
              opacity: s.glow ? 1 : 0.7,
            }}
          />
        ))}
      </div>
      {/* Tiny Meteors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-10 left-20 opacity-70 blur-sm" />
        <div className="animate-meteor-delay absolute w-1 h-1 bg-white rounded-full top-1/3 right-1/4 opacity-60 blur-sm" />
        <div className="animate-meteor absolute w-1 h-1 bg-yellow-400 rounded-full top-2/3 left-1/3 opacity-50 blur-sm" />
      </div>
      {/* Rewards Content */}
      <section className="relative container mx-auto px-6 py-20 z-20">
        <h1 className={`${zenDots.className} text-5xl md:text-6xl font-extrabold text-center mb-12`}>Rewards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((r, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i, type: 'spring', stiffness: 100 }}
              whileHover={{ rotate: 5, scale: 1.02 }}
              className="bg-[#00353b]/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl flex flex-col items-center transform-gpu cursor-pointer"
            >
              <div className="w-24 h-24 mb-4 relative">
                <Image src={r.icon} alt={r.title} fill className="object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{r.title}</h3>
              <p className="text-gray-300 text-center">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes twinkle { 0%,100% { opacity:0.25; transform:scale(1);} 50% { opacity:1; transform:scale(1.8);} }
        @keyframes meteor { 0% { transform:translate(0,0) scale(1); opacity:0.7;} 100% { transform:translate(300px,600px) scale(0.4); opacity:0;} }
        .animate-twinkle { animation:twinkle 4s ease-in-out infinite; }
        .animate-meteor { animation:meteor 5s linear infinite; }
        .animate-meteor-delay { animation:meteor 6s linear infinite 2s; }
      `}</style>
    </main>
  );
}
