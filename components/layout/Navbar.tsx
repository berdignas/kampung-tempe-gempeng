"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ShieldCheck } from "lucide-react";
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8",
          scrolled ? "pt-2 sm:pt-3" : "pt-3.5 sm:pt-5"
        )}
      >
        <nav
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-2xl transition-all duration-300",
            scrolled
              ? "bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-900/5"
              : "bg-white/90 backdrop-blur-md border border-slate-200/70 shadow-xs"
          )}
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
            <span className="font-semibold text-sm leading-tight text-slate-900">
              {pengaturan?.namaKawasan ? (
                <>
                  <span className="block font-extrabold text-slate-900">{pengaturan.namaKawasan.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="text-xs font-medium text-slate-500">
                    {pengaturan.namaKawasan.split(" ").slice(2).join(" ") || "Gempeng"}
                  </span>
                </>
              ) : (
                <>
                  <span className="block font-extrabold text-slate-900">Kampung Tempe</span>
                  <span className="text-xs font-medium text-slate-500">Gempeng</span>
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
                    "px-3.5 py-2 text-sm rounded-xl transition-all duration-150 font-medium",
                    pathname === link.href
                      ? "text-emerald-700 font-bold bg-emerald-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="btn-primary text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <ShieldCheck size={16} />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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
          className="fixed inset-0 z-50 lg:hidden"
          id="mobile-menu"
          role="dialog"
          aria-label="Menu navigasi mobile"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col z-10">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-bold text-slate-900">Menu Navigasi</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
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
                        "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-colors",
                        pathname === link.href
                          ? "bg-emerald-50 text-emerald-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                      )}
                    >
                      {link.label}
                      <ChevronRight size={16} className="opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-slate-100">
              <Link
                href="/admin/login"
                className="btn-primary w-full justify-center text-sm font-bold flex items-center gap-2 py-3 rounded-xl"
              >
                <ShieldCheck size={16} />
                <span>Masuk Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
