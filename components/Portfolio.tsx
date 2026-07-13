"use client";

import { useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useGsapContext } from "@/hooks/useGsapContext";
import { portfolioCategories } from "@/lib/data";
import { registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade, animateSplitChars } from "@/lib/motion";

registerGsapPlugins();

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const labelWrapRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;

      const cleanups: Array<() => void> = [];

      if (labelWrapRef.current) {
        animateScrollFade(labelWrapRef.current, labelWrapRef.current, {
          y: 24,
          stagger: 0,
          start: "top 88%",
        });
      }

      cleanups.push(animateSplitChars(heading));

      if (descRef.current) {
        animateScrollFade(descRef.current, descRef.current, {
          y: 20,
          delay: 0.15,
          stagger: 0,
          start: "top 90%",
        });
      }

      section.querySelectorAll<HTMLElement>("[data-category-head]").forEach((head) => {
        animateScrollFade(head, head.children, {
          x: -24,
          y: 0,
          stagger: 0.08,
          start: "top 85%",
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="px-margin-safe pt-20 md:pt-28 lg:pt-section-gap pb-12 md:pb-16 lg:pb-20"
      aria-labelledby="portfolio-heading"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 md:gap-12 mb-16 md:mb-22 lg:mb-28">
        <div ref={labelWrapRef} className="max-w-xl">
          <SectionLabel>Portfolio</SectionLabel>
          <h2
            ref={headingRef}
            id="portfolio-heading"
            className="font-display-lg text-[clamp(2.5rem,7vw,4.5rem)] uppercase tracking-tight"
          >
            Explore Our
            <br />
            Work
          </h2>
        </div>
        <p
          ref={descRef}
          className="font-body-md text-body-md text-on-surface-variant/90 max-w-[17rem] text-left md:text-right hidden md:block leading-relaxed pb-1"
        >
          A curated selection of architectural digital experiences crafted for
          global leaders.
        </p>
      </div>

      {portfolioCategories.map((category, index) => (
        <div
          key={category.number}
          className={index === portfolioCategories.length - 1 ? "mb-0" : "mb-20 md:mb-28 lg:mb-36"}
        >
          <div
            data-category-head
            className="flex items-baseline gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-12 lg:mb-14"
          >
            <span
              className="font-display-lg text-[clamp(2.75rem,6vw,5rem)] opacity-[0.08] leading-none select-none"
              aria-hidden="true"
            >
              {category.number}
            </span>
            <h3 className="font-headline-lg text-[clamp(1.75rem,4vw,3rem)] tracking-tight">
              {category.title}
            </h3>
          </div>
          <div className="grid grid-cols-12 gap-gutter gap-y-10">
            {category.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
