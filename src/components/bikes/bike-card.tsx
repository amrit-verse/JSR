"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Gauge, Calendar, ShieldCheck, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  formatOdometer,
  formatEngineCC,
  getWhatsAppUrl,
  isWithinDays,
} from "@/lib/utils";
import {
  CONDITION_LABELS,
  OWNER_NUMBER_LABELS,
  NEW_BIKE_DAYS,
  getWhatsAppMessage,
} from "@/lib/constants";
import { getOptimizedCloudinaryUrl, BLUR_IMAGE_DATA_URL } from "@/lib/cloudinary-utils";

export interface BikeCardData {
  id: string;
  slug: string;
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
  isSold: boolean;
  isFeatured: boolean;
  createdAt: Date | string;
  images: { url: string; publicId: string }[];
}

interface BikeCardProps {
  bike: BikeCardData;
  whatsappNumber?: string;
}

export function BikeCard({
  bike,
  whatsappNumber = "+919934212567",
}: BikeCardProps): React.JSX.Element {
  const isNew = isWithinDays(new Date(bike.createdAt), NEW_BIKE_DAYS);
  const rawCover =
    bike.images[0]?.url ||
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800";
  
  const coverImage = getOptimizedCloudinaryUrl(rawCover, { width: 800, quality: "auto" });

  const waMessage = getWhatsAppMessage(
    `${bike.year} ${bike.brand} ${bike.model}`,
    formatPrice(bike.price)
  );
  const waUrl = getWhatsAppUrl(whatsappNumber, waMessage);

  return (
    <Card className="group overflow-hidden rounded-2xl border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={coverImage}
          alt={`${bike.year} ${bike.brand} ${bike.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_IMAGE_DATA_URL}
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80" />

        {/* Top Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {bike.isSold ? (
            <Badge variant="destructive" className="font-bold text-xs px-2.5 py-0.5 shadow-sm">
              SOLD
            </Badge>
          ) : (
            <>
              {bike.isFeatured && (
                <Badge className="bg-gold-500 text-charcoal-950 font-bold text-xs px-2.5 py-0.5 shadow-sm border-none">
                  FEATURED
                </Badge>
              )}
              {isNew && (
                <Badge className="bg-saffron-500 text-white font-bold text-xs px-2.5 py-0.5 shadow-sm border-none">
                  NEW ARRIVAL
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Price Tag Overlay on Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white">
          <span className="font-heading font-extrabold text-xl sm:text-2xl drop-shadow-md text-white">
            {formatPrice(bike.price)}
          </span>
          <span className="text-[11px] font-semibold bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
            {bike.colour}
          </span>
        </div>
      </div>

      {/* Card Content & Specifications */}
      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <Link href={`/bikes/${bike.slug}`} className="block group-hover:text-saffron-600 transition-colors">
            <h3 className="font-heading font-bold text-base sm:text-lg text-foreground line-clamp-1">
              {bike.year} {bike.brand} {bike.model}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3 text-saffron-500 shrink-0" />
            <span>Jay Shree Ram Bike Point • Gobarsahi Chowk</span>
          </p>
        </div>

        {/* Specs Grid Chips */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1.5 rounded-lg">
            <Gauge className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
            <span className="truncate">{formatOdometer(bike.odometer)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1.5 rounded-lg">
            <Calendar className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
            <span>{formatEngineCC(bike.engineCC)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1.5 rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
            <span className="truncate">{CONDITION_LABELS[bike.condition] || bike.condition}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1.5 rounded-lg">
            <span className="font-bold text-saffron-500 text-[11px]">#</span>
            <span className="truncate">{OWNER_NUMBER_LABELS[bike.ownerNumber] || bike.ownerNumber}</span>
          </div>
        </div>
      </CardContent>

      {/* Card Footer Actions */}
      <CardFooter className="p-4 sm:p-5 pt-0 gap-2">
        <Link href={`/bikes/${bike.slug}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full font-semibold border-border hover:bg-muted cursor-pointer"
          >
            View Specs
          </Button>
        </Link>

        {!bike.isSold && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5 shadow-sm cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-current shrink-0" />
              <span className="truncate">Enquire on WhatsApp</span>
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
