"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import UMKMCard from "@/components/umkm/UMKMCard";
import { JenisLayanan, labelLayanan } from "@/lib/data/umkm";
import { useCMS } from "@/lib/cms/CMSContext";

const layananOptions: { value: JenisLayanan | "semua"; label: string }[] = [
  { value: "semua", label: "Semua Layanan" },
  { value: "eceran", label: "Eceran" },
  { value: "grosir", label: "Grosir" },
  { value: "pemasok-kuliner", label: "Pemasok Kuliner" },
  { value: "distributor", label: "Distributor" },
];

export default function UMKMPage() {
  const { umkmList } = useCMS();
  const [search, setSearch] = useState("");
  const [filterLayanan, setFilterLayanan] = useState<JenisLayanan | "semua">("semua");

  const filtered = umkmList
    .filter((u) => u.statusPublikasi)
    .sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha, "id"))
    .filter((u) => {
      const matchSearch =
        !search ||
        u.namaUsaha.toLowerCase().includes(search.toLowerCase()) ||
        u.namaPemilik.toLowerCase().includes(search.toLowerCase()) ||
        u.alamat.toLowerCase().includes(search.toLowerCase());
      const matchLayanan =
        filterLayanan === "semua" || u.jenisLayanan.includes(filterLayanan);
      return matchSearch && matchLayanan;
    });

  return (
    <main className="pt-20">
      {/* Page header */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: "var(--color-surface-muted)" }}
        aria-labelledby="umkm-dir-heading"
      >
        <div className="container-content animate-fade-in-up">
          <p className="section-label mb-2">Direktori Lengkap</p>
          <h1 id="umkm-dir-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Direktori Perajin Tempe Gempeng
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Daftar seluruh rumah produksi tempe resmi di Kelurahan Gempeng. Temukan perajin tempe sesuai kebutuhan eceran, grosir, maupun pasokan usaha kuliner Anda.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-border py-3" aria-label="Filter dan pencarian UMKM">
        <div className="container-content flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Cari nama usaha, pemilik, atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-full focus:outline-none focus:ring-2 transition-shadow"
              style={{ borderColor: "var(--color-border)", minHeight: "44px" }}
              aria-label="Cari UMKM"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Hapus pencarian"
              >
                <X size={14} className="text-text-secondary" />
              </button>
            )}
          </div>

          {/* Layanan filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-0.5" role="group" aria-label="Filter jenis layanan">
            {layananOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterLayanan(opt.value)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                  filterLayanan === opt.value
                    ? "text-white border-primary"
                    : "border-border text-text-secondary hover:border-text-secondary"
                }`}
                style={
                  filterLayanan === opt.value
                    ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }
                    : {}
                }
                aria-pressed={filterLayanan === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-spacing" aria-live="polite" aria-label="Daftar UMKM">
        <div className="container-content">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <h2 className="text-lg font-semibold text-text-primary mb-2">
                Tidak ada UMKM ditemukan
              </h2>
              <p className="text-text-secondary text-sm">
                Coba ubah kata kunci pencarian atau pilihan filter
              </p>
              <button
                onClick={() => { setSearch(""); setFilterLayanan("semua"); }}
                className="btn-secondary mt-4 text-sm"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-text-secondary mb-6">
                Menampilkan <strong className="text-text-primary">{filtered.length}</strong> pelaku usaha
                {filterLayanan !== "semua" && ` · Filter: ${labelLayanan[filterLayanan as JenisLayanan]}`}
                {search && ` · Pencarian: "${search}"`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filtered.map((umkm) => (
                  <UMKMCard key={umkm.id} umkm={umkm} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
