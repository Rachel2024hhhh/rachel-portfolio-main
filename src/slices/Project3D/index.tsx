"use client";

import React, { useState, useRef, useMemo, Suspense, useEffect, useCallback } from "react";
import Image from "next/image";
import ProjectDivider from "../../components/ProjectDivider";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
import SideMenu, { MenuItem } from "../../components/SideMenu";

// --- TYPES ---
interface Building {
  name: string;
  description: React.ReactNode;
  folder: string;
  images: string[];
}

// --- DATA ---
const buildings: Building[] = [
  {
    name: "Spore Habitat",
    description: (
      <>
        <p>A modular habitat that grows and adapts like a living organism.</p>
        <h2>Concept</h2>
        <p>
          Inspired by the growth patterns of mushrooms and fungi, Mycelium Tower
          is a vertical, modular living structure where each unit stacks
          organically above the other. The design moves away from rigid,
          grid-based architecture, creating a building that adapts naturally to
          light, privacy, and circulation.
        </p>
        <h2>Design Approach</h2>
        <p>
          The building&apos;s modular floors allow rotation and adaptability,
          responding to sunlight and natural airflow. Its stacked organic layout
          rejects rigid grids, creating a flexible structure that interacts
          dynamically with its environment.
        </p>
      </>
    ),
    folder: "building1",
    images: Array.from(
      { length: 13 },
      (_, i) => `/images/growinghabitats/building1/${i + 1}.webp`
    ),
  },
  {
    name: "Shell Community",
    description: (
      <>
        <p>
          A rounded habitat structure designed to maximize sunlight and natural
          airflow.
        </p>
        <h2>Concept</h2>
        <p>
          Inspired by the way snails form communities, Shell Community
          reimagines the shell as the central feature of the structure.
        </p>
        <h2>Design Approach</h2>
        <p>
          The glass shell maximizes natural light and energy efficiency, while
          the rounded form promotes airflow and openness.
        </p>
      </>
    ),
    folder: "building3",
    images: Array.from(
      { length: 7 },
      (_, i) => `/images/growinghabitats/building3/${i + 1}.webp`
    ),
  },
  {
    name: "Lotus Canopy",
    description: (
      <>
        <p>A water-harvesting canopy that supports the ecosystem below.</p>
        <h2>Concept</h2>
        <p>
          Inspired by the lotus plant, Lotus Canopy is a vertical, rounded
          structure with a glass top that collects and channels water.
        </p>
        <h2>Design Approach</h2>
        <p>
          Water collected from the glass canopy is channeled through a
          liana-like internal system to fertilize surrounding soil.
        </p>
      </>
    ),
    folder: "building2",
    images: Array.from(
      { length: 8 },
      (_, i) => `/images/growinghabitats/building2/${i + 1}.webp`
    ),
  },
];

// --- SIDE MENU ITEMS ---
export const ProjectMenuItems: MenuItem[] = [
  { id: "#project1", label: "Growing Habitats", short: "01" },
  { id: "#project2", label: "e-flux Posters", short: "02" },
];

// --- SHUFFLE FUNCTION ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- MODEL COMPONENT ---
interface ModelProps {
  path: string;
  scale?: [number, number, number];
  position?: [number, number, number];
}

function Model({ path, scale = [1, 1, 1], position = [0, 0, 0] }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
}

// --- MAIN COMPONENT ---
export default function Project3D() {
  const [selectedBuilding, setSelectedBuilding] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [modelError, setModelError] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const orbitControlsRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shuffledImages = useMemo(
    () => shuffleArray(buildings[selectedBuilding].images),
    [selectedBuilding]
  );

  const handleBuildingSelect = useCallback((index: number) => {
    setSelectedBuilding(index);
    setCurrentImageIndex(0);
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : shuffledImages.length - 1
    );
  }, [shuffledImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev < shuffledImages.length - 1 ? prev + 1 : 0
    );
  }, [shuffledImages.length]);

  return (
    <section id="project1" className="relative w-full min-h-screen bg-white">
      <SideMenu items={ProjectMenuItems} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Growing Habitats</h1>

        {/* Building selector */}
        <div className="flex gap-4 mb-8">
          {buildings.map((building, index) => (
            <button
              key={building.folder}
              onClick={() => handleBuildingSelect(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedBuilding === index
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {building.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 3D Model viewer */}
          <div className="md:w-1/2 w-full h-[500px] bg-gray-900 rounded-xl overflow-hidden relative">
            {isClient ? (
              modelError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-2xl">⚠</span>
                  </div>
                  <p className="text-lg font-medium mb-2">
                    Unable to load 3D model
                  </p>
                  <p className="text-sm text-gray-400">
                    The model file may be missing or corrupted
                  </p>
                </div>
              ) : (
                <Canvas
                  camera={{ position: [0, 5, 25], fov: 45 }}
                  gl={{ antialias: true, toneMappingExposure: 1 }}
                  shadows
                  onError={(error) => {
                    console.error("Canvas error:", error);
                    setModelError(true);
                  }}
                >
                  <ambientLight intensity={0.7} />
                  <directionalLight
                    position={[10, 10, 10]}
                    intensity={1.2}
                    castShadow
                  />
                  <directionalLight position={[-10, 5, -5]} intensity={0.6} />

                  <Suspense
                    fallback={
                      <Html center>
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <p className="text-sm font-medium text-white">
                            Loading model...
                          </p>
                        </div>
                      </Html>
                    }
                  >
                    <Model
                      path="/models/myModel.glb"
                      scale={[0.01, 0.01, 0.01]}
                      position={[0, -4, 0]}
                    />
                  </Suspense>

                  <OrbitControls
                    ref={orbitControlsRef}
                    enablePan={false}
                    minDistance={5}
                    maxDistance={50}
                    autoRotate
                    autoRotateSpeed={0.3}
                    enableDamping
                    dampingFactor={0.05}
                  />
                  <Environment preset="sunset" background blur={0.6} />
                </Canvas>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <p className="text-white">Loading...</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:w-1/2 w-full bg-gray-100 p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              {buildings[selectedBuilding].name}
            </h2>
            <div className="prose prose-sm max-w-none">
              {buildings[selectedBuilding].description}
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="mt-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
            {shuffledImages.length > 0 && (
              <Image
                src={shuffledImages[currentImageIndex]}
                alt={`${buildings[selectedBuilding].name} - image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority={currentImageIndex === 0}
              />
            )}

            {/* Navigation arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {shuffledImages.length}
            </div>
          </div>
        </div>
      </div>

      <ProjectDivider />
    </section>
  );
}
