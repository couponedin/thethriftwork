import SplitType from "split-type";
import { DURATION, GSAP_EASE } from "@/lib/animations";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

registerGsapPlugins();

type SplitOpts = {
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  scroll?: boolean;
  start?: string;
};

type FadeOpts = {
  y?: number;
  x?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
};

function prepareWordClip(split: SplitType) {
  split.words?.forEach((word) => {
    word.style.display = "inline-block";
    word.style.overflow = "hidden";
    word.style.verticalAlign = "top";
    // Extra padding so italic / tall glyphs aren't clipped
    word.style.paddingBottom = "0.14em";
    word.style.paddingRight = "0.28em";
    word.style.marginBottom = "-0.14em";
  });
}

/** Character reveal with optional ScrollTrigger. */
export function animateSplitChars(
  el: HTMLElement,
  {
    delay = 0,
    stagger = 0.022,
    duration = DURATION.base,
    ease = GSAP_EASE.luxury,
    scroll = true,
    start = "top 88%",
  }: SplitOpts = {},
): () => void {
  const split = new SplitType(el, { types: "chars,words", tagName: "span" });
  prepareWordClip(split);

  if (!split.chars?.length) {
    split.revert();
    return () => undefined;
  }

  const tween = gsap.fromTo(
    split.chars,
    { yPercent: 110, opacity: 0, force3D: true },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      force3D: true,
      ...(scroll
        ? {
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        : {}),
    },
  );

  return () => {
    tween.kill();
    split.revert();
  };
}

/** Fade/slide children or a single element into view on scroll. */
export function animateScrollFade(
  trigger: HTMLElement,
  targets: gsap.TweenTarget,
  {
    y = 36,
    x = 0,
    delay = 0,
    stagger = 0.1,
    duration = DURATION.base,
    ease = GSAP_EASE.luxury,
    start = "top 85%",
  }: FadeOpts = {},
) {
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y, x, force3D: true },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger,
      ease,
      force3D: true,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
      clearProps: "transform",
    },
  );
}
