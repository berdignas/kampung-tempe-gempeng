import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi penayangan data dan penggunaan informasi di Portal Resmi Kampung Tempe Gempeng.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      <section className="py-12" style={{ backgroundColor: "var(--color-surface-muted)" }}>
        <div className="container-content">
          <p className="section-label mb-2">Informasi Hukum</p>
          <h1 className="mb-3">Kebijakan Privasi</h1>
          <p className="text-text-secondary max-w-xl">
            Kebijakan pengumpulan, penggunaan, dan perlindungan data pribadi serta informasi UMKM pada Portal Resmi Kampung Tempe Gempeng.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-content max-w-3xl prose prose-neutral">
          <div className="card p-8 bg-white space-y-6 text-sm text-text-secondary leading-relaxed">
            <div>
              <h2 className="text-base font-semibold text-text-primary mb-2">1. Persetujuan Penayangan Data UMKM</h2>
              <p>
                Seluruh data nama pemilik, kontak WhatsApp, foto rumah produksi, dan alamat usaha yang ditampilkan di portal ini telah memperoleh persetujuan tertulis / lisan dari masing-masing pelaku usaha yang bersangkutan untuk keperluan promosi kolektif kawasan.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary mb-2">2. Penggunaan Informasi Kontak</h2>
              <p>
                Nomor WhatsApp dan informasi lokasi yang tertera di direktori hanya diperuntukkan bagi calon pembeli, pelanggan, atau mitra yang ingin menghubungi UMKM terkait transaksi usaha atau kemitraan. Dilarang menyalahgunakan informasi kontak tersebut untuk tindakan spaming atau telemarketing tanpa izin.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary mb-2">3. Form Pertanyaan Umum</h2>
              <p>
                Informasi yang dimasukkan pengguna melalui Form Pertanyaan Umum pada halaman Kontak hanya digunakan oleh tim pengelola kawasan untuk merespons pertanyaan atau koordinasi kunjungan, dan tidak akan dijual atau dibagikan kepada pihak ketiga.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary mb-2">4. Hak Perubahan Data</h2>
              <p>
                Pelaku UMKM terdaftar berhak memperbarui, mengoreksi, atau meminta penghentian penayangan profil usahanya sewaktu-waktu dengan menghubungi pengelola portal resmi Kelurahan Gempeng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
