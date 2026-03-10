"use client";

import React, { useState, useRef, useMemo, Suspense, useEffect } from "react";
import Image from "next/image";
import ProjectDivider from "../../components/ProjectDivider";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Bounds, Html } from "@react-three/drei";

// --- TYPES ---
interface Building {
  name: string;
  description: React.ReactNode;
  folder: string;
  images: string[];
}

// --- IMAGE LOADER ---
const importImages = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    require(`../../../public/images/growinghabitats/${folder}/${i + 1}.webp`).default
  );
// --- DATA ---

const buildings: Building[] = [
  {
    name: "Spore Habitat",
    description: (
      <>
        <p className="text-lg mb-4">
          A modular habitat that grows and adapts like a living organism.
        </p>

        <h2 className="text-xl font-semibold mb-1">Concept</h2>
        <p className="mb-4">
          Inspired by the growth patterns of mushrooms and fungi, Mycelium Tower is a vertical, modular living structure where each unit stacks organically above the other. The design moves away from rigid, grid-based architecture, creating a building that adapts naturally to light, privacy, and circulation. Each floor can rotate, allowing the structure to respond to sunlight and environmental conditions, while the overall form mimics the organic clustering and expansion seen in fungal growth. Mycelium Tower reimagines apartments as flexible, living elements that grow together like a forest.
        </p>

        <h2 className="text-xl font-semibold mb-1">Design Approach</h2>
        <p className="mb-4">
          The building’s modular floors allow rotation and adaptability, responding to sunlight and natural airflow. Its stacked organic layout rejects rigid grids, creating a flexible structure that interacts dynamically with its environment.
        </p>
      </>
    ),
    folder: "building1",
    images: importImages("building1", 13),
  },
  {
    name: "Shell Community",
    description: (
      <>
        <p className="text-lg mb-4">
          A rounded habitat structure designed to maximize sunlight and natural airflow.
        </p>

        <h2 className="text-xl font-semibold mb-1">Concept</h2>
        <p className="mb-4">
          Inspired by the way snails form communities, Shell Community reimagines the shell as the central feature of the structure. Unlike a natural shell, which offers protection, here the shell is made of glass, exposing the interior while optimizing energy absorption and natural light. The design flips the traditional role of the shell, turning it from a protective cover into a transparent, functional element that shapes the building’s environment.
        </p>

        <h2 className="text-xl font-semibold mb-1">Design Approach</h2>
        <p className="mb-4">
          The glass shell maximizes natural light and energy efficiency, while the rounded form promotes airflow and openness. The structure prioritizes visibility and connectivity, contrasting with the protective nature of a natural shell.
        </p>
      </>
    ),
    folder: "building3",
    images: importImages("building3", 7),
  },
  {
    name: "Lotus Canopy",
    description: (
      <>
        <p className="text-lg mb-4">
          A water-harvesting canopy that supports the ecosystem below.
        </p>

        <h2 className="text-xl font-semibold mb-1">Concept</h2>
        <p className="mb-4">
          Inspired by the lotus plant, Lotus Canopy is a vertical, rounded structure with a glass top that collects and channels water. Beneath the canopy, a plate-like system gathers rainfall, directing it through a liana-like network that mimics natural water pathways in forest ecosystems. This system not only manages water efficiently but also nourishes the surrounding ground, creating fertile areas for plants to grow. The design highlights the connection between architecture and ecological cycles, turning the building into an active participant in its environment.
        </p>

        <h2 className="text-xl font-semibold mb-1">Design Approach</h2>
        <p className="mb-4">
          Water collected from the glass canopy is channeled through a liana-like internal system to fertilize surrounding soil. The rounded structure optimizes sunlight exposure and airflow, supporting plant growth while integrating seamlessly into the environment.
        </p>
      </>
    ),
    folder: "building2",
    images: importImages("building2", 8),
  },
];

// --- SHUFFLE FUNCTION ---
const shuffleArray = <T,>(array: T[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- MODEL LOADER ---
const Model: React.FC<{ path: string; scale?: [number, number, number]; position?: [number, number, number] }> = ({
  path,
  scale = [1, 1, 1],
  position = [0, 0, 0],
}) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
};

const PrintMatter3D: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const project3DRef = useRef<HTMLDivElement>(null);
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(true);

  useEffect(() => setMounted(true), []);

  const allGalleryImages = useMemo(
    () =>
      shuffleArray(
        buildings.flatMap((b) =>
          b.images.map((img) => ({ img, building: b }))
        )
      ),
    []
  );

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <button
        className="absolute top-4 right-4 px-6 py-3 bg-black/50 backdrop-blur-md text-white font-medium uppercase text-lg hover:text-[#ff2f00] transition-colors z-50"
        onClick={onClose}
      >
        Close
      </button>

      <div className="p-10">
        <div ref={project3DRef} className="mb-6 mt-12 flex flex-col gap-6 relative">
          <h1 className="text-[6vw] font-bold tracking-wide text-center">Growing Habitats</h1>


{/* First Gallery Slider */}
<div className="gallery-slider relative w-full h-200 overflow-hidden cursor-pointer">
  {Array.from({ length: 8 }, (_, i) => `/images/growinghabitats/book/${i + 1}.webp`).map((src, i) => {
    const prev = i === 0 ? 7 : i - 1;
    const next = i === 7 ? 0 : i + 1;

    return (
      <div
        key={i}
        className={`slide-container absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
          i === 0 ? "opacity-100" : "opacity-0"
        }`}
        data-index={i}
      >
        <Image
          src={src}
          alt={`Book Page ${i + 1}`}
          fill
          className="object-cover w-full h-full"
          unoptimized
        />

        {/* Navigation – same placement, but smarter logic */}
        <div className="nav absolute inset-0 pointer-events-none">
          <button
            onClick={() => {
              // Find CURRENT visible slide (not assuming this button's index)
              const slides = document.querySelectorAll<HTMLDivElement>(".slide-container");
              let currentIdx = 0;
              slides.forEach((slide, idx) => {
                if (slide.classList.contains("opacity-100")) {
                  currentIdx = idx;
                }
              });

              const targetIdx = currentIdx === 0 ? 7 : currentIdx - 1;

              slides.forEach((slide) => {
                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0");
              });
              slides[targetIdx].classList.remove("opacity-0");
              slides[targetIdx].classList.add("opacity-100");
            }}
            className="prev absolute -left-4 top-0 w-20 h-full flex items-center justify-center text-white text-4xl bg-white/10 hover:bg-white/30 opacity-100 pointer-events-auto rounded-l transition-all"
          >
            &#x2039;
          </button>

          <button
            onClick={() => {
              const slides = document.querySelectorAll<HTMLDivElement>(".slide-container");
              let currentIdx = 0;
              slides.forEach((slide, idx) => {
                if (slide.classList.contains("opacity-100")) {
                  currentIdx = idx;
                }
              });

              const targetIdx = currentIdx === 7 ? 0 : currentIdx + 1;

              slides.forEach((slide) => {
                slide.classList.remove("opacity-100");
                slide.classList.add("opacity-0");
              });
              slides[targetIdx].classList.remove("opacity-0");
              slides[targetIdx].classList.add("opacity-100");
            }}
            className="next absolute -right-4 top-0 w-20 h-full flex items-center justify-center text-white text-4xl bg-white/10 hover:bg-white/30 opacity-100 pointer-events-auto rounded-r transition-all"
          >
            &#x203a;
          </button>
        </div>

        {/* Thin gradient blur edges – unchanged */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-12 h-full bg-linear-to-r from-white/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-12 h-full bg-linear-to-l from-white/20 to-transparent"></div>
        </div>
      </div>
    );
  })}
</div>

          {/* 3D Canvas + Text */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 w-full h-96 md:h-128 shadow-md overflow-hidden relative">
              {mounted && (
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, toneMappingExposure: 1 }} shadows>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
                  <directionalLight position={[-10, 5, -5]} intensity={0.6} />

                  <Suspense
                    fallback={
                      <Html center>
                        <div className="flex flex-col items-center gap-3">
                          <Image
                            src="/images/growinghabitats/placeholder1.webp"
                            alt="3D model loading"
                            width={100}
                            height={100}
                            className="opacity-100"
                          />
                          <p className="text-sm font-medium text-gray-300">Loading model…</p>
                        </div>
                      </Html>
                    }
                  >
                    <Bounds fit clip observe margin={1.2}>
                      <Model path="/models/myModel.glb" scale={[0.02, 0.02, 0.02]} position={[0, 0.8, 0]} />
                    </Bounds>
                  </Suspense>

                  <OrbitControls enablePan={false} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={0.3} />
                  <Environment preset="sunset" background blur={0.6} />
                </Canvas>
              )}
            </div>

            <div className="md:w-1/2 w-full bg-gray-100 p-6 flex flex-col gap-4">
  <h2 className="text-2xl font-bold">Growing Habitats</h2>
  <p className="font-medium">3D Explorations of Nature and Architecture</p>

  <p>
    Growing Habitats is a 3D project that explores the intersection of <strong>architecture and natural growth patterns</strong>. Inspired by the ways plants, fungi, and animals build and interact with their environments, I created a series of 3D sculptures where each architectural form reflects specific characteristics from nature.
  </p>

  <p>
    In this phase of my practice, I focused on <strong>3D sculpting</strong> as a way to translate my need for building, movement, and interactivity into space. I started working with <strong>Nomad Sculpt</strong> and, more recently, <strong>Blender</strong>, experimenting with how forms can exist and flow in three dimensions.
  </p>

  <p>
    Some pieces take cues from mushroom growth, bird nests, or the clustering of snails, transforming observations into architectural forms that reflect <strong>interconnectedness, adaptability, and coexistence</strong> between humans and the natural world.
  </p>
</div>



          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {allGalleryImages.map(({ img, building }, index) => (
              <div
                key={index}
                className="relative cursor-pointer overflow-hidden shadow-md bg-gray-100 group"
                onClick={() => setActiveBuilding(building)}
              >
                <Image
                  src={img}
                  alt={building.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-60 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm text-center p-4 transition-opacity">
                  View {building.name}
                </div>
              </div>
            ))}
          </div>

          {/* Process & Video Section */}
          <div className="mt-16">
            <button
              onClick={() => setShowProcess(!showProcess)}
              className="uppercase text-sm tracking-wider font-medium border-b border-black hover:text-[#ff2f00] transition-colors"
            >
              {showProcess ? "Hide process" : "See more about my process"}
            </button>

            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden ${
                showProcess ? "max-h-screen opacity-100 mt-8" : "max-h-0 opacity-0"
              }`}
            >
             
<div className="bg-gray-100 p-8 flex flex-col gap-8">
  <div className="max-w-3xl">
    <h3 className="text-2xl font-bold mb-4">Process & Development</h3>

    <p className="text-gray-700 leading-relaxed">
      The process began with exploring different landscapes, observing how <strong>nature grows within human-made environments</strong>. I took extensive photographs to document the ways flora and fauna expand, adapt, and inhabit spaces alongside architecture.
    </p>

    <p className="text-gray-700 leading-relaxed">
      This research extended to studying the behaviors and homes of plants and animals, focusing on <strong>how they build, nest, and interact with their surroundings</strong>. These observations became the foundation for my design explorations.
    </p>

    <p className="text-gray-700 leading-relaxed">
      I then translated these insights into sketches, which were later modeled in <strong>Nomad Sculpt</strong> and, subsequently, <strong>Blender</strong>. This step allowed me to experiment with <em>forms, spatial relationships, and movement</em> in three dimensions.
    </p>

    <p className="text-gray-700 leading-relaxed">
      A small simulation video was created to visualize how these shapes could function within an environment. While it is not as refined as I would have liked, it provides a general view of <strong>interactivity, integration, and the potential behavior</strong> of the forms in space.
    </p>
  </div>

  {/* Standalone Video Section */}
  <div className="w-full max-w-3xl mx-auto mt-12">
    <h3 className="text-2xl font-bold mb-4 text-center">Simulation Video</h3>

    <div className="relative w-full aspect-video rounded-md shadow-lg overflow-hidden bg-center bg-cover"
         style={{ backgroundImage: "url('/images/growinghabitats/placeholder.webp')" }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
        preload="metadata"
      >
        <source src="/videos/GrowingHabitatsv/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>



             
            </div>
          </div>

          {/* Project Divider */}
          <div className="mt-8">
            <ProjectDivider />
          </div>

          {/* Active Building Modal */}
          {activeBuilding && (
            <div className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 overflow-auto">
              <div className="bg-white w-full max-w-6xl p-8 relative">
                <button
                  className="absolute top-4 right-4 text-3xl font-bold"
                  onClick={() => setActiveBuilding(null)}
                >
                  ×
                </button>

                <h2 className="text-3xl font-bold text-center mb-2">{activeBuilding.name}</h2>

                <div className="max-w-3xl mx-auto text-center mb-8 text-gray-700">
                  {activeBuilding.description}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {activeBuilding.images.slice(0, 8).map((img, i) => (
                    <div key={i} className="relative aspect-4/3 bg-gray-200 overflow-hidden shadow-md">
                      <Image
                        src={img}
                        alt={`${activeBuilding.name} ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintMatter3D;