import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Pioneers",
    image: "/images/1.webp",
    bg: "#000000",
    descOne:
      "We’re dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    descTwo:
      "We’re on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
  },
  {
    title: "Award Winning",
    image: "/images/2.webp",
    bg: "#B2F6E3",
    descOne:
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
  },
  {
    title: "Speed",
    image: "/images/3.webp",
    bg: "#FFFFFF",
    descOne:
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster.",
  },
];

const StackedCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 5%",
        end: "+=1000",
        markers: true,
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

  return (
    <div className="py-20">
      <div>
        <h1 className="text-[1.5rem] text-center tracking-tighter capitalize">
          legacy in the making
        </h1>
      </div>
      <section
        ref={sectionRef}
        className="relative h-[70vh] flex items-center justify-center"
      >
        <div className="relative w-135 h-135">
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
              {/* IMAGE */}
              <div className="w-full flex justify-center">
                <img
                  src={card.image}
                  alt=""
                  className="w-[160px] h-[160px] object-cover rounded-xl shadow-md"
                />
              </div>

              {/* CONTENT - First card text white, others black */}
              <div
                className={`text-center space-y-3 ${i === 0 ? "text-white" : "text-black"}`}
              >
                <h3 className="text-[4vw] font-medium">{card.title}</h3>

                <p className="text-md w-[89%] mx-auto leading-snug opacity-80">
                  {card.descOne}
                </p>

                {card.descTwo && (
                  <p className="text-md mx-auto w-[90%] leading-snug opacity-80">
                    {card.descTwo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StackedCards;
