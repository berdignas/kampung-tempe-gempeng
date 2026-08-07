"use client";

import Link from "next/link";
import {
  Store,
  Package,
  Newspaper,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  FileText,
  MapPin,
} from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

export default function AdminDashboard() {
  const { umkmList, produkList, beritaList, pengaturan } = useCMS();

  const totalUMKM = umkmList.length;
  const umkmAktif = umkmList.filter((u) => u.statusPublikasi).length;
  const totalProduk = produkList.length;
  const totalBerita = beritaList.length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/50 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck size={14} />
            <span>Portal Komunitas Kolektif Gempeng</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Dashboard Pengelola CMS
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Kelola data UMKM, katalog produk tempe, dokumentasi kegiatan, dan informasi resmi kawasan Kampung Tempe Gempeng secara terpadu.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-40px] opacity-10 pointer-events-none">
          <Store size={260} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Pelaku UMKM</span>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Store size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-800">{totalUMKM}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {umkmAktif} Aktif
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Katalog Produk</span>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
              <Package size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-800">{totalProduk}</span>
            <span className="text-xs text-slate-500">Varian Produk</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Berita & Kegiatan</span>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Newspaper size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-800">{totalBerita}</span>
            <span className="text-xs text-slate-500">Artikel Terbit</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Status Portal</span>
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold text-emerald-600">Terpublikasi</span>
            <span className="text-xs text-slate-400">100% Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Fairness Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Plus size={18} className="text-emerald-600" />
            Aksi Cepat Pengelolaan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/umkm/tambah"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition">
                +
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-800 group-hover:text-emerald-700">
                  Tambah UMKM Baru
                </h3>
                <p className="text-xs text-slate-500">Daftarkan rumah produksi tempe</p>
              </div>
            </Link>

            <Link
              href="/admin/produk/tambah"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold group-hover:scale-105 transition">
                +
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-800 group-hover:text-amber-700">
                  Tambah Varian Produk
                </h3>
                <p className="text-xs text-slate-500">Katalog jenis tempe kawasan</p>
              </div>
            </Link>

            <Link
              href="/admin/berita/tambah"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition">
                +
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-800 group-hover:text-blue-700">
                  Tulis Artikel Berita
                </h3>
                <p className="text-xs text-slate-500">Pelatihan, KKN, & kegiatan warga</p>
              </div>
            </Link>

            <Link
              href="/admin/pengaturan"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold group-hover:scale-105 transition">
                ⚙
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-800 group-hover:text-purple-700">
                  Pengaturan Kawasan
                </h3>
                <p className="text-xs text-slate-500">Kontak sekretariat & hero text</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="bg-emerald-950 text-emerald-100 p-6 rounded-xl border border-emerald-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <AlertCircle size={18} />
            <h3>Prinsip Kesetaraan UMKM</h3>
          </div>
          <p className="text-xs leading-relaxed text-emerald-200">
            Sesuai pedoman portal Kampung Tempe Gempeng:
          </p>
          <ul className="text-xs space-y-2 list-disc list-inside text-emerald-300">
            <li>Tidak diperbolehkan memberi badge "Terbaik" / "Favorit".</li>
            <li>Tidak ada urutan berbayar atau promosi eksklusif.</li>
            <li>Semua UMKM tampil secara alfabetis atau rotasi adil.</li>
            <li>Kontak transaksi diarahkan langsung ke WhatsApp pemilik.</li>
          </ul>
        </div>
      </div>

      {/* Ringkasan UMKM Terdaftar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base text-slate-800">
              Daftar UMKM Terdaftar
            </h2>
            <p className="text-xs text-slate-500">
              Kelola status publikasi dan data rumah produksi
            </p>
          </div>
          <Link
            href="/admin/umkm"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Nama Usaha</th>
                <th className="p-4">Pemilik</th>
                <th className="p-4">Alamat</th>
                <th className="p-4">Layanan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {umkmList.slice(0, 5).map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-semibold text-slate-800">
                    {u.namaUsaha}
                  </td>
                  <td className="p-4">{u.namaPemilik}</td>
                  <td className="p-4 max-w-[200px] truncate">{u.alamat}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.jenisLayanan.map((l) => (
                        <span
                          key={l}
                          className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 capitalize"
                        >
                          {l.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {u.statusPublikasi ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle size={12} />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/umkm/${u.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                        title="Lihat Halaman"
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
