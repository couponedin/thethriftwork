"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGsapContext } from "@/hooks/useGsapContext";
import { DURATION, GSAP_EASE, prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/lib/data";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { heroContent } from "@/lib/hero";

registerGsapPlugins();

function HeroVideo({
  src,
  label,
  startOffset = 0,
  className,
}: {
  src: string;
  label: string;
  /** Seconds into the video to start playback (keeps the two frames out of sync). */
  startOffset?: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const startPlayback = async () => {
      try {
        // Wait until we can seek
        if (video.readyState < 1) {
          await new Promise<void>((resolve) => {
            const onMeta = () => {
              video.removeEventListener("loadedmetadata", onMeta);
              resolve();
            };
            video.addEventListener("loadedmetadata", onMeta);
          });
        }
        if (cancelled) return;

        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        const offset =
          duration > 0 ? Math.min(startOffset, Math.max(duration - 0.15, 0)) : 0;
        video.currentTime = offset;
        await video.play();
      } catch {
        // Autoplay can fail on some browsers; ignore silently
      }
    };

    void startPlayback();

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [startOffset, src]);

  return (
    <video
      ref={videoRef}
      className={className ?? "absolute inset-0 h-full w-full object-cover"}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
    />
  );
}

function HeroTag({
  label,
  color,
  rotate,
  className,
}: {
  label: string;
  color: string;
  rotate: number;
  className?: string;
}) {
  return (
    <span
      data-tag
      data-rotate={rotate}
      className={`absolute z-30 px-2 py-0.5 md:px-3.5 md:py-1.5 rounded-md text-[8px] md:text-[12px] font-bold tracking-[0.08em] uppercase text-black shadow-sm will-change-transform pointer-events-none ${className ?? ""}`}
      style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const craftingRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const mediaTopRef = useRef<HTMLDivElement>(null);
  const mediaBottomRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useGsapContext(
    sectionRef,
    () => {
      const stage = stageRef.current;
      const card = cardRef.current;
      const motion = motionRef.current;
      if (!stage || !card || !motion) return;

      const words = [
        craftingRef.current,
        digitalRef.current,
        experiencesRef.current,
      ].filter(Boolean) as HTMLElement[];
      const media = [mediaTopRef.current, mediaBottomRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      const tags = Array.from(stage.querySelectorAll<HTMLElement>("[data-tag]"));
      const footerItems = footerRef.current
        ? Array.from(footerRef.current.children)
        : [];

      gsap.set(card, {
        y: 48,
        scale: 0.96,
        opacity: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(words, { y: 72, opacity: 0 });
      gsap.set(media, {
        y: 48,
        scale: 0.88,
        opacity: 0,
        clipPath: "inset(42% 8% 42% 8% round 24px)",
      });
      gsap.set(tags, { scale: 0.5, opacity: 0 });
      tags.forEach((tag) => {
        gsap.set(tag, { rotation: Number(tag.dataset.rotate) || 0 });
      });
      gsap.set(footerItems, { y: 28, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.expo },
        delay: 0.08,
      });

      tl.to(card, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: DURATION.slow,
        force3D: true,
      })
        .to(
          words,
          {
            y: 0,
            opacity: 1,
            duration: DURATION.slow,
            stagger: 0.1,
            force3D: true,
          },
          "-=0.75",
        )
        .to(
          media,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.05,
            stagger: 0.22,
            ease: GSAP_EASE.luxury,
            force3D: true,
          },
          "-=0.85",
        )
        .to(
          tags,
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: GSAP_EASE.luxury,
            force3D: true,
          },
          "-=0.55",
        )
        .to(
          footerItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: GSAP_EASE.luxury,
            force3D: true,
          },
          "-=0.35",
        );

      media.forEach((el, i) => {
        const inner = el.querySelector("[data-float]");
        if (!inner) return;
        gsap.to(inner, {
          y: i === 0 ? -6 : -8,
          duration: 3.2 + i * 0.55,
          ease: GSAP_EASE.sine,
          yoyo: true,
          repeat: -1,
          force3D: true,
          delay: 1.35 + i * 0.35,
        });
      });

      tags.forEach((el, i) => {
        const base = Number(el.dataset.rotate) || 0;
        gsap.to(el, {
          y: i % 2 === 0 ? -4 : 4,
          rotation: base + (i % 2 === 0 ? -1.2 : 1.2),
          duration: 2.6 + i * 0.25,
          ease: GSAP_EASE.sine,
          yoyo: true,
          repeat: -1,
          force3D: true,
          delay: 1.4,
        });
      });

      if (prefersReducedMotion()) return;

      // Separate wrapper from entrance card so scrub + intro never fight transforms.
      // Lagged scrub smooths Lenis + sticky overlay (scrub:true reads jerky).
      const section = sectionRef.current;

      gsap.set(motion, { force3D: true, transformOrigin: "50% 0%" });

      gsap.fromTo(
        motion,
        { scale: 1, y: 0 },
        {
          scale: 0.96,
          y: -18,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.75)}`,
            scrub: 0.9,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        },
      );

      const onMove = (e: MouseEvent) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(mediaTopRef.current, {
          x: x * 12,
          y: y * 8 - 6,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(mediaBottomRef.current, {
          x: x * -14,
          y: y * 10 - 8,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
        tags.forEach((tag, i) => {
          gsap.to(tag, {
            x: x * (6 + i * 5) * (i % 2 === 0 ? 1 : -1),
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      stage.addEventListener("mousemove", onMove);
      return () => stage.removeEventListener("mousemove", onMove);
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-0 sticky top-0 bg-black px-3.5 pb-[5px] sm:px-4 sm:pb-[5px] md:px-5 md:pb-[5px] lg:px-6 pt-0"
      aria-labelledby="hero-heading"
    >
      <div
        ref={motionRef}
        className="will-change-transform [backface-visibility:hidden]"
      >
      <div
        ref={cardRef}
        className="relative rounded-[22px] sm:rounded-[28px] md:rounded-[40px] lg:rounded-[48px] bg-white text-black min-h-[calc(100svh-72px-5px)] md:min-h-[calc(100svh-80px-5px)] flex flex-col overflow-x-hidden overflow-y-visible will-change-transform [backface-visibility:hidden]"
      >
        <div
          ref={stageRef}
          className="relative flex flex-1 flex-col justify-between px-4 pt-4 pb-3.5 sm:px-6 sm:pt-5 sm:pb-4 md:px-10 md:pt-7 md:pb-5 lg:px-12 lg:pt-8 lg:pb-6"
        >
          <div className="relative w-full">
            <h1 id="hero-heading" className="sr-only">
              Crafting Digital Experiences
            </h1>

            {/* Row 1 */}
            <div className="relative flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between md:gap-0">
              <div
                ref={craftingRef}
                className="relative z-10 shrink-0 will-change-transform"
              >
                <HeroTag
                  label={heroContent.tags[0].label}
                  color={heroContent.tags[0].color}
                  rotate={heroContent.tags[0].rotate}
                  className="left-[8%] md:left-[14%] -top-1 md:-top-3"
                />
                <p className="font-display text-[clamp(3.1rem,15.5vw,12.5rem)] leading-[0.8] md:leading-[0.78] tracking-[0.01em] uppercase text-black md:whitespace-nowrap scale-y-[1.08] md:scale-y-[1.12] origin-bottom">
                  Cr
                  <span className="relative inline-block">
                    a
                    <span
                      className="absolute left-1/2 top-[40%] size-1.5 md:size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8A00]"
                      aria-hidden="true"
                    />
                  </span>
                  fting
                </p>
              </div>

              <div
                ref={mediaTopRef}
                className="relative z-20 order-3 md:order-none w-[82%] max-w-[300px] md:w-auto md:flex-1 md:min-w-[180px] md:max-w-[560px] mx-auto md:mx-2 lg:mx-3 aspect-[2.2/1] md:self-end md:mb-1 will-change-transform"
              >
                <div
                  data-float
                  className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[24px] shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                >
                  <HeroVideo
                    src={heroContent.media.top.src}
                    label={heroContent.media.top.alt}
                    startOffset={0.4}
                  />
                </div>
              </div>

              <div
                ref={digitalRef}
                className="relative z-10 order-2 md:order-none shrink-0 self-end md:self-auto text-right will-change-transform"
              >
                <HeroTag
                  label={heroContent.tags[1].label}
                  color={heroContent.tags[1].color}
                  rotate={heroContent.tags[1].rotate}
                  className="right-[4%] md:right-[6%] -top-1 md:-top-3"
                />
                <p className="font-display text-[clamp(3.1rem,15.5vw,12.5rem)] leading-[0.8] md:leading-[0.78] tracking-[0.01em] uppercase text-black md:whitespace-nowrap scale-y-[1.08] md:scale-y-[1.12] origin-bottom">
                  Digital
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative mt-1 md:mt-1.5 lg:mt-2 flex flex-col gap-2.5 md:flex-row md:items-center">
              <div
                ref={mediaBottomRef}
                className="relative z-20 order-2 md:order-none w-full max-w-[340px] md:w-[58%] lg:w-[54%] md:max-w-[720px] aspect-[2.2/1] shrink-0 self-center md:self-auto will-change-transform"
              >
                <div
                  data-float
                  className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[24px] shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
                >
                  <HeroVideo
                    src={heroContent.media.bottom.src}
                    label={heroContent.media.bottom.alt}
                    startOffset={2.6}
                  />
                </div>
              </div>

              <div className="relative z-10 order-1 md:order-none md:-ml-20 lg:-ml-36 flex-1 min-w-0 flex justify-start md:justify-end text-left md:text-right">
                <div
                  ref={experiencesRef}
                  className="relative inline-block max-w-full will-change-transform"
                >
                  <HeroTag
                    label={heroContent.tags[2].label}
                    color={heroContent.tags[2].color}
                    rotate={heroContent.tags[2].rotate}
                    className="left-[6%] md:left-[8%] -top-1 md:-top-3"
                  />
                  <p className="font-display text-[clamp(2.55rem,12.5vw,14rem)] md:text-[clamp(4.75rem,15.5vw,14rem)] leading-[0.8] md:leading-[0.74] tracking-[0.01em] uppercase text-[#D2D2D2] md:whitespace-nowrap scale-y-[1.08] md:scale-y-[1.14] origin-bottom">
                    Experiences
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={footerRef}
            className="relative z-30 mt-2.5 sm:mt-3 md:mt-4 lg:mt-5 shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-4 lg:gap-6 items-end w-full border-t border-black/[0.06] pt-3.5 sm:pt-4 md:pt-4"
          >
            <div className="lg:col-span-2">
              <p className="font-display text-[36px] sm:text-[40px] md:text-[56px] leading-none font-normal tracking-[0.02em] text-black">
                {heroContent.statsValue}
              </p>
              <p className="mt-1.5 text-[12px] md:text-[14px] leading-snug text-[#6B6B6B] whitespace-pre-line">
                {heroContent.statsLabel}
              </p>
            </div>

            <p className="lg:col-span-3 text-[12px] md:text-[15px] leading-snug text-[#6B6B6B] whitespace-pre-line max-w-[210px]">
              {siteConfig.tagline}
            </p>

            <div className="sm:col-span-2 lg:col-span-3 flex sm:justify-start lg:justify-center">
              <MagneticButton
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2.5 bg-black text-white rounded-full px-6 py-3 md:px-8 md:py-3.5 text-[14px] md:text-base font-medium tracking-[-0.01em] hover:bg-[#111] transition-colors duration-300"
              >
                {heroContent.cta}
                <span aria-hidden="true">↗</span>
              </MagneticButton>
            </div>

            <p className="sm:col-span-2 lg:col-span-4 text-[12px] md:text-[15px] leading-relaxed text-[#6B6B6B] lg:text-right max-w-md lg:ml-auto">
              {heroContent.description}
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
