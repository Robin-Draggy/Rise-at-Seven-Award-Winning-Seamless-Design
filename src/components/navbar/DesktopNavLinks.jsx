import React from "react";
import { Plus } from "lucide-react";

const DesktopNavLinks = ({ links, onHover, isScrolled = false }) => {
  return (
    <div className="hidden items-center lg:flex">
      {links.map((link, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => {
            if (link.dropdown) onHover(i);
          }}
        >
          <a
            href="#"
            className={`
              flex items-center gap-1 rounded-full px-4 py-2.5 text-md font-medium 
              transition-all duration-300 ease-out
              ${isScrolled 
                ? "text-gray-900 hover:bg-gray-100 hover:text-black" 
                : "text-white hover:bg-white/20 hover:text-white"
              }
            `}
          >
            <span className="tracking-tight">{link.label}</span>
            {link.dropdown && (
              <Plus 
                size={14} 
                className={`transition-transform duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              />
            )}
          </a>
        </div>
      ))}
    </div>
  );
};

export default DesktopNavLinks;