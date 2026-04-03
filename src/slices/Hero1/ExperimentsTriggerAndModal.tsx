"use client";

import { useState, useEffect } from "react";

interface ExperimentItem {
  id: number;
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  aspect: string;
}

interface ExperimentsTriggerAndModalProps {
  triggerClassName?: string;
}

export default function ExperimentsTriggerAndModal({
  triggerClassName = "",
}: ExperimentsTriggerAndModalProps) {
  const [showExperiments, setShowExperiments] = useState(false);

  useEffect(() => {
    if (showExperiments) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showExperiments]);

  const experiments: ExperimentItem[] = [
    { id: 1, type: "video", src: "videos/experiments/2.mp4", caption: "Threshold Flow", aspect: "aspect-[4/5]" },
    { id: 2, type: "image", src: "images/experiments/4.webp", caption: "Light leak test", aspect: "aspect-square" },
    { id: 3, type: "image", src: "images/experiments/3.webp", caption: "Material scan", aspect: "aspect-[3/4]" },
    { id: 4, type: "image", src: "images/experiments/6.webp", caption: "Data rupture", aspect: "aspect-square" },
    { id: 5, type: "video", src: "videos/experiments/1.mp4", caption: "Blender lidar ", aspect: "aspect-[4/5]" },
    { id: 6, type: "image", src: "images/experiments/8.webp", caption: "Neon residue", aspect: "aspect-video" },
    { id: 7, type: "image", src: "images/experiments/2.webp", caption: "Static study I", aspect: "aspect-[3/4]" },
    { id: 8, type: "video", src: "videos/experiments/3.mp4", caption: "Kinetic blur test", aspect: "aspect-[3/4]" },
    { id: 9, type: "image", src: "images/experiments/1.webp", caption: "Framing distortion", aspect: "aspect-[4/5]" },
    { id: 10, type: "image", src: "images/experiments/5.webp", caption: "Surface scan", aspect: "aspect-square" },
    { id: 11, type: "video", src: "videos/experiments/4.mp4", caption: "Blender Music Visualization", aspect: "aspect-[8/5]" },
  ];

  return (
    <>
      {/* TRIGGER */}
      <button
        className={`
          text-black hover:text-[#ff2f00] transition-all duration-300
          text-lg md:text-xl font-italic uppercase tracking-[0.08em]
          flex items-center gap-1.5 cursor-pointer
          ${triggerClassName}
        `}
        onClick={() => setShowExperiments(true)}
      >
        Experiments ↗
      </button>

      {/* Close button - Centered at bottom */}
      {showExperiments && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={() => setShowExperiments(false)}
            className="px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors"
            aria-label="Close experiments"
          >
            Close
          </button>
        </div>
      )}

      {/* MODAL */}
      {showExperiments && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-3xl flex flex-col overflow-hidden"
          onClick={(e) => e.target === e.currentTarget && setShowExperiments(false)}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 md:px-12 py-5 md:py-6 bg-white/15 border-b border-black/15">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-black">
              Experiments
              </h2>
            </div>
          </div>

          {/* GALLERY */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-20">
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
              {experiments.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    mb-4 md:mb-6 break-inside-avoid group relative overflow-hidden
                    shadow-2xl shadow-black/30 
                    transition-all duration-500 hover:scale-[1.035] hover:-rotate-[0.8deg]
                    animate-[fadeInUp_0.7s_forwards]
                  `}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className={`${item.aspect} bg-white/10 relative`}>
                    {item.type === "video" ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
                      >
                        <source src={item.src} type="video/mp4" />
                        <source src={item.src} type="video/quicktime" />
                        <source src={item.src.replace(/\.mov$/, ".mp4")} type="video/mp4" />
                        <p className="absolute inset-0 flex items-center justify-center text-black/70 text-sm p-4 text-center">
                          Video format not supported<br />
                          (Try converting .mov to .mp4)
                        </p>
                      </video>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt || item.caption || ""}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                        loading="lazy"
                      />
                    )}

                    {/* Hover caption */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 md:p-6">
                      <div>
                        <p className="text-[#ff2f00] uppercase text-xs md:text-sm tracking-[0.15em] font-medium mb-1.5">
                          {item.caption}
                        </p>
                        <div className="h-px w-10 bg-white/40" />
                      </div>
                    </div>

                    {item.type === "video" && (
                      <div className="absolute bottom-3 left-3 bg-black/60 text-white/90 text-[10px] px-2.5 py-0.5 font-mono tracking-wider opacity-80">
                        LOOP
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="py-10 text-center text-black/50 text-sm italic tracking-wider">
            Work in progress — always evolving
          </div>
        </div>
      )}
    </>
  );
}