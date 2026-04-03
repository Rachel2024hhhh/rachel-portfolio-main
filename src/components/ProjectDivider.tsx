"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProjectDivider: React.FC<{ height?: number }> = ({ height = 120 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const hitRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current || !hitRef.current) return;

    const svg = svgRef.current;
    const path = pathRef.current;
    const hit = hitRef.current;

    let connected = false;
    const startY = height / 2;

    const p0 = { x: 0, y: startY };
    const p1 = { x: 400, y: startY };
    const p2 = { x: 800, y: startY };

    const curveString = () => `M${p0.x},${p0.y} Q${p1.x},${p1.y} ${p2.x},${p2.y}`;

    const render = () => {
      path.setAttribute("d", curveString());
      hit.setAttribute("d", curveString());
    };

    gsap.ticker.add(render);

    svg.addEventListener("pointermove", (e) => {
      const rect = svg.getBoundingClientRect();
      const y = (e.clientY - rect.top) * (height / rect.height);
      const overPath = e.target === hit;

      if (!connected && overPath) {
        connected = true;
        gsap.killTweensOf(p1);
      }

      if (connected) {
        p1.y = y * 2 - (p0.y + p2.y) / 2;
      }
    });

    svg.addEventListener("pointerleave", () => {
      connected = false;
      gsap.to(p1, {
        duration: 0.9,
        y: startY,
        ease: "elastic.out(1,0.3)",
      });
    });

    render();
  }, [height]);

  return (
    <div className="my-8 w-full flex justify-center"> {/* smaller vertical margin */}
      <svg ref={svgRef} viewBox={`0 0 800 ${height}`} className="w-full ">
        <path
          ref={pathRef}
         stroke="#000000"

          strokeWidth="10"
          fill="none"
        />
        <path
          ref={hitRef}
          stroke="transparent"
          strokeWidth="60"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ProjectDivider;