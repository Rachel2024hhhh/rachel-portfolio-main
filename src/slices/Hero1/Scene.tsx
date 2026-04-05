"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import Shapes from "./Shapes";
import { geometries, defaultPositions, defaultScales, silverMaterial, amberMaterial } from "./Geometry";

const spreadFactor = 1.5;

const Scene: FC = () => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowHint(false);
    }, 4200);

    return () => window.clearTimeout(timeout);
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

      if (name === "donut") {
        mat = new THREE.MeshStandardMaterial({
          color: 0xe8ebf0,
          metalness: 1,
          roughness: 0.4,
        });
      } else if (name === "diamond") {
        mat = new THREE.MeshStandardMaterial({
          color: 0xfff1e6,
          metalness: 0.9,
          roughness: 0.18,
        });
      }

      mats[name] = mat;
    });

    return mats;
  }, []);

  const handleInteract = useCallback(() => {
    setShowHint(false);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        className={`pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm transition-all duration-500 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        Hover or Click Shapes
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 100 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[15, 20, 15]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-10, 5, 10]} intensity={0.8} color={0xa0c8ff} />
        <directionalLight position={[0, 10, -15]} intensity={0.6} />
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
            interactiveHint={showHint}
            onInteract={handleInteract}
          />
        ))}

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Scene;