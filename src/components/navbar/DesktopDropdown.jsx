import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const DesktopDropdown = ({ activeItem, onClose, isFixed = false }) => {
  const subLinksRef = useRef([]);
  const dropdownRef = useRef(null);
  const isTwoColumn = activeItem?.subLinks?.length > 3;

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
          ${isTwoColumn ? "w-[800px]" : "w-[600px]"}
        `}
      >
        <div className="flex justify-between gap-6 p-6">
          {/* Left Content */}
          <div className={`flex ${isTwoColumn ? "w-2/3" : "w-full"}`}>
            <div className="w-full">
              {activeItem?.content?.title && (
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  {activeItem?.content?.title}
                </h3>
              )}

              {activeItem?.subLinks && (
                <div
                  className={`grid gap-3 ${
                    isTwoColumn ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {activeItem.subLinks.map((sub, i) => (
                    <a
                      key={i}
                      ref={(el) => (subLinksRef.current[i] = el)}
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          {activeItem?.content?.image && (
            <div className="w-1/3 flex-shrink-0 overflow-hidden rounded-xl">
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