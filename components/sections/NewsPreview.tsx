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
            <p className="section-label mb-2">Berita & Kegiatan</p>
            <h2 id="news-preview-heading">Perkembangan Kampung Tempe Gempeng</h2>
            <p className="mt-2 text-text-secondary max-w-xl">
              Dokumentasi kegiatan, pelatihan, kunjungan, dan perkembangan terbaru kawasan.
            </p>
          </div>
          <Link
            href="/berita"
            className="btn-secondary flex-shrink-0 gap-1.5"
            aria-label="Lihat semua berita dan kegiatan"
          >
            Lihat Semua <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((b) => (
            <ArticleCard key={b.id} berita={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
