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

// --- Profil Kampung Page Types & Defaults ---
export interface TimelineItem {
  tahun: string;
  judul: string;
  deskripsi: string;
}

export interface NilaiItem {
  judul: string;
  deskripsi: string;
}

export interface ProfilKampungData {
  heroEyebrow: string;
  heroJudul: string;
  heroDeskripsi: string;
  bannerFoto: string;
  sejarahEyebrow: string;
  sejarahJudul: string;
  sejarahParagraf1: string;
  sejarahParagraf2: string;
  timeline: TimelineItem[];
  visiJudul: string;
  visiTeks: string;
  misiJudul: string;
  misiList: string[];
  nilaiEyebrow: string;
  nilaiJudul: string;
  nilaiList: NilaiItem[];
  ctaJudul: string;
  ctaDeskripsi: string;
  // Lokasi Kawasan
  lokasiLabel: string;
  lokasiAlamat: string;
  lokasiLat: string;
  lokasiLng: string;
}

export const initialProfilKampung: ProfilKampungData = {
  heroEyebrow: "Profil Kawasan",
  heroJudul: "Identitas & Legasi Kampung Tempe Gempeng",
  heroDeskripsi: "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan merupakan pusat produksi tempe yang telah menghidupi puluhan keluarga pengrajin dan melayani kebutuhan gizi masyarakat secara lintas generasi.",
  bannerFoto: "/images/profil-kampung-banner.jpg",
  sejarahEyebrow: "Sejarah & Perjalanan",
  sejarahJudul: "Jejak Langkah Sentra Tempe Gempeng",
  sejarahParagraf1: "Tradisi membuat tempe di Gempeng berawal dari keterampilan rumahan yang diturunkan antar generasi. Kualitas air, keahlian fermentasi alami, dan etos kerja warga menjadikan tempe dari Gempeng memiliki tekstur padat dan citarasa yang khas.",
  sejarahParagraf2: "Kini, kawasan ini terus bertransformasi menjadi sentra produksi pangan lokal yang adaptif terhadap standar sanitasi dan perkembangan teknologi digital.",
  timeline: [
    {
      tahun: "1990-an",
      judul: "Awal Perkembangan Kawasan",
      deskripsi: "Beberapa keluarga di Kelurahan Gempeng mulai memproduksi tempe secara mandiri dari skala rumah tangga.",
    },
    {
      tahun: "2005",
      judul: "Pertumbuhan Sentra Produksi",
      deskripsi: "Jumlah rumah produksi meningkat pesat. Gempeng mulai dikenal luas sebagai pemasok tempe utama di wilayah Bangil.",
    },
    {
      tahun: "2018",
      judul: "Kemitraan dan Pendampingan Usaha",
      deskripsi: "Berbagai instansi, akademisi, dan dinas terkait memberikan pendampingan higienitas serta legalitas UMKM.",
    },
    {
      tahun: "2024",
      judul: "Peluncuran Portal Digital Kolektif",
      deskripsi: "Hadirnya portal informasi resmi kawasan untuk mempromosikan seluruh pelaku usaha secara adil dan setara.",
    },
  ],
  visiJudul: "Visi Kawasan",
  visiTeks: "Menjadikan Kampung Tempe Gempeng sebagai sentra produksi tempe yang mandiri, berdaya saing, berstandar higienis tinggi, serta dikenal secara luas sebagai ikon kuliner tradisional Kabupaten Pasuruan.",
  misiJudul: "Misi Kawasan",
  misiList: [
    "Memperkuat promosi kolektif bagi seluruh pengrajin tempe tanpa diskriminasi.",
    "Meningkatkan kualitas produksi dan kepatuhan terhadap standar kesehatan pangan.",
    "Membuka jejaring kemitraan dengan sektor kuliner, distributor, dan instansi pendidikan.",
  ],
  nilaiEyebrow: "Prinsip Komunitas",
  nilaiJudul: "Nilai Bersama Pelaku UMKM",
  nilaiList: [
    {
      judul: "Kolektivitas & Keadilan",
      deskripsi: "Kawasan lebih utama daripada individu. Seluruh UMKM memiliki kesempatan yang sama untuk dikenal.",
    },
    {
      judul: "Kualitas & Mutu Produk",
      deskripsi: "Menjaga kebersihan, teknik fermentasi alami, dan standar bahan baku kedelai terbaik secara rutin.",
    },
    {
      judul: "Kemandirian Usaha",
      deskripsi: "Mendorong pembeli dan mitra untuk terhubung langsung dengan produsen tanpa perantara komisi.",
    },
  ],
  ctaJudul: "Ingin Mengenal Lebih Dekat?",
  ctaDeskripsi: "Temukan lokasi rumah produksi pada peta interaktif atau jelajahi seluruh pelaku UMKM tempe di kawasan kami.",
  // Lokasi Kawasan
  lokasiLabel: "Kawasan Kampung Tempe Gempeng",
  lokasiAlamat: "Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan, Jawa Timur 67153",
  lokasiLat: "-7.5953",
  lokasiLng: "112.7844",
};

const STORAGE_KEYS = {
  UMKM: "ktg_cms_umkm_v1",
  PRODUK: "ktg_cms_produk_v1",
  BERITA: "ktg_cms_berita_v1",
  PENGATURAN: "ktg_cms_pengaturan_v1",
  PROFIL: "ktg_cms_profil_v1",
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

export function loadStoredProfil(): ProfilKampungData {
  if (typeof window === "undefined") return initialProfilKampung;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFIL);
    if (!data) return initialProfilKampung;
    const parsed = JSON.parse(data);
    return { ...initialProfilKampung, ...parsed };
  } catch (e) {
    console.error("Gagal membaca Profil dari localStorage", e);
    return initialProfilKampung;
  }
}

export function saveStoredProfil(data: ProfilKampungData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFIL, JSON.stringify(data));
  } catch (e) {
    console.error("Gagal menyimpan Profil ke localStorage", e);
  }
}

export function resetAllCMSData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.UMKM);
  localStorage.removeItem(STORAGE_KEYS.PRODUK);
  localStorage.removeItem(STORAGE_KEYS.BERITA);
  localStorage.removeItem(STORAGE_KEYS.PENGATURAN);
  localStorage.removeItem(STORAGE_KEYS.PROFIL);
}
