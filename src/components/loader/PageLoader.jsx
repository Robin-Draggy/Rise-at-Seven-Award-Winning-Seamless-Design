import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";


const PageLoader = ({ onComplete }) => {
  const curtain = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ onComplete });

    tl
      // Brief hold so user sees the full red screen
      .to({}, { duration: 0.3 })

      // Wipe upward — curtain slides off the top of the screen
      // The bottom curved edge is the last thing visible
      .to(
        curtain.current,
        {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "wipe"
      )

      // As it exits, the bottom curve becomes MORE pronounced —
      // the trailing edge lags behind, creating a wave/fabric feel
      .to(
        pathRef.current,
        {
          attr: {
            // Bottom control point drops further down (more bulge)
            // as the panel accelerates upward
            d: "M0 0 H100 V100 Q50 120 0 100 Z",
          },
          duration: 1.2,
          ease: "power4.inOut",
        },
        "wipe"
      );
  }, []);

  return (
    // Curtain starts in place (y: 0), covering the full screen
    <div
      ref={curtain}
      className="fixed inset-0 z-60 will-change-transform"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          ref={pathRef}
          fill="#B2F6E3"
          d="M0 0 H100 V100 Q50 110 0 100 Z"
        />
      </svg>
    </div>
  );
};

export default PageLoader;