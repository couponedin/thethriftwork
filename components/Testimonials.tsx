"use client";

import Image from "next/image";
import { useRef } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { useGsapContext } from "@/hooks/useGsapContext";
import { DURATION, GSAP_EASE } from "@/lib/animations";
import { trustBackground, trustLogos } from "@/lib/data";
import { registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade } from "@/lib/motion";

registerGsapPlugins();

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const heading = headingRef.current;
      const content = contentRef.current;
      if (!heading) return;

      // Fade instead of char-split — italic "Businesses" gets clipped by overflow:hidden
      animateScrollFade(heading, heading, {
        y: 36,
        stagger: 0,
        duration: DURATION.slow,
        ease: GSAP_EASE.expo,
        start: "top 80%",
      });

      if (content) {
        const rest = Array.from(content.children).slice(1);
        animateScrollFade(content, rest, {
          y: 28,
          stagger: 0.14,
          delay: 0.2,
          start: "top 75%",
        });
      }
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-[819px] flex items-center justify-center overflow-hidden section-fade-edge"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 z-0">
        <Parallax speed={20} scale={1.18}>
          <Image
            src={trustBackground.src}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            className="object-cover object-center grayscale opacity-[0.32]"
          />
        </Parallax>
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/55 to-[#050505]"
          aria-hidden="true"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 text-center px-margin-safe max-w-4xl mx-auto"
      >
        <h2
          ref={headingRef}
          id="testimonials-heading"
          className="font-display-lg text-[6vw] leading-[1.08] uppercase mb-9 tracking-tight"
        >
          <span className="block">Trusted by</span>
          <span className="block whitespace-nowrap">
            <span className="text-primary italic font-semibold">Businesses</span>{" "}
            Like You.
          </span>
        </h2>
        <p className="font-body-lg text-body-lg mb-14 text-on-surface-variant/90 max-w-2xl mx-auto text-balance">
          Join the ranks of market leaders who have transformed their digital
          presence with The Thrift Work.
        </p>
        <ul className="flex justify-center gap-10 md:gap-14 items-center list-none p-0 m-0 flex-wrap">
          {trustLogos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={32}
                className="h-7 md:h-8 w-auto opacity-40 hover:opacity-90 transition-opacity duration-500 ease-[var(--ease-luxury)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
