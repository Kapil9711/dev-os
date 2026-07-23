"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import {
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
} from "react";
import * as THREE from "three";

interface FloatingGemProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  driftRange?: number;
  progressRef: MutableRefObject<number>;
}

function FloatingGem({
  position,
  color,
  scale = 1,
  speed = 1,
  driftRange = 2.5,
  progressRef,
}: FloatingGemProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15 * speed;
    mesh.current.rotation.y += delta * 0.22 * speed;

    const p = progressRef.current;
    mesh.current.position.y = position[1] + p * driftRange;
    mesh.current.position.x = position[0] + Math.sin(p * Math.PI) * 0.6;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function ProjectsScene({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement>;
}) {
  const progressRef = useSectionScrollProgress(sectionRef);

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} />
      <FloatingGem
        position={[-4, 2, -2]}
        color="#8b5cf6"
        scale={1.1}
        speed={0.8}
        driftRange={-3}
        progressRef={progressRef}
      />
      <FloatingGem
        position={[4.5, -1.5, -3]}
        color="#38bdf8"
        scale={1.4}
        speed={1.1}
        driftRange={2.5}
        progressRef={progressRef}
      />
      <FloatingGem
        position={[0, -3, -4]}
        color="#facc15"
        scale={0.9}
        speed={0.6}
        driftRange={-2}
        progressRef={progressRef}
      />
    </Canvas>
  );
}

export function useSectionScrollProgress(ref: RefObject<HTMLElement>) {
  const progress = useRef(0);

  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      progress.current = Math.min(1, Math.max(0, passed / total));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}
