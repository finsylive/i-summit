// app/association/page.tsx

"use client";

import Image from "next/image";
import { Zen_Dots } from "next/font/google";
import { useState, useEffect } from "react";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });

const partnerLogos = [
  { src: "/logo1.png", alt: "Partner 1" },
  { src: "/logo2.png", alt: "Partner 2" },
  { src: "/logo3.png", alt: "Partner 3" },
  { src: "/logo4.png", alt: "Partner 4" },
  { src: "/logo5.png", alt: "Partner 5" },
  { src: "/logo6.png", alt: "Partner 6" },
];

/* -------- enhanced starfield -------- */
type Star = {
  top: number;
  left: number;
  size: number;
  delay: number;
  glow: boolean;           // ⭐ bright ones!
};

function generateStars(count = 120): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    delay: Math.random() * 5,
    glow: Math.random() < 0.25,          // 25 % glow
  }));
}

export default function AssociationPage() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#002429] to-[#00353b] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
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

      {/* Meteors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-8 left-12 opacity-70 blur-sm" />
        <div className="animate-meteor-delay absolute w-1 h-1 bg-yellow-400 rounded-full top-1/4 left-1/2 opacity-60 blur-sm" />
        <div className="animate-meteor absolute w-1 h-1 bg-white rounded-full top-1/2 right-8 opacity-80 blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className={`${zenDots.className} text-white text-4xl md:text-5xl font-bold text-center mb-4`}>
          In Association With
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-12 text-center max-w-xl">
          We proudly collaborate with impactful organizations and innovation leaders.
        </p>

        <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
          {partnerLogos.map(({ src, alt }, idx) => (
            <div
              key={idx}
              className="w-28 h-28 sm:w-32 sm:h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 30vw, 8rem" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes meteor {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(300px, 600px) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.8);
          }
        }
        .animate-meteor {
          animation: meteor 5s linear infinite;
        }
        .animate-meteor-delay {
          animation: meteor 6s linear infinite 2s;
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
