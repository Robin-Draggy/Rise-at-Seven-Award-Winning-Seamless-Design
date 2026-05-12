import React, { useEffect } from "react";
import { X, CircleChevronUp } from "lucide-react";
import Button from "../buttons/Button";
import Logo from "./Logo";

const MobileMenu = ({ isOpen, onClose, links }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black/70 m-2 rounded-4xl backdrop-blur-lg transition-all duration-500 lg:hidden">
      <div className="flex h-full flex-col px-4 py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo className="w-36" />
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full"
          >
            <X size={25} />
          </button>
        </div>

        {/* Links */}
        <div className="mt-7 flex flex-1 flex-col leading-7">
          {links.map((link, i) => (
            <MobileMenuItem
              key={i}
              link={link}
              index={i}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto pb-2">
          <Button title="Get In Touch" />
        </div>
      </div>
    </div>
  );
};

const MobileMenuItem = ({ link, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;

  return (
    <div className="mb-2">
      <button
        onClick={() => {
          if (!link.subLinks) return;
          setOpenIndex(isOpen ? null : index);
        }}
        className="group flex w-full items-center justify-between text-[2.2rem] font-medium"
      >
        <span>{link.label}</span>
        {link.subLinks && (
          <div
            className={`flex h-8 w-8 items-center justify-center transition-all duration-300 ${
              isOpen ? "rotate-180" : "group-hover:rotate-90"
            }`}
          >
            <CircleChevronUp size={28} />
          </div>
        )}
      </button>

      {link.subLinks && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "max-h-40 opacity-100 mt-4 pb-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3">
            {link.subLinks.map((sub, idx) => (
              <a key={idx} href="#" className="block text-xl font-semibold">
                {sub}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;