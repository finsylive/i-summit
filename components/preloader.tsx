"use client";

import React from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={onFinish}
    >
      <motion.img
        src="/galaxy.jpg"
        alt="Galaxy Background"
        className="w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </motion.div>
  );
}
