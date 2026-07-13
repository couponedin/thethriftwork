"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";

registerGsapPlugins();

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tickerCallback);
      instance.destroy();
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement,
      options?: { offset?: number; duration?: number },
    ) => {
      const element =
        typeof target === "string" ? document.querySelector(target) : target;
      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element as HTMLElement, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.4,
        });
        return;
      }

      element.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
