"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

export const getLenis = () => instance;

export default function SmoothScroll() {
  useEffect(() => {
    const enabled = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!enabled) return;

    let cancelled = false;
    let cleanup = () => {};

    import("lenis").then(({ default: LenisClass }) => {
      if (cancelled) return;
      const lenis = new LenisClass({ autoRaf: false, lerp: 0.12, anchors: true });
      instance = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        instance = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
