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
    },
    {
      scale: 1,
      opacity: 1,
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
      className="flex items-center justify-between pb-6 border-none md:border-b border-black/20 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
        <h1 className="text-[4rem] font-[500] leading-none">
          {firstTitle}
        </h1>

        {/* IMAGE (animated insert) */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt="image"
          className="h-16 w-16 rounded-2xl object-cover"
        />
        </div>

        <h1 className="text-[4rem] font-[500] leading-none">
          {secondTitle}
        </h1>

      </div>

      <div className="hidden md:block">
        <Button />
      </div>
    </div>
  );
};

export default Heading;