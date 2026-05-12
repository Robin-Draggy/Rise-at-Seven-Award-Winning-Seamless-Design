import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageLoader = ({ children }) => {
  const loaderRef = useRef(null);
  const maskCircleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      }
    });

    tl.fromTo(maskCircleRef.current,
      {
        attr: { r: 200 }
      },
      {
        attr: { r: 2000 },
        duration: 3,
        ease: "power3.inOut",
      }
    );

  }, []);

  return (
    <>
      {/* Page Content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Loader with SVG Mask - 200vh height */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50"
        style={{ height: '200vh', top: 0, backgroundColor: "transparent" }}
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="circleHole">
              <rect width="100%" height="100%" fill="white" />
              <circle
                ref={maskCircleRef}
                cx="50%"
                cy="100%"  
                r="200"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#B2F6E3"
            mask="url(#circleHole)"
          />
        </svg>
      </div>
    </>
  );
};

export default PageLoader;