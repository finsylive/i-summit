// components/NavBar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zen_Dots } from "next/font/google";

const zenDots = Zen_Dots({ weight: "400", subsets: ["latin"] });
const navItems = ["Home", "About", "Events", "Guidelines"];

export default function NavBar() {
  return (
    <header className="sticky top-0 w-full bg-[#002e36]/90 backdrop-blur-sm py-4 shadow-md z-20">
      <nav className={`container mx-auto flex justify-center space-x-12 ${zenDots.className}`}>
        {navItems.map((label, idx) => (
          <motion.div key={label} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}>
            <Link
              href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
              className="text-xl font-bold uppercase hover:text-yellow-300 transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 hover:after:w-full after:transition-all"
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </header>
  );
}
