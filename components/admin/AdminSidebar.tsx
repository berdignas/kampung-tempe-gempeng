"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  Newspaper,
  BookOpen,
  Settings,
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useCMS } from "@/lib/cms/CMSContext";

export default function AdminSidebar({
  onCloseMobile,
}: {
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const { resetData } = useCMS();

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/umkm", label: "Kelola UMKM", icon: Store },
    { href: "/admin/produk", label: "Kelola Produk", icon: Package },
    { href: "/admin/berita", label: "Berita & Kegiatan", icon: Newspaper },
    { href: "/admin/profil", label: "Profil Kampung", icon: BookOpen },
    { href: "/admin/pengaturan", label: "Pengaturan Beranda", icon: Settings },
  ];

  const handleReset = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin mengembalikan seluruh data ke data awal? Semua perubahan lokal akan dihapus."
      )
    ) {
      resetData();
      alert("Data berhasil dikembalikan ke posisi semula.");
    }
  };

  return (
    <aside className="w-64 bg-white text-slate-800 h-screen sticky top-0 flex flex-col justify-between p-4 border-r border-slate-200/80 shadow-xs overflow-y-auto z-40">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
            K
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight text-slate-900">
              CMS Kampung Tempe
            </h1>
            <p className="text-[11px] font-medium text-emerald-600">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-semibold"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-600"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 transition-all"
        >
          <RefreshCw size={14} />
          Reset Data Default
        </button>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200/50 transition-all"
        >
          <ArrowLeft size={14} />
          Lihat Website Publik
        </Link>

        <div className="flex items-center gap-1.5 px-2 pt-1 text-[11px] text-slate-400 justify-center">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Fairness Standard Active</span>
        </div>
      </div>
    </aside>
  );
}
