import { supabase, isSupabaseConfigured } from "./client";
import { UMKM, daftarUMKM as initialUMKM } from "@/lib/data/umkm";
import { Produk, daftarProduk as initialProduk } from "@/lib/data/produk";
import { Berita, daftarBerita as initialBerita } from "@/lib/data/berita";
import {
  PengaturanPortal,
  initialPengaturan,
  ProfilKampungData,
  initialProfilKampung,
} from "@/lib/cms/cmsStore";

// --- Mappers ---
function mapUmkmFromDb(row: any): UMKM {
  let lat = -7.5953;
  let lng = 112.7844;
  if (row.koordinat) {
    lat = Number(row.koordinat.lat ?? row.koordinat.latitude) || -7.5953;
    lng = Number(row.koordinat.lng ?? row.koordinat.longitude) || 112.7844;
  }

  const galeri = Array.isArray(row.galeri) ? row.galeri : [];
  const foto = row.foto || (galeri.length > 0 ? galeri[0] : "");

  return {
    id: row.id,
    slug: row.slug,
    namaUsaha: row.nama_usaha,
    namaPemilik: row.nama_pemilik,
    deskripsi: row.deskripsi,
    alamat: row.alamat,
    koordinat: { lat, lng },
    nomorWhatsApp: row.nomor_whatsapp,
    jamOperasional: row.jam_operasional,
    tahunBerdiri: Number(row.tahun_berdiri),
    jenisLayanan: row.jenis_layanan || [],
    produkIds: row.produk_ids || [],
    galeri: galeri.length > 0 ? galeri : (foto ? [foto] : []),
    foto,
    statusPublikasi: row.status_publikasi ?? true,
  };
}

function mapUmkmToDb(data: UMKM) {
  const lat = Number(data.koordinat?.lat) || -7.5953;
  const lng = Number(data.koordinat?.lng) || 112.7844;
  const foto = data.foto || (data.galeri && data.galeri[0]) || "";
  const galeri = data.galeri && data.galeri.length > 0 ? data.galeri : (foto ? [foto] : []);

  return {
    id: data.id,
    slug: data.slug,
    nama_usaha: data.namaUsaha,
    nama_pemilik: data.namaPemilik,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    koordinat: { lat, lng },
    nomor_whatsapp: data.nomorWhatsApp,
    jam_operasional: data.jamOperasional,
    tahun_berdiri: Number(data.tahunBerdiri),
    jenis_layanan: data.jenisLayanan,
    produk_ids: data.produkIds,
    galeri,
    foto,
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

function mapPengaturanFromDb(row: any, fallback?: PengaturanPortal): PengaturanPortal {
  const base = fallback || initialPengaturan;
  if (!row) return base;

  // Jika tabel Supabase menyimpan object dalam kolom JSONB 'data'
  const rowData = row.data && typeof row.data === "object" ? row.data : {};

  const heroImage =
    (row.hero_image && String(row.hero_image).trim()) ||
    (rowData.heroImage && String(rowData.heroImage).trim()) ||
    (base.heroImage && String(base.heroImage).trim()) ||
    "";

  const logoUrl =
    (row.logo_url && String(row.logo_url).trim()) ||
    (rowData.logoUrl && String(rowData.logoUrl).trim()) ||
    (base.logoUrl && String(base.logoUrl).trim()) ||
    "";

  const profileTeaserImage =
    (row.profile_teaser_image && String(row.profile_teaser_image).trim()) ||
    (rowData.profileTeaserImage && String(rowData.profileTeaserImage).trim()) ||
    (base.profileTeaserImage && String(base.profileTeaserImage).trim()) ||
    "";

  return {
    namaKawasan: row.nama_kawasan || rowData.namaKawasan || base.namaKawasan,
    subjudulKawasan: row.subjudul_kawasan || rowData.subjudulKawasan || base.subjudulKawasan,
    logoUrl,
    alamatSekretariat: row.alamat_sekretariat || rowData.alamatSekretariat || base.alamatSekretariat,
    nomorWhatsAppPengelola: row.nomor_whatsapp_pengelola || rowData.nomorWhatsAppPengelola || base.nomorWhatsAppPengelola,
    jamLayananPengelola: row.jam_layanan_pengelola || rowData.jamLayananPengelola || base.jamLayananPengelola,
    emailPengelola: row.email_pengelola || rowData.emailPengelola || base.emailPengelola,

    heroEyebrow: row.hero_eyebrow || rowData.heroEyebrow || base.heroEyebrow,
    heroHeadline: row.hero_headline || rowData.heroHeadline || base.heroHeadline,
    heroSubtext: row.hero_subtext || rowData.heroSubtext || base.heroSubtext,
    heroImage,
    heroCtaPrimaryLabel: row.hero_cta_primary_label || rowData.heroCtaPrimaryLabel || base.heroCtaPrimaryLabel,
    heroCtaPrimaryHref: row.hero_cta_primary_href || rowData.heroCtaPrimaryHref || base.heroCtaPrimaryHref,
    heroCtaSecondaryLabel: row.hero_cta_secondary_label || rowData.heroCtaSecondaryLabel || base.heroCtaSecondaryLabel,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || rowData.heroCtaSecondaryHref || base.heroCtaSecondaryHref,

    statsHeading: row.stats_heading || rowData.statsHeading || base.statsHeading,
    statsItem1Value: row.stats_item1_value || rowData.statsItem1Value || base.statsItem1Value,
    statsItem1Label: row.stats_item1_label || rowData.statsItem1Label || base.statsItem1Label,
    statsItem1Note: row.stats_item1_note || rowData.statsItem1Note || base.statsItem1Note,
    statsItem2Value: row.stats_item2_value || rowData.statsItem2Value || base.statsItem2Value,
    statsItem2Label: row.stats_item2_label || rowData.statsItem2Label || base.statsItem2Label,
    statsItem2Note: row.stats_item2_note || rowData.statsItem2Note || base.statsItem2Note,
    statsItem3Value: row.stats_item3_value || rowData.statsItem3Value || base.statsItem3Value,
    statsItem3Label: row.stats_item3_label || rowData.statsItem3Label || base.statsItem3Label,
    statsItem3Note: row.stats_item3_note || rowData.statsItem3Note || base.statsItem3Note,
    statsItem4Value: row.stats_item4_value || rowData.statsItem4Value || base.statsItem4Value,
    statsItem4Label: row.stats_item4_label || rowData.statsItem4Label || base.statsItem4Label,
    statsItem4Note: row.stats_item4_note || rowData.statsItem4Note || base.statsItem4Note,

    profileTeaserEyebrow: row.profile_teaser_eyebrow || rowData.profileTeaserEyebrow || base.profileTeaserEyebrow,
    profileTeaserHeading: row.profile_teaser_heading || rowData.profileTeaserHeading || base.profileTeaserHeading,
    profileTeaserParagraph1: row.profile_teaser_paragraph1 || rowData.profileTeaserParagraph1 || base.profileTeaserParagraph1,
    profileTeaserParagraph2: row.profile_teaser_paragraph2 || rowData.profileTeaserParagraph2 || base.profileTeaserParagraph2,
    profileTeaserImage,
    profileTeaserAccentVal: row.profile_teaser_accent_val || rowData.profileTeaserAccentVal || base.profileTeaserAccentVal,

    ctaSectionEyebrow: row.cta_section_eyebrow || rowData.ctaSectionEyebrow || base.ctaSectionEyebrow,
    ctaSectionHeading: row.cta_section_heading || rowData.ctaSectionHeading || base.ctaSectionHeading,
    ctaSectionSubtext: row.cta_section_subtext || rowData.ctaSectionSubtext || base.ctaSectionSubtext,
    ctaSectionBtn1Label: row.cta_section_btn1_label || rowData.ctaSectionBtn1Label || base.ctaSectionBtn1Label,
    ctaSectionBtn2Label: row.cta_section_btn2_label || rowData.ctaSectionBtn2Label || base.ctaSectionBtn2Label,
  };
}

function mapPengaturanToDb(data: PengaturanPortal) {
  return {
    id: "default",
    nama_kawasan: data.namaKawasan,
    subjudul_kawasan: data.subjudulKawasan,
    logo_url: data.logoUrl,
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
export async function fetchAllFromSupabase(currentLocal?: {
  umkmList?: UMKM[];
  produkList?: Produk[];
  beritaList?: Berita[];
  pengaturan?: PengaturanPortal;
  profil?: ProfilKampungData;
}) {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const [umkmRes, produkRes, beritaRes, pengRes, profilRes] = await Promise.all([
      supabase.from("umkm").select("*"),
      supabase.from("produk").select("*"),
      supabase.from("berita").select("*"),
      supabase.from("pengaturan").select("*").eq("id", "default").maybeSingle(),
      supabase.from("profil").select("*").eq("id", "default").maybeSingle(),
    ]);

    let umkmList: UMKM[] | null =
      umkmRes.data && umkmRes.data.length > 0 ? umkmRes.data.map(mapUmkmFromDb) : null;
    let produkList: Produk[] | null =
      produkRes.data && produkRes.data.length > 0 ? produkRes.data.map(mapProdukFromDb) : null;
    let beritaList: Berita[] | null =
      beritaRes.data && beritaRes.data.length > 0 ? beritaRes.data.map(mapBeritaFromDb) : null;
    let pengaturan: PengaturanPortal | null =
      pengRes.data ? mapPengaturanFromDb(pengRes.data, currentLocal?.pengaturan) : null;
    let profil: ProfilKampungData | null =
      profilRes.data && profilRes.data.data ? { ...initialProfilKampung, ...profilRes.data.data } : null;

    // If Supabase is empty, sync CURRENT LOCAL STORAGE DATA to Supabase instead of resetting!
    if (!umkmList && currentLocal?.umkmList && currentLocal.umkmList.length > 0) {
      for (const u of currentLocal.umkmList) {
        await supabase.from("umkm").upsert(mapUmkmToDb(u));
      }
      umkmList = currentLocal.umkmList;
    }
    if (!produkList && currentLocal?.produkList && currentLocal.produkList.length > 0) {
      for (const p of currentLocal.produkList) {
        await supabase.from("produk").upsert(mapProdukToDb(p));
      }
      produkList = currentLocal.produkList;
    }
    if (!beritaList && currentLocal?.beritaList && currentLocal.beritaList.length > 0) {
      for (const b of currentLocal.beritaList) {
        await supabase.from("berita").upsert(mapBeritaToDb(b));
      }
      beritaList = currentLocal.beritaList;
    }
    if (!pengaturan && currentLocal?.pengaturan) {
      await updatePengaturanSupabase(currentLocal.pengaturan);
      pengaturan = currentLocal.pengaturan;
    }
    if (!profil && currentLocal?.profil) {
      await updateProfilSupabase(currentLocal.profil);
      profil = currentLocal.profil;
    }

    return { umkmList, produkList, beritaList, pengaturan, profil };
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
  const payload = {
    ...mapPengaturanToDb(data),
    data: data, // Include full JSONB object for schema resilience
  };
  const { error } = await supabase.from("pengaturan").upsert(payload);
  if (error) {
    console.warn("Retrying update Pengaturan with JSONB / clean payload:", error);
    // 1. Coba schema JSONB (seperti tabel profil)
    const jsonbPayload = {
      id: "default",
      data: data,
      hero_image: data.heroImage,
      logo_url: data.logoUrl,
      updated_at: new Date().toISOString(),
    };
    const res = await supabase.from("pengaturan").upsert(jsonbPayload);
    
    // 2. Jika masih gagal, coba payload kolom esensial dengan hero_image & logo_url
    if (res.error) {
      const basicPayload = {
        id: "default",
        nama_kawasan: data.namaKawasan,
        subjudul_kawasan: data.subjudulKawasan,
        logo_url: data.logoUrl,
        hero_image: data.heroImage,
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
}

export async function updateProfilSupabase(data: ProfilKampungData) {
  if (!isSupabaseConfigured || !supabase) return;
  const payload = {
    id: "default",
    data: data,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("profil").upsert(payload);
  if (error) {
    console.error("Error update Profil to Supabase:", error);
  }
}
