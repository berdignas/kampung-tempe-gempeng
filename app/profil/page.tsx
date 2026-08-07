import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, Truck, BookOpen, Target, HeartHandshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Kampung",
  description: "Sejarah, visi, potensi ekonomi, dan nilai bersama kawasan sentra produksi Kampung Tempe Gempeng, Bangil, Pasuruan.",
};

const timeline = [
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
];

const nilaiNilai = [
  {
    icon: <HeartHandshake size={24} className="text-primary" />,
    judul: "Kolektivitas & Keadilan",
    deskripsi: "Kawasan lebih utama daripada individu. Seluruh UMKM memiliki kesempatan yang sama untuk dikenal.",
  },
  {
    icon: <ShieldCheck size={24} className="text-primary" />,
    judul: "Kualitas & Mutu Produk",
    deskripsi: "Menjaga kebersihan, teknik fermentasi alami, dan standar bahan baku kedelai terbaik secara rutin.",
  },
  {
    icon: <Target size={24} className="text-primary" />,
    judul: "Kemandirian Usaha",
    deskripsi: "Mendorong pembeli dan mitra untuk terhubung langsung dengan produsen tanpa perantara komisi.",
  },
];

export default function ProfilPage() {
  return (
    <main className="pt-20">
      {/* Hero Profil */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "var(--color-surface-muted)" }}>
        <div className="container-content relative">
          <div className="max-w-3xl">
            <p className="section-label mb-2">Profil Kawasan</p>
            <h1 className="mb-4">Identitas & Legasi Kampung Tempe Gempeng</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan merupakan pusat produksi tempe yang telah menghidupi puluhan keluarga pengrajin dan melayani kebutuhan gizi masyarakat secara lintas generasi.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Foto */}
      <section className="container-content -mt-8 relative z-10">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
          <Image
            src="/images/profil-kampung-banner.jpg"
            alt="Suasana pemukiman dan aktivitas Kampung Tempe Gempeng"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Sejarah & Timeline */}
      <section className="section-spacing" aria-labelledby="sejarah-heading">
        <div className="container-content">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="section-label mb-2">Sejarah & Perjalanan</p>
              <h2 id="sejarah-heading" className="mb-4">Jejak Langkah Sentra Tempe Gempeng</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Tradisi membuat tempe di Gempeng berawal dari keterampilan rumahan yang diturunkan antar generasi. Kualitas air, keahlian fermentasi alami, dan etos kerja warga menjadikan tempe dari Gempeng memiliki tekstur padat dan citarasa yang khas.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Kini, kawasan ini terus bertransformasi menjadi sentra produksi pangan lokal yang adaptif terhadap standar sanitasi dan perkembangan teknologi digital.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-border bg-white shadow-sm">
                  <div className="flex-shrink-0 font-bold text-lg px-3 py-1.5 rounded-xl h-fit text-primary" style={{ backgroundColor: "var(--color-primary-soft)" }}>
                    {item.tahun}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-1">{item.judul}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="section-spacing" style={{ backgroundColor: "var(--color-surface-muted)" }} aria-labelledby="visi-misi-heading">
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">Arah Pengembangan</p>
            <h2 id="visi-misi-heading">Visi & Misi Kawasan</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 bg-white">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <Target className="text-primary" /> Visi Kawasan
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Menjadikan Kampung Tempe Gempeng sebagai sentra produksi tempe yang mandiri, berdaya saing, berstandar higienis tinggi, serta dikenal secara luas sebagai ikon kuliner tradisional Kabupaten Pasuruan.
              </p>
            </div>

            <div className="card p-8 bg-white">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <Leaf className="text-primary" /> Misi Kawasan
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Memperkuat promosi kolektif bagi seluruh pengrajin tempe tanpa diskriminasi.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Meningkatkan kualitas produksi dan kepatuhan terhadap standar kesehatan pangan.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Membuka jejaring kemitraan dengan sektor kuliner, distributor, dan instansi pendidikan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Bersama */}
      <section className="section-spacing" aria-labelledby="nilai-heading">
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">Prinsip Komunitas</p>
            <h2 id="nilai-heading">Nilai Bersama Pelaku UMKM</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {nilaiNilai.map((n, idx) => (
              <div key={idx} className="card p-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--color-primary-soft)" }}>
                  {n.icon}
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{n.judul}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{n.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "var(--color-primary-soft)" }}>
        <div className="container-content">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Ingin Mengenal Lebih Dekat?</h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-6">
            Temukan lokasi rumah produksi pada peta interaktif atau jelajahi seluruh pelaku UMKM tempe di kawasan kami.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/umkm" className="btn-primary">
              Jelajahi Direktori UMKM <ArrowRight size={16} />
            </Link>
            <Link href="/peta" className="btn-secondary">
              Lihat Peta Produksi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
