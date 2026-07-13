"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { DURATION, GSAP_EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type FloatingProps = {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  rotate?: number;
};

/** Subtle perpetual float — luxurious, never bouncy. */
export function Floating({
  children,
  className,
  amplitude = 10,
  duration = DURATION.float,
  rotate = 0,
}: FloatingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -amplitude,
        rotation: rotate,
        duration,
        ease: GSAP_EASE.sine,
        yoyo: true,
        repeat: -1,
        force3D: true,
      });
    }, el);

    return () => ctx.revert();
  }, [amplitude, duration, rotate]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
