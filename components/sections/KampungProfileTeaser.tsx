import Link from "next/link";
import { ArrowRight, Leaf, Users, Truck, BookOpen } from "lucide-react";
import Image from "next/image";

const potensi = [
  {
    icon: <Leaf size={22} className="text-primary" />,
    title: "Produksi Tempe",
    desc: "Puluhan rumah produksi aktif menghasilkan berbagai jenis tempe setiap hari.",
  },
  {
    icon: <Users size={22} className="text-primary" />,
    title: "Penyerapan Tenaga Kerja",
    desc: "Industri tempe kawasan ini menjadi sumber penghidupan bagi banyak keluarga.",
  },
  {
    icon: <Truck size={22} className="text-primary" />,
    title: "Distribusi",
    desc: "Produk tempe dari Gempeng menjangkau pasar di Bangil dan wilayah sekitarnya.",
  },
  {
    icon: <BookOpen size={22} className="text-primary" />,
    title: "Edukasi & Wisata Produksi",
    desc: "Kawasan ini terbuka untuk kunjungan industri, penelitian, dan program KKN.",
  },
];

export default function KampungProfileTeaser() {
  return (
    <section className="section-spacing" aria-labelledby="profil-teaser-heading">
      <div className="container-content">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Profil Kawasan</p>
            <h2 id="profil-teaser-heading" className="heading-2">Mengenal Kampung Tempe Gempeng</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan telah lama dikenal sebagai
              kawasan sentra produksi tempe. Keahlian membuat tempe diwariskan turun-temurun dan
              menjadi identitas kuat kawasan ini.
            </p>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Portal ini hadir untuk memperkuat identitas digital kawasan dan menjadi media promosi
              kolektif bagi seluruh pelaku usaha — tanpa mengutamakan siapapun secara individual.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {potensi.map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary-soft)" }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/profil" className="btn-primary mt-8 inline-flex gap-1.5">
              Baca Profil Kampung <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-card">
              <Image
                src="/images/kampung-profile.jpg"
                alt="Suasana Kampung Tempe Gempeng dengan rumah-rumah produksi dan lingkungan hijau"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Accent card */}
            <div
              className="absolute -bottom-4 -right-4 hidden md:block bg-white rounded-xl p-4 shadow-card border border-border"
              aria-hidden="true"
            >
              <p className="text-xs text-text-secondary">Kawasan aktif sejak</p>
              <p className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
                30+ Tahun
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
