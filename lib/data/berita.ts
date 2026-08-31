// lib/data/berita.ts

export type KategoriBerita =
  | "pelatihan"
  | "kegiatan-warga"
  | "kunjungan"
  | "program-kkn"
  | "pengembangan-umkm";

export interface Berita {
  id: string;
  slug: string;
  judul: string;
  kategori: KategoriBerita;
  tanggal: string;
  ringkasan: string;
  konten: string;
  thumbnail: string;
  galeri: string[];
  penulis: string;
}

export const daftarBerita: Berita[] = [
  {
    id: "berita-001",
    slug: "pelatihan-sanitasi-produksi-tempe-2024",
    judul: "Pelatihan Sanitasi dan Higienitas Produksi Tempe untuk Pelaku UMKM Gempeng",
    kategori: "pelatihan",
    tanggal: "2024-11-15",
    ringkasan:
      "Dinas Kesehatan Kabupaten Pasuruan menyelenggarakan pelatihan sanitasi dan higienitas produksi untuk seluruh pelaku usaha tempe di Kampung Gempeng.",
    konten: `Sebanyak 24 pelaku usaha tempe di Kelurahan Gempeng mengikuti pelatihan sanitasi dan higienitas produksi yang diselenggarakan oleh Dinas Kesehatan Kabupaten Pasuruan, Jumat (15/11/2024).

Pelatihan yang berlangsung selama satu hari penuh ini mencakup materi tentang kebersihan area produksi, penanganan kedelai yang higienis, hingga pengemasan yang aman untuk konsumsi.

"Kami ingin memastikan bahwa tempe yang diproduksi di Gempeng memenuhi standar sanitasi yang baik, sehingga kepercayaan konsumen terus terjaga," ujar Kepala Dinas Kesehatan Kabupaten Pasuruan.

Para peserta juga mendapatkan panduan praktis berupa buku saku higienitas produksi yang dapat dijadikan referensi sehari-hari. Seluruh pelaku UMKM menyambut antusias kegiatan ini dan berharap pelatihan serupa dapat rutin dilaksanakan.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
  {
    id: "berita-002",
    slug: "kunjungan-mahasiswa-kkn-ubaya-2024",
    judul: "Mahasiswa KKN Universitas Surabaya Kunjungi Kampung Tempe Gempeng",
    kategori: "program-kkn",
    tanggal: "2024-10-28",
    ringkasan:
      "Tim mahasiswa KKN dari Universitas Surabaya melakukan kunjungan lapangan ke Kampung Tempe Gempeng sebagai bagian dari program pemberdayaan UMKM.",
    konten: `Tim mahasiswa Kuliah Kerja Nyata (KKN) dari Universitas Surabaya mengunjungi Kampung Tempe Gempeng, Kelurahan Gempeng, Kecamatan Bangil, Senin (28/10/2024).

Kunjungan ini merupakan bagian dari program pemberdayaan UMKM yang menjadi fokus KKN mereka. Para mahasiswa melakukan observasi langsung ke beberapa rumah produksi tempe untuk memahami proses produksi dan tantangan yang dihadapi para pelaku usaha.

"Kami kagum dengan kearifan lokal dan semangat para pengrajin tempe di sini. Kampung ini memiliki potensi besar untuk terus berkembang," ujar koordinator tim KKN.

Sebagai bentuk kontribusi, tim KKN berencana membantu dalam penyusunan sistem dokumentasi produksi dan pelatihan pemasaran digital bagi pelaku UMKM.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
  {
    id: "berita-003",
    slug: "pameran-umkm-bangil-2024",
    judul: "UMKM Gempeng Tampil di Pameran Produk Lokal Bangil 2024",
    kategori: "kegiatan-warga",
    tanggal: "2024-09-20",
    ringkasan:
      "Lima pelaku usaha tempe dari Kampung Gempeng berpartisipasi dalam Pameran Produk Lokal Bangil 2024 yang diselenggarakan di alun-alun Bangil.",
    konten: `Lima pelaku usaha tempe dari Kampung Tempe Gempeng turut berpartisipasi dalam Pameran Produk Lokal Bangil 2024 yang berlangsung di Alun-alun Bangil, Jumat–Minggu (20–22/09/2024).

Pameran yang diikuti puluhan UMKM dari seluruh Kecamatan Bangil ini menjadi ajang memperkenalkan produk-produk unggulan lokal kepada masyarakat lebih luas.

Stand Kampung Tempe Gempeng menampilkan berbagai jenis tempe mulai dari tempe papan, tempe bulat, hingga tempe daun pisang yang langsung menarik perhatian pengunjung.

"Animo masyarakat sangat tinggi. Banyak yang menanyakan cara mendapatkan tempe secara rutin dari kami," ujar salah satu peserta pameran.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
  {
    id: "berita-004",
    slug: "program-pendampingan-umkm-dinkop-2024",
    judul: "Dinas Koperasi Pasuruan Luncurkan Program Pendampingan UMKM Tempe Gempeng",
    kategori: "pengembangan-umkm",
    tanggal: "2024-08-05",
    ringkasan:
      "Dinas Koperasi dan UKM Kabupaten Pasuruan resmi meluncurkan program pendampingan intensif bagi pelaku usaha tempe di Kampung Gempeng.",
    konten: `Dinas Koperasi dan UKM Kabupaten Pasuruan resmi meluncurkan program pendampingan intensif bagi pelaku usaha tempe di Kampung Gempeng, Senin (05/08/2024).

Program ini mencakup pendampingan manajemen usaha, akses permodalan, penguatan branding produk, dan fasilitasi sertifikasi halal bagi yang belum memiliki sertifikat.

"Kampung Tempe Gempeng memiliki potensi yang sangat besar. Dengan pendampingan yang tepat, kami yakin usaha tempe di sini bisa semakin berkembang dan menjangkau pasar yang lebih luas," ujar Kepala Dinas Koperasi dan UKM Kabupaten Pasuruan.

Program ini dijadwalkan berlangsung selama enam bulan dengan agenda pertemuan rutin setiap dua minggu sekali.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
  {
    id: "berita-005",
    slug: "peluncuran-portal-kampung-tempe-gempeng",
    judul: "Portal Resmi Kampung Tempe Gempeng Resmi Diluncurkan",
    kategori: "kegiatan-warga",
    tanggal: "2024-07-17",
    ringkasan:
      "Portal informasi Kampung Tempe Gempeng resmi diluncurkan sebagai media promosi digital bagi seluruh pelaku UMKM di kawasan sentra produksi tempe ini.",
    konten: `Portal informasi Kampung Tempe Gempeng secara resmi diluncurkan pada peringatan Hari Kemerdekaan Indonesia, Rabu (17/07/2024).

Portal ini hadir sebagai media promosi kolektif yang menampilkan seluruh pelaku usaha tempe di Kelurahan Gempeng secara adil dan setara. Pengunjung dapat menemukan informasi lengkap tentang kawasan, profil setiap pelaku usaha, ragam produk tempe, hingga lokasi rumah produksi melalui peta interaktif.

"Portal ini bukan marketplace, melainkan jembatan informasi antara konsumen dan produsen tempe lokal kami," ujar koordinator pengelola portal.

Hadir dalam peluncuran ini perwakilan dari Kelurahan Gempeng, Dinas Koperasi Kabupaten Pasuruan, dan seluruh pelaku UMKM tempe yang terdaftar.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
  {
    id: "berita-006",
    slug: "kunjungan-industri-smk-bangil-2024",
    judul: "Siswa SMK Bangil Kunjungi Rumah Produksi Tempe Gempeng",
    kategori: "kunjungan",
    tanggal: "2024-06-10",
    ringkasan:
      "Sebanyak 45 siswa SMK Negeri 1 Bangil melakukan kunjungan industri ke Kampung Tempe Gempeng untuk belajar langsung proses produksi tempe.",
    konten: `Sebanyak 45 siswa kelas XI Jurusan Teknologi Pengolahan Hasil Pertanian SMK Negeri 1 Bangil melakukan kunjungan industri ke Kampung Tempe Gempeng, Senin (10/06/2024).

Kunjungan ini merupakan bagian dari program praktik industri yang bertujuan memberikan pengalaman langsung kepada siswa tentang proses produksi pangan skala UMKM.

Para siswa mendapat kesempatan menyaksikan langsung proses pemilihan kedelai, perendaman, perebusan, inokulasi ragi, hingga pengemasan tempe di beberapa rumah produksi yang menjadi lokasi kunjungan.

"Kami sangat terkesan dengan dedikasi para pengrajin tempe di sini. Ini pengalaman yang tidak bisa kami dapatkan hanya dari buku," ujar salah satu siswa peserta kunjungan.`,
    thumbnail: "",
    galeri: [],
    penulis: "Tim Pengelola Portal",
  },
];

export function getBeritaBySlug(slug: string): Berita | undefined {
  return daftarBerita.find((b) => b.slug === slug);
}

export const labelKategoriBerita: Record<KategoriBerita, string> = {
  pelatihan: "Pelatihan",
  "kegiatan-warga": "Kegiatan Warga",
  kunjungan: "Kunjungan",
  "program-kkn": "Program KKN",
  "pengembangan-umkm": "Pengembangan UMKM",
};
