"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

const footerLinks = [
  {
    title: "Kawasan",
    links: [
      { href: "/profil", label: "Profil Kampung" },
      { href: "/peta", label: "Peta Produksi" },
      { href: "/berita", label: "Berita & Kegiatan" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Pelaku Usaha",
    links: [
      { href: "/umkm", label: "Direktori UMKM" },
      { href: "/peta", label: "Peta Produksi" },
    ],
  },
  {
    title: "Lainnya",
    links: [
      { href: "/kontak", label: "Kontak" },
      { href: "/privacy", label: "Kebijakan Privasi" },
    ],
  },
];

export default function Footer() {
  const { pengaturan } = useCMS();

  return (
    <footer
      className="border-t border-border mt-auto"
      style={{ backgroundColor: "var(--color-surface-muted)" }}
    >
      <div className="container-content py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                T
              </div>
              <div>
                <p className="font-semibold text-text-primary text-sm leading-tight">
                  {pengaturan?.namaKawasan || "Kampung Tempe Gempeng"}
                </p>
                <p className="text-xs text-text-secondary">Bangil, Pasuruan</p>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 max-w-xs">
              Portal informasi resmi kawasan sentra produksi tempe di Kelurahan Gempeng,
              Kecamatan Bangil, Kabupaten Pasuruan.
            </p>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{pengaturan?.alamatSekretariat || "Jl. Gempeng Utama No. 1, Kelurahan Gempeng, Bangil"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={15} className="flex-shrink-0 text-primary" />
                <a
                  href={`https://wa.me/${pengaturan?.nomorWhatsAppPengelola || "628113009000"}`}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +{pengaturan?.nomorWhatsAppPengelola || "628113009000"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${pengaturan?.emailPengelola || "portal@kampungtempegempeng.id"}`}
                  className="hover:text-primary transition-colors"
                >
                  {pengaturan?.emailPengelola || "portal@kampungtempegempeng.id"}
                </a>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-text-primary mb-3">{col.title}</h3>
              <ul className="space-y-2" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-secondary">
          <p>
            © {new Date().getFullYear()} Portal Resmi {pengaturan?.namaKawasan || "Kampung Tempe Gempeng"}. Semua hak
            dilindungi.
          </p>
          <p>
            Dikembangkan untuk mendukung UMKM lokal •{" "}
            <span className="font-medium text-text-primary">Bangil, Pasuruan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
