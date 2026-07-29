"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Send } from "lucide-react";

export const dynamic = "force-static";

const MAPS_URL =
  "https://www.google.com/maps/place/JAI+SHREE+RAM+BIKE+POINT/@26.155375,85.4114003,17z";
const PHONE = "+916203777760";
const PHONE_DISPLAY = "+91 62037 77760";

export default function ContactPage(): React.JSX.Element {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [bikeNeeded, setBikeNeeded] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const parts = [
      `Hello Jai Shree Ram Bike Point,`,
      ``,
      `Name: ${name || "Not provided"}`,
      `Mobile: ${phone || "Not provided"}`,
      bikeNeeded ? `Bike / Budget: ${bikeNeeded}` : null,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(parts)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10 max-w-5xl">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 font-mono">
          Dealership Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
          Contact Jai Shree Ram Bike Point
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Have a question about a bike, paper transfer, or want to schedule a test ride? Call or visit us at Imamganj Naka, Sipahpur, Muzaffarpur.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-5">
            <h2 className="font-heading font-bold text-lg text-foreground border-b border-border pb-3">
              Direct Dealership Contacts
            </h2>

            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Call</span>
                <p className="font-heading font-bold text-sm text-foreground">{PHONE_DISPLAY}</p>
                <a href={`tel:${PHONE}`} className="inline-block pt-1">
                  <Button size="xs" className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-1">
                    <Phone className="h-3 w-3" />
                    <span>Call Now</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">WhatsApp</span>
                <p className="font-heading font-bold text-sm text-foreground">{PHONE_DISPLAY}</p>
                <a
                  href={`https://wa.me/${PHONE.replace("+", "")}?text=Hello%20Jai%20Shree%20Ram%20Bike%20Point%2C%20I%20have%20an%20inquiry%20about%20your%20bikes.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1"
                >
                  <Button size="xs" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>Chat on WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Showroom Address</span>
                <p className="font-heading font-bold text-xs text-foreground leading-snug">
                  No-04, Imamganj, Naka, Sipahpur, Bihar 842001
                </p>
                <p className="text-[11px] text-muted-foreground">Located in: Radha Hari Motors First Choice</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-saffron-600 dark:text-saffron-400 font-bold pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Opening Hours</span>
                <p className="font-heading font-bold text-xs text-foreground">Mon – Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-card space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-xl text-foreground">
                Send Inquiry via WhatsApp
              </h2>
              <p className="text-xs text-muted-foreground">
                Fill in your details below. Your message will be sent directly to our WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-foreground font-semibold">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className="text-foreground font-semibold">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-bike" className="text-foreground font-semibold">
                  Bike / Budget Requirement
                </label>
                <input
                  id="contact-bike"
                  type="text"
                  value={bikeNeeded}
                  onChange={(e) => setBikeNeeded(e.target.value)}
                  placeholder="e.g. Hero Splendor under ₹50,000 or Honda Activa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-foreground font-semibold">
                  Additional Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any question about RC transfer, bike condition, or visit timing..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Send via WhatsApp</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
