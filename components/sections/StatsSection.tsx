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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">
          {stats.map((stat, i) => {
            const isLong = stat.value.length > 5;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 text-center border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-center items-center"
              >
                {/* Fixed height value container for 100% horizontal alignment */}
                <div className="min-h-[52px] sm:min-h-[64px] flex items-center justify-center w-full px-1">
                  <p
                    className={`font-extrabold tracking-tight transition-transform group-hover:scale-105 ${
                      isLong
                        ? "text-xl sm:text-2xl md:text-2xl leading-tight"
                        : "text-3xl sm:text-4xl"
                    }`}
                    style={{ color: "var(--color-primary)" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100/80 w-full flex-1 flex flex-col justify-center">
                  <p className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">{stat.label}</p>
                  {stat.note && (
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-normal">{stat.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
