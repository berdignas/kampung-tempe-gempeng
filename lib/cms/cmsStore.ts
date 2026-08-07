// lib/cms/cmsStore.ts

import { UMKM, daftarUMKM as initialUMKM } from "@/lib/data/umkm";
import { Produk, daftarProduk as initialProduk } from "@/lib/data/produk";
import { Berita, daftarBerita as initialBerita } from "@/lib/data/berita";

export interface PengaturanPortal {
  namaKawasan: string;
  subjudulKawasan: string;
  alamatSekretariat: string;
  nomorWhatsAppPengelola: string;
  jamLayananPengelola: string;
  heroHeadline: string;
  heroSubtext: string;
  emailPengelola: string;
}

export const initialPengaturan: PengaturanPortal = {
  namaKawasan: "Kampung Tempe Gempeng",
  subjudulKawasan: "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan",
  alamatSekretariat: "Jl. Gempeng Utama No. 1, Kelurahan Gempeng, Kecamatan Bangil, Pasuruan 67153",
  nomorWhatsAppPengelola: "628113009000",
  jamLayananPengelola: "Senin – Sabtu, 08.00 – 16.00 WIB",
  heroHeadline: "Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja",
  heroSubtext: "Kampung Tempe Gempeng adalah kawasan sentra produksi tempe di Kelurahan Gempeng, Kecamatan Bangil. Ratusan keluarga pengrajin tempe bekerja setiap hari untuk menghasilkan tempe berkualitas yang menjangkau pasar lokal hingga regional.",
  emailPengelola: "portal@kampungtempegempeng.id",
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
    return data ? JSON.parse(data) : initialPengaturan;
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
