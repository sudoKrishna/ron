"use client";

import { Audiowide } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import CyberMenuButton from "./CyberButton";
import gsap from "gsap";
import SecPage from "./SecPage";
import KeyboardButton from "./Button";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroSection() {
  const ronRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showSignup , setShowSignup] = useState(false)
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [loading , setLoading] = useState(false)

  const handleSignup = async () => {
    try {
      setLoading(true);

      const cleanUsername = username.trim();
      const cleanPassword = password.trim();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method :"POST",
          headers : {
            "Content-Type": "application/json", 
          },
          body : JSON.stringify({username : cleanUsername, password : cleanPassword}),
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

    
      const progress = Math.min(scrollY / 700, 1);

      setShowSignup(progress > 0.8);

      gsap.set(ronRef.current, {
        x: progress * 0,
        y: -progress * (window.innerHeight - 180),
        scale: 1 - progress * 0.7,
      });

      
      gsap.set(videoRef.current, {
        scale: 1 - progress * 0.35,
        opacity: 1 - progress,
        filter: `blur(${progress * 10}px)`,
        transformOrigin: "center center",
      });

      gsap.set(".ron-text", {
        color: progress > 0.6 ? "#ffffff" : "#f97316",
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-[200vh] overflow-hidden bg-black">
    
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 h-full w-full object-cover"
        >
          <source src="/wall.mp4" type="video/mp4" />
        </video>

    
        <div className="fixed inset-0 bg-black/50" />

        <div
  className={`fixed inset-0 z-30 flex items-center justify-center transition-all duration-700 ${
    showSignup
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10 pointer-events-none"
  }`}
>
  <div className="w-full max-w-xl px-6">
    <h2 className="mb-8 text-center text-4xl font-light text-white">
      Join RON
    </h2>

    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/40 backdrop-blur-md outline-none"
      />
      <input 
      type="password"
      placeholder="enter password"
      onChange={(e) => setPassword(e.target.value)}
      className="rounded-xl border barder-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/40  backdrop-blur-md outline-none"
      />
     <KeyboardButton onClick={handleSignup} label="signup"/>
    </div>
  </div>
</div>


    

  
        <div className="fixed right-8 top-8 z-50">
          <CyberMenuButton />
        </div>

    
        <div
          ref={ronRef}
          className="fixed left-10 bottom-10 z-40 will-change-transform"
        >
          <h1
            className={`${audiowide.className} ron-text text-[16rem] leading-none tracking-widest text-orange-500`}
          >
            RON
          </h1>
        </div>

      
        <div className="fixed right-10 top-1/2 z-20 -translate-y-1/2">
          <p className="max-w-[180px] text-right text-[11px] font-extralight uppercase tracking-[0.35em] leading-[2] text-white/50">
            The market rewards patience.
            <br />
            Risk defines the trade.
            <br />
            Precision beats prediction.
            <br />
            Trade the process,
            <br />
            not the outcome.
          </p>
        </div>
      </section>
    </>
  );
}