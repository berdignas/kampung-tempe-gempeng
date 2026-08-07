import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Berita, labelKategoriBerita } from "@/lib/data/berita";
import { formatTanggal } from "@/lib/utils";

interface ArticleCardProps {
  berita: Berita;
  featured?: boolean;
}

export default function ArticleCard({ berita, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article
        className="card overflow-hidden grid md:grid-cols-2 gap-0"
        aria-label={`Artikel utama: ${berita.judul}`}
      >
        <div className="relative h-56 md:h-full bg-surface-muted">
          <Image
            src={berita.thumbnail}
            alt={`Thumbnail artikel: ${berita.judul}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-kategori">{labelKategoriBerita[berita.kategori]}</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary leading-snug mb-2">
              {berita.judul}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
              {berita.ringkasan}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar size={13} aria-hidden="true" />
              <time dateTime={berita.tanggal}>{formatTanggal(berita.tanggal)}</time>
            </div>
            <Link
              href={`/berita/${berita.slug}`}
              className="btn-primary text-xs py-2 px-4 gap-1.5"
              aria-label={`Baca selengkapnya: ${berita.judul}`}
            >
              Baca Selengkapnya <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="card overflow-hidden flex flex-col"
      aria-label={`Artikel: ${berita.judul}`}
    >
      <div className="relative h-44 bg-surface-muted overflow-hidden">
        <Image
          src={berita.thumbnail}
          alt={`Thumbnail artikel: ${berita.judul}`}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-2">
          <span className="badge-kategori text-xs">{labelKategoriBerita[berita.kategori]}</span>
          <time
            dateTime={berita.tanggal}
            className="text-xs text-text-secondary flex items-center gap-1"
          >
            <Calendar size={11} aria-hidden="true" />
            {formatTanggal(berita.tanggal)}
          </time>
        </div>
        <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2 flex-1">
          {berita.judul}
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {berita.ringkasan}
        </p>
        <Link
          href={`/berita/${berita.slug}`}
          className="mt-auto pt-3 border-t border-border text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
          aria-label={`Baca selengkapnya: ${berita.judul}`}
        >
          Baca Selengkapnya <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
