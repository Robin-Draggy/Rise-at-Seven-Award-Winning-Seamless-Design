import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";

const DesktopDropdown = ({ activeItem, onClose, isFixed = false }) => {
  const subLinksRef = useRef([]);
  const dropdownRef = useRef(null);
  
  const linkCount = activeItem?.subLinks?.length || 0;
  const isTwoColumn = linkCount > 3;
  const hasImage = !!activeItem?.content?.image;
  
  // Wider dropdown to prevent text wrapping
  const dropdownWidth = useMemo(() => {
    if (isTwoColumn) {
      return hasImage ? "900px" : "800px";
    } else {
      return hasImage ? "600px" : "500px";
    }
  }, [isTwoColumn, hasImage]);

  useEffect(() => {
    if (!activeItem?.subLinks) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        subLinksRef.current,
        { scale: 0.95, opacity: 0, y: -10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [activeItem]);

  if (!activeItem?.dropdown) return null;

  return (
    <div
      ref={dropdownRef}
      onMouseLeave={onClose}
      className={`
        fixed left-1/2 z-50 hidden lg:block -translate-x-1/2
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isFixed ? "top-22" : "top-32"}
      `}
    >
      <div
        className={`
          overflow-hidden rounded-2xl border border-gray-200
          bg-white shadow-xl
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        `}
        style={{ width: dropdownWidth }}
      >
        <div className={`flex ${hasImage ? "gap-8" : ""} p-6`}>
          {/* Left Content - Links Grid */}
          <div className={`${hasImage ? "flex-1 min-w-0" : "w-full"}`}>
            {activeItem?.content?.title && (
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {activeItem?.content?.title}
              </h3>
            )}

            {activeItem?.subLinks && (
              <div
                className={`grid gap-4 ${
                  isTwoColumn ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {activeItem.subLinks.map((sub, i) => (
                  <a
                    key={i}
                    ref={(el) => (subLinksRef.current[i] = el)}
                    href="#"
                    className="text-xl font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Image */}
          {hasImage && (
            <div className="w-[280px] flex-shrink-0 overflow-hidden rounded-xl">
              <img
                src={activeItem?.content?.image}
                alt={activeItem?.label}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopDropdown;