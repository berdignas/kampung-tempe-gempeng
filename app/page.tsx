"use client";

import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturedUMKM from "@/components/sections/FeaturedUMKM";
import NewsPreview from "@/components/sections/NewsPreview";
import CTASection from "@/components/sections/CTASection";
import ProductCategoriesSection from "@/components/sections/ProductCategoriesSection";
import KampungProfileTeaser from "@/components/sections/KampungProfileTeaser";
import { useCMS } from "@/lib/cms/CMSContext";

export default function BerandaPage() {
  const { pengaturan } = useCMS();

  return (
    <main>
      <HeroSection
        eyebrow={pengaturan?.heroEyebrow || "Sentra Produksi Tempe di Bangil, Pasuruan"}
        headline={pengaturan?.heroHeadline || "Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja"}
        subtext={
          pengaturan?.heroSubtext ||
          "Kampung Tempe Gempeng adalah kawasan sentra produksi tempe di Kelurahan Gempeng, Kecamatan Bangil. Ratusan keluarga pengrajin tempe bekerja setiap hari untuk menghasilkan tempe berkualitas yang menjangkau pasar lokal hingga regional."
        }
        ctaPrimaryLabel={pengaturan?.heroCtaPrimaryLabel || "Jelajahi UMKM"}
        ctaPrimaryHref={pengaturan?.heroCtaPrimaryHref || "/umkm"}
        ctaSecondaryLabel={pengaturan?.heroCtaSecondaryLabel || "Lihat Peta Produksi"}
        ctaSecondaryHref={pengaturan?.heroCtaSecondaryHref || "/peta"}
        imageSrc={pengaturan?.heroImage || "/images/hero-tempe-production.jpg"}
        imageAlt="Aktivitas produksi tempe di rumah produksi Kampung Tempe Gempeng"
      />
      <StatsSection />
      <KampungProfileTeaser />
      <FeaturedUMKM />
      <ProductCategoriesSection />
      <NewsPreview />
      <CTASection />
    </main>
  );
}
