"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, ExternalLink, Layers, Compass } from "lucide-react";

interface SingleUMKMMapProps {
  lat: number;
  lng: number;
  namaUsaha: string;
  alamat: string;
  height?: string;
}

export default function SingleUMKMMap({
  lat,
  lng,
  namaUsaha,
  alamat,
  height = "300px",
}: SingleUMKMMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [mapType, setMapType] = useState<"streets" | "satellite">("streets");

  const validLat = Number(lat) || -7.5953;
  const validLng = Number(lng) || 112.7844;

  const updateMapLayer = (mapInstance: any, type: "streets" | "satellite", L: any) => {
    if (!mapInstance) return;
    mapInstance.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        mapInstance.removeLayer(layer);
      }
    });

    if (type === "satellite") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "© Esri World Imagery",
          maxZoom: 19,
        }
      ).addTo(mapInstance);
    } else {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstance);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;
    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current, {
        center: [validLat, validLng],
        zoom: 17,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      updateMapLayer(map, mapType, L);

      const customIcon = L.divIcon({
        html: `<div style="
          width: 38px; height: 38px;
          background: #2fa84f; border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg); border: 3px solid white;
          box-shadow: 0 6px 16px rgba(47, 168, 79, 0.45);
          display: flex; align-items: center; justify-content: center;
        ">
          <div style="width: 12px; height: 12px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -40],
        className: "",
      });

      const marker = L.marker([validLat, validLng], {
        icon: customIcon,
        riseOnHover: true,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; min-width: 180px; padding: 2px;">
          <h4 style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #142016;">${namaUsaha}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #667066; line-height: 1.4;">${alamat}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${validLat},${validLng}" target="_blank" rel="noopener noreferrer" style="display: inline-block; font-size: 11px; color: #2fa84f; font-weight: 600; text-decoration: none;">
            Petunjuk Arah ↗
          </a>
        </div>
      `);

      mapInstanceRef.current = map;
      markerRef.current = marker;
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [validLat, validLng, namaUsaha, alamat]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then((L) => {
      if (mapInstanceRef.current) updateMapLayer(mapInstanceRef.current, mapType, L);
    });
  }, [mapType]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${validLat},${validLng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${validLat},${validLng}`;

  return (
    <div className="space-y-3">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        // @ts-ignore
        crossOrigin="anonymous"
      />

      <div className="rounded-2xl overflow-hidden border border-border shadow-card relative bg-surface-muted">
        {/* Map Container */}
        <div ref={mapContainerRef} style={{ height, width: "100%" }} className="z-0" />

        {/* Map Type Switcher */}
        <div className="absolute top-3 left-3 z-[400] flex bg-white/90 backdrop-blur-md rounded-lg p-0.5 border border-border shadow-sm">
          <button
            type="button"
            onClick={() => setMapType("streets")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${
              mapType === "streets"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Peta Jalan
          </button>
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition flex items-center gap-1 ${
              mapType === "satellite"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Layers size={11} />
            Satelit
          </button>
        </div>

        {/* Coordinate badge */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border shadow-xs text-[10px] text-text-secondary flex items-center gap-1.5">
          <Compass size={12} className="text-primary" />
          <span>{validLat.toFixed(5)}, {validLng.toFixed(5)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-2 px-3 text-xs justify-center gap-1.5 shadow-sm"
        >
          <Navigation size={14} />
          Petunjuk Arah ke Rumah Produksi
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary py-2 px-3 text-xs justify-center gap-1.5"
        >
          <ExternalLink size={14} />
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
