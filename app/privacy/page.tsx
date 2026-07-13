import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name} — how we collect, use, and protect your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 13, 2026"
      intro={`This Privacy Policy explains how ${siteConfig.name} ("we", "us", or "our") collects, uses, and protects information when you visit ${siteConfig.url}, contact us, or use our services. By using our website or submitting a project brief, you agree to the practices described here.`}
      sections={[
        {
          title: "1. Who we are",
          paragraphs: [
            `${siteConfig.name} is a digital agency based in ${siteConfig.address}. We provide branding, website design and development, digital marketing, and AI-driven solutions for businesses and startups.`,
          ],
        },
        {
          title: "2. Information we collect",
          paragraphs: [
            "We collect information you choose to share with us and limited technical data needed to run the website.",
          ],
          bullets: [
            "Contact details you submit through our form, such as first name, last name, email address, and project details.",
            "Messages you send us by email at " + siteConfig.email + ".",
            "Basic technical information such as browser type, device type, approximate location derived from IP address, and pages visited — typically through standard analytics or hosting logs.",
            "Cookies or similar technologies that help the site function and improve performance (see Cookies below).",
          ],
        },
        {
          title: "3. How we use your information",
          paragraphs: [
            "We use the information we collect only for legitimate business purposes related to our services.",
          ],
          bullets: [
            "To respond to project inquiries and communicate about potential or ongoing work.",
            "To deliver, manage, and improve our branding, web, marketing, and AI services.",
            "To operate, secure, and optimize our website.",
            "To send service-related updates when you have an active engagement with us.",
            "To comply with legal obligations when required.",
          ],
        },
        {
          title: "4. Contact form and third-party processors",
          paragraphs: [
            `When you submit the “Submit Brief” form on our website, your message is processed through Web3Forms so we can receive it by email. That submission may include your name, email, and project details.`,
            "We do not sell your personal information. Service providers we use (such as form delivery, hosting, or analytics) may process data only to perform services for us and under their own privacy terms.",
          ],
        },
        {
          title: "5. Cookies and tracking",
          paragraphs: [
            "Our website may use essential cookies to ensure basic functionality and optional analytics cookies to understand how visitors use the site. You can control cookies through your browser settings. Disabling some cookies may affect site experience.",
          ],
        },
        {
          title: "6. How we share information",
          paragraphs: [
            "We share personal information only when needed to operate our business or when the law requires it.",
          ],
          bullets: [
            "With trusted service providers who help us host the site, deliver form submissions, or analyze traffic.",
            "With professional advisors if necessary for legal, accounting, or security reasons.",
            "When required by law, regulation, or valid legal process.",
            "In connection with a business transfer, merger, or reorganization, if applicable.",
          ],
        },
        {
          title: "7. Data retention",
          paragraphs: [
            "We keep inquiry and project-related information for as long as needed to respond to you, manage a client relationship, or meet legal and accounting requirements. When information is no longer needed, we delete or anonymize it where reasonably possible.",
          ],
        },
        {
          title: "8. Data security",
          paragraphs: [
            "We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, or misuse. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
          ],
        },
        {
          title: "9. Your rights",
          paragraphs: [
            "Depending on applicable law, you may have the right to request access to, correction of, or deletion of your personal information, or to object to certain processing. To make a request, email us at " +
              siteConfig.email +
              ". We may need to verify your identity before fulfilling the request.",
          ],
        },
        {
          title: "10. Children’s privacy",
          paragraphs: [
            "Our website and services are intended for business and professional audiences. We do not knowingly collect personal information from children under 16. If you believe a child has provided us information, contact us and we will take appropriate steps to delete it.",
          ],
        },
        {
          title: "11. International visitors",
          paragraphs: [
            `We are based in India (${siteConfig.address}). If you access our site from another country, your information may be processed in India or in other countries where our service providers operate.`,
          ],
        },
        {
          title: "12. Changes to this policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of the website after updates means you accept the revised policy.",
          ],
        },
        {
          title: "13. Contact us",
          paragraphs: [
            `For privacy questions or requests, contact ${siteConfig.name} at ${siteConfig.email}. Our office is located in ${siteConfig.address}.`,
          ],
        },
      ]}
    />
  );
}
