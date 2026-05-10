import React from "react";
import { ArrowUpRight } from "lucide-react";
import Heading from "../components/heading/Heading";

const services = [
  { title: "Digital PR", image: "/images/3.webp" },
  { title: "Organic Social & Content", image: "/images/1.webp" },
  { title: "Search & Growth Strategy", image: "/images/2.webp" },
  { title: "Content Experience", image: "/images/4.webp" },
  { title: "Data & Insights", image: "/images/1.webp" },
  { title: "Onsite SEO", image: "/images/2.webp" },
];

const heading = {
  firstTitle: "Our",
  secondTitle: "Services",
  imageSrc: "/images/2.webp",
};

const Services = () => {
  return (
    <section className="w-full py-12 px-2">
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
              px-1 py-2
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
              <div className="flex items-center gap-3 md:gap-4">
                {/* ICON (hidden on mobile) */}
                <div
                  className="
        hidden md:flex items-center justify-center
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

                {/* IMAGE (mobile only, left of title) */}
                <div className="md:hidden w-14 h-14 rounded-md overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TITLE */}
                <h3
                  className="
        text-[25px] md:text-[50px]
        font-medium text-black
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
