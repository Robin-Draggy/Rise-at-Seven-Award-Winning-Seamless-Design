import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TextMarquee = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden py-16 bg-[#F1F1F1]">
      
      {/* TRACK */}
      <div
        ref={trackRef}
        className="flex items-center w-max whitespace-nowrap"
      >
        {/* DUPLICATED CONTENT FOR LOOP */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center"
          >
            {/* TEXT LEFT */}
            <h1 className="flex items-center text-[13vw] font-semibold capitalize leading-none text-black">
              We build

              {/* IMAGE IN BETWEEN */}
              <span className="mx-6 inline-block">
                <div className="h-[12vw] w-[12vw] rounded-2xl overflow-hidden">
                  <img
                    src="/images/1.webp"
                    className="h-full w-full object-cover"
                  />
                </div>
              </span>

              category leaders

              {/* spacing repeat feel */}
              <span className="ml-20">•</span>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;