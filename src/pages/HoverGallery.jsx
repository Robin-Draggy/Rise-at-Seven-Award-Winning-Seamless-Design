import React, { useRef } from "react";
import { ArrowUpRight, Timer } from "lucide-react";
import gsap from "gsap";
import Button from "../components/buttons/Button";

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

const HoverGallery = () => {
  const cursorRef = useRef(null);
  const cardRefs = useRef([]);

  const moveCursor = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX - 40,
      y: e.clientY - 40,
      duration: 0.15,
      ease: "power3.out",
    });
  };

  const showCursor = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const hideCursor = () => {
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
    <section onMouseMove={moveCursor} className="relative w-full py-24 px-6">   

        {/* HEADING */}
        <div className="flex items-center justify-between border-b border-[1] border-black/20 mb-8">
            <div className="heading flex items-center gap-4">
                <h1 className="text-[6vw] font-[500]">What's</h1>
                <img src="/images/7.webp" alt="image" className="h-24 w-24 rounded-2xl" />
                <h1 className="text-[6vw] font-[500]">New</h1>
            </div>
            <div>
                <Button />
            </div>
        </div>

      {/* CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[999] pointer-events-none w-30 h-30 rounded-full bg-[#B2F6E3] flex items-center justify-center scale-0 opacity-0"
      >
        <ArrowUpRight className="text-black w-12 h-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CARD */}
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="group cursor-none"
            onMouseEnter={() => {
              showCursor();
              liftCard(i);
            }}
            onMouseLeave={() => {
              hideCursor();
              resetCard(i);
            }}
          >
            {/* IMAGE WRAPPER */}
            <div className="relative h-[500px] overflow-hidden rounded-[2rem]">
              {/* MAIN IMAGE */}
              <img
                src={item.image}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                alt=""
              />

              {/* BLUR REVEAL */}
              <div className="absolute inset-0 blur-reveal">
                <img
                  src={item.image}
                  className="w-full h-full object-cover blur-xl scale-110"
                  alt=""
                />
              </div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-700" />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="bg-white flex items-center gap-3 px-3 py-1 rounded-full">
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-5 h-5 rounded-full"
                />
                <h5 className="text-gray-600">{item.name}</h5>
              </div>
              <div className="bg-white text-gray-600 flex items-center gap-3 px-3 py-1 rounded-full">
                <Timer />
                <h5>{item.time}</h5>
              </div>
            </div>

            {/* TITLE BELOW IMAGE */}
            <div className="mt-4 px-2">
              <h3 className="heading text-3xl w-[90%] font-medium tracking-tight">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverGallery;
