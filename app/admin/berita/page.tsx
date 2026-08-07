"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Newspaper } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";
import { labelKategoriBerita } from "@/lib/data/berita";

export default function AdminBeritaPage() {
  const { beritaList, deleteBerita } = useCMS();
  const [search, setSearch] = useState("");

  const filteredBerita = beritaList.filter(
    (b) =>
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, judul: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${judul}"?`)) {
      deleteBerita(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Berita & Kegiatan Kawasan</h1>
          <p className="text-xs text-slate-500">
            Publikasikan artikel pelatihan, kunjungan KKN, dan kegiatan UMKM Gempeng
          </p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition"
        >
          <Plus size={16} />
          Tulis Artikel Baru
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul artikel atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Penulis</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBerita.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Tidak ada artikel yang cocok.
                  </td>
                </tr>
              ) : (
                filteredBerita.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-semibold text-slate-800 max-w-[320px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Newspaper size={16} />
                        </div>
                        <span className="line-clamp-2">{b.judul}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-[10px]">
                        {labelKategoriBerita[b.kategori]}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{b.tanggal}</td>
                    <td className="p-4">{b.penulis}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/berita/${b.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                          title="Lihat Artikel Publik"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          href={`/admin/berita/${b.id}`}
                          className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-medium"
                          title="Edit Artikel"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(b.id, b.judul)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700"
                          title="Hapus Artikel"
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
