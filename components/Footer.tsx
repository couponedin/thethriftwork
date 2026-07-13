"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { footerLegalLinks, siteConfig, socialLinks } from "@/lib/data";
import { registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade } from "@/lib/motion";

registerGsapPlugins();

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGsapContext(
    footerRef,
    () => {
      const el = footerRef.current;
      if (!el) return;
      animateScrollFade(el, el.children, {
        y: 36,
        stagger: 0.12,
        start: "top 90%",
      });
    },
    [],
  );

  return (
    <footer
      ref={footerRef}
      className="bg-surface-container-lowest w-full relative border-t border-white/[0.08] flex flex-col gap-16 md:gap-24 lg:gap-section-gap px-margin-safe pt-16 md:pt-24 lg:pt-section-gap pb-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-14">
        <div
          className="font-display-xl text-[clamp(2.5rem,10vw,7.5rem)] font-black tracking-tighter text-on-surface opacity-[0.07] leading-none overflow-hidden max-w-full"
          aria-hidden="true"
        >
          {siteConfig.name}
        </div>
        <nav className="flex flex-wrap gap-x-stack-lg gap-y-4" aria-label="Social">
          {socialLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <Link
                key={link.label}
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-body-md text-body-md text-muted-text hover:text-on-surface hover:tracking-[0.08em] transition-[color,letter-spacing] duration-500 ease-[var(--ease-luxury)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/[0.06] pt-10 gap-6">
        <p className="font-body-md text-body-md text-muted-text text-center md:text-left">
          ©{new Date().getFullYear()} {siteConfig.name}. AI Driven Marketing, Web & Design.
        </p>
        <nav className="flex gap-10" aria-label="Legal">
          {footerLegalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body-md text-body-md text-muted-text hover:text-on-surface transition-colors duration-500 ease-[var(--ease-luxury)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
