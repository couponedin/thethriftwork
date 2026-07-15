import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/data";

type SitePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function SitePage({ eyebrow, title, intro, children }: SitePageProps) {
  return (
    <div className="bg-black min-h-svh">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/90 backdrop-blur-md">
        <div className="px-margin-safe py-5 md:py-6 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="relative block h-7 md:h-8 w-[148px] md:w-[180px] hover:opacity-80 transition-opacity duration-300"
            aria-label={siteConfig.name}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              fill
              priority
              sizes="(max-width: 768px) 148px, 180px"
              className="object-contain object-left"
            />
          </Link>
          <nav className="flex items-center gap-5 md:gap-8">
            <Link
              href="/services"
              className="font-label-mono text-label-mono uppercase text-muted-text hover:text-white tracking-[0.12em] transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="font-label-mono text-label-mono uppercase text-muted-text hover:text-white tracking-[0.12em] transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="font-label-mono text-label-mono uppercase text-primary hover:text-white tracking-[0.12em] transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="px-margin-safe py-16 md:py-24 lg:py-28">
        <div className="max-w-5xl">
          <p className="font-label-mono text-label-mono uppercase text-muted-text tracking-[0.14em] mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[0.02em] uppercase text-white mb-6">
            {title}
          </h1>
          <p className="text-[16px] md:text-[18px] leading-relaxed text-white/70 max-w-2xl mb-14 md:mb-20">
            {intro}
          </p>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
