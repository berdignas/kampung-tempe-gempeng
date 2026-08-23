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
        <p id="stats-heading" className="section-label text-center mb-10">
          {pengaturan?.statsHeading || "Kampung Tempe Gempeng dalam Angka"}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center border border-border shadow-sm"
            >
              <p
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "var(--color-primary)" }}
              >
                {stat.value}
              </p>
              <p className="font-semibold text-sm text-text-primary">{stat.label}</p>
              {stat.note && (
                <p className="text-xs text-text-secondary mt-1">{stat.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-text-secondary mt-6">
          * Data dapat diperbarui secara dinamis melalui Panel CMS Pengelola
        </p>
      </div>
    </section>
  );
}
