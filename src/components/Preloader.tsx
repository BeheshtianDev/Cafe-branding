"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barWrapperRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Always scroll to top on reload
    window.scrollTo(0, 0);

    // Disable scrolling
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // Fake loading percentage
    gsap.to(percentRef.current, {
      innerText: 100,
      duration: 5,
      snap: "innerText",
      ease: "power3.inOut",
    });

    // Progress bar fill
    gsap.to(barRef.current, {
      width: "100%",
      duration: 5,
      ease: "power3.inOut",
    });

    // Main text appear
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    // Fade out percent and bar
    tl.to(
      [percentRef.current, barWrapperRef.current],
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "+=3.5"
    );

    // Move and shrink text
    tl.to(textRef.current, {
      top: 16,
      left: 16,
      fontSize: "25px",
      transform: "none",
      duration: 1.2,
      ease: "power2.inOut",
    });

    // Fade out preloader
    tl.to(containerRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        // Re-enable scrolling
        document.body.style.overflow = "";
        setDone(true);
      },
    });
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#f4efe9] flex flex-col items-center justify-center text-black"
    >
      {/* Main text */}
      <span
        ref={textRef}
        className="font-semibold"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "4rem",
          transform: "translate(-50%, -50%)",
        }}
      >
        belavista
      </span>

      {/* Percentage */}
      <span
        ref={percentRef}
        className="absolute bottom-[20%] text-xl font-medium"
      >
        0%
      </span>

      {/* Progress Bar */}
      <div
        ref={barWrapperRef}
        className="absolute bottom-[15%] w-[60%] h-[4px] bg-black/10 overflow-hidden rounded-full"
      >
        <div ref={barRef} className="h-full bg-black w-0 origin-left"></div>
      </div>
    </div>
  );
};

export default Preloader;
