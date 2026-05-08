import React, { useRef } from "react";
import { useHoverMotion } from "../../hooks/useHoverMotion";

const TopBar = () => {
  const barRef = useRef(null);
  const trackRef = useRef(null);

  useHoverMotion({
    containerRef: barRef,
    trackRef,
    enter: {
      borderRadiusTo: "8px",
      y: -20,
    },
    leave: {
      borderRadiusTo: "9999px",
      y: 0,
    },
  });

  return (
    <div
      ref={barRef}
      className="relative z-40 h-8 w-full flex items-center justify-center bg-[#B2F6E3] overflow-hidden"
    >
      <div className="h-2 pt-5 overflow-hidden flex items-center justify-center">
        <div ref={trackRef} className="flex flex-col items-center">
          <div className="h-5 flex items-center">
            <h3 className="text-sm font-bold px-4 capitalize">
              🚨 The Category Leaderboard - Live Now
            </h3>
          </div>
          <div className="h-5 flex items-center">
            <h3 className="text-sm font-bold px-4">
              🚨 The Category Leaderboard - Live Now
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;