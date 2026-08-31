"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Leaf, Target, HeartHandshake, ShieldCheck, Award, MapPin, ExternalLink } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

const SingleUMKMMap = dynamic(() => import("@/components/map/SingleUMKMMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] bg-slate-100 rounded-2xl flex items-center justify-center text-xs text-slate-400">
      Memuat peta lokasi...
    </div>
  ),
});

export default function ProfilPage() {
  const { profilData } = useCMS();

  // Helper icons for nilai-nilai
  const getIconForIndex = (index: number) => {
    if (index === 0) return <HeartHandshake size={24} className="text-primary" />;
    if (index === 1) return <ShieldCheck size={24} className="text-primary" />;
    if (index === 2) return <Target size={24} className="text-primary" />;
    return <Award size={24} className="text-primary" />;
  };

  return (
    <main className="pt-20">
      {/* Hero Profil */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-muted)" }}
      >
        <div className="container-content relative">
          <div className="max-w-3xl space-y-4">
            <p className="animate-badge section-label">{profilData.heroEyebrow || "Profil Sentra Produksi"}</p>
            <div className="space-y-2">
              <h1 className="animate-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {profilData.heroJudul || "Identitas & Warisan Sentra Tempe Gempeng"}
              </h1>
              <span className="animate-accent-bar"></span>
            </div>
            <p className="animate-subtext text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {profilData.heroDeskripsi ||
                "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan merupakan pusat produksi tempe tradisional yang telah menghidupi puluhan keluarga perajin dan dipercaya masyarakat luas lintas generasi."}
            </p>
          </div>
        </div>
      </section>

      {/* Banner Foto */}
      {profilData.bannerFoto && (
        <section className="container-content -mt-8 relative z-10">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
            <Image
              src={profilData.bannerFoto}
              alt="Suasana pemukiman dan aktivitas Kampung Tempe Gempeng"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>
      )}

      {/* Sejarah & Timeline */}
      <section className="section-spacing" aria-labelledby="sejarah-heading">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <p className="section-label">{profilData.sejarahEyebrow || "Sejarah & Perjalanan"}</p>
              <h2 id="sejarah-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {profilData.sejarahJudul || "Jejak Langkah Sentra Tempe Gempeng"}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {profilData.sejarahParagraf1 ||
                  "Tradisi pembuatan tempe di Kelurahan Gempeng berakar dari keahlian keluarga perajin yang diwariskan secara turun-temurun. Kualitas sumber air, teknik peragian alami, dan ketelitian proses perendaman kedelai menghasilkan tempe dengan aroma segar, tekstur padat, dan rasa gurih yang khas."}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {profilData.sejarahParagraf2 ||
                  "Kini, kawasan Kampung Tempe Gempeng terus berkembang menjadi pusat pangan lokal yang menjaga higienitas dan terbuka bagi kemitraan usaha, studi edukasi, maupun pasokan pasar."}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {profilData.timeline &&
                profilData.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition duration-300">
                    <div
                      className="flex-shrink-0 font-extrabold text-base sm:text-lg px-3.5 py-1.5 rounded-xl h-fit text-emerald-800 bg-emerald-100/80"
                    >
                      {item.tahun}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{item.judul}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section
        className="section-spacing"
        style={{ backgroundColor: "var(--color-surface-muted)" }}
        aria-labelledby="visi-misi-heading"
      >
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">Arah Pengembangan</p>
            <h2 id="visi-misi-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visi & Misi Kawasan
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 bg-white shadow-xs hover:shadow-md transition">
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Target className="text-primary" /> {profilData.visiJudul || "Visi Sentra Produksi"}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {profilData.visiTeks ||
                  "Menjadikan Kampung Tempe Gempeng sebagai sentra produksi tempe yang mandiri, berdaya saing, berstandar higienis tinggi, serta dikenal luas sebagai ikon pangan bergizi Kabupaten Pasuruan."}
              </p>
            </div>

            <div className="card p-8 bg-white shadow-xs hover:shadow-md transition">
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Leaf className="text-primary" /> {profilData.misiJudul || "Misi Sentra Produksi"}
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {profilData.misiList &&
                  profilData.misiList.map((misi, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{misi}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Bersama */}
      <section className="section-spacing" aria-labelledby="nilai-heading">
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">{profilData.nilaiEyebrow || "Komitmen & Prinsip"}</p>
            <h2 id="nilai-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {profilData.nilaiJudul || "Nilai Utama Perajin Tempe Gempeng"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {profilData.nilaiList &&
              profilData.nilaiList.map((n, idx) => (
                <div key={idx} className="card p-6 text-center flex flex-col items-center shadow-xs hover:shadow-md hover:-translate-y-1 transition duration-300">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-emerald-100/70"
                  >
                    {getIconForIndex(idx)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{n.judul}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{n.deskripsi}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Lokasi Kawasan */}
      <section
        className="section-spacing"
        style={{ backgroundColor: "var(--color-surface-muted)" }}
        aria-labelledby="lokasi-heading"
      >
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="section-label mb-2">Navigasi Lokasi</p>
            <h2 id="lokasi-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Peta Lokasi Sentra Produksi
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Map embed */}
            <div className="lg:col-span-3">
              <SingleUMKMMap
                lat={parseFloat(profilData.lokasiLat) || -7.5953}
                lng={parseFloat(profilData.lokasiLng) || 112.7844}
                namaUsaha={profilData.lokasiLabel || "Kawasan Kampung Tempe Gempeng"}
                alamat={profilData.lokasiAlamat || "Kelurahan Gempeng, Kecamatan Bangil, Pasuruan"}
                height="360px"
              />
            </div>

            {/* Info & CTA */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card p-6 bg-white space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-primary-soft)" }}
                  >
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm mb-1">
                      {profilData.lokasiLabel || "Kawasan Kampung Tempe Gempeng"}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {profilData.lokasiAlamat || "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan, Jawa Timur 67153"}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${parseFloat(profilData.lokasiLat) || -7.5953},${parseFloat(profilData.lokasiLng) || 112.7844}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  Buka di Google Maps
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${parseFloat(profilData.lokasiLat) || -7.5953},${parseFloat(profilData.lokasiLng) || 112.7844}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center gap-2"
                >
                  <MapPin size={16} />
                  Petunjuk Arah ke Sini
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "var(--color-primary-soft)" }}>
        <div className="container-content">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
            {profilData.ctaJudul || "Ingin Mengenal Lebih Dekat?"}
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-6">
            {profilData.ctaDeskripsi ||
              "Temukan lokasi rumah produksi pada peta interaktif atau jelajahi seluruh pelaku UMKM tempe di kawasan kami."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/umkm" className="btn-primary">
              Jelajahi Direktori UMKM <ArrowRight size={16} />
            </Link>
            <Link href="/peta" className="btn-secondary">
              Lihat Peta Produksi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
