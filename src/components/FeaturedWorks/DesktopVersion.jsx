import React, { useRef, forwardRef } from "react";
import TitleItem from "./TitleItem";
import ImageCard from "./ImageCard";

const DesktopVersion = forwardRef(({ 
  titleTrackRef, 
  imageTrackRef, 
  titleRefs, 
  imageRefs, 
  works, 
  activeIndex,
  handleMouseMove,
  handleMouseEnter,
  handleMouseLeave 
}, ref) => {
  return (
    <div ref={ref} className="hidden md:block relative mx-4 mt-[2vh] h-[96vh] rounded-[36px] bg-[#050816] overflow-hidden">
      <div className="absolute top-10 left-10 text-white z-10">
        <p className="text-2xl font-medium">Featured Work</p>
      </div>

      <div className="grid grid-cols-[1.05fr_0.95fr] pr-10 h-full">
        {/* LEFT SECTION - Titles */}
        <div className="relative h-full">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60vh] w-[50vw] overflow-hidden">
            <div ref={titleTrackRef} className="relative">
              {works.map((work, i) => (
                <TitleItem
                  key={i}
                  work={work}
                  index={i}
                  isActive={activeIndex === i}
                  titleRef={(el) => (titleRefs.current[i] = el)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Images */}
        <div className="relative h-full overflow-hidden">
          <div ref={imageTrackRef} className="absolute w-full pt-[12vh] pb-[20vh]">
            {works.map((work, i) => (
              <ImageCard
                key={i}
                work={work}
                index={i}
                isActive={activeIndex === i}
                imageRef={(el) => (imageRefs.current[i] = el)}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

DesktopVersion.displayName = "DesktopVersion";
export default DesktopVersion;