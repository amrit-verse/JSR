import * as React from "react";
import { BikeForm } from "@/components/admin/bike-form";

export const metadata = {
  title: "Add New Bike — Admin",
  description: "Create a new vehicle listing for Jay Shree Ram Bike Point.",
};

export default function NewBikePage(): React.JSX.Element {
  return (
    <div className="py-6">
      <BikeForm />
    </div>
  );
}
