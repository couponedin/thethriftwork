"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { MaterialSymbol } from "@/components/ui/MaterialSymbol";
import { useGsapContext } from "@/hooks/useGsapContext";
import { registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade } from "@/lib/motion";
import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";

registerGsapPlugins();

type ProjectCardProps = {
  project: PortfolioProject;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();
  const aspectClass =
    project.aspect === "wide" ? "aspect-[16/10]" : "aspect-square";
  const columnClass =
    project.aspect === "wide"
      ? "col-span-12 md:col-span-7"
      : "col-span-12 md:col-span-5";
  const href = project.href ?? "#contact";
  const isExternal = Boolean(project.href?.startsWith("http"));

  useGsapContext(
    cardRef,
    () => {
      const el = cardRef.current;
      if (!el) return;
      animateScrollFade(el, el, {
        y: 56,
        stagger: 0,
        start: "top 88%",
      });
    },
    [],
  );

  return (
    <article
      ref={cardRef}
      className={cn(
        columnClass,
        "group will-change-transform",
        project.offsetTop && "md:mt-16",
        className,
      )}
    >
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {
              onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollTo("#contact");
              },
            })}
        className="block rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        aria-label={`${project.title} — ${project.category}`}
      >
        <div
          className={cn(
            aspectClass,
            "media-frame overflow-hidden rounded-card glass relative mb-7",
          )}
        >
          <Parallax speed={12} scale={1.12}>
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes={
                project.aspect === "wide"
                  ? "(max-width: 768px) 100vw, 58vw"
                  : "(max-width: 768px) 100vw, 42vw"
              }
              quality={85}
              className="object-cover object-center transition-transform duration-[900ms] ease-[var(--ease-luxury)] group-hover:scale-[1.04]"
            />
          </Parallax>
          {project.badge ? (
            <div className="absolute top-6 left-6 z-10 bg-primary-container/95 text-on-primary-container px-4 py-1.5 font-label-mono uppercase text-[10px] tracking-[0.14em] rounded-full backdrop-blur-sm">
              {project.badge}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between items-start gap-6 px-0.5">
          <div className="min-w-0">
            <h4 className="font-headline-lg text-body-lg mb-1.5 tracking-tight transition-colors duration-500 ease-[var(--ease-luxury)] group-hover:text-primary">
              {project.title}
            </h4>
            <p className="font-label-mono text-label-mono text-muted-text">
              {project.category}
            </p>
          </div>
          <MaterialSymbol
            name="arrow_forward"
            className="text-primary shrink-0 mt-1 opacity-80 transition-all duration-500 ease-[var(--ease-luxury)] group-hover:translate-x-2 group-hover:opacity-100"
          />
        </div>
      </a>
    </article>
  );
}
