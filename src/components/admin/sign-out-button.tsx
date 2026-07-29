"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function SignOutButton(): React.JSX.Element {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/admin/login" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoggingOut}
      onClick={handleSignOut}
      className="gap-2 border-border hover:bg-muted font-semibold text-charcoal-700 dark:text-charcoal-300"
    >
      <LogOut className="h-4 w-4" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
