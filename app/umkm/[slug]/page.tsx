"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Clock, MessageCircle, ExternalLink,
} from "lucide-react";
import { labelLayanan } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import UMKMCard from "@/components/umkm/UMKMCard";
import { useCMS } from "@/lib/cms/CMSContext";

export default function DetailUMKMPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { umkmList, produkList } = useCMS();
  const umkm = umkmList.find((u) => u.slug === slug);

  if (!umkm || !umkm.statusPublikasi) {
    // If not found in dynamic state, fallback search
    return (
      <main className="pt-24 pb-16 text-center">
        <div className="container-content">
          <h1 className="text-xl font-semibold mb-2">UMKM Tidak Ditemukan</h1>
          <p className="text-text-secondary text-sm mb-4">
            Usaha yang Anda cari tidak tersedia atau belum dipublikasikan.
          </p>
          <Link href="/umkm" className="btn-secondary">
            Kembali ke Direktori UMKM
          </Link>
        </div>
      </main>
    );
  }

  const produkUMKM = produkList.filter((p) => umkm.produkIds.includes(p.id));
  const umkmLain = umkmList
    .filter((u) => u.id !== umkm.id && u.statusPublikasi)
    .sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha, "id"))
    .slice(0, 3);

  const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));
  const mapsUrl = `https://www.google.com/maps?q=${umkm.koordinat.lat},${umkm.koordinat.lng}`;

  return (
    <main className="pt-20">
      <div className="container-content py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/umkm" className="hover:text-primary">Direktori UMKM</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary font-medium truncate">{umkm.namaUsaha}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
              <Image
                src={umkm.galeri[0] || "/images/placeholder-umkm.jpg"}
                alt={`Foto usaha ${umkm.namaUsaha}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            {umkm.galeri.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {umkm.galeri.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={img} alt={`Foto galeri ${umkm.namaUsaha} ${i + 2}`} fill className="object-cover" sizes="50vw" />
                  </div>
                ))}
              </div>
            )}

            {/* Story */}
            <section aria-labelledby="cerita-heading">
              <h2 id="cerita-heading" className="text-xl font-semibold text-text-primary mb-3">Tentang {umkm.namaUsaha}</h2>
              <p className="text-text-secondary leading-relaxed">{umkm.deskripsi}</p>
            </section>

            {/* Products */}
            {produkUMKM.length > 0 && (
              <section aria-labelledby="produk-heading">
                <h2 id="produk-heading" className="text-xl font-semibold text-text-primary mb-4">Produk yang Tersedia</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {produkUMKM.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produk/${p.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary transition-colors bg-white"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={p.foto} alt={p.nama} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-text-primary">{p.nama}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{p.ukuranKemasan.join(" · ")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5" aria-label="Informasi kontak dan lokasi">
            {/* Contact card */}
            <div className="card p-5 space-y-4">
              <h2 className="font-semibold text-text-primary">Informasi Usaha</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-text-secondary mb-0.5">Nama Usaha</dt>
                  <dd className="font-medium text-text-primary">{umkm.namaUsaha}</dd>
                </div>
                {umkm.namaPemilik && (
                  <div>
                    <dt className="text-xs text-text-secondary mb-0.5">Pemilik</dt>
                    <dd className="font-medium text-text-primary">{umkm.namaPemilik}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-text-secondary mb-0.5">Berdiri Sejak</dt>
                  <dd className="font-medium text-text-primary">{umkm.tahunBerdiri}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-secondary mb-0.5">Jam Operasional</dt>
                  <dd className="font-medium text-text-primary flex items-center gap-1.5">
                    <Clock size={13} aria-hidden="true" />
                    {umkm.jamOperasional}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-text-secondary mb-0.5">Alamat</dt>
                  <dd className="font-medium text-text-primary flex items-start gap-1.5">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {umkm.alamat}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-text-secondary mb-1.5">Jenis Layanan</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {umkm.jenisLayanan.map((l) => (
                      <span key={l} className="badge-layanan">{labelLayanan[l]}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* CTA */}
            <div className="card p-5 space-y-3">
              <h2 className="font-semibold text-text-primary text-sm">Hubungi Langsung</h2>
              <p className="text-xs text-text-secondary">
                Untuk pembelian dan informasi produk, hubungi pemilik usaha secara langsung.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center gap-2"
                aria-label={`Hubungi ${umkm.namaUsaha} via WhatsApp`}
              >
                <MessageCircle size={18} />
                Hubungi via WhatsApp
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center gap-2 text-sm"
                aria-label={`Buka lokasi ${umkm.namaUsaha} di Google Maps`}
              >
                <ExternalLink size={14} />
                Buka di Google Maps
              </a>
            </div>
          </aside>
        </div>

        {/* Other UMKM */}
        <section className="mt-16" aria-labelledby="umkm-lain-heading">
          <h2 id="umkm-lain-heading" className="text-xl font-semibold text-text-primary mb-6">
            Pelaku UMKM Lain di Kampung Tempe Gempeng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {umkmLain.map((u) => (
              <UMKMCard key={u.id} umkm={u} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/umkm" className="btn-secondary">
              Lihat Semua UMKM
            </Link>
          </div>
        </section>
      </div>

      {/* Sticky WhatsApp (mobile) */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp shadow-card-hover flex items-center gap-2 px-4"
          aria-label={`Hubungi ${umkm.namaUsaha} via WhatsApp`}
        >
          <MessageCircle size={18} />
          Hubungi WA
        </a>
      </div>
    </main>
  );
}
