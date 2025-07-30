"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import OpeningTimer from "@/components/OpeningTimer";
import QuoteRotator from "@/components/QuoteRotator";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!imgRef.current || !containerRef.current) return;

    // Create smooth scroller with spring effect
    const smoother = ScrollSmoother.create({
      smooth: 2, // >1 = slower, smoother
      effects: true, // enable data-speed/data-lag effects if needed
      smoothTouch: 0.1, // for mobile touch smoothing
    });

    // Animate your image on scroll
    gsap.fromTo(
      imgRef.current,
      {
        width: "30vw",
        top: "20vh",
        height: "400px",
        right: "10vw",
        borderRadius: "10px",
      },
      {
        width: "100vw",
        height: "100vh",
        top: "100vh",
        right: "0px",
        borderRadius: "0 0 20px 20px",
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Cleanup on unmount
    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ScrollSmoother requires a specific wrapper element */}
      <div>
        <div id="smooth-content" className="h-[300vh] w-full text-black">
          <div
            ref={containerRef}
            className="h-screen w-full text-3xl flex justify-between px-20 items-center relative"
          >
            <div className="h-full w-full flex flex-col z-10 justify-start pt-52  items-start">
              <span className="font-semibold text-[10vw]">
                every
                <span className="text-[1.5vw] font-normal">welcome to the</span>
              </span>
              <div className="flex w-full justify-start items-start">
                <span className=" text-[1.5vw] font-normal  pl-[0.4vw]">
                  sacred ritual of
                  <span className="font-bold"> coffee</span>
                </span>
                <span className="font-semibold text-[10vw] pl-[10vw]">
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
                className="absolute shadow-xl w-full  h-full object-cover object-center "
              />
            </div>
            <div className="absolute  bottom-5">
              <OpeningTimer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
