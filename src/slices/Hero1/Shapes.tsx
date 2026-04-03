
"use client";

import { FC, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { materials, defaultScales } from "./Geometry";

interface ShapeProps {
  geometry: THREE.BufferGeometry;
  name: string;
  position?: [number, number, number];
  rate?: number;
  scale?: number;
  material?: THREE.Material;
  soundURL?: string;
}

const audioMap: Record<string, HTMLAudioElement> = {};

const gemEdgesMaterial = new LineBasicMaterial({
  color: 0xff5500,
  linewidth: 1.5,
  transparent: true,
  opacity: 0.8,
});

const Shapes: FC<ShapeProps> = ({
  geometry,
  name,
  position = [0, 0, 0],
  rate = 0.3, // base speed — only used for gem rotation
  scale: propScale,
  material: propMaterial,
  soundURL,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const edgeRef = useRef<LineSegments | null>(null);

  const appliedScale = propScale ?? defaultScales[name] ?? 1;
  const reduceMotion = useReducedMotion();

  const [currentMaterial, setCurrentMaterial] = useState<THREE.Material>(
    propMaterial ??
      (name === "gem"
        ? new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0xff8855),
            metalness: 0.15,
            roughness: 0.12,
            transmission: 0.9,
            thickness: 0.8,
            ior: 2.4,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            envMapIntensity: 1.2,
            transparent: true,
            opacity: 0.98,
          })
        : materials[0].clone())
  );

  const [isPlaying, setIsPlaying] = useState(false);

  // Floating + breathing for all + rotation ONLY for gem
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (!reduceMotion) {
      // Subtle breathing scale (all shapes)
      const breath = Math.sin(t * 0.6 + position[0]) * 0.04;
      groupRef.current.scale.setScalar(1 + breath);

      // Gentle position floating / drifting (all shapes)
      groupRef.current.position.y =
        position[1] + Math.sin(t * 0.4 + position[0] * 2) * 0.35;
      groupRef.current.position.x =
        position[0] + Math.cos(t * 0.25 + position[1]) * 0.15;

      // Continuous rotation → only the gem
      if (name === "gem") {
        groupRef.current.rotation.x += delta * 0.7;
        groupRef.current.rotation.y += delta * 0.55;
        // optional tiny z twist: groupRef.current.rotation.z += delta * 0.3;
      }
      // No rotation for donut, pillowSphere, diamond
    }
  });

  // Audio setup + cleanup
  useEffect(() => {
    if (!soundURL) return;
    if (!audioMap[name]) {
      const audio = new Audio(soundURL);
      audio.volume = 0.7;
      audioMap[name] = audio;
      audio.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audioMap[name]) {
        audioMap[name].pause();
        audioMap[name].currentTime = 0;
      }
    };
  }, [name, soundURL]);

  // Click: quick random spin + sound toggle
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: meshRef.current.rotation.x + THREE.MathUtils.randFloat(0.8, 2.2),
        y: meshRef.current.rotation.y + THREE.MathUtils.randFloat(0.8, 2.2),
        z: meshRef.current.rotation.z + THREE.MathUtils.randFloat(0.4, 1.2),
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (name !== "gem" && !propMaterial) {
      const newMat = materials[Math.floor(Math.random() * materials.length)].clone();
      setCurrentMaterial(newMat);
    }

    if (soundURL && audioMap[name]) {
      const audio = audioMap[name];
      if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Hover: slight scale + cursor change
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
    if (groupRef.current && !reduceMotion) {
      gsap.to(groupRef.current.scale, {
        x: appliedScale * 1.08,
        y: appliedScale * 1.08,
        z: appliedScale * 1.08,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: appliedScale,
        y: appliedScale,
        z: appliedScale,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  // Add edges to gem
  useEffect(() => {
    if (name !== "gem" || !meshRef.current) return;

    const edges = new EdgesGeometry(meshRef.current.geometry);
    const line = new LineSegments(edges, gemEdgesMaterial);
    meshRef.current.add(line);
    edgeRef.current = line;

    return () => {
      if (edgeRef.current) {
        meshRef.current?.remove(edgeRef.current);
        edgeRef.current.geometry.dispose();
      }
    };
  }, [name]);

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={appliedScale}
        material={currentMaterial}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      />
    </group>
  );
};

export default Shapes;