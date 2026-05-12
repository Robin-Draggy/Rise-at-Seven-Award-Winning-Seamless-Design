import React, { useRef, useState } from "react";
import { ArrowUpRight, Timer } from "lucide-react";
import gsap from "gsap";
import Heading from "../components/heading/Heading";

const items = [
  {
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    image: "/images/1.webp",
    name: "Ray Saddiq",
    time: "3 mins",
    avatar: "/images/10.webp",
  },
  {
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    image: "/images/2.webp",
    name: "Ray Saddiq",
    time: "3 mins",
    avatar: "/images/11.webp",
  },
  {
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    image: "/images/3.webp",
    name: "Carrie Rose",
    time: "3 mins",
    avatar: "/images/2.webp",
  },
];

const heading = {
  firstTitle: "What's",
  secondTitle: "New",
  imageSrc: "/images/7.webp",
};

const HoverGallery = () => {
  const cursorRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const moveCursor = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX - 40,
      y: e.clientY - 40,
      duration: 0.15,
      ease: "power3.out",
    });
  };

  const showCursor = () => {
    document.body.style.cursor = "none";

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const hideCursor = () => {
    document.body.style.cursor = "auto";

    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const liftCard = (i) => {
    gsap.to(cardRefs.current[i], {
      y: -20,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const resetCard = (i) => {
    gsap.to(cardRefs.current[i], {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      onMouseMove={moveCursor}
      className="relative w-full py-24 px-6"
    >
      {/* HEADING */}
      <Heading
        firstTitle={heading.firstTitle}
        secondTitle={heading.secondTitle}
        imageSrc={heading.imageSrc}
        btnTitle="Explore More Thoughts"
      />

      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="
          fixed top-0 left-0 z-[999]
          pointer-events-none
          w-30 h-30
          rounded-full
          bg-[#B2F6E3]
          flex items-center justify-center
          scale-0 opacity-0
        "
      >
        <ArrowUpRight className="text-black w-12 h-12" />
      </div>

      {/* CONTENT */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={(e) => {
            const el = e.target;
            const index = Math.round(el.scrollLeft / el.offsetWidth);
            setActiveIndex(index);
          }}
          className="
            flex md:grid md:grid-cols-3
            gap-6 md:gap-8
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory
            scrollbar-hide
          "
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => {
                if (window.innerWidth >= 768) {
                  showCursor();
                  liftCard(i);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768) {
                  hideCursor();
                  resetCard(i);
                }
              }}
              className="
                group
                cursor-pointer md:cursor-none
                min-w-[85%] md:min-w-0
                snap-center
              "
            >
              {/* IMAGE CARD */}
              <div
                className="
                  relative
                  h-[420px] md:h-[500px]
                  overflow-hidden
                  rounded-[2rem]
                "
              >
                {/* MAIN IMAGE */}
                <img
                  src={item.image}
                  alt=""
                  className="
                    absolute inset-0
                    w-full h-full object-cover
                    transition-transform duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-[1.03]
                  "
                />

                {/* CINEMATIC BLUR REVEAL */}
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                    pointer-events-none
                  "
                >
                  <div
                    className="
                      absolute inset-0
                      overflow-hidden
                      [clip-path:circle(0%_at_50%_100%)]
                      group-hover:[clip-path:circle(140%_at_50%_100%)]
                      transition-all duration-[1200ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                  >
                    {/* HEAVILY BLURRED DUPLICATE */}
                    <img
                      src={item.image}
                      alt=""
                      className="
                        absolute inset-0
                        w-full h-full
                        object-cover
                        scale-[1.15]
                        blur-[35px]
                        brightness-110
                        opacity-100
                      "
                    />

                    {/* SOFT FOG */}
                    <div
                      className="
                        absolute inset-0
                        bg-white/10
                      "
                    />

                    {/* CINEMATIC DARKNESS */}
                    <div
                      className="
                        absolute inset-0
                        bg-black/20
                      "
                    />
                  </div>
                </div>

                {/* DEFAULT OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-black/10
                    group-hover:bg-black/30
                    transition-all duration-700
                  "
                />
              </div>

              {/* META */}
              <div className="flex items-center gap-3 mt-4">
                <div className="bg-white flex items-center gap-2 px-3 py-1 rounded-full">
                  <img
                    src={item.avatar}
                    className="w-5 h-5 rounded-full"
                    alt=""
                  />
                  <h5 className="text-gray-600 text-sm">
                    {item.name}
                  </h5>
                </div>

                <div className="bg-white flex items-center gap-2 px-3 py-1 rounded-full text-gray-600 text-sm">
                  <Timer className="w-4 h-4" />
                  {item.time}
                </div>
              </div>

              {/* TITLE */}
              <div className="mt-4 px-2">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE INDICATOR */}
        <div className="md:hidden mt-6 relative h-[3px] w-full bg-white rounded-full overflow-hidden">
          <div
            className="
              absolute top-0 left-0
              h-full bg-black rounded-full
              transition-all duration-500
            "
            style={{
              width: `${100 / items.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HoverGallery;