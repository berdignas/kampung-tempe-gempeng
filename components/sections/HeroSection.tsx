import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  eyebrow: string;
  headline: string;
  subtext: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  imageSrc: string;
  imageAlt: string;
}

export default function HeroSection({
  eyebrow,
  headline,
  subtext,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 lg:pt-20 lg:pb-12 overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-label="Hero section"
    >
      {/* Background Soft Ambient Light */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-primary-soft)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-primary-soft)" }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 w-full my-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks & Aksi */}
          <div className="flex flex-col items-start text-left space-y-6">
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 shadow-2xs">
              <MapPin size={14} className="text-emerald-700 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold tracking-wide uppercase">{eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-slate-900 leading-[1.18] tracking-tight">
              {headline}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={ctaPrimaryHref}
                className="btn-primary shadow-md hover:shadow-lg transition-all text-sm px-6 sm:px-7 py-3 rounded-xl inline-flex items-center gap-2"
              >
                {ctaPrimaryLabel}
                <ArrowRight size={17} />
              </Link>
              <Link
                href={ctaSecondaryHref}
                className="btn-secondary text-sm px-6 sm:px-7 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all"
              >
                {ctaSecondaryLabel}
              </Link>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-slate-400 pt-1">
              Portal informasi resmi kawasan — bukan marketplace
            </p>
          </div>

          {/* Kolom Kanan: Gambar Hero Section (Ukuran dan styling disamakan persis dengan profil) */}
          <div className="relative w-full">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-card relative bg-slate-100">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
