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

  useEffect(() => {
    const track = trackRef.current;

    const animate = () => {
      const totalWidth = track.scrollWidth / 2;

      gsap.killTweensOf(track);

      gsap.to(track, {
        x: -totalWidth,
        duration: 50,
        ease: "none",
        repeat: -1,
      });
    };

    animate();

    // 🔥 recompute on resize (important for responsiveness)
    const handleResize = () => {
      gsap.set(trackRef.current, { x: 0 });
      animate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <div className="w-full flex items-center gap-3 sm:gap-6 overflow-hidden py-14 relative">

      {/* LEFT TEXT */}
      <div className="shrink-0 pl-3 sm:pl-6 hidden md:block">
        <h2 className="text-black text-xs sm:text-sm font-medium whitespace-nowrap">
          The agency behind
        </h2>
      </div>

      {/* MARQUEE AREA */}
      <div className="relative flex-1 overflow-hidden">

        {/* LEFT FADE (glass disappearance effect) */} <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 py-4 bg-gradient-to-r from-[#F1F1F1] via-[#f1f1f17e] to-[#f1f1f100] backdrop-blur-xs" /> {/* RIGHT FADE */} <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-[#F1F1F1] via-[#f1f1f17e] to-[#f1f1f100] backdrop-blur-xs" />
        {/* TRACK */}
        <div
          ref={trackRef}
          className="
            flex items-center
            gap-10 sm:gap-16 md:gap-24
            w-max
          "
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="
                shrink-0 overflow-hidden
                h-6 w-12
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