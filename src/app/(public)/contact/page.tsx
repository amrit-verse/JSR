import * as React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us | Jay Shree Ram Bike Point — Muzaffarpur",
  description:
    "Visit or call Jay Shree Ram Bike Point at Gobarsahi Chowk, Muzaffarpur, Bihar. Phone: +91 99342 12567. Instant WhatsApp inquiries and store directions.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10 max-w-5xl">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400 font-mono">
          Dealership Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
          Contact Jay Shree Ram Bike Point
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Have a question about a bike, paper transfer, or want to schedule a test ride? Call or visit us directly at Gobarsahi Chowk, Muzaffarpur.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards & Quick Inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Dealership Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-5">
            <h2 className="font-heading font-bold text-lg text-foreground border-b border-border pb-3">
              Direct Dealership Contacts
            </h2>

            {/* Phone Call Card */}
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone Call
                </span>
                <p className="font-heading font-bold text-sm text-foreground">
                  +91 99342 12567
                </p>
                <a href="tel:+919934212567" className="inline-block pt-1">
                  <Button size="xs" className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-1">
                    <Phone className="h-3 w-3" />
                    <span>Call Now</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  WhatsApp Support
                </span>
                <p className="font-heading font-bold text-sm text-foreground">
                  +91 99342 12567
                </p>
                <a
                  href="https://wa.me/919934212567?text=Hello%20Jay%20Shree%20Ram%20Bike%20Point%2C%20I%20have%20an%20inquiry%20about%20your%20bikes."
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

            {/* Location Card */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Showroom Address
                </span>
                <p className="font-heading font-bold text-xs text-foreground leading-snug">
                  Gobarsahi Chowk, Muzaffarpur, Bihar 842001
                </p>
                <a
                  href="https://maps.google.com/?q=Gobarsahi+Chowk,+Muzaffarpur,+Bihar+842001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-saffron-600 dark:text-saffron-400 font-bold pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Timings Card */}
            <div className="flex items-start gap-3.5 border-t border-border pt-4">
              <div className="h-10 w-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Opening Hours
                </span>
                <p className="font-heading font-bold text-xs text-foreground">
                  Mon – Sat: 9:00 AM – 7:30 PM
                </p>
                <p className="text-[11px] text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Showroom Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-card space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-xl text-foreground">
                Send Direct Message
              </h2>
              <p className="text-xs text-muted-foreground">
                Fill out your requirement and our dealership team will get back to you shortly.
              </p>
            </div>

            <form
              action={`https://wa.me/919934212567`}
              target="_blank"
              className="space-y-4 text-xs font-medium"
            >
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-foreground font-semibold">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-foreground font-semibold">Mobile Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="bikeNeeded" className="text-foreground font-semibold">Bike / Budget Requirement</label>
                <input
                  id="bikeNeeded"
                  type="text"
                  placeholder="e.g. Hero Splendor under 50,000 or Honda Activa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-foreground font-semibold">Additional Message</label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Write any specific question regarding RC transfer, condition, or visit timing..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold h-11 rounded-xl gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry via WhatsApp</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
