"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Berita, KategoriBerita } from "@/lib/data/berita";
import { useCMS } from "@/lib/cms/CMSContext";
import { useAlertModal } from "@/components/ui/AlertModal";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface BeritaFormProps {
  initialData?: Berita;
  isEdit?: boolean;
}

export default function BeritaForm({ initialData, isEdit }: BeritaFormProps) {
  const router = useRouter();
  const { addBerita, updateBerita } = useCMS();
  const { showAlert } = useAlertModal();

  const [judul, setJudul] = useState(initialData?.judul || "");
  const [kategori, setKategori] = useState<KategoriBerita>(
    initialData?.kategori || "kegiatan-warga"
  );
  const [tanggal, setTanggal] = useState(
    initialData?.tanggal || new Date().toISOString().split("T")[0]
  );
  const [ringkasan, setRingkasan] = useState(initialData?.ringkasan || "");
  const [konten, setKonten] = useState(initialData?.konten || "");
  const [thumbnail, setThumbnail] = useState(
    initialData?.thumbnail || ""
  );
  const [galeriInput, setGaleriInput] = useState(
    initialData?.galeri ? initialData.galeri.join(", ") : ""
  );
  const [penulis, setPenulis] = useState(
    initialData?.penulis || "Tim Pengelola Portal"
  );

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul || "");
      setKategori(initialData.kategori || "kegiatan-warga");
      setTanggal(initialData.tanggal || new Date().toISOString().split("T")[0]);
      setRingkasan(initialData.ringkasan || "");
      setKonten(initialData.konten || "");
      setThumbnail(initialData.thumbnail || "");
      setGaleriInput(initialData.galeri ? initialData.galeri.join(", ") : "");
      setPenulis(initialData.penulis || "Tim Pengelola Portal");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const galeri = galeriInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const formData = {
      slug,
      judul,
      kategori,
      tanggal,
      ringkasan,
      konten,
      thumbnail,
      galeri,
      penulis,
    };

    if (isEdit && initialData) {
      updateBerita(initialData.id, formData);
      showAlert({
        title: "Artikel Berita Berhasil Diperbarui!",
        message: `Artikel "${judul}" berhasil disimpan dan diperbarui di portal kabar & berita.`,
        type: "success",
        badgeText: "Artikel Diperbarui",
        confirmText: "Kembali ke Daftar",
        actionHref: `/berita/${slug}`,
        actionText: "Lihat Artikel di Web",
        onConfirm: () => router.push("/admin/berita"),
      });
    } else {
      addBerita(formData);
      showAlert({
        title: "Artikel Berita Berhasil Dipublikasikan!",
        message: `Artikel "${judul}" berhasil dipublikasikan dan langsung aktif di halaman berita kawasan.`,
        type: "success",
        badgeText: "Dipublikasikan",
        confirmText: "Kembali ke Daftar",
        actionHref: `/berita/${slug}`,
        actionText: "Lihat Artikel di Web",
        onConfirm: () => router.push("/admin/berita"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Header Bar */}
      <div className="border-b border-slate-200 pb-4">
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-1"
        >
          <ArrowLeft size={14} />
          Kembali ke Daftar Berita
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? `Edit Artikel: ${initialData?.judul}` : "Tulis Artikel Berita Baru"}
        </h1>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Judul Artikel */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Judul Artikel Berita *</label>
          <input
            type="text"
            required
            placeholder="Contoh: Pelatihan Sanitasi dan Higienitas Produksi Tempe Gempeng"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Kategori */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Kategori Kegiatan *</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value as KategoriBerita)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          >
            <option value="pelatihan">Pelatihan</option>
            <option value="kegiatan-warga">Kegiatan Warga</option>
            <option value="kunjungan">Kunjungan</option>
            <option value="program-kkn">Program KKN</option>
            <option value="pengembangan-umkm">Pengembangan UMKM</option>
          </select>
        </div>

        {/* Tanggal & Penulis */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Tanggal Rilis *</label>
          <input
            type="date"
            required
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Penulis / Sumber *</label>
          <input
            type="text"
            required
            placeholder="Tim Pengelola Portal / Tim KKN UBAYA"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Ringkasan */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Ringkasan Singkat (Teaser) *</label>
          <textarea
            required
            rows={2}
            placeholder="Tulis ringkasan 1-2 kalimat untuk kartu pratinjau berita..."
            value={ringkasan}
            onChange={(e) => setRingkasan(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Isi Artikel */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Isi Konten Artikel *</label>
          <textarea
            required
            rows={8}
            placeholder="Tulis isi berita lengkap di sini..."
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
          />
        </div>

        {/* Thumbnail Foto dengan ImageUploader */}
        <div className="space-y-1.5 md:col-span-2 border-t border-slate-100 pt-4">
          <ImageUploader
            label="Gambar Utama (Thumbnail Berita - 16:9)"
            value={thumbnail}
            onChange={(url) => setThumbnail(url)}
            aspectRatio={16 / 9}
            aspectRatioLabel="16:9 (Ukuran Kartu Berita)"
            previewMaxWidth="max-w-lg"
            helpText="Upload foto berita. Anda dapat menggeser (drag) dan memotong foto agar pas di kartu berita."
          />
        </div>

        {/* Galeri Gambar */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">
            URL Galeri Dokumentasi (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            placeholder="https://.../foto1.jpg, https://.../foto2.jpg"
            value={galeriInput}
            onChange={(e) => setGaleriInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Tombol Simpan di Bawah */}
        <div className="md:col-span-2 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/admin/berita"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition text-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer active:scale-98"
          >
            <Save size={18} />
            {isEdit ? "Simpan Perubahan" : "Publikasikan Artikel"}
          </button>
        </div>
      </div>
    </form>
  );
}
