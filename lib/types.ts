export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type Avatar =
  | {
      src: string;
      alt: string;
      isPlaceholder?: false;
    }
  | {
      alt: string;
      isPlaceholder: true;
      src?: never;
    };

export type PortfolioProject = {
  title: string;
  category: string;
  image: string;
  alt: string;
  /** Intrinsic pixel size — keeps frame matched to the artwork */
  width: number;
  height: number;
  aspect?: "wide" | "square";
  badge?: string;
  offsetTop?: boolean;
  href?: string;
};

export type PortfolioCategory = {
  number: string;
  title: string;
  projects: PortfolioProject[];
};

export type Service = {
  title: string;
  description: string;
  timeline: string;
  panel:
    | { type: "checklist"; items: string[] }
    | { type: "image"; src: string; alt: string };
};

export type TrustLogo = {
  src: string;
  alt: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactInfo = {
  label: string;
  value: string;
  href?: string;
};
