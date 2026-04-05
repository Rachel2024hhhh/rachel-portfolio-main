"use client";

import React, { useRef, useEffect } from "react";

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus close button
    closeButtonRef.current?.focus();

    // ESC key listener
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black/50 backdrop-blur-lg border border-white/20 p-8 md:p-12 flex flex-col gap-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 text-white text-2xl font-bold leading-none hover:text-[#ff2f00] transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="space-y-2">
          <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Get In Touch</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold">Contact</h2>
        </div>

        <p className="text-white/85 text-base md:text-lg leading-relaxed">
          If you’d like to collaborate, commission work, or just say hello, feel free to reach out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/80">
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Focus</p>
            <p>Visual Design & 3D</p>
          </div>
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Available For</p>
            <p>Collaborations</p>
          </div>
          <div className="border border-white/15 px-4 py-3">
            <p className="text-white/55 uppercase tracking-[0.12em] text-xs mb-1">Response Time</p>
            <p>Usually within 48h</p>
          </div>
        </div>

        <div className="space-y-4 text-white/85">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Primary Contact</p>
          <p className="text-base md:text-lg leading-relaxed">
            Email
            <span className="text-white/45 px-2">/</span>
            <a
              href="mailto:misrizos.2023@gmail.com"
              className="underline underline-offset-4 hover:text-[#ff2f00] transition-colors"
            >
              misrizos.2023@gmail.com
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-2">
            <a
              href="https://instagram.com/misrizosdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/30 text-white uppercase text-xs tracking-[0.14em] font-medium hover:bg-white hover:text-black transition-colors text-center"
            >
              @misrizosdesign
            </a>
            <a
              href="https://instagram.com/misrizos_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/30 text-white uppercase text-xs tracking-[0.14em] font-medium hover:bg-white hover:text-black transition-colors text-center"
            >
              @misrizos_studio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;