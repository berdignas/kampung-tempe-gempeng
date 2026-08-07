import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturedUMKM from "@/components/sections/FeaturedUMKM";
import NewsPreview from "@/components/sections/NewsPreview";
import CTASection from "@/components/sections/CTASection";
import ProductCategoriesSection from "@/components/sections/ProductCategoriesSection";
import KampungProfileTeaser from "@/components/sections/KampungProfileTeaser";

export const metadata: Metadata = {
  title: "Kampung Tempe Gempeng — Sentra Produksi Tempe di Bangil, Pasuruan",
  description:
    "Portal resmi Kampung Tempe Gempeng. Temukan seluruh pelaku usaha tempe, produk, lokasi rumah produksi, dan hubungi produsen langsung di Kelurahan Gempeng, Bangil, Pasuruan.",
  openGraph: {
    title: "Kampung Tempe Gempeng — Sentra Produksi Tempe",
    description:
      "Portal resmi komunitas UMKM tempe di Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan.",
    type: "website",
    locale: "id_ID",
  },
};

export default function BerandaPage() {
  return (
    <main>
      <HeroSection
        eyebrow="Sentra Produksi Tempe di Bangil, Pasuruan"
        headline="Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja"
        subtext="Kampung Tempe Gempeng adalah kawasan sentra produksi tempe di Kelurahan Gempeng, Kecamatan Bangil. Ratusan keluarga pengrajin tempe bekerja setiap hari untuk menghasilkan tempe berkualitas yang menjangkau pasar lokal hingga regional."
        ctaPrimaryLabel="Jelajahi UMKM"
        ctaPrimaryHref="/umkm"
        ctaSecondaryLabel="Lihat Peta Produksi"
        ctaSecondaryHref="/peta"
        imageSrc="/images/hero-tempe-production.jpg"
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
