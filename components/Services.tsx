"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { GSAP_EASE } from "@/lib/animations";
import { services } from "@/lib/data";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade } from "@/lib/motion";
import type { Service } from "@/lib/types";

registerGsapPlugins();

const SLIDE_H = "h-[380px] md:h-[500px]";

function DetailSlide({ service }: { service: Service }) {
  return (
    <div
      className={`w-full ${SLIDE_H} shrink-0 rounded-[28px] md:rounded-[32px] bg-white text-black p-8 md:p-10 lg:p-11 flex flex-col justify-between`}
    >
      <p className="font-sans text-[17px] md:text-[20px] lg:text-[21px] leading-relaxed tracking-[-0.02em] text-black/85">
        {service.description}
      </p>
      <div className="mt-10 pt-2 flex items-center gap-3 text-[13px] md:text-[14px] tracking-[-0.01em] text-black/45">
        <span className="shrink-0">Timeline</span>
        <span className="flex-1 h-px bg-black/15" aria-hidden="true" />
        <span className="shrink-0 text-black/70">{service.timeline}</span>
      </div>
    </div>
  );
}

function PanelSlide({ service }: { service: Service }) {
  if (service.panel.type === "checklist") {
    return (
      <div
        className={`w-full ${SLIDE_H} shrink-0 rounded-[28px] md:rounded-[32px] bg-[#FF7A21] p-8 md:p-10 lg:p-11 flex flex-col`}
      >
        <ul className="flex flex-col gap-5 md:gap-7 list-none p-0 m-0">
          {service.panel.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 text-white font-sans text-[16px] md:text-[18px] tracking-[-0.02em]"
            >
              <span
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-white/80 text-[11px] leading-none"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${SLIDE_H} shrink-0 overflow-hidden rounded-[28px] md:rounded-[32px]`}
    >
      <Image
        src={service.panel.src}
        alt={service.panel.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 30vw"
        className="object-cover"
      />
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftViewportRef = useRef<HTMLDivElement>(null);
  const rightViewportRef = useRef<HTMLDivElement>(null);
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const last = services.length - 1;
  const rightServices = [...services].reverse();

  useGsapContext(
    sectionRef,
    () => {
      const section = sectionRef.current;
      if (!section) return;

      animateScrollFade(section, section.querySelectorAll("[data-offer-fade]"), {
        y: 28,
        stagger: 0.08,
        start: "top 82%",
      });
    },
    [],
  );

  useEffect(() => {
    const leftTrack = leftTrackRef.current;
    const rightTrack = rightTrackRef.current;
    const leftViewport = leftViewportRef.current;
    const rightViewport = rightViewportRef.current;
    if (!leftTrack || !rightTrack || !leftViewport || !rightViewport) return;

    const animate = () => {
      const leftH = leftViewport.clientHeight;
      const rightH = rightViewport.clientHeight;

      // Left scrolls UP
      gsap.to(leftTrack, {
        y: -activeIndex * leftH,
        duration: 0.8,
        ease: GSAP_EASE.expo,
        overwrite: "auto",
        force3D: true,
      });

      // Right scrolls DOWN (reversed stack)
      gsap.to(rightTrack, {
        y: -(last - activeIndex) * rightH,
        duration: 0.8,
        ease: GSAP_EASE.expo,
        overwrite: "auto",
        force3D: true,
      });
    };

    animate();

    const onResize = () => animate();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, last]);

  // Seed right track at last slide so index 0 shows service 0
  useEffect(() => {
    const rightTrack = rightTrackRef.current;
    const rightViewport = rightViewportRef.current;
    if (!rightTrack || !rightViewport) return;
    gsap.set(rightTrack, { y: -last * rightViewport.clientHeight });
  }, [last]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="px-3.5 sm:px-4 md:px-5 lg:px-6 py-10 md:py-14 lg:py-16"
      aria-labelledby="services-heading"
    >
      <div className="rounded-[22px] sm:rounded-[28px] md:rounded-[40px] lg:rounded-[48px] bg-[#1c1c1c] px-5 md:px-8 lg:px-12 pt-10 md:pt-14 lg:pt-16 pb-20 md:pb-28 lg:pb-32">
      <div
        data-offer-fade
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 md:mb-16 lg:mb-20"
      >
        <p className="lg:col-span-3 text-[13px] md:text-sm font-medium tracking-[-0.01em] text-white/70">
          Services
        </p>
        <h2
          id="services-heading"
          className="lg:col-span-5 font-sans text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white text-center lg:text-left"
        >
          What we offer.
        </h2>
        <p className="lg:col-span-4 lg:text-right text-[13px] md:text-[15px] leading-relaxed text-white/55 max-w-sm lg:ml-auto">
          We specialize in creating bold, high-impact digital experiences that
          set brands apart.
        </p>
      </div>

      <div
        data-offer-fade
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_0.9fr] gap-5 md:gap-6 lg:gap-6 items-start"
      >
        <ul
          className="flex flex-col gap-2.5 list-none p-0 m-0"
          role="tablist"
          aria-label="Services"
        >
          {services.map((service, index) => {
            const activeItem = index === activeIndex;
            return (
              <li key={service.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeItem}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left flex items-center gap-3 md:gap-4 rounded-2xl px-4 md:px-5 py-4 md:py-4.5 transition-colors duration-300 ${
                    activeItem
                      ? "bg-white text-black"
                      : "bg-transparent text-white/45 hover:text-white/75"
                  }`}
                >
                  <span
                    className={`tabular-nums text-[14px] md:text-[15px] shrink-0 ${
                      activeItem ? "text-black/45" : "text-white/30"
                    }`}
                  >
                    {index + 1}.
                  </span>
                  <span className="font-sans text-[16px] md:text-[18px] font-medium tracking-[-0.02em]">
                    {service.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          ref={leftViewportRef}
          className={`overflow-hidden ${SLIDE_H} rounded-[28px] md:rounded-[32px]`}
          role="tabpanel"
          aria-live="polite"
        >
          <div ref={leftTrackRef} className="flex flex-col will-change-transform">
            {services.map((service) => (
              <DetailSlide key={service.title} service={service} />
            ))}
          </div>
        </div>

        <div
          ref={rightViewportRef}
          className={`overflow-hidden ${SLIDE_H} rounded-[28px] md:rounded-[32px]`}
          aria-hidden="true"
        >
          <div ref={rightTrackRef} className="flex flex-col will-change-transform">
            {rightServices.map((service) => (
              <PanelSlide key={`panel-${service.title}`} service={service} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
