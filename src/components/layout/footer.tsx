import * as React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from "lucide-react";
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
              Muzaffarpur&apos;s most trusted destination for verified, mechanic-inspected second-hand motorcycles and scooters. Complete paper transfer support provided.
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
                <Link href="/bikes?status=featured" className="hover:text-saffron-400 transition-colors">
                  Featured Vehicles
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-saffron-400 transition-colors">
                  Dealership Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Dealership Guarantee */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dealership Guarantee
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Verified RC, Insurance & Tax Papers Provided</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Engine & Mechanical Systems Tested</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Instant Inquiry via WhatsApp & Phone Call</span>
              </li>
            </ul>
          </div>

          {/* Dealership Location & Timings */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Visit Dealership
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>Gobarsahi Chowk, Muzaffarpur, Bihar, 842001</span>
              </div>
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
            <span>Built with trust for Muzaffarpur</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
