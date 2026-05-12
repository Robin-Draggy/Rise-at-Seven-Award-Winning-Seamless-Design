import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const TextMarquee = () => {
  const trackRef = useRef(null);
  const cursorRef = useRef(null);

  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: totalWidth / 100,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // CURSOR MOVE
  const moveCursor = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX + 20,
      y: e.clientY - 20,
      duration: 0.15,
      ease: "power3.out",
    });
  };

  // SHOW CURSOR
  const showCursor = () => {
    setCursorActive(true);

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  // HIDE CURSOR
  const hideCursor = () => {
    setCursorActive(false);

    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  return (
    <div
      onMouseMove={moveCursor}
      className="relative w-full overflow-hidden py-10 sm:py-16 bg-[#F1F1F1]"
    >
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="
          fixed top-0 left-0 z-[999]
          pointer-events-none
          hidden md:flex
          items-center gap-3
          px-5 py-3
          rounded-full
          bg-[#B2F6E3]
          scale-0 opacity-0
          will-change-transform
        "
      >
        <span className="text-black text-lg font-medium whitespace-nowrap">
          Send us your brief
        </span>

        <ArrowUpRight className="w-5 h-5 text-black" />
      </div>

      {/* TRACK */}
      <div
        ref={trackRef}
        className="flex items-center w-max whitespace-nowrap"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            <h1
              onMouseEnter={() => {
                if (window.innerWidth >= 768) {
                  showCursor();
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768) {
                  hideCursor();
                }
              }}
              className={`
                flex items-center
                text-[7rem] md:text-[9rem]
                font-medium capitalize
                tracking-tighter leading-none
                text-[#111212]
                transition-colors duration-300
                ${cursorActive ? "md:cursor-none" : "cursor-default"}
              `}
            >
              Chasing Consumers

              {/* IMAGE 1 */}
              <span className="mx-3 sm:mx-4 md:mx-6 inline-block">
                <div
                  className="
                    h-32 w-32
                    md:h-[12vw] md:w-[12vw]
                    rounded-xl md:rounded-2xl
                    overflow-hidden
                  "
                >
                  <img
                    src="/images/1.webp"
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              </span>

              not algorithms

              {/* IMAGE 2 */}
              <span className="mx-3 sm:mx-4 md:mx-6 inline-block">
                <div
                  className="
                    h-32 w-32
                    md:h-[12vw] md:w-[12vw]
                    rounded-xl md:rounded-2xl
                    overflow-hidden
                  "
                >
                  <img
                    src="/images/3.webp"
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              </span>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;