import * as React from "react";

export const metadata = {
  title: "Terms & RC Guidelines | Jai Shree Ram Bike Point",
  description:
    "Dealership terms, paper transfer guidelines, and purchase conditions for Jai Shree Ram Bike Point, Sipahpur, Muzaffarpur.",
};

export default function TermsPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-6 max-w-3xl text-xs text-muted-foreground leading-relaxed">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
          Terms & Registration Transfer Guidelines
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Jai Shree Ram Bike Point • No-04, Imamganj Naka, Sipahpur, Bihar 842001
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">1. Vehicle Inspection & Sale Terms</h2>
        <p>
          All pre-owned motorcycles and scooters displayed at Jai Shree Ram Bike Point are sold following physical mechanic inspection and test ride at our Sipahpur showroom. Prices listed on the website are indicative and confirmed upon in-person vehicle inspection.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">2. Document & RC Transfer Support</h2>
        <p>
          We assist buyers with complete Registration Certificate (RC) paper transfer requirements. Buyers are required to submit valid Aadhaar / address proof and complete necessary RTO signatures as per Bihar state transport guidelines.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">3. Payment & Delivery</h2>
        <p>
          Full vehicle payment and document verification must be completed prior to taking delivery of the vehicle from our showroom.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">4. Contact Information</h2>
        <p>
          For any clarifications regarding dealership terms or document status, contact us at No-04, Imamganj, Naka, Sipahpur, Bihar 842001 or call +91 62037 77760.
        </p>
      </section>
    </div>
  );
}
