"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
  const [showList, setShowList] = useState(false);

  const filtered = umkmList
    .filter((u) => u.statusPublikasi)
    .filter((u) => filterLayanan === "semua" || u.jenisLayanan.includes(filterLayanan));

  return (
    <main className="pt-16 h-screen flex flex-col">
      {/* Header */}
      <div className="py-4 border-b border-border bg-white" style={{ flexShrink: 0 }}>
        <div className="container-content">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Peta Produksi</h1>
              <p className="text-xs text-text-secondary">Lokasi rumah produksi UMKM di Kampung Tempe Gempeng</p>
            </div>
            <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Filter peta">
              {layananOptions.map((opt) => (
                <button key={opt.value}
                  onClick={() => setFilterLayanan(opt.value)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filterLayanan === opt.value ? "text-white" : "border-border text-text-secondary"}`}
                  style={filterLayanan === opt.value ? { backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" } : {}}
                  aria-pressed={filterLayanan === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map + List Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar list (desktop) */}
        <aside className="hidden lg:flex flex-col w-80 border-r border-border overflow-y-auto bg-white" aria-label="Daftar UMKM">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium text-text-primary">{filtered.length} lokasi ditemukan</p>
          </div>
          <ul className="divide-y divide-border" role="list">
            {filtered.map((umkm) => {
              const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));
              return (
                <li key={umkm.id} className={`p-4 hover:bg-surface-muted transition-colors cursor-pointer ${selectedUMKM === umkm.id ? "bg-primary-soft" : ""}`} onClick={() => setSelectedUMKM(umkm.id)}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold" style={{ backgroundColor: "var(--color-primary)" }}>
                      <MapPin size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-primary truncate">{umkm.namaUsaha}</p>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">{umkm.alamat}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {umkm.jenisLayanan.map((l) => <span key={l} className="badge-layanan text-xs">{labelLayanan[l]}</span>)}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link href={`/umkm/${umkm.slug}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">Profil <ArrowRight size={11} /></Link>
                        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold flex items-center gap-1" style={{ color: "#25D366" }}>
                          <MessageCircle size={11} /> WA
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView umkmList={filtered} height="100%" />

          {/* Mobile bottom sheet toggle */}
          <button
            className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 btn-primary shadow-card-hover gap-2"
            onClick={() => setShowList(true)}
            aria-label="Lihat daftar UMKM"
          >
            <MapPin size={16} />
            {filtered.length} Lokasi
          </button>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {showList && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowList(false)} aria-hidden="true" />
          <div className="relative bg-white rounded-t-2xl max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <p className="font-semibold text-text-primary">{filtered.length} Lokasi UMKM</p>
              <button onClick={() => setShowList(false)} className="w-8 h-8 flex items-center justify-center" aria-label="Tutup">
                <X size={18} />
              </button>
            </div>
            <ul className="overflow-y-auto divide-y divide-border">
              {filtered.map((umkm) => {
                const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));
                return (
                  <li key={umkm.id} className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
                      <MapPin size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text-primary truncate">{umkm.namaUsaha}</p>
                      <p className="text-xs text-text-secondary truncate">{umkm.alamat}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/umkm/${umkm.slug}`} className="btn-secondary text-xs py-1.5 px-3" onClick={() => setShowList(false)}>Profil</Link>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-xs py-1.5 px-3"><MessageCircle size={13} /></a>
                    </div>
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
