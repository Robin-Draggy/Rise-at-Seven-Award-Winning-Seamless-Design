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
        duration: totalWidth / 100,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden py-10 sm:py-16 bg-[#F1F1F1]">

      {/* TRACK */}
      <div
        ref={trackRef}
        className="flex items-center w-max whitespace-nowrap"
      >

        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">

            <h1 className="
              flex items-center
              text-[7rem] md:text-[9rem]
              font-medium capitalize tracking-tighter leading-none text-[#111212]
            ">

              Chasing Consumers

              {/* IMAGE 1 */}
              <span className="mx-3 sm:mx-4 md:mx-6 inline-block">
                <div className="
                  h-32 w-32
                  md:h-[12vw] md:w-[12vw]
                  rounded-xl md:rounded-2xl
                  overflow-hidden
                ">
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
                <div className="
                  h-32 w-32
                  md:h-[12vw] md:w-[12vw]
                  rounded-xl md:rounded-2xl
                  overflow-hidden
                ">
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