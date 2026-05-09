import React, { useRef } from "react";
import gsap from "gsap";

import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiArrowRightUpLine,
  RiYoutubeFill,
  RiTwitterXLine,
  RiTiktokLine,
} from "@remixicon/react";

const SocialButton = ({ icon }) => {
  const buttonRef = useRef(null);

  const handleEnter = () => {
    gsap.to(buttonRef.current, {
      borderRadius: "6px",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      borderRadius: "9999px",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="bg-white px-1 py-0.5 flex items-center gap-2 rounded-full cursor-pointer"
      style={{
        border: "none",
        outline: "none",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center text-black">
        {icon}
      </div>

      {/* RIGHT ICON */}
      <div className="text-black">
        <RiArrowRightUpLine size={14} />
      </div>
    </button>
  );
};

const Socials = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">

      <SocialButton
        icon={<RiFacebookFill size={14} />}
      />

      <SocialButton
        icon={<RiTwitterXLine size={14} />}
      />

      <SocialButton
        icon={<RiLinkedinFill size={14} />}
      />

      <SocialButton
        icon={<RiYoutubeFill size={14} />}
      />   

      <SocialButton
        icon={<RiTiktokLine size={14} />}
      />

      <SocialButton
        icon={<RiInstagramLine size={14} />}
      />

    </div>
  );
};

export default Socials;