import React, { useRef } from "react";

const Tooltip = ({ children, text }) => {
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const { left } = containerRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block"
    >
      {children}
      {text ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition 
          bg-black text-white p-1 rounded absolute left-0 whitespace-nowrap"
        >
          {text}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
