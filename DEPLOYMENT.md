# Panduan Integrasi Supabase & Deployment Netlify

Dokumen ini berisi panduan lengkap untuk melakukan konfigurasi basis data **Supabase** dan mendeploy aplikasi portal **Kampung Tempe Gempeng** ke platform **Netlify**.

---

## 1. Setup Database Supabase

1. **Buat Project Baru di Supabase**:
   - Buka [https://supabase.com](https://supabase.com) dan masuk ke akun Anda.
   - Klik **"New Project"**, berikan nama proyek (misal: `kampung-tempe-gempeng`), buat kata sandi database, dan pilih region terdekat (misal: *Singapore*).

2. **Eksekusi Skrip Schema SQL**:
   - Di dashboard Supabase, buka menu **SQL Editor** (ikon di bilah navigasi kiri).
   - Buat query baru (*"New Query"*).
   - Salin seluruh isi file [`supabase/schema.sql`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/supabase/schema.sql) dan tempel ke dalam SQL Editor.
   - Klik **"Run"** untuk membuat tabel (`umkm`, `produk`, `berita`, `pengaturan`) beserta kebijakan RLS (Row Level Security) dan data awal (*seed*).

3. **Ambil API Credentials**:
   - Buka **Project Settings** -> **API**.
   - Catat:
     - **Project URL** (misal: `https://xxxx.supabase.co`)
     - **anon / public key** (kunci `eyJ...`)

---

## 2. Setup Pengujian Lokal (Local Development)

1. Buat file `.env.local` di folder akar proyek (sejajar dengan `package.json`).
2. Masukkan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
   *Catatan: Jika variabel lingkungan belum diisi, aplikasi tetap berjalan menggunakan basis data lokal (`localStorage`) tanpa crash.*

---

## 3. Deploy ke Netlify

### Cara A: Melalui Dashboard Netlify (Direkomendasikan via GitHub/Gitlab)

1. **Push Repository ke GitHub/Gitlab**.
2. Masuk ke [https://app.netlify.com](https://app.netlify.com).
3. Klik **"Add new site"** -> **"Import an existing project"**.
4. Hubungkan ke akun GitHub/Gitlab Anda dan pilih repository **Kampung Tempe Gempeng**.
5. Netlify secara otomatis membaca file [`netlify.toml`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/netlify.toml) dengan konfigurasi:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
6. Tambahkan **Environment Variables** sebelum menekan *Deploy*:
   - Key: `NEXT_PUBLIC_SUPABASE_URL` | Value: `[URL Supabase Anda]`
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value: `[Anon Key Supabase Anda]`
7. Klik **"Deploy Kampung Tempe Gempeng"**.

---

### Cara B: Melalui Netlify CLI

1. Install Netlify CLI jika belum terinstall:
   ```bash
   npm install -g netlify-cli
   ```
2. Login ke akun Netlify Anda:
   ```bash
   netlify login
   ```
3. Hubungkan dan Deploy:
   ```bash
   netlify init
   netlify deploy --build --prod
   ```

---

## 4. Struktur File Terkait

- [`lib/supabase/client.ts`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/lib/supabase/client.ts) : Inisialisasi Supabase SDK.
- [`lib/supabase/cmsSync.ts`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/lib/supabase/cmsSync.ts) : Mapper & fungsi async CRUD Supabase.
- [`lib/cms/CMSContext.tsx`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/lib/cms/CMSContext.tsx) : Provider CMS terintegrasi (Supabase + localStorage fallback).
- [`supabase/schema.sql`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/supabase/schema.sql) : DDL Database PostgreSQL.
- [`netlify.toml`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/netlify.toml) : Konfigurasi build Netlify.
- [`.env.example`](file:///c:/Users/bagoesdev/OneDrive/Documents/Jurnal%20Bagus/Kampung%20Tempe/.env.example) : Templat environment variable.
