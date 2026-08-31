// lib/data/berita.ts

export type KategoriBerita =
  | "pelatihan"
  | "kegiatan-warga"
  | "kunjungan"
  | "program-kkn"
  | "pengembangan-umkm";

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  kategori: KategoriBerita;
  tanggal: string;
  ringkasan: string;
  konten: string;
  thumbnail: string;
  galeri: string[];
  penulis: string;
}

export const daftarBerita: Berita[] = [];

export function getBeritaBySlug(slug: string): Berita | undefined {
  return daftarBerita.find((b) => b.slug === slug);
}

export const labelKategoriBerita: Record<KategoriBerita, string> = {
  pelatihan: "Pelatihan",
  "kegiatan-warga": "Kegiatan Warga",
  kunjungan: "Kunjungan",
  "program-kkn": "Program KKN",
  "pengembangan-umkm": "Pengembangan UMKM",
};
