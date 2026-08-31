"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, Package } from "lucide-react";

interface UMKMGalleryCarouselProps {
  images: string[];
  namaUsaha: string;
  autoPlayInterval?: number;
  heightClass?: string;
  badgeLabel?: string;
}

export default function UMKMGalleryCarousel({
  images,
  namaUsaha,
  autoPlayInterval = 4000,
  heightClass = "h-[320px] sm:h-[360px] md:h-[380px]",
  badgeLabel = "Foto Produk & Galeri",
}: UMKMGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = images.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto slide interval
  useEffect(() => {
    if (total <= 1 || isPaused || lightboxOpen) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, lightboxOpen, autoPlayInterval, goToNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % total);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + total) % total);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, total]);

  if (!images || images.length === 0) {
    return null;
  }

  // If only 1 image, display simple card without carousel controls
  if (total === 1) {
    return (
      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-card group bg-slate-900 select-none`}>
        <Image
          src={images[0]}
          alt={`Foto galeri ${namaUsaha} 1`}
          fill
          className="object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 60vw"
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
        />

        {/* Badge Pembeda */}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
          <Package size={13} className="text-amber-400" />
          <span>{badgeLabel}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs"
          aria-label="Lihat ukuran penuh"
        >
          <Maximize2 size={15} />
        </button>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Tutup pratinjau"
            >
              <X size={22} />
            </button>
            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[0]}
                alt={`Foto galeri ${namaUsaha}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-card group bg-slate-900 select-none`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Galeri foto ${namaUsaha}`}
      >
        {/* Slides Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative min-w-full h-full cursor-pointer"
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={img}
                alt={`Foto galeri ${namaUsaha} ${i + 1}`}
                fill
                className="object-cover hover:scale-102 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Badge Pembeda */}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
          <Package size={13} className="text-amber-400" />
          <span>{badgeLabel}</span>
        </div>

        {/* Counter Badge */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium tracking-wide flex items-center gap-1 shadow-2xs pointer-events-none">
          <span>{currentIndex + 1}</span>
          <span className="opacity-60">/</span>
          <span>{total}</span>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => {
            setLightboxIndex(currentIndex);
            setLightboxOpen(true);
          }}
          className="absolute bottom-3.5 right-3.5 z-10 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-2xs"
          aria-label="Perbesar foto"
        >
          <Maximize2 size={15} />
        </button>

        {/* Navigation Buttons (Left & Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
          aria-label="Foto berikutnya"
        >
          <ChevronRight size={20} />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md shadow-md">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 bg-primary shadow-xs"
                  : "w-2 bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Pindah ke foto ${idx + 1}`}
              aria-current={currentIndex === idx ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-20"
            aria-label="Tutup pratinjau"
          >
            <X size={24} />
          </button>

          {/* Lightbox counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium z-20">
            Foto {lightboxIndex + 1} dari {total}
          </div>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + total) % total);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-20"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Foto galeri ${namaUsaha} ${lightboxIndex + 1}`}
              fill
              className="object-contain select-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % total);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-20"
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
