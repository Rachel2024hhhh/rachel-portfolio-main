"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import Shapes from "./Shapes";
import { geometries, defaultPositions, defaultScales, silverMaterial, amberMaterial } from "./Geometry";

const spreadFactor = 1.5;

const soundMap: Record<string, string> = {
  gem: "/sounds/gem.mp3",
  donut: "/sounds/donut.mp3",
  diamond: "/sounds/diamond.mp3",
  pillowSphere: "/sounds/pillowSphere.mp3",
};

const Scene: FC = () => {
  const [textures, setTextures] = useState<{
    donut: THREE.Texture | null;
    diamond: THREE.Texture | null;       // ← changed: now full color texture
  }>({ donut: null, diamond: null });

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    // Donut texture
    loader.load("/images.png", (tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1, 1);
      setTextures((prev) => ({ ...prev, donut: tex }));
    });

    // Diamond color texture (replace with your actual path)
    loader.load("/.png", (tex) => {   // ← your local diamond texture path
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;        // or ClampToEdgeWrapping — depends on your texture
      // tex.repeat.set(2, 2);                              // uncomment & adjust if texture needs tiling
      setTextures((prev) => ({ ...prev, diamond: tex }));
    });
  }, []);

  const materials = useMemo(() => {
    const mats: Record<string, THREE.Material> = {};

    Object.keys(geometries).forEach((name) => {
      if (name === "gem") {
        mats[name] = amberMaterial;
        return;
      }

      // Default: clone silver base
      let mat = silverMaterial.clone();

      if (name === "donut" && textures.donut) {
        mat = new THREE.MeshStandardMaterial({
          color: 0xe8ebf0,
          metalness: 1,
          roughness: 0.4,
          map: textures.donut,
          // bumpMap: textures.donut,     // ← optional: keep if you still want subtle bump on donut
          // bumpScale: 0.03,
        });
      } 
      else if (name === "diamond" && textures.diamond) {
        mat = new THREE.MeshStandardMaterial({
          color: 0xffffff,             // white base → lets texture colors show fully
          metalness: 0.95,             // still very metallic / gem-like
          roughness: 0.15,             // quite shiny (adjust lower = more mirror-like)
          map: textures.diamond,       // ← your color texture here
          // No bumpMap / normalMap anymore
        });
      }
      // pillowSphere → plain silver (add texture here if you want later)

      mats[name] = mat;
    });

    return mats;
  }, [textures.donut, textures.diamond]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 100 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[15, 20, 15]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-10, 5, 10]} intensity={0.8} color={0xa0c8ff} />
      <directionalLight position={[0, 10, -15]} intensity={0.6} />
      {/* You can keep or reduce these warm point lights depending on how the diamond texture looks */}
      <pointLight position={[0, 0, 1.5]} intensity={18} distance={18} decay={2} color={0xff5500} />
      <pointLight position={[0.8, -0.3, 1.2]} intensity={15} distance={16} decay={2} color={0xff6600} />
      <pointLight position={[-0.6, 0.4, 1]} intensity={12} distance={16} decay={2} color={0xff7700} />
      <pointLight position={[0, 0, 1]} intensity={8} distance={20} decay={2} color={0xff7043} />
      <pointLight position={[0, -4, 0]} intensity={15} distance={25} decay={2} color={0xff6600} />

      <Environment preset="studio" />
      <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={40} blur={1} far={9} />

      {Object.keys(geometries).map((name) => (
        <Shapes
          key={name}
          name={name}
          geometry={geometries[name as keyof typeof geometries]}
          position={defaultPositions[name].map((v) => v * spreadFactor) as [number, number, number]}
          scale={defaultScales[name]}
          material={materials[name]}
          soundURL={soundMap[name]}
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default Scene;