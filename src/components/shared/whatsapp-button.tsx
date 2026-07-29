"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface FloatingWhatsAppProps {
  phone?: string;
}

export function FloatingWhatsAppButton({
  phone = "+919934212567",
}: FloatingWhatsAppProps): React.JSX.Element {
  const waUrl = getWhatsAppUrl(
    phone,
    "Hello Jay Shree Ram Bike Point, I am visiting your website and would like to inquire about available second-hand bikes."
  );

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="sr-only">Contact on WhatsApp</span>

      {/* Pulsing ring effect */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />
    </a>
  );
}
