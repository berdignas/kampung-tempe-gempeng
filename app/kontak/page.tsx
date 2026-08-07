"use client";

import { MapPin, MessageCircle, Clock, Phone, Mail } from "lucide-react";


export default function KontakPage() {
  return (
    <main className="pt-20">
      <section className="py-12" style={{ backgroundColor: "var(--color-surface-muted)" }} aria-labelledby="kontak-heading">
        <div className="container-content">
          <p className="section-label mb-2">Kontak</p>
          <h1 id="kontak-heading" className="mb-3">Hubungi Pengelola Portal</h1>
          <p className="text-text-secondary max-w-xl">
            Untuk pertanyaan umum seputar kawasan. Untuk kebutuhan pembelian, silakan hubungi
            langsung masing-masing UMKM di{" "}
            <a href="/umkm" className="text-primary font-medium hover:underline">Direktori UMKM</a>.
          </p>
        </div>
      </section>

      <div className="section-spacing">
        <div className="container-content grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="card p-6 space-y-4">
              <h2 className="font-semibold text-text-primary">Informasi Kontak</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-text-primary">Alamat Kawasan</p>
                    <p className="text-text-secondary">Jl. Gempeng, Kelurahan Gempeng, Kec. Bangil, Kab. Pasuruan, Jawa Timur</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-primary flex-shrink-0" style={{ color: "#25D366" }} />
                  <div>
                    <p className="font-medium text-text-primary">WhatsApp Pengelola</p>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors">+62 812-3456-7890</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-text-primary">Email</p>
                    <a href="mailto:info@kampungtempe-gempeng.id" className="text-text-secondary hover:text-primary">info@kampungtempe-gempeng.id</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-text-primary">Jam Layanan</p>
                    <p className="text-text-secondary">Senin–Jumat, 08.00–16.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-text-primary mb-3">Untuk Kebutuhan Pembelian</h2>
              <p className="text-sm text-text-secondary mb-4">
                Kontak di halaman ini hanya untuk pertanyaan umum seputar kawasan. Untuk pembelian
                tempe, silakan hubungi langsung UMKM terkait.
              </p>
              <a href="/umkm" className="btn-primary inline-flex gap-2">Lihat Direktori UMKM</a>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6">
            <h2 className="font-semibold text-text-primary mb-5">Form Pertanyaan Umum</h2>
            <form className="space-y-4" aria-label="Form pertanyaan umum" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-text-primary mb-1.5">Nama Lengkap <span className="text-error" aria-label="wajib diisi">*</span></label>
                <input id="nama" type="text" required placeholder="Nama Anda" className="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" style={{ borderColor: "var(--color-border)", minHeight: "44px" }} aria-required="true" />
              </div>
              <div>
                <label htmlFor="kontak" className="block text-sm font-medium text-text-primary mb-1.5">Nomor Telepon / WhatsApp <span className="text-error">*</span></label>
                <input id="kontak" type="tel" required placeholder="+62 8xx-xxxx-xxxx" className="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30" style={{ borderColor: "var(--color-border)", minHeight: "44px" }} />
              </div>
              <div>
                <label htmlFor="kategori-pertanyaan" className="block text-sm font-medium text-text-primary mb-1.5">Kategori Pertanyaan <span className="text-error">*</span></label>
                <select id="kategori-pertanyaan" required className="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white" style={{ borderColor: "var(--color-border)", minHeight: "44px" }}>
                  <option value="">Pilih kategori...</option>
                  <option value="info-kawasan">Informasi kawasan</option>
                  <option value="kunjungan">Rencana kunjungan</option>
                  <option value="kerjasama">Program kerjasama</option>
                  <option value="media">Media & liputan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-text-primary mb-1.5">Pesan <span className="text-error">*</span></label>
                <textarea id="pesan" required rows={4} placeholder="Tuliskan pertanyaan atau pesan Anda..." className="w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" style={{ borderColor: "var(--color-border)" }} aria-required="true" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">Kirim Pertanyaan</button>
              <p className="text-xs text-text-secondary text-center">
                Kami akan merespons dalam 1–2 hari kerja
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
