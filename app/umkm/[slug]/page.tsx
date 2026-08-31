"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin, Clock, MessageCircle, ExternalLink, Package, ChevronLeft, ChevronRight,
} from "lucide-react";
import { labelLayanan } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import { useCMS } from "@/lib/cms/CMSContext";
import UMKMGalleryCarousel from "@/components/umkm/UMKMGalleryCarousel";

const SingleUMKMMap = dynamic(() => import("@/components/map/SingleUMKMMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] bg-slate-100 rounded-2xl flex items-center justify-center text-xs text-slate-400">
      Memuat peta lokasi...
    </div>
  ),
});

const PRODUK_PER_PAGE = 2;

export default function DetailUMKMPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { umkmList, produkList } = useCMS();
  const umkm = umkmList.find((u) => u.slug === slug || u.id === slug);
  const [produkPage, setProdukPage] = useState(0);

  if (!umkm || !umkm.statusPublikasi) {
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

  const validLat = Number(umkm.koordinat?.lat) || -7.5953;
  const validLng = Number(umkm.koordinat?.lng) || 112.7844;

  const produkUMKM = produkList.filter((p) => umkm.produkIds.includes(p.id));
  const totalProdukPages = Math.ceil(produkUMKM.length / PRODUK_PER_PAGE);
  const produkSlice = produkUMKM.slice(
    produkPage * PRODUK_PER_PAGE,
    (produkPage + 1) * PRODUK_PER_PAGE
  );

  const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));

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
            {umkm.galeri && umkm.galeri[0] ? (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src={umkm.galeri[0]}
                  alt={`Foto usaha ${umkm.namaUsaha}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Package size={44} className="opacity-30" />
                <p className="text-xs font-medium">Foto profil usaha belum diunggah</p>
              </div>
            )}
            {/* Additional Gallery Carousel with Auto-slide & Pagination */}
            {umkm.galeri && umkm.galeri.slice(1).filter((img) => Boolean(img && img.trim())).length > 0 && (
              <UMKMGalleryCarousel
                images={umkm.galeri.slice(1).filter((img) => Boolean(img && img.trim()))}
                namaUsaha={umkm.namaUsaha}
                autoPlayInterval={4000}
              />
            )}

            {/* Story */}
            <section aria-labelledby="cerita-heading">
              <h2 id="cerita-heading" className="text-xl font-semibold text-text-primary mb-3">Tentang {umkm.namaUsaha}</h2>
              <p className="text-text-secondary leading-relaxed">{umkm.deskripsi}</p>
            </section>

            {/* Products with Pagination */}
            {produkUMKM.length > 0 && (
              <section aria-labelledby="produk-heading" className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="produk-heading" className="text-xl font-semibold text-text-primary flex items-center gap-2">
                    <Package size={20} className="text-primary" />
                    Produk Tempe yang Dihasilkan
                  </h2>
                  <span className="text-xs text-text-secondary font-medium">
                    Total {produkUMKM.length} Varian
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {produkSlice.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produk/${p.slug}`}
                      className="card p-4 flex items-start gap-4 hover:border-primary transition-all group bg-white"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-xs bg-slate-100 flex items-center justify-center">
                        {p.foto ? (
                          <Image src={p.foto} alt={p.nama} fill className="object-cover group-hover:scale-105 transition-transform" sizes="80px" />
                        ) : (
                          <Package size={24} className="text-slate-400 opacity-40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-text-primary mb-1 group-hover:text-primary transition-colors">{p.nama}</p>
                        <p className="text-xs text-text-secondary line-clamp-2 mb-2">{p.deskripsi}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.ukuranKemasan.slice(0, 2).map((k) => (
                            <span key={k} className="px-2 py-0.5 text-[10px] rounded-full border border-border text-text-secondary">{k}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalProdukPages > 1 && (
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                    <p className="text-xs text-text-secondary">
                      Halaman <strong className="text-text-primary">{produkPage + 1}</strong> dari <strong>{totalProdukPages}</strong>
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setProdukPage(Math.max(0, produkPage - 1))}
                        disabled={produkPage === 0}
                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-muted disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
                        aria-label="Halaman produk sebelumnya"
                      >
                        <ChevronLeft size={14} /> Sebelumnya
                      </button>

                      <button
                        type="button"
                        onClick={() => setProdukPage(Math.min(totalProdukPages - 1, produkPage + 1))}
                        disabled={produkPage === totalProdukPages - 1}
                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-muted disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
                        aria-label="Halaman produk berikutnya"
                      >
                        Selanjutnya <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Titik Lokasi Rumah Produksi Peta Interaktif */}
            <section aria-labelledby="lokasi-umkm-heading" className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <h2 id="lokasi-umkm-heading" className="text-xl font-semibold text-text-primary flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Lokasi Rumah Produksi
                </h2>
                <span className="text-xs text-text-secondary">
                  Kelurahan Gempeng, Bangil
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Titik lokasi presisi rumah produksi <strong>{umkm.namaUsaha}</strong> di Kampung Tempe Gempeng. Anda dapat memperbesar peta, beralih ke tampilan foto satelit, atau membuka petunjuk arah navigasi langsung.
              </p>
              <SingleUMKMMap
                lat={validLat}
                lng={validLng}
                namaUsaha={umkm.namaUsaha}
                alamat={umkm.alamat}
                height="320px"
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5" aria-label="Informasi kontak dan lokasi">
            {/* Contact card */}
            <div className="card p-5 space-y-4 bg-white">
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
            <div className="card p-5 space-y-3 bg-white">
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
            </div>
          </aside>
        </div>

        {/* Back to directory */}
        <div className="mt-12 pt-6 border-t border-border text-center">
          <Link href="/umkm" className="btn-secondary inline-flex items-center gap-2">
            <ChevronLeft size={15} />
            Kembali ke Direktori UMKM
          </Link>
        </div>
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
