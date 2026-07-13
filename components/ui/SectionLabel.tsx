import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-label-mono text-label-mono text-primary uppercase mb-5 block tracking-[0.14em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
