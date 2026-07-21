"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const heroVertexShader = /* glsl */ `
uniform float uTime;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPosition;

float hash(vec3 p){
    return fract(sin(dot(p, vec3(12.9898,78.233,54.53))) * 43758.5453);
}

float noise(vec3 p){
    vec3 i = floor(p);
    vec3 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float n = mix(
        mix(
            mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
            mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x),
            f.y
        ),
        mix(
            mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
            mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x),
            f.y
        ),
        f.z
    );

    return n;
}

void main(){

    vNormal = normalize(normalMatrix * normal);

    vec3 p = position;

    float n = noise(p * 2.5 + uTime * 0.2);

    p += normal * n * 0.08;

    vPosition = p;

    vec4 world = modelMatrix * vec4(p,1.0);

    vWorldPosition = world.xyz;

    gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const heroFragmentShader = /* glsl */ `
uniform float uTime;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPosition;

void main(){

    vec3 cameraDir = normalize(cameraPosition - vWorldPosition);

    float fresnel =
        pow(
            1.0 - max(dot(cameraDir,vNormal),0.0),
            3.0
        );

    vec3 base = vec3(
        0.08,
        0.15,
        0.35
    );

    vec3 glow = vec3(
        0.35,
        0.55,
        1.0
    );

    float pulse =
        sin(
            uTime * 2.0 +
            vPosition.y * 6.0
        ) * 0.5 + 0.5;

    vec3 color =
        mix(
            base,
            glow,
            fresnel
        );

    color += glow * pulse * 0.15;

    gl_FragColor = vec4(color,0.92);
}
`;

const HeroMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  heroVertexShader,
  heroFragmentShader,
);

extend({ HeroMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    heroMaterial: any;
  }
}

function HeroMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<any>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 64);

    const pos: any = geo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      vertex.fromBufferAttribute(pos, i);

      const n =
        Math.sin(vertex.x * 6) *
        Math.cos(vertex.y * 5) *
        Math.sin(vertex.z * 4);

      vertex.addScaledVector(vertex.clone().normalize(), n * 0.06);

      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!mesh.current || !material.current) return;

    material.current.uTime = clock.elapsedTime;

    mesh.current.rotation.y += 0.002;

    mesh.current.rotation.x = mouse.y * 0.3;

    mesh.current.rotation.z = mouse.x * 0.3;

    mesh.current.position.y = Math.sin(clock.elapsedTime) * 0.08;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <heroMaterial ref={material} />
    </mesh>
  );
}

export default function AuroraBackground() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* <color attach="b /> */}

      <ambientLight intensity={0.5} />

      <directionalLight position={[5, 5, 5]} intensity={2} />

      <directionalLight position={[-5, -3, -2]} intensity={0.6} />

      <HeroMesh />
    </Canvas>
  );
}
