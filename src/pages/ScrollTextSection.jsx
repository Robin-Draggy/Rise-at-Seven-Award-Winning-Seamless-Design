import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT = "Ready To Rise At Seven?";

const ScrollTextSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lettersRef = useRef([]);

  useGSAP(() => {
    const letters = lettersRef.current;
    const track = trackRef.current;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    
    // Initial position: Set track to start at right side
    gsap.set(track, {
      x: viewportWidth  // Start at exact right edge of screen
    });
    
    // Set initial position for each letter (above screen)
    gsap.set(letters, {
      y: -300,      // Each letter starts 300px ABOVE its position
    });
    
    // Create a timeline for sequential animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",      // Start when section hits 80% of viewport
        end: "bottom top",     // End when section bottom hits viewport top
        scrub: 1.5,            // Smooth scroll following
        markers: true,         // Shows start/end markers (remove in production)
      }
    });
    
    // Phase 1: Letters drop from Y: -300 to Y: 0
    tl.to(letters, {
      y: 0,           // Drop to normal position
      ease: "bounce.out",
      stagger: {
        each: 0.05,
        from: "start"
      },
      duration: 1.5
    })
    // Phase 2: Text moves from right to left
    .to(track, {
      x: -viewportWidth - 200,  // Move to left off-screen
      ease: "none",
      duration: 2
    });
    
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Visual guides to show Y-axis movement */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500/50 z-10 pointer-events-none">
        <div className="absolute -top-6 left-4 text-xs text-red-500 font-bold">Y: 0 (landing point)</div>
      </div>
      <div className="absolute top-[-300px] left-0 right-0 h-0.5 bg-blue-500/50 z-10 pointer-events-none">
        <div className="absolute -top-6 left-4 text-xs text-blue-500 font-bold">Y: -300 (starting point)</div>
      </div>
      
      {/* Text Track - This container moves horizontally */}
      <div className="absolute inset-0 flex items-center justify-start">
        <h1
          ref={trackRef}
          className="text-6vw font-bold uppercase tracking-tight text-gray-900 whitespace-nowrap"
          style={{ 
            fontFamily: "'Poppins', 'Arial', sans-serif",
            fontSize: "6vw"
          }}
        >
          {TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block"
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm animate-bounce">
        ↓ Scroll down ↓
      </div>
    </section>
  );
};

export default ScrollTextSection;