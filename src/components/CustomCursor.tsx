"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CURSOR_COLOR = "#C09569";
const CURSOR_OPACITY = 0.3;
const EXPAND_SCALE = 1.4;
const SPRING_CONFIG = { stiffness: 0.15, damping: 0.25 };

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Initialize position after window is available
  useEffect(() => {
    pos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    mouse.current = { ...pos.current };
  }, []);

  useEffect(() => {
    const moveCursor = () => {
      pos.current.x +=
        (mouse.current.x - pos.current.x) * SPRING_CONFIG.stiffness;
      pos.current.y +=
        (mouse.current.y - pos.current.y) * SPRING_CONFIG.stiffness;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: pos.current.x,
          y: pos.current.y,
        });
      }
    };

    gsap.ticker.add(moveCursor);
    return () => gsap.ticker.remove(moveCursor);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const hoverableSelectors =
      "a, button, input, textarea, select, [role='button'], .cursor-pointer";
    const hoverElements = Array.from(
      document.querySelectorAll(hoverableSelectors)
    );

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isHovering ? EXPAND_SCALE : 1,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: CURSOR_COLOR,
        opacity: CURSOR_OPACITY,
        pointerEvents: "none",
        transform: "translate(-50%, -50%) scale(1)",
        zIndex: 9999,
      }}
    />
  );
}
