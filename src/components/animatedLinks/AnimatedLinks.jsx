import React, { useRef } from "react";
import gsap from "gsap";

const AnimatedLink = ({ text }) => {
  const wrapperRef = useRef(null);

  const handleEnter = () => {
    const top = wrapperRef.current.querySelector(".top-text");
    const bottom = wrapperRef.current.querySelector(".bottom-text");

    gsap.to(top, {
      yPercent: -100,
      color: "#B2F6E3",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(bottom, {
      yPercent: -100,
      color: "#B2F6E3",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const top = wrapperRef.current.querySelector(".top-text");
    const bottom = wrapperRef.current.querySelector(".bottom-text");

    gsap.to(top, {
      yPercent: 0,
      color: "#ffffff",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(bottom, {
      yPercent: 0,
      color: "#ffffff",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-[2.2rem] overflow-hidden cursor-pointer"
    >
      {/* TOP TEXT */}
      <div className="top-text">
        <h4 className="text-xl md:text-2xl tracking-tight capitalize">
          {text}
        </h4>
      </div>

      {/* BOTTOM TEXT */}
      <div className="bottom-text absolute left-0 top-full">
        <h4 className="text-xl md:text-2xl tracking-tight capitalize">
          {text}
        </h4>
      </div>
    </div>
  );
};

export default AnimatedLink;