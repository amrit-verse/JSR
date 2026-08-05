import * as React from "react";

export const metadata = {
  title: "Contact Us | Jai Shree Ram Bike Point — Sipahpur, Muzaffarpur",
  description:
    "Contact Jai Shree Ram Bike Point at Imamganj Naka, Sipahpur, Muzaffarpur. Call +91 62037 77760, WhatsApp inquiry, or visit our showroom. Mon–Sat 9 AM–7 PM.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
