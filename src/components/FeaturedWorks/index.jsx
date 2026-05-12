import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "../../data/FeaturedWorks";
import CustomCursor from "./CustomCursor";
import DesktopVersion from "./DesktopVersion";
import MobileVersion from "./MobileVersion";
import Button from "../buttons/Button";

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
  const xToRef = useRef(null);
  const yToRef = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Desktop version animation
      const maxTitleMove = TITLE_HEIGHT * (works.length - 4);
      const maxImageMove = window.innerHeight * 0.68 * (works.length - 1);

      gsap.set(titleRefs.current[0], { opacity: 1, x: 70 });
      gsap.set(imageRefs.current[0], { scale: 1, xPercent: 0 });
      gsap.set(cursorRef.current, { opacity: 0, scale: 0.6 });

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

      gsap.set(mobileImageTrackRef.current, { y: 0 });

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
          gsap.set(mobileImageTrackRef.current, { y: moveY });
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
    <section ref={sectionRef} className="relative min-h-screen pb-10 overflow-hidden">
      <CustomCursor ref={cursorRef} />
      
      <DesktopVersion
        ref={sectionRef}
        titleTrackRef={titleTrackRef}
        imageTrackRef={imageTrackRef}
        titleRefs={titleRefs}
        imageRefs={imageRefs}
        works={works}
        activeIndex={activeIndexRef.current}
        handleMouseMove={handleMouseMove}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <MobileVersion
        ref={mobileSectionRef}
        mobileImageTrackRef={mobileImageTrackRef}
        works={works}
      />
      <div className="mt-5 flex items-center justify-center">
        <Button title="Explore Our Work" />
      </div>
    </section>
  );
};

export default FeaturedWorks;