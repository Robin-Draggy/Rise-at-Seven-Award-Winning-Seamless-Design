import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";
import { useHoverMotion } from "../../hooks/useHoverMotion";

const Button = () => {
  const buttonRef = useRef(null);
  const trackRef = useRef(null);

  useHoverMotion({
  containerRef: buttonRef,
  trackRef,
  enter: {
    borderRadiusTo: "12px",
    y: -48,
  },
  leave: {
    borderRadiusTo: "100px",
    y: 0,
  },
});

  return (
    <button
      ref={buttonRef}
      className="bg-white cursor-pointer overflow-hidden"
      style={{ padding: 0, border: "none", outline: "none" }}
    >
      <div className="overflow-y-hidden" style={{ height: "48px" }}>
        <div ref={trackRef} className="flex flex-col items-center">
          <div
            className="flex items-center justify-center"
            style={{ height: "48px", width: "120px" }}
          >
            <span className="flex items-center gap-1 capitalize text-gray-800 font-medium">
              Get in touch <ArrowUpRight size={14} />
            </span>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ height: "48px", width: "150px" }}
          >
            <span className="flex items-center gap-2 text-gray-800 font-medium">
              Get in touch <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Button;