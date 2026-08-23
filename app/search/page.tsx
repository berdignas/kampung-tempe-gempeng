"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import UMKMCard from "@/components/umkm/UMKMCard";
import ProductCard from "@/components/products/ProductCard";
import ArticleCard from "@/components/news/ArticleCard";
import { useCMS } from "@/lib/cms/CMSContext";

type Tab = "semua" | "umkm" | "produk" | "berita";

export default function SearchPage() {
  const { umkmList, produkList, beritaList } = useCMS();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("semua");

  const q = query.toLowerCase().trim();

  const umkmResults = q
    ? umkmList.filter(
        (u) =>
          u.statusPublikasi &&
          (u.namaUsaha.toLowerCase().includes(q) ||
            u.namaPemilik.toLowerCase().includes(q) ||
            u.deskripsi.toLowerCase().includes(q) ||
            u.alamat.toLowerCase().includes(q))
      )
    : [];

  const produkResults = q
    ? produkList.filter(
        (p) =>
          p.nama.toLowerCase().includes(q) ||
          p.deskripsi.toLowerCase().includes(q) ||
          p.kategori.toLowerCase().includes(q)
      )
    : [];

  const beritaResults = q
    ? beritaList.filter(
        (b) =>
          b.judul.toLowerCase().includes(q) ||
          b.ringkasan.toLowerCase().includes(q) ||
          b.kategori.toLowerCase().includes(q)
      )
    : [];

  const totalResults = umkmResults.length + produkResults.length + beritaResults.length;

  return (
    <main className="pt-20">
      <section className="py-12" style={{ backgroundColor: "var(--color-surface-muted)" }}>
        <div className="container-content">
          <p className="section-label mb-2">Pencarian</p>
          <h1 className="mb-4">Cari Informasi Kawasan</h1>
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="search"
              placeholder="Cari UMKM, jenis produk tempe, atau berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              style={{ borderColor: "var(--color-border)", minHeight: "48px" }}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label="Hapus kata kunci"
              >
                <X size={16} className="text-text-secondary" />
              </button>
            )}
          </div>
        </div>
      </section>

      {query && (
        <div className="border-b border-border bg-white sticky top-16 z-20">
          <div className="container-content flex gap-2 pt-2">
            {[
              { id: "semua", label: `Semua (${totalResults})` },
              { id: "umkm", label: `UMKM (${umkmResults.length})` },
              { id: "produk", label: `Produk (${produkResults.length})` },
              { id: "berita", label: `Berita (${beritaResults.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="section-spacing">
        <div className="container-content">
          {!query ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <h2 className="text-lg font-semibold text-text-primary mb-1">Ketikkan kata kunci pencarian</h2>
              <p className="text-sm text-text-secondary">Cari berdasarkan nama UMKM, nama pemilik, jenis tempe, atau kegiatan kampung.</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🍃</p>
              <h2 className="text-lg font-semibold text-text-primary mb-1">Tidak ada hasil ditemukan</h2>
              <p className="text-sm text-text-secondary">Coba kata kunci lain seperti "Bu Aminah", "tempe daun", "pelatihan", dll.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {(activeTab === "semua" || activeTab === "umkm") && umkmResults.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-text-primary mb-4">Hasil UMKM ({umkmResults.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {umkmResults.map((u) => <UMKMCard key={u.id} umkm={u} />)}
                  </div>
                </div>
              )}

              {(activeTab === "semua" || activeTab === "produk") && produkResults.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-text-primary mb-4">Hasil Produk ({produkResults.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {produkResults.map((p) => <ProductCard key={p.id} produk={p} />)}
                  </div>
                </div>
              )}

              {(activeTab === "semua" || activeTab === "berita") && beritaResults.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-text-primary mb-4">Hasil Berita & Kegiatan ({beritaResults.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {beritaResults.map((b) => <ArticleCard key={b.id} berita={b} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
