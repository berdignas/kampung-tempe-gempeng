"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UMKM, JenisLayanan } from "@/lib/data/umkm";
import { useCMS } from "@/lib/cms/CMSContext";
import Link from "next/link";
import { ArrowLeft, Save, MapPin, User, Store } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import LocationPicker from "@/components/admin/LocationPicker";

interface UMKMFormProps {
  initialData?: UMKM;
  isEdit?: boolean;
}

export default function UMKMForm({ initialData, isEdit }: UMKMFormProps) {
  const router = useRouter();
  const { addUMKM, updateUMKM } = useCMS();

  const [namaUsaha, setNamaUsaha] = useState(initialData?.namaUsaha || "");
  const [namaPemilik, setNamaPemilik] = useState(initialData?.namaPemilik || "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [alamat, setAlamat] = useState(initialData?.alamat || "");
  const [lat, setLat] = useState(Number(initialData?.koordinat?.lat) || -7.5953);
  const [lng, setLng] = useState(Number(initialData?.koordinat?.lng) || 112.7844);
  const [nomorWhatsApp, setNomorWhatsApp] = useState(initialData?.nomorWhatsApp || "6281");
  const [jamOperasional, setJamOperasional] = useState(
    initialData?.jamOperasional || "Setiap hari, 05.00–12.00 WIB"
  );
  const [tahunBerdiri, setTahunBerdiri] = useState(initialData?.tahunBerdiri || 2020);
  const [jenisLayanan, setJenisLayanan] = useState<JenisLayanan[]>(
    initialData?.jenisLayanan || ["eceran"]
  );
  const [fotoProfil, setFotoProfil] = useState(
    initialData?.foto || initialData?.galeri?.[0] || ""
  );
  const [statusPublikasi, setStatusPublikasi] = useState(
    initialData?.statusPublikasi ?? true
  );

  // Sync state if initialData loads or updates
  useEffect(() => {
    if (initialData) {
      setNamaUsaha(initialData.namaUsaha || "");
      setNamaPemilik(initialData.namaPemilik || "");
      setDeskripsi(initialData.deskripsi || "");
      setAlamat(initialData.alamat || "");
      setLat(Number(initialData.koordinat?.lat) || -7.5953);
      setLng(Number(initialData.koordinat?.lng) || 112.7844);
      setNomorWhatsApp(initialData.nomorWhatsApp || "6281");
      setJamOperasional(initialData.jamOperasional || "Setiap hari, 05.00–12.00 WIB");
      setTahunBerdiri(initialData.tahunBerdiri || 2020);
      setJenisLayanan(initialData.jenisLayanan || ["eceran"]);
      setFotoProfil(initialData.foto || initialData.galeri?.[0] || "");
      setStatusPublikasi(initialData.statusPublikasi ?? true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedSlug = namaUsaha
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const slug = initialData?.slug || generatedSlug;
    const cleanPhoto = fotoProfil.trim();

    const formData: Omit<UMKM, "id"> = {
      slug,
      namaUsaha,
      namaPemilik,
      deskripsi,
      alamat,
      koordinat: { lat: Number(lat), lng: Number(lng) },
      nomorWhatsApp,
      jamOperasional,
      tahunBerdiri: Number(tahunBerdiri),
      jenisLayanan,
      produkIds: [],
      galeri: cleanPhoto ? [cleanPhoto] : [],
      foto: cleanPhoto,
      statusPublikasi,
    };

    if (isEdit && initialData) {
      updateUMKM(initialData.id, formData);
      alert("Data profil UMKM berhasil disimpan & diperbarui!");
    } else {
      addUMKM(formData);
      alert("UMKM baru berhasil ditambahkan!");
    }

    router.push("/admin/umkm");
  };

  const toggleLayanan = (layanan: JenisLayanan) => {
    if (jenisLayanan.includes(layanan)) {
      setJenisLayanan(jenisLayanan.filter((l) => l !== layanan));
    } else {
      setJenisLayanan([...jenisLayanan, layanan]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Header Bar */}
      <div className="border-b border-slate-200 pb-4">
        <Link
          href="/admin/umkm"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-1"
        >
          <ArrowLeft size={14} />
          Kembali ke Daftar UMKM
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? `Edit Profil Pengrajin: ${initialData?.namaUsaha}` : "Tambah Pengrajin UMKM Baru"}
        </h1>
        <p className="text-xs text-slate-500">
          Seluruh data di bawah ini langsung terintegrasi secara presisi dengan halaman profil pengrajin (/umkm/[slug]) dan peta interaktif.
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Nama Usaha */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Nama Usaha UMKM *</label>
          <input
            type="text"
            required
            placeholder="Contoh: Tempe Bu Aminah"
            value={namaUsaha}
            onChange={(e) => setNamaUsaha(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Nama Pemilik */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Nama Pemilik Usaha *</label>
          <input
            type="text"
            required
            placeholder="Contoh: Aminah Susanti"
            value={namaPemilik}
            onChange={(e) => setNamaPemilik(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* WhatsApp & Tahun Berdiri */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Nomor WhatsApp Pemilik (Awali 628...) *
          </label>
          <input
            type="text"
            required
            placeholder="628113001001"
            value={nomorWhatsApp}
            onChange={(e) => setNomorWhatsApp(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Tahun Berdiri Usaha</label>
          <input
            type="number"
            value={tahunBerdiri}
            onChange={(e) => setTahunBerdiri(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Jam Operasional */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Jam Operasional</label>
          <input
            type="text"
            placeholder="Setiap hari, 05.00–12.00 WIB"
            value={jamOperasional}
            onChange={(e) => setJamOperasional(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Alamat Lengkap & Penentuan Titik Lokasi Peta Interaktif */}
        <div className="md:col-span-2 space-y-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-600" />
                Alamat Lengkap Rumah Produksi *
              </label>
              <span className="text-[11px] text-slate-500">
                (Dapat terisi otomatis dari pemilihan titik peta di bawah)
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="Contoh: Jl. Patimura No. 12, RT 02/RW 01, Kelurahan Gempeng, Bangil"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none font-medium shadow-xs"
            />
          </div>

          {/* Penentuan Titik Lokasi Peta (Interactive Picker) */}
          <div className="pt-2 border-t border-slate-200/80">
            <LocationPicker
              lat={lat}
              lng={lng}
              alamat={alamat}
              onChange={(newLat, newLng) => {
                setLat(newLat);
                setLng(newLng);
              }}
              onAddressSelect={(newAlamat) => {
                setAlamat(newAlamat);
              }}
            />
          </div>
        </div>

        {/* Deskripsi Usaha */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Profil & Cerita Usaha *</label>
          <textarea
            required
            rows={4}
            placeholder="Jelaskan sejarah singkat, keunggulan proses fermentasi kedelai alami, kapasitas pasokan harian, atau kekhasan tempe yang dihasilkan..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Foto Profil Pelaku Usaha (Rasio 9:16 Potret) */}
        <div className="space-y-2 md:col-span-2 border-t border-slate-100 pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <ImageUploader
              label="Foto Profil Pelaku Usaha (Format Potret 9:16)"
              value={fotoProfil}
              onChange={(url) => setFotoProfil(url)}
              aspectRatio={9 / 16}
              aspectRatioLabel="9:16 (Format Potret Pelaku Usaha)"
              previewMaxWidth="max-w-[180px]"
              helpText="Upload foto potret pelaku usaha / pengrajin tempe. Anda dapat menggeser posisi dan mengatur zoom foto dengan rasio potret 9:16."
            />
          </div>
        </div>

        {/* Jenis Layanan */}
        <div className="space-y-2 md:col-span-2 border-t border-slate-100 pt-4">
          <label className="text-xs font-semibold text-slate-700">Jenis Layanan Usaha</label>
          <div className="flex flex-wrap gap-4 text-xs">
            {[
              { id: "eceran", label: "Eceran (Pembelian Langsung)" },
              { id: "grosir", label: "Grosir (Pasar & Partai Besar)" },
              { id: "pemasok-kuliner", label: "Pemasok Kuliner (Restoran/Warung)" },
              { id: "distributor", label: "Distributor Regional" },
            ].map((l) => (
              <label key={l.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={jenisLayanan.includes(l.id as JenisLayanan)}
                  onChange={() => toggleLayanan(l.id as JenisLayanan)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{l.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Publikasi */}
        <div className="flex items-center justify-between md:col-span-2 border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs font-semibold text-slate-800">Status Publikasi</span>
            <p className="text-[11px] text-slate-500">
              Jika aktif, profil pengrajin ini akan langsung tampil di direktori publik dan peta sentra kawasan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatusPublikasi(!statusPublikasi)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
              statusPublikasi ? "bg-emerald-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                statusPublikasi ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Tombol Simpan Perubahan di Bawah */}
        <div className="md:col-span-2 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/admin/umkm"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition text-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer active:scale-98"
          >
            <Save size={18} />
            {isEdit ? "Simpan Perubahan" : "Simpan Pengrajin Baru"}
          </button>
        </div>
      </div>
    </form>
  );
}
