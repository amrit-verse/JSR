import * as React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { Button } from "@/components/ui/button";
import { Bike, Plus, CheckCircle, XCircle, Star, ArrowRight } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage inventory and settings for Jay Shree Ram Bike Point.",
};

export default async function AdminDashboardPage(): Promise<React.JSX.Element> {
  const session = await auth();

  const [totalBikes, availableBikes, soldBikes, featuredBikes, recentBikes] =
    await Promise.all([
      db.bike.count(),
      db.bike.count({ where: { isSold: false } }),
      db.bike.count({ where: { isSold: true } }),
      db.bike.count({ where: { isFeatured: true, isSold: false } }),
      db.bike.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { images: { take: 1, orderBy: { order: "asc" } } },
      }),
    ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border shadow-card">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 dark:text-charcoal-50">
            Welcome back, {session?.user?.name || "Admin"}!
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Jay Shree Ram Bike Point • Muzaffarpur Admin Portal
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bikes/new">
            <Button className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>Add Bike</span>
            </Button>
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Total Inventory</span>
            <Bike className="h-5 w-5 text-saffron-500" />
          </div>
          <p className="text-3xl font-heading font-bold text-foreground">{totalBikes}</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Available Bikes</span>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-heading font-bold text-emerald-600 dark:text-emerald-400">
            {availableBikes}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Sold Vehicles</span>
            <XCircle className="h-5 w-5 text-rose-500" />
          </div>
          <p className="text-3xl font-heading font-bold text-rose-600 dark:text-rose-400">
            {soldBikes}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider">Featured Showcase</span>
            <Star className="h-5 w-5 text-gold-500 fill-current" />
          </div>
          <p className="text-3xl font-heading font-bold text-gold-600 dark:text-gold-400">
            {featuredBikes}/6
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-foreground">Recent Listings</h2>
          <Link href="/admin/bikes" className="text-xs font-semibold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
            <span>Manage All Bikes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentBikes.length > 0 ? (
          <div className="divide-y divide-border">
            {recentBikes.map((bike) => (
              <div key={bike.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-12 rounded-md bg-muted overflow-hidden relative shrink-0">
                    {bike.images[0]?.url && (
                      <img src={bike.images[0].url} alt={bike.model} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-foreground">
                      {bike.year} {bike.brand} {bike.model}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(bike.createdAt))}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-heading font-bold text-sm text-foreground">{formatPrice(bike.price)}</span>
                  <Link href={`/admin/bikes/${bike.id}/edit`}>
                    <Button variant="outline" size="xs" className="cursor-pointer">Edit</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground py-4">No bikes in database yet.</p>
        )}
      </div>
    </div>
  );
}
