"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bike, Heart, Scale, Phone, Info, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface MobileNavProps {
  favouritesCount?: number;
  compareCount?: number;
}

export function MobileNav({
  favouritesCount = 0,
  compareCount = 0,
}: MobileNavProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/bikes", label: "Inventory", icon: Bike },
    { href: "/favourites", label: "Favourites", icon: Heart, badge: favouritesCount },
    { href: "/compare", label: "Compare Bikes", icon: Scale, badge: compareCount },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 text-foreground cursor-pointer"
            aria-label="Open Navigation Menu"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <SheetHeader className="text-left border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-lg bg-saffron-500 flex items-center justify-center text-white font-heading font-bold text-lg shadow-sm">
                J
              </span>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base text-foreground leading-none">
                  Jay Shree Ram
                </span>
                <span className="text-xs text-saffron-600 font-semibold tracking-wider uppercase mt-1">
                  Bike Point
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-saffron-500/10 text-saffron-600 font-semibold dark:bg-saffron-500/20"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? "text-saffron-600" : "text-muted-foreground"}`} />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-saffron-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">Switch Theme</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
