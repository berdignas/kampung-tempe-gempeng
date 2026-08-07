"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";
import { JenisLayanan, labelLayanan } from "@/lib/data/umkm";

export default function AdminUMKMPage() {
  const { umkmList, updateUMKM, deleteUMKM } = useCMS();
  const [search, setSearch] = useState("");
  const [filterLayanan, setFilterLayanan] = useState<string>("all");

  const filteredUMKM = umkmList.filter((u) => {
    const matchSearch =
      u.namaUsaha.toLowerCase().includes(search.toLowerCase()) ||
      u.namaPemilik.toLowerCase().includes(search.toLowerCase()) ||
      u.alamat.toLowerCase().includes(search.toLowerCase());

    const matchLayanan =
      filterLayanan === "all" || u.jenisLayanan.includes(filterLayanan as JenisLayanan);

    return matchSearch && matchLayanan;
  });

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    updateUMKM(id, { statusPublikasi: !currentStatus });
  };

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus UMKM "${nama}"?`)) {
      deleteUMKM(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Pelaku UMKM</h1>
          <p className="text-xs text-slate-500">
            Daftar rumah produksi tempe yang terdaftar di Kampung Tempe Gempeng
          </p>
        </div>
        <Link
          href="/admin/umkm/tambah"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md transition"
        >
          <Plus size={16} />
          Tambah UMKM Baru
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama usaha, pemilik, atau alamat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-primary focus:bg-white"
          />
        </div>

        {/* Filter Layanan */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={14} className="text-slate-400" />
          <select
            value={filterLayanan}
            onChange={(e) => setFilterLayanan(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-primary"
          >
            <option value="all">Semua Layanan</option>
            <option value="eceran">Eceran</option>
            <option value="grosir">Grosir</option>
            <option value="pemasok-kuliner">Pemasok Kuliner</option>
            <option value="distributor">Distributor</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Nama Usaha</th>
                <th className="p-4">Pemilik</th>
                <th className="p-4">Tahun Berdiri</th>
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Layanan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUMKM.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Tidak ada data UMKM yang cocok.
                  </td>
                </tr>
              ) : (
                filteredUMKM.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-semibold text-slate-800">
                      {u.namaUsaha}
                    </td>
                    <td className="p-4">{u.namaPemilik}</td>
                    <td className="p-4">{u.tahunBerdiri}</td>
                    <td className="p-4 text-slate-500">{u.nomorWhatsApp}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {u.jenisLayanan.map((l) => (
                          <span
                            key={l}
                            className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium"
                          >
                            {labelLayanan[l]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(u.id, u.statusPublikasi)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${
                          u.statusPublikasi
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        }`}
                        title="Klik untuk mengubah status publikasi"
                      >
                        {u.statusPublikasi ? (
                          <>
                            <CheckCircle size={12} />
                            Aktif
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            Nonaktif
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/umkm/${u.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                          title="Lihat Tampilan Publik"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          href={`/admin/umkm/${u.id}`}
                          className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 font-medium"
                          title="Edit UMKM"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(u.id, u.namaUsaha)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700"
                          title="Hapus UMKM"
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
