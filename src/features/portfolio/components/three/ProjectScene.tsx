"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectSceneProps {
  /**
   * Element the scroll-linked rotation triggers off of. This component
   * renders inside ProjectsBackground's `absolute inset-0` wrapper,
   * which has no scroll-meaningful size of its own -- the actual
   * section is what has real height, so the trigger comes from the
   * caller instead of being measured off a ref local to this file.
   *
   * Typed `RefObject<HTMLElement | null>`, not `RefObject<HTMLElement>`:
   * that's what `useRef<HTMLElement>(null)` actually produces, and was
   * the real source of the mismatch that needed `as any` at the call
   * site -- not a missing prop.
   */
  sectionRef: RefObject<HTMLElement | null>;
  /** Which project card is active. Optional -- renders with a static
   *  default color if the caller hasn't wired this through yet. */
  activeIndex?: number;
  accents?: string[];
}

const DEFAULT_ACCENTS = ["#6c63ff", "#4c8dff", "#9b7eff"];

export default function ProjectScene({
  sectionRef,
  activeIndex = 0,
  accents = DEFAULT_ACCENTS,
}: ProjectSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    function size() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    const geo = new THREE.TorusKnotGeometry(1.8, 0.5, 160, 20);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accents[0] ?? DEFAULT_ACCENTS[0]),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    materialRef.current = mat;
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    size();
    window.addEventListener("resize", size);

    let rafId = 0;
    function animate() {
      if (!reduceMotion) {
        mesh.rotation.y += 0.0018;
        mesh.rotation.x += 0.0008;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Scoped to `section` (the caller's element), not a local ref --
    // this is the whole reason sectionRef exists as a prop.
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.to(mesh.rotation, {
          y: "+=1.4",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", size);
      ctx.revert();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef]);

  // Re-run only when the active project changes -- tweens the existing
  // material's color rather than rebuilding the scene.
  useEffect(() => {
    const mat = materialRef.current;
    const nextColor = accents[activeIndex];
    if (!mat || !nextColor) return;
    const target = new THREE.Color(nextColor);
    gsap.to(mat.color, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [activeIndex, accents]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
