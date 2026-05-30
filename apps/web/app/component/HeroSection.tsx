"use client";

import { Audiowide } from "next/font/google";
import { useEffect, useRef } from "react";
import CyberMenuButton from "./CyberButton";
import gsap from "gsap";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroSection() {
  const ronRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 500, 1);

      const maxMoveY = window.innerHeight - 200;

      gsap.to(ronRef.current, {
        y: -progress * maxMoveY,
        x: -progress * 320,  
        scale: 1 - progress * 0.85, 
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(".ron-text", {
        color: progress > 0.6 ? "#ffffff" : "#f97316",
        duration: 0.2,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[200vh] overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
      >
        <source src="/wall.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/50" />

      <div className="fixed right-8 top-8 z-50">
      <CyberMenuButton />
      </div>

      <div
        ref={ronRef}
        className="fixed left-10 bottom-10 z-20 will-change-transform"
      >
        <h1
          className={`${audiowide.className} ron-text text-[16rem] leading-none tracking-widest text-orange-500`}
        >
          RON
        </h1>
      </div>
    </section>
  );
}