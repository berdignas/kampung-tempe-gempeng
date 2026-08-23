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
  if (!row) return initialPengaturan;
  return {
    namaKawasan: row.nama_kawasan || initialPengaturan.namaKawasan,
    subjudulKawasan: row.subjudul_kawasan || initialPengaturan.subjudulKawasan,
    alamatSekretariat: row.alamat_sekretariat || initialPengaturan.alamatSekretariat,
    nomorWhatsAppPengelola: row.nomor_whatsapp_pengelola || initialPengaturan.nomorWhatsAppPengelola,
    jamLayananPengelola: row.jam_layanan_pengelola || initialPengaturan.jamLayananPengelola,
    emailPengelola: row.email_pengelola || initialPengaturan.emailPengelola,

    heroEyebrow: row.hero_eyebrow || initialPengaturan.heroEyebrow,
    heroHeadline: row.hero_headline || initialPengaturan.heroHeadline,
    heroSubtext: row.hero_subtext || initialPengaturan.heroSubtext,
    heroImage: row.hero_image || initialPengaturan.heroImage,
    heroCtaPrimaryLabel: row.hero_cta_primary_label || initialPengaturan.heroCtaPrimaryLabel,
    heroCtaPrimaryHref: row.hero_cta_primary_href || initialPengaturan.heroCtaPrimaryHref,
    heroCtaSecondaryLabel: row.hero_cta_secondary_label || initialPengaturan.heroCtaSecondaryLabel,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || initialPengaturan.heroCtaSecondaryHref,

    statsHeading: row.stats_heading || initialPengaturan.statsHeading,
    statsItem1Value: row.stats_item1_value || initialPengaturan.statsItem1Value,
    statsItem1Label: row.stats_item1_label || initialPengaturan.statsItem1Label,
    statsItem1Note: row.stats_item1_note || initialPengaturan.statsItem1Note,
    statsItem2Value: row.stats_item2_value || initialPengaturan.statsItem2Value,
    statsItem2Label: row.stats_item2_label || initialPengaturan.statsItem2Label,
    statsItem2Note: row.stats_item2_note || initialPengaturan.statsItem2Note,
    statsItem3Value: row.stats_item3_value || initialPengaturan.statsItem3Value,
    statsItem3Label: row.stats_item3_label || initialPengaturan.statsItem3Label,
    statsItem3Note: row.stats_item3_note || initialPengaturan.statsItem3Note,
    statsItem4Value: row.stats_item4_value || initialPengaturan.statsItem4Value,
    statsItem4Label: row.stats_item4_label || initialPengaturan.statsItem4Label,
    statsItem4Note: row.stats_item4_note || initialPengaturan.statsItem4Note,

    profileTeaserEyebrow: row.profile_teaser_eyebrow || initialPengaturan.profileTeaserEyebrow,
    profileTeaserHeading: row.profile_teaser_heading || initialPengaturan.profileTeaserHeading,
    profileTeaserParagraph1: row.profile_teaser_paragraph1 || initialPengaturan.profileTeaserParagraph1,
    profileTeaserParagraph2: row.profile_teaser_paragraph2 || initialPengaturan.profileTeaserParagraph2,
    profileTeaserImage: row.profile_teaser_image || initialPengaturan.profileTeaserImage,
    profileTeaserAccentVal: row.profile_teaser_accent_val || initialPengaturan.profileTeaserAccentVal,

    ctaSectionEyebrow: row.cta_section_eyebrow || initialPengaturan.ctaSectionEyebrow,
    ctaSectionHeading: row.cta_section_heading || initialPengaturan.ctaSectionHeading,
    ctaSectionSubtext: row.cta_section_subtext || initialPengaturan.ctaSectionSubtext,
    ctaSectionBtn1Label: row.cta_section_btn1_label || initialPengaturan.ctaSectionBtn1Label,
    ctaSectionBtn2Label: row.cta_section_btn2_label || initialPengaturan.ctaSectionBtn2Label,
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
    email_pengelola: data.emailPengelola,

    hero_eyebrow: data.heroEyebrow,
    hero_headline: data.heroHeadline,
    hero_subtext: data.heroSubtext,
    hero_image: data.heroImage,
    hero_cta_primary_label: data.heroCtaPrimaryLabel,
    hero_cta_primary_href: data.heroCtaPrimaryHref,
    hero_cta_secondary_label: data.heroCtaSecondaryLabel,
    hero_cta_secondary_href: data.heroCtaSecondaryHref,

    stats_heading: data.statsHeading,
    stats_item1_value: data.statsItem1Value,
    stats_item1_label: data.statsItem1Label,
    stats_item1_note: data.statsItem1Note,
    stats_item2_value: data.statsItem2Value,
    stats_item2_label: data.statsItem2Label,
    stats_item2_note: data.statsItem2Note,
    stats_item3_value: data.statsItem3Value,
    stats_item3_label: data.statsItem3Label,
    stats_item3_note: data.statsItem3Note,
    stats_item4_value: data.statsItem4Value,
    stats_item4_label: data.statsItem4Label,
    stats_item4_note: data.statsItem4Note,

    profile_teaser_eyebrow: data.profileTeaserEyebrow,
    profile_teaser_heading: data.profileTeaserHeading,
    profile_teaser_paragraph1: data.profileTeaserParagraph1,
    profile_teaser_paragraph2: data.profileTeaserParagraph2,
    profile_teaser_image: data.profileTeaserImage,
    profile_teaser_accent_val: data.profileTeaserAccentVal,

    cta_section_eyebrow: data.ctaSectionEyebrow,
    cta_section_heading: data.ctaSectionHeading,
    cta_section_subtext: data.ctaSectionSubtext,
    cta_section_btn1_label: data.ctaSectionBtn1Label,
    cta_section_btn2_label: data.ctaSectionBtn2Label,
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
  const payload = mapPengaturanToDb(data);
  const { error } = await supabase.from("pengaturan").upsert(payload);
  if (error) {
    console.error("Error update Pengaturan to Supabase:", error);
    // Fallback if some new columns don't exist in Supabase yet
    const basicPayload = {
      id: "default",
      nama_kawasan: data.namaKawasan,
      subjudul_kawasan: data.subjudulKawasan,
      alamat_sekretariat: data.alamatSekretariat,
      nomor_whatsapp_pengelola: data.nomorWhatsAppPengelola,
      jam_layanan_pengelola: data.jamLayananPengelola,
      email_pengelola: data.emailPengelola,
      hero_headline: data.heroHeadline,
      hero_subtext: data.heroSubtext,
    };
    await supabase.from("pengaturan").upsert(basicPayload);
  }
}
