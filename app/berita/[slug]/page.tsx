import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { daftarBerita, getBeritaBySlug, labelKategoriBerita } from "@/lib/data/berita";
import { formatTanggal } from "@/lib/utils";
import ArticleCard from "@/components/news/ArticleCard";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return daftarBerita.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const berita = getBeritaBySlug(params.slug);
  if (!berita) return {};
  return { title: berita.judul, description: berita.ringkasan };
}

export default function DetailBeritaPage({ params }: Props) {
  const berita = getBeritaBySlug(params.slug);
  if (!berita) notFound();

  const related = daftarBerita
    .filter((b) => b.id !== berita.id && b.kategori === berita.kategori)
    .slice(0, 3);

  return (
    <main className="pt-20">
      <div className="container-content py-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li>/</li>
            <li><Link href="/berita" className="hover:text-primary">Berita & Kegiatan</Link></li>
            <li>/</li>
            <li className="text-text-primary font-medium truncate">{berita.judul}</li>
          </ol>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-kategori">{labelKategoriBerita[berita.kategori]}</span>
            <time dateTime={berita.tanggal} className="text-sm text-text-secondary flex items-center gap-1.5">
              <Calendar size={13} aria-hidden="true" />
              {formatTanggal(berita.tanggal)}
            </time>
          </div>
          <h1 className="mb-4">{berita.judul}</h1>
          <p className="text-lg text-text-secondary leading-relaxed">{berita.ringkasan}</p>
          <p className="text-xs text-text-secondary mt-3">Oleh: {berita.penulis}</p>
        </header>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card mb-10">
          <Image src={berita.thumbnail} alt={`Foto artikel: ${berita.judul}`} fill className="object-cover" priority sizes="100vw" />
        </div>

        {/* Content */}
        <article className="prose prose-neutral max-w-none mb-10" aria-label="Isi artikel">
          {berita.konten.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{paragraph}</p>
          ))}
        </article>

        {/* Share */}
        <div className="flex items-center gap-3 py-4 border-t border-b border-border mb-10">
          <span className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Share2 size={15} /> Bagikan
          </span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${berita.judul} - Kampung Tempe Gempeng`)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp text-xs py-2 px-4 gap-1.5"
          >
            WhatsApp
          </a>
        </div>

        {/* Back */}
        <Link href="/berita" className="btn-secondary inline-flex gap-2 mb-12">
          <ArrowLeft size={15} /> Kembali ke Berita
        </Link>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold text-text-primary mb-6">Berita Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((b) => <ArticleCard key={b.id} berita={b} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
