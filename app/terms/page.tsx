import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name} — the rules that govern use of our website and services.`,
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 13, 2026"
      intro={`These Terms of Service ("Terms") govern your access to and use of the website at ${siteConfig.url} and any related services offered by ${siteConfig.name} ("we", "us", or "our"). By browsing this site or submitting a project brief, you agree to these Terms.`}
      sections={[
        {
          title: "1. About The Thrift Work",
          paragraphs: [
            `${siteConfig.name} is a digital agency based in ${siteConfig.address}. We offer branding, UI/UX, website and mobile application design and development, digital marketing, and AI solutions.`,
            "These Terms apply to use of our website. Separate written agreements (proposals, statements of work, or contracts) may apply to paid client engagements and will control if there is a conflict with these Terms.",
          ],
        },
        {
          title: "2. Using our website",
          paragraphs: [
            "You may use our website for lawful purposes only — to learn about our work, explore our portfolio, and contact us about potential projects.",
          ],
          bullets: [
            "Do not attempt to disrupt, hack, scrape at scale, or misuse the website or its forms.",
            "Do not submit false, misleading, or harmful content through our contact form.",
            "Do not use our site in any way that violates applicable laws or third-party rights.",
          ],
        },
        {
          title: "3. Project inquiries",
          paragraphs: [
            "Submitting a brief through our contact form does not create a client relationship or obligate us to accept a project. We review inquiries and may follow up at our discretion.",
            "Any fees, timelines, deliverables, and ownership terms for client work will be agreed in writing before work begins.",
          ],
        },
        {
          title: "4. Services overview",
          paragraphs: [
            "Descriptions of services on this website are for general information. Scope, pricing, and timelines depend on each project’s requirements and the final written agreement between you and us.",
          ],
        },
        {
          title: "5. Intellectual property",
          paragraphs: [
            `All content on this website — including text, branding, layout, graphics, videos, and portfolio presentation — is owned by ${siteConfig.name} or used with permission. You may not copy, reproduce, or redistribute site content without our prior written consent.`,
            "Portfolio pieces may showcase work created for clients. Client trademarks and product imagery remain the property of their respective owners. Case studies are shown for demonstration of our capabilities unless otherwise noted.",
            "For commissioned projects, ownership and license terms for final deliverables will be defined in the project agreement.",
          ],
        },
        {
          title: "6. Third-party links",
          paragraphs: [
            "Our portfolio and footer may link to third-party websites or apps (for example, client sites or app store listings). We are not responsible for the content, policies, or practices of those third parties. Visiting them is at your own risk.",
          ],
        },
        {
          title: "7. No warranties",
          paragraphs: [
            'Our website and its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.',
            "We do not guarantee that the site will be uninterrupted, error-free, or free of harmful components.",
          ],
        },
        {
          title: "8. Limitation of liability",
          paragraphs: [
            `To the fullest extent permitted by law, ${siteConfig.name} and its team will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or reliance on its content.`,
            "Our total liability related to website use shall not exceed the amount you paid us (if any) for website-related services in the three months before the claim, or INR 5,000, whichever is greater.",
          ],
        },
        {
          title: "9. Indemnity",
          paragraphs: [
            `You agree to indemnify and hold harmless ${siteConfig.name} from claims, damages, and expenses arising from your misuse of the website or your violation of these Terms.`,
          ],
        },
        {
          title: "10. Privacy",
          paragraphs: [
            "How we handle personal information is described in our Privacy Policy. By using the site, you also acknowledge that policy.",
          ],
        },
        {
          title: "11. Changes to these Terms",
          paragraphs: [
            "We may update these Terms from time to time. The “Last updated” date will change when we do. Continued use of the website after changes means you accept the updated Terms.",
          ],
        },
        {
          title: "12. Governing law",
          paragraphs: [
            `These Terms are governed by the laws of India. Courts in ${siteConfig.address} shall have exclusive jurisdiction over disputes arising from these Terms or use of the website, subject to any mandatory consumer protections that apply.`,
          ],
        },
        {
          title: "13. Contact",
          paragraphs: [
            `Questions about these Terms? Contact ${siteConfig.name} at ${siteConfig.email}. We are based in ${siteConfig.address}.`,
          ],
        },
      ]}
    />
  );
}
