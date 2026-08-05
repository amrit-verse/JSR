import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBikeBySlug } from "@/actions/bike-actions";
import { BikeGallery } from "@/components/bikes/bike-gallery";
import { EmiCalculator } from "@/components/bikes/emi-calculator";
import { BikeCard } from "@/components/bikes/bike-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  formatOdometer,
  formatEngineCC,
  getWhatsAppUrl,
} from "@/lib/utils";
import {
  CONDITION_LABELS,
  OWNER_NUMBER_LABELS,
  getWhatsAppMessage,
} from "@/lib/constants";
import { getBikeJsonLd } from "@/lib/metadata";
import {
  ChevronRight,
  MessageCircle,
  PhoneCall,
  MapPin,
  CheckCircle,
  XCircle,
  FileCheck,
  ShieldCheck,
  Award,
  Calendar,
  Gauge,
  Sparkles,
} from "lucide-react";

interface BikeDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BikeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { bike } = await getPublicBikeBySlug(slug);

  if (!bike) {
    return {
      title: "Bike Not Found | Jai Shree Ram Bike Point",
    };
  }

  const title = `${bike.year} ${bike.brand} ${bike.model} for Sale in Muzaffarpur — ${formatPrice(bike.price)}`;
  const description = `Buy inspected ${bike.year} ${bike.brand} ${bike.model} at Jai Shree Ram Bike Point, Sipahpur. Price: ${formatPrice(bike.price)}, Odometer: ${formatOdometer(bike.odometer)}, Condition: ${CONDITION_LABELS[bike.condition] || bike.condition}. Instant RC Transfer.`;

  const mainImage = bike.images[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: mainImage ? [{ url: mainImage }] : [],
    },
  };
}

export default async function BikeDetailPage({
  params,
}: BikeDetailPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const { bike, similarBikes } = await getPublicBikeBySlug(slug);

  if (!bike) {
    notFound();
  }

  const title = `${bike.year} ${bike.brand} ${bike.model}`;
  const whatsappMsg = getWhatsAppMessage(title, formatPrice(bike.price));
  const whatsappUrl = getWhatsAppUrl("+916203777760", whatsappMsg);

  const bikeJsonLd = getBikeJsonLd(bike);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bikeJsonLd) }}
      />
      {/* 10. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/bikes" className="hover:text-foreground transition-colors">
          Inventory
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <BikeGallery images={bike.images} title={title} />
        </div>

        {/* Right Column: Key Summary & CTAs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 6. Important Bike Information BEFORE full specs */}
          <div className="space-y-4 p-6 rounded-2xl bg-card border border-border shadow-card">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {bike.isSold ? (
                <Badge variant="destructive" className="font-bold text-xs">
                  SOLD OUT
                </Badge>
              ) : (
                <Badge className="bg-emerald-600 text-white font-bold text-xs gap-1 border-none">
                  <CheckCircle className="h-3 w-3" />
                  AVAILABLE FOR PURCHASE
                </Badge>
              )}
              {bike.isFeatured && (
                <Badge className="bg-gold-500 text-charcoal-950 font-bold text-xs border-none">
                  FEATURED SHOWCASE
                </Badge>
              )}
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
                {title}
              </h1>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
                <span>Jai Shree Ram Bike Point • Sipahpur, Muzaffarpur</span>
              </p>
            </div>

            {/* Highlighted Price */}
            <div className="pt-2 pb-1 border-y border-border flex items-baseline justify-between">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                  Fixed Dealership Price
                </span>
                <p className="text-3xl sm:text-4xl font-heading font-extrabold text-saffron-600 dark:text-saffron-400">
                  {formatPrice(bike.price)}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground">
                Colour: {bike.colour}
              </span>
            </div>

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                <Gauge className="h-5 w-5 text-saffron-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Odometer</p>
                  <p className="text-xs font-bold text-foreground">{formatOdometer(bike.odometer)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                <Calendar className="h-5 w-5 text-saffron-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Engine Displacement</p>
                  <p className="text-xs font-bold text-foreground">{formatEngineCC(bike.engineCC)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                <Award className="h-5 w-5 text-saffron-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Condition</p>
                  <p className="text-xs font-bold text-foreground">
                    {CONDITION_LABELS[bike.condition] || bike.condition}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                <Sparkles className="h-5 w-5 text-saffron-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold">Ownership</p>
                  <p className="text-xs font-bold text-foreground">
                    {OWNER_NUMBER_LABELS[bike.ownerNumber] || bike.ownerNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Primary CTA renamed to Enquire on WhatsApp / Check Availability */}
            {!bike.isSold && (
              <div className="space-y-2.5 pt-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer">
                    <MessageCircle className="h-5 w-5 fill-current shrink-0" />
                    <span>Enquire on WhatsApp</span>
                  </Button>
                </a>

                <a href="tel:+916203777760" className="block">
                  <Button variant="outline" className="w-full h-11 border-border font-semibold rounded-xl gap-2 cursor-pointer">
                    <PhoneCall className="h-4 w-4 text-saffron-500" />
                    <span>Check Availability via Phone</span>
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* Verified Document Availability Status */}
          <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-saffron-500" />
              <span>Document Verification</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/40">
                {bike.rcAvailable ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                )}
                <span className="font-semibold">RC Book</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/40">
                {bike.insuranceAvailable ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                )}
                <span className="font-semibold">Insurance</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-muted/40">
                {bike.taxPaid ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                )}
                <span className="font-semibold">Tax Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Features Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-card space-y-4">
            <h2 className="text-lg font-heading font-bold text-foreground border-b border-border pb-3">
              Full Vehicle Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-bold text-foreground">{bike.brand}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Model</span>
                <span className="font-bold text-foreground">{bike.model}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Manufacturing Year</span>
                <span className="font-bold text-foreground">{bike.year}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Engine Displacement</span>
                <span className="font-bold text-foreground">{formatEngineCC(bike.engineCC)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Kilometers Driven</span>
                <span className="font-bold text-foreground">{formatOdometer(bike.odometer)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Fuel Type</span>
                <span className="font-bold text-foreground uppercase">{bike.fuelType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Transmission</span>
                <span className="font-bold text-foreground capitalize">{bike.transmission}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Registration Number</span>
                <span className="font-mono font-bold text-foreground">
                  {bike.registrationNumber || "Available on Request"}
                </span>
              </div>
            </div>

            {/* Description */}
            {bike.description && (
              <div className="pt-4 border-t border-border space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Dealer Description & Condition Notes
                </h3>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {bike.description}
                </p>
              </div>
            )}

            {/* Features Tags */}
            {bike.features.length > 0 && (
              <div className="pt-4 border-t border-border space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Key Features & Equipment
                </h3>
                <div className="flex flex-wrap gap-2">
                  {bike.features.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 border border-saffron-500/20"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 9. Interactive Simple EMI Calculator */}
        <div className="lg:col-span-5">
          <EmiCalculator bikePrice={bike.price} bikeModel={title} />
        </div>
      </div>

      {/* Similar Bikes Recommendation */}
      {similarBikes.length > 0 && (
        <section className="space-y-6 border-t border-border pt-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">
                Similar Options
              </span>
              <h2 className="text-2xl font-heading font-bold text-foreground mt-0.5">
                Bikes You Might Also Like
              </h2>
            </div>
            <Link href="/bikes" className="text-sm font-semibold text-saffron-600 hover:text-saffron-700">
              View All Inventory
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarBikes.map((sb) => (
              <BikeCard key={sb.id} bike={sb} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
