"use client";

import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { useState } from "react";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { idle, resetIdle } = useIdle(45000);

  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const showScreensaver = idle && !showAboutMe && !showContact;

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
            <div className="w-full max-w-3xl rounded-2xl border border-white/20 bg-white/8 p-8 md:p-12 text-center text-white shadow-2xl">
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
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-medium uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors"
                >
                  misrizosdesign
                </a>
                <a
                  href="https://instagram.com/misrizos_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-medium uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors"
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