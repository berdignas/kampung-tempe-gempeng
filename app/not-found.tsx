import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-8xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>404</p>
        <h1 className="text-2xl font-semibold text-text-primary mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-text-secondary mb-8 max-w-sm mx-auto">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Kembali ke Beranda</Link>
          <Link href="/umkm" className="btn-secondary">Direktori UMKM</Link>
        </div>
      </div>
    </main>
  );
}
