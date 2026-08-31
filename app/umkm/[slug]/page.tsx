"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  Clock,
  MessageCircle,
  ChevronLeft,
  User,
  Calendar,
  ShieldCheck,
  Building2,
  Phone,
  Sparkles,
} from "lucide-react";
import { labelLayanan } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import { useCMS } from "@/lib/cms/CMSContext";

const SingleUMKMMap = dynamic(() => import("@/components/map/SingleUMKMMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] bg-slate-100 rounded-2xl flex items-center justify-center text-xs text-slate-400">
      Memuat peta lokasi rumah produksi...
    </div>
  ),
});

export default function DetailUMKMPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { umkmList } = useCMS();
  const umkm = umkmList.find((u) => u.slug === slug || u.id === slug);

  if (!umkm || !umkm.statusPublikasi) {
    return (
      <main className="pt-24 pb-16 text-center">
        <div className="container-content">
          <h1 className="text-xl font-semibold mb-2">UMKM Tidak Ditemukan</h1>
          <p className="text-text-secondary text-sm mb-4">
            Data pengrajin yang Anda cari belum terdaftar atau belum dipublikasikan.
          </p>
          <Link href="/umkm" className="btn-secondary">
            Kembali ke Direktori UMKM
          </Link>
        </div>
      </main>
    );
  }

  const validLat = Number(umkm.koordinat?.lat) || -7.5953;
  const validLng = Number(umkm.koordinat?.lng) || 112.7844;
  const photoUrl = umkm.foto || (umkm.galeri && umkm.galeri[0]) || "";
  const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));

  return (
    <main className="pt-20 bg-slate-50/50 min-h-screen pb-16">
      <div className="container-content py-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <li><Link href="/" className="hover:text-emerald-700 transition-colors">Beranda</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li><Link href="/umkm" className="hover:text-emerald-700 transition-colors">Direktori UMKM</Link></li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-900 font-semibold truncate">{umkm.namaUsaha}</li>
          </ol>
        </nav>

        {/* Hero Section: Foto Profil Rasio 9:16 (Kiri) + Informasi Lengkap (Kanan) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-7 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Foto Profil Pengrajin Berasio 9:16 */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px] aspect-[9/16] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 group select-none flex-shrink-0">
                {photoUrl ? (
                  <>
                    <Image
                      src={photoUrl}
                      alt={`Foto profil pengrajin ${umkm.namaPemilik || umkm.namaUsaha}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 330px"
                    />
                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold shadow-md border border-white/10">
                      <User size={13} className="text-emerald-400" />
                      <span>Profil Pengrajin Tempe</span>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-4 inset-x-4 z-10 text-white pointer-events-none space-y-1">
                      {umkm.namaPemilik && (
                        <p className="text-xs text-emerald-300 font-semibold tracking-wide flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-xs animate-pulse"></span>
                          Pemilik: {umkm.namaPemilik}
                        </p>
                      )}
                      <h2 className="font-extrabold text-lg sm:text-xl leading-tight text-white drop-shadow-md">
                        {umkm.namaUsaha}
                      </h2>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-3 p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                      <User size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Foto Profil Pengrajin</p>
                      <span className="text-xs text-slate-400 mt-0.5 block">Format Potret 9:16</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Rincian Lengkap Profil, Cerita, & Kontak */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header Title & Badges */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles size={13} className="text-emerald-600" />
                  Sentra Produksi Tempe Kelurahan Gempeng
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {umkm.namaUsaha}
                  </h1>
                  {umkm.namaPemilik && (
                    <p className="text-sm sm:text-base font-semibold text-emerald-700 flex items-center gap-1.5">
                      <User size={15} />
                      Pengrajin: {umkm.namaPemilik}
                    </p>
                  )}
                </div>

                {/* Badges Jenis Layanan */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {umkm.jenisLayanan.map((layanan) => (
                    <span
                      key={layanan}
                      className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {labelLayanan[layanan]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cerita & Deskripsi Usaha */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tentang Usaha & Produksi
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {umkm.deskripsi || "Informasi profil usaha sedang diperbarui oleh pengrajin."}
                </p>
              </div>

              {/* Grid Ringkasan Informasi Penting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs border border-slate-200">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Jam Operasional</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">{umkm.jamOperasional}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs border border-slate-200">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Tahun Berdiri</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">Sejak Tahun {umkm.tahunBerdiri}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 sm:col-span-2">
                  <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs border border-slate-200">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Alamat Lengkap Rumah Produksi</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5 leading-snug">{umkm.alamat}</p>
                  </div>
                </div>
              </div>

              {/* Action WhatsApp Button */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  aria-label={`Hubungi ${umkm.namaUsaha} via WhatsApp`}
                >
                  <MessageCircle size={20} />
                  <span>Hubungi Pengrajin via WhatsApp ({umkm.nomorWhatsApp})</span>
                </a>

                <Link
                  href="/umkm"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
                >
                  <ChevronLeft size={16} />
                  <span>Daftar Pengrajin Lainnya</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Bawah: Titik Lokasi Rumah Produksi Peta Interaktif */}
        <section aria-labelledby="lokasi-umkm-heading" className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 id="lokasi-umkm-heading" className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin size={20} className="text-emerald-600" />
                Peta Titik Lokasi Rumah Produksi
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Koordinat presisi rumah produksi tempe di Kelurahan Gempeng, Kecamatan Bangil
              </p>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-2xs">
              RT/RW Setempat Gempeng
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <SingleUMKMMap
              lat={validLat}
              lng={validLng}
              namaUsaha={umkm.namaUsaha}
              alamat={umkm.alamat}
              foto={photoUrl}
              height="360px"
            />
          </div>
        </section>
      </div>

      {/* Sticky Mobile Floating WhatsApp Button */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-xl active:scale-95 transition-transform"
          aria-label={`Hubungi ${umkm.namaUsaha} via WhatsApp`}
        >
          <MessageCircle size={18} />
          <span>Hubungi WA</span>
        </a>
      </div>
    </main>
  );
}
