
"use client";

import { FC, useEffect, useRef, useState } from "react";
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
  interactiveHint?: boolean;
  onInteract?: () => void;
}

type ShapeTone = {
  oscillator: OscillatorType;
  startFrequency: number;
  endFrequency: number;
  duration: number;
  volume: number;
};

const shapeTones: Record<string, ShapeTone> = {
  gem: {
    oscillator: "triangle",
    startFrequency: 880,
    endFrequency: 1240,
    duration: 0.18,
    volume: 0.06,
  },
  donut: {
    oscillator: "sine",
    startFrequency: 240,
    endFrequency: 180,
    duration: 0.16,
    volume: 0.08,
  },
  pillowSphere: {
    oscillator: "sine",
    startFrequency: 320,
    endFrequency: 220,
    duration: 0.22,
    volume: 0.07,
  },
  diamond: {
    oscillator: "square",
    startFrequency: 640,
    endFrequency: 960,
    duration: 0.12,
    volume: 0.045,
  },
};

let sharedAudioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const audioWindow = window as typeof window & {
    webkitAudioContext?: typeof AudioContext;
  };
  const AudioContextConstructor = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
  if (!AudioContextConstructor) {
    return null;
  }

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContextConstructor();
  }

  return sharedAudioContext;
};

const playShapeTone = async (shapeName: string) => {
  const tone = shapeTones[shapeName];
  const audioContext = getAudioContext();

  if (!tone || !audioContext) {
    return;
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();

  oscillator.type = tone.oscillator;
  oscillator.frequency.setValueAtTime(tone.startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(tone.endFrequency, now + tone.duration);

  filterNode.type = "lowpass";
  filterNode.frequency.setValueAtTime(2200, now);
  filterNode.Q.setValueAtTime(0.8, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(tone.volume, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);

  oscillator.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + tone.duration + 0.02);
};

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
  interactiveHint = false,
  onInteract,
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
  // Floating + breathing for all + rotation ONLY for gem
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (!reduceMotion) {
      // Subtle breathing scale (all shapes)
      const breath = Math.sin(t * 0.6 + position[0]) * 0.04;
      const hintPulse = interactiveHint ? (Math.sin(t * 1.8 + position[2] * 1.5) + 1) * 0.035 : 0;
      groupRef.current.scale.setScalar(1 + breath + hintPulse);

      // Gentle position floating / drifting (all shapes)
      groupRef.current.position.y =
        position[1] + Math.sin(t * 0.4 + position[0] * 2) * 0.35;
      groupRef.current.position.x =
        position[0] + Math.cos(t * 0.25 + position[1]) * 0.15;

      // Continuous rotation → only the gem
      if (name === "gem") {
        groupRef.current.rotation.x += delta * (0.7 + rate * 0.1);
        groupRef.current.rotation.y += delta * (0.55 + rate * 0.1);
        // optional tiny z twist: groupRef.current.rotation.z += delta * 0.3;
      }
      // No rotation for donut, pillowSphere, diamond
    }
  });

  const handlePointerDown = async (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onInteract?.();

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

    await playShapeTone(name).catch(() => {});
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

    const mesh = meshRef.current;
    const edges = new EdgesGeometry(mesh.geometry);
    const line = new LineSegments(edges, gemEdgesMaterial);
    mesh.add(line);
    edgeRef.current = line;

    return () => {
      if (edgeRef.current) {
        mesh.remove(edgeRef.current);
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