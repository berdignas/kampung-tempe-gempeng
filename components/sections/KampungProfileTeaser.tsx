"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Users, Truck, BookOpen } from "lucide-react";
import Image from "next/image";
import { useCMS } from "@/lib/cms/CMSContext";

const potensi = [
  {
    icon: <Leaf size={22} className="text-primary" />,
    title: "Produksi Tempe",
    desc: "Puluhan rumah produksi aktif menghasilkan berbagai jenis tempe setiap hari.",
  },
  {
    icon: <Users size={22} className="text-primary" />,
    title: "Penyerapan Tenaga Kerja",
    desc: "Industri tempe kawasan ini menjadi sumber penghidupan bagi banyak keluarga.",
  },
  {
    icon: <Truck size={22} className="text-primary" />,
    title: "Distribusi",
    desc: "Produk tempe dari Gempeng menjangkau pasar di Bangil dan wilayah sekitarnya.",
  },
  {
    icon: <BookOpen size={22} className="text-primary" />,
    title: "Edukasi & Wisata Produksi",
    desc: "Kawasan ini terbuka untuk kunjungan industri, penelitian, dan program KKN.",
  },
];

export default function KampungProfileTeaser() {
  const { pengaturan } = useCMS();

  return (
    <section className="section-spacing" aria-labelledby="profil-teaser-heading">
      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="animate-badge section-label">{pengaturan?.profileTeaserEyebrow || "Warisan & Tradisi"}</p>
            <div className="space-y-2">
              <h2 id="profil-teaser-heading" className="animate-heading text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {pengaturan?.profileTeaserHeading || "Mengenal Sentra Tempe Gempeng"}
              </h2>
              <span className="animate-accent-bar"></span>
            </div>
            <p className="animate-subtext text-slate-600 leading-relaxed text-base">
              {pengaturan?.profileTeaserParagraph1 || "Kelurahan Gempeng, Kecamatan Bangil telah lama menjadi sentra penghasil tempe unggulan di Kabupaten Pasuruan. Keahlian memilih kedelai dan proses fermentasi alami diwariskan turun-temurun, menghasilkan tempe yang padat, gurih, dan berkualitas tinggi."}
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              {pengaturan?.profileTeaserParagraph2 || "Melalui portal terpadu ini, seluruh rumah produksi tempe Gempeng dapat dijangkau dengan mudah oleh masyarakat umum, pelaku usaha kuliner, hingga distributor luar kota."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {potensi.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 p-3.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-white hover:shadow-xs transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-700"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/profil" className="btn-primary inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition">
                Baca Profil Lengkap Kampung <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-card relative bg-slate-100 flex items-center justify-center">
              {pengaturan?.profileTeaserImage ? (
                <Image
                  src={pengaturan.profileTeaserImage}
                  alt="Suasana Kampung Tempe Gempeng"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
                  <Leaf size={48} className="opacity-30 text-emerald-600" />
                  <p className="text-xs font-semibold text-slate-600">Kawasan Sentra Tempe Gempeng</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
