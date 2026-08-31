"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms/CMSContext";
import { useAlertModal } from "@/components/ui/AlertModal";
import {
  Save,
  BookOpen,
  History,
  Target,
  HeartHandshake,
  Image as ImageIcon,
  Plus,
  Trash2,
  Megaphone,
  MapPin,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import LocationPicker from "@/components/admin/LocationPicker";
import { ProfilKampungData, TimelineItem, NilaiItem } from "@/lib/cms/cmsStore";

export default function AdminProfilPage() {
  const { profilData, updateProfil } = useCMS();
  const { showAlert } = useAlertModal();
  const [formData, setFormData] = useState<ProfilKampungData>(profilData);
  const [activeTab, setActiveTab] = useState<
    "hero" | "sejarah" | "timeline" | "visimisi" | "nilai" | "lokasi" | "cta"
  >("hero");

  useEffect(() => {
    if (profilData) {
      setFormData(profilData);
    }
  }, [profilData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfil(formData);
    showAlert({
      title: "Berhasil Disimpan",
      message: "Konten Profil Kampung berhasil diperbarui.",
      type: "success",
    });
  };

  // Timeline handlers
  const handleAddTimeline = () => {
    const newItem: TimelineItem = {
      tahun: "Tahun Baru",
      judul: "Judul Peristiwa",
      deskripsi: "Deskripsi singkat peristiwa sejarah...",
    };
    setFormData({
      ...formData,
      timeline: [...formData.timeline, newItem],
    });
  };

  const handleUpdateTimeline = (index: number, field: keyof TimelineItem, value: string) => {
    const updated = [...formData.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, timeline: updated });
  };

  const handleDeleteTimeline = (index: number) => {
    const updated = formData.timeline.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline: updated });
  };

  // Misi handlers
  const handleAddMisi = () => {
    setFormData({
      ...formData,
      misiList: [...formData.misiList, "Misi baru kawasan..."],
    });
  };

  const handleUpdateMisi = (index: number, value: string) => {
    const updated = [...formData.misiList];
    updated[index] = value;
    setFormData({ ...formData, misiList: updated });
  };

  const handleDeleteMisi = (index: number) => {
    const updated = formData.misiList.filter((_, i) => i !== index);
    setFormData({ ...formData, misiList: updated });
  };

  // Nilai handlers
  const handleAddNilai = () => {
    const newItem: NilaiItem = {
      judul: "Prinsip Baru",
      deskripsi: "Penjelasan prinsip dan nilai bersama...",
    };
    setFormData({
      ...formData,
      nilaiList: [...formData.nilaiList, newItem],
    });
  };

  const handleUpdateNilai = (index: number, field: keyof NilaiItem, value: string) => {
    const updated = [...formData.nilaiList];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, nilaiList: updated });
  };

  const handleDeleteNilai = (index: number) => {
    const updated = formData.nilaiList.filter((_, i) => i !== index);
    setFormData({ ...formData, nilaiList: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-20">
      {/* Header Bar */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Kelola Konten Halaman Profil Kampung (/profil)
        </h1>
        <p className="text-xs text-slate-500">
          Edit narasi sejarah, linimasa perjalanan, visi & misi, nilai bersama, dan foto banner halaman profil kawasan.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: "hero", label: "Hero & Banner", icon: ImageIcon },
          { id: "sejarah", label: "Sejarah Narasi", icon: History },
          { id: "timeline", label: "Linimasa Sejarah", icon: BookOpen },
          { id: "visimisi", label: "Visi & Misi", icon: Target },
          { id: "nilai", label: "Nilai Bersama", icon: HeartHandshake },
          { id: "lokasi", label: "Lokasi Kawasan", icon: MapPin },
          { id: "cta", label: "Call to Action", icon: Megaphone },
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

      {/* Tab 1: Hero & Banner */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <ImageIcon size={18} className="text-emerald-600" />
            <h2>Header Hero & Banner Foto Halaman Profil</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Teks Eyebrow Header</label>
                <input
                  type="text"
                  required
                  value={formData.heroEyebrow}
                  onChange={(e) => setFormData({ ...formData, heroEyebrow: e.target.value })}
                  placeholder="Profil Kawasan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Judul Utama Halaman Profil</label>
                <input
                  type="text"
                  required
                  value={formData.heroJudul}
                  onChange={(e) => setFormData({ ...formData, heroJudul: e.target.value })}
                  placeholder="Identitas & Legasi Kampung Tempe Gempeng"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi Pengantar Profil</label>
              <textarea
                required
                rows={3}
                value={formData.heroDeskripsi}
                onChange={(e) => setFormData({ ...formData, heroDeskripsi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <ImageUploader
                label="Foto Banner Utama Halaman Profil (Landscape Lebar 21:9)"
                value={formData.bannerFoto}
                onChange={(url) => setFormData({ ...formData, bannerFoto: url })}
                aspectRatio={21 / 9}
                aspectRatioLabel="21:9 (Ukuran Banner Lebar Profil Kawasan)"
                previewMaxWidth="max-w-2xl"
                helpText="Upload foto pemukiman/kawasan. Anda dapat menggeser (drag) dan memotong foto sesuai rasio banner lebar."
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sejarah Narasi */}
      {activeTab === "sejarah" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <History size={18} className="text-emerald-600" />
            <h2>Narasi Sejarah & Jejak Langkah Sentra</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Teks Eyebrow Sejarah</label>
                <input
                  type="text"
                  required
                  value={formData.sejarahEyebrow}
                  onChange={(e) => setFormData({ ...formData, sejarahEyebrow: e.target.value })}
                  placeholder="Sejarah & Perjalanan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Judul Section Sejarah</label>
                <input
                  type="text"
                  required
                  value={formData.sejarahJudul}
                  onChange={(e) => setFormData({ ...formData, sejarahJudul: e.target.value })}
                  placeholder="Jejak Langkah Sentra Tempe Gempeng"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Paragraf 1 (Awal Mula & Karakter Tempe)</label>
              <textarea
                required
                rows={4}
                value={formData.sejarahParagraf1}
                onChange={(e) => setFormData({ ...formData, sejarahParagraf1: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Paragraf 2 (Transformasi & Masa Depan Kawasan)</label>
              <textarea
                required
                rows={4}
                value={formData.sejarahParagraf2}
                onChange={(e) => setFormData({ ...formData, sejarahParagraf2: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline Sejarah */}
      {activeTab === "timeline" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BookOpen size={18} className="text-emerald-600" />
              <h2>Linimasa Peristiwa Sejarah Kawasan</h2>
            </div>

            <button
              type="button"
              onClick={handleAddTimeline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition"
            >
              <Plus size={14} />
              Tambah Peristiwa
            </button>
          </div>

          <div className="space-y-4">
            {formData.timeline.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">Peristiwa #{index + 1}</span>
                  {formData.timeline.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTimeline(index)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                      title="Hapus Peristiwa Ini"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Tahun / Periode</label>
                    <input
                      type="text"
                      required
                      value={item.tahun}
                      onChange={(e) => handleUpdateTimeline(index, "tahun", e.target.value)}
                      placeholder="Misal: 1990-an"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Judul Peristiwa</label>
                    <input
                      type="text"
                      required
                      value={item.judul}
                      onChange={(e) => handleUpdateTimeline(index, "judul", e.target.value)}
                      placeholder="Misal: Awal Perkembangan Kawasan"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Deskripsi Rincian</label>
                  <textarea
                    required
                    rows={2}
                    value={item.deskripsi}
                    onChange={(e) => handleUpdateTimeline(index, "deskripsi", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Visi & Misi */}
      {activeTab === "visimisi" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Target size={18} className="text-emerald-600" />
            <h2>Visi & Misi Pengembangan Kawasan</h2>
          </div>

          {/* Visi */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Visi Kawasan</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Visi</label>
              <input
                type="text"
                required
                value={formData.visiJudul}
                onChange={(e) => setFormData({ ...formData, visiJudul: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Teks Pernyataan Visi</label>
              <textarea
                required
                rows={3}
                value={formData.visiTeks}
                onChange={(e) => setFormData({ ...formData, visiTeks: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Misi */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Poin-Poin Misi Kawasan</h3>
              <button
                type="button"
                onClick={handleAddMisi}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition"
              >
                <Plus size={13} />
                Tambah Poin Misi
              </button>
            </div>

            <div className="space-y-2">
              {formData.misiList.map((misi, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    required
                    value={misi}
                    onChange={(e) => handleUpdateMisi(idx, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  {formData.misiList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMisi(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition"
                      title="Hapus Poin Ini"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Nilai Bersama */}
      {activeTab === "nilai" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <HeartHandshake size={18} className="text-emerald-600" />
              <h2>Nilai Bersama & Prinsip Komunitas</h2>
            </div>

            <button
              type="button"
              onClick={handleAddNilai}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition"
            >
              <Plus size={14} />
              Tambah Nilai Bersama
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Teks Eyebrow</label>
              <input
                type="text"
                required
                value={formData.nilaiEyebrow}
                onChange={(e) => setFormData({ ...formData, nilaiEyebrow: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Utama</label>
              <input
                type="text"
                required
                value={formData.nilaiJudul}
                onChange={(e) => setFormData({ ...formData, nilaiJudul: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {formData.nilaiList.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">Prinsip #{index + 1}</span>
                  {formData.nilaiList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteNilai(index)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                      title="Hapus Nilai Ini"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Judul Nilai / Prinsip</label>
                  <input
                    type="text"
                    required
                    value={item.judul}
                    onChange={(e) => handleUpdateNilai(index, "judul", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Deskripsi Nilai</label>
                  <textarea
                    required
                    rows={2}
                    value={item.deskripsi}
                    onChange={(e) => handleUpdateNilai(index, "deskripsi", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Lokasi Kawasan */}
      {activeTab === "lokasi" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <MapPin size={18} className="text-emerald-600" />
            <h2>Lokasi Kawasan di Google Maps</h2>
          </div>

          <p className="text-xs text-slate-500">
            Atur label, alamat, dan koordinat kawasan yang akan ditampilkan di halaman profil publik. Pengunjung bisa langsung klik untuk menuju Google Maps.
          </p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Label Lokasi</label>
              <input
                type="text"
                required
                value={formData.lokasiLabel}
                onChange={(e) => setFormData({ ...formData, lokasiLabel: e.target.value })}
                placeholder="Kawasan Kampung Tempe Gempeng"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                value={formData.lokasiAlamat}
                onChange={(e) => setFormData({ ...formData, lokasiAlamat: e.target.value })}
                placeholder="Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan, Jawa Timur 67153"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            {/* Interactive Location Picker */}
            <div className="pt-2">
              <LocationPicker
                lat={parseFloat(formData.lokasiLat) || -7.5953}
                lng={parseFloat(formData.lokasiLng) || 112.7844}
                alamat={formData.lokasiAlamat}
                onChange={(newLat, newLng) => {
                  setFormData((prev) => ({
                    ...prev,
                    lokasiLat: String(newLat),
                    lokasiLng: String(newLng),
                  }));
                }}
                onAddressSelect={(newAlamat) => {
                  setFormData((prev) => ({
                    ...prev,
                    lokasiAlamat: newAlamat,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: CTA Bawah */}
      {activeTab === "cta" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Megaphone size={18} className="text-emerald-600" />
            <h2>Bagian Ajakan Aksi (CTA Bawah Halaman Profil)</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Judul Banner CTA</label>
              <input
                type="text"
                required
                value={formData.ctaJudul}
                onChange={(e) => setFormData({ ...formData, ctaJudul: e.target.value })}
                placeholder="Ingin Mengenal Lebih Dekat?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Deskripsi Ajakan CTA</label>
              <textarea
                required
                rows={3}
                value={formData.ctaDeskripsi}
                onChange={(e) => setFormData({ ...formData, ctaDeskripsi: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      )}
      {/* Tombol Simpan di Bawah */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer active:scale-98"
        >
          <Save size={18} />
          Simpan Halaman Profil
        </button>
      </div>
    </form>
  );
}
