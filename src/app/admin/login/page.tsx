import * as React from "react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login",
  description: "Secure login for Jay Shree Ram Bike Point admin dashboard.",
};

export default function AdminLoginPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-warm-50 dark:bg-charcoal-950 transition-colors duration-300">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Visual Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-heading text-2xl font-bold shadow-md shadow-primary/20">
            J
          </div>
          <h1 className="text-xl font-heading font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-wide mt-2">
            Jay Shree Ram Bike Point
          </h1>
          <p className="text-xs text-muted-foreground">
            Muzaffarpur, Bihar
          </p>
        </div>

        {/* LoginForm Container */}
        <LoginForm />

        {/* Footer info */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jay Shree Ram Bike Point. All rights reserved.
        </p>
      </div>
    </div>
  );
}
