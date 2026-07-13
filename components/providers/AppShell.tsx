"use client";

import { Cursor } from "@/components/Cursor";
import { NoiseBackground } from "@/components/NoiseBackground";
import { PageTransition } from "@/components/providers/PageTransition";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Cursor />
      <NoiseBackground />
      <PageTransition>{children}</PageTransition>
    </SmoothScrollProvider>
  );
}
