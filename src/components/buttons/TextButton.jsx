import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const TextButton = ({ title }) => {
  const trackRef = useRef(null);

  const handleEnter = () => {
    gsap.to(trackRef.current, {
      y: -48,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(trackRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <button
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="
        relative
        overflow-hidden
        cursor-pointer
        w-full md:w-auto
        bg-transparent
        border-none
        outline-none
        p-0
        rounded-full
      "
    >
      {/* MASK */}
      <div className="overflow-hidden h-12">
        
        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex flex-col will-change-transform"
        >

          {/* TOP TEXT */}
          <div
            className="
              h-12
              min-w-full md:min-w-[170px]
              px-6
              flex items-center justify-center
            "
          >
            <span
              className="
                flex items-center gap-2
                text-[#111212]
                font-medium
                text-base
                whitespace-nowrap
              "
            >
              {title}
              <ArrowUpRight size={16} />
            </span>
          </div>

          {/* BOTTOM TEXT */}
          <div
            className="
              h-12
              min-w-full md:min-w-[170px]
              px-6
              flex items-center justify-center
            "
          >
            <span
              className="
                flex items-center gap-2
                text-[#111212]
                font-medium
                text-base
                whitespace-nowrap
              "
            >
              {title}
              <ArrowUpRight size={16} />
            </span>
          </div>

        </div>
      </div>
    </button>
  );
};

export default TextButton;