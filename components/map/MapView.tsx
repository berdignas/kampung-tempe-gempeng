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
        const lat = Number(umkm.koordinat.lat);
        const lng = Number(umkm.koordinat.lng);
        if (isNaN(lat) || isNaN(lng)) return;

        const photoUrl = umkm.foto || (umkm.galeri && umkm.galeri[0]) || "";
        const initial = (umkm.namaUsaha || "T").charAt(0).toUpperCase();

        const photoHtml = photoUrl
          ? `<img src="${photoUrl}" alt="${umkm.namaUsaha}" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div style="display:none; width:100%; height:100%; background:#2fa84f; color:white; font-weight:800; font-size:16px; align-items:center; justify-content:center; border-radius:50%;">${initial}</div>`
          : `<div style="display:flex; width:100%; height:100%; background:#2fa84f; color:white; font-weight:800; font-size:16px; align-items:center; justify-content:center; border-radius:50%;">${initial}</div>`;

        const photoMarkerIcon = L.divIcon({
          html: `
            <div class="umkm-map-pin" style="
              position: relative;
              width: 50px;
              height: 58px;
              cursor: pointer;
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
              transition: transform 0.2s ease;
            ">
              <div style="
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #ffffff;
                border: 3px solid #2fa84f;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.18);
                position: absolute;
                top: 0;
                left: 1px;
                z-index: 2;
              ">
                ${photoHtml}
              </div>
              <div style="
                position: absolute;
                bottom: 2px;
                left: 19px;
                width: 12px;
                height: 12px;
                background: #2fa84f;
                transform: rotate(45deg);
                border-bottom-right-radius: 3px;
                z-index: 1;
              "></div>
            </div>
          `,
          iconSize: [50, 58],
          iconAnchor: [25, 56],
          popupAnchor: [0, -56],
          className: "",
        });

        const waUrl = buildWhatsAppUrl(umkm.nomorWhatsApp, buildWhatsAppMessageUMKM(umkm.namaUsaha));

        const marker = L.marker([lat, lng], {
          icon: photoMarkerIcon,
          title: umkm.namaUsaha,
          alt: `Lokasi ${umkm.namaUsaha}`,
          keyboard: true,
          riseOnHover: true,
        }).addTo(map);

        marker.bindPopup(`
          <div style="min-width:220px; max-width:260px; font-family: var(--font-poppins), 'Poppins', sans-serif; padding:2px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <div style="width:42px; height:42px; border-radius:10px; overflow:hidden; background:#f1f5f9; flex-shrink:0; border:1px solid #e2e8f0;">
                ${photoUrl ? `<img src="${photoUrl}" alt="${umkm.namaUsaha}" style="width:100%; height:100%; object-fit:cover;" />` : `<div style="width:100%; height:100%; background:#2fa84f; color:white; font-weight:bold; display:flex; align-items:center; justify-content:center;">${initial}</div>`}
              </div>
              <div>
                <h3 style="font-weight:800; font-size:13px; color:#0f172a; margin:0; line-height:1.2;">${umkm.namaUsaha}</h3>
                <p style="font-size:11px; color:#059669; font-weight:600; margin:2px 0 0;">${umkm.namaPemilik ? `Pemilik: ${umkm.namaPemilik}` : 'Perajin Tempe Gempeng'}</p>
              </div>
            </div>
            <p style="font-size:11px; color:#475569; margin:0 0 8px; line-height:1.4;">${umkm.alamat}</p>
            <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px;">
              ${umkm.jenisLayanan.map(l => `<span style="font-size:9px; font-weight:700; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; padding:2px 6px; border-radius:999px;">${l.replace(/-/g,' ')}</span>`).join('')}
            </div>
            <div style="display:flex; gap:6px;">
              <a href="/umkm/${umkm.slug}" 
                 style="flex:1; background:#2fa84f; color:white; text-decoration:none; border-radius:10px; padding:7px 10px; font-size:11px; font-weight:700; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                Lihat Profil
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                 style="flex:1; background:#25D366; color:white; text-decoration:none; border-radius:10px; padding:7px 10px; font-size:11px; font-weight:700; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                WhatsApp
              </a>
            </div>
          </div>
        `, {
          maxWidth: 280,
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
