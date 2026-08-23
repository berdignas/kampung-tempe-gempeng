"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UMKM, JenisLayanan } from "@/lib/data/umkm";
import { useCMS } from "@/lib/cms/CMSContext";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface UMKMFormProps {
  initialData?: UMKM;
  isEdit?: boolean;
}

export default function UMKMForm({ initialData, isEdit }: UMKMFormProps) {
  const router = useRouter();
  const { addUMKM, updateUMKM, produkList } = useCMS();

  const [namaUsaha, setNamaUsaha] = useState(initialData?.namaUsaha || "");
  const [namaPemilik, setNamaPemilik] = useState(initialData?.namaPemilik || "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [alamat, setAlamat] = useState(initialData?.alamat || "");
  const [lat, setLat] = useState(initialData?.koordinat?.lat || -7.5953);
  const [lng, setLng] = useState(initialData?.koordinat?.lng || 112.7844);
  const [nomorWhatsApp, setNomorWhatsApp] = useState(initialData?.nomorWhatsApp || "6281");
  const [jamOperasional, setJamOperasional] = useState(
    initialData?.jamOperasional || "Setiap hari, 05.00–12.00 WIB"
  );
  const [tahunBerdiri, setTahunBerdiri] = useState(initialData?.tahunBerdiri || 2020);
  const [jenisLayanan, setJenisLayanan] = useState<JenisLayanan[]>(
    initialData?.jenisLayanan || ["eceran"]
  );
  const [produkIds, setProdukIds] = useState<string[]>(initialData?.produkIds || []);
  const [utamaImage, setUtamaImage] = useState(
    initialData?.galeri?.[0] || "/images/umkm/umkm-1-a.jpg"
  );
  const [galeriExtra, setGaleriExtra] = useState(
    initialData?.galeri && initialData.galeri.length > 1
      ? initialData.galeri.slice(1).join(", ")
      : ""
  );
  const [statusPublikasi, setStatusPublikasi] = useState(
    initialData?.statusPublikasi ?? true
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = namaUsaha
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const extra = galeriExtra
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const galeri = [utamaImage, ...extra].filter((img) => img.length > 0);

    const formData = {
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
      produkIds,
      galeri,
      statusPublikasi,
    };

    if (isEdit && initialData) {
      updateUMKM(initialData.id, formData);
      alert("Data UMKM berhasil diperbarui!");
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

  const toggleProduk = (prodId: string) => {
    if (produkIds.includes(prodId)) {
      setProdukIds(produkIds.filter((p) => p !== prodId));
    } else {
      setProdukIds([...produkIds, prodId]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Link
            href="/admin/umkm"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-1"
          >
            <ArrowLeft size={14} />
            Kembali ke Daftar UMKM
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEdit ? `Edit UMKM: ${initialData?.namaUsaha}` : "Tambah UMKM Baru"}
          </h1>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition"
        >
          <Save size={16} />
          {isEdit ? "Simpan Perubahan" : "Simpan UMKM Baru"}
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Nama Usaha */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Nama Usaha *</label>
          <input
            type="text"
            required
            placeholder="Contoh: Tempe Bu Aminah"
            value={namaUsaha}
            onChange={(e) => setNamaUsaha(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Nama Pemilik */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Nama Pemilik *</label>
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
            Nomor WhatsApp (Awali 628...) *
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

        {/* Alamat Lengkap */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Alamat Usaha *</label>
          <input
            type="text"
            required
            placeholder="Jl. Gempeng No. 12, RT 02/RW 01, Kelurahan Gempeng, Bangil"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Koordinat Peta */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Latitude (Peta)</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Longitude (Peta)</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Deskripsi Usaha */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Profil & Cerita Usaha *</label>
          <textarea
            required
            rows={4}
            placeholder="Jelaskan sejarah singkat, keunggulan proses fermentasi, atau kapasitas pasokan..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Foto Utama Tempat Usaha */}
        <div className="space-y-1.5 md:col-span-2 border-t border-slate-100 pt-4">
          <ImageUploader
            label="Foto Utama Tempat Usaha UMKM"
            value={utamaImage}
            onChange={(url) => setUtamaImage(url)}
            helpText="Pilih file gambar dari komputer Anda atau masukkan URL."
          />
        </div>

        {/* Galeri Tambahan */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">
            URL Foto Galeri Tambahan (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            placeholder="/images/umkm/umkm-1-b.jpg, /images/umkm/umkm-1-c.jpg"
            value={galeriExtra}
            onChange={(e) => setGaleriExtra(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
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

        {/* Produk Diproduksi */}
        <div className="space-y-2 md:col-span-2 border-t border-slate-100 pt-4">
          <label className="text-xs font-semibold text-slate-700">Varian Produk Diproduksi</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {produkList.map((p) => (
              <label key={p.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={produkIds.includes(p.id)}
                  onChange={() => toggleProduk(p.id)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{p.nama}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Publikasi */}
        <div className="flex items-center justify-between md:col-span-2 border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs font-semibold text-slate-800">Status Publikasi</span>
            <p className="text-[11px] text-slate-500">
              Jika aktif, UMKM ini akan tampil di direktori publik dan peta kawasan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatusPublikasi(!statusPublikasi)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
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
      </div>
    </form>
  );
}
