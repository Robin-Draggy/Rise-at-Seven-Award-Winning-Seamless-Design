import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "../data/StackedCards";

gsap.registerPlugin(ScrollTrigger);



const StackedCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---------------- DESKTOP GSAP ----------------
  useGSAP(() => {
    if (window.innerWidth < 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 5%",
        end: "+=1000",
        scrub: true,
        pin: true,
      },
    });

    cardsRef.current.forEach((card, i) => {
      tl.to(
        card,
        {
          y: -900,
          rotate: -40,
          ease: "none",
        },
        i * 0.4,
      );
    });
  }, []);

  // ---------------- MOBILE SCROLL TRACKING ----------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;

      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-8 md:py-16">
      <h1 className="text-xl text-center tracking-tighter capitalize mb-10">
        legacy in the making
      </h1>

      <section
        ref={sectionRef}
        className="relative md:h-[70vh] flex items-center justify-center"
      >
        {/* ================= DESKTOP STACK ================= */}
        <div className="relative hidden md:block w-135 h-135">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl p-8 flex flex-col items-center"
              style={{
                backgroundColor: card.bg,
                zIndex: cards.length - i,
                transform: `translateY(${i * 20}px) translateX(${i * 8}px) rotate(${i * 4}deg)`,
              }}
            >
              <img
                src={card.image}
                className="w-[160px] h-[160px] object-cover rounded-xl shadow-md"
              />

              <div
                className={`text-center space-y-3 ${
                  i === 0 ? "text-white" : "text-black"
                }`}
              >
                <h3 className="text-[4vw] font-medium">{card.title}</h3>
                <p className="text-md opacity-80">{card.descOne}</p>
                {card.descTwo && (
                  <p className="text-md opacity-80">{card.descTwo}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE SWIPE CAROUSEL ================= */}
        <div className="md:hidden w-full">
          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="
      flex overflow-x-auto scroll-smooth
      snap-x snap-mandatory
      scrollbar-hide
    "
          >
            {cards.map((card, i) => (
              <div key={i} className="min-w-full snap-center px-4">
                <div
                  className="rounded-3xl p-6 flex flex-col items-center transition-all duration-500"
                  style={{ backgroundColor: card.bg }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-40 h-40 object-cover rounded-xl mb-4"
                  />

                  <h3
                    className={`text-2xl font-medium text-center ${
                      i === 0 ? "text-white" : "text-black"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-sm mt-3 text-center opacity-80 ${
                      i === 0 ? "text-white" : "text-black"
                    }`}
                  >
                    {card.descOne}
                  </p>

                  {card.descTwo && (
                    <p
                      className={`text-sm mt-2 text-center opacity-80 ${
                        i === 0 ? "text-white" : "text-black"
                      }`}
                    >
                      {card.descTwo}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Indicator Bar - Exactly as you specified */}
          <div className="md:hidden mt-6 relative h-[3px] w-full bg-white rounded-full overflow-hidden">
            <div
              className="
        absolute top-0 left-0
        h-full bg-black rounded-full
        transition-all duration-500
      "
              style={{
                width: `${100 / cards.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackedCards;
