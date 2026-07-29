"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Scale, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  favouritesCount?: number;
  compareCount?: number;
}

export function Header({
  favouritesCount = 0,
  compareCount = 0,
}: HeaderProps): React.JSX.Element {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bikes", label: "Inventory" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-background border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-saffron-500 flex items-center justify-center text-white font-heading font-bold text-xl shadow-md shadow-saffron-500/25 group-hover:scale-105 transition-transform">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg sm:text-xl text-charcoal-900 dark:text-charcoal-50 tracking-tight leading-none group-hover:text-saffron-600 transition-colors">
              Jay Shree Ram
            </span>
            <span className="text-[10px] sm:text-xs text-saffron-600 dark:text-saffron-400 font-semibold tracking-widest uppercase mt-0.5">
              Bike Point • Muzaffarpur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-saffron-600 bg-saffron-500/10 dark:bg-saffron-500/20"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favourites Badge Link */}
          <Link href="/favourites" className="relative hidden sm:inline-flex">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-border bg-background hover:bg-muted"
              aria-label="Favourites"
            >
              <Heart className="h-4 w-4 text-saffron-500" />
            </Button>
            {favouritesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-saffron-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favouritesCount}
              </span>
            )}
          </Link>

          {/* Compare Badge Link */}
          <Link href="/compare" className="relative hidden sm:inline-flex">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-border bg-background hover:bg-muted"
              aria-label="Compare Bikes"
            >
              <Scale className="h-4 w-4 text-charcoal-600 dark:text-gold-400" />
            </Button>
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-charcoal-800 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {compareCount}
              </span>
            )}
          </Link>

          {/* Call Quick Action */}
          <a href="tel:+919934212567">
            <Button
              size="sm"
              className="hidden lg:inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-semibold rounded-lg shadow-sm gap-1.5 cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 fill-current" />
              <span>Call Now</span>
            </Button>
          </a>

          {/* Dark Mode Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Drawer */}
          <MobileNav
            favouritesCount={favouritesCount}
            compareCount={compareCount}
          />
        </div>
      </div>
    </header>
  );
}
