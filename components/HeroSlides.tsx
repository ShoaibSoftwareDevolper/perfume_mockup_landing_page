"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Slide = { src: StaticImageData; position: string };

const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const HOLD = 6500;

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export default function HeroSlides({ slides }: { slides: Slide[] }) {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !root.current) return;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(root.current);
    const timer = window.setInterval(() => {
      if (visible && !document.hidden) setActive((index) => (index + 1) % (slides.length + 1));
    }, HOLD);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [enabled, slides.length]);

  if (!enabled) return null;

  return (
    <div ref={root} aria-hidden className="absolute inset-0">
      {slides.map((slide, index) => {
        const on = active === index + 1;
        return (
          <div
            key={slide.src.src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.45,0,0.2,1)] ${on ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="(min-width: 1500px) 1500px, 100vw"
              style={{ objectPosition: slide.position }}
              className={`object-cover transition-transform duration-[7000ms] ease-out ${on ? "scale-100" : "scale-[1.04]"}`}
            />
          </div>
        );
      })}
    </div>
  );
}
