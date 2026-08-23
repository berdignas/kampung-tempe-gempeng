// lib/cms/cmsStore.ts

import { UMKM, daftarUMKM as initialUMKM } from "@/lib/data/umkm";
import { Produk, daftarProduk as initialProduk } from "@/lib/data/produk";
import { Berita, daftarBerita as initialBerita } from "@/lib/data/berita";

export interface PengaturanPortal {
  // Identitas Kawasan & Kontak
  namaKawasan: string;
  subjudulKawasan: string;
  alamatSekretariat: string;
  nomorWhatsAppPengelola: string;
  jamLayananPengelola: string;
  emailPengelola: string;

  // Section 1: Hero Beranda
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroImage: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryLabel: string;
  heroCtaSecondaryHref: string;

  // Section 2: Kampung Tempe Dalam Angka (Stats)
  statsHeading: string;
  statsItem1Value: string;
  statsItem1Label: string;
  statsItem1Note: string;
  statsItem2Value: string;
  statsItem2Label: string;
  statsItem2Note: string;
  statsItem3Value: string;
  statsItem3Label: string;
  statsItem3Note: string;
  statsItem4Value: string;
  statsItem4Label: string;
  statsItem4Note: string;

  // Section 3: Profil Kampung Teaser
  profileTeaserEyebrow: string;
  profileTeaserHeading: string;
  profileTeaserParagraph1: string;
  profileTeaserParagraph2: string;
  profileTeaserImage: string;
  profileTeaserAccentVal: string;

  // Section 4: Call To Action (CTA)
  ctaSectionEyebrow: string;
  ctaSectionHeading: string;
  ctaSectionSubtext: string;
  ctaSectionBtn1Label: string;
  ctaSectionBtn2Label: string;
}

export const initialPengaturan: PengaturanPortal = {
  // Identitas Kawasan & Kontak
  namaKawasan: "Kampung Tempe Gempeng",
  subjudulKawasan: "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan",
  alamatSekretariat: "Jl. Gempeng Utama No. 1, Kelurahan Gempeng, Kecamatan Bangil, Pasuruan 67153",
  nomorWhatsAppPengelola: "628113009000",
  jamLayananPengelola: "Senin – Sabtu, 08.00 – 16.00 WIB",
  emailPengelola: "portal@kampungtempegempeng.id",

  // Hero Section
  heroEyebrow: "Sentra Produksi Tempe di Bangil, Pasuruan",
  heroHeadline: "Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja",
  heroSubtext: "Kampung Tempe Gempeng adalah kawasan sentra produksi tempe di Kelurahan Gempeng, Kecamatan Bangil. Ratusan keluarga pengrajin tempe bekerja setiap hari untuk menghasilkan tempe berkualitas yang menjangkau pasar lokal hingga regional.",
  heroImage: "/images/hero-tempe-production.jpg",
  heroCtaPrimaryLabel: "Jelajahi UMKM",
  heroCtaPrimaryHref: "/umkm",
  heroCtaSecondaryLabel: "Lihat Peta Produksi",
  heroCtaSecondaryHref: "/peta",

  // Stats Section
  statsHeading: "Kampung Tempe Gempeng dalam Angka",
  statsItem1Value: "20+",
  statsItem1Label: "Pelaku UMKM",
  statsItem1Note: "Terdaftar di kawasan",
  statsItem2Value: "20+",
  statsItem2Label: "Rumah Produksi",
  statsItem2Note: "Aktif berproduksi",
  statsItem3Value: "30+ Tahun",
  statsItem3Label: "Kawasan Berkembang",
  statsItem3Note: "Warisan turun-temurun",
  statsItem4Value: "Bangil & Sekitar",
  statsItem4Label: "Jangkauan Distribusi",
  statsItem4Note: "Pasar lokal & regional",

  // Profil Teaser Section
  profileTeaserEyebrow: "Profil Kawasan",
  profileTeaserHeading: "Mengenal Kampung Tempe Gempeng",
  profileTeaserParagraph1: "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan telah lama dikenal sebagai kawasan sentra produksi tempe. Keahlian membuat tempe diwariskan turun-temurun dan menjadi identitas kuat kawasan ini.",
  profileTeaserParagraph2: "Portal ini hadir untuk memperkuat identitas digital kawasan dan menjadi media promosi kolektif bagi seluruh pelaku usaha — tanpa mengutamakan siapapun secara individual.",
  profileTeaserImage: "/images/kampung-profile.jpg",
  profileTeaserAccentVal: "30+ Tahun",

  // CTA Section
  ctaSectionEyebrow: "Temukan Produsen",
  ctaSectionHeading: "Temukan Produsen yang Sesuai Kebutuhan Anda",
  ctaSectionSubtext: "Jelajahi seluruh pelaku usaha tempe di Kampung Gempeng, lihat profil dan produk mereka, lalu hubungi langsung melalui WhatsApp.",
  ctaSectionBtn1Label: "Jelajahi UMKM",
  ctaSectionBtn2Label: "Katalog Produk",
};

const STORAGE_KEYS = {
  UMKM: "ktg_cms_umkm_v1",
  PRODUK: "ktg_cms_produk_v1",
  BERITA: "ktg_cms_berita_v1",
  PENGATURAN: "ktg_cms_pengaturan_v1",
};

export function loadStoredUMKM(): UMKM[] {
  if (typeof window === "undefined") return initialUMKM;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UMKM);
    return data ? JSON.parse(data) : initialUMKM;
  } catch (e) {
    console.error("Gagal membaca UMKM dari localStorage", e);
    return initialUMKM;
  }
}

export function saveStoredUMKM(list: UMKM[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.UMKM, JSON.stringify(list));
  } catch (e) {
    console.error("Gagal menyimpan UMKM ke localStorage", e);
  }
}

export function loadStoredProduk(): Produk[] {
  if (typeof window === "undefined") return initialProduk;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUK);
    return data ? JSON.parse(data) : initialProduk;
  } catch (e) {
    console.error("Gagal membaca Produk dari localStorage", e);
    return initialProduk;
  }
}

export function saveStoredProduk(list: Produk[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUK, JSON.stringify(list));
  } catch (e) {
    console.error("Gagal menyimpan Produk ke localStorage", e);
  }
}

export function loadStoredBerita(): Berita[] {
  if (typeof window === "undefined") return initialBerita;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BERITA);
    return data ? JSON.parse(data) : initialBerita;
  } catch (e) {
    console.error("Gagal membaca Berita dari localStorage", e);
    return initialBerita;
  }
}

export function saveStoredBerita(list: Berita[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.BERITA, JSON.stringify(list));
  } catch (e) {
    console.error("Gagal menyimpan Berita ke localStorage", e);
  }
}

export function loadStoredPengaturan(): PengaturanPortal {
  if (typeof window === "undefined") return initialPengaturan;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PENGATURAN);
    if (!data) return initialPengaturan;
    const parsed = JSON.parse(data);
    return { ...initialPengaturan, ...parsed };
  } catch (e) {
    console.error("Gagal membaca Pengaturan dari localStorage", e);
    return initialPengaturan;
  }
}

export function saveStoredPengaturan(data: PengaturanPortal): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PENGATURAN, JSON.stringify(data));
  } catch (e) {
    console.error("Gagal menyimpan Pengaturan ke localStorage", e);
  }
}

export function resetAllCMSData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.UMKM);
  localStorage.removeItem(STORAGE_KEYS.PRODUK);
  localStorage.removeItem(STORAGE_KEYS.BERITA);
  localStorage.removeItem(STORAGE_KEYS.PENGATURAN);
}
