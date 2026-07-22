"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TimelineBeam({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const smoothed = useRef(0);

  const count = 160;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    // ease toward real scroll progress rather than snapping — reads as
    // "flowing" instead of jittering every frame
    smoothed.current +=
      (progressRef.current - smoothed.current) * Math.min(1, delta * 3);
    const y = 4 - smoothed.current * 8; // top -> bottom of the beam

    if (markerRef.current) markerRef.current.position.y = y;
    if (glowRef.current) {
      glowRef.current.position.y = y;
      glowRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.12,
      );
    }

    // particles drift upward and wrap — subtle "energy flow" along the line
    const posAttr = pointsRef.current?.geometry.attributes.position;
    if (posAttr) {
      const arr: any = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += delta * 0.35;
        if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#6c63ff"
          size={0.035}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* traveling marker = current scroll progress through the timeline */}
      <mesh ref={glowRef} position={[0, 4, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#9b7eff" transparent opacity={0.25} />
      </mesh>
      <mesh ref={markerRef} position={[0, 4, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#4c8dff" />
      </mesh>
    </>
  );
}

export default function JourneyScene({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 40 }}
    >
      <fog attach="fog" args={["#070b14", 5, 11]} />
      <TimelineBeam progressRef={progressRef} />
    </Canvas>
  );
}
