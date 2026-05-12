import React from "react";
import { Search, ChartSpline } from "lucide-react";

const ImageCard = ({ work, index, isActive, imageRef, onMouseMove, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="h-[60vh] px-6 py-3">
      <div
        ref={imageRef}
        className="relative h-full overflow-hidden rounded-[32px] cursor-none"
        onMouseMove={onMouseMove}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave(index)}
      >
        <img
          src={work.image}
          alt={work.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute bottom-10 right-10 z-20">
          <button className="bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full text-white text-lg flex items-center gap-3">
            <Search size={20} />
            <span>Car Rental</span>
            <ChartSpline size={20} />
          </button>
        </div>

        <div
          className={`overlay-circle-${index} absolute inset-0 pointer-events-none`}
          style={{
            backgroundColor: work.overlay,
            clipPath: "circle(0% at 50% 100%)",
          }}
        />

        <div
          className={`title-${index} absolute top-6 left-6 opacity-0 -translate-y-2 z-10`}
        >
          <h3 className="text-white text-[4rem] font-semibold">{work.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;