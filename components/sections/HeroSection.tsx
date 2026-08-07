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
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(47,168,79,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container-content relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary flex-shrink-0" aria-hidden="true" />
              <span className="section-label">{eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="heading-1 text-text-primary">{headline}</h1>

            {/* Sub copy */}
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
              {subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href={ctaPrimaryHref} className="btn-primary">
                {ctaPrimaryLabel}
                <ArrowRight size={16} />
              </Link>
              <Link href={ctaSecondaryHref} className="btn-secondary">
                {ctaSecondaryLabel}
              </Link>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-text-secondary mt-1">
              Portal informasi resmi kawasan — bukan marketplace
            </p>
          </div>

          {/* Image — 7 cols */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-card-hover">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, rgba(20,32,22,0.15) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating stat chip */}
            <div
              className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-card border border-border"
              aria-hidden="true"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                🫘
              </div>
              <div>
                <p className="text-xs text-text-secondary">Sentra Produksi</p>
                <p className="text-sm font-semibold text-text-primary">Bangil, Pasuruan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
