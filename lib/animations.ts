/** Luxurious cubic-bezier easings — no bounce, no overshoot. */
export const EASE = {
  luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
  soft: "cubic-bezier(0.16, 1, 0.3, 1)",
  magnetic: "cubic-bezier(0.23, 1, 0.32, 1)",
  reveal: "cubic-bezier(0.77, 0, 0.175, 1)",
} as const;

/** GSAP-friendly equivalents of the cubic curves above */
export const GSAP_EASE = {
  luxury: "power3.out",
  soft: "power2.out",
  expo: "expo.out",
  sine: "sine.inOut",
  none: "none",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.9,
  slow: 1.25,
  float: 3.2,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when a mouse/trackpad is available (works on hybrid Windows devices). */
export function canUseCustomCursor(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  // Prefer fine pointer; fall back to hover capability for hybrid devices
  return (
    window.matchMedia("(pointer: fine)").matches ||
    window.matchMedia("(hover: hover)").matches
  );
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(pointer: fine)").matches
  );
}
