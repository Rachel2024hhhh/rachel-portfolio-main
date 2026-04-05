"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SideMenu, { MenuItem } from "../../components/SideMenu";

interface WorkExperienceProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const ExperienceMenuItems: MenuItem[] = [
  { id: "#experience-roles", label: "Projects & Roles", short: "01" },
  { id: "#experience-learning", label: "Learning Path", short: "02" },
  { id: "#experience-tools", label: "Tools & Approach", short: "03" },
];

type ExperienceItem = {
  title: string;
  place: string;
  period?: string;
  focus?: string;
  externalLink?: string;
  externalLinkLabel?: string;
  externalLinks?: { url: string; label: string }[];
  bullets: string[];
  images?: { src: string; alt: string }[];
};

const experienceItems: ExperienceItem[] = [
  {
    title: "Art Restoration and Conservation Assistant",
    place: "Atrio, Havana, Cuba",
    period: "2013 - 2018",
    focus: "Restoration Practice",
    bullets: [
      "Assisted in art restoration and conservation.",
      "Collaborated with companies, architects, and designers.",
    ],
    images: [],
  },
  {
    title: "Finance Internship",
    place: "International Trade Center, Havana, Cuba",
    focus: "Financial Processes",
    bullets: ["Completed a finance internship focused on practical accounting workflows."],
    images: [],
  },
  {
    title: "Restored Pieces Documentation",
    place: "Cuban artist Luis Martinez Pedro publication",
    focus: "Art Restoration Archive",
    externalLink: "https://www.amazon.com/-/es/Luis-martinez-pedro-revelaciones-spanish-cuban/dp/8494687131",
    externalLinkLabel: "Book on Amazon",
    externalLinks: [
      {
        url: "https://www.artnet.com/artists/luis-martinez-pedro/",
        label: "Luis Martinez Pedro Profile",
      },
    ],
    bullets: [
      "Contributed to the restoration of selected art pieces.",
      "The restoration work took place at Plaza de la Revolucion in Havana, Cuba.",
      "A book documenting these restored works is currently available on Amazon.",
      "Add your own process and final images below.",
    ],
    images: [],
  },
  {
    title: "Stage and Art Collaboration",
    place: "Carlos Acosta (Carlos Yunior Acosta Quesada)",
    focus: "Artwork Reproduction Restoration",
    externalLink: "https://en.wikipedia.org/wiki/Carlos_Acosta",
    externalLinkLabel: "Artist reference",
    bullets: [
      "Worked with Cuban-British ballet artist Carlos Acosta.",
      "Participated in the restoration of a reproduction of La Maja Desnuda by Francisco Goya.",
    ],
    images: [],
  },
];

const WorkExperience: FC<WorkExperienceProps> = ({ isVisible = true, onClose }) => {
  const rolesRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("");
  const tabContainerHeight = 70;

  const onTabClick = useCallback((id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const updateActiveTab = useCallback(() => {
    const sections = [
      { id: "#experience-roles", ref: rolesRef },
      { id: "#experience-learning", ref: learningRef },
      { id: "#experience-tools", ref: toolsRef },
    ];

    for (const section of sections) {
      if (section.ref.current) {
        const offsetTop = section.ref.current.offsetTop - tabContainerHeight;
        const offsetBottom =
          section.ref.current.offsetTop +
          section.ref.current.offsetHeight -
          tabContainerHeight;

        if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!isVisible) return;

    const onScroll = () => requestAnimationFrame(updateActiveTab);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveTab);
    updateActiveTab();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveTab);
    };
  }, [isVisible, updateActiveTab]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      {onClose && (
        <button
          className="fixed top-5 right-5 md:top-6 md:right-6 px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors z-50"
          onClick={onClose}
          aria-label="Close work experience"
        >
          Close
        </button>
      )}

      <SideMenu
        items={ExperienceMenuItems}
        activeSection={activeSection}
        onTabClick={onTabClick}
      />

      <div className="p-10 max-w-7xl mx-auto space-y-8 relative text-center">
        <div className="mx-auto mt-4 inline-flex items-center gap-3 border border-zinc-300 px-3 py-1.5 bg-white/70">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-zinc-600">Section 04</span>
          <span className="h-px w-8 bg-zinc-400" aria-hidden="true" />
          <span className="text-zinc-500 text-[0.65rem]">●</span>
        </div>

        <header className="space-y-4 border-b border-zinc-200 pb-8 mt-10">
          <p className="magazine-kicker">Issue 01 / Practice Archive</p>
          <h1 className="magazine-title">Practice Space</h1>
          <p className="magazine-dek">
            This section is still in development, so not all content is updated yet.
          </p>
          <p className="magazine-byline">Edited by Misrizos Studio</p>
          <div className="magazine-rule" aria-hidden="true" />
        </header>

        <section id="experience-roles" ref={rolesRef} className="space-y-6 mb-6 mt-12 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Selected Projects and Roles</h2>

          {experienceItems.map((item) => (
            <article key={item.title} className="bg-zinc-100 border border-zinc-200 p-7 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="text-zinc-800 leading-relaxed text-center magazine-body">
                  {item.focus && <p className="text-xs uppercase tracking-[0.14em] text-zinc-500 mb-2">{item.focus}</p>}
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <p className="text-zinc-600">{item.place}</p>
                  {item.period && <p className="text-zinc-600 mb-3">{item.period}</p>}

                  <div className="mt-2 flex flex-wrap justify-center gap-4">
                    {item.externalLink && (
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm uppercase tracking-widest underline underline-offset-4 text-zinc-700 hover:text-[#ff2f00] transition-colors"
                      >
                        {item.externalLinkLabel ?? "Learn more"}
                      </a>
                    )}
                    {item.externalLinks?.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm uppercase tracking-widest underline underline-offset-4 text-zinc-700 hover:text-[#ff2f00] transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <ul className="list-disc list-inside space-y-2 mt-3 text-center">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-50 border border-zinc-300 p-4">
                  {item.images && item.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {item.images.map((image, imageIndex) => (
                        <div
                          key={image.src}
                          className="project-gallery-float relative aspect-4/3 overflow-hidden border border-zinc-300 bg-zinc-200"
                          style={{ animationDelay: `${(imageIndex % 6) * 0.2}s` }}
                        >
                          <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="aspect-4/3 border border-dashed border-zinc-400 bg-white/70 grid place-items-center text-center p-6">
                      <div>
                        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500 mb-2">Image Space Ready</p>
                        <p className="text-zinc-700 text-sm">
                          Add process or final images to this card by filling the images array for {item.title}.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="experience-learning" ref={learningRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-zinc-50 p-6 border border-zinc-200">
            <h2 className="text-xl font-bold mb-4">Learning Path</h2>
            <div className="space-y-4 text-zinc-800 leading-relaxed text-center">
              <div>
                <h3 className="font-semibold">Bachelor - Graphic Design (BDes)</h3>
                <p className="text-zinc-600">ArtEZ University of the Arts, Arnhem</p>
                <p className="text-zinc-600">September 2023 - July 2027 (expected)</p>
              </div>
              <div>
                <h3 className="font-semibold">Image Editing</h3>
                <p className="text-zinc-600">School of Creative Photography, Havana, Cuba</p>
                <p className="text-zinc-600">January 2014</p>
              </div>
              <div>
                <h3 className="font-semibold">Accounting and Finance</h3>
                <p className="text-zinc-600">Armando Mestre, Havana, Cuba</p>
                <p className="text-zinc-600">June 2012</p>
              </div>
            </div>
          </div>

          <div id="experience-tools" ref={toolsRef} className="space-y-6">
            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h2 className="text-xl font-bold mb-4">Tools in Use</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-800 justify-items-center">
                <li>Adobe Creative Cloud</li>
                <li>Blender</li>
                <li>Nomad Sculpt</li>
                <li>Procreate</li>
                <li>Clip Studio</li>
                <li>Figma</li>
              </ul>
            </div>

            <div className="bg-zinc-50 p-6 border border-zinc-200">
              <h2 className="text-xl font-bold mb-4">Working Approach</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-800 justify-items-center">
                <li>Attention to detail</li>
                <li>Visual awareness</li>
                <li>Team collaboration</li>
                <li>Continuous learning</li>
                <li>Creative thinking</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="mt-14 border-t border-zinc-300 pt-6">
          <p className="editorial-kicker text-zinc-700 mb-2">Editorial Footer</p>
          <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl mx-auto">
            This section is structured as a living archive: each role is presented as field notes, process context, and references instead of a traditional CV timeline.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WorkExperience;