// lib/data/produk.ts

export type KategoriProduk =
  | "tempe-papan"
  | "tempe-bulat"
  | "tempe-daun-pisang"
  | "tempe-gembus"
  | "olahan-tempe";

export interface Produk {
  id: string;
  slug: string;
  nama: string;
  kategori: KategoriProduk;
  deskripsi: string;
  deskripsiPanjang: string;
  ukuranKemasan: string[];
  cocokUntuk: string[];
  produsenIds: string[];
  foto: string;
  tersediaGrosir: boolean;
  tersediaEceran: boolean;
  tersediaPemasokKuliner: boolean;
}

export const daftarProduk: Produk[] = [];

export function getProdukBySlug(slug: string): Produk | undefined {
  return daftarProduk.find((p) => p.slug === slug);
}
