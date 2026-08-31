"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { MapPin, MessageCircle, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { JenisLayanan, labelLayanan } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import { useCMS } from "@/lib/cms/CMSContext";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false, loading: () => (
  <div className="w-full h-full bg-surface-muted rounded-lg flex items-center justify-center">
    <p className="text-text-secondary text-sm">Memuat peta...</p>
  </div>
)});

const layananOptions: { value: JenisLayanan | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "eceran", label: "Eceran" },
  { value: "grosir", label: "Grosir" },
  { value: "pemasok-kuliner", label: "Pemasok Kuliner" },
  { value: "distributor", label: "Distributor" },
];

export default function PetaPage() {
  const { umkmList } = useCMS();
  const [filterLayanan, setFilterLayanan] = useState<JenisLayanan | "semua">("semua");
  const [selectedUMKM, setSelectedUMKM] = useState<string | null>(null);
  const [selectionCounter, setSelectionCounter] = useState(0);
  const [showList, setShowList] = useState(false);

  // Stable callback — never changes identity, won't cause MapView to re-init
  const handleSelectUMKM = useCallback((id: string) => {
    setSelectedUMKM(id);
    setSelectionCounter((c) => c + 1);
  }, []);

  // Combine id + counter so clicking the same item again still triggers flyTo
  const selectionKey = selectedUMKM ? `${selectedUMKM}__${selectionCounter}` : null;

  const filtered = umkmList
    .filter((u) => u.statusPublikasi)
    .filter((u) => filterLayanan === "semua" || u.jenisLayanan.includes(filterLayanan));

  return (
    <main className="h-screen flex flex-col bg-slate-50">
      {/* Header with inline navigation (navbar hidden on this page) */}
      <div className="py-2.5 sm:py-3 border-b border-slate-200 bg-white shadow-2xs" style={{ flexShrink: 0 }}>
        <div className="container-content">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-extrabold shadow-xs group-hover:bg-emerald-700 transition-colors">
                  T
                </div>
              </Link>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">Peta Interaktif Sentra Tempe</h1>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Navigasi titik lokasi rumah produksi tempe aktif di Kelurahan Gempeng</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 overflow-x-auto pb-0.5" role="group" aria-label="Filter peta">
                {layananOptions.map((opt) => (
                  <button key={opt.value}
                    onClick={() => setFilterLayanan(opt.value)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${filterLayanan === opt.value ? "text-white bg-emerald-600 border-emerald-600 shadow-xs" : "border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-700 bg-white"}`}
                    aria-pressed={filterLayanan === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-emerald-700 transition-colors ml-1"
              >
                ← Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Map + List Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar list (desktop) */}
        <aside className="hidden lg:flex flex-col w-84 border-r border-slate-200 overflow-y-auto bg-white" aria-label="Daftar UMKM">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {filtered.length} Lokasi Ditemukan
            </p>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Klik untuk ke Titik
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-xs font-semibold text-slate-700">Belum ada titik lokasi terdaftar</p>
              <p className="text-[11px] text-slate-400 mt-1">Tambahkan data UMKM dengan koordinat melalui panel admin.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100" role="list">
              {filtered.map((umkm) => {
                const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));
                const photoUrl = umkm.foto || (umkm.galeri && umkm.galeri[0]) || "";
                const initial = (umkm.namaUsaha || "T").charAt(0).toUpperCase();
                const isSelected = selectedUMKM === umkm.id;

                return (
                  <li
                    key={umkm.id}
                    className={`p-4 transition-all cursor-pointer border-l-4 ${
                      isSelected
                        ? "bg-emerald-50/70 border-emerald-600 shadow-2xs"
                        : "border-transparent hover:bg-slate-50 hover:border-slate-300"
                    }`}
                    onClick={() => handleSelectUMKM(umkm.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 shadow-2xs">
                        {photoUrl ? (
                          <img src={photoUrl} alt={umkm.namaUsaha} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                            {initial}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${isSelected ? "text-emerald-800" : "text-slate-900"}`}>
                          {umkm.namaUsaha}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{umkm.alamat}</p>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {umkm.jenisLayanan.map((l) => (
                            <span key={l} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {labelLayanan[l]}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-slate-100">
                          <Link
                            href={`/umkm/${umkm.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                          >
                            Lihat Profil <ArrowRight size={11} />
                          </Link>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            umkmList={filtered}
            selectedId={selectionKey}
            onSelectUMKM={handleSelectUMKM}
            height="100%"
          />

          {/* Mobile bottom sheet toggle */}
          <button
            className="lg:hidden absolute bottom-5 left-1/2 -translate-x-1/2 btn-primary shadow-lg gap-2 text-xs font-bold px-5 py-3 rounded-full cursor-pointer z-30"
            onClick={() => setShowList(true)}
            aria-label="Lihat daftar UMKM"
          >
            <MapPin size={16} />
            <span>Lihat {filtered.length} Lokasi</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {showList && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setShowList(false)} aria-hidden="true" />
          <div className="relative bg-white rounded-t-3xl max-h-[70vh] flex flex-col shadow-2xl z-10">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <p className="font-bold text-slate-900 text-sm">{filtered.length} Lokasi Perajin Tempe</p>
              <button
                onClick={() => setShowList(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="overflow-y-auto divide-y divide-slate-100">
              {filtered.map((umkm) => {
                const photoUrl = umkm.foto || (umkm.galeri && umkm.galeri[0]) || "";
                const initial = (umkm.namaUsaha || "T").charAt(0).toUpperCase();

                return (
                  <li
                    key={umkm.id}
                    className="p-4 flex items-center gap-3 hover:bg-slate-50 cursor-pointer"
                    onClick={() => {
                      handleSelectUMKM(umkm.id);
                      setShowList(false);
                    }}
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                      {photoUrl ? (
                        <img src={photoUrl} alt={umkm.namaUsaha} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                          {initial}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 truncate">{umkm.namaUsaha}</p>
                      <p className="text-xs text-slate-500 truncate">{umkm.alamat}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Buka Peta
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
