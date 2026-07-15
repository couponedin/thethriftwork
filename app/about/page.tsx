import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/SitePage";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `${siteConfig.taglineShort} ${siteConfig.name} is a software development and digital studio in ${siteConfig.address}, founded in ${siteConfig.founded}.`,
};

const values = [
  {
    title: "Profitable branding",
    body: "We craft brand systems built to convert — identities that look sharp and help startups win market attention.",
  },
  {
    title: "Top-notch websites",
    body: "From landing pages to full product sites, we build modern web experiences that load fast, feel premium, and scale with you.",
  },
  {
    title: "Certified performance",
    body: "As a Microsoft Advertising Certified Professional and IONOS Official Partner, we bring trusted tools and paid expertise to every growth plan.",
  },
  {
    title: "Built for startups",
    body: "Lean process, clear timelines, and delivery that respects runway — digital products without the bloated agency tax.",
  },
];

const facts = [
  { label: "Headquarters", value: `${siteConfig.address} ${siteConfig.postalCode}, IN` },
  { label: "Founded", value: siteConfig.founded },
  { label: "Industry", value: siteConfig.industry },
  { label: "Company size", value: siteConfig.companySize },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "LinkedIn",
    value: "Company page",
    href: siteConfig.linkedin,
  },
];

export default function AboutPage() {
  return (
    <SitePage
      eyebrow="Who we are"
      title="About"
      intro={`${siteConfig.name} crafts profitable branding and web products for startups — top-notch websites, smart marketing, and digital systems that help brands grow from ${siteConfig.address}.`}
    >
      <section className="mb-16 md:mb-24">
        <h2 className="font-sans text-[1.35rem] md:text-[1.6rem] font-semibold tracking-[-0.03em] text-white mb-5">
          Our story
        </h2>
        <div className="space-y-5 text-[15px] md:text-[17px] leading-relaxed text-white/65 max-w-3xl">
          <p>
            Founded in {siteConfig.founded} and headquartered in{" "}
            {siteConfig.address}, {siteConfig.name} is a privately held software
            development and digital studio focused on one outcome: helping
            startups look sharper and grow faster.
          </p>
          <p>
            We craft profitable branding and web products — the kind of
            top-notch websites and digital experiences that turn attention into
            customers. Alongside design and development, we bring Microsoft
            Advertising expertise and IONOS partnership support so your brand
            can launch, market, and scale with confidence.
          </p>
          <p>
            From identity systems and UI/UX to websites, apps, digital
            marketing, and AI solutions, we keep the work practical, measurable,
            and built for real businesses — not bloated agency process.
          </p>
        </div>
      </section>

      <section className="mb-16 md:mb-24">
        <h2 className="font-sans text-[1.35rem] md:text-[1.6rem] font-semibold tracking-[-0.03em] text-white mb-8">
          Credentials
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {siteConfig.credentials.map((item) => (
            <li
              key={item}
              className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-[15px] md:text-[16px] text-white/80 flex items-start gap-3"
            >
              <span
                className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 md:mb-24">
        <h2 className="font-sans text-[1.35rem] md:text-[1.6rem] font-semibold tracking-[-0.03em] text-white mb-8">
          What we believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 md:p-8"
            >
              <h3 className="font-sans text-[1.1rem] md:text-[1.2rem] font-semibold tracking-[-0.02em] text-white mb-3">
                {value.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-white/60">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16 md:mb-20">
        <h2 className="font-sans text-[1.35rem] md:text-[1.6rem] font-semibold tracking-[-0.03em] text-white mb-8">
          At a glance
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-white/[0.08] pt-4">
              <dt className="font-label-mono text-label-mono uppercase tracking-[0.12em] text-muted-text mb-2">
                {fact.label}
              </dt>
              <dd className="text-[16px] md:text-[18px] text-white/85 tracking-tight">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target={fact.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      fact.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="hover:text-primary transition-colors duration-300 break-all sm:break-normal"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <p className="text-[15px] md:text-[16px] text-white/60 max-w-md">
          Want to see how we work? Explore services or send a brief — we&apos;d
          love to build with you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/20 text-white rounded-full px-6 py-3.5 font-label-mono uppercase tracking-widest text-sm hover:border-white/50 transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container rounded-full px-6 py-3.5 font-label-mono uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity duration-300"
          >
            Let&apos;s Talk
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </SitePage>
  );
}
