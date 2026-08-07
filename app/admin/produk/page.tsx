"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

export default function AdminProdukPage() {
  const { produkList, deleteProduk } = useCMS();
  const [search, setSearch] = useState("");

  const filteredProduk = produkList.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus varian produk "${nama}"?`)) {
      deleteProduk(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Katalog Produk Tempe</h1>
          <p className="text-xs text-slate-500">
            Kelola ragam olahan dan varian tempe khas Kampung Gempeng
          </p>
        </div>
        <Link
          href="/admin/produk/tambah"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition"
        >
          <Plus size={16} />
          Tambah Produk Baru
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama produk atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Ukuran Kemasan</th>
                <th className="p-4">Ketersediaan</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProduk.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Tidak ada varian produk yang cocok.
                  </td>
                </tr>
              ) : (
                filteredProduk.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-semibold text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <Package size={16} />
                      </div>
                      {p.nama}
                    </td>
                    <td className="p-4 capitalize">{p.kategori.replace(/-/g, " ")}</td>
                    <td className="p-4 max-w-[200px] truncate">
                      {p.ukuranKemasan.join(", ")}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.tersediaEceran && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                            Eceran
                          </span>
                        )}
                        {p.tersediaGrosir && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium">
                            Grosir
                          </span>
                        )}
                        {p.tersediaPemasokKuliner && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-medium">
                            Kuliner
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/produk/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                          title="Lihat Halaman Produk"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          href={`/admin/produk/${p.id}`}
                          className="p-1.5 rounded-md hover:bg-amber-50 text-amber-600 hover:text-amber-700 font-medium"
                          title="Edit Produk"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.nama)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700"
                          title="Hapus Produk"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
