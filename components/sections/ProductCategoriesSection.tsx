import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { slug: "tempe-papan", nama: "Tempe Papan", emoji: "🟫", desc: "Persegi panjang, untuk masakan rumahan & restoran" },
  { slug: "tempe-bulat", nama: "Tempe Bulat", emoji: "🔵", desc: "Silinder, praktis untuk konsumsi harian" },
  { slug: "tempe-daun-pisang", nama: "Tempe Daun Pisang", emoji: "🍃", desc: "Tradisional, aroma alami daun pisang" },
  { slug: "tempe-gembus", nama: "Tempe Gembus", emoji: "⬜", desc: "Dari ampas tahu, tekstur lembut gurih" },
];

export default function ProductCategoriesSection() {
  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--color-surface-muted)" }}
      aria-labelledby="produk-categories-heading"
    >
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-2">Katalog Produk</p>
            <h2 id="produk-categories-heading">Ragam Tempe dari Kampung Kami</h2>
            <p className="mt-2 text-text-secondary max-w-xl">
              Setiap jenis tempe diproduksi oleh pengrajin berpengalaman dengan teknik dan keahlian masing-masing.
            </p>
          </div>
          <Link href="/produk" className="btn-secondary flex-shrink-0 gap-1.5" aria-label="Lihat katalog produk lengkap">
            Lihat Katalog <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produk/${cat.slug}`}
              className="card p-5 flex flex-col gap-3 group no-underline"
              aria-label={`Lihat produk ${cat.nama}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: "var(--color-primary-soft)" }}
                aria-hidden="true"
              >
                {cat.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary text-sm">{cat.nama}</h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{cat.desc}</p>
              </div>
              <div
                className="flex items-center gap-1 text-xs font-semibold mt-auto"
                style={{ color: "var(--color-primary)" }}
              >
                Lihat Produsen <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
