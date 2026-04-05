"use client";

import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import useIdle from "../hooks/useIdle";
import { components } from "../slices";
import ContactModal from "../slices/ContactModal";

const { materialbased: AboutMe } = components;

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth", "slnt"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useIdle(10000);

  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);

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

       
      </body>
    </html>
  );
}