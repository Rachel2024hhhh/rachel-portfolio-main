"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MaterialOverlayProps {
  images: string[]; // array of image URLs
  onClose: () => void;
}

const MaterialOverlay: React.FC<MaterialOverlayProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-700 p-10">
      {/* Back button */}
      <button
        className="absolute top-5 left-5 px-4 py-2 bg-black/50 text-white font-medium uppercase text-sm hover:text-[#ff2f00] transition-colors"
        onClick={onClose}
      >
        Back
      </button>

      {/* Image display */}
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center bg-gray-600 rounded-md shadow-md">
        {images.length > 0 && (
          <Image
            src={images[currentIndex]}
            alt={`Material ${currentIndex + 1}`}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 text-3xl text-white bg-black/40 px-2 rounded hover:bg-black/60"
              onClick={prevImage}
            >
              ←
            </button>
            <button
              className="absolute right-4 text-3xl text-white bg-black/40 px-2 rounded hover:bg-black/60"
              onClick={nextImage}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Image index */}
      {images.length > 0 && (
        <p className="mt-4 text-white font-mono text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      )}
    </div>
  );
};

export default MaterialOverlay;