import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Package } from "lucide-react";
import { Produk } from "@/lib/data/produk";
import { daftarUMKM } from "@/lib/data/umkm";

interface ProductCardProps {
  produk: Produk;
}

export default function ProductCard({ produk }: ProductCardProps) {
  const produsen = daftarUMKM.filter((u) => produk.produsenIds.includes(u.id));

  return (
    <article
      className="card overflow-hidden flex flex-col"
      aria-label={`Produk: ${produk.nama}`}
    >
      {/* Photo */}
      <div className="relative h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
        {produk.foto ? (
          <Image
            src={produk.foto}
            alt={`Foto produk ${produk.nama}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
            <Package size={32} className="opacity-35" />
            <span className="text-[11px] font-medium">Foto Belum Tersedia</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-text-primary text-base">{produk.nama}</h3>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
            {produk.deskripsi}
          </p>
        </div>

        {/* Availability badges */}
        <div className="flex flex-wrap gap-1.5">
          {produk.tersediaEceran && <span className="badge-layanan">Eceran</span>}
          {produk.tersediaGrosir && <span className="badge-layanan">Grosir</span>}
          {produk.tersediaPemasokKuliner && (
            <span className="badge-layanan">Pemasok Kuliner</span>
          )}
        </div>

        {/* Producer count */}
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Users size={13} className="text-primary" aria-hidden="true" />
          <span>
            {produsen.length} produsen di Kampung Tempe Gempeng
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-border">
          <Link
            href={`/produk/${produk.slug}`}
            className="btn-primary w-full justify-center text-xs py-2.5 gap-1.5"
            aria-label={`Lihat produsen ${produk.nama}`}
          >
            Lihat Produsen <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
