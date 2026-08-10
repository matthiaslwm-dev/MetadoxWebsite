"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Grid spacing in world units. */
const SEPARATION = 150;
/** Points along X and Z. */
const AMOUNT_X = 40;
const AMOUNT_Y = 60;
/** Vertical displacement of the travelling wave. */
const AMPLITUDE = 50;
/** Phase advanced per frame. */
const SPEED = 0.05;
/** Per-point colour, linear RGB. Matches the reference field exactly. */
const POINT_COLOR = [0.15, 0.45, 0.65] as const;

/**
 * Ceiling on the backing-store scale.
 *
 * The field covers the whole hero, so its cost is almost entirely fill rate.
 * Phones routinely report a device pixel ratio of 3, which asks the GPU for
 * nine times the pixels of a CSS-resolution canvas every frame, on the class
 * of hardware least able to give it. Points are soft round dots with no fine
 * detail to lose, so 2x is indistinguishable here and roughly halves the work.
 */
const MAX_PIXEL_RATIO = 2;

/**
 * Animated point-grid wave rendered with WebGL.
 *
 * `three` is imported inside the effect so it stays out of the initial client
 * bundle — the field is decorative and can appear a beat after the copy.
 */
export function ParticleField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set by the async setup below; the cleanup closure reads whatever has been
    // assigned by the time it runs, so an unmount mid-import still tears down.
    let dispose: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

      // Sized to the viewport, not the container, so the camera framing matches
      // the reference exactly. The container clips the overflow.
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      camera.position.set(0, 600, 1400);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff, 0);
      container.appendChild(renderer.domElement);

      const positions: number[] = [];
      const colors: number[] = [];
      const geometry = new THREE.BufferGeometry();

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          positions.push(
            ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2,
            0,
            iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2,
          );
          colors.push(...POINT_COLOR);
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let count = 0;
      let frameId = 0;

      const drawFrame = () => {
        const attribute = geometry.attributes.position;
        const array = attribute.array as Float32Array;
        let i = 0;
        for (let ix = 0; ix < AMOUNT_X; ix++) {
          for (let iy = 0; iy < AMOUNT_Y; iy++) {
            array[i * 3 + 1] =
              Math.sin((ix + count) * 0.3) * AMPLITUDE +
              Math.sin((iy + count) * 0.5) * AMPLITUDE;
            i++;
          }
        }
        attribute.needsUpdate = true;
        renderer.render(scene, camera);
      };

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        drawFrame();
        count += SPEED;
      };

      // Visitors who ask for reduced motion get a single static frame of the
      // same field rather than a blank hero.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) drawFrame();
      else animate();

      /*
        The field lives in a hero, so it is off screen for all but the first
        screenful of the page — yet `requestAnimationFrame` keeps firing for as
        long as the tab is foregrounded. On a phone that is a full-screen WebGL
        redraw every frame, for the entire time someone reads the rest of the
        page, and it shows up as heat and battery rather than as anything on
        screen. Run only while the hero is actually visible.
      */
      const visibility = new IntersectionObserver(
        ([entry]) => {
          if (reducedMotion) return;
          if (entry.isIntersecting) {
            if (!frameId) animate();
          } else {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        },
        { threshold: 0 },
      );
      visibility.observe(container);

      /*
        Width-keyed, not size-keyed. On mobile the address bar retracts and
        expands as you scroll, and each of those fires `resize` with a new
        height — reallocating the drawing buffer mid-scroll, which is both the
        most expensive thing this component can do and visible as a stutter.
        Height alone never changes the framing enough to matter here; an
        orientation change moves the width too, so real reframes still land.
      */
      let lastWidth = window.innerWidth;

      const handleResize = () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (reducedMotion) drawFrame();
      };
      window.addEventListener("resize", handleResize);

      dispose = () => {
        cancelAnimationFrame(frameId);
        visibility.disconnect();
        window.removeEventListener("resize", handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        // No negative z-index: the page wrapper paints an opaque background and
        // doesn't create a stacking context, so a negative-z canvas would be
        // painted underneath it and never seen.
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    />
  );
}
