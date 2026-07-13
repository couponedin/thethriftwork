"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Keeps ScrollTrigger in sync after mount.
 * Hero/Navbar own the visible page-load GSAP sequence.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return <>{children}</>;
}
