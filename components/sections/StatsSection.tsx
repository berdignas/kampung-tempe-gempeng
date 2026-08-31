"use client";

import { useCMS } from "@/lib/cms/CMSContext";

export default function StatsSection() {
  const { pengaturan } = useCMS();

  const stats = [
    {
      value: pengaturan?.statsItem1Value || "20+",
      label: pengaturan?.statsItem1Label || "Pelaku UMKM",
      note: pengaturan?.statsItem1Note || "Terdaftar di kawasan",
    },
    {
      value: pengaturan?.statsItem2Value || "20+",
      label: pengaturan?.statsItem2Label || "Rumah Produksi",
      note: pengaturan?.statsItem2Note || "Aktif berproduksi",
    },
    {
      value: pengaturan?.statsItem3Value || "30+ Tahun",
      label: pengaturan?.statsItem3Label || "Kawasan Berkembang",
      note: pengaturan?.statsItem3Note || "Warisan turun-temurun",
    },
    {
      value: pengaturan?.statsItem4Value || "Bangil & Sekitar",
      label: pengaturan?.statsItem4Label || "Jangkauan Distribusi",
      note: pengaturan?.statsItem4Note || "Pasar lokal & regional",
    },
  ];

  return (
    <section
      className="section-spacing"
      aria-labelledby="stats-heading"
      style={{ backgroundColor: "var(--color-surface-muted)" }}
    >
      <div className="container-content">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="animate-badge section-label">Potensi & Kapasitas</p>
          <h2 id="stats-heading" className="animate-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {pengaturan?.statsHeading || "Kapasitas & Kekuatan Sentra Tempe Gempeng"}
          </h2>
          <div className="flex justify-center pt-1">
            <span className="animate-accent-bar"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <p
                className="text-3xl sm:text-4xl font-extrabold mb-1.5 transition-transform group-hover:scale-105"
                style={{ color: "var(--color-primary)" }}
              >
                {stat.value}
              </p>
              <p className="font-bold text-sm text-slate-800">{stat.label}</p>
              {stat.note && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
