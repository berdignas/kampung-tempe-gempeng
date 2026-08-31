"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import { useCMS } from "@/lib/cms/CMSContext";

export default function NewsPreview() {
  const { beritaList } = useCMS();

  const recent = [...beritaList]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, 3);

  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--color-surface-muted)" }}
      aria-labelledby="news-preview-heading"
    >
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="animate-badge section-label mb-2">Berita & Kegiatan Terkini</p>
            <div className="space-y-2">
              <h2 id="news-preview-heading" className="animate-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Kabar & Dokumentasi Kawasan
              </h2>
              <span className="animate-accent-bar"></span>
            </div>
            <p className="animate-subtext mt-2 text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
              Ikuti informasi terbaru seputar kegiatan perajin, inovasi pengolahan kedelai, program KKN, dan pelatihan usaha.
            </p>
          </div>
          <Link
            href="/berita"
            className="btn-secondary flex-shrink-0 font-bold gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition shadow-2xs"
            aria-label="Lihat semua berita dan kegiatan"
          >
            Lihat Semua Berita <ArrowRight size={15} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center bg-white/70 rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Belum ada artikel berita atau dokumentasi kegiatan.</p>
            <p className="text-xs text-slate-500 mt-1">Kabar kawasan dan pengumuman dapat dipublikasikan melalui panel admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((b) => (
              <ArticleCard key={b.id} berita={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
