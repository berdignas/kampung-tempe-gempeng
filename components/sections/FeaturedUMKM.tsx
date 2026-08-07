import Link from "next/link";
import { ArrowRight } from "lucide-react";
import UMKMCard from "@/components/umkm/UMKMCard";
import { daftarUMKM } from "@/lib/data/umkm";

export default function FeaturedUMKM() {
  // Show first 3 in neutral (alphabetical) order — no ranking
  const featured = [...daftarUMKM]
    .sort((a, b) => a.namaUsaha.localeCompare(b.namaUsaha, "id"))
    .slice(0, 3);

  return (
    <section className="section-spacing" aria-labelledby="featured-umkm-heading">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-2">Pelaku Usaha</p>
            <h2 id="featured-umkm-heading">Produsen Tempe di Kawasan Kami</h2>
            <p className="mt-2 text-text-secondary max-w-xl">
              Seluruh pelaku usaha ditampilkan secara adil dan setara. Temukan produsen yang
              sesuai kebutuhan Anda.
            </p>
          </div>
          <Link
            href="/umkm"
            className="btn-secondary flex-shrink-0 gap-1.5"
            aria-label="Lihat seluruh direktori UMKM"
          >
            Lihat Semua <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((umkm) => (
            <UMKMCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      </div>
    </section>
  );
}
