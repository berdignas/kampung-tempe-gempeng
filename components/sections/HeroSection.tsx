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
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 lg:pt-48 lg:pb-40 overflow-hidden flex items-center justify-center min-h-[85vh]"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-label="Hero section"
    >
      {/* Background Image with Transparency */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-20 filter brightness-95"
          priority
          sizes="100vw"
        />
        {/* Soft Multi-stop Gradient Overlays for High Legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(247,250,248,0.75) 0%, rgba(247,250,248,0.95) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-background) 0%, transparent 20%, transparent 80%, var(--color-background) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hero Content (Centered: Eyebrow, Headline, Subtext, CTA) */}
      <div className="container-content relative z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 backdrop-blur-xs shadow-2xs">
            <MapPin size={14} className="text-emerald-700 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide uppercase">{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="heading-1 text-slate-900 leading-[1.15] tracking-tight">
            {headline}
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
            {subtext}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href={ctaPrimaryHref}
              className="btn-primary shadow-md hover:shadow-lg transition-all text-sm px-7 py-3 rounded-xl"
            >
              {ctaPrimaryLabel}
              <ArrowRight size={17} />
            </Link>
            <Link
              href={ctaSecondaryHref}
              className="btn-secondary text-sm px-7 py-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-xs border border-slate-200 shadow-2xs"
            >
              {ctaSecondaryLabel}
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="text-xs text-slate-500 mt-2">
            Portal informasi resmi kawasan — bukan marketplace
          </p>
        </div>
      </div>
    </section>
  );
}
