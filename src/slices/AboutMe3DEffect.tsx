"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface AboutMe3DEffectProps {
  onClose: () => void;
}

const AboutMe3DEffect: React.FC<AboutMe3DEffectProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const layersRef = useRef<HTMLDivElement[]>([]);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    gsap.to(layersRef.current, {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      translateZ: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    // Focus the close button when the modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Add ESC key listener
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleImageClick = () => {
    if (isExpanded) return;
    setIsExpanded(true);

    const tl = gsap.timeline();

    layersRef.current.forEach((layer, index) => {
      if (!layer) return;
      const scale = 1 + index * 0.05;
      const opacity = Math.max(0.2, 1 - index * 0.2);
      const rotateY = index * 2;
      const translateZ = -index * 10;

      tl.to(layer, {
        scale,
        opacity,
        rotateY,
        translateZ,
        duration: 0.5,
        ease: "power2.out"
      }, 0);
    });
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black/50 backdrop-blur-lg border border-white/20 p-12 flex flex-col gap-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#ff2f00] transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-white text-3xl font-bold">About Me</h2>

        {/* Image Container */}
        <div
          ref={containerRef}
          className="image-container relative w-64 h-64 md:w-80 md:h-80 mx-auto cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={handleImageClick}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) layersRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('/images/about-me/main.png')`,
                transformStyle: "preserve-3d",
                zIndex: 5 - index,
              }}
            />
          ))}
        </div>

        {/* Description */}
<p className="text-white/80 text-lg">
  I am a visual artist and designer exploring ways to make work that is present, interactive, and accessible. I enjoy building experiences from scratch, experimenting with form, space, and interactivity, and seeing how people encounter them.
</p>
<p className="text-white/80 text-lg">
  I care about design that communicates honestly, helping people understand what’s happening around them instead of adding noise or distraction. My practice moves between physical installations, sculptural experiments, and digital 3D work, translating the hands-on curiosity I’ve always had into experiences that invite engagement and reflection. I strive to create work that is meaningful, thoughtful, and accessible to everyone.
</p>
      </div>
    </div>
  );
};

export default AboutMe3DEffect;