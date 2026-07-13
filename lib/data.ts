import type {
  Avatar,
  ContactInfo,
  NavLink,
  PortfolioCategory,
  Service,
  SocialLink,
  TrustLogo,
} from "@/lib/types";

export const siteConfig = {
  name: "The Thrift Work",
  title: "The Thrift Work – AI Driven Marketing, Web, App & Graphic Design Agency",
  description:
    "The Thrift Work helps brands grow with branding, websites, digital marketing, social media, and AI solutions. All without the bloated agency tax.",
  tagline: "Driven by Branding,\nWebsites, Marketing & AI",
  url: "https://www.thethrift.work",
  email: "hello@thethrift.work",
  address: "Ahmedabad, Gujarat",
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work", active: true },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroAvatars: Avatar[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuChANzm-GayZhl2MPYQeKV0yH2sJWHzPRKWj1mGZsnbEmCpc7Kf5jI5Jj1AsSsfc31P7wJEChwbuApa6ZAzNViVAH0P0iNpUfxX9WubdPu9qxSTBrvLuoUKQiECCOq8mwBv2lQmzIblmRZmAzD_5E65TpVIuUagFrV6D3sHT-Ppq18WigH-NFizUK75EczDH51x9DJO3gNljs215Bt-bJr27JHlpXtuPSqjt-PhAv43T24OaQYDC5_8",
    alt: "A portrait of a minimalist architect with sharp features, wearing black designer glasses, looking thoughtfully into the distance. High-contrast monochromatic lighting, studio setting.",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzDOlCsWnp8JG_MmnjNAVzGJm8UK5ZhmgUdUcNCVXxh6ihEoHyfRN9kzpK39OOiljDWcIRUqoJ_31EGozJu8rM80c_YIPubmdRfP5bIsx-q5LcwKYoDSAjvKDaO7hQLybhfzdsTFGCwWawsT6eBPUT2KVFn4gdE0gTtfwqakB0VXUPkaNm1lHHsQOyPDy-J_iDqgRjOxvH1LynGlxmWGLMDY2wRXMCGSxcJ19mHlBiK-j29h2YvQPM",
    alt: "A portrait of a young creative director with neon orange light reflecting off her face, dark moody background, high-fashion aesthetic.",
  },
  {
    alt: "Additional collaborators",
    isPlaceholder: true,
  },
];

export const heroImage = {
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC18TQ9QzwbTx71HPepcHRzU83klX3grGzvL32SLkznyeioCWoSz2rK7xDj7D6vY319dmIkCLu8S50E2yt-HhOa-O5Tt8GAiShx7R_3PMQuRlPbUd3ywI4gjAKCK4ZgZh3_atOrJs0waULqJ6qJtrwUbT64efKMZEp-ZH-WXIqMrPEbqMAOX31HKRLccJFpFNa5gxInYHv49OfmiPztRECygA8eG6ZvH23bQbQ0FrG0M5qTUjeGJ55x",
  alt: "A macro close-up of a high-end luxury watch movement, with polished gears and gold escapements shimmering under architectural studio lighting. The aesthetic is ultra-premium, dark, and sophisticated, matching a high-fashion digital agency vibe with deep shadows and warm metallic highlights.",
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    number: "01",
    title: "Branding and UI/UX",
    projects: [
      {
        title: "Seen",
        category: "Branding / Product Design",
        image: "/images/seen-product.png",
        alt: "Seen shampoo brand identity and product campaign collage",
        width: 1417,
        height: 1110,
        aspect: "wide",
        badge: "Case Study",
        href: "https://helloseen.com/",
      },
      {
        title: "BetterBody Foods",
        category: "Branding / Identity",
        image: "/images/bbf-product.png",
        alt: "BetterBody Foods product branding and lifestyle collage",
        width: 1417,
        height: 1110,
        aspect: "square",
        offsetTop: true,
        href: "https://betterbodyfoods.com/",
      },
    ],
  },
  {
    number: "02",
    title: "Website and Mobile Applications",
    projects: [
      {
        title: "Couponed",
        category: "Mobile App / Product Design",
        image: "/images/couponed-image.png",
        alt: "Couponed mobile app UI mockups — eat more, pay less, get cashback",
        width: 1448,
        height: 1086,
        aspect: "square",
        href: "https://link.couponed.com/qoCG/",
      },
      {
        title: "CuroStrides",
        category: "Mobile App / UI/UX",
        image: "/images/curostrides-product.png",
        alt: "CuroStrides health app dashboard and smartwatch product UI",
        width: 1448,
        height: 1086,
        aspect: "wide",
        offsetTop: true,
        href: "https://play.google.com/store/apps/details?id=com.curostrides.moodscriber&hl=en_IN",
      },
    ],
  },
];

export const services: Service[] = [
  {
    title: "AI Solutions",
    description:
      "We craft AI strategies that plug real tools into real workflows. Optimizing systems, automating tasks, boosting productivity, and helping brands make smarter, faster decisions. Practical. Powerful. Built for impact.",
    timeline: "2 – 4 weeks",
    panel: {
      type: "checklist",
      items: [
        "Abstract AI visuals",
        "Custom UI elements",
        "AI dashboard mockups",
        "The Thrift Work branded renders",
      ],
    },
  },
  {
    title: "Website Design & Development",
    description:
      "We build websites that don't just look great, they work hard. Clean UI, smooth UX, and tech that scales with you. From landing pages to full online stores, everything's designed to grow your brand and convert your traffic.",
    timeline: "3 – 5 weeks",
    panel: {
      type: "image",
      src: "/images/seen-product.png",
      alt: "Website design and branding showcase",
    },
  },
  {
    title: "Branding & UI/UX",
    description:
      "We build bold, strategic brands that break through the noise. From logos and visual identity to voice, guidelines, and rollout. Every detail's crafted to connect, convert, and leave a lasting impression.",
    timeline: "2 – 3 weeks",
    panel: {
      type: "image",
      src: "/images/bbf-product.png",
      alt: "Branding and UI/UX visual showcase",
    },
  },
  {
    title: "Digital Marketing",
    description:
      "We build marketing that moves the needle. From SEO, content, and paid ads to smart automation and CRM integration. Everything's shaped by real insights, tested for what works, and focused on results you can actually measure. Less guessing. More growing.",
    timeline: "2 – 3 weeks",
    panel: {
      type: "checklist",
      items: [
        "Real UI mockups",
        "Analytics dashboards",
        "Campaign performance cards",
        "The Thrift Work clean visuals",
      ],
    },
  },
  {
    title: "Software Development",
    description:
      "Transform your ideas into reality with cutting-edge software development. Our team combines creativity, technology, and strategy to deliver seamless digital experiences that help your business stay ahead.",
    timeline: "2 – 3 weeks",
    panel: {
      type: "image",
      src: "/images/curostrides-product.png",
      alt: "Software development and digital product visual",
    },
  },
];

export const trustBackground = {
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBGhMHL8TG5piVVi_oOGRB9f4_Qc4pQ1dPH5-CRqh5z4vvW71a4Uhspou2g-cWfNErp_Nd5uCocB-Ht-viTJkq_wY4drucwR_wMTJp_BT272j2QNS-9BQzkwAHNd4sHPyu1TYKDWEy7RdsWjaPUM_3tYM4R5uRGoifjGCMK4VnvLWWzfLzrUqbc-PJnaUVNfER0gmfEyF4T-EKVDbPo-IK4_2AwkFJ4SdpcuRxeyD52QXFRqEPNxvw",
  alt: "A grayscale high-resolution photograph of a modern, brutalist office space with a focused designer working at a dual-monitor setup. Sharp lighting, deep shadows, and a sophisticated professional atmosphere. The designer is blurred in the background, focusing on the architectural quality of the workspace.",
};

export const trustLogos: TrustLogo[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvV9-5WE7URkPP9TsseHpnvrEiz8kEmnyxlzByktg9mp30JLYn05S2RYt1OU0dUec5Z5w_aKIFqwsTkodSlO-8E67svIKlgHOeYgEKuaeq0Il8aNy8m2PbMjM5bwpbrgt-jTRb9_gD108nrbqDnglnO6gh9DvsDAuM1eO8qfyIjZd2I-YRiK0PCuU3m2jutUM2NeqfkOJ2_M_lzgcD_chMAwcU8FROGK0Y0oOzMUUBe_4zdYHyleYU",
    alt: "Logo of a high-end luxury fashion brand, minimalist and elegant, monochromatic.",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7hD4fcoJpaKdcxlqMMirf8SwJeTj6W4FqMSg8_881ffuW9pdMamSgJPJcGecSfsmcNnrwC40NY3VoDKwwgaBAAEu73Jf_Nw11TiiiBxsjrqQLIH1pE0nYRWQAjPj2TfRfWzdrVtfPsOqxIb3M3btHfEPbS0JCuHBICAAl-UTOyc-RBEsJ2YJPnKj53W_WZ6ba_h1R23D2Ov-xDtERawko2NgyOOfqitKDDQuzmMiLpDdNaBWdGLqI",
    alt: "Logo of a leading tech giant, clean sans-serif typography, monochromatic.",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABsTsJQ-Y45-mQ-8200Ze3tLARpGIVH1WiCyQH5TkSxPbUKflAnv-C5JigZEQOXL_KJ0Dqwm2BosVuadwEkT58ptBO-eqWu4qakBqAnCu3WOwm2b4mEqhNcQRoF8GrJCnhL2fiGf_78psJBC4g0Hzkz5McE7NNP7uS9snrWQnKymuY1IIY9IHAP1JLq6EMVAyMrQbz7UI42wv5VllLe-Q9rNTIerrZXn0UAuJqbxhGAQ-tQBFk08E9",
    alt: "Logo of a futuristic automotive company, sharp geometric mark, monochromatic.",
  },
];

export const contactInfo: ContactInfo[] = [
  {
    label: "New Projects",
    value: "hello@thethrift.work",
    href: "mailto:hello@thethrift.work",
  },
  {
    label: "Office",
    value: "Ahmedabad, Gujarat",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/thethrift.work/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thethrift.work/" },
  { label: "Twitter", href: "#" },
  { label: "Vimeo", href: "#" },
];

export const footerLegalLinks: SocialLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
