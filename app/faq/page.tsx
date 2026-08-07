import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Jawaban atas pertanyaan yang sering diajukan mengenai Portal Kampung Tempe Gempeng, pemesanan, dan pengelola kawasan.",
};

const faqs = [
  {
    q: "Apakah website ini adalah marketplace tempat transaksi online?",
    a: "Bukan. Portal Resmi Kampung Tempe Gempeng adalah website profil kawasan dan direktori kolektif. Transaksi dilakukan secara langsung antara pembeli dan pelaku UMKM via WhatsApp atau kontak masing-masing.",
  },
  {
    q: "Bagaimana cara membeli tempe dari pengrajin di Gempeng?",
    a: "Anda dapat membuka halaman Direktori UMKM atau Katalog Produk, pilih produsen yang sesuai, lalu tekan tombol 'Hubungi via WhatsApp' untuk berkomunikasi langsung dengan pemilik usaha.",
  },
  {
    q: "Apakah melayani pemesanan skala besar / grosir / kebutuhan warung kuliner?",
    a: "Ya. Sebagian besar pelaku usaha di Kampung Gempeng melayani pembelian eceran, grosir, maupun pemasok rutin untuk usaha kuliner.",
  },
  {
    q: "Bagaimana kriteria urutan penayangan UMKM di portal ini?",
    a: "Seluruh UMKM ditampilkan secara setara tanpa ranking, rating, atau promosi berbayar. Urutan default menggunakan urutan alfabetis nama usaha atau sistem acak netral.",
  },
  {
    q: "Apakah kawasan ini dapat dikunjungi untuk studi / KKN / kunjungan industri?",
    a: "Tentu. Kampung Tempe Gempeng terbuka untuk kunjungan edukasi dan penelitian. Silakan hubungi pengelola kawasan melalui halaman Kontak untuk berkoordinasi.",
  },
];

export default function FAQPage() {
  return (
    <main className="pt-20">
      <section className="py-12" style={{ backgroundColor: "var(--color-surface-muted)" }}>
        <div className="container-content">
          <p className="section-label mb-2">Pusat Bantuan</p>
          <h1 className="mb-3">Pertanyaan yang Sering Diajukan (FAQ)</h1>
          <p className="text-text-secondary max-w-xl">
            Informasi seputar penggunaan portal, mekanisme pemesanan tempe, dan kegiatan kawasan.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-content max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card p-6">
                <h2 className="text-base font-semibold text-text-primary mb-2 flex items-start gap-2">
                  <HelpCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl text-center border border-border bg-white">
            <h3 className="text-base font-semibold text-text-primary mb-1">Masih memiliki pertanyaan?</h3>
            <p className="text-sm text-text-secondary mb-4">Hubungi pengelola portal melalui halaman kontak resmi.</p>
            <Link href="/kontak" className="btn-primary inline-flex text-xs px-5 py-2.5">
              Hubungi Pengelola
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
