"use client";

import { useState } from "react";
import { useCMS } from "@/lib/cms/CMSContext";
import { Save, Building, Phone, Mail, Clock, FileText } from "lucide-react";

export default function AdminPengaturanPage() {
  const { pengaturan, updatePengaturan } = useCMS();

  const [formData, setFormData] = useState(pengaturan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePengaturan(formData);
    alert("Pengaturan portal kawasan berhasil diperbarui!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Pengaturan Portal Kawasan
          </h1>
          <p className="text-xs text-slate-500">
            Kelola profil informasi umum, kontak pengelola, dan teks utama beranda
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-md transition"
        >
          <Save size={16} />
          Simpan Pengaturan
        </button>
      </div>

      {/* Form Grid */}
      <div className="space-y-6">
        {/* Identitas Kawasan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-2 border-b border-slate-100">
            <Building size={18} className="text-emerald-600" />
            <h2>Identitas Resmi Kawasan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Nama Kawasan</label>
              <input
                type="text"
                required
                value={formData.namaKawasan}
                onChange={(e) =>
                  setFormData({ ...formData, namaKawasan: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Subjudul Kawasan</label>
              <input
                type="text"
                required
                value={formData.subjudulKawasan}
                onChange={(e) =>
                  setFormData({ ...formData, subjudulKawasan: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Banner text */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-2 border-b border-slate-100">
            <FileText size={18} className="text-emerald-600" />
            <h2>Teks Utama Hero Beranda</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Headline Hero</label>
              <input
                type="text"
                required
                value={formData.heroHeadline}
                onChange={(e) =>
                  setFormData({ ...formData, heroHeadline: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi Subtext Hero</label>
              <textarea
                required
                rows={3}
                value={formData.heroSubtext}
                onChange={(e) =>
                  setFormData({ ...formData, heroSubtext: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Kontak Sekretariat Pengelola */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-2 border-b border-slate-100">
            <Phone size={18} className="text-emerald-600" />
            <h2>Kontak Sekretariat & Pengelola</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Alamat Sekretariat</label>
              <input
                type="text"
                required
                value={formData.alamatSekretariat}
                onChange={(e) =>
                  setFormData({ ...formData, alamatSekretariat: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">WhatsApp Pengelola (628...)</label>
              <input
                type="text"
                required
                value={formData.nomorWhatsAppPengelola}
                onChange={(e) =>
                  setFormData({ ...formData, nomorWhatsAppPengelola: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Email Sekretariat</label>
              <input
                type="email"
                required
                value={formData.emailPengelola}
                onChange={(e) =>
                  setFormData({ ...formData, emailPengelola: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Jam Layanan Pengelola</label>
              <input
                type="text"
                required
                value={formData.jamLayananPengelola}
                onChange={(e) =>
                  setFormData({ ...formData, jamLayananPengelola: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
