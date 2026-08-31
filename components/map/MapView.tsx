"use client";

import { useEffect, useRef, useCallback } from "react";
import { UMKM } from "@/lib/data/umkm";
import { buildWhatsAppUrl, buildWhatsAppMessageUMKM } from "@/lib/whatsapp";

interface MapViewProps {
  umkmList: UMKM[];
  selectedId?: string | null;
  onSelectUMKM?: (id: string) => void;
  height?: string;
}

export default function MapView({
  umkmList,
  selectedId,
  onSelectUMKM,
  height = "500px",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersMapRef = useRef<Map<string, any>>(new Map());
  // Stable ref for the callback so we don't recreate the map when it changes
  const onSelectRef = useRef(onSelectUMKM);
  onSelectRef.current = onSelectUMKM;

  // Initialize map ONCE (only when umkmList reference changes)
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    // Cleanup previous instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markersMapRef.current.clear();
    }

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Fix default icon paths for Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const center = umkmList[0]?.koordinat
        ? [umkmList[0].koordinat.lat, umkmList[0].koordinat.lng]
        : [-7.596, 112.784];

      const map = L.map(mapRef.current!, {
        center: center as [number, number],
        zoom: 15,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
                border: 3.5px solid #2fa84f;
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

        // Use ref so this never causes map recreation
        marker.on("click", () => {
          onSelectRef.current?.(umkm.id);
        });

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

        markersMapRef.current.set(umkm.id, marker);
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersMapRef.current.clear();
      }
    };
    // Only recreate map when umkmList actually changes (filter toggle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umkmList]);

  // FlyTo + open popup when sidebar item is clicked
  useEffect(() => {
    if (!selectedId || !mapInstanceRef.current) return;

    // selectedId format is "umkmId__counter" — extract the actual ID
    const actualId = selectedId.split("__")[0];
    const marker = markersMapRef.current.get(actualId);
    if (!marker) return;

    const map = mapInstanceRef.current;
    const latLng = marker.getLatLng();

    // Close any existing popup first
    map.closePopup();

    // Smooth animated fly to the marker
    map.flyTo(latLng, 17, {
      animate: true,
      duration: 1.0,
    });

    // Open the popup after the camera arrives
    const onMoveEnd = () => {
      marker.openPopup();
      map.off("moveend", onMoveEnd);
    };
    map.on("moveend", onMoveEnd);

    // Safety: also open after timeout in case moveend doesn't fire (already at location)
    const timer = setTimeout(() => {
      marker.openPopup();
      map.off("moveend", onMoveEnd);
    }, 1200);

    return () => {
      clearTimeout(timer);
      map.off("moveend", onMoveEnd);
    };
  }, [selectedId]);

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
