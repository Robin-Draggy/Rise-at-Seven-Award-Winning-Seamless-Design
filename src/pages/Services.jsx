import React from "react";
import { ArrowUpRight } from "lucide-react";
import Heading from "../components/heading/Heading";

const services = [
  { title: "SEO Strategy", image: "/images/1.webp" },
  { title: "Content Marketing", image: "/images/2.webp" },
  { title: "Digital PR", image: "/images/3.webp" },
  { title: "Social Media", image: "/images/4.webp" },
  { title: "Brand Strategy", image: "/images/1.webp" },
  { title: "Performance Marketing", image: "/images/2.webp" },
];

const heading = {
  firstTitle: "Our",
  secondTitle: "Services",
  imageSrc: "/images/2.webp",
};

const Services = () => {
  return (
    <section className="w-full bg-[#EFEEEC] py-24 px-6">
      <Heading
        firstTitle={heading.firstTitle}
        secondTitle={heading.secondTitle}
        imageSrc={heading.imageSrc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((item, i) => (
          <div
            key={i}
            className="
              group relative overflow-hidden rounded-full
              px-6 py-4
              cursor-pointer
              transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            "
          >
            {/* BACKGROUND IMAGE */}
            <div
              className="
              absolute inset-0 opacity-0 scale-110
              group-hover:opacity-100 group-hover:scale-100
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            "
            >
              <img
                src={item.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* DARK OVERLAY */}
            <div
              className="
              absolute inset-0 bg-black/0
              group-hover:bg-black/50
              transition-all duration-500
            "
            />

            {/* CONTENT */}
            <div className="relative flex items-center justify-between z-10">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div
                  className="
      flex items-center justify-center
      opacity-0 w-0
      group-hover:opacity-100 group-hover:w-[56px]
      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    "
                >
                  <ArrowUpRight
                    size={40}
                    className="
        text-white
        translate-y-2
        group-hover:translate-y-0
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      "
                  />
                </div>

                {/* TITLE */}
                <h3
                  className="
      text-[50px] font-medium text-black
      group-hover:text-white
      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    "
                >
                  {item.title}
                </h3>
              </div>
            </div>
            <hr className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full border-t border-black/20" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
