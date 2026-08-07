"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  Newspaper,
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
    { href: "/admin/pengaturan", label: "Pengaturan Kawasan", icon: Settings },
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
    <aside className="w-64 bg-slate-900 text-slate-100 h-screen sticky top-0 flex flex-col justify-between p-4 border-r border-slate-800 shadow-xl overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-md shadow-primary/30">
            K
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-tight text-white">
              CMS Kampung Tempe
            </h1>
            <p className="text-[11px] text-slate-400">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-400 hover:bg-amber-950/40 border border-amber-500/20 transition"
        >
          <RefreshCw size={14} />
          Reset Data Default
        </button>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
        >
          <ArrowLeft size={14} />
          Lihat Website Publik
        </Link>

        <div className="flex items-center gap-2 px-2 text-[11px] text-slate-500 justify-center">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>Fairness Standard Active</span>
        </div>
      </div>
    </aside>
  );
}
