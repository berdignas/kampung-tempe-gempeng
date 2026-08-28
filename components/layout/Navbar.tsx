"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCMS } from "@/lib/cms/CMSContext";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Kampung" },
  { href: "/umkm", label: "Direktori UMKM" },
  { href: "/peta", label: "Peta Produksi" },
  { href: "/berita", label: "Berita & Kegiatan" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { pengaturan } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav
          className="container-content flex items-center justify-between h-16"
          aria-label="Navigasi utama"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Kampung Tempe Gempeng - Beranda"
          >
            {pengaturan?.logoUrl ? (
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-emerald-200 bg-white flex-shrink-0 shadow-xs">
                <Image
                  src={pengaturan.logoUrl}
                  alt="Logo Kawasan"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-xs"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              >
                T
              </div>
            )}
            <span
              className={cn(
                "font-semibold text-sm leading-tight transition-colors",
                scrolled ? "text-text-primary" : "text-text-primary"
              )}
            >
              {pengaturan?.namaKawasan ? (
                <>
                  <span className="block font-bold">{pengaturan.namaKawasan.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="text-xs font-normal text-text-secondary">
                    {pengaturan.namaKawasan.split(" ").slice(2).join(" ") || "Gempeng"}
                  </span>
                </>
              ) : (
                <>
                  Kampung Tempe
                  <br />
                  <span className="text-xs font-normal text-text-secondary">Gempeng</span>
                </>
              )}
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors duration-150",
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/umkm" className="btn-primary text-sm px-5 py-2.5">
              Jelajahi UMKM
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-surface-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          id="mobile-menu"
          role="dialog"
          aria-label="Menu navigasi mobile"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold text-text-primary">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-muted"
                aria-label="Tutup menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4" aria-label="Navigasi mobile">
              <ul className="space-y-1" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors",
                        pathname === link.href
                          ? "bg-primary-soft text-primary font-semibold"
                          : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                      )}
                    >
                      {link.label}
                      <ChevronRight size={16} className="opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-border">
              <Link href="/umkm" className="btn-primary w-full justify-center">
                Jelajahi UMKM
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
