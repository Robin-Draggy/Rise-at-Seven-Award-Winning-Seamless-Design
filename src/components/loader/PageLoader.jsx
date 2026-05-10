import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ onComplete });

    // START: tiny circle at bottom center
    gsap.set(loaderRef.current, {
      clipPath: "circle(0% at 50% 100%)",
    });

    // EXPAND: iris reveal
    tl.to(loaderRef.current, {
      clipPath: "circle(160% at 50% 100%)",
      duration: 1.6,
      ease: "power4.inOut",
    })

      .to({}, { duration: 0.1 })

      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-[#B2F6E3] will-change-[clip-path]"
    />
  );
};

export default PageLoader;