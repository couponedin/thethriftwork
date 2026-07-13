"use client";

import {
  useLayoutEffect,
  type DependencyList,
  type RefObject,
} from "react";
import { prefersReducedMotion } from "@/lib/animations";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

registerGsapPlugins();

/** Scoped GSAP context with reduced-motion guard. */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void | (() => void),
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const extra = setup();
      if (typeof extra === "function") cleanups.push(extra);
    }, el);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller owns deps
  }, deps);
}
