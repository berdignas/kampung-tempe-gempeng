"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import UMKMCard from "@/components/umkm/UMKMCard";
import { useCMS } from "@/lib/cms/CMSContext";

export default function FeaturedUMKM() {
  const { umkmList } = useCMS();

  // Show first 3 active UMKM in neutral (alphabetical) order
  const featured = [...umkmList]
    .filter((u) => u.statusPublikasi)
    .sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha, "id"))
    .slice(0, 3);

  return (
    <section className="section-spacing" aria-labelledby="featured-umkm-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-2">Pelaku Usaha Unggulan</p>
            <h2 id="featured-umkm-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Daftar Rumah Produksi Tempe Gempeng
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
              Jelajahi profil perajin tempe terdaftar, lihat varian produk yang dihasilkan, dan hubungi langsung via WhatsApp.
            </p>
          </div>
          <Link
            href="/umkm"
            className="btn-secondary flex-shrink-0 font-bold gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition shadow-2xs"
            aria-label="Lihat seluruh direktori UMKM"
          >
            Lihat Semua Pelaku Usaha <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {featured.map((umkm) => (
            <UMKMCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      </div>
    </section>
  );
}
