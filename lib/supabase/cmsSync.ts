import { supabase, isSupabaseConfigured } from "./client";
import { UMKM, daftarUMKM as initialUMKM } from "@/lib/data/umkm";
import { Produk, daftarProduk as initialProduk } from "@/lib/data/produk";
import { Berita, daftarBerita as initialBerita } from "@/lib/data/berita";
import { PengaturanPortal, initialPengaturan } from "@/lib/cms/cmsStore";

// --- Mappers ---
function mapUmkmFromDb(row: any): UMKM {
  return {
    id: row.id,
    slug: row.slug,
    namaUsaha: row.nama_usaha,
    namaPemilik: row.nama_pemilik,
    deskripsi: row.deskripsi,
    alamat: row.alamat,
    koordinat: row.koordinat || { lat: -7.5953, lng: 112.7844 },
    nomorWhatsApp: row.nomor_whatsapp,
    jamOperasional: row.jam_operasional,
    tahunBerdiri: Number(row.tahun_berdiri),
    jenisLayanan: row.jenis_layanan || [],
    produkIds: row.produk_ids || [],
    galeri: row.galeri || [],
    statusPublikasi: row.status_publikasi ?? true,
  };
}

function mapUmkmToDb(data: UMKM) {
  return {
    id: data.id,
    slug: data.slug,
    nama_usaha: data.namaUsaha,
    nama_pemilik: data.namaPemilik,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    koordinat: data.koordinat,
    nomor_whatsapp: data.nomorWhatsApp,
    jam_operasional: data.jamOperasional,
    tahun_berdiri: data.tahunBerdiri,
    jenis_layanan: data.jenisLayanan,
    produk_ids: data.produkIds,
    galeri: data.galeri,
    status_publikasi: data.statusPublikasi,
  };
}

function mapProdukFromDb(row: any): Produk {
  return {
    id: row.id,
    slug: row.slug,
    nama: row.nama,
    kategori: row.kategori,
    deskripsi: row.deskripsi,
    deskripsiPanjang: row.deskripsi_panjang,
    ukuranKemasan: row.ukuran_kemasan || [],
    cocokUntuk: row.cocok_untuk || [],
    produsenIds: row.produsen_ids || [],
    foto: row.foto,
    tersediaGrosir: row.tersedia_grosir ?? true,
    tersediaEceran: row.tersedia_eceran ?? true,
    tersediaPemasokKuliner: row.tersedia_pemasok_kuliner ?? true,
  };
}

function mapProdukToDb(data: Produk) {
  return {
    id: data.id,
    slug: data.slug,
    nama: data.nama,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    deskripsi_panjang: data.deskripsiPanjang,
    ukuran_kemasan: data.ukuranKemasan,
    cocok_untuk: data.cocokUntuk,
    produsen_ids: data.produsenIds,
    foto: data.foto,
    tersedia_grosir: data.tersediaGrosir,
    tersedia_eceran: data.tersediaEceran,
    tersedia_pemasok_kuliner: data.tersediaPemasokKuliner,
  };
}

function mapBeritaFromDb(row: any): Berita {
  return {
    id: row.id,
    slug: row.slug,
    judul: row.judul,
    ringkasan: row.ringkasan,
    konten: row.konten,
    kategori: row.kategori,
    tanggal: row.tanggal,
    penulis: row.penulis,
    thumbnail: row.thumbnail,
    galeri: row.galeri || [],
  };
}

function mapBeritaToDb(data: Berita) {
  return {
    id: data.id,
    slug: data.slug,
    judul: data.judul,
    ringkasan: data.ringkasan,
    konten: data.konten,
    kategori: data.kategori,
    tanggal: data.tanggal,
    penulis: data.penulis,
    thumbnail: data.thumbnail,
    galeri: data.galeri,
  };
}

function mapPengaturanFromDb(row: any): PengaturanPortal {
  return {
    namaKawasan: row.nama_kawasan,
    subjudulKawasan: row.subjudul_kawasan,
    alamatSekretariat: row.alamat_sekretariat,
    nomorWhatsAppPengelola: row.nomor_whatsapp_pengelola,
    jamLayananPengelola: row.jam_layanan_pengelola,
    heroHeadline: row.hero_headline,
    heroSubtext: row.hero_subtext,
    emailPengelola: row.email_pengelola,
  };
}

function mapPengaturanToDb(data: PengaturanPortal) {
  return {
    id: "default",
    nama_kawasan: data.namaKawasan,
    subjudul_kawasan: data.subjudulKawasan,
    alamat_sekretariat: data.alamatSekretariat,
    nomor_whatsapp_pengelola: data.nomorWhatsAppPengelola,
    jam_layanan_pengelola: data.jamLayananPengelola,
    hero_headline: data.heroHeadline,
    hero_subtext: data.heroSubtext,
    email_pengelola: data.emailPengelola,
  };
}

// --- Fetch API ---
export async function fetchAllFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const [umkmRes, produkRes, beritaRes, pengRes] = await Promise.all([
      supabase.from("umkm").select("*"),
      supabase.from("produk").select("*"),
      supabase.from("berita").select("*"),
      supabase.from("pengaturan").select("*").eq("id", "default").maybeSingle(),
    ]);

    // Check if table error (e.g. table not created yet)
    if (umkmRes.error || produkRes.error || beritaRes.error) {
      console.warn("Supabase query warn:", umkmRes.error || produkRes.error || beritaRes.error);
    }

    let umkmList = umkmRes.data ? umkmRes.data.map(mapUmkmFromDb) : [];
    let produkList = produkRes.data ? produkRes.data.map(mapProdukFromDb) : [];
    let beritaList = beritaRes.data ? beritaRes.data.map(mapBeritaFromDb) : [];
    let pengaturan = pengRes.data ? mapPengaturanFromDb(pengRes.data) : null;

    // Auto-seed to Supabase if tables exist but are empty
    if (umkmRes.data && umkmList.length === 0) {
      for (const u of initialUMKM) {
        await supabase.from("umkm").upsert(mapUmkmToDb(u));
      }
      umkmList = initialUMKM;
    }
    if (produkRes.data && produkList.length === 0) {
      for (const p of initialProduk) {
        await supabase.from("produk").upsert(mapProdukToDb(p));
      }
      produkList = initialProduk;
    }
    if (beritaRes.data && beritaList.length === 0) {
      for (const b of initialBerita) {
        await supabase.from("berita").upsert(mapBeritaToDb(b));
      }
      beritaList = initialBerita;
    }
    if (!pengaturan) {
      await supabase.from("pengaturan").upsert(mapPengaturanToDb(initialPengaturan));
      pengaturan = initialPengaturan;
    }

    return { umkmList, produkList, beritaList, pengaturan };
  } catch (err) {
    console.error("Gagal sinkronisasi data dari Supabase:", err);
    return null;
  }
}

// --- Mutation Handlers ---
export async function upsertUmkmSupabase(data: UMKM) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("umkm").upsert(mapUmkmToDb(data));
  if (error) console.error("Error upsert UMKM to Supabase:", error);
}

export async function deleteUmkmSupabase(id: string) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("umkm").delete().eq("id", id);
  if (error) console.error("Error delete UMKM from Supabase:", error);
}

export async function upsertProdukSupabase(data: Produk) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("produk").upsert(mapProdukToDb(data));
  if (error) console.error("Error upsert Produk to Supabase:", error);
}

export async function deleteProdukSupabase(id: string) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("produk").delete().eq("id", id);
  if (error) console.error("Error delete Produk from Supabase:", error);
}

export async function upsertBeritaSupabase(data: Berita) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("berita").upsert(mapBeritaToDb(data));
  if (error) console.error("Error upsert Berita to Supabase:", error);
}

export async function deleteBeritaSupabase(id: string) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) console.error("Error delete Berita from Supabase:", error);
}

export async function updatePengaturanSupabase(data: PengaturanPortal) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("pengaturan").upsert(mapPengaturanToDb(data));
  if (error) console.error("Error update Pengaturan to Supabase:", error);
}
