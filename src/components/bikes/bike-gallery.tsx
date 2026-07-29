"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BikeGalleryProps {
  images: { url: string; publicId: string }[];
  title: string;
}

export function BikeGallery({ images, title }: BikeGalleryProps): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  // Swipe gesture tracking
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);

  const fallbackImage =
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200";

  const galleryImages =
    images.length > 0
      ? images
      : [{ url: fallbackImage, publicId: "fallback" }];

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation when in fullscreen
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Image
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="space-y-3">
      {/* Main Showcase Image */}
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black border border-border shadow-card group select-none cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={currentImage.url}
          alt={`${title} - Photo ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-300"
          onClick={() => setIsFullscreen(true)}
        />

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 z-10">
          {selectedIndex + 1} / {galleryImages.length}
        </div>

        {/* Fullscreen Trigger Button */}
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all z-10 cursor-pointer"
          aria-label="Expand image fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        {/* Previous / Next Arrows (on hover or touch) */}
        {galleryImages.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Scrollable Thumbnails Bar */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {galleryImages.map((img, index) => (
            <button
              key={img.publicId || index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                selectedIndex === index
                  ? "border-saffron-500 ring-2 ring-saffron-500/30 opacity-100 scale-105"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-sm font-semibold">
              {title} ({selectedIndex + 1} of {galleryImages.length})
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-10 w-10 rounded-full text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Fullscreen Image Container */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto my-auto overflow-hidden flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full max-h-[80vh]">
              <Image
                src={currentImage.url}
                alt={`${title} Fullscreen`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows in Fullscreen */}
            {galleryImages.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Bar in Fullscreen */}
          {galleryImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
              {galleryImages.map((img, index) => (
                <button
                  key={img.publicId || index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                    selectedIndex === index ? "border-saffron-500 ring-2 ring-saffron-500" : "border-transparent opacity-50"
                  }`}
                >
                  <Image src={img.url} alt="Thumb" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
