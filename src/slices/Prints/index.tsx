"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import ProjectDivider from "../../components/ProjectDivider";

import SideMenu, {MenuItem} from "../../components/SideMenu";


export const TrafficMenuItems: MenuItem[] = [

    { id: "#motion", label: "Motion of Departure", short: "01" },
    { id: "#layer", label: "Layer by Layer", short: "02" },
    { id: "#animations", label: "Mute & Unmute", short: "03" },

];

interface PrintMatterProps extends Partial<SliceComponentProps<Content.PrintsSlice>> {
  isVisible: boolean;
  onClose: () => void;
}

const PrintMatter: React.FC<PrintMatterProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;


  const [showProcessLayer, setShowProcessLayer] = useState(false);
  const [showProcessMotion, setShowProcessMotion] = useState(false);
  const [showProcessMute, setShowProcessMute] = useState(false);


const wasDragged = useRef(false);   // ← add this once in your component for both galleries 


// Layer by Layer hooks
// ----------------------
const layerGalleryRef = useRef<HTMLDivElement>(null);
const layerIsDragging = useRef(false);
const layerStartX = useRef(0);
const layerScrollLeft = useRef(0);
const [showLayerGalleryModal, setShowLayerGalleryModal] = useState(false);
const [layerGalleryIndex, setLayerGalleryIndex] = useState(0);

// ----------------------
// Mute & Unmute hooks
// ----------------------
const galleryRef = useRef<HTMLDivElement>(null);
const isDragging = useRef(false);
const startX = useRef(0);
const scrollLeft = useRef(0);
const [showGalleryModal, setShowGalleryModal] = useState(false);
const [galleryModalIndex, setGalleryModalIndex] = useState(0);



  // --- IMAGE SEQUENCE ANIMATION ---
  const allImages = Array.from({ length: 52 }, (_, i) => `/images/data/animation/databook${i + 1}.webp`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Start / pause animation
  const handleBookClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsPaused(false);
    } else {
      setIsPaused((prev) => !prev);
    }
  };

  // Page-flip interval
  useEffect(() => {
    if (!isAnimating || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 500);

    return () => clearInterval(interval);
  }, [isAnimating, isPaused]);

  // Reset when closing
  useEffect(() => {
    if (!isVisible) {
      setIsAnimating(false);
      setIsPaused(false);
      setCurrentIndex(0);
    }
  }, [isVisible]);

  // --- TYPING ANIMATION ---
  const typingLines = useMemo(
    () => [
      "// ==========================================",
      "// STEP 1: Ensure enough pages",
      "// ==========================================",
      "// Check if any documents are open",
      "if (app.documents.length > 0) {",
      " var doc = app.activeDocument;",
      " var totalPagesNeeded = 301;",
      " var pagesToAdd = totalPagesNeeded - doc.pages.length;",
      " for (var i = 0; i < pagesToAdd; i++) doc.pages.add();",
      "} else {",
      " alert(\"No active document open.\");",
      "",
      "// ==========================================",
      "// STEP 2: Setup page and grid parameters",
      "// ==========================================",
      "var pageWidthPt = 500;",
      "var pageHeightPt = 500;",
      "var gridWidthPt = 400;",
      "var gridHeightPt = 380;",
      "var rows = 5;",
      "var cols = 5;",
      "var rectPaddingPt = 0;",
      "var headingRowHeightPt = 50;",
      "var headingToGridSpacingPt = 5;",
      "var totalContentHeight = headingRowHeightPt + headingToGridSpacingPt + gridHeightPt;",
      "var offsetX = (pageWidthPt - gridWidthPt) / 2;",
      "var offsetY = (pageHeightPt - totalContentHeight) / 2;",
      "var rectWidthPt = (gridWidthPt / cols) - (rectPaddingPt * (cols - 1) / cols);",
      "var rectHeightPt = (gridHeightPt - rectPaddingPt * (rows - 1)) / rows;",
      "// Actual rectangle creation skipped",
      "",
      "// ==========================================",
      "// STEP 3: Place headings and values",
      "// ==========================================",
      "// Headings and values placement logic shown",
      "// Actual object creation skipped",
      "",
      "// ==========================================",
      "// STEP 4: Place dots with predefined colors",
      "// ==========================================",
      "// Logic for colored dots per page shown",
      "// Actual ovals creation skipped",
      "",
      "// ==========================================",
      "// STEP 5: Delete the grid rectangles",
      "// ==========================================",
      "// Grid rectangle removal logic",
      "",
      "// ==========================================",
      "// STEP 6: Place entryDates and latestPersonDepartedDates vertically",
      "// ==========================================",
      "// LEFT SIDE: entryDates, LOWER HALF, rotated 90 degrees",
      "// RIGHT SIDE: latestPersonDepartedDates, UPPER HALF, rotated 90 degrees",
      "// Vertical shifts applied: leftVerticalShift = 80, rightVerticalShift = 100",
      "// Horizontal offsets: leftOffsetAdjust = 30, rightOffsetAdjust = 30",
      "// Safe margin applied",
      "// Each page calculates positions independently",
      "// Actual rectangles and textFrames skipped",
    ],
    []
  );

  const [typedBuffer, setTypedBuffer] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingSpeed] = useState(30);
  const typingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !isAnimating) return;

    const timeout = setTimeout(() => {
      if (currentLineIndex < typingLines.length) {
        const line = typingLines[currentLineIndex];
        if (currentCharIndex < line.length) {
          setTypedBuffer((prev) => prev + line[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setTypedBuffer((prev) => prev + "\n");
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }

        if (typingContainerRef.current) {
          typingContainerRef.current.scrollTop = typingContainerRef.current.scrollHeight;
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedBuffer, currentLineIndex, currentCharIndex, isAnimating, isVisible, typingLines, typingSpeed]);

 

  // --- Tabs / Scroll + Active Section ---
  const motionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<HTMLDivElement>(null);
  const motionTabRef = useRef<HTMLButtonElement>(null);
  const layerTabRef = useRef<HTMLButtonElement>(null);
  const animationsTabRef = useRef<HTMLButtonElement>(null);

  const [activeSection, setActiveSection] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const tabContainerHeight = 70; // kept but not really used now

  const onTabClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const findCurrentTabSelector = () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const sections = [
      { id: "#motion", ref: motionRef, tabRef: motionTabRef },
      { id: "#layer", ref: layerRef, tabRef: layerTabRef },
      { id: "#animations", ref: animationsRef, tabRef: animationsTabRef },
    ];

    for (const section of sections) {
      if (section.ref.current) {
        const offsetTop = section.ref.current.offsetTop - tabContainerHeight;
        const offsetBottom = section.ref.current.offsetTop + section.ref.current.offsetHeight - tabContainerHeight;

        if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  };

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(findCurrentTabSelector);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", findCurrentTabSelector);

    findCurrentTabSelector(); // initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", findCurrentTabSelector);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- Keyboard controls ---
  useEffect(() => {
    if (!isVisible) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleBookClick();
      }
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isVisible, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto overflow-x-hidden">
      <button
        className="absolute top-4 right-4 px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors z-50"
        onClick={onClose}
        aria-label="Close project view"
      >
        Close
      </button>


<SideMenu
  items={[
    { id: "#motion", label: "Motion of Departure", short: "01" },
    { id: "#layer", label: "Layer by Layer", short: "02" },
    { id: "#animations", label: "Mute & Unmute", short: "03" },
  ]}
  activeSection={activeSection}
  onTabClick={onTabClick}
/>


      <div className="p-10 max-w-7xl mx-auto">


{/* MOTION OF DEPARTURE */}
<div id="motion" ref={motionRef} className="mb-6 mt-12 flex flex-col gap-6">
  <h1 className="text-[6vw] font-bold tracking-wide  text-center break-word">
    MOTION OF DEPARTURE
  </h1>

  {/* Cover Image */}
  <div className="relative w-full h-200 overflow-hidden group">
    {/* Main Image */}
    <Image
      src="/images/data/main/main1.webp"
      alt="Main Image 1"
      fill
      className="object-cover transition-opacity duration-400 group-hover:opacity-0 z-10"
    />

    {/* Hover Images */}
    {[
      { src: "/images/data/main/main2.webp", duration: 400, delay: 0 },
      { src: "/images/data/main/main3.webp", duration: 700, delay: 200 },
      { src: "/images/data/main/main4.webp", duration: 1000, delay: 400 },
      { src: "/images/data/main/main5.webp", duration: 1300, delay: 600 },
    ].map((img, idx) => (
      <Image
        key={idx}
        src={img.src}
        alt={`Hover Image ${idx + 2}`}
        fill
        className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
        style={{
          transitionProperty: 'opacity',
          transitionDuration: `${img.duration}ms`,
          transitionDelay: `${img.delay}ms`,
        }}
      />
    ))}
  </div>

  {/* Motion Description inside the section */}
<div className="flex flex-col md:flex-row gap-6 mt-6 overflow-x-hidden">
  <div className="md:w-1/2 w-full bg-gray-50 p-6 flex flex-col items-center justify-center gap-2">
    <h2 className="text-2xl font-bold">Motion of Departure</h2>
    <h3 className="text-xl font-medium">Data Visualization Project</h3>
    <h4 className="text-gray-700 font-extralight">
      <strong>Exploring Migration Through Individual Stories</strong>
    </h4>
  </div>

  <div className="md:w-1/2 w-full bg-gray-100 p-6">
    <p>
      This project addresses the human impact of large-scale <strong>migration</strong> by giving each individual their own space within a dataset. Migration is often reduced to aggregated numbers — millions of people flattened into flows, codes, and statistics — obscuring the <em>personal stories</em> behind each movement.
    </p>

    <p>
      By assigning each data point its own page, the project resists this flattening effect and affirms the right of every person to be represented <strong>individually</strong>.
    </p>

    <p>
      As someone who grew up in <strong>Cuba</strong> under a <em>dictatorship</em>, I have personally witnessed family and friends disperse across the world, experiencing first-hand what it means to leave everything behind. I remember receiving letters, always feeling reduced to a number, an impression, a line in a bureaucratic process — even though I deeply respect the work of immigration agents. This project is personal because it seeks to restore that <strong>human presence</strong> and dignity, giving each individual the space they deserve.
    </p>

    <p>
      <strong>Motion</strong> is used as a generative tool to reflect migratory movement itself. Rather than presenting static data, movement unfolds across the sequence of pages, echoing <em>displacement, transition, and passage through space</em>. The gradual shifts, repetitions, and rhythms within this motion highlight migration as an ongoing process rather than a fixed outcome, emphasizing that behind every data point is a life in motion.
    </p>

    <p>
      The final book transforms abstract data into a tangible, <strong>human-centered narrative</strong>. By visually separating each individual, it restores personal presence and emphasizes the <em>humanity</em> behind the numbers, challenging the dehumanizing effect of aggregated statistics.
    </p>
  </div>
</div>

  {/* Four images – same width as text block above, responsive */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {[
      "/images/data/small/1.webp",
      "/images/data/small/2.webp",
      "/images/data/small/3.webp",
      "/images/data/small/4.webp",
    ].map((src, idx) => (
      <div
        key={idx}
        className="relative w-full h-96 md:h-125 bg-gray-200 overflow-hidden shadow-md"
      >
        <Image
          src={src}
          alt={`Motion of Departure – final detail ${idx + 1}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ))}
  </div>

  {/* ✅ Process Section for Motion of Departure */}
  <div className="mt-8">
    <button
      onClick={() => setShowProcessMotion(!showProcessMotion)}
      className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
    >
      {showProcessMotion ? "Hide process" : "See more about my process"}
    </button>

    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden ${
        showProcessMotion ? "max-h-screen opacity-100 mt-8" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-gray-100 p-8 flex flex-col gap-8">
        <div className="w-full max-w-full">
          <h3 className="text-2xl font-bold mb-4">Process & Development</h3>
          
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Column 1: Book Flip */}
            <div
              className="md:w-1/3 w-full aspect-square flex items-center justify-center bg-gray-100 cursor-pointer relative overflow-visible"
              onClick={handleBookClick}
              role="button"
              tabIndex={0}
              aria-label="Start / pause / resume book page flip animation"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  key={currentIndex}
                  src={allImages[currentIndex]}
                  alt={`Motion of Departure – page ${currentIndex + 1} of ${allImages.length}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={currentIndex <= 5}
                />
              </div>

              {/* Click Indicator */}
              {!isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-center text-lg font-bold pointer-events-none">
                  Click here to start
                </div>
              )}

              {isAnimating && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-mono">
                  {currentIndex + 1} / {allImages.length}
                </div>
              )}

              {isPaused && isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xl font-bold">
                  PAUSED – click to resume
                </div>
              )}
            </div>

            {/* Column 2: Typing Animation */}
            <div
              ref={typingContainerRef}
              className="md:w-1/3 w-full aspect-square bg-gray-800 shadow-inner overflow-y-auto p-6 select-none"
            >
              <pre
                className={`text-green-400 font-mono m-0 whitespace-pre-wrap wrap-break-words text-sm leading-relaxed ${
                  (currentCharIndex > 0 || !isAnimating) &&
                  "after:content-['|'] after:animate-blink"
                }`}
              >
                {typedBuffer ||
                  "// Click the book image to begin the page-flip & code generation simulation..."}
              </pre>
            </div>

            {/* Column 3: Project Description / Explanation */}
           <div className="md:w-1/2 w-full bg-gray-100 p-6">
  <p>
    For the process of Motion of Departure, I developed a <strong>custom script in InDesign</strong> — my first time writing a script for a project — to generate each page and create the visual motion of the dataset. This allowed me to explore how design and programming can work together to translate abstract migration data into a tangible narrative.
  </p>

  <p>
    I carefully planned the layouts, considering page sizes, spacing, and structure, and tested different configurations to see what would work visually while remaining feasible in InDesign. Each row of information — including values like <strong>case number</strong>, <strong>birth country</strong>, and other data points — was mapped to a visual element that moves across the page, echoing the rhythm of migration itself.
  </p>

  <p>
    Motion is central to the project. Elements move left to right across the page, and when they reach the end, they reverse direction. This continuous movement mirrors <em>displacement, transition, and passage</em>, reinforcing the idea that migration is a process, not a static event.
  </p>

  <p>
    The <strong>dot</strong> is the main visual indicator, inspired by my childhood love of flipping books. Each step of the dot marks progress and movement, giving a subtle sense of animation while guiding the viewer through the sequence. This design choice creates a <em>tactile, playful rhythm</em> within a highly structured dataset, balancing precision and human presence.
  </p>

  <p>
    Overall, this phase was an intense process of experimentation, planning, and reflection — combining <strong>data, design, and motion</strong> to create a narrative that is both personal and human-centered.
  </p>
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <ProjectDivider />




{/* LAYER BY LAYER */}
<div id="layer" ref={layerRef} className="mb-6 mt-12 flex flex-col gap-6">
  <h1 className="text-[6vw] font-bold tracking-wide whitespace-nowrap text-center">
    LAYER BY LAYER
  </h1>

  {/* Main Static Image */}
  <div className="w-full h-200 relative bg-gray-300 flex items-center justify-center">
    <Image
      src="/images/LayerbyLayer/view.webp"
      alt="Layer by Layer main image"
      fill
      className="object-cover"
    />
  </div>



<div className="flex flex-col md:flex-row gap-6">
  <div className="md:w-1/2 w-full bg-gray-50 p-6 flex flex-col items-center justify-center gap-2">
    <h2 className="text-2xl font-bold">Layer by Layer</h2>
    <h3 className="text-xl font-medium">Photography Project</h3>
    <h4 className="text-gray-700 font-extralight">
      <strong>Layers, Ritual, and the Everyday</strong>
    </h4>
  </div>

  <div className="md:w-1/2 w-full bg-gray-100 p-6">
    <p>
      As a visual artist growing up in the <strong>Caribbean</strong>, I was immersed in traditions where <em>spirituality</em> is rooted in nature and everyday life. Rituals, offerings, and symbolic connections to the elements taught me to see meaning in the ordinary — speaking to a tree, honoring the earth, or sensing unseen energies in daily actions.
    </p>

    <p>
      Living in the Netherlands, I often miss that intimate connection with cultural spirituality. This project became a personal exploration of how the <strong>mundane</strong> can carry profound meaning.
    </p>

    <p>
      To reflect the multiple layers of spirituality, I translated the idea into a visual <strong>layering process</strong>: placing objects, photographing them, layering another on top, and re-photographing, while playing with <em>illusion</em> and <em>perspective</em>. Each layer builds depth, presence, and subtle ritual, mirroring how spirituality unfolds in everyday life.
    </p>

    <p>
      The work remains deeply personal — a meditation on <strong>presence, observation, and accumulation</strong>, connecting memory, ritual, and the quiet energies that surround us.
    </p>
  </div>
</div>




  {/* Four images */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {[
      "/images/LayerbyLayer/layoutimages/1.webp",
      "/images/LayerbyLayer/layoutimages/2.webp",
      "/images/LayerbyLayer/layoutimages/3.webp",
      "/images/LayerbyLayer/layoutimages/4.webp",
    ].map((src, idx) => (
      <div
        key={idx}
        className="relative w-full h-96 md:h-125 bg-gray-200 overflow-hidden shadow-md"
      >
        <Image
          src={src}
          alt={`Layer by Layer – final detail ${idx + 1}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ))}
  </div>

{/* Layer by Layer Horizontal Drag Gallery */}
<div className="mt-8 max-w-6xl mx-auto relative">
  <h3 className="text-2xl font-bold mb-4">Gallery</h3>

  <div
    ref={layerGalleryRef}
    className="relative flex gap-6 whitespace-nowrap h-96 md:h-125 cursor-grab overflow-x-hidden drag-pause-on-hover scrollbar-hidden touch-pan-x"
    onMouseDown={(e) => {
      layerIsDragging.current = true;
      wasDragged.current = false; // reset
      layerStartX.current = e.pageX - (layerGalleryRef.current?.offsetLeft || 0);
      layerScrollLeft.current = layerGalleryRef.current!.scrollLeft;
    }}
    onMouseLeave={() => (layerIsDragging.current = false)}
    onMouseUp={() => (layerIsDragging.current = false)}
    onMouseMove={(e) => {
      if (!layerIsDragging.current) return;
      e.preventDefault();
      const x = e.pageX - (layerGalleryRef.current?.offsetLeft || 0);
      const walk = (x - layerStartX.current) * 1.2;
      layerGalleryRef.current!.scrollLeft = layerScrollLeft.current - walk;

      // Mark as drag if moved more than a few pixels
      if (Math.abs(walk) > 5) {
        wasDragged.current = true;
      }
    }}
  >
    <div className="flex gap-6 min-w-max">
      {[
        "/images/LayerbyLayer/imagesection/1.webp",
        "/images/LayerbyLayer/imagesection/2.webp",
        "/images/LayerbyLayer/imagesection/3.webp",
        "/images/LayerbyLayer/imagesection/4.webp",
        "/images/LayerbyLayer/imagesection/5.webp",
        "/images/LayerbyLayer/imagesection/6.webp",
        "/images/LayerbyLayer/imagesection/7.webp",
        "/images/LayerbyLayer/imagesection/8.webp",
        "/images/LayerbyLayer/imagesection/9.webp",
        "/images/LayerbyLayer/imagesection/10.webp",
        "/images/LayerbyLayer/imagesection/11.webp",
        "/images/LayerbyLayer/imagesection/12.webp",
        "/images/LayerbyLayer/imagesection/13.webp",
        "/images/LayerbyLayer/imagesection/14.webp",
      ].map((src, idx) => (
        <div
          key={idx}
          className="shrink-0 w-64 md:w-72 h-full relative bg-gray-200 overflow-hidden cursor-grab"
          onClick={() => {
            if (wasDragged.current) {
              wasDragged.current = false; // reset for next interaction
              return;
            }
            setLayerGalleryIndex(idx);
            setShowLayerGalleryModal(true);
          }}
        >
          <Image
            src={src}
            alt={`Layer by Layer gallery ${idx + 1}`}
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>

  {/* Instruction below carousel */}
  <div className="drag-instruction">
    Drag horizontally to see more
  </div>

  {/* Layer by Layer Modal */}
  {showLayerGalleryModal && (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl w-full">
        <button
          onClick={() => setShowLayerGalleryModal(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-200 text-2xl font-bold z-50"
        >
          ✕
        </button>

        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <Image
            src={`/images/LayerbyLayer/imagesection/${layerGalleryIndex + 1}.webp`}
            alt={`Layer by Layer modal ${layerGalleryIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )}
</div>

  {/* Process Section */}
<div className="mt-8">
  <button
    onClick={() => setShowProcessLayer(!showProcessLayer)}
    className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
  >
    {showProcessLayer ? "Hide process" : "See more about my process"}
  </button>

  <div
    className={`transition-all duration-700 ease-in-out overflow-hidden ${
      showProcessLayer ? "max-h-[2000px] opacity-100 mt-8" : "max-h-0 opacity-0"
    }`}
  >
    <div className="bg-gray-100 p-8 flex flex-col gap-8">

      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">Process & Development</h3>

        <p className="mt-6 font-semibold">Process:</p>

        <p>
          Each photograph was constructed layer by layer,
          building complex visual narratives that mirror the
          meditative and cumulative nature of spiritual practice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-64 bg-gray-200">
          <Image
            src="/images/LayerbyLayer/process/1.webp"
            alt="Layer by Layer process image 1"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-64 bg-gray-200">
          <Image
            src="/images/LayerbyLayer/process/2.webp"
            alt="Layer by Layer process image 2"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-64 bg-gray-200">
          <Image
            src="/images/LayerbyLayer/process/3.webp"
            alt="Layer by Layer process image 3"
            fill
            className="object-cover"
          />
        </div>
      </div>

    </div>
  </div>
</div>

</div>

        <ProjectDivider />
        

{/* MUTE & UNMUTE */}
<div id="animations" ref={animationsRef} className="mb-6 mt-12 flex flex-col gap-6">
  <h1 className="text-[6vw] font-bold tracking-wide whitespace-nowrap text-center">
    MUTE & UNMUTE
  </h1>

  {/* Click-through Image */}
  <div className="w-full h-200 flex items-center justify-center ">
    <img
      src="/images/MuteUnmute/main.webp"
      alt="Mute-Unmute Interactive"
      className="w-full h-full object-cover"
    />
  </div>

<div className="flex flex-col md:flex-row gap-6">
  <div className="md:w-1/2 w-full bg-gray-50 p-6 flex flex-col items-center justify-center gap-2">
    <h2 className="text-2xl font-bold">Mute & Unmute</h2>
    <h3 className="text-xl font-medium">Photography and Typography</h3>
    <h4 className="text-gray-700 font-extralight">A Study in Close-Up</h4>
  </div>

  <div className="md:w-1/2 w-full bg-gray-100 p-6">
      
<p>
This project began with the randomly assigned word <strong>“Close-Up.”</strong>  
During a school visit to two exhibitions, we were asked to move through the space in <em>complete silence</em>, documenting our observations only through notes and sketches.

Without conversation, every small action became noticeable —  
<em>footsteps</em>, <em>bottles opening</em>, <em>objects clicking</em>, subtle movements filling the room with quiet sound.

These moments led me to think about <strong>onomatopoeic sounds</strong> — words that imitate real sounds — and how they could translate the <em>action of closing</em>, touching, or interacting into <strong>typography</strong>.

To expand this idea, I moved outside the exhibition space and began photographing the city, searching for moments where sound could be <em>imagined through image</em>. The intention was to reveal that these small sonic interactions exist <strong>everywhere in our surroundings</strong>.

The photographs were intentionally <strong>pixelated</strong>.  
For me, a <em>pixel</em> represents the most fundamental <strong>close-up unit</strong> of an image.


By combining <strong>pixelated photography</strong> with expressive <strong>typographic onomatopoeia</strong>, the project explores how the idea of <strong>Close-Up</strong> can operate visually and conceptually — connecting <em>image, sound, and text</em>.
</p>

  </div>
</div>

{/* Two static images – fully fitting and responsive */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  <div className="relative w-full h-96 md:h-125">
    <Image
      src="/images/MuteUnmute/small1.webp"
      alt="Mute & Unmute – final detail 1"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>

  <div className="relative w-full h-96 md:h-125">
    <Image
      src="/images/MuteUnmute/small2.webp"
      alt="Mute & Unmute – final detail 2"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</div>

{/* Mute & Unmute Horizontal Drag Gallery */}
<div className="mt-8 max-w-6xl mx-auto relative">
  <h3 className="text-2xl font-bold mb-4">Gallery</h3>

  <div
    ref={galleryRef}
    className="relative flex gap-6 whitespace-nowrap h-96 md:h-125 cursor-grab overflow-x-hidden drag-pause-on-hover scrollbar-hidden touch-pan-x"
    onMouseDown={(e) => {
      isDragging.current = true;
      wasDragged.current = false; // reset
      startX.current = e.pageX - (galleryRef.current?.offsetLeft || 0);
      scrollLeft.current = galleryRef.current!.scrollLeft;
    }}
    onMouseLeave={() => (isDragging.current = false)}
    onMouseUp={() => (isDragging.current = false)}
    onMouseMove={(e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - (galleryRef.current?.offsetLeft || 0);
      const walk = (x - startX.current) * 1.2;
      galleryRef.current!.scrollLeft = scrollLeft.current - walk;

      // Mark as drag if moved more than a few pixels
      if (Math.abs(walk) > 5) {
        wasDragged.current = true;
      }
    }}
  >
    <div className="flex gap-6 min-w-max">
      {[
        "/images/MuteUnmute/allwork/1.webp",
        "/images/MuteUnmute/allwork/2.webp",
        "/images/MuteUnmute/allwork/3.webp",
        "/images/MuteUnmute/allwork/4.webp",
        "/images/MuteUnmute/allwork/5.webp",
        "/images/MuteUnmute/allwork/6.webp",
        "/images/MuteUnmute/allwork/7.webp",
        "/images/MuteUnmute/allwork/8.webp",
        "/images/MuteUnmute/allwork/9.webp",
        "/images/MuteUnmute/allwork/10.webp",
        "/images/MuteUnmute/allwork/11.webp",
        "/images/MuteUnmute/allwork/12.webp",
        "/images/MuteUnmute/allwork/13.webp",
        "/images/MuteUnmute/allwork/14.webp",
      ].map((src, idx) => (
        <div
          key={idx}
          className="shrink-0 w-64 md:w-72 h-full relative bg-gray-200 overflow-hidden cursor-grab"
          onClick={() => {
            if (wasDragged.current) {
              wasDragged.current = false; // reset for next interaction
              return;
            }
            setGalleryModalIndex(idx);
            setShowGalleryModal(true);
          }}
        >
          <Image
            src={src}
            alt={`Mute & Unmute gallery ${idx + 1}`}
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>

  {/* Instruction below carousel */}
  <div className="drag-instruction">
    Drag horizontally to see more
  </div>

  {/* Mute & Unmute Modal */}
  {showGalleryModal && (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl w-full">
        <button
          onClick={() => setShowGalleryModal(false)}
          className="absolute top-2 right-2 text-white hover:text-gray-200 text-2xl font-bold z-50"
        >
          ✕
        </button>

        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <Image
            src={`/images/MuteUnmute/ALLWORK/${galleryModalIndex + 1}.webp`}
            alt={`Mute & Unmute modal ${galleryModalIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )}
</div>


{/* ✅ Process Section for Mute & Unmute */}
<div className="mt-8">
  <button
    onClick={() => setShowProcessMute(!showProcessMute)}
    className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
  >
    {showProcessMute ? "Hide process" : "See more about my process"}
  </button>

  <div
    className={`transition-all duration-700 ease-in-out overflow-hidden ${
      showProcessMute ? "max-h-[2000px] opacity-100 mt-8" : "max-h-0 opacity-0"
    }`}
  >
    <div className="bg-gray-100 p-8 flex flex-col gap-8">
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold mb-4">
          Process & Development
        </h3>
        
        <p className="mt-6 font-semibold">Process:</p>
        <p>
For this project, we approached pixelation as a visual tool to translate everyday sounds into imagery. Most of the work was done using <strong>Illustrator and Photoshop,</strong> supporting color adjustments and overall image refinement.

The photography shoot took place across the city of Arnhem, where we explored different locations to capture unexpected moments and textures. For example, at one site we encountered broken glass. I simulated the act of breaking the glass to create an imagined sound, which was then translated visually across multiple scenes.

The core idea was to <strong>create onomatopoeic sounds</strong> inspired by the existing sounds of the city. By using my body and gestures in staged poses, I aimed to create the illusion that these sounds were occurring in real time, blending physical action with visual storytelling. This process allowed the city’s environment to interact with my own performance, producing a series of images that embody sound, movement, and urban rhythm.
</p>
      </div>

      {/* Images for Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "/images/MuteUnmute/process/1.webp",
          "/images/MuteUnmute/process/2.webp",
          "/images/MuteUnmute/process/3.webp",
          "/images/MuteUnmute/process/4.webp",
          "/images/MuteUnmute/process/5.webp",
          "/images/MuteUnmute/process/6.webp",
        ].map((src, idx) => (
          <div key={idx} className="relative w-full h-64 md:h-72 bg-gray-200 overflow-hidden">
            <Image
              src={src}
              alt={`Mute & Unmute process ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


</div>


        <ProjectDivider />
      </div>
    </div>
  );
};

export default PrintMatter;