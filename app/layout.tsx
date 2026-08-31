import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kampungtempegempeng.com"),
  title: {
    template: "%s | Kampung Tempe Gempeng",
    default: "Kampung Tempe Gempeng — Sentra Produksi Tempe Bangil",
  },
  description:
    "Portal resmi Kampung Tempe Gempeng, Kelurahan Gempeng, Kecamatan Bangil, Kabupaten Pasuruan. Direktori UMKM, katalog produk tempe, peta produksi, dan berita kawasan.",
  keywords: [
    "kampung tempe gempeng",
    "tempe bangil",
    "tempe pasuruan",
    "umkm tempe",
    "sentra produksi tempe",
    "tempe gempeng",
  ],
  openGraph: {
    siteName: "Kampung Tempe Gempeng",
    locale: "id_ID",
    type: "website",
    url: "https://kampungtempegempeng.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
