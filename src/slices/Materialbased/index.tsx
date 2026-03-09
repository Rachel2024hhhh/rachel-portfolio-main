"use client";
import React, { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ProjectDivider from "../../components/ProjectDivider";
import SideMenu, {MenuItem} from "../../components/SideMenu";


export const TrafficMenuItems: MenuItem[] = [
  { id: "#section1", label: "Traffic as Language", short: "01" },
  { id: "#section2", label: "Earth in the Ocean", short: "02" },
];
export type MaterialbasedProps = Partial<
  SliceComponentProps<Content.MaterialbasedSlice>
> & {
  isVisible: boolean;
  onClose: () => void;
};

const Materialbased: React.FC<MaterialbasedProps> = ({
  slice,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  const tab1Ref = useRef<HTMLButtonElement>(null);
  const tab2Ref = useRef<HTMLButtonElement>(null);

  const [activeSection, setActiveSection] = useState("");
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const [showProcess1, setShowProcess1] = useState(false);
  const [showProcess2, setShowProcess2] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const tabContainerHeight = 70;

  const onTabClick = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateActiveTab = () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const sections = [
      { id: "#section1", ref: section1Ref, tabRef: tab1Ref },
      { id: "#section2", ref: section2Ref, tabRef: tab2Ref },
    ];

    for (const section of sections) {
      if (section.ref.current) {
        const offsetTop =
          section.ref.current.offsetTop - tabContainerHeight;
        const offsetBottom =
          section.ref.current.offsetTop +
          section.ref.current.offsetHeight -
          tabContainerHeight;

        if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
          setActiveSection(section.id);
          if (section.tabRef.current) {
            const rect = section.tabRef.current.getBoundingClientRect();
            setSliderStyle({
              width: rect.width,
              left: rect.left - navRect.left,
            });
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(updateActiveTab);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveTab);
    updateActiveTab();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveTab);
    };
  }, []);

  const openLightbox = (src: string) => {
    setLightboxImage(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      {/* CLOSE BUTTON */}
      <button
        className="absolute top-4 right-4 px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors z-50"
        onClick={onClose}
      >
        Close
      </button>

 {/* Side Menu */}
      <SideMenu
        items={TrafficMenuItems}
        activeSection={activeSection}
        onTabClick={onTabClick}
      />

      <div className="p-10 max-w-7xl mx-auto">




{/*  Traffic Elements as Language */}
<div
  id="section1"
  ref={section1Ref}
  className="mb-6 mt-12 flex flex-col gap-6"
>
  <h1 className="text-[6vw] font-bold tracking-wide text-center">
    Urban Syntax
  </h1>


{/* Two perfectly aligned images side by side */}
<div className="w-full relative mt-6 h-200 flex overflow-hidden">
  <div className="w-1/2 h-full overflow-hidden">
    <img
      src="/images/Traffic/main/1.png"
      className="w-full h-full object-cover shadow-md"
      onClick={() => openLightbox("/images/Traffic/main/1.png")}
    />
  </div>
  <div className="w-1/2 h-full overflow-hidden">
    <img
      src="/images/Traffic/main/2.png"
      className="w-full h-full object-cover shadow-md"
      onClick={() => openLightbox("/images/Traffic/main/2.png")}
    />
  </div>
</div>



  {/* Two-column description */}
  <div className="flex flex-col md:flex-row gap-6 mt-6">
    <div className="md:w-1/2 w-full bg-gray-50 p-6 flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Urban Syntax</h2>
      <h3 className="text-xl font-medium">Installation </h3>
      <h4 className="text-gray-700 font-extralight">
      A study of sahpes, color, and spatial relationships
      </h4>
    </div>
    <div className="md:w-1/2 w-full bg-gray-100 p-6">
   
      <p>

This project explores the visual language of urban signage, transforming the everyday forms of traffic signs into a suspended, color-driven installation. By deconstructing the shapes, colors, and inherent meanings of these signs, I created new compositions that reinterpret their functional logic as a visual grammar. Acrylic sheets in varied hues were cut and arranged to hang in space, allowing the viewer to experience the dynamic relationships between shape, color, and perception. Urban Syntax investigates how familiar symbols can be reimagined as abstract elements, highlighting the dialogue between structure, meaning, and visual experience in our daily environment.

      </p>
     
    </div>
  </div>

  {/* Process Panel */}
  <div className="mt-8">
    <button
      onClick={() => setShowProcess1(!showProcess1)}
      className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
    >
      {showProcess1 ? "Hide process" : "See more about my process"}
    </button>

    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden ${
        showProcess1 ? "max-h-screen opacity-100 mt-8" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-gray-100 p-8 flex flex-col gap-8">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-bold mb-4">Process & Development</h3>
          <p className="text-gray-700 leading-relaxed">
To develop this project, I began by exploring the city and capturing multiple photographs of traffic elements, signs, and urban details. I analyzed these elements, categorizing them based on color, edges, or shapes, and assigned values and meanings to each. Using this system, I created several compositions that translated these visual observations into organized designs.

Next, I transferred the compositions into a physical format using acrylic sheets, which I then cut precisely with a laser cutter. The final installation is designed to hang in the air, allowing viewers to interact with the pieces and experience the work from multiple perspectives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "/images/Traffic/process/1.png",
            "/images/Traffic/process/2.png",
            "/images/Traffic/process/3.png",
            "/images/Traffic/process/4.png",
            "/images/Traffic/process/5.png",
            "/images/Traffic/process/6.png",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Process ${i + 1}`}
              className="h-64 object-cover cursor-pointer"
              onClick={() => openLightbox(src)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
        <ProjectDivider />


        {/* Earth in the Ocean */}
        <div
          id="section2"
          ref={section2Ref}
          className="mb-6 mt-12 flex flex-col gap-6"
        >
          <h1 className="text-[6vw] font-bold tracking-wide text-center">
            Earth in the Ocean
          </h1>

         
         
{/* Main Image with Hover Motion */}
<div className="relative w-full h-125 overflow-hidden group  shadow-md cursor-pointer">
  {/* Base Image */}
  <img
    src="/images/EarthOcean/mainocean/1.png"
    alt="Earth in the Ocean main"
    className="w-full h-200 object-cover relative  overflow-hidden group
    transition-opacity duration-400 group-hover:opacity-0 z-10"
    onClick={() => openLightbox("/images/EarthOcean/mainocean/1.png")}
  />

  {/* Hover Images */}
  {[
    { src: "/images/EarthOcean/mainocean/1.png", duration: 400, delay: 0 },
    { src: "/images/EarthOcean/mainocean/2.png", duration: 800, delay: 200 },
    { src: "/images/EarthOcean/mainocean/3.png", duration: 1200, delay: 400 },
    { src: "/images/EarthOcean/mainocean/4.png", duration: 1600, delay: 600 },
    { src: "/images/EarthOcean/mainocean/5.png", duration: 2000, delay: 800 },
  ].map((img, idx) => (
    <img
      key={idx}
      src={img.src}
      alt={`Earth in the Ocean Hover Image ${idx + 2}`}
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
      style={{
        transitionProperty: 'opacity',
        transitionDuration: `${img.duration}ms`,
        transitionDelay: `${img.delay}ms`,
      }}
      onClick={() => openLightbox(img.src)}
    />
  ))}
</div>
         

          {/* Modular Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              "/images/EarthOcean/gallery/1.png",
              "/images/EarthOcean/gallery/2.png",
              "/images/EarthOcean/gallery/3.png",
              "/images/EarthOcean/gallery/4.png",
              "/images/EarthOcean/gallery/5.png",
              "/images/EarthOcean/gallery/6.png",
              "/images/EarthOcean/gallery/7.png",
              "/images/EarthOcean/gallery/8.png",
              "/images/EarthOcean/gallery/9.png",
             

            ].map((src, i) => (
              <div
                key={i}
                className="relative cursor-pointer overflow-hidden group rounded-md shadow-sm"
                onClick={() => openLightbox(src)}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Two-column description */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="md:w-1/2 w-full bg-gray-50 p-6 flex flex-col items-center justify-center gap-2">
              <h2 className="text-2xl font-bold">Earth in the Ocean</h2>
              <h3 className="text-xl font-medium">Ceramics Project</h3>
              <h4 className="text-gray-700 font-extralight">
Marine-Inspired Biomimetic Forms.</h4>
            </div>
            <div className="md:w-1/2 w-full bg-gray-100 p-6">
          
              <p>
             
Earth in the Ocean is an experimental exploration of biomimicry through ceramics. The project investigates how natural systems from marine ecosystems to the growth patterns of plants and organisms  can inspire form, structure, and materiality. By observing how life adapts, organizes, and interacts in nature, the work translates these principles into tangible ceramic forms, creating objects that reflect the intelligence, rhythm, and resilience of the natural world. The focus is on process, observation, and adaptation, turning ceramics into a medium to study and reinterpret nature’s strategies in a tactile, earthbound way.

              </p>
             
            </div>
          </div>

          {/* Process Panel */}
          <div className="mt-8">
            <button
              onClick={() => setShowProcess2(!showProcess2)}
              className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
            >
              {showProcess2 ? "Hide process" : "See more about my process"}
            </button>

            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showProcess2 ? "max-h-screen opacity-100 mt-8" : "max-h-0 opacity-0"}`}>
              <div className="bg-gray-100 p-8 flex flex-col gap-8">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold mb-4">Process & Development</h3>
                  <p className="text-gray-700 leading-relaxed">
                   
This project explores the intersection between the natural, tactile qualities of ceramics and the complexity of marine ecosystems. Through extensive research into marine life, I experimented with abstract forms that translate the textures, shapes, and interactions of underwater environments into handcrafted ceramic pieces. The process was driven by the challenge of conveying the fluidity and vibrancy of marine ecosystems using a medium rooted in the earth, highlighting the dialogue between land and sea.

                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {[
                    "/images/EarthOcean/process/1.jpg",
                    "/images/EarthOcean/process/2.png",
                    "/images/EarthOcean/process/4.jpg",
                    "/images/EarthOcean/process/3.jpg",
                   "/images/EarthOcean/process/5.png",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Process ${i + 1}`}
                      className="h-64 object-cover cursor-pointer"
                      onClick={() => openLightbox(src)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProjectDivider />

      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Materialbased;