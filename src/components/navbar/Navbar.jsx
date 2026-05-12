import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import DesktopNavLinks from "./DesktopNavLinks";
import DesktopDropdown from "./DesktopDropdown";
import { links } from "../../data/Navlinks";
import NavButton from "../buttons/NavButton";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const activeItem = activeIndex !== null ? links[activeIndex] : null;

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Check if we should switch to fixed mode
      if (currentScrollY > 10) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }

      // Check background style when scrolled more
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Apple-style hide/show on scroll (only when fixed)
      if (isFixed) {
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          setIsVisible(false); // Scrolling down - hide
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true); // Scrolling up - show
        }
      } else {
        setIsVisible(true); // Always visible when not fixed
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, isFixed]);

  return (
    <div className="relative z-40">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-10 transition-all duration-500 ${
          activeItem?.dropdown
            ? "opacity-100 backdrop-blur-md bg-black/20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <MobileMenu
        isOpen={mobileMenu}
        onClose={() => setMobileMenu(false)}
        links={links}
      />

      {/* Navbar - Changes from absolute to fixed on scroll */}
      <div
        className={`
          ${isFixed ? "fixed top-0 md:top-3 left-0 right-0" : "absolute top-0 left-0 right-0"}
          z-30 rounded-none md:rounded-full mx-0 md:mx-3
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isVisible ? "translate-y-0" : "-translate-y-32"}
          ${isFixed && isScrolled ? "bg-gradient-to-b from-white/70 via-white/60 to-white/50 backdrop-blur-md" : "bg-transparent"}
        `}
      >
        <div className="pl-5 pr-3">
          <div className="flex items-center justify-between h-16">
            {/* Logo - changes color based on scroll */}
            <div
              className={isFixed && isScrolled ? "text-black" : "text-white"}
            >
              <Logo className="w-42 shrink-0" />
            </div>

            {/* Desktop Links - text color changes on scroll */}
            <div className="hidden lg:block">
              <DesktopNavLinks
                links={links}
                onHover={setActiveIndex}
                isScrolled={isFixed && isScrolled}
              />
            </div>

            {/* Button - changes style on scroll */}
            <div className="hidden lg:block mt-1">
              <NavButton
                title="Get in touch"
                className={
                  isFixed && isScrolled
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              />
            </div>

            {/* Mobile Menu Button - hamburger color changes */}
            <button
              onClick={() => setMobileMenu(true)}
              className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-0.5 w-5 transition-all duration-300 rounded-full ${
                  isFixed && isScrolled ? "bg-black" : "bg-white"
                }`}
              ></span>
              <span
                className={`h-0.5 w-5 transition-all duration-300 rounded-full ${
                  isFixed && isScrolled ? "bg-black" : "bg-white"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer - only needed when navbar is fixed */}
      {isFixed && <div className="h-16 lg:h-20" />}

      <DesktopDropdown
        activeItem={activeItem}
        onClose={() => setActiveIndex(null)}
        isFixed={isFixed}
      />
    </div>
  );
};

export default Navbar;
