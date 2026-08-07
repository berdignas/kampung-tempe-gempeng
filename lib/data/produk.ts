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

export const daftarProduk: Produk[] = [
  {
    id: "tempe-papan",
    slug: "tempe-papan",
    nama: "Tempe Papan",
    kategori: "tempe-papan",
    deskripsi:
      "Tempe berbentuk persegi panjang dengan ketebalan merata, cocok untuk berbagai olahan masakan.",
    deskripsiPanjang:
      "Tempe papan adalah produk andalan Kampung Tempe Gempeng. Dibuat dari kedelai pilihan yang diproses secara tradisional, tempe ini memiliki tekstur padat, warna putih bersih, dan aroma khas yang menandakan kualitas fermentasi yang baik. Tersedia dalam berbagai ukuran untuk kebutuhan rumah tangga hingga restoran.",
    ukuranKemasan: ["Kecil (200g)", "Sedang (400g)", "Besar (600g)", "Jumbo (1kg)"],
    cocokUntuk: [
      "Masakan rumah tangga",
      "Katering dan restoran",
      "Warung makan",
      "Olahan gorengan tempe",
    ],
    produsenIds: ["umkm-001", "umkm-002", "umkm-004", "umkm-005", "umkm-006"],
    foto: "/images/produk/tempe-papan.jpg",
    tersediaGrosir: true,
    tersediaEceran: true,
    tersediaPemasokKuliner: true,
  },
  {
    id: "tempe-bulat",
    slug: "tempe-bulat",
    nama: "Tempe Bulat",
    kategori: "tempe-bulat",
    deskripsi:
      "Tempe berbentuk silinder bulat yang praktis untuk konsumsi harian dan mudah diiris.",
    deskripsiPanjang:
      "Tempe bulat atau tempe silinder adalah pilihan praktis untuk konsumsi sehari-hari. Ukurannya yang standar memudahkan penyimpanan dan pengirisan. Diproses dengan kedelai berkualitas dan dibungkus rapi, tempe ini cocok untuk digoreng, dikukus, maupun diolah menjadi berbagai hidangan.",
    ukuranKemasan: ["Kecil (150g)", "Sedang (300g)"],
    cocokUntuk: [
      "Konsumsi rumah tangga harian",
      "Warung makan sederhana",
      "Pedagang pasar",
    ],
    produsenIds: ["umkm-001", "umkm-003", "umkm-004", "umkm-005"],
    foto: "/images/produk/tempe-bulat.jpg",
    tersediaGrosir: true,
    tersediaEceran: true,
    tersediaPemasokKuliner: false,
  },
  {
    id: "tempe-daun-pisang",
    slug: "tempe-daun-pisang",
    nama: "Tempe Daun Pisang",
    kategori: "tempe-daun-pisang",
    deskripsi:
      "Tempe tradisional yang dibungkus daun pisang untuk menghasilkan aroma alami yang khas.",
    deskripsiPanjang:
      "Tempe daun pisang adalah warisan kuliner Jawa yang memiliki nilai autentisitas tinggi. Proses pembungkusan dengan daun pisang segar menghasilkan aroma alami yang khas dan berbeda dari tempe plastik biasa. Cocok untuk pecinta tempe tradisional dan sajian menu autentik.",
    ukuranKemasan: ["Satuan (200g)", "Ikat (3 bungkus)"],
    cocokUntuk: [
      "Sajian menu autentik",
      "Restoran tradisional Jawa",
      "Oleh-oleh khas daerah",
    ],
    produsenIds: ["umkm-003", "umkm-006"],
    foto: "/images/produk/tempe-daun-pisang.jpg",
    tersediaGrosir: false,
    tersediaEceran: true,
    tersediaPemasokKuliner: true,
  },
  {
    id: "tempe-gembus",
    slug: "tempe-gembus",
    nama: "Tempe Gembus",
    kategori: "tempe-gembus",
    deskripsi:
      "Tempe berbahan ampas tahu (gembus) yang memiliki tekstur lebih lembut dan rasa gurih.",
    deskripsiPanjang:
      "Tempe gembus dibuat dari ampas tahu (okara) yang difermentasi. Bertekstur lebih lembut dengan rasa gurih yang khas, tempe ini merupakan produk khas Jawa yang tidak banyak diproduksi di luar sentra tempe. Cocok untuk digoreng crispy atau dijadikan bahan oseng-oseng.",
    ukuranKemasan: ["Satuan (250g)", "Besar (500g)"],
    cocokUntuk: [
      "Masakan khas Jawa",
      "Lauk pauk sehari-hari",
      "Menu tradisional warung makan",
    ],
    produsenIds: ["umkm-002", "umkm-004", "umkm-006"],
    foto: "/images/produk/tempe-gembus.jpg",
    tersediaGrosir: true,
    tersediaEceran: true,
    tersediaPemasokKuliner: true,
  },
];

export function getProdukBySlug(slug: string): Produk | undefined {
  return daftarProduk.find((p) => p.slug === slug);
}
