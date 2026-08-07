---
name: "Portal Resmi Kampung Tempe Gempeng"
description: "Portal informasi dan promosi kolektif untuk memperkuat identitas Kampung Tempe Gempeng sebagai sentra produksi tempe, menampilkan seluruh pelaku UMKM secara adil tanpa fungsi marketplace."
productType: "official community portal"
techStack: "Next.js + Tailwind CSS"
primaryAudience:
  - "Masyarakat umum dan konsumen yang ingin membeli tempe langsung dari tempat produksi"
  - "Pelaku usaha kuliner yang membutuhkan pemasok tempe"
  - "Distributor tempe"
  - "Instansi, komunitas, dan mitra pengembangan UMKM"
brandPrinciples:
  - "Kawasan lebih utama daripada individu UMKM"
  - "Semua UMKM ditampilkan secara adil"
  - "Informasi mudah ditemukan dan mudah diverifikasi"
  - "Website bukan marketplace"
  - "Kontak transaksi dilakukan langsung melalui WhatsApp atau kanal milik UMKM"
colors:
  primary: "#2FA84F"
  primary-hover: "#258A40"
  primary-soft: "#E8F6EC"
  secondary: "#7E5A32"
  secondary-soft: "#F4EBDD"
  accent: "#F2B134"
  background: "#F6FAF5"
  surface: "#FFFFFF"
  surface-muted: "#EDF5EC"
  text-primary: "#142016"
  text-secondary: "#667066"
  border: "#DCE7DC"
  success: "#2FA84F"
  warning: "#D99000"
  error: "#C53B3B"
typography:
  family: "Inter, Geist, ui-sans-serif, system-ui, sans-serif"
  h1:
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h2:
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h3:
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
layout:
  grid: "12-column grid"
  maxContentWidth: "1280px"
  pagePaddingDesktop: "32px"
  pagePaddingTablet: "24px"
  pagePaddingMobile: "16px"
  sectionSpacingDesktop: "96px"
  sectionSpacingMobile: "64px"
elevation:
  card: "0 8px 24px rgba(20, 32, 22, 0.06)"
  cardHover: "0 14px 36px rgba(20, 32, 22, 0.10)"
  focus: "0 0 0 3px rgba(47, 168, 79, 0.24)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 22px"
    minHeight: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    padding: "12px 22px"
  button-whatsapp:
    backgroundColor: "#25D366"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 18px"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    shadow: "{elevation.card}"
  badge:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-hover}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
    minHeight: "44px"
  map-marker:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    size: "40px"
    rounded: "{rounded.full}"
---

# 1. Product Overview

Portal Resmi Kampung Tempe Gempeng adalah website profil kawasan untuk Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan. Fokus utamanya adalah membangun identitas digital Kampung Tempe Gempeng sebagai sentra produksi tempe dan menjadi media promosi kolektif bagi seluruh pelaku UMKM.

Portal ini bukan marketplace, bukan sistem pemesanan, dan bukan ruang kompetisi antar-UMKM. Website harus terlebih dahulu memperkuat nama kawasan. Setelah memahami profil kawasan, pengunjung dapat menjelajahi seluruh pelaku usaha, produk, lokasi rumah produksi, dan menghubungi UMKM secara langsung melalui WhatsApp.

# 2. UX Goals

1. Membuat pengunjung memahami dalam 5–10 detik bahwa Kampung Tempe Gempeng adalah sentra produksi tempe.
2. Menyediakan akses yang setara ke seluruh profil UMKM.
3. Mempermudah konsumen, pelaku kuliner, distributor, dan instansi menemukan informasi relevan.
4. Mengarahkan komunikasi dan transaksi langsung ke UMKM tanpa membangun fitur marketplace.
5. Mendokumentasikan kegiatan, pelatihan, dan perkembangan kampung setelah program KKN.

# 3. Information Architecture

## 3.1 Primary Navigation

- Beranda
- Profil Kampung
- Direktori UMKM
- Katalog Produk
- Peta Produksi
- Berita & Kegiatan
- Kontak

## 3.2 Utility Navigation

- Pencarian
- Filter UMKM
- Filter produk
- Tombol "Hubungi via WhatsApp"
- Breadcrumb pada halaman detail

# 4. Required Screens

## 4.1 Beranda

### Tujuan
Memperkenalkan identitas Kampung Tempe Gempeng, menjelaskan nilai kawasan, dan mengarahkan pengunjung ke direktori UMKM, katalog produk, dan peta produksi.

### Section
1. Header dan navbar utama
2. Hero:
   - Eyebrow: "Sentra Produksi Tempe di Bangil, Pasuruan"
   - Headline: "Dari Kampung Kami, Tempe Berkualitas untuk Banyak Meja"
   - Supporting copy tentang kawasan dan pelaku UMKM
   - CTA primer: "Jelajahi UMKM"
   - CTA sekunder: "Lihat Peta Produksi"
   - Hero image aktivitas produksi tempe
3. Statistik kawasan:
   - Jumlah UMKM
   - Jumlah rumah produksi
   - Lama kawasan berkembang
   - Jangkauan distribusi
   Semua angka memakai placeholder sampai data resmi tersedia.
4. Ringkasan profil kampung
5. Featured UMKM dalam urutan netral atau rotasi, bukan ranking
6. Kategori produk utama
7. Preview peta interaktif
8. Berita/kegiatan terbaru
9. CTA kolektif: "Temukan produsen yang sesuai kebutuhan Anda"
10. Footer lengkap

### Catatan fairness
Tidak boleh ada label "terbaik", "terlaris", "nomor satu", rating, jumlah penjualan, atau urutan berbayar.

## 4.2 Profil Kampung

### Tujuan
Menjelaskan sejarah, visi, karakter kawasan, potensi ekonomi, dan arah pengembangan Kampung Tempe Gempeng.

### Section
1. Hero profil kawasan
2. Sejarah Kampung Tempe Gempeng
3. Timeline perkembangan
4. Visi dan misi
5. Potensi kawasan:
   - Produksi tempe
   - Penyerapan tenaga kerja
   - Distribusi
   - Edukasi dan wisata produksi
6. Nilai bersama para pelaku UMKM
7. Dokumentasi visual kawasan
8. CTA menuju direktori UMKM dan peta produksi

## 4.3 Direktori UMKM

### Tujuan
Menampilkan seluruh pelaku usaha tempe secara adil dan mudah dijelajahi.

### Layout
- Header halaman
- Search bar
- Filter berdasarkan:
  - Wilayah/RT/RW jika data tersedia
  - Jenis produk
  - Kapasitas pasokan jika data tersedia
  - Layanan eceran/grosir/distributor
- Grid kartu UMKM
- Pagination atau load more

### UMKM Card
- Foto usaha atau pemilik
- Nama usaha
- Nama pemilik, bila disetujui
- Alamat singkat
- Jenis produk
- Label layanan: eceran, grosir, pemasok kuliner, distributor
- CTA "Lihat Profil"
- CTA WhatsApp

### Fairness rule
Urutan default menggunakan alfabet, nomor registrasi, atau rotasi acak yang transparan. Tidak menggunakan ranking performa.

## 4.4 Detail UMKM

### Tujuan
Memberikan profil lengkap satu UMKM dan memudahkan calon pembeli menghubungi pemilik secara langsung.

### Section
1. Breadcrumb
2. Profil usaha:
   - Nama usaha
   - Nama pemilik
   - Tahun berdiri
   - Alamat
   - Jam operasional
3. Cerita singkat usaha
4. Produk yang tersedia
5. Kapasitas/jenis layanan, jika dapat dipublikasikan
6. Galeri rumah produksi
7. Lokasi pada peta
8. CTA WhatsApp sticky pada mobile
9. Rekomendasi "UMKM Lain di Kampung Tempe Gempeng" tanpa ranking

## 4.5 Katalog Produk

### Tujuan
Membantu pengunjung memahami ragam produk yang tersedia di kawasan, kemudian melihat UMKM mana saja yang memproduksinya.

### Layout
- Search dan filter kategori
- Grid produk
- Filter:
  - Jenis tempe
  - Ukuran/kemasan
  - Eceran/grosir
  - Ketersediaan pemasok kuliner

### Product Card
- Foto produk
- Nama produk
- Deskripsi ringkas
- Daftar UMKM yang menyediakan
- CTA "Lihat Produsen"

### Aturan
Tidak menampilkan keranjang, checkout, harga promosi, flash sale, rating, atau fitur marketplace lain.

## 4.6 Detail Produk

### Tujuan
Menjelaskan satu jenis produk dan menampilkan semua UMKM yang menyediakannya.

### Section
1. Foto dan deskripsi produk
2. Karakteristik/ukuran/kemasan
3. Cocok untuk kebutuhan apa
4. Daftar produsen terkait
5. CTA kontak langsung ke masing-masing UMKM

## 4.7 Peta Interaktif

### Tujuan
Menunjukkan persebaran rumah produksi dan membantu pengunjung menemukan lokasi UMKM.

### Layout
Desktop:
- Panel filter/list di kiri
- Peta di kanan

Mobile:
- Peta penuh
- Bottom sheet untuk daftar UMKM

### Features
- Marker untuk tiap UMKM
- Marker clustering jika jumlah lokasi banyak
- Search lokasi/usaha
- Filter jenis produk atau layanan
- Popup marker:
  - Nama UMKM
  - Alamat singkat
  - Produk utama
  - Tombol detail
  - Tombol WhatsApp
- Tombol "Buka di Google Maps" jika koordinat tersedia

## 4.8 Berita & Kegiatan

### Tujuan
Menjadi media publikasi kegiatan pelatihan, acara, kunjungan, program KKN, dan perkembangan kawasan.

### Layout
- Featured article
- Grid artikel terbaru
- Filter kategori:
  - Pelatihan
  - Kegiatan warga
  - Kunjungan
  - Program KKN
  - Pengembangan UMKM
- Pagination

### Article Card
- Thumbnail
- Tanggal
- Kategori
- Judul
- Ringkasan
- CTA "Baca Selengkapnya"

## 4.9 Detail Berita/Kegiatan

### Tujuan
Menampilkan dokumentasi lengkap kegiatan.

### Section
- Breadcrumb
- Judul, kategori, tanggal
- Hero image
- Isi artikel
- Galeri dokumentasi
- Artikel terkait
- Share button

## 4.10 Kontak

### Tujuan
Menjadi kanal komunikasi resmi kawasan, bukan pengganti kontak masing-masing UMKM.

### Section
1. Kontak pengelola portal/kampung
2. Alamat kawasan
3. Embedded map
4. Form pertanyaan umum
5. WhatsApp pengelola
6. Link ke direktori untuk kebutuhan pembelian
7. Jam layanan

## 4.11 Search Results

### Tujuan
Menampilkan hasil pencarian lintas UMKM, produk, dan berita.

### Section
- Search input
- Tab hasil: Semua, UMKM, Produk, Berita
- Result cards
- Empty state

## 4.12 Static Utility Screens

- FAQ
- Kebijakan Privasi
- Syarat Penggunaan
- 404 Not Found
- 500/Error State
- Empty State direktori/produk/berita
- Loading skeleton untuk grid dan detail

# 5. Core User Flows

## 5.1 Konsumen Membeli Langsung
Beranda → Direktori UMKM atau Katalog Produk → Detail UMKM → WhatsApp pemilik usaha.

## 5.2 Pelaku Kuliner Mencari Pemasok
Beranda → Katalog Produk → Filter "pemasok kuliner/grosir" → Detail produk → Daftar UMKM → WhatsApp.

## 5.3 Pengunjung Mencari Lokasi Produksi
Beranda → Peta Produksi → Pilih marker → Detail UMKM → Buka Google Maps.

## 5.4 Instansi Mencari Informasi Kawasan
Beranda → Profil Kampung → Potensi kawasan → Berita & Kegiatan → Kontak pengelola.

# 6. Visual Direction

## 6.1 Style
Minimalist service landing page dengan karakter komunitas lokal yang hangat. Gunakan whitespace luas, card putih, background hijau sangat muda, foto autentik produksi tempe, dan primary CTA hijau.

## 6.2 Mood
- Trustworthy
- Warm
- Fresh
- Community-oriented
- Authentic

## 6.3 Imagery
- Gunakan foto dokumenter asli kawasan dan proses produksi.
- Prioritaskan manusia, aktivitas, tekstur kedelai, tempe, alat produksi, dan lingkungan kampung.
- Hindari stock photo yang terlalu korporat.
- Rasio gambar utama 4:3 atau 16:9; portrait untuk profil UMKM.

## 6.4 Iconography
- Gunakan Lucide Icons atau Heroicons.
- Outline style, stroke 1.5–2px.
- Ukuran standar 20px atau 24px.

# 7. Layout Rules

- Desktop memakai 12-column grid dengan max-width 1280px.
- Hero menggunakan split layout 5/7 atau 6/6.
- Card grid:
  - 3 kolom desktop
  - 2 kolom tablet
  - 1 kolom mobile
- Section spacing 96px desktop dan 64px mobile.
- Teks panjang dibatasi maksimal 65–75 karakter per baris.
- Navbar menjadi hamburger menu pada breakpoint di bawah 1024px.

# 8. Component Rules

## 8.1 Header
- Logo/nama "Kampung Tempe Gempeng" di kiri.
- Primary navigation di tengah/kanan.
- CTA "Hubungi Kami" atau "Jelajahi UMKM".
- Sticky setelah scroll dengan background putih dan subtle border.

## 8.2 Buttons
- Maksimal satu primary CTA per section.
- Primary hijau solid.
- Secondary putih/transparent dengan border.
- WhatsApp menggunakan hijau resmi WhatsApp hanya untuk aksi kontak langsung.
- Hover: translateY(-1px) dan shadow ringan.
- Focus ring 2px–3px yang jelas.

## 8.3 Cards
- Radius 18px.
- Border 1px `#DCE7DC`.
- Shadow halus.
- Hover hanya untuk card yang interaktif.
- Informasi inti harus tetap terlihat tanpa hover.

## 8.4 UMKM Listing
- Semua kartu memiliki ukuran dan hierarchy yang sama.
- Foto, nama, alamat, layanan, dan CTA menggunakan struktur identik.
- Tidak ada badge "unggulan", "recommended", atau "top seller".

## 8.5 Forms
- Label selalu terlihat di atas input.
- Error message spesifik.
- Input minimal 44px tinggi.
- Form kontak menggunakan field nama, kontak, kategori pertanyaan, dan pesan.

## 8.6 Map
- Marker harus dapat digunakan dengan keyboard.
- Popup tidak boleh menutupi seluruh viewport mobile.
- Sediakan alternatif daftar lokasi agar informasi tidak bergantung pada peta.

# 9. Content Rules

- Gunakan bahasa Indonesia yang jelas, hangat, dan informatif.
- Hindari bahasa penjualan agresif.
- Gunakan istilah "pelaku UMKM", "rumah produksi", "produsen", atau "pengrajin" secara konsisten sesuai data resmi.
- Semua statistik harus berasal dari data yang disetujui pengelola.
- Jangan membuat klaim "terbesar", "terbaik", atau "nomor satu" tanpa bukti resmi.
- Setiap profil UMKM harus melalui persetujuan pemilik untuk data pribadi, foto, alamat, dan nomor WhatsApp.

# 10. Accessibility

- Target WCAG AA.
- Kontras body text minimal 4.5:1.
- Kontras large text minimal 3:1.
- Touch target minimal 44×44px.
- Semua gambar memiliki alt text deskriptif.
- Focus indicator selalu terlihat.
- Gunakan semantic HTML: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Jangan bergantung pada warna saja untuk menyampaikan status.
- Peta memiliki fallback list view.

# 11. Responsive Behavior

## Mobile
- Navigation menjadi drawer/hamburger.
- Hero ditumpuk: teks lalu foto.
- Grid menjadi satu kolom.
- CTA WhatsApp pada detail UMKM dapat menjadi sticky bottom action.
- Peta menggunakan full-width dan bottom sheet.
- Filter masuk ke modal/drawer.

## Tablet
- Grid dua kolom.
- Hero dapat tetap split jika ruang cukup.
- Filter dapat menjadi horizontal scroll chips.

## Desktop
- Grid tiga kolom.
- Direktori dan peta menggunakan panel dua bagian.
- Header selalu menampilkan menu utama.

# 12. Motion

- Default transition 150–250ms ease-out.
- Hover card: sedikit naik dan shadow bertambah.
- Button press: scale 0.98.
- Hindari animasi dekoratif berlebihan.
- Hormati `prefers-reduced-motion`.

# 13. Data Model Guidance

## UMKM
- id
- slug
- namaUsaha
- namaPemilik
- deskripsi
- alamat
- koordinat
- nomorWhatsApp
- jamOperasional
- tahunBerdiri
- jenisLayanan
- produkIds
- galeri
- statusPublikasi

## Produk
- id
- slug
- nama
- kategori
- deskripsi
- ukuranKemasan
- produsenIds
- foto

## Berita/Kegiatan
- id
- slug
- judul
- kategori
- tanggal
- ringkasan
- konten
- thumbnail
- galeri
- penulis

# 14. Suggested Next.js Structure

```text
app/
  page.tsx
  profil/page.tsx
  umkm/page.tsx
  umkm/[slug]/page.tsx
  produk/page.tsx
  produk/[slug]/page.tsx
  peta/page.tsx
  berita/page.tsx
  berita/[slug]/page.tsx
  kontak/page.tsx
  faq/page.tsx
  search/page.tsx
  privacy/page.tsx
  not-found.tsx
components/
  layout/
  navigation/
  sections/
  umkm/
  products/
  map/
  news/
  forms/
  ui/
content/
  umkm/
  products/
  news/
lib/
  data/
  maps/
  whatsapp/
```

# 15. Rules to Never Break

1. Website tidak boleh berubah menjadi marketplace.
2. Jangan menyediakan cart, checkout, pembayaran, komisi, atau transaksi internal.
3. Jangan menampilkan ranking, rating, jumlah penjualan, atau label UMKM terbaik.
4. Jangan mengutamakan satu UMKM melalui ukuran card, posisi eksklusif, warna khusus, atau promosi berbayar.
5. Seluruh UMKM harus memperoleh struktur profil dan peluang tampil yang setara.
6. Nama Kampung Tempe Gempeng harus lebih dominan daripada nama usaha individual pada level portal.
7. Kontak pembelian diarahkan langsung ke UMKM terkait.
8. Gunakan hanya data, foto, alamat, dan nomor kontak yang telah disetujui untuk publikasi.
9. Jangan menggunakan lorem ipsum pada implementasi final.
10. Selalu sediakan fallback list untuk informasi berbasis peta.
