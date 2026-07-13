"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { useGsapContext } from "@/hooks/useGsapContext";
import { DURATION, GSAP_EASE } from "@/lib/animations";
import { contactInfo, siteConfig } from "@/lib/data";
import { registerGsapPlugins } from "@/lib/gsap";
import { animateScrollFade, animateSplitChars } from "@/lib/motion";

registerGsapPlugins();

// Web3Forms access keys are meant for client-side use.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "fd6c2edf-6d13-4e7f-b8f0-9e9d5d550c49";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGsapContext(
    sectionRef,
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const cleanups = [
        animateSplitChars(heading, {
          stagger: 0.03,
          duration: DURATION.slow,
          ease: GSAP_EASE.expo,
        }),
      ];

      if (infoRef.current) {
        animateScrollFade(infoRef.current, infoRef.current.children, {
          y: 28,
          stagger: 0.12,
          delay: 0.15,
          start: "top 85%",
        });
      }

      if (formRef.current) {
        animateScrollFade(formRef.current, formRef.current, {
          y: 40,
          stagger: 0,
          duration: DURATION.slow,
          start: "top 88%",
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (status === "loading") return;

    const form = formRef.current ?? event.currentTarget;
    if (!form) return;

    const data = new FormData(form);

    // Honeypot — ignore bots that fill this field
    if (String(data.get("botcheck") ?? "").trim()) {
      setStatus("success");
      return;
    }

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    if (!firstName || !lastName || !email || !details) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New brief from ${firstName} ${lastName}`,
          from_name: siteConfig.name,
          name: `${firstName} ${lastName}`,
          email,
          message: details,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Something went wrong. Please try again.",
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-margin-safe py-20 md:py-28 lg:py-section-gap"
      aria-labelledby="contact-heading"
    >
      <div className="grid grid-cols-12 gap-gutter lg:gap-16 items-start">
        <div className="col-span-12 lg:col-span-6 lg:sticky lg:top-32">
          <h2
            ref={headingRef}
            id="contact-heading"
            className="font-display-xl text-[clamp(3.5rem,12vw,7.5rem)] uppercase mb-10 md:mb-14 tracking-tight"
          >
            Let&apos;s
            <br />
            <span className="text-primary">Talk.</span>
          </h2>
          <div ref={infoRef} className="space-y-10 md:space-y-14">
            {contactInfo.map((item) => (
              <div key={item.label}>
                <span className="font-label-mono text-label-mono uppercase text-muted-text block mb-3">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    className="font-headline-lg text-[clamp(1.5rem,4vw,3rem)] tracking-tight hover:text-primary transition-colors duration-500 ease-[var(--ease-luxury)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary break-all sm:break-normal"
                    href={item.href}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-headline-lg text-[clamp(1.25rem,3vw,1.5rem)] text-on-surface/95 tracking-tight">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 mt-12 lg:mt-0">
          <form
            ref={formRef}
            className="glass relative z-10 p-6 sm:p-8 md:p-12 rounded-card space-y-7 md:space-y-9 will-change-transform"
            onSubmit={handleSubmit}
            aria-label="Project brief"
          >
            {/* Web3Forms honeypot — must stay empty */}
            <input
              type="text"
              name="botcheck"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              <FormField
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="John"
                type="text"
                autoComplete="given-name"
                required
                disabled={status === "loading"}
              />
              <FormField
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                type="text"
                autoComplete="family-name"
                required
                disabled={status === "loading"}
              />
            </div>
            <FormField
              id="email"
              name="email"
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              autoComplete="email"
              required
              disabled={status === "loading"}
            />
            <FormField
              id="details"
              name="details"
              label="Project Details"
              as="textarea"
              placeholder="Tell us about your vision..."
              rows={4}
              required
              disabled={status === "loading"}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary-container text-on-primary-container py-6 rounded-full font-label-mono uppercase tracking-widest font-bold text-base hover:opacity-90 transition-opacity duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Submit Brief"}
            </button>

            <div aria-live="polite" className="min-h-[1.5rem] pt-1">
              {status === "success" && (
                <p className="text-sm text-primary text-center font-medium">
                  Thanks — your brief was sent. We&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400 text-center font-medium">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
