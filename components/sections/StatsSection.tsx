interface Stat {
  value: string;
  label: string;
  note?: string;
}

const stats: Stat[] = [
  { value: "20+", label: "Pelaku UMKM", note: "Terdaftar di kawasan" },
  { value: "20+", label: "Rumah Produksi", note: "Aktif berproduksi" },
  { value: "30+ Tahun", label: "Kawasan Berkembang", note: "Warisan turun-temurun" },
  { value: "Bangil & Sekitar", label: "Jangkauan Distribusi", note: "Pasar lokal & regional" },
];

export default function StatsSection() {
  return (
    <section
      className="section-spacing"
      aria-labelledby="stats-heading"
      style={{ backgroundColor: "var(--color-surface-muted)" }}
    >
      <div className="container-content">
        <p id="stats-heading" className="section-label text-center mb-10">
          Kampung Tempe Gempeng dalam Angka
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
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
          * Data akan diperbarui sesuai pendataan resmi pengelola kawasan
        </p>
      </div>
    </section>
  );
}
