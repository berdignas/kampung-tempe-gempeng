"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { KategoriProduk } from "@/lib/data/produk";
import { useCMS } from "@/lib/cms/CMSContext";

const filterOptions: { value: KategoriProduk | "semua"; label: string }[] = [
  { value: "semua", label: "Semua Jenis" },
  { value: "tempe-papan", label: "Tempe Papan" },
  { value: "tempe-bulat", label: "Tempe Bulat" },
  { value: "tempe-daun-pisang", label: "Tempe Daun Pisang" },
  { value: "tempe-gembus", label: "Tempe Gembus" },
];

export default function ProdukPage() {
  const { produkList } = useCMS();
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState<KategoriProduk | "semua">("semua");
  const [filterGrosir, setFilterGrosir] = useState(false);
  const [filterKuliner, setFilterKuliner] = useState(false);

  const filtered = produkList.filter((p) => {
    const matchSearch = !search || p.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = filterKategori === "semua" || p.kategori === filterKategori;
    const matchGrosir = !filterGrosir || p.tersediaGrosir;
    const matchKuliner = !filterKuliner || p.tersediaPemasokKuliner;
    return matchSearch && matchKategori && matchGrosir && matchKuliner;
  });

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16" style={{ backgroundColor: "var(--color-surface-muted)" }} aria-labelledby="produk-heading">
        <div className="container-content animate-fade-in-up">
          <p className="section-label mb-2">Katalog Resmi</p>
          <h1 id="produk-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Ragam Produk Tempe Gempeng
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Pilihan tempe segar tradisional daun pisang, tempe plastik higienis, tempe balokan, hingga olahan keripik tempe renyah yang diproduksi setiap hari.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-border py-3" aria-label="Filter produk">
        <div className="container-content flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari jenis produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-full focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--color-border)", minHeight: "44px" }}
              aria-label="Cari produk"
            />
          </div>
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter kategori produk">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterKategori(opt.value)}
                className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all flex-shrink-0 ${
                  filterKategori === opt.value
                    ? "text-white border-primary"
                    : "border-border text-text-secondary hover:border-text-secondary"
                }`}
                style={filterKategori === opt.value ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" } : {}}
                aria-pressed={filterKategori === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterGrosir(!filterGrosir)}
              className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${filterGrosir ? "text-white border-primary" : "border-border text-text-secondary"}`}
              style={filterGrosir ? { backgroundColor: "var(--color-primary)" } : {}}
              aria-pressed={filterGrosir}
            >
              Grosir
            </button>
            <button
              onClick={() => setFilterKuliner(!filterKuliner)}
              className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${filterKuliner ? "text-white border-primary" : "border-border text-text-secondary"}`}
              style={filterKuliner ? { backgroundColor: "var(--color-primary)" } : {}}
              aria-pressed={filterKuliner}
            >
              Pemasok Kuliner
            </button>
          </div>
        </div>
      </section>

      <section className="section-spacing" aria-live="polite">
        <div className="container-content">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <h2 className="text-lg font-semibold text-text-primary mb-2">Produk tidak ditemukan</h2>
              <p className="text-text-secondary text-sm mb-4">Coba ubah filter atau kata kunci</p>
              <button onClick={() => { setSearch(""); setFilterKategori("semua"); setFilterGrosir(false); setFilterKuliner(false); }} className="btn-secondary text-sm">
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-text-secondary mb-6">
                Menampilkan <strong className="text-text-primary">{filtered.length}</strong> jenis produk
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => <ProductCard key={p.id} produk={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
