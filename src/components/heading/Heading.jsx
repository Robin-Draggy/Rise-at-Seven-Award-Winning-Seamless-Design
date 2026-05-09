import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../buttons/Button";

gsap.registerPlugin(ScrollTrigger);

const Heading = ({ firstTitle, secondTitle, imageSrc }) => {
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      imgRef.current,
      {
        scale: 0,
        opacity: 0,
        width: 0,
      },
      {
        scale: 1,
        opacity: 1,
        width: "6vw", // matches text size rhythm
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-between pb-6 border-b border-black/20 mb-8"
    >
      <div className="flex items-center gap-4">

        <h1 className="text-[6vw] font-[500] leading-none">
          {firstTitle}
        </h1>

        {/* IMAGE (animated insert) */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt="image"
          className="h-[6vw] w-[6vw] rounded-2xl object-cover origin-center"
        />

        <h1 className="text-[6vw] font-[500] leading-none">
          {secondTitle}
        </h1>

      </div>

      <div>
        <Button />
      </div>
    </div>
  );
};

export default Heading;