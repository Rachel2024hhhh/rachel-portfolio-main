"use client";

import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import useIdle from "../hooks/useIdle";
import { components } from "../slices";
import ContactModal from "../slices/ContactModal"; // Adjust path as needed

const { materialbased: AboutMe } = components;

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth", "slnt"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { idle } = useIdle(10000);

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
          <div className="relative z-40">
            <AboutMe isVisible={showAboutMe} onClose={() => setShowAboutMe(false)} />
            <button
              className="text-white absolute top-6 right-6 text-3xl"
              onClick={() => setShowAboutMe(false)}
            >
              ×
            </button>
          </div>
        )}

        {/* Optional global Contact Modal */}
        {showContact && (
          <div className="relative z-40">
            <ContactModal onClose={() => setShowContact(false)} />
            <button
              className="text-white absolute top-6 right-6 text-3xl"
              onClick={() => setShowContact(false)}
            >
              ×
            </button>
          </div>
        )}

       
      </body>
    </html>
  );
}
