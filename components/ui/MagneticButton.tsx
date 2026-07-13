"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function MagneticButton({
  children,
  className,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useMagneticEffect<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type={type}
      className={cn("magnetic-button will-change-transform", className)}
      {...props}
    >
      {children}
    </button>
  );
}
