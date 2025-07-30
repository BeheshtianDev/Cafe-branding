"use client";

import { useEffect, useState, useRef } from "react";

const quotes = [
  "Coffee is a language in itself",
  "Wake up and smell the coffee",
  "Life begins after coffee",
  "Coffee: because adulting is hard",
  "A yawn is a silent scream for coffee",
];

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true); // 👈 visibility control
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 200);
    };

    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quote cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Mouse movement parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Don’t render if not visible
  if (!visible) return null;

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      ref={containerRef}
      className="relative w-[400px] flex items-center justify-start"
    >
      {/* Ping Dot */}
      <div className="relative w-3 h-3 mr-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-75">
          <span className="relative rounded-full h-3 w-3 bg-black opacity-80 animate-ping"></span>
        </span>
      </div>

      {/* Quote */}
      <div
        className={`transition-opacity duration-500 ease-in-out text-lg text-neutral-700 font-bold max-w-lg text-center px-4 pointer-events-none ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {quotes[index]}
      </div>
    </div>
  );
}
