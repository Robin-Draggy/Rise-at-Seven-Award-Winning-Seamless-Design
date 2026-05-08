import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useHoverMotion = ({
  containerRef,
  trackRef,
  enter = {},
  leave = {},
  duration = 0.35,
  easeShape = "power3.out",
  easeMotion = "power2.out",
}) => {
  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // initial state
    gsap.set(container, {
      borderRadius: enter.borderRadiusFrom ?? "9999px",
    });

    gsap.set(track, { y: 0 });

    const animate = (isEnter) => {
      gsap.to(container, {
        borderRadius: isEnter
          ? enter.borderRadiusTo ?? "8px"
          : leave.borderRadiusTo ?? "9999px",
        duration,
        ease: easeShape,
      });

      gsap.to(track, {
        y: isEnter ? enter.y ?? 0 : leave.y ?? 0,
        duration,
        ease: easeMotion,
        delay: isEnter ? 0.02 : 0,
      });
    };

    const handleEnter = () => animate(true);
    const handleLeave = () => animate(false);

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      gsap.killTweensOf([container, track]);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);
};