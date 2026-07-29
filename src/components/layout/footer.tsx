import * as React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-charcoal-950 text-charcoal-300 border-t border-charcoal-800 mt-auto">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Dealership Info & Branding */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-500 font-mono">
                Gobarsahi Chowk, Muzaffarpur
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Jay Shree Ram Bike Point
              </h3>
            </div>
            <p className="text-xs text-charcoal-400 leading-relaxed">
              Muzaffarpur&apos;s trusted destination for verified, mechanic-inspected second-hand motorcycles and scooters. Complete paper transfer support provided.
            </p>
            <div className="pt-2">
              <a href="tel:+919934212567">
                <Button
                  size="sm"
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold gap-2 rounded-xl"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +91 99342 12567</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-saffron-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="hover:text-saffron-400 transition-colors">
                  Browse All Inventory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-saffron-400 transition-colors">
                  About Dealership
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-saffron-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-saffron-400 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Trust & Policies */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Customer Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/favourites" className="hover:text-saffron-400 transition-colors">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-saffron-400 transition-colors">
                  Compare Bikes
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-saffron-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-saffron-400 transition-colors">
                  Terms & RC Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Dealership Location & Timings */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Visit Showroom
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://maps.google.com/?q=Gobarsahi+Chowk,+Muzaffarpur,+Bihar+842001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-saffron-400 transition-colors group"
              >
                <MapPin className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">Gobarsahi Chowk, Muzaffarpur, Bihar 842001</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-saffron-500 font-bold mt-1">
                    Open Google Maps <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </a>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM (Sun: Closed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-charcoal-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Jay Shree Ram Bike Point. All rights reserved.</p>
          <div className="flex items-center gap-1 text-charcoal-400">
            <span>Gobarsahi Chowk • Muzaffarpur</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
