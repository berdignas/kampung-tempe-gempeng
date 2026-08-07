import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
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
            <p className="text-sm font-semibold tracking-widest uppercase text-white/70 mb-3">
              Temukan Produsen
            </p>
            <h2
              id="cta-heading"
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Temukan Produsen yang Sesuai Kebutuhan Anda
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Jelajahi seluruh pelaku usaha tempe di Kampung Gempeng, lihat profil dan produk
              mereka, lalu hubungi langsung melalui WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/umkm"
                className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ color: "var(--color-primary)" }}
                aria-label="Jelajahi direktori UMKM"
              >
                Jelajahi UMKM <ArrowRight size={15} />
              </Link>
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                aria-label="Lihat katalog produk tempe"
              >
                Katalog Produk
              </Link>
            </div>
            <p className="text-xs text-white/60 mt-6">
              Semua kontak pembelian dilakukan langsung ke UMKM — tanpa perantara
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
