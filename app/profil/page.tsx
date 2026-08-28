"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Target, HeartHandshake, ShieldCheck, Award, MapPin, ExternalLink } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

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
          <div className="max-w-3xl">
            <p className="section-label mb-2">{profilData.heroEyebrow || "Profil Kawasan"}</p>
            <h1 className="mb-4">{profilData.heroJudul || "Identitas & Legasi Kampung Tempe Gempeng"}</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {profilData.heroDeskripsi ||
                "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan merupakan pusat produksi tempe yang telah menghidupi puluhan keluarga pengrajin dan melayani kebutuhan gizi masyarakat secara lintas generasi."}
            </p>
          </div>
        </div>
      </section>

      {/* Banner Foto */}
      <section className="container-content -mt-8 relative z-10">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
          <Image
            src={profilData.bannerFoto || "/images/profil-kampung-banner.jpg"}
            alt="Suasana pemukiman dan aktivitas Kampung Tempe Gempeng"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Sejarah & Timeline */}
      <section className="section-spacing" aria-labelledby="sejarah-heading">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="section-label mb-2">{profilData.sejarahEyebrow || "Sejarah & Perjalanan"}</p>
              <h2 id="sejarah-heading" className="mb-4">
                {profilData.sejarahJudul || "Jejak Langkah Sentra Tempe Gempeng"}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                {profilData.sejarahParagraf1 ||
                  "Tradisi membuat tempe di Gempeng berawal dari keterampilan rumahan yang diturunkan antar generasi. Kualitas air, keahlian fermentasi alami, dan etos kerja warga menjadikan tempe dari Gempeng memiliki tekstur padat dan citarasa yang khas."}
              </p>
              <p className="text-text-secondary leading-relaxed">
                {profilData.sejarahParagraf2 ||
                  "Kini, kawasan ini terus bertransformasi menjadi sentra produksi pangan lokal yang adaptif terhadap standar sanitasi dan perkembangan teknologi digital."}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {profilData.timeline &&
                profilData.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-border bg-white shadow-sm">
                    <div
                      className="flex-shrink-0 font-bold text-lg px-3 py-1.5 rounded-xl h-fit text-primary"
                      style={{ backgroundColor: "var(--color-primary-soft)" }}
                    >
                      {item.tahun}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary mb-1">{item.judul}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.deskripsi}</p>
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
            <h2 id="visi-misi-heading">Visi & Misi Kawasan</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 bg-white">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <Target className="text-primary" /> {profilData.visiJudul || "Visi Kawasan"}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {profilData.visiTeks ||
                  "Menjadikan Kampung Tempe Gempeng sebagai sentra produksi tempe yang mandiri, berdaya saing, berstandar higienis tinggi, serta dikenal secara luas sebagai ikon kuliner tradisional Kabupaten Pasuruan."}
              </p>
            </div>

            <div className="card p-8 bg-white">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <Leaf className="text-primary" /> {profilData.misiJudul || "Misi Kawasan"}
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {profilData.misiList &&
                  profilData.misiList.map((misi, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {misi}
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
            <p className="section-label mb-2">{profilData.nilaiEyebrow || "Prinsip Komunitas"}</p>
            <h2 id="nilai-heading">{profilData.nilaiJudul || "Nilai Bersama Pelaku UMKM"}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {profilData.nilaiList &&
              profilData.nilaiList.map((n, idx) => (
                <div key={idx} className="card p-6 text-center flex flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "var(--color-primary-soft)" }}
                  >
                    {getIconForIndex(idx)}
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">{n.judul}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{n.deskripsi}</p>
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
            <p className="section-label mb-2">Lokasi Kawasan</p>
            <h2 id="lokasi-heading">Temukan Kami di Peta</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Map embed */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-card border border-border">
              <iframe
                title="Peta Lokasi Kampung Tempe Gempeng"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${profilData.lokasiLat || "-7.5953"},${profilData.lokasiLng || "112.7844"}&zoom=16&maptype=roadmap`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
                  href={`https://www.google.com/maps?q=${profilData.lokasiLat || "-7.5953"},${profilData.lokasiLng || "112.7844"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  Buka di Google Maps
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${profilData.lokasiLat || "-7.5953"},${profilData.lokasiLng || "112.7844"}`}
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
