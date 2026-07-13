"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { GSAP_EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

registerGsapPlugins();

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
};

/**
 * Wraps media for GPU-accelerated scroll parallax.
 * Parent should have overflow-hidden and position:relative.
 */
export function Parallax({
  children,
  className,
  speed = 18,
  scale = 1.18,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const parent = el.parentElement;
    if (!parent) return;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        scale,
        force3D: true,
        transformOrigin: "center center",
      });

      gsap.fromTo(
        el,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: GSAP_EASE.none,
          force3D: true,
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 will-change-transform [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
        className,
      )}
    >
      {children}
    </div>
  );
}
