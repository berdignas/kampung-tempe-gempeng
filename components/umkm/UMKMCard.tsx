import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, MessageCircle, ArrowRight, Store } from "lucide-react";
import { UMKM, labelLayanan } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";

interface UMKMCardProps {
  umkm: UMKM;
}

export default function UMKMCard({ umkm }: UMKMCardProps) {
  const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));

  return (
    <article
      className="card overflow-hidden flex flex-col"
      aria-label={`Profil UMKM: ${umkm.namaUsaha}`}
    >
      {/* Photo */}
      <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        {umkm.galeri && umkm.galeri[0] ? (
          <Image
            src={umkm.galeri[0]}
            alt={`Foto usaha ${umkm.namaUsaha}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
            <Store size={32} className="opacity-35" />
            <span className="text-[11px] font-medium">Foto Belum Tersedia</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Service badges */}
        <div className="flex flex-wrap gap-1.5" aria-label="Jenis layanan">
          {umkm.jenisLayanan.map((layanan) => (
            <span key={layanan} className="badge-layanan">
              {labelLayanan[layanan]}
            </span>
          ))}
        </div>

        {/* Name */}
        <div>
          <h3 className="font-semibold text-text-primary text-base leading-snug">
            {umkm.namaUsaha}
          </h3>
          {umkm.namaPemilik && (
            <p className="text-xs text-text-secondary mt-0.5">{umkm.namaPemilik}</p>
          )}
        </div>

        {/* Details */}
        <div className="space-y-1.5 text-xs text-text-secondary flex-1">
          <div className="flex items-start gap-1.5">
            <MapPin size={13} className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
            <span>{umkm.alamat}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="flex-shrink-0 text-primary" aria-hidden="true" />
            <span>{umkm.jamOperasional}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
          <Link
            href={`/umkm/${umkm.slug}`}
            className="btn-secondary flex-1 text-xs py-2 px-4 justify-center gap-1.5"
            aria-label={`Lihat profil lengkap ${umkm.namaUsaha}`}
          >
            Lihat Profil <ArrowRight size={13} />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-shrink-0 px-4 py-2 text-xs gap-1.5"
            aria-label={`Hubungi ${umkm.namaUsaha} via WhatsApp`}
          >
            <MessageCircle size={14} />
            WA
          </a>
        </div>
      </div>
    </article>
  );
}
