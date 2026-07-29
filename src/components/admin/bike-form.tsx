"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bikeCreateSchema, type BikeCreateInput } from "@/schemas/bike-schema";
import { createBikeAction, updateBikeAction } from "@/actions/bike-actions";
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader";
import { BIKE_BRANDS, FUEL_TYPE_LABELS, TRANSMISSION_LABELS, CONDITION_LABELS, OWNER_NUMBER_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";

interface BikeFormProps {
  initialData?: {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    engineCC: number;
    odometer: number;
    fuelType: string;
    transmission: string;
    condition: string;
    ownerNumber: string;
    colour: string;
    registrationNumber?: string | null;
    description: string;
    features: string[];
    isFeatured: boolean;
    rcAvailable: boolean;
    insuranceAvailable: boolean;
    taxPaid: boolean;
    images: { publicId: string; url: string; order: number }[];
  };
}

export function BikeForm({ initialData }: BikeFormProps): React.JSX.Element {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [featureInput, setFeatureInput] = React.useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BikeCreateInput>({
    resolver: zodResolver(bikeCreateSchema),
    defaultValues: {
      brand: (initialData?.brand as unknown as BikeCreateInput["brand"]) || "Hero",
      model: initialData?.model || "",
      year: initialData?.year || new Date().getFullYear(),
      price: initialData?.price || 50000,
      engineCC: initialData?.engineCC || 125,
      odometer: initialData?.odometer || 15000,
      fuelType: (initialData?.fuelType as unknown as BikeCreateInput["fuelType"]) || "PETROL",
      transmission: (initialData?.transmission as unknown as BikeCreateInput["transmission"]) || "MANUAL",
      condition: (initialData?.condition as unknown as BikeCreateInput["condition"]) || "EXCELLENT",
      ownerNumber: (initialData?.ownerNumber as unknown as BikeCreateInput["ownerNumber"]) || "FIRST",
      colour: initialData?.colour || "",
      registrationNumber: initialData?.registrationNumber || "",
      description: initialData?.description || "",
      features: initialData?.features || [],
      isFeatured: initialData?.isFeatured || false,
      rcAvailable: initialData?.rcAvailable ?? true,
      insuranceAvailable: initialData?.insuranceAvailable ?? true,
      taxPaid: initialData?.taxPaid ?? true,
      images: initialData?.images || [],
    },
  });

  const featuresList = watch("features") || [];

  const handleAddFeature = (): void => {
    const trimmed = featureInput.trim();
    if (trimmed && !featuresList.includes(trimmed)) {
      setValue("features", [...featuresList, trimmed]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (tag: string): void => {
    setValue(
      "features",
      featuresList.filter((f) => f !== tag)
    );
  };

  const onSubmit = async (data: BikeCreateInput): Promise<void> => {
    setIsSubmitting(true);
    try {
      if (isEditing && initialData?.id) {
        const result = await updateBikeAction(initialData.id, data);
        if (result.success) {
          toast.success("Bike updated successfully!");
          router.push("/admin/bikes");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update bike");
        }
      } else {
        const result = await createBikeAction(data);
        if (result.success) {
          toast.success("Bike created successfully!");
          router.push("/admin/bikes");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create bike");
        }
      }
    } catch (error) {
      console.error("Bike submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/bikes">
            <Button variant="outline" size="icon" className="h-9 w-9 border-border">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {isEditing ? "Edit Bike Listing" : "Add New Bike"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isEditing ? `Updating ${initialData.brand} ${initialData.model}` : "Fill in specs and photos to create listing"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/bikes">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold gap-2 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? "Saving..." : isEditing ? "Update Bike" : "Create Bike"}</span>
          </Button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Specs & Info) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photos Upload Section */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Vehicle Photos</CardTitle>
              <CardDescription>Upload high resolution photos of the bike.</CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value as UploadedImage[]}
                    onChange={field.onChange}
                    error={errors.images?.message}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* Basic Details Section */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Basic Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Brand */}
                <div className="space-y-2">
                  <Label htmlFor="brand">Manufacturer / Brand</Label>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {BIKE_BRANDS.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <Label htmlFor="model">Model Name</Label>
                  <Input
                    id="model"
                    placeholder="e.g. CB Shine, Pulsar 150"
                    {...register("model")}
                  />
                  {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year">Mfg Year</Label>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                  />
                  {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
                </div>

                {/* Colour */}
                <div className="space-y-2">
                  <Label htmlFor="colour">Colour</Label>
                  <Input id="colour" placeholder="e.g. Black, Red" {...register("colour")} />
                  {errors.colour && <p className="text-xs text-destructive">{errors.colour.message}</p>}
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration (Optional)</Label>
                  <Input id="registrationNumber" placeholder="e.g. BR 06 AB 1234" {...register("registrationNumber")} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specs & Pricing Section */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Specs & Price</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹ INR)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="500"
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                </div>

                {/* Engine CC */}
                <div className="space-y-2">
                  <Label htmlFor="engineCC">Engine CC</Label>
                  <Input
                    id="engineCC"
                    type="number"
                    {...register("engineCC", { valueAsNumber: true })}
                  />
                  {errors.engineCC && <p className="text-xs text-destructive">{errors.engineCC.message}</p>}
                </div>

                {/* Odometer */}
                <div className="space-y-2">
                  <Label htmlFor="odometer">Odometer (km)</Label>
                  <Input
                    id="odometer"
                    type="number"
                    {...register("odometer", { valueAsNumber: true })}
                  />
                  {errors.odometer && <p className="text-xs text-destructive">{errors.odometer.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fuel Type */}
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Controller
                    name="fuelType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="fuelType">
                          <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(FUEL_TYPE_LABELS).map(([val, lbl]) => (
                            <SelectItem key={val} value={val}>
                              {lbl}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Controller
                    name="transmission"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="transmission">
                          <SelectValue placeholder="Select Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TRANSMISSION_LABELS).map(([val, lbl]) => (
                            <SelectItem key={val} value={val}>
                              {lbl}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Condition */}
                <div className="space-y-2">
                  <Label htmlFor="condition">Bike Condition</Label>
                  <Controller
                    name="condition"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(CONDITION_LABELS).map(([val, lbl]) => (
                            <SelectItem key={val} value={val}>
                              {lbl}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Owner Number */}
                <div className="space-y-2">
                  <Label htmlFor="ownerNumber">Owner Number</Label>
                  <Controller
                    name="ownerNumber"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="ownerNumber">
                          <SelectValue placeholder="Select Owner Number" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(OWNER_NUMBER_LABELS).map(([val, lbl]) => (
                            <SelectItem key={val} value={val}>
                              {lbl}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description & Features Section */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Description & Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Provide details about mechanical condition, service history, and documents..."
                  {...register("description")}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              {/* Tag Features Input */}
              <div className="space-y-2">
                <Label>Key Highlights / Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Alloy Wheels, Tubeless Tyres"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" variant="secondary" onClick={handleAddFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {featuresList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuresList.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-saffron-500/10 text-saffron-600 font-medium"
                      >
                        <span>{tag}</span>
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => handleRemoveFeature(tag)}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Status & Document Switches) */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Listing Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Featured Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div className="space-y-0.5">
                  <Label htmlFor="isFeatured" className="font-semibold text-sm cursor-pointer">
                    Featured Bike
                  </Label>
                  <p className="text-xs text-muted-foreground">Display in homepage featured section (Max 6)</p>
                </div>
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Switch id="isFeatured" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-heading font-bold">Document Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* RC Available */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div className="space-y-0.5">
                  <Label htmlFor="rcAvailable" className="font-semibold text-sm cursor-pointer">
                    RC Available
                  </Label>
                  <p className="text-xs text-muted-foreground">Original Registration Certificate ready</p>
                </div>
                <Controller
                  name="rcAvailable"
                  control={control}
                  render={({ field }) => (
                    <Switch id="rcAvailable" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>

              {/* Insurance Available */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div className="space-y-0.5">
                  <Label htmlFor="insuranceAvailable" className="font-semibold text-sm cursor-pointer">
                    Active Insurance
                  </Label>
                  <p className="text-xs text-muted-foreground">Current insurance policy valid</p>
                </div>
                <Controller
                  name="insuranceAvailable"
                  control={control}
                  render={({ field }) => (
                    <Switch id="insuranceAvailable" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>

              {/* Tax Paid */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div className="space-y-0.5">
                  <Label htmlFor="taxPaid" className="font-semibold text-sm cursor-pointer">
                    Road Tax Paid
                  </Label>
                  <p className="text-xs text-muted-foreground">Road tax cleared till date</p>
                </div>
                <Controller
                  name="taxPaid"
                  control={control}
                  render={({ field }) => (
                    <Switch id="taxPaid" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-semibold gap-2 h-11 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Publish Bike"}</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
}
