import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsAppButton } from "@/components/shared/whatsapp-button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-saffron-500/20 selection:text-saffron-600">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
