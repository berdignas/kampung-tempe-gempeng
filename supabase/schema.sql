-- Skrip Inisialisasi Database Supabase untuk Kampung Tempe Gempeng
-- Jalankan skrip ini di SQL Editor pada Supabase Console

-- 1. Tabel Pengaturan Portal
CREATE TABLE IF NOT EXISTS public.pengaturan (
  id TEXT PRIMARY KEY DEFAULT 'default',
  nama_kawasan TEXT NOT NULL,
  subjudul_kawasan TEXT NOT NULL,
  alamat_sekretariat TEXT NOT NULL,
  nomor_whatsapp_pengelola TEXT NOT NULL,
  jam_layanan_pengelola TEXT NOT NULL,
  hero_headline TEXT NOT NULL,
  hero_subtext TEXT NOT NULL,
  email_pengelola TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel UMKM
CREATE TABLE IF NOT EXISTS public.umkm (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nama_usaha TEXT NOT NULL,
  nama_pemilik TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  alamat TEXT NOT NULL,
  koordinat JSONB NOT NULL,
  nomor_whatsapp TEXT NOT NULL,
  jam_operasional TEXT NOT NULL,
  tahun_berdiri INT NOT NULL,
  jenis_layanan TEXT[] NOT NULL,
  produk_ids TEXT[] NOT NULL,
  galeri TEXT[] NOT NULL,
  status_publikasi BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabel Produk
CREATE TABLE IF NOT EXISTS public.produk (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  deskripsi_panjang TEXT NOT NULL,
  ukuran_kemasan TEXT[] NOT NULL,
  cocok_untuk TEXT[] NOT NULL,
  produsen_ids TEXT[] NOT NULL,
  foto TEXT NOT NULL,
  tersedia_grosir BOOLEAN DEFAULT true,
  tersedia_eceran BOOLEAN DEFAULT true,
  tersedia_pemasok_kuliner BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabel Berita
CREATE TABLE IF NOT EXISTS public.berita (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,
  tanggal DATE NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  galeri TEXT[],
  penulis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Publik (Read / Write untuk keperluan Portal & Admin)
CREATE POLICY "Public Read Access for Pengaturan" ON public.pengaturan FOR SELECT USING (true);
CREATE POLICY "Public Read Access for UMKM" ON public.umkm FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Produk" ON public.produk FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Berita" ON public.berita FOR SELECT USING (true);

-- Permisi Mutasi (Insert/Update/Delete) untuk Anon & Authenticated (Admin CMS Portal)
CREATE POLICY "All Access for Pengaturan" ON public.pengaturan FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "All Access for UMKM" ON public.umkm FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "All Access for Produk" ON public.produk FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "All Access for Berita" ON public.berita FOR ALL USING (true) WITH CHECK (true);

-- Seed Initial Data untuk Pengaturan Portal
INSERT INTO public.pengaturan (
  id, nama_kawasan, subjudul_kawasan, alamat_sekretariat, nomor_whatsapp_pengelola, jam_layanan_pengelola, hero_headline, hero_subtext, email_pengelola
) VALUES (
  'default',
  'Kampung Tempe Gempeng',
  'Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan',
  'Jl. Gempeng Utama No. 1, Kelurahan Gempeng, Kecamatan Bangil, Pasuruan 67153',
  '628113009000',
  'Senin – Sabtu, 08.00 – 16.00 WIB',
  'Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja',
  'Kampung Tempe Gempeng adalah kawasan sentra produksi tempe di Kelurahan Gempeng, Kecamatan Bangil. Ratusan keluarga pengrajin tempe bekerja setiap hari untuk menghasilkan tempe berkualitas yang menjangkau pasar lokal hingga regional.',
  'portal@kampungtempegempeng.id'
) ON CONFLICT (id) DO NOTHING;

-- Aktifkan Supabase Realtime untuk seluruh tabel secara instan
ALTER PUBLICATION supabase_realtime ADD TABLE public.umkm, public.produk, public.berita, public.pengaturan;
