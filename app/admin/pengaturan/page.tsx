"use client";

import { useState } from "react";
import { useCMS } from "@/lib/cms/CMSContext";
import {
  Save,
  Building,
  Phone,
  FileText,
  BarChart3,
  Home,
  Megaphone,
  Layers,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminPengaturanPage() {
  const { pengaturan, updatePengaturan } = useCMS();
  const [formData, setFormData] = useState(pengaturan);
  const [activeTab, setActiveTab] = useState<
    "hero" | "stats" | "profile" | "cta" | "contact"
  >("hero");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePengaturan(formData);
    alert("Seluruh konten halaman utama & pengaturan portal berhasil disimpan & di-update!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Pengaturan Konten Halaman Utama & Portal
          </h1>
          <p className="text-xs text-slate-500">
            Edit seluruh teks, statistik, foto, dan informasi kontak yang tampil di halaman beranda web portal.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition"
        >
          <Save size={16} />
          Simpan Semua Perubahan
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: "hero", label: "Hero Banner", icon: Home },
          { id: "stats", label: "Dalam Angka (Stats)", icon: BarChart3 },
          { id: "profile", label: "Profil Kampung Teaser", icon: Layers },
          { id: "cta", label: "Call to Action (CTA)", icon: Megaphone },
          { id: "contact", label: "Kontak & Sekretariat", icon: Building },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Hero Banner */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <FileText size={18} className="text-emerald-600" />
            <h2>Konten Section Hero (Header Utama Beranda)</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Teks Label Eyebrow</label>
              <input
                type="text"
                required
                value={formData.heroEyebrow || ""}
                onChange={(e) => setFormData({ ...formData, heroEyebrow: e.target.value })}
                placeholder="Sentra Produksi Tempe di Bangil, Pasuruan"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Utama (Headline Hero)</label>
              <input
                type="text"
                required
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                placeholder="Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi Subtext Hero</label>
              <textarea
                required
                rows={3}
                value={formData.heroSubtext}
                onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Foto Hero */}
            <div className="pt-2 border-t border-slate-100">
              <ImageUploader
                label="Foto Banner Utama Hero"
                value={formData.heroImage || "/images/hero-tempe-production.jpg"}
                onChange={(url) => setFormData({ ...formData, heroImage: url })}
                helpText="Klik tombol di atas untuk memilih foto dari file komputer Anda (JPG, PNG, WebP) atau tempelkan URL."
              />
            </div>

            {/* Tombol CTA Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Label Tombol Utama (Primary)</label>
                <input
                  type="text"
                  value={formData.heroCtaPrimaryLabel || "Jelajahi UMKM"}
                  onChange={(e) => setFormData({ ...formData, heroCtaPrimaryLabel: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Label Tombol Kedua (Secondary)</label>
                <input
                  type="text"
                  value={formData.heroCtaSecondaryLabel || "Lihat Peta Produksi"}
                  onChange={(e) => setFormData({ ...formData, heroCtaSecondaryLabel: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stats Section */}
      {activeTab === "stats" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <BarChart3 size={18} className="text-emerald-600" />
            <h2>Konten Section "Kampung Tempe Dalam Angka" (Statistik Kawasan)</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Section Statistik</label>
              <input
                type="text"
                required
                value={formData.statsHeading || "Kampung Tempe Gempeng dalam Angka"}
                onChange={(e) => setFormData({ ...formData, statsHeading: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Stat Item 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-xs font-bold text-emerald-700">Kartu Statistik 1</span>
                <input
                  type="text"
                  placeholder="Nilai (Misal: 20+)"
                  value={formData.statsItem1Value || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem1Value: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-600"
                />
                <input
                  type="text"
                  placeholder="Label (Misal: Pelaku UMKM)"
                  value={formData.statsItem1Label || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem1Label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Catatan Kaki (Misal: Terdaftar di kawasan)"
                  value={formData.statsItem1Note || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem1Note: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                />
              </div>

              {/* Stat Item 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-xs font-bold text-emerald-700">Kartu Statistik 2</span>
                <input
                  type="text"
                  placeholder="Nilai (Misal: 20+)"
                  value={formData.statsItem2Value || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem2Value: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-600"
                />
                <input
                  type="text"
                  placeholder="Label (Misal: Rumah Produksi)"
                  value={formData.statsItem2Label || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem2Label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Catatan Kaki (Misal: Aktif berproduksi)"
                  value={formData.statsItem2Note || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem2Note: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                />
              </div>

              {/* Stat Item 3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-xs font-bold text-emerald-700">Kartu Statistik 3</span>
                <input
                  type="text"
                  placeholder="Nilai (Misal: 30+ Tahun)"
                  value={formData.statsItem3Value || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem3Value: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-600"
                />
                <input
                  type="text"
                  placeholder="Label (Misal: Kawasan Berkembang)"
                  value={formData.statsItem3Label || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem3Label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Catatan Kaki (Misal: Warisan turun-temurun)"
                  value={formData.statsItem3Note || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem3Note: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                />
              </div>

              {/* Stat Item 4 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-xs font-bold text-emerald-700">Kartu Statistik 4</span>
                <input
                  type="text"
                  placeholder="Nilai (Misal: Bangil & Sekitar)"
                  value={formData.statsItem4Value || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem4Value: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-600"
                />
                <input
                  type="text"
                  placeholder="Label (Misal: Jangkauan Distribusi)"
                  value={formData.statsItem4Label || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem4Label: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Catatan Kaki (Misal: Pasar lokal & regional)"
                  value={formData.statsItem4Note || ""}
                  onChange={(e) => setFormData({ ...formData, statsItem4Note: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Profile Teaser Section */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Layers size={18} className="text-emerald-600" />
            <h2>Konten Section "Mengenal Kampung Tempe Gempeng" (Teaser Profil)</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Teks Label Eyebrow</label>
                <input
                  type="text"
                  value={formData.profileTeaserEyebrow || "Profil Kawasan"}
                  onChange={(e) => setFormData({ ...formData, profileTeaserEyebrow: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Judul Teaser Profil</label>
                <input
                  type="text"
                  value={formData.profileTeaserHeading || "Mengenal Kampung Tempe Gempeng"}
                  onChange={(e) => setFormData({ ...formData, profileTeaserHeading: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Paragraf Pertama (Sejarah / Pengenalan)</label>
              <textarea
                rows={3}
                value={formData.profileTeaserParagraph1 || ""}
                onChange={(e) => setFormData({ ...formData, profileTeaserParagraph1: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Paragraf Kedua (Visi / Komitmen Kawasan)</label>
              <textarea
                rows={3}
                value={formData.profileTeaserParagraph2 || ""}
                onChange={(e) => setFormData({ ...formData, profileTeaserParagraph2: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <ImageUploader
                label="Foto Profil Kawasan"
                value={formData.profileTeaserImage || "/images/kampung-profile.jpg"}
                onChange={(url) => setFormData({ ...formData, profileTeaserImage: url })}
                helpText="Upload foto suasana kawasan kampung tempe dari komputer atau masukkan URL."
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-700">Teks Badge Aksen (Pojok Foto)</label>
              <input
                type="text"
                value={formData.profileTeaserAccentVal || "30+ Tahun"}
                onChange={(e) => setFormData({ ...formData, profileTeaserAccentVal: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: CTA Section */}
      {activeTab === "cta" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Megaphone size={18} className="text-emerald-600" />
            <h2>Konten Section Call to Action (CTA Bawah Beranda)</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Teks Eyebrow CTA</label>
              <input
                type="text"
                value={formData.ctaSectionEyebrow || "Temukan Produsen"}
                onChange={(e) => setFormData({ ...formData, ctaSectionEyebrow: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Utama Banner CTA</label>
              <input
                type="text"
                value={formData.ctaSectionHeading || "Temukan Produsen yang Sesuai Kebutuhan Anda"}
                onChange={(e) => setFormData({ ...formData, ctaSectionHeading: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi Banner CTA</label>
              <textarea
                rows={3}
                value={formData.ctaSectionSubtext || ""}
                onChange={(e) => setFormData({ ...formData, ctaSectionSubtext: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Label Tombol 1</label>
                <input
                  type="text"
                  value={formData.ctaSectionBtn1Label || "Jelajahi UMKM"}
                  onChange={(e) => setFormData({ ...formData, ctaSectionBtn1Label: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Label Tombol 2</label>
                <input
                  type="text"
                  value={formData.ctaSectionBtn2Label || "Katalog Produk"}
                  onChange={(e) => setFormData({ ...formData, ctaSectionBtn2Label: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Contact & Sekretariat */}
      {activeTab === "contact" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Building size={18} className="text-emerald-600" />
            <h2>Kontak Sekretariat & Identitas Resmi Kawasan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Nama Kawasan</label>
              <input
                type="text"
                required
                value={formData.namaKawasan}
                onChange={(e) => setFormData({ ...formData, namaKawasan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Subjudul Kawasan</label>
              <input
                type="text"
                required
                value={formData.subjudulKawasan}
                onChange={(e) => setFormData({ ...formData, subjudulKawasan: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Alamat Sekretariat Kawasan</label>
              <input
                type="text"
                required
                value={formData.alamatSekretariat}
                onChange={(e) => setFormData({ ...formData, alamatSekretariat: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">WhatsApp Pengelola (Format 628...)</label>
              <input
                type="text"
                required
                value={formData.nomorWhatsAppPengelola}
                onChange={(e) => setFormData({ ...formData, nomorWhatsAppPengelola: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Email Pengelola / Sekretariat</label>
              <input
                type="email"
                required
                value={formData.emailPengelola}
                onChange={(e) => setFormData({ ...formData, emailPengelola: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Jam Layanan Pengelola</label>
              <input
                type="text"
                required
                value={formData.jamLayananPengelola}
                onChange={(e) => setFormData({ ...formData, jamLayananPengelola: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
