import React from "react";

const TitleItem = ({ work, index, isActive, titleRef }) => {
  return (
    <div className="flex h-24 items-center px-10">
      <div
        ref={titleRef}
        className={`transition-all duration-500 ${
          isActive ? "opacity-100" : "opacity-[0.12]"
        }`}
      >
        <h2 className="text-[clamp(24px,5vw,72px)] text-white font-medium tracking-[-0.06em]">
          {work.title}
        </h2>
        <span className="text-white absolute -right-20 top-0">{work.year}</span>
      </div>
    </div>
  );
};

export default TitleItem;