"use client";

import { useEffect, useRef } from "react";
import { UMKM } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";
import Link from "next/link";

interface MapViewProps {
  umkmList: UMKM[];
  height?: string;
}

export default function MapView({ umkmList, height = "500px" }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths for Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Custom green marker
      const greenIcon = L.divIcon({
        html: `<div style="
          width: 36px; height: 36px;
          background: #2FA84F; border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg); border: 3px solid white;
          box-shadow: 0 4px 12px rgba(20,32,22,0.25);
        "></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -40],
        className: "",
      });

      const center = umkmList[0]?.koordinat
        ? [umkmList[0].koordinat.lat, umkmList[0].koordinat.lng]
        : [-7.596, 112.784];

      const map = L.map(mapRef.current!, {
        center: center as [number, number],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      umkmList.forEach((umkm) => {
        if (!umkm.koordinat) return;
        const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));

        const marker = L.marker([umkm.koordinat.lat, umkm.koordinat.lng], {
          icon: greenIcon,
          title: umkm.namaUsaha,
          alt: `Lokasi ${umkm.namaUsaha}`,
          keyboard: true,
          riseOnHover: true,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:200px; font-family: Inter, sans-serif;">
            <p style="font-weight:600; font-size:14px; color:#142016; margin:0 0 4px;">${umkm.namaUsaha}</p>
            <p style="font-size:12px; color:#667066; margin:0 0 8px;">${umkm.alamat}</p>
            <p style="font-size:12px; color:#667066; margin:0 0 10px;">
              <strong>Layanan:</strong> ${umkm.jenisLayanan.map(l => l.replace(/-/g,' ')).join(', ')}
            </p>
            <div style="display:flex; gap:8px;">
              <a href="/umkm/${umkm.slug}" 
                 style="flex:1; background:#2FA84F; color:white; text-decoration:none; border-radius:999px; padding:6px 12px; font-size:12px; font-weight:600; text-align:center;">
                Lihat Profil
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener"
                 style="flex:1; background:#25D366; color:white; text-decoration:none; border-radius:999px; padding:6px 12px; font-size:12px; font-weight:600; text-align:center;">
                WhatsApp
              </a>
            </div>
          </div>
        `, {
          maxWidth: 260,
          className: "kampung-tempe-popup",
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [umkmList]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        // @ts-ignore
        crossOrigin="anonymous"
      />
      <div
        ref={mapRef}
        style={{ height, width: "100%" }}
        className="rounded-lg overflow-hidden"
        aria-label="Peta lokasi rumah produksi UMKM Kampung Tempe Gempeng"
        role="application"
      />
    </>
  );
}
