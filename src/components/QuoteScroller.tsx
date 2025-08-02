"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phrases = ["Catching up", "First dates", "Deep talks"];

const CoffeeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phraseCount = phrases.length;
      const extraScroll = 300; // مقدار اسکرول اضافی بعد از آخرین جمله

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${phraseCount * 600 + extraScroll}vh`, // اسکرول طولانی‌تر
          scrub: true,
          pin: true,
        },
      });

      phrases.forEach((_, i) => {
        const selector = `.phrase-${i}`;

        tl.fromTo(
          selector,
          { opacity: 0, yPercent: -200 },
          { opacity: 1, yPercent: 0, duration: 5 }
        );

        // فقط اگه آخرین نیست، FadeOut کن
        if (i !== phraseCount - 1) {
          tl.to(selector, { opacity: 0, yPercent: 40, duration: 5 }, "+=1");
        } else {
          // اضافه کن یک پاز (بدون انیمیشن) برای اسکرول اضافی
          tl.to({}, { duration: extraScroll / 100 }); // این فقط فضای زمان اضافه ایجاد می‌کنه
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex justify-center items-center relative overflow-hidden "
    >
      {/* متن ثابت */}
      <span className="text-[3.5vw] font-semibold absolute right-[10vw] z-10  ">
        coffee is always there.
      </span>

      {/* متون چرخشی */}
      {phrases.map((text, i) => (
        <span
          key={i}
          className={`absolute text-[7vw] mb-[3vw] font-medium phrase-${i}`}
          style={{ left: "8vw", opacity: 0 }}
        >
          &ldquo;{text}&rdquo;
        </span>
      ))}
    </div>
  );
};

export default CoffeeSection;
