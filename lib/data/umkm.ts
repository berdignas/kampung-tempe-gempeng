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
  statusPublikasi: boolean;
}

export const daftarUMKM: UMKM[] = [
  {
    id: "umkm-001",
    slug: "tempe-bu-aminah",
    namaUsaha: "Tempe Bu Aminah",
    namaPemilik: "Aminah Susanti",
    deskripsi:
      "Usaha tempe rumahan yang telah berdiri sejak dua dekade lalu. Bu Aminah menggunakan kedelai lokal pilihan dan proses fermentasi alami untuk menghasilkan tempe dengan tekstur padat dan rasa khas.",
    alamat: "Jl. Gempeng No. 12, RT 02/RW 01, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5953, lng: 112.7844 },
    nomorWhatsApp: "628113001001",
    jamOperasional: "Setiap hari, 05.00–12.00 WIB",
    tahunBerdiri: 2003,
    jenisLayanan: ["eceran", "grosir"],
    produkIds: ["tempe-papan", "tempe-bulat"],
    galeri: [],
    statusPublikasi: true,
  },
  {
    id: "umkm-002",
    slug: "tempe-pak-hadi",
    namaUsaha: "Tempe Pak Hadi",
    namaPemilik: "Hadiyanto",
    deskripsi:
      "Pak Hadi mengkhususkan diri pada tempe papan ukuran besar yang cocok untuk kebutuhan rumah makan dan katering. Kapasitas produksi stabil sepanjang tahun dengan pasokan kedelai terpilih.",
    alamat: "Jl. Gempeng No. 27, RT 03/RW 01, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5961, lng: 112.7851 },
    nomorWhatsApp: "628113001002",
    jamOperasional: "Setiap hari, 04.00–11.00 WIB",
    tahunBerdiri: 1998,
    jenisLayanan: ["grosir", "pemasok-kuliner"],
    produkIds: ["tempe-papan", "tempe-gembus"],
    galeri: [],
    statusPublikasi: true,
  },
  {
    id: "umkm-003",
    slug: "tempe-bu-sriati",
    namaUsaha: "Tempe Bu Sriati",
    namaPemilik: "Sriati Rahayu",
    deskripsi:
      "Pengrajin tempe senior di Kampung Gempeng. Bu Sriati dikenal dengan tempe daun pisangnya yang wangi alami. Melayani pembelian eceran langsung dari rumah produksi setiap pagi.",
    alamat: "Jl. Mawar No. 5, RT 01/RW 02, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5948, lng: 112.7838 },
    nomorWhatsApp: "628113001003",
    jamOperasional: "Senin–Sabtu, 05.00–10.00 WIB",
    tahunBerdiri: 1995,
    jenisLayanan: ["eceran"],
    produkIds: ["tempe-daun-pisang", "tempe-bulat"],
    galeri: [],
    statusPublikasi: true,
  },
  {
    id: "umkm-004",
    slug: "tempe-maju-bersama",
    namaUsaha: "Tempe Maju Bersama",
    namaPemilik: "Budi Santoso",
    deskripsi:
      "Usaha tempe generasi muda yang mengombinasikan metode tradisional dengan manajemen produksi modern. Melayani distribusi ke pasar-pasar di wilayah Bangil dan sekitarnya.",
    alamat: "Jl. Kenanga No. 18, RT 04/RW 02, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5967, lng: 112.7859 },
    nomorWhatsApp: "628113001004",
    jamOperasional: "Setiap hari, 04.30–13.00 WIB",
    tahunBerdiri: 2015,
    jenisLayanan: ["grosir", "distributor"],
    produkIds: ["tempe-papan", "tempe-bulat", "tempe-gembus"],
    galeri: [],
    statusPublikasi: true,
  },
  {
    id: "umkm-005",
    slug: "tempe-bu-narsih",
    namaUsaha: "Tempe Bu Narsih",
    namaPemilik: "Narsih Wulandari",
    deskripsi:
      "Produsen tempe yang sudah melayani pelanggan setia di pasar Bangil selama lebih dari 15 tahun. Dikenal dengan tempe bulat ukuran sedang yang cocok untuk masakan sehari-hari.",
    alamat: "Jl. Melati No. 9, RT 02/RW 03, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5943, lng: 112.7847 },
    nomorWhatsApp: "628113001005",
    jamOperasional: "Setiap hari, 05.00–11.00 WIB",
    tahunBerdiri: 2008,
    jenisLayanan: ["eceran", "grosir"],
    produkIds: ["tempe-bulat", "tempe-papan"],
    galeri: [],
    statusPublikasi: true,
  },
  {
    id: "umkm-006",
    slug: "tempe-pak-suryo",
    namaUsaha: "Tempe Pak Suryo",
    namaPemilik: "Suryono",
    deskripsi:
      "Pak Suryo memproduksi berbagai jenis tempe dan aktif memasok ke restoran dan warung makan di Pasuruan. Menyediakan layanan pemasok kuliner dengan pemesanan minimal tertentu.",
    alamat: "Jl. Anggrek No. 3, RT 01/RW 03, Kelurahan Gempeng, Bangil",
    koordinat: { lat: -7.5958, lng: 112.7832 },
    nomorWhatsApp: "628113001006",
    jamOperasional: "Setiap hari, 03.30–10.00 WIB",
    tahunBerdiri: 2011,
    jenisLayanan: ["pemasok-kuliner", "grosir"],
    produkIds: ["tempe-papan", "tempe-daun-pisang", "tempe-gembus"],
    galeri: [],
    statusPublikasi: true,
  },
];

export function getUMKMBySlug(slug: string): UMKM | undefined {
  return daftarUMKM.find((u) => u.slug === slug);
}

export const labelLayanan: Record<JenisLayanan, string> = {
  eceran: "Eceran",
  grosir: "Grosir",
  "pemasok-kuliner": "Pemasok Kuliner",
  distributor: "Distributor",
};
