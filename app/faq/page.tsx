import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Jawaban atas pertanyaan yang sering diajukan mengenai Portal Kampung Tempe Gempeng, pemesanan, dan pengelola kawasan.",
};

const faqs = [
  {
    q: "Apakah website ini mengenakan biaya transaksi atau komisi pemesanan?",
    a: "Tidak ada biaya transaksi sama sekali. Portal ini adalah media promosi resmi dan direktori bersama. Semua pemesanan dan pembayaran dilakukan langsung antara Anda dan pihak perajin tempe melalui WhatsApp.",
  },
  {
    q: "Bagaimana cara memesan tempe langsung dari perajin Gempeng?",
    a: "Buka menu Direktori UMKM atau Katalog Produk, pilih rumah produksi tempe yang Anda inginkan, lalu klik tombol 'Hubungi via WhatsApp'. Anda akan langsung terhubung ke nomor pemilik usaha.",
  },
  {
    q: "Apakah perajin tempe melayani pasokan grosir dan kebutuhan usaha kuliner?",
    a: "Ya. Sebagian besar rumah produksi tempe di Gempeng siap melayani kebutuhan harian rumah tangga (eceran), pedagang pasar (grosir), hingga pasokan rutin untuk restoran, katering, dan warung kuliner.",
  },
  {
    q: "Bagaimana sistem penayangan UMKM di portal ini?",
    a: "Semua perajin tempe terdaftar ditampilkan secara adil dan setara tanpa sistem rating berbayar atau ranking sponsor. Seluruh perajin memiliki kesempatan promosi yang sama.",
  },
  {
    q: "Apakah kawasan Kampung Tempe Gempeng menerima kunjungan studi, penelitian, atau KKN?",
    a: "Tentu saja. Kawasan kami terbuka untuk kunjungan industri, studi banding, riset akademis, maupun program pengabdian masyarakat (KKN). Silakan berkoordinasi melalui halaman Kontak.",
  },
];

export default function FAQPage() {
  return (
    <main className="pt-20">
      <section className="py-12 md:py-16" style={{ backgroundColor: "var(--color-surface-muted)" }}>
        <div className="container-content animate-fade-in-up">
          <p className="section-label mb-2">Pusat Bantuan</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Jawaban lengkap seputar cara pemesanan, layanan pasokan tempe, dan koordinasi kunjungan ke sentra tempe Gempeng.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-content max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card p-6 shadow-xs hover:shadow-md transition">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                  <HelpCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 sm:p-8 rounded-2xl text-center border border-slate-200 bg-white shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Masih Memiliki Pertanyaan Lain?</h3>
            <p className="text-sm text-slate-500 mb-5">Tim pengelola kawasan siap membantu menjawab kebutuhan Anda.</p>
            <Link href="/kontak" className="btn-primary inline-flex text-xs font-bold px-6 py-3 rounded-xl shadow-xs">
              Hubungi Sekretariat Kawasan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
