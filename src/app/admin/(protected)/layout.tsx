import * as React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
