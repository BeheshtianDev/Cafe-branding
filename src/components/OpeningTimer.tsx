"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function OpeningTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    open: boolean;
  }>({
    hours: 0,
    minutes: 0,
    open: false,
  });

  const [blink, setBlink] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const openHour = 8;
      const closeHour = 24;

      const isOpen = currentHour >= openHour && currentHour < closeHour;

      if (isOpen) {
        const hoursLeft = closeHour - currentHour - 1;
        const minutesLeft = 60 - currentMinute;
        setTimeLeft({ hours: hoursLeft, minutes: minutesLeft, open: true });
      } else {
        let nextOpen = new Date();
        nextOpen.setHours(openHour, 0, 0, 0);

        if (now.getHours() >= closeHour) {
          nextOpen.setDate(now.getDate() + 1);
        }

        const diff = nextOpen.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ hours, minutes, open: false });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`text-[16px] font-medium flex items-center gap-2 transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {timeLeft.open ? (
        <>
          <span>We are open until midnight –</span>
          <span className="tabular-nums flex gap-px pt-0.5 text-[15px]">
            {timeLeft.hours}
            <span
              className="transition-opacity duration-1000"
              style={{ opacity: blink ? 1 : 0 }}
            >
              :
            </span>
            {pad(timeLeft.minutes)} left
          </span>
        </>
      ) : (
        <>
          <span>We're currently closed – opens in</span>
          <span className="tabular-nums flex gap-px">
            {timeLeft.hours}
            <span
              className="transition-opacity duration-300"
              style={{ opacity: blink ? 1 : 0 }}
            >
              :
            </span>
            {pad(timeLeft.minutes)}
          </span>
        </>
      )}
    </div>
  );
}
