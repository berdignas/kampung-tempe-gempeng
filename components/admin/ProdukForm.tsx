"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Produk, KategoriProduk } from "@/lib/data/produk";
import { useCMS } from "@/lib/cms/CMSContext";
import { useAlertModal } from "@/components/ui/AlertModal";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface ProdukFormProps {
  initialData?: Produk;
  isEdit?: boolean;
}

export default function ProdukForm({ initialData, isEdit }: ProdukFormProps) {
  const router = useRouter();
  const { addProduk, updateProduk, umkmList } = useCMS();
  const { showAlert } = useAlertModal();

  const [nama, setNama] = useState(initialData?.nama || "");
  const [kategori, setKategori] = useState<KategoriProduk>(
    initialData?.kategori || "tempe-papan"
  );
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [deskripsiPanjang, setDeskripsiPanjang] = useState(
    initialData?.deskripsiPanjang || ""
  );
  const [ukuranKemasanInput, setUkuranKemasanInput] = useState(
    initialData?.ukuranKemasan
      ? initialData.ukuranKemasan.join(", ")
      : "Kecil (200g), Sedang (400g), Besar (600g)"
  );
  const [cocokUntukInput, setCocokUntukInput] = useState(
    initialData?.cocokUntuk
      ? initialData.cocokUntuk.join(", ")
      : "Masakan rumah tangga, Katering dan restoran, Warung makan"
  );
  const [produsenIds, setProdusenIds] = useState<string[]>(
    initialData?.produsenIds || []
  );
  const [foto, setFoto] = useState(
    initialData?.foto || ""
  );
  const [tersediaEceran, setTersediaEceran] = useState(
    initialData?.tersediaEceran ?? true
  );
  const [tersediaGrosir, setTersediaGrosir] = useState(
    initialData?.tersediaGrosir ?? true
  );
  const [tersediaPemasokKuliner, setTersediaPemasokKuliner] = useState(
    initialData?.tersediaPemasokKuliner ?? true
  );

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama || "");
      setKategori(initialData.kategori || "tempe-papan");
      setDeskripsi(initialData.deskripsi || "");
      setDeskripsiPanjang(initialData.deskripsiPanjang || "");
      setUkuranKemasanInput(
        initialData.ukuranKemasan
          ? initialData.ukuranKemasan.join(", ")
          : "Kecil (200g), Sedang (400g), Besar (600g)"
      );
      setCocokUntukInput(
        initialData.cocokUntuk
          ? initialData.cocokUntuk.join(", ")
          : "Masakan rumah tangga, Katering dan restoran, Warung makan"
      );
      setProdusenIds(initialData.produsenIds || []);
      setFoto(initialData.foto || "");
      setTersediaEceran(initialData.tersediaEceran ?? true);
      setTersediaGrosir(initialData.tersediaGrosir ?? true);
      setTersediaPemasokKuliner(initialData.tersediaPemasokKuliner ?? true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = nama
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const ukuranKemasan = ukuranKemasanInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const cocokUntuk = cocokUntukInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const formData = {
      slug,
      nama,
      kategori,
      deskripsi,
      deskripsiPanjang,
      ukuranKemasan,
      cocokUntuk,
      produsenIds,
      foto,
      tersediaEceran,
      tersediaGrosir,
      tersediaPemasokKuliner,
    };

    if (isEdit && initialData) {
      updateProduk(initialData.id, formData);
      showAlert({
        title: "Berhasil Disimpan",
        message: `Produk "${nama}" berhasil diperbarui.`,
        type: "success",
      });
    } else {
      addProduk(formData);
      showAlert({
        title: "Berhasil Disimpan",
        message: `Produk "${nama}" berhasil ditambahkan.`,
        type: "success",
      });
    }

    router.push("/admin/produk");
  };

  const toggleProdusen = (id: string) => {
    if (produsenIds.includes(id)) {
      setProdusenIds(produsenIds.filter((p) => p !== id));
    } else {
      setProdusenIds([...produsenIds, id]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Header Bar */}
      <div className="border-b border-slate-200 pb-4">
        <Link
          href="/admin/produk"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 mb-1"
        >
          <ArrowLeft size={14} />
          Kembali ke Katalog Produk
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? `Edit Produk: ${initialData?.nama}` : "Tambah Varian Produk Baru"}
        </h1>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Nama Produk */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Nama Produk *</label>
          <input
            type="text"
            required
            placeholder="Contoh: Tempe Papan"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Kategori */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Kategori Produk *</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value as KategoriProduk)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          >
            <option value="tempe-papan">Tempe Papan</option>
            <option value="tempe-bulat">Tempe Bulat</option>
            <option value="tempe-daun-pisang">Tempe Daun Pisang</option>
            <option value="tempe-gembus">Tempe Gembus</option>
            <option value="olahan-tempe">Olahan Tempe</option>
          </select>
        </div>

        {/* Deskripsi Ringkas */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Deskripsi Ringkas *</label>
          <input
            type="text"
            required
            placeholder="Tempe berbentuk persegi panjang dengan ketebalan merata..."
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Deskripsi Panjang */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Deskripsi Lengkap *</label>
          <textarea
            required
            rows={4}
            placeholder="Jelaskan detail proses, tekstur, dan karakter unik produk tempe ini..."
            value={deskripsiPanjang}
            onChange={(e) => setDeskripsiPanjang(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Foto Produk dengan ImageUploader */}
        <div className="space-y-1.5 md:col-span-2 border-t border-slate-100 pt-4">
          <ImageUploader
            label="Foto Produk (Persegi 1:1)"
            value={foto}
            onChange={(url) => setFoto(url)}
            aspectRatio={1}
            aspectRatioLabel="1:1 (Ukuran Persegi Kartu Produk)"
            previewMaxWidth="max-w-xs"
            helpText="Pilih file foto produk. Anda dapat menggeser (drag) dan memotong foto menjadi persegi pas."
          />
        </div>

        {/* Ukuran Kemasan */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">
            Ukuran Kemasan Tersedia (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            placeholder="Kecil (200g), Sedang (400g), Besar (600g), Jumbo (1kg)"
            value={ukuranKemasanInput}
            onChange={(e) => setUkuranKemasanInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Peruntukan / Cocok Untuk */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">
            Cocok Untuk (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            placeholder="Masakan rumah tangga, Katering dan restoran, Warung makan"
            value={cocokUntukInput}
            onChange={(e) => setCocokUntukInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Ketersediaan Layanan */}
        <div className="space-y-2 md:col-span-2 border-t border-slate-100 pt-4">
          <label className="text-xs font-semibold text-slate-700">Ketersediaan Jalur Distribusi</label>
          <div className="flex flex-wrap gap-6 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={tersediaEceran}
                onChange={(e) => setTersediaEceran(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Tersedia Pembelian Eceran</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={tersediaGrosir}
                onChange={(e) => setTersediaGrosir(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Tersedia Pasokan Grosir</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={tersediaPemasokKuliner}
                onChange={(e) => setTersediaPemasokKuliner(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Tersedia Pemasok Kuliner / Restoran</span>
            </label>
          </div>
        </div>

        {/* Produsen Penyedia */}
        <div className="space-y-2 md:col-span-2 border-t border-slate-100 pt-4">
          <label className="text-xs font-semibold text-slate-700">Produsen Penyedia (Pelaku UMKM)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {umkmList.map((u) => (
              <label key={u.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={produsenIds.includes(u.id)}
                  onChange={() => toggleProdusen(u.id)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>{u.namaUsaha}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tombol Simpan di Bawah */}
        <div className="md:col-span-2 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/admin/produk"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition text-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer active:scale-98"
          >
            <Save size={18} />
            {isEdit ? "Simpan Perubahan" : "Simpan Produk Baru"}
          </button>
        </div>
      </div>
    </form>
  );
}
