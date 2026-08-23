"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Package, ChefHat, Users } from "lucide-react";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import { useCMS } from "@/lib/cms/CMSContext";

interface Props { params: { slug: string } }

export default function DetailProdukPage({ params }: Props) {
  const { produkList, umkmList } = useCMS();
  const produk = produkList.find((p) => p.slug === params.slug);

  if (!produk) {
    return (
      <main className="pt-24 pb-16 text-center">
        <div className="container-content">
          <h1 className="text-xl font-semibold mb-2">Produk Tidak Ditemukan</h1>
          <p className="text-text-secondary text-sm mb-4">
            Produk yang Anda cari tidak tersedia dalam katalog.
          </p>
          <Link href="/produk" className="btn-secondary">
            Kembali ke Katalog Produk
          </Link>
        </div>
      </main>
    );
  }

  const produsen = umkmList.filter((u) => produk.produsenIds.includes(u.id) && u.statusPublikasi);

  return (
    <main className="pt-20">
      <div className="container-content py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li>/</li>
            <li><Link href="/produk" className="hover:text-primary">Katalog Produk</Link></li>
            <li>/</li>
            <li className="text-text-primary font-medium">{produk.nama}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
            <Image src={produk.foto} alt={`Foto ${produk.nama}`} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <span className="badge-kategori mb-3 inline-block">{produk.kategori.replace(/-/g, " ")}</span>
              <h1 className="mb-3">{produk.nama}</h1>
              <p className="text-text-secondary leading-relaxed">{produk.deskripsiPanjang}</p>
            </div>

            {/* Kemasan */}
            <div>
              <h2 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                <Package size={15} className="text-primary" /> Ukuran & Kemasan
              </h2>
              <div className="flex flex-wrap gap-2">
                {produk.ukuranKemasan.map((k) => (
                  <span key={k} className="px-3 py-1.5 text-xs rounded-full border border-border text-text-secondary">{k}</span>
                ))}
              </div>
            </div>

            {/* Cocok untuk */}
            <div>
              <h2 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                <ChefHat size={15} className="text-primary" /> Cocok Untuk
              </h2>
              <ul className="space-y-1">
                {produk.cocokUntuk.map((c) => (
                  <li key={c} className="text-sm text-text-secondary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ketersediaan */}
            <div className="flex flex-wrap gap-2">
              {produk.tersediaEceran && <span className="badge-layanan">Eceran</span>}
              {produk.tersediaGrosir && <span className="badge-layanan">Grosir</span>}
              {produk.tersediaPemasokKuliner && <span className="badge-layanan">Pemasok Kuliner</span>}
            </div>
          </div>
        </div>

        {/* Produsen */}
        <section className="mt-14" aria-labelledby="produsen-heading">
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} className="text-primary" />
            <h2 id="produsen-heading" className="text-xl font-semibold text-text-primary">
              Produsen {produk.nama} di Kampung Tempe Gempeng
            </h2>
          </div>
          <p className="text-text-secondary mb-6 text-sm">
            {produsen.length} pelaku usaha memproduksi {produk.nama}. Hubungi langsung masing-masing produsen untuk informasi pembelian.
          </p>
          <div className="space-y-4">
            {produsen.map((u) => {
              const waUrl = buildWhatsAppUrl(u.nomorWhatsApp, buildWhatsAppMessageUMKM(u.namaUsaha));
              return (
                <div key={u.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={u.galeri[0] || "/images/placeholder-umkm.jpg"} alt={`Foto ${u.namaUsaha}`} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary">{u.namaUsaha}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{u.alamat}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {u.jenisLayanan.map((l) => <span key={l} className="badge-layanan text-xs">{l.replace(/-/g," ")}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/umkm/${u.slug}`} className="btn-secondary text-xs py-2 px-4">Profil</Link>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-xs py-2 px-4 gap-1.5">
                      <MessageCircle size={14} /> WA
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
