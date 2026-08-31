"use client";

import { useState } from "react";
import ArticleCard from "@/components/news/ArticleCard";
import { KategoriBerita } from "@/lib/data/berita";
import { useCMS } from "@/lib/cms/CMSContext";

const kategoriOptions: { value: KategoriBerita | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "pelatihan", label: "Pelatihan" },
  { value: "kegiatan-warga", label: "Kegiatan Warga" },
  { value: "kunjungan", label: "Kunjungan" },
  { value: "program-kkn", label: "Program KKN" },
  { value: "pengembangan-umkm", label: "Pengembangan UMKM" },
];

export default function BeritaPage() {
  const { beritaList } = useCMS();
  const [filter, setFilter] = useState<KategoriBerita | "semua">("semua");

  const sorted = [...beritaList].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  const featured = sorted[0];
  const rest = sorted.slice(1).filter((b) => filter === "semua" || b.kategori === filter);

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16" style={{ backgroundColor: "var(--color-surface-muted)" }} aria-labelledby="berita-heading">
        <div className="container-content animate-fade-in-up">
          <p className="section-label mb-2">Pusat Informasi & Liputan</p>
          <h1 id="berita-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Kabar & Aktivitas Sentra Tempe
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Liputan kegiatan perajin, inovasi pengolahan pangan, pelatihan sertifikasi halal, dokumentasi program KKN, dan kunjungan industri di Kelurahan Gempeng.
          </p>
        </div>
      </section>

      <div className="section-spacing">
        <div className="container-content space-y-10">
          {/* Featured */}
          {featured && (
            <section aria-label="Artikel utama">
              <p className="section-label mb-4">Artikel Terbaru</p>
              <ArticleCard berita={featured} featured />
            </section>
          )}

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter kategori berita">
            {kategoriOptions.map((opt) => (
              <button key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${filter === opt.value ? "text-white" : "border-border text-text-secondary"}`}
                style={filter === opt.value ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" } : {}}
                aria-pressed={filter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {rest.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3" aria-hidden="true">📋</p>
              <p className="text-text-secondary">Belum ada berita untuk kategori ini</p>
            </div>
          ) : (
            <section aria-label="Daftar berita" aria-live="polite">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((b) => <ArticleCard key={b.id} berita={b} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
