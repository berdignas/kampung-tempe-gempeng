// lib/data/umkm.ts

export type JenisLayanan = "eceran" | "grosir" | "pemasok-kuliner" | "distributor";

export interface UMKM {
  id: string;
  slug: string;
  namaUsaha: string;
  namaPemilik: string;
  deskripsi: string;
  alamat: string;
  koordinat: { lat: number; lng: number };
  nomorWhatsApp: string;
  jamOperasional: string;
  tahunBerdiri: number;
  jenisLayanan: JenisLayanan[];
  produkIds: string[];
  galeri: string[];
  foto?: string;
  statusPublikasi: boolean;
}

export const daftarUMKM: UMKM[] = [];

export function getUMKMBySlug(slug: string): UMKM | undefined {
  return daftarUMKM.find((u) => u.slug === slug);
}

export const labelLayanan: Record<JenisLayanan, string> = {
  eceran: "Eceran",
  grosir: "Grosir",
  "pemasok-kuliner": "Pemasok Kuliner",
  distributor: "Distributor",
};
