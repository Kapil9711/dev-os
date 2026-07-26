"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wireframe "identity orb" for the About section background: a core +
 * outer shell + particle swarm, drifting continuously with a slow extra
 * turn tied to scroll progress through the section, plus a light pointer
 * parallax tilt on desktop.
 *
 * Changes from the previous version:
 *  - Core/shell now render as true polyhedron edges (THREE.EdgesGeometry +
 *    LineSegments) instead of MeshBasicMaterial({ wireframe: true }), which
 *    also draws the internal triangulation diagonals -- edges-only reads as
 *    a clean geometric form instead of a mesh of triangles.
 *  - Colors are read from the page's CSS custom properties at runtime
 *    (--accent / --accent-2 / --accent-3) with the old hex values kept only
 *    as fallbacks, so the scene stays in sync if the theme changes instead
 *    of carrying its own hardcoded palette.
 *  - Particles use additive blending + per-particle color variance between
 *    the two accent tones, and depthWrite is off, for a softer glow instead
 *    of flat opaque dots.
 *  - A ResizeObserver on the wrapper replaces the window "resize" listener,
 *    so the canvas stays correctly sized if its container changes (e.g. a
 *    sidebar toggling) even when the window itself doesn't.
 *  - An IntersectionObserver stops the render loop while the section is
 *    off-screen and restarts it when it scrolls back into view, instead of
 *    rendering every frame regardless of visibility.
 *  - A subtle pointer-parallax tilt is layered on an outer group (separate
 *    from the continuously auto-rotating inner group), skipped entirely on
 *    touch input and under prefers-reduced-motion.
 *  - Cleanup remains gsap.context() + ctx.revert() for the ScrollTrigger
 *    tween (killing alone doesn't undo already-applied values, which is
 *    what causes the "stuck after remount" bug under React Strict Mode),
 *    with the Three.js side fully disposed by hand since it isn't a GSAP
 *    tween: geometries, materials, the renderer, and every observer/listener.
 */
export default function AboutScene() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ---- theme-aware color pickup, with the old values as fallbacks ----
    function themeColor(varName: string, fallbackHex: number) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      try {
        return raw ? new THREE.Color(raw) : new THREE.Color(fallbackHex);
      } catch {
        return new THREE.Color(fallbackHex);
      }
    }
    const accent = themeColor("--accent", 0x6c63ff);
    const accent2 = themeColor("--accent-2", 0x4c8dff);
    const accent3 = themeColor("--accent-3", 0x9b7eff);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight || 1,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    function size() {
      const w = canvas!.clientWidth || 1;
      const h = canvas!.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    // outerTilt handles pointer parallax; group handles continuous auto-spin.
    // Keeping them separate means the tilt lerp never fights the spin increment.
    const outerTilt = new THREE.Group();
    const group = new THREE.Group();
    outerTilt.add(group);
    scene.add(outerTilt);

    // ---- core: clean wireframe edges, no triangulation diagonals ----
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.LineSegments(coreEdges, coreMat);
    group.add(core);

    // ---- outer shell: larger, sparser, dimmer ----
    const shellGeo = new THREE.IcosahedronGeometry(2.75, 0);
    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({
      color: accent2,
      transparent: true,
      opacity: 0.22,
    });
    const shell = new THREE.LineSegments(shellEdges, shellMat);
    group.add(shell);

    // ---- particle swarm: additive glow, color variance between accents ----
    const count = 260;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const tmpColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      tmpColor.copy(accent3).lerp(accent2, Math.random());
      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    size();

    // ---- resize: observe the wrapper, not just the window ----
    const resizeObserver = new ResizeObserver(() => size());
    resizeObserver.observe(wrap);

    // ---- pointer parallax target (desktop, motion allowed, only while visible) ----
    let targetTiltX = 0;
    let targetTiltY = 0;
    const TILT_RANGE = 0.14;
    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * TILT_RANGE;
      targetTiltX = -ny * TILT_RANGE;
    }
    const pointerEnabled = finePointer && !reduceMotion;
    if (pointerEnabled) {
      wrap.addEventListener("pointermove", onPointerMove);
    }

    // ---- render loop, paused while off-screen ----
    let rafId = 0;
    let running = false;
    function animate() {
      if (!reduceMotion) {
        group.rotation.y += 0.0016;
        group.rotation.x += 0.0006;
        particles.rotation.y -= 0.0009;
      }
      if (pointerEnabled) {
        outerTilt.rotation.x += (targetTiltX - outerTilt.rotation.x) * 0.05;
        outerTilt.rotation.y += (targetTiltY - outerTilt.rotation.y) * 0.05;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    function start() {
      if (running) return;
      running = true;
      animate();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]: any) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(wrap);

    // ---- context loss: pause cleanly, let the browser attempt restore ----
    function onContextLost(e: Event) {
      e.preventDefault();
      stop();
    }
    function onContextRestored() {
      size();
      start();
    }
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.to(group.rotation, {
          y: "+=1.1",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        // slow ambient breathing scale on the core + shell, independent of
        // the tilt/spin transforms so it never fights them
        gsap.to(group.scale, {
          x: 1.045,
          y: 1.045,
          z: 1.045,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, wrap);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (pointerEnabled)
        wrap.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      ctx.revert();
      renderer.dispose();
      coreGeo.dispose();
      coreEdges.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellEdges.dispose();
      shellMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
