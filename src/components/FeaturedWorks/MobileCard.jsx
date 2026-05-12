import React from "react";
import { Search, ChartSpline } from "lucide-react";

const MobileCard = ({ work }) => {
  return (
    <div className="w-full px-4 mb-6 last:mb-0">
      <div className="relative rounded-lg overflow-hidden" style={{ height: "300px" }}>
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3 z-20">
          <button className="bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm flex items-center gap-1">
            <Search size={16} />
            <span>Car Rental</span>
            <ChartSpline size={16} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10">
          <p className="text-white font-semibold text-sm mb-1">{work.year}</p>
          <h3 className="text-white text-4xl font-semibold leading-tight">
            {work.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;