"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delay={300}>
        {children}
      </TooltipProvider>
    </NextThemesProvider>
  );
}
