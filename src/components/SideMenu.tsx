// components/SideMenu.tsx
"use client";
import React from "react"


export interface MenuItem {
  id: string;
  label: string;
  short: string;
}

interface SideMenuProps {
  activeSection: string;
  onTabClick: (id: string) => void;
  items: MenuItem[];
}

const SideMenu: React.FC<SideMenuProps> = ({ activeSection, onTabClick, items }) => {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-center">
      {items.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabClick(item.id)}
            aria-label={`Jump to ${item.label}`}
            className="relative group flex flex-col items-center transition-all duration-300"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center text-base font-semibold tracking-tight border transition-all duration-300
                ${isActive
                  ? "bg-black text-white border-black scale-110"
                  : "bg-black text-gray-400 border-gray-200 animate-shake hover:animate-none hover:text-[#ff2f00]"
                }`}
            >
              {item.short}
            </div>

            <span
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded shadow-lg
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;