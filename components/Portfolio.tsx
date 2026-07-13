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
      className="px-margin-safe pt-section-gap pb-12 md:pb-16 lg:pb-20"
      aria-labelledby="portfolio-heading"
    >
      <div className="flex justify-between items-end gap-12 mb-28">
        <div ref={labelWrapRef} className="max-w-xl">
          <SectionLabel>Portfolio</SectionLabel>
          <h2
            ref={headingRef}
            id="portfolio-heading"
            className="font-display-lg text-headline-lg uppercase tracking-tight"
          >
            Explore Our
            <br />
            Work
          </h2>
        </div>
        <p
          ref={descRef}
          className="font-body-md text-body-md text-on-surface-variant/90 max-w-[17rem] text-right hidden md:block leading-relaxed pb-1"
        >
          A curated selection of architectural digital experiences crafted for
          global leaders.
        </p>
      </div>

      {portfolioCategories.map((category, index) => (
        <div
          key={category.number}
          className={index === portfolioCategories.length - 1 ? "mb-0" : "mb-36"}
        >
          <div
            data-category-head
            className="flex items-baseline gap-8 mb-14"
          >
            <span
              className="font-display-lg text-display-lg opacity-[0.08] leading-none select-none"
              aria-hidden="true"
            >
              {category.number}
            </span>
            <h3 className="font-headline-lg text-headline-lg tracking-tight">
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
