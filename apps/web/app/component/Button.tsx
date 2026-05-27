"use client";

import { motion } from "framer-motion";

export default function KeyboardButton() {
  const playClick = () => {
    const audio = new Audio("/click.mp4");
    audio.volume = 0.4;
    audio.play();
  };

  return (
    <motion.button
      whileTap={{
        y: 2,
        scale: 0.96,
      }}
      onClick={playClick}
      className="
        mr-2
        px-5
        py-2.5
        rounded-full
        bg-orange-500
        text-sm
        text-white
        font-semibold
        shadow-[0_4px_0_rgb(194,65,12)]
        hover:bg-orange-600
        active:shadow-[0_1px_0_rgb(194,65,12)]
        transition-all
        duration-100
      "
    >
      Sign Up
    </motion.button>
  );
}