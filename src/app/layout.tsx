"use client";

import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useIdle from "../hooks/useIdle";
import { components } from "../slices";

const { materialbased: AboutMe } = components;
const ContactModal = dynamic(() => import("../slices/ContactModal"), { ssr: false });

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth", "slnt"],
});

const cubaTips = [
  // Music
  "Did you know? Compay Segundo was a guitarist and composer who pioneered the son cubano rhythm, blending Spanish and African influences that defined Cuban music.",
  "Did you know? Frank Grillo (Machito) revolutionized Cuban music by fusing mambo with jazz, creating the Afro-Cuban jazz movement in the 1940s.",
  "Did you know? Beny Moré, 'The Prince of Singers,' blended bolero, cha-cha-cha, and mambo into a unique vocal style that influenced Latin music globally.",
  "Did you know? Los Van Van created timba music, a modern dance music form rooted in son that became the soundtrack of contemporary Cuban culture.",
  "Did you know? Tito Puente's Cuban-inspired percussion work with timbales transformed salsa music and made it a worldwide phenomenon.",
  
  // Visual Arts & Painting
  "Did you know? Wifredo Lam was a Afro-Cuban painter who merged surrealism with African and Caribbean imagery, creating a revolutionary visual language.",
  "Did you know? Amelia Peláez created vibrant pop-influenced paintings that celebrated Cuban decorative traditions and feminine strength.",
  "Did you know? Luis Martínez Pedro pioneered Cuban constructivism and abstract art, blending European movements with Caribbean sensibilities.",
  "Did you know? Edmundo Desnoes was a painter and writer who fused pop art with political commentary, documenting Cuban social transformation.",
  "Did you know? Manuel Mendive combines Afro-Cuban spiritual traditions with contemporary painting, creating ritually charged canvases.",
  
  // Sculpture & Installation
  "Did you know? Agustín Cárdenas sculpted organic, sensual forms that explored the boundary between figuration and abstraction from Cuba to Paris.",
  "Did you know? Eduardo Paolozzi collaborated with Cuban artists to bring kinetic sculpture and pop sensibilities to the Caribbean.",
  "Did you know? Enrique Martínez Celaya creates intricate mixed-media works that dialogue with Cuban memory and personal mythology.",
  
  // Photography & Documentary
  "Did you know? Raúl Corrales was a revolutionary photographer who documented Cuba's transformation, creating iconic images of post-1959 society.",
  "Did you know? Ramón Tabío combined photography with poetry and multimedia work, exploring identity and cultural memory in Cuban visual practice.",
  "Did you know? Isráel Ramírez Medina captures urban Cuban landscapes and street culture, documenting the poetry of everyday Havana.",
  
  // Dance & Choreography
  "Did you know? Alicia Alonso founded ballet in Cuba as a national art form, bringing world-class classical training to the island.",
  "Did you know? Carlos Acosta is a principal ballet dancer known for interpreting classical roles while celebrating Afro-Cuban heritage.",
  "Did you know? Lizt Alfonso choreographed modern works that blend flamenco, contemporary, and Cuban traditions into a unique fusion aesthetic.",
  "Did you know? Antonio Gades created the 'Gitanería' style, merging flamenco with Cuban rumba and contemporary movement vocabulary.",
  
  // Literature & Poetry
  "Did you know? Nicolás Guillén revolutionized Cuban poetry by incorporating Afro-Cuban vernacular and rhythms into avant-garde literary forms.",
  "Did you know? Alejo Carpentier's novels blended magical realism with historical narrative, creating a distinctly Cuban literary voice.",
  "Did you know? José Lezama Lima created a baroque, densely layered literary style that influenced Latin American literature across generations.",
  "Did you know? Reinaldo Arenas wrote experimental, poetically defiant novels that challenged political norms and pushed literary boundaries.",
  
  // Film & Cinematography
  "Did you know? Juan Carlos Tabío directed films exploring contemporary Cuban life with humor, romance, and social critique.",
  "Did you know? Humberto Solás created epic political documentaries and dramas that documented Cuba's revolutionary transformation.",
  "Did you know? Tomás Gutiérrez Alea (Titón) pioneered Cuban cinema with films like 'Memories of Underdevelopment,' merging experimental and narrative forms.",
  
  // Design & Architecture
  "Did you know? Architects like Mario Girona designed modernist buildings in Havana that blend international styles with tropical aesthetics.",
  "Did you know? Cuban graphic designers developed bold revolutionary poster art that merged propaganda, typography, and artistic innovation.",
  "Did you know? Industrial designers in Cuba created iconic mid-century furniture that blended function with sensual, organic forms.",
  
  // Crafts & Decorative Arts
  "Did you know? Cuban ceramicists like Fidel Arevalo work with clay traditions that merge taíno indigenous techniques with contemporary expressions.",
  "Did you know? Hand-woven textiles in Cuba preserve African and Spanish traditions, with artisans creating intricate patterns passed through generations.",
  "Did you know? Cuban wood carvers create elaborate decorative doors, furniture, and religious objects that showcase mastery of tropical hardwoods.",
  
  // Contemporary & Mixed Media
  "Did you know? Aimé Iglesias combines digital art, video, and installation to explore diaspora, memory, and technology in contemporary Cuban practice.",
  "Did you know? José A. Figueroa works with found materials and performance, creating activist art that addresses social and environmental issues.",
  "Did you know? René Peña merges personal archive, photography, and painting into introspective works exploring identity and historical trauma.",
  "Did you know? Tania Bruguera creates performative installations that blur boundaries between artist and audience, engaging political participation.",
  
  // Music Production & Innovation
  "Did you know? Juan Formell led Los Van Van in innovating timba production, using electronic instruments while maintaining deep Cuban rhythmic roots.",
  "Did you know? Ileana Carrillo is a contemporary opera singer bringing classical training to Cuban music traditions and fusing genres.",
  "Did you know? Silvio Rodríguez pioneered 'Nueva Trova,' blending folk-influenced guitar work with poetic, socially conscious Cuban lyrics.",
  
  // Performance & Multimedia
  "Did you know? Teatro Conjunto draws from Afro-Cuban ritual, contemporary theater, and community practice to create transformative performance work.",
  "Did you know? Ballet Nacional de Cuba merges classical technique with contemporary works rooted in Cuban cultural identity.",
  
  // Historical & Cultural
  "Did you know? Cuba has one of the richest Afro-Caribbean music lineages in the world, from rumba to son.",
  "Did you know? Havana's architecture blends colonial, art deco, and modernist layers in the same streets.",
  "Did you know? In Cuba, visual storytelling often lives in hand-painted signs, murals, and improvised design.",
  "Did you know? Cuban dance culture strongly shapes rhythm, posture, and movement in visual composition.",
  "Did you know? Many Cuban artists work across materials, mixing restoration, craft, and contemporary practice.",
  "Did you know? The cigar-rolling tradition in Cuba is an art form combining precision, cultural history, and craftsmanship.",
  "Did you know? Santería art and spiritual practice in Cuba blends West African traditions with Catholicism, creating unique sacred imagery.",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { idle, resetIdle } = useIdle(45000);

  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showCubaOrb, setShowCubaOrb] = useState(false);
  const [showCubaTip, setShowCubaTip] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [anySectionOpen, setAnySectionOpen] = useState(false);

  const showScreensaver = idle && !showAboutMe && !showContact;

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleSectionStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setAnySectionOpen(customEvent.detail?.isOpen || false);
    };
    window.addEventListener("portfolio:section-open", handleSectionStateChange);
    return () => window.removeEventListener("portfolio:section-open", handleSectionStateChange);
  }, []);

  const nextRandomTip = () => {
    if (cubaTips.length <= 1) return;
    setTipIndex((prev) => {
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * cubaTips.length);
      }
      return next;
    });
  };

  useEffect(() => {
    if (showScreensaver || !anySectionOpen) {
      setShowCubaOrb(false);
      setShowCubaTip(false);
      return;
    }

    let tipTimeout: number | null = null;
    let orbTimeout: number | null = null;

    const showCubaPopup = () => {
      nextRandomTip();
      setShowCubaOrb(true);
      setShowCubaTip(true);

      tipTimeout = window.setTimeout(() => {
        setShowCubaTip(false);
      }, 5000);

      orbTimeout = window.setTimeout(() => {
        setShowCubaOrb(false);
      }, 7000);
    };

    // Pop up randomly every 10 minutes (600000ms), with ±2 min variance
    const randomInterval = 600000 + (Math.random() - 0.5) * 240000;
    const interval = window.setInterval(showCubaPopup, randomInterval);

    return () => {
      window.clearInterval(interval);
      if (tipTimeout) window.clearTimeout(tipTimeout);
      if (orbTimeout) window.clearTimeout(orbTimeout);
    };
  }, [showScreensaver, anySectionOpen]);

  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} antialiased relative`}>
        
        {/* Main content */}
        <div className="relative z-10">
          <main className="px-6">
            <div className="max-w-250 mx-auto">
              {children}
            </div>
          </main>
        </div>

        {!showScreensaver && (
          <button
            className="fixed top-4 left-4 z-60 px-4 py-2 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-xs md:text-sm hover:text-[#ff2f00] transition-colors"
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            aria-label="Toggle color mode"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        )}

        {!showScreensaver && showCubaOrb && (
          <div className="fixed bottom-4 right-4 z-60 flex flex-col items-end gap-3">
            {showCubaTip && (
              <div className="w-[min(92vw,22rem)] border border-zinc-300 bg-white/95 backdrop-blur-md shadow-2xl p-4">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-zinc-500 mb-2">Cuba Curiosity</p>
                <p className="text-sm md:text-[0.95rem] text-zinc-800 leading-relaxed">{cubaTips[tipIndex]}</p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    className="px-3 py-1.5 bg-zinc-100 border border-zinc-300 text-xs uppercase tracking-[0.12em] text-zinc-800 hover:text-[#ff2f00] transition-colors"
                    onClick={nextRandomTip}
                  >
                    Next Tip
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-zinc-600 hover:text-[#ff2f00] transition-colors"
                    onClick={() => setShowCubaTip(false)}
                  >
                    Hide
                  </button>
                </div>
              </div>
            )}

            <button
              className="cuba-tip-float w-14 h-14 rotate-45 flex items-center justify-center bg-black/60 backdrop-blur-md text-white text-[0.65rem] uppercase tracking-[0.14em] font-medium border border-white/20 hover:text-[#ff2f00] transition-colors"
              onClick={() => {
                setShowCubaTip((prev) => !prev);
                if (!showCubaTip) {
                  nextRandomTip();
                }
              }}
              aria-label="Toggle Cuba tip"
            >
              <span className="-rotate-45">Cuba?</span>
            </button>
          </div>
        )}

        {/* Optional global About Me Modal */}
        {showAboutMe && (
          <div className="fixed inset-0 z-40 flex flex-col">
            <div className="absolute top-4 right-4 z-50">
              <button
                className="px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors"
                onClick={() => setShowAboutMe(false)}
                aria-label="Close About Me"
              >
                Close
              </button>
            </div>
            <AboutMe isVisible={showAboutMe} onClose={() => setShowAboutMe(false)} />
          </div>
        )}

        {/* Optional global Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 z-40 flex flex-col">
            <div className="absolute top-4 right-4 z-50">
              <button
                className="px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors"
                onClick={() => setShowContact(false)}
                aria-label="Close Contact"
              >
                Close
              </button>
            </div>
            <ContactModal onClose={() => setShowContact(false)} />
          </div>
        )}

        {showScreensaver && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-6"
            onPointerDown={resetIdle}
          >
            <div className="w-full max-w-3xl border border-white/20 bg-white/8 p-8 md:p-12 text-center text-white shadow-2xl">
              <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-white/70 mb-4">
                Screensaver Mode
              </p>

              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
                Follow Along on Instagram
              </h2>

              <p className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Tap anywhere to return to the site, or open one of the profiles below.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://instagram.com/misrizosdesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  misrizosdesign
                </a>
                <a
                  href="https://instagram.com/misrizos_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  misrizos_studio
                </a>
              </div>
            </div>
          </div>
        )}

       
      </body>
    </html>
  );
}