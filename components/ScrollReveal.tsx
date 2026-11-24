"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = "power2.out";
const clear = "opacity,transform";

export default function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const once = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });

        gsap.utils.toArray<HTMLElement>("[data-reveal='heading']").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 16, duration: 0.6, ease, clearProps: clear, scrollTrigger: once(el) });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='grid']").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-reveal-item]"), {
            opacity: 0,
            y: 14,
            duration: 0.7,
            stagger: 0.08,
            ease,
            clearProps: clear,
            scrollTrigger: once(el),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='panel']").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 16, duration: 0.8, ease, clearProps: clear, scrollTrigger: once(el) });
          const img = el.querySelector("[data-reveal-img]");
          if (desktop && img) {
            gsap.from(img, { scale: 1.025, duration: 1.4, ease, clearProps: "transform", scrollTrigger: once(el) });
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-swap]").forEach((el) => {
          const trigger = desktop ? el.closest("section") ?? el : el;
          const swapEase = "power3.inOut";
          gsap
            .timeline({
              defaults: { duration: 1.2, ease: swapEase },
              scrollTrigger: {
                trigger,
                start: desktop ? "top 35%" : "top 55%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(el.querySelector("[data-swap-next]"), { y: 0, yPercent: 100 }, { yPercent: 0 }, 0)
            .fromTo(el.querySelector("[data-swap-base]"), { yPercent: 0 }, { yPercent: -18 }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='journal']").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el, "top 85%") });
          tl.from(el, { opacity: 0, duration: 0.6, ease, clearProps: "opacity" }).from(
            el.querySelectorAll("[data-reveal-item]"),
            { opacity: 0, y: 12, duration: 0.7, stagger: 0.08, ease, clearProps: clear },
            "-=0.3",
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='footer']").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 8, duration: 0.8, ease, clearProps: clear, scrollTrigger: once(el, "top 95%") });
        });
      },
    );
  });

  return null;
}
