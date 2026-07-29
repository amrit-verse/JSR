import * as React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-charcoal-900 text-charcoal-100 border-t border-charcoal-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-saffron-500 flex items-center justify-center text-white font-heading font-bold text-xl shadow-md">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  Jay Shree Ram
                </span>
                <span className="text-xs text-saffron-400 font-semibold tracking-widest uppercase">
                  Bike Point
                </span>
              </div>
            </div>
            <p className="text-xs text-charcoal-400 leading-relaxed">
              Muzaffarpur&apos;s most trusted dealer for quality second-hand motorcycles and scooters. Certified bikes, transparent pricing, and instant ownership transfer.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gold-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Verified Quality Second-Hand Bikes</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li>
                <Link href="/bikes" className="hover:text-saffron-400 transition-colors">
                  Browse All Bikes
                </Link>
              </li>
              <li>
                <Link href="/bikes?featured=true" className="hover:text-saffron-400 transition-colors">
                  Featured Vehicles
                </Link>
              </li>
              <li>
                <Link href="/favourites" className="hover:text-saffron-400 transition-colors">
                  My Favourites List
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-saffron-400 transition-colors">
                  Bike Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-saffron-400 transition-colors">
                  About Our Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Visit & Contact
            </h3>
            <ul className="space-y-3 text-xs text-charcoal-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Gobarsahi Chowk, Muzaffarpur, Bihar, 842001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-saffron-500 shrink-0" />
                <a href="tel:+919934212567" className="hover:text-saffron-400 transition-colors">
                  +91 99342 12567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919934212567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Admin Access */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Shop Timings
            </h3>
            <div className="space-y-2 text-xs text-charcoal-300">
              <div className="flex items-center gap-2 text-gold-400 font-medium">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:30 PM</span>
              </div>
              <p className="text-charcoal-400">Sunday: Closed / Appointment Only</p>
            </div>
            <div className="pt-4 border-t border-charcoal-800">
              <Link href="/admin/login" className="block w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-charcoal-700 bg-charcoal-800 text-charcoal-200 hover:bg-charcoal-700 hover:text-white"
                >
                  Owner Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>© {new Date().getFullYear()} Jay Shree Ram Bike Point. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-charcoal-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-charcoal-200 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
