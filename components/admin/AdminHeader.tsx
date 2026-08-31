"use client";

import { Menu, User, ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/lib/auth/AdminAuthContext";

export default function AdminHeader({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  const { user, logout } = useAdminAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Buka menu navigasi"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-slate-800">
            Panel Pengelola Portal
          </h2>
          <p className="text-xs text-slate-500">
            Kampung Tempe Gempeng, Bangil
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition"
        >
          <span>Buka Website</span>
          <ExternalLink size={14} />
        </Link>

        <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
          <User size={15} className="text-slate-600" />
          <span className="text-xs font-medium text-slate-700 max-w-[160px] truncate">
            {user?.email || "Admin"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          title="Keluar (Logout)"
          aria-label="Keluar"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
