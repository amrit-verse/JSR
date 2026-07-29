import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/shared/providers";
import { getBaseMetadata } from "@/lib/metadata";
import "./globals.css";

// =============================================================================
// Fonts
// =============================================================================

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// =============================================================================
// Metadata & Viewport
// =============================================================================

export const metadata: Metadata = getBaseMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfcfa" }, // Warm White
    { media: "(prefers-color-scheme: dark)", color: "#121212" },  // Dark Charcoal
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// =============================================================================
// Root Layout
// =============================================================================

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
        <Providers>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            theme="system" 
          />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
