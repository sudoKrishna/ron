"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function CyberMenuButton() {
  const [open, setOpen] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pixels = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
      })),
    []
  );

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.to(pixelsRef.current, {
      x: () => gsap.utils.random(-12, 12),
      y: () => gsap.utils.random(-8, 8),
      opacity: () => gsap.utils.random(0.2, 1),
      duration: 2,
      stagger: {
        each: 0.03,
        from: "random",
      },
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);

    gsap.to(textRef.current, {
      y: next ? -24 : 0,
      duration: 0.45,
      ease: "power3.inOut",
    });

    gsap.to(iconRef.current, {
      rotate: next ? 45 : 0,
      duration: 0.45,
      ease: "power3.inOut",
    });
  };

  return (
    
    <button
      onClick={toggleMenu}
      className="
        relative
        h-[52px]
        w-[180px]
        overflow-hidden
        border-[4px]
        border-white/60
        bg-black
        px-5
        backdrop-blur-xl
      "
    >
   
      <div className="absolute inset-0 overflow-hidden">
        {pixels.map((pixel, i) => (
          <div
            key={i}
            ref={(el) => {
              pixelsRef.current[i] = el;
            }}
            className="absolute rounded-[2px] bg-[#d4e700]"
            style={{
              width: pixel.size,
              height: pixel.size,
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              opacity: 0.5,
              filter: "blur(3px)",
              boxShadow: "0 0 10px #d4e700",
            }}
          />
        ))}
      </div>

   
      <div className="relative z-10 flex h-full items-center justify-between">
     
        <div className="h-6 overflow-hidden">
          <div
            ref={textRef}
            className="flex flex-col text-sm font-medium tracking-[0.3em] text-white leading-6"
          >
            <span className="h-6">MENU</span>
            <span className="h-6">CLOSE</span>
          </div>
        </div>

        
        <div
          ref={iconRef}
          className="relative h-4 w-4 flex-shrink-0"
        >
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white" />
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white" />
        </div>
      </div>

      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </button>
  );
}