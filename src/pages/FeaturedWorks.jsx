import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: "SIXT",
    year: "[2023-2025]",
    image: "/images/1.webp",
    overlay: "#FECACC",
  },
  {
    title: "Dojo - B2B",
    year: "[2021-2025]",
    image: "/images/2.webp",
    overlay: "#60DCFB",
  },
  {
    title: "Magnet Trade - B2B",
    year: "[2023-2024]",
    image: "/images/3.webp",
    overlay: "#D29DD0",
  },
  {
    title: "Leading E Sim",
    year: "[2023-2025]",
    image: "/images/4.webp",
    overlay: "#CB7B3A",
  },
  {
    title: "Spotify Motion",
    year: "[2024]",
    image: "/images/1.webp",
    overlay: "#39B0BD",
  },
  {
    title: "Netflix Search",
    year: "[2022-2024]",
    image: "/images/2.webp",
    overlay: "#FDD8C4",
  },
  {
    title: "Apple Vision",
    year: "[2025]",
    image: "/images/3.webp",
    overlay: "#D8C4FD",
  },
  {
    title: "Puma Culture",
    year: "[2023]",
    image: "/images/4.webp",
    overlay: "#B2F6E3",
  },
  {
    title: "Samsung Launch",
    year: "[2024]",
    image: "/images/1.webp",
    overlay: "#FECACC",
  },
  {
    title: "Adobe Creative",
    year: "[2021-2024]",
    image: "/images/2.webp",
    overlay: "#60DCFB",
  },
  {
    title: "Airbnb Stories",
    year: "[2025]",
    image: "/images/3.webp",
    overlay: "#D29DD0",
  },
];

const TITLE_HEIGHT = 88;

const FeaturedWorks = () => {
  const sectionRef = useRef(null);

  const titleTrackRef = useRef(null);
  const imageTrackRef = useRef(null);

  const cursorRef = useRef(null);

  const titleRefs = useRef([]);
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);

  const activeIndexRef = useRef(0);

  useGSAP(() => {
    const IMAGE_HEIGHT = window.innerHeight * 0.68;

    // ----------------------------------------------------
    // MOVEMENT DISTANCES
    // ----------------------------------------------------

    const maxTitleMove = TITLE_HEIGHT * (works.length - 4);

    const maxImageMove = IMAGE_HEIGHT * (works.length - 1);

    // ----------------------------------------------------
    // INITIAL STATES
    // ----------------------------------------------------

    gsap.set(titleRefs.current[0], {
      opacity: 1,
      x: 70,
    });

    gsap.set(imageRefs.current[0], {
      scale: 1,
      xPercent: 0,
    });

    // ----------------------------------------------------
    // CURSOR
    // ----------------------------------------------------

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveCursor = (e) => {
      xTo(e.clientX - 48);
      yTo(e.clientY - 48);
    };

    window.addEventListener("mousemove", moveCursor);

    // ----------------------------------------------------
    // SCROLLTRIGGER
    // ----------------------------------------------------

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${works.length * 900}`,
      scrub: 1,
      pin: true,

      onUpdate: (self) => {
        const progress = self.progress;

        // ------------------------------------------------
        // LEFT SIDE
        // slower
        // locks earlier
        // ------------------------------------------------

        const leftProgress = Math.min(progress * 1.15, 1);

        gsap.set(titleTrackRef.current, {
          y: -maxTitleMove * leftProgress,
        });

        // ------------------------------------------------
        // RIGHT SIDE
        // full image scrolling
        // ------------------------------------------------

        gsap.set(imageTrackRef.current, {
          y: -maxImageMove * progress,
        });

        // ------------------------------------------------
        // ACTIVE INDEX
        // based on image progress
        // ------------------------------------------------

        const imageProgress = progress * (works.length - 1);

        const nextIndex = Math.round(imageProgress);

        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;

          // --------------------------------------------
          // TITLES
          // --------------------------------------------

          titleRefs.current.forEach((el, i) => {
            gsap.to(el, {
              opacity: i === nextIndex ? 1 : 0.12,

              x: i === nextIndex ? 70 : 0,

              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
            });
          });

          // --------------------------------------------
          // IMAGES
          // --------------------------------------------

          imageRefs.current.forEach((el, i) => {
            gsap.to(el, {
              scale: i === nextIndex ? 1 : 0.9,

              xPercent: i === nextIndex ? 0 : 8,

              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
          });

          // --------------------------------------------
          // OVERLAY
          // --------------------------------------------

          overlayRefs.current.forEach((el, i) => {
            gsap.to(el, {
              scale: i === nextIndex ? 14 : 0,

              duration: 1.1,
              ease: "power4.out",
              overwrite: true,
            });
          });
        }
      },
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#EFEEEC]
      "
    >
      {/* ================================================= */}
      {/* CUSTOM CURSOR */}
      {/* ================================================= */}

      <div
        ref={cursorRef}
        className="
          fixed
          left-0
          top-0
          z-[999]
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-white
          opacity-0
          mix-blend-difference
          pointer-events-none
        "
      >
        <ArrowUpRight className="h-10 w-10 text-black" />
      </div>

      {/* ================================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================================= */}

      <div
        className="
          relative
          mx-4
          mt-[2vh]
          h-[96vh]
          overflow-hidden
          rounded-[36px]
          bg-[#050816]
        "
      >
        {/* ================================================= */}
        {/* PINK CENTER LINE */}
        {/* ================================================= */}

        <div
          className="
            absolute
            left-0
            top-1/2
            z-50
            h-px
            w-full
            bg-[#ff4fd8]/40
          "
        />

        {/* ================================================= */}
        {/* BOTTOM LINES */}
        {/* ================================================= */}

        <div className="absolute bottom-10 left-0 z-50 w-full">
          <div className="h-px bg-[#ff4fd8]/30" />
          <div className="mt-1 h-px bg-[#ff4fd8]/20" />
          <div className="mt-1 h-px bg-[#ff4fd8]/10" />
        </div>

        {/* ================================================= */}
        {/* LABEL */}
        {/* ================================================= */}

        <div className="absolute left-10 top-10 z-50">
          <p className="text-xl font-medium text-white">Featured Work</p>
        </div>

        {/* ================================================= */}
        {/* GRID */}
        {/* ================================================= */}

        <div className="grid h-full grid-cols-[1.05fr_0.95fr]">
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="relative h-full">
            {/* LEFT FIXED WINDOW */}
            <div
              className="
      absolute
      left-0
      top-1/2
      -translate-y-1/2
      h-[60vh]
      w-[50vw]   /* adjust width as needed */
      overflow-hidden
    "
            >
              {/* CENTER LOCK AREA */}
              <div
                className="
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        w-full
      "
              >
                <div ref={titleTrackRef} className="relative">
                  {works.map((work, i) => {
                    return (
                      <div
                        key={i}
                        className="
                relative
                flex
                h-20
                items-center
                px-10
              "
                      >
                        <div
                          ref={(el) => (titleRefs.current[i] = el)}
                          onMouseEnter={() => {
                            const isActive = activeIndexRef.current === i;

                            gsap.to(titleRefs.current[i], {
                              x: isActive ? 90 : 20,
                              duration: 0.45,
                              ease: "power3.out",
                            });
                          }}
                          onMouseLeave={() => {
                            const isActive = activeIndexRef.current === i;

                            gsap.to(titleRefs.current[i], {
                              x: isActive ? 70 : 0,
                              duration: 0.45,
                              ease: "power3.out",
                            });
                          }}
                          className="
                  relative
                  flex
                  items-start
                  gap-2
                  opacity-[0.12]
                  will-change-transform
                "
                        >
                          <h2
                            className="
                    text-[5vw]
                    font-medium
                    leading-[0.82]
                    tracking-[-0.075em]
                    text-white
                    whitespace-nowrap
                  "
                          >
                            {work.title}
                          </h2>

                          <span
                            className="
                    absolute
                    -right-16
                    top-2
                    text-[11px]
                    font-medium
                    text-white
                  "
                          >
                            {work.year}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="relative overflow-hidden">
            <div
              ref={imageTrackRef}
              className="
                absolute
                left-0
                top-0
                w-full
                pt-[12vh]
                pb-[20vh]
              "
            >
              {works.map((work, i) => {
                return (
                  <div
                    key={i}
                    className="
                      h-[68vh]
                      px-6
                      py-3
                    "
                  >
                    <div
                      ref={(el) => (imageRefs.current[i] = el)}
                      onMouseEnter={() => {
                        gsap.to(cursorRef.current, {
                          opacity: 1,
                          scale: 1,
                          duration: 0.4,
                          ease: "power3.out",
                        });

                        gsap.to(overlayRefs.current[i], {
                          scale: 14,
                          duration: 1,
                          ease: "power4.out",
                        });
                      }}
                      onMouseLeave={() => {
                        gsap.to(cursorRef.current, {
                          opacity: 0,
                          scale: 0,
                          duration: 0.4,
                          ease: "power3.out",
                        });

                        if (activeIndexRef.current !== i) {
                          gsap.to(overlayRefs.current[i], {
                            scale: 0,
                            duration: 1,
                            ease: "power4.out",
                          });
                        }
                      }}
                      className="
                        relative
                        h-full
                        overflow-hidden
                        rounded-[32px]
                        cursor-none
                        will-change-transform
                      "
                    >
                      {/* IMAGE */}

                      <img
                        src={work.image}
                        alt=""
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                        "
                      />

                      {/* OVERLAY */}

                      <div
                        ref={(el) => (overlayRefs.current[i] = el)}
                        className="
                          absolute
                          left-1/2
                          top-full
                          h-[120px]
                          w-[120px]
                          -translate-x-1/2
                          rounded-full
                          will-change-transform
                        "
                        style={{
                          background: work.overlay,
                          scale: 0,
                        }}
                      />

                      {/* CONTENT */}

                      <div
                        className="
                          absolute
                          bottom-8
                          left-8
                          z-20
                        "
                      >
                        <p
                          className="
                            text-4xl
                            font-medium
                            text-black
                          "
                        >
                          {work.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
