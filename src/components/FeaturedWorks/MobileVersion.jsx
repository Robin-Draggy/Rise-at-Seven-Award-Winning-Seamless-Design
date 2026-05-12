import React, { forwardRef } from "react";
import MobileCard from "./MobileCard";

const MobileVersion = forwardRef(({ mobileImageTrackRef, works }, ref) => {
  return (
    <div ref={ref} className="md:hidden relative" style={{ height: `100vh` }}>
      {/* Pinned Container */}
      <div className="fixed top-0 left-0 right-0 h-screen rounded-2xl overflow-hidden bg-[#050816]">
        {/* Featured Work Title */}
        <div className="absolute top-6 left-6 text-white z-20">
          <p className="text-xl font-medium">Featured Work</p>
        </div>

        {/* Scrolling Images Track */}
        <div ref={mobileImageTrackRef} className="absolute top-0 left-0 w-full pt-20">
          {works.map((work, i) => (
            <MobileCard key={i} work={work} />
          ))}
        </div>
      </div>
    </div>
  );
});

MobileVersion.displayName = "MobileVersion";
export default MobileVersion;