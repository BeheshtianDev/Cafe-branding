"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import OpeningTimer from "@/components/OpeningTimer";
import QuoteRotator from "@/components/QuoteRotator";
import QuoteScroller from "@/components/QuoteScroller";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!imgRef.current || !containerRef.current) return;

    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate image
    tl.fromTo(
      imgRef.current,
      {
        width: "30vw",
        top: "20vh",
        height: "400px",
        right: "10vw",
        borderRadius: "10px",
      },
      {
        width: "95vw",
        height: "100vh",
        top: "100vh",
        right: "2.5vw",
        translateY: 100,
        skewY: 0,
        borderRadius: "20px",
        ease: "power1.out",
      },
      0
    );

    // Animate span-right to move to the right
    tl.to(
      ".span-right",
      {
        xPercent: 50, // adjust as needed
        ease: "power1.out",
      },
      0
    );

    // Animate span-left to move to the left
    tl.to(
      ".span-left",
      {
        xPercent: -50, // adjust as needed
        ease: "power1.out",
      },
      0
    );
    // Animate span-left to move to the left
    tl.to(
      ".span-out",
      {
        xPercent: -250, // adjust as needed
        ease: "power1.out",
      },
      0
    );

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="smooth-content" className=" w-full text-black">
      <div
        ref={containerRef}
        className="h-screen w-full text-3xl flex justify-between px-20 items-center relative"
      >
        <span className="w-screen h-[100vw] border-[1px] border-black/30 rounded-full fixed left-[9.2vw]"></span>
        <div className=" w-full flex flex-col z-30 justify-start  pb-10 items-start">
          <span className="span-right font-semibold text-[10vw]">
            every
            <span className="text-[1.5vw] font-normal">Welcome to the</span>
          </span>
          <div className="flex w-full justify-start items-start">
            <span className="span-out text-[1.5vw] font-normal  pl-[0.4vw]">
              sacred ritual of
              <span className="font-bold"> coffee</span>
            </span>
            <span className="span-left font-semibold text-[10vw] pl-[10vw]">
              sip
              <span className="text-nowrap font-normal ml-10 text-[4vw]">
                IS A STORY.
              </span>
            </span>
          </div>
        </div>
        <div className=" absolute right-[10vw] bottom-[15vh]">
          <QuoteRotator />
        </div>
        <div className=" h-screen overflow-hidden ">
          <img
            ref={imgRef}
            src="/Home-pic.jpg"
            alt="coffee"
            className="absolute z-20 shadow-xl w-full  h-full object-cover object-center "
          />
        </div>
        <div className="absolute  bottom-5">
          <OpeningTimer />
        </div>
      </div>
      <div className="h-screen w-full"></div>
      <QuoteScroller />
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
    </div>
  );
}
