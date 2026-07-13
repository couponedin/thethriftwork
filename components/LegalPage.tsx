import Link from "next/link";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/data";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="bg-black min-h-svh">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/90 backdrop-blur-md">
        <div className="px-margin-safe py-5 md:py-6 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-[1.65rem] md:text-[1.85rem] tracking-[0.04em] uppercase text-white hover:text-primary transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {siteConfig.name}
          </Link>
          <Link
            href="/"
            className="font-label-mono text-label-mono uppercase text-muted-text hover:text-white tracking-[0.12em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main id="main-content" className="px-margin-safe py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-label-mono text-label-mono uppercase text-muted-text tracking-[0.14em] mb-4">
            Legal
          </p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] leading-[0.95] tracking-[0.02em] uppercase text-white mb-4">
            {title}
          </h1>
          <p className="text-sm text-muted-text mb-10">Last updated: {updated}</p>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-white/75 mb-14">
            {intro}
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-sans text-[1.25rem] md:text-[1.4rem] font-semibold tracking-[-0.02em] text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-[15px] md:text-[16px] leading-relaxed text-white/65"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc pl-5 space-y-2 text-[15px] md:text-[16px] leading-relaxed text-white/65">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-16 pt-10 border-t border-white/[0.08] text-[15px] leading-relaxed text-white/55">
            Questions about this policy? Email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary hover:underline underline-offset-4"
            >
              {siteConfig.email}
            </a>{" "}
            or visit us in {siteConfig.address}.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
