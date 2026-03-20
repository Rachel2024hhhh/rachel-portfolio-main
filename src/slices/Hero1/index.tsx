"use client";
import { FC, useState, useEffect } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import Scene from "./Scene";
import PrintMatter from "../Prints";                  
import Project3D from "../Project3D";
import AboutMe3DEffect from "../AboutMe3DEffect";
import ContactModal from "../ContactModal";
import MaterialbasedModal from "../Materialbased";
import WorkExperience from "../Experience";
import ExperimentsTriggerAndModal from "./ExperimentsTriggerAndModal";

export type Hero1Props = SliceComponentProps<Content.Hero1Slice>;

const Hero1: FC<Hero1Props> = ({ slice }) => {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrints, setShowPrints] = useState(false);
  const [showProject3D, setShowProject3D] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  useEffect(() => {
    const anyActive = 
      showAboutMe || showContact || showPrints || showProject3D || showMaterial || showExperience;
    document.body.style.overflow = anyActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAboutMe, showContact, showPrints, showProject3D, showMaterial, showExperience]);

  return (
    <>
      

      {/* FIXED HERO */}
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="fixed inset-0 z-10 hero-cosmic-bg px-4 md:px-6 pt-20 flex items-center justify-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
            <div className="relative z-10 row-span-1 row-start-1 my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0">
              <Scene />
            </div>

            <div className="col-start-1 md:row-start-1 flex flex-col justify-center">
              <h1 className="mb-2 md:mb-8 text-[clamp(2.5rem,20vmin,13rem)] leading-none tracking-tighter whitespace-nowrap">
                <span className="block first-name-gold uppercase">
                  {slice.primary?.first_name ?? "First Name"}
                </span>
                <span className="block last-name-gold uppercase">
                  {slice.primary?.last_name ?? "Last Name"}
                </span>
              </h1>

              <span className="block tag-line-gradient text-2xl tracking-[.2em] md:text-4xl -mt-4">
                {slice.primary?.tag_line ?? "Your Tagline Here"}
              </span>

              <span className="block tag-line-description text-black font-normal text-lg md:text-xl tracking-tight leading-snug italic mt-4">
                {slice.primary.tag_line_description}
              </span>

             
             {/* ── Clickable Experiments Trigger ── */}
<div className="mt-6 md:mt-8">
  <ExperimentsTriggerAndModal
    triggerClassName="
      group
      inline-flex items-center 
      text-black
      text-lg md:text-xl font-italic uppercase tracking-[0.12em]
      cursor-pointer
      transition-colors duration-300
      hover:text-[#ff2f00]
      animate-[float_4s_ease-in-out_infinite]
    "
  />
</div>
            </div>
          </div>

          {/* BOTTOM BUTTONS – abrir proyectos */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg md:max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 justify-center">
              <button
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-sm md:text-lg hover:text-[#ff2f00] transition-colors flex items-center justify-center text-center"
                onClick={() => setShowProject3D(true)}
              >
                Digital 3D
              </button>

              <button
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-sm md:text-lg hover:text-[#ff2f00] transition-colors flex items-center justify-center text-center"
                onClick={() => setShowPrints(true)}
              >
                Prints & Photography
              </button>

              <button
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-sm md:text-lg hover:text-[#ff2f00] transition-colors flex items-center justify-center text-center"
                onClick={() => setShowMaterial(true)}
              >
                Material Based
              </button>

              <button
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-sm md:text-lg hover:text-[#ff2f00] transition-colors flex items-center justify-center text-center"
                onClick={() => setShowExperience(true)}
              >
                Work Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS / OVERLAYS */}
      {showAboutMe && <AboutMe3DEffect onClose={() => setShowAboutMe(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showPrints && <PrintMatter isVisible={showPrints} onClose={() => setShowPrints(false)} />}
      {showProject3D && <Project3D isVisible={showProject3D} onClose={() => setShowProject3D(false)} />}
      {showMaterial && <MaterialbasedModal isVisible={showMaterial} onClose={() => setShowMaterial(false)} />}
      {showExperience && <WorkExperience />}

      <div className="h-screen" />
    </>
  );
};

export default Hero1;