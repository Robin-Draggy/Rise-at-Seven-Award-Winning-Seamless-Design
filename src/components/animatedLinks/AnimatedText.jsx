import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const lettersRef = useRef([]);

  useGSAP(() => {
    const text = "Ready To Rise At Seven?";
    const container = textContainerRef.current;

    if (!container) return;

    const viewportWidth = window.innerWidth;

    // Position calculations
    const startX = viewportWidth + 700;
    const middleX = viewportWidth - 150;
    const endX = -2000;

    // Clear and create letter spans
    container.innerHTML = "";
    lettersRef.current = [];

    const characters = text.split("");

    characters.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.fontSize = "clamp(5rem, 15vw, 15rem)";
      span.style.fontWeight = "700";
      span.style.color = "#111212";
      span.style.marginRight = "-0.09em";

      if (char === " ") {
        span.style.width = "clamp(0.5rem, 1.5vw, 1rem)";
        span.style.marginRight = "0";
      }

      container.appendChild(span);
      lettersRef.current.push(span);
    });

    const letters = lettersRef.current;

    // Set initial position
    gsap.set(letters, {
      y: -700,
      x: startX,
    });

    // SINGLE TIMELINE - Extended scroll range
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "bottom 20%", 
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    tl.to(letters, {
      y: 3,
      x: middleX,
      ease: "none",
      stagger: {
        each: 0.003,
        from: "start",
      },
    });

    // Second movement: all letters together to end position
    tl.to(letters, {
      y: 0,
      x: endX,
      ease: "none",
      stagger: {
        each: 0.003,
        from: "start",
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] w-full overflow-hidden flex items-center justify-start bg-[#EFEEEC]"
    >
      <div className="relative w-full overflow-visible">
        <div
          ref={textContainerRef}
          className="whitespace-nowrap"
          style={{
            display: "inline-block",
            letterSpacing: "-0.02em",
            position: "relative",
          }}
        />
      </div>
    </section>
  );
};

export default AnimatedText;
