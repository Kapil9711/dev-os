"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Points,
  PointMaterial,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingGem() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.x += delta * 0.08;
    mesh.rotation.y += delta * 0.12;

    // subtle parallax toward the cursor, lerped so it never feels jumpy
    mesh.rotation.x += (pointer.y * 0.15 - mesh.rotation.x) * 0.02;
    mesh.rotation.y += (pointer.x * 0.15 - mesh.rotation.y) * 0.02;

    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]} position={[0.6, 0, 0]}>
      <MeshDistortMaterial
        color="#6c63ff"
        distort={0.4}
        speed={1.6}
        roughness={0.15}
        metalness={0.6}
        emissive="#4c8dff"
        emissiveIntensity={0.25}
      />
    </Sphere>
  );
}

function Particles({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>();

  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    positions.current = arr;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions.current}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#9b7eff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#4c8dff" />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#9b7eff" />
        <fog attach="fog" args={["#070b14", 4, 10]} />
        <FloatingGem />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
