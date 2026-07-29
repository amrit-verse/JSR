import * as React from "react";

export const metadata = {
  title: "Privacy Policy | Jay Shree Ram Bike Point",
  description:
    "Privacy Policy for Jay Shree Ram Bike Point, Gobarsahi Chowk, Muzaffarpur, Bihar.",
};

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-6 max-w-3xl text-xs text-muted-foreground leading-relaxed">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Effective Date: {new Date().getFullYear()} • Jay Shree Ram Bike Point, Muzaffarpur
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">1. Information We Collect</h2>
        <p>
          Jay Shree Ram Bike Point collects basic contact information (such as your name, mobile number, and bike preferences) when you submit an inquiry form or initiate a WhatsApp/phone call with our dealership team at Gobarsahi Chowk, Muzaffarpur.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">2. How We Use Your Information</h2>
        <p>
          We use your contact details solely to respond to your motorcycle inquiry, schedule test rides, verify RC paper transfer requirements, and assist you with your purchase or sale at our showroom. We do not sell or share your personal data with third-party advertisers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">3. Vehicle Document Processing</h2>
        <p>
          For customers completing a vehicle transfer, required government identification and vehicle registration documents are handled strictly for state RTO paper transfer processing.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-heading font-bold text-foreground">4. Contact Us</h2>
        <p>
          If you have any questions regarding your data or privacy, visit us at Gobarsahi Chowk, Muzaffarpur, Bihar 842001 or call +91 99342 12567.
        </p>
      </section>
    </div>
  );
}
