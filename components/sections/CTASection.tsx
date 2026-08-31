"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

export default function CTASection() {
  const { pengaturan } = useCMS();

  return (
    <section className="section-spacing" aria-labelledby="cta-heading">
      <div className="container-content">
        <div
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(255,255,255,0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-emerald-100/90 mb-3">
              {pengaturan?.ctaSectionEyebrow || "Pemesanan & Kerjasama"}
            </p>
            <h2
              id="cta-heading"
              className="text-white mb-4 font-extrabold tracking-tight"
              style={{ fontSize: "clamp(1.85rem, 4vw, 2.75rem)" }}
            >
              {pengaturan?.ctaSectionHeading || "Pesan Tempe Segar Langsung dari Produsennya"}
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              {pengaturan?.ctaSectionSubtext || "Temukan perajin tempe terdekat, pilih varian tempe sesuai kebutuhan dapur atau usaha kuliner Anda, dan hubungi langsung melalui WhatsApp tanpa biaya perantara."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/umkm"
                className="inline-flex items-center gap-2 bg-white rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                style={{ color: "var(--color-primary)" }}
                aria-label="Jelajahi direktori UMKM"
              >
                {pengaturan?.ctaSectionBtn1Label || "Jelajahi Direktori UMKM"} <ArrowRight size={16} />
              </Link>
              <Link
                href="/peta"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                aria-label="Lihat peta produksi tempe"
              >
                {pengaturan?.ctaSectionBtn2Label === "Katalog Produk" ? "Lihat Peta Produksi" : (pengaturan?.ctaSectionBtn2Label || "Lihat Peta Produksi")}
              </Link>
            </div>
            <p className="text-xs text-white/75 mt-6 font-medium">
              ✓ 100% Bebas Biaya Perantara — Terhubung Langsung ke Pemilik Rumah Produksi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
