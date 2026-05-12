import { ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";
import { useHoverMotion } from "../../hooks/useHoverMotion";

const Button = ({ title }) => {
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
      borderRadiusTo: "999px",
      y: 0,
    },
  });

  return (
    <button
      ref={buttonRef}
      className="
        bg-white
        cursor-pointer
        overflow-hidden
        w-full md:w-auto
        rounded-full
      "
      style={{
        padding: 0,
        border: "none",
        outline: "none",
      }}
    >
      {/* MASK */}
      <div className="overflow-hidden h-12">
        {/* TRACK */}
        <div ref={trackRef} className="flex flex-col items-center">
          {/* TOP */}
          <div
            className="
    h-12
    px-4
    flex items-center justify-center
  "
          >
            <span className="flex items-center gap-1 capitalize text-gray-800 font-medium whitespace-nowrap">
              {title}
              <ArrowUpRight size={14} />
            </span>
          </div>

          {/* BOTTOM */}
          <div
            className="
    h-12
    px-4
    flex items-center justify-center
  "
          >
            <span className="flex items-center gap-2 capitalize text-gray-800 font-medium whitespace-nowrap">
              {title}
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Button;
