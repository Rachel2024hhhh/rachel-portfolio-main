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
      <div className="relative bg-black/50 backdrop-blur-lg border border-white/20 p-12 flex flex-col gap-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#ff2f00] transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-white text-3xl font-bold">Contact</h2>

        {/* Friendly intro */}
        <p className="text-white/80 text-lg">
          If you’d like to collaborate, commission work, or just say hello, feel free to reach out.
        </p>

        {/* Info Section */}
        <div className="text-white/80 text-lg space-y-4">
          <p>
            Email:{" "}
            <a
              href="mailto:misrizos.2023@gmail.com"
              className="underline hover:text-[#ff2f00] transition-colors"
            >
              misrizos.2023@gmail.com
            </a>
          </p>

          <p>
            Instagram (Studio):{" "}
            <a
              href="https://instagram.com/misrizos_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#ff2f00] transition-colors"
            >
              @misrizos_studio
            </a>
          </p>

          <p>
            Instagram (Design):{" "}
            <a
              href="https://instagram.com/misrizosdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#ff2f00] transition-colors"
            >
              @misrizosdesign
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;