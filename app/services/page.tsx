import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/SitePage";
import { services, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Services | ${siteConfig.name}`,
  description: `Branding, websites, digital marketing, AI solutions, and software development from ${siteConfig.name} in ${siteConfig.address}.`,
};

export default function ServicesPage() {
  return (
    <SitePage
      eyebrow="What we do"
      title="Services"
      intro={`From brand systems to high-performing digital products — ${siteConfig.name} builds the work that helps businesses grow without the bloated agency tax.`}
    >
      <div className="space-y-6 md:space-y-8">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="rounded-[24px] md:rounded-[32px] border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 lg:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-10">
              <span className="font-label-mono text-label-mono text-muted-text tabular-nums shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <h2 className="font-sans text-[1.35rem] md:text-[1.75rem] font-semibold tracking-[-0.03em] text-white">
                    {service.title}
                  </h2>
                  <p className="font-label-mono text-[11px] md:text-label-mono uppercase tracking-[0.12em] text-primary shrink-0">
                    Timeline · {service.timeline}
                  </p>
                </div>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-white/65 max-w-3xl">
                  {service.description}
                </p>
                {service.panel.type === "checklist" ? (
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
                    {service.panel.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-white/55"
                      >
                        <span
                          className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 md:mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <p className="text-[15px] md:text-[16px] text-white/60 max-w-md">
          Have a project in mind? Let&apos;s talk about scope, timeline, and what
          success looks like.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container rounded-full px-7 py-3.5 font-label-mono uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity duration-300"
        >
          Let&apos;s Talk
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </SitePage>
  );
}
