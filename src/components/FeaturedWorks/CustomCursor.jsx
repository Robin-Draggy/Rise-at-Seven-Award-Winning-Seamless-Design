import React from "react";
import { ArrowUpRight } from "lucide-react";

const CustomCursor = React.forwardRef(({ className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`hidden md:flex fixed left-0 top-0 z-[999] h-30 w-30 items-center justify-center rounded-full bg-[#B2F6E3] pointer-events-none ${className}`}
    >
      <ArrowUpRight className="h-8 w-8 text-black" />
    </div>
  );
});

CustomCursor.displayName = "CustomCursor";
export default CustomCursor;