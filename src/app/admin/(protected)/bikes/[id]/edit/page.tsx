import * as React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BikeForm } from "@/components/admin/bike-form";

export const metadata = {
  title: "Edit Bike — Admin",
  description: "Edit vehicle specs and photos.",
};

interface EditBikePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBikePage({
  params,
}: EditBikePageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const bike = await db.bike.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!bike) {
    notFound();
  }

  return (
    <div className="py-6">
      <BikeForm initialData={bike} />
    </div>
  );
}
