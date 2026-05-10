import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "/images/m1.webp",
  "/images/m2.webp",
  "/images/m3.webp",
  "/images/m4.webp",
  "/images/m3.webp",
  "/images/m4.webp",
  "/images/m2.webp",
];

const Marquee = () => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const startAnimation = () => {
    const track = trackRef.current;
    if (!track) return;

    const distance = track.scrollWidth / 2;

    tweenRef.current?.kill();

    tweenRef.current = gsap.to(track, {
      x: -distance,
      duration: window.innerWidth < 768 ? 30 : 50,
      ease: "none",
      repeat: -1,
    });
  };

  useEffect(() => {
    startAnimation();

    const handleResize = () => {
      gsap.set(trackRef.current, { x: 0 });
      startAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-6 overflow-hidden py-10 sm:py-14 relative">

      {/* LEFT TEXT (moves above on mobile) */}
      <div className="shrink-0 pl-3 sm:pl-6">
        <h2 className="text-black text-xs sm:text-sm font-medium whitespace-nowrap">
          The agency behind
        </h2>
      </div>

      {/* MARQUEE AREA */}
      <div className="relative flex-1 w-full overflow-hidden">

        {/* LEFT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-10 sm:w-20 md:w-28 bg-gradient-to-r from-[#F1F1F1] via-[#f1f1f17e] to-transparent" />

        {/* RIGHT FADE */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-10 sm:w-20 md:w-28 bg-gradient-to-l from-[#F1F1F1] via-[#f1f1f17e] to-transparent" />

        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-50 md:gap-24 w-max"
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="
                shrink-0 overflow-hidden
                h-10 w-20        
                sm:h-8 sm:w-16
                md:h-10 md:w-20
              "
            >
              <img
                src={img}
                className="h-full w-full object-contain"
                alt="marquee"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;