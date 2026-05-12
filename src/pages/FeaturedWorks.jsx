import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChartSpline, Search } from "lucide-react";
import { works } from "../data/FeaturedWorks";

gsap.registerPlugin(ScrollTrigger);

const TITLE_HEIGHT = 88;

const FeaturedWorks = () => {
  const sectionRef = useRef(null);
  const titleTrackRef = useRef(null);
  const imageTrackRef = useRef(null);
  const cursorRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const mobileImageTrackRef = useRef(null);

  const titleRefs = useRef([]);
  const imageRefs = useRef([]);

  const activeIndexRef = useRef(0);

  // QuickTo functions
  const xToRef = useRef(null);
  const yToRef = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Desktop version animation
      const maxTitleMove = TITLE_HEIGHT * (works.length - 4);
      const maxImageMove = window.innerHeight * 0.68 * (works.length - 1);

      gsap.set(titleRefs.current[0], {
        opacity: 1,
        x: 70,
      });

      gsap.set(imageRefs.current[0], {
        scale: 1,
        xPercent: 0,
      });

      gsap.set(cursorRef.current, {
        opacity: 0,
        scale: 0.6,
      });

      xToRef.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.3,
        ease: "power3.out",
      });

      yToRef.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.3,
        ease: "power3.out",
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${works.length * 900}`,
        scrub: 1,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          gsap.set(titleTrackRef.current, {
            y: -maxTitleMove * Math.min(progress * 1.15, 1),
          });

          gsap.set(imageTrackRef.current, {
            y: -maxImageMove * progress,
          });

          const nextIndex = Math.round(progress * (works.length - 1));

          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;

            titleRefs.current.forEach((el, i) => {
              gsap.to(el, {
                opacity: i === nextIndex ? 1 : 0.15,
                x: i === nextIndex ? 70 : 0,
                duration: 0.5,
              });
            });

            imageRefs.current.forEach((el, i) => {
              gsap.to(el, {
                xPercent: i === nextIndex ? 0 : 5,
                duration: 0.8,
              });
            });
          }
        },
      });

      return () => trigger.kill();
    } else {
      const imageHeight = 300;
      const gap = 24;
      const topPadding = 80;
      const bottomPadding = 24;

      const totalImagesHeight =
        (imageHeight + gap) * works.length - gap + topPadding;

      const scrollDistance =
        totalImagesHeight - window.innerHeight + bottomPadding;

      // Set initial state
      gsap.set(mobileImageTrackRef.current, {
        y: 0,
      });

      const mobileTrigger = ScrollTrigger.create({
        trigger: mobileSectionRef.current,
        start: "top 3%",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          const progress = self.progress;
          const moveY = -scrollDistance * progress;

          gsap.set(mobileImageTrackRef.current, {
            y: moveY,
          });
        },

        onLeave: () => {
          console.log("Last image bottom reached, unpinning");
        },
      });

      return () => mobileTrigger.kill();
    }
  }, []);

  const handleMouseMove = (e) => {
    if (xToRef.current && yToRef.current) {
      xToRef.current(e.clientX - 40);
      yToRef.current(e.clientY - 40);
    }
  };

  const handleMouseEnter = (i) => {
    gsap.to(cursorRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(`.overlay-circle-${i}`, {
      clipPath: "circle(150% at 50% 100%)",
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.to(`.title-${i}`, {
      y: 0,
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = (i) => {
    gsap.to(cursorRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(`.overlay-circle-${i}`, {
      clipPath: "circle(0% at 50% 100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(`.title-${i}`, {
      y: -10,
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Custom Cursor - Desktop only */}
      <div
        ref={cursorRef}
        className="hidden md:flex fixed left-0 top-0 z-[999] h-30 w-30 items-center justify-center rounded-full bg-[#B2F6E3] pointer-events-none"
      >
        <ArrowUpRight className="h-8 w-8 text-black" />
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block relative mx-4 mt-[2vh] h-[96vh] rounded-[36px] bg-[#050816] overflow-hidden">
        <div className="absolute top-10 left-10 text-white z-10">
          <p className="text-2xl font-medium">Featured Work</p>
        </div>

        <div className="grid grid-cols-[1.05fr_0.95fr] pr-10 h-full">
          {/* LEFT SECTION - Titles */}
          <div className="relative h-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60vh] w-[50vw] overflow-hidden">
              <div ref={titleTrackRef} className="relative">
                {works.map((work, i) => (
                  <div key={i} className="flex h-20 items-center px-10">
                    <div
                      ref={(el) => (titleRefs.current[i] = el)}
                      className="opacity-[0.12]"
                    >
                      <h2 className="text-[clamp(24px,5vw,72px)] text-white font-medium tracking-[-0.06em]">
                        {work.title}
                      </h2>
                      <span className="text-white absolute -right-20 top-0">{work.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Images */}
          <div className="relative h-full overflow-hidden">
            <div
              ref={imageTrackRef}
              className="absolute w-full pt-[12vh] pb-[20vh]"
            >
              {works.map((work, i) => (
                <div key={i} className="h-[60vh] px-6 py-3">
                  <div
                    ref={(el) => (imageRefs.current[i] = el)}
                    className="relative h-full overflow-hidden rounded-[32px] cursor-none"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute bottom-10 right-10 z-20">
                    <button className="bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full text-white text-lg flex items-center gap-3">
                      <Search size={20} />
                      <span>Car Rental</span>
                      <ChartSpline size={20} />
                    </button>
                  </div>

                    <div
                      className={`overlay-circle-${i} absolute inset-0 pointer-events-none`}
                      style={{
                        backgroundColor: work.overlay,
                        clipPath: "circle(0% at 50% 100%)",
                      }}
                    />

                    <div
                      className={`title-${i} absolute top-6 left-6 opacity-0 -translate-y-2 z-10`}
                    >
                      <h3 className="text-white text-[4rem] font-semibold">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div
        ref={mobileSectionRef}
        className="md:hidden relative"
        style={{ height: `100vh` }}
      >
        {/* Pinned Container */}
        <div className="fixed top-0 left-0 right-0 h-screen rounded-2xl overflow-hidden bg-[#050816]">
          {/* Featured Work Title */}
          <div className="absolute top-6 left-6 text-white z-20">
            <p className="text-xl font-medium">Featured Work</p>
          </div>

          {/* Scrolling Images Track */}
          <div
            ref={mobileImageTrackRef}
            className="absolute top-0 left-0 w-full pt-20"
          >
            {works.map((work, i) => (
              <div key={i} className="w-full px-4 mb-6 last:mb-0">
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{ height: "300px" }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-3 right-3 z-20">
                    <button className="bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm flex items-center gap-1">
                      <Search size={16} />
                      <span>Car Rental</span>
                      <ChartSpline size={16} />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <p className="text-white font-semibold text-sm mb-1">{work.year}</p>
                    <h3 className="text-white text-4xl font-semibold leading-tight">
                      {work.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
