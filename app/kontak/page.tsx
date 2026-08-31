"use client";

import { MapPin, MessageCircle, Clock, Mail } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

export default function KontakPage() {
  const { pengaturan } = useCMS();

  return (
    <main className="pt-20">
      <section className="py-12 md:py-16" style={{ backgroundColor: "var(--color-surface-muted)" }} aria-labelledby="kontak-heading">
        <div className="container-content animate-fade-in-up">
          <p className="section-label mb-2">Pusat Informasi & Sekretariat</p>
          <h1 id="kontak-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Hubungi Pengelola Kawasan
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Layanan koordinasi resmi untuk kunjungan industri, program KKN/penelitian akademis, kerjasama pengembangan UMKM, serta informasi umum seputar Kampung Tempe Gempeng.
          </p>
        </div>
      </section>

      <div className="section-spacing">
        <div className="container-content grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="card p-6 sm:p-7 space-y-4 shadow-xs">
              <h2 className="text-lg font-extrabold text-slate-900">Informasi Sekretariat</h2>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Alamat Sentra Kawasan</p>
                    <p className="text-slate-600 mt-0.5">{pengaturan?.alamatSekretariat || "Jl. Gempeng Utama No. 1, Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">WhatsApp Pengelola</p>
                    <a href={`https://wa.me/${pengaturan?.nomorWhatsAppPengelola || "628113009000"}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-emerald-700 font-medium transition-colors">+{pengaturan?.nomorWhatsAppPengelola || "628113009000"}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Email Resmi</p>
                    <a href={`mailto:${pengaturan?.emailPengelola || "portal@kampungtempegempeng.com"}`} className="text-slate-600 hover:text-primary transition-colors">{pengaturan?.emailPengelola || "portal@kampungtempegempeng.com"}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Jam Layanan Sekretariat</p>
                    <p className="text-slate-600 mt-0.5">{pengaturan?.jamLayananPengelola || "Senin – Sabtu, 08.00 – 16.00 WIB"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 sm:p-7 shadow-xs bg-emerald-50/70 border-emerald-200">
              <h2 className="text-base font-bold text-emerald-900 mb-2">Ingin Memesan Tempe Langsung?</h2>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed mb-4">
                Pemesanan tempe (eceran maupun grosir) dapat dilakukan langsung dengan menghubungi nomor WhatsApp perajin di halaman direktori.
              </p>
              <a href="/umkm" className="btn-primary inline-flex gap-2 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs">Lihat Direktori Perajin Tempe</a>
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
