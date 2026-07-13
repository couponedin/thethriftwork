"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGsapContext } from "@/hooks/useGsapContext";
import { DURATION, GSAP_EASE } from "@/lib/animations";
import { navLinks, siteConfig } from "@/lib/data";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

registerGsapPlugins();

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo, lenis } = useLenis();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      // slight delay so panel can start closing before scroll
      requestAnimationFrame(() => scrollTo(href, { offset: -20 }));
    },
    [scrollTo],
  );

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("overflow-hidden");
    lenis?.stop();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
      lenis?.start();
    };
  }, [menuOpen, closeMenu, lenis]);

  useEffect(() => {
    const panel = panelRef.current;
    const links = linksRef.current?.querySelectorAll("[data-menu-link]");
    if (!panel) return;

    if (menuOpen) {
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(
        panel,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: GSAP_EASE.soft },
      );
      if (links?.length) {
        gsap.fromTo(
          links,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: GSAP_EASE.expo,
            delay: 0.08,
          },
        );
      }
      return;
    }

    gsap.to(panel, {
      autoAlpha: 0,
      duration: 0.28,
      ease: GSAP_EASE.soft,
      onComplete: () => {
        gsap.set(panel, { display: "none" });
      },
    });
  }, [menuOpen]);

  useGsapContext(
    headerRef,
    () => {
      const header = headerRef.current;
      const pill = pillRef.current;
      const menu = menuRef.current;
      const cta = header?.querySelector<HTMLElement>("[data-nav-cta]");
      if (!header || !pill) return;

      const items = header.querySelectorAll("[data-nav-item]");

      gsap.set(items, { y: -18, opacity: 0 });
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: DURATION.base,
        stagger: 0.08,
        ease: GSAP_EASE.expo,
        delay: 0.12,
        force3D: true,
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Explicit resting state so scrub always returns here
        gsap.set(header, { backgroundColor: "#000000" });
        gsap.set(pill, {
          maxWidth: 1600,
          borderRadius: 0,
          backgroundColor: "#000000",
          borderColor: "rgba(255,255,255,0)",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 32,
          paddingRight: 32,
          marginTop: 0,
          boxShadow: "none",
        });
        if (cta) {
          gsap.set(cta, {
            backgroundColor: "transparent",
            borderColor: "rgba(255,255,255,0)",
            borderRadius: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          });
        }
        if (menu) {
          gsap.set(menu, {
            width: 36,
            height: 36,
            borderRadius: 0,
            borderColor: "rgba(255,255,255,0)",
            backgroundColor: "transparent",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            start: "top -40",
            end: "top -140",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          header,
          {
            backgroundColor: "rgba(0,0,0,0)",
            ease: "none",
          },
          0,
        );

        tl.to(
          pill,
          {
            maxWidth: 780,
            borderRadius: 999,
            backgroundColor: "rgba(22, 22, 22, 0.92)",
            borderColor: "rgba(255,255,255,0.12)",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 22,
            paddingRight: 14,
            marginTop: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            ease: "none",
          },
          0,
        );

        if (cta) {
          tl.to(
            cta,
            {
              backgroundColor: "rgba(0,0,0,0.9)",
              borderColor: "rgba(255,255,255,0.85)",
              borderRadius: 999,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 8,
              paddingBottom: 8,
              ease: "none",
            },
            0,
          );
        }

        if (menu) {
          tl.to(
            menu,
            {
              width: 40,
              height: 40,
              borderRadius: 999,
              borderColor: "rgba(255,255,255,0.35)",
              backgroundColor: "transparent",
              ease: "none",
            },
            0,
          );
        }
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(header, { backgroundColor: "#000000" });
        gsap.set(pill, {
          maxWidth: 1600,
          borderRadius: 0,
          backgroundColor: "#000000",
          borderColor: "rgba(255,255,255,0)",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          boxShadow: "none",
        });
        if (menu) {
          gsap.set(menu, {
            width: 36,
            height: 36,
            borderRadius: 0,
            borderColor: "rgba(255,255,255,0)",
          });
        }

        gsap.to(header, {
          backgroundColor: "rgba(0,0,0,0)",
          ease: "none",
          scrollTrigger: {
            start: "top -24",
            end: "top -100",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(pill, {
          maxWidth: 420,
          borderRadius: 999,
          backgroundColor: "rgba(22, 22, 22, 0.92)",
          borderColor: "rgba(255,255,255,0.12)",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 10,
          marginTop: 8,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          ease: "none",
          scrollTrigger: {
            start: "top -24",
            end: "top -100",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        if (menu) {
          gsap.to(menu, {
            width: 36,
            height: 36,
            borderRadius: 999,
            borderColor: "rgba(255,255,255,0.35)",
            ease: "none",
            scrollTrigger: {
              start: "top -24",
              end: "top -100",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      return () => mm.revert();
    },
    [],
  );

  return (
    <>
      {/* Must match fixed nav height so hero never slides under it */}
      <div className="h-[72px] md:h-[80px] bg-black" aria-hidden="true" />

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[60] bg-black pointer-events-none"
      >
        <div className="flex justify-center px-0 pt-0">
          <div
            ref={pillRef}
            className="pointer-events-auto relative z-[70] w-full max-w-[1600px] flex items-center justify-between gap-4 rounded-none border border-transparent bg-black text-white px-5 md:px-8 py-5 md:py-5 will-change-[max-width,border-radius,background-color,padding,box-shadow,margin]"
            role="navigation"
            aria-label="Primary"
          >
          <Link
            href="/"
            data-nav-item
            className="font-display text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-none hover:opacity-80 transition-opacity duration-300 will-change-transform"
            onClick={closeMenu}
          >
            {siteConfig.name}
          </Link>

          <div className="flex items-center gap-3 md:gap-3.5">
            <MagneticButton
              data-nav-item
              data-nav-cta
              className="hidden sm:inline-flex items-center gap-2 font-sans text-[15px] md:text-[16px] font-medium tracking-[-0.01em] text-white border border-transparent rounded-none px-0 py-0 hover:opacity-80 transition-opacity duration-300 will-change-transform"
              onClick={() => goTo("#contact")}
            >
              Let&apos;s Talk
              <span aria-hidden="true" className="text-lg leading-none">
                ↗
              </span>
            </MagneticButton>

            <button
              ref={menuRef}
              type="button"
              data-nav-item
              className="relative flex flex-col items-center justify-center gap-[5px] w-9 h-9 border border-transparent rounded-none will-change-transform"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`block h-[1.5px] w-4 bg-white rounded-full transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-white rounded-full transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* Fullscreen menu with nav tabs */}
      <div
        ref={panelRef}
        id="site-menu"
        className="fixed inset-0 z-[55] hidden flex-col bg-black/95 text-white pointer-events-auto"
        aria-hidden={!menuOpen}
      >
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-28 pb-16">
          <nav ref={linksRef} className="flex flex-col gap-2 md:gap-3" aria-label="Site">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                type="button"
                data-menu-link
                className="group flex items-baseline gap-4 md:gap-6 text-left w-fit"
                onClick={() => goTo(link.href)}
              >
                <span className="font-sans text-[12px] md:text-sm text-white/40 tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] uppercase tracking-[0.02em] text-white group-hover:text-white/60 transition-colors duration-300">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-6 text-sm text-white/50">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-white transition-colors duration-300"
            >
              {siteConfig.email}
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-white hover:opacity-70 transition-opacity duration-300"
              onClick={() => goTo("#contact")}
            >
              Let&apos;s Talk
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
