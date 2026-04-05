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

  const handleImageClick = useCallback(() => {
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
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) return;

    const timeout = window.setTimeout(() => {
      handleImageClick();
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [isExpanded, handleImageClick]);

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
      <div className="relative bg-black/50 backdrop-blur-lg border border-white/20 p-8 md:p-12 flex flex-col gap-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 text-white text-2xl font-bold leading-none hover:text-[#ff2f00] transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Artist Statement</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold">About Me</h2>
        </div>

        {/* Image Container */}
        <div
          ref={containerRef}
          className="image-container relative w-64 h-64 md:w-80 md:h-80 mx-auto"
          style={{ perspective: "1000px" }}
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
        <div className="space-y-4 text-white/85 text-base md:text-lg leading-relaxed">
          <p>
            I am a visual artist and designer exploring ways to make work that feels present, interactive,
            and accessible. I enjoy building experiences from scratch, experimenting with form, space, and
            interaction, and observing how people encounter them.
          </p>
          <p>
            My practice moves between physical installations, sculptural experiments, and digital 3D work.
            I care about communication that is clear and honest, helping people understand what is around
            them without adding noise.
          </p>
          <p>
            I strive to make work that balances curiosity and structure: thoughtful in process, human in
            tone, and open to different audiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/80">
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Practice</p>
            <p>Installation, 3D, Editorial</p>
          </div>
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Based In</p>
            <p>Netherlands</p>
          </div>
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Open To</p>
            <p>Collaborations & Commissions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href="mailto:misrizos.2023@gmail.com"
            className="px-5 py-3 border border-white/30 text-white uppercase text-xs tracking-[0.14em] font-medium hover:bg-white hover:text-black transition-colors text-center"
          >
            Email Me
          </a>
          <a
            href="https://instagram.com/misrizosdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-white/30 text-white uppercase text-xs tracking-[0.14em] font-medium hover:bg-white hover:text-black transition-colors text-center"
          >
            Instagram
          </a>
        </div>

        <footer className="mt-2 border-t border-white/20 pt-5 text-center">
          <p className="editorial-kicker text-white/70 mb-2">Editorial Footer</p>
          <p className="text-sm text-white/75 leading-relaxed max-w-2xl mx-auto">
            This statement page is treated as an editorial profile, combining biography, practice context, and collaboration intent in one spread.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutMe3DEffect;