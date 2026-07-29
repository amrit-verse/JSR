import * as React from "react";
import { getAdminBikes } from "@/actions/bike-actions";
import { BikeTable } from "@/components/admin/bike-table";

export const metadata = {
  title: "Admin Inventory — Bike CRUD",
  description: "Manage vehicle inventory for Jay Shree Ram Bike Point.",
};

interface AdminBikesPageProps {
  searchParams: Promise<{
    query?: string;
    brand?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function AdminBikesPage({
  searchParams,
}: AdminBikesPageProps): Promise<React.JSX.Element> {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);

  const data = await getAdminBikes({
    query: resolvedParams.query,
    brand: resolvedParams.brand,
    status: resolvedParams.status,
    page,
  });

  return (
    <div className="space-y-6">
      <BikeTable
        bikes={data.bikes}
        total={data.total}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
      />
    </div>
  );
}
