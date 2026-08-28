"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Navigation, ExternalLink, Check, Compass } from "lucide-react";

interface LocationPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
  alamat?: string;
}

export default function LocationPicker({
  lat,
  lng,
  onChange,
  alamat,
}: LocationPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const currentLat = Number(lat) || -7.5953;
  const currentLng = Number(lng) || 112.7844;

  // Initialize interactive Leaflet Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Fix icon issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Create Custom Pin Icon
      const customPinIcon = L.divIcon({
        html: `<div style="
          width: 38px; height: 38px;
          background: #059669; border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg); border: 3px solid white;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
        ">
          <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -40],
        className: "",
      });

      const map = L.map(mapContainerRef.current, {
        center: [currentLat, currentLng],
        zoom: 16,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add draggable Marker
      const marker = L.marker([currentLat, currentLng], {
        icon: customPinIcon,
        draggable: true,
        riseOnHover: true,
      }).addTo(map);

      marker.bindPopup("<b>Titik Lokasi UMKM</b><br>Geser pin atau klik pada peta untuk memindahkan lokasi.").openPopup();

      // On Marker Drag End
      marker.on("dragend", (e: any) => {
        const position = e.target.getLatLng();
        onChange(Number(position.lat.toFixed(6)), Number(position.lng.toFixed(6)));
      });

      // On Map Click
      map.on("click", (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        map.panTo([clickLat, clickLng]);
        onChange(Number(clickLat.toFixed(6)), Number(clickLng.toFixed(6)));
      });

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
  }, []);

  // Sync marker when lat/lng changes externally
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      const pos = markerRef.current.getLatLng();
      if (pos.lat !== currentLat || pos.lng !== currentLng) {
        markerRef.current.setLatLng([currentLat, currentLng]);
        mapInstanceRef.current.panTo([currentLat, currentLng]);
      }
    }
  }, [currentLat, currentLng]);

  // Smart Parser for Google Maps URL or Address Search
  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchFeedback(null);

    const query = searchQuery.trim();

    // 1. Check if user pasted Google Maps URL with @lat,lng coordinates
    // e.g. https://www.google.com/maps/place/.../@-7.5953,112.7844,17z...
    const atMatch = query.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      const parsedLat = parseFloat(atMatch[1]);
      const parsedLng = parseFloat(atMatch[2]);
      updateLocation(parsedLat, parsedLng, "Koordinat berhasil diekstrak dari link Google Maps!");
      setIsSearching(false);
      return;
    }

    // 2. Check for query parameter q=lat,lng or ll=lat,lng
    // e.g. https://maps.google.com/?q=-7.5953,112.7844
    const qMatch = query.match(/[?&](?:q|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      const parsedLat = parseFloat(qMatch[1]);
      const parsedLng = parseFloat(qMatch[2]);
      updateLocation(parsedLat, parsedLng, "Koordinat berhasil diekstrak dari link Google Maps!");
      setIsSearching(false);
      return;
    }

    // 3. Check for direct "lat, lng" text input
    // e.g. -7.5953, 112.7844
    const directCoordMatch = query.match(/^(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)$/);
    if (directCoordMatch) {
      const parsedLat = parseFloat(directCoordMatch[1]);
      const parsedLng = parseFloat(directCoordMatch[2]);
      updateLocation(parsedLat, parsedLng, "Titik koordinat berhasil diterapkan!");
      setIsSearching(false);
      return;
    }

    // 4. Search place using OpenStreetMap Geocoding API (Nominatim)
    try {
      const searchTarget = query.toLowerCase().includes("bangil") || query.toLowerCase().includes("pasuruan")
        ? query
        : `${query}, Bangil, Pasuruan, Jawa Timur`;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTarget)}&limit=1`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const foundLat = parseFloat(data[0].lat);
        const foundLng = parseFloat(data[0].lon);
        updateLocation(foundLat, foundLng, `Lokasi ditemukan: ${data[0].display_name.slice(0, 60)}...`);
      } else {
        setSearchFeedback("Lokasi tidak ditemukan. Coba klik langsung pada peta atau tempel link Google Maps.");
      }
    } catch (err) {
      setSearchFeedback("Gagal mencari lokasi. Silakan klik langsung pada peta.");
    } finally {
      setIsSearching(false);
    }
  };

  const updateLocation = (newLat: number, newLng: number, feedbackMsg: string) => {
    onChange(Number(newLat.toFixed(6)), Number(newLng.toFixed(6)));
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([newLat, newLng]);
      mapInstanceRef.current.setView([newLat, newLng], 17);
    }
    setSearchFeedback(feedbackMsg);
    setSearchQuery("");
  };

  // Get Current Device GPS Location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung deteksi lokasi otomatis.");
      return;
    }

    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsLat = pos.coords.latitude;
        const gpsLng = pos.coords.longitude;
        updateLocation(gpsLat, gpsLng, "Berhasil mengambil lokasi GPS perangkat saat ini!");
        setIsSearching(false);
      },
      (err) => {
        alert("Gagal mengakses GPS: " + err.message);
        setIsSearching(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    alamat || "Kelurahan Gempeng, Bangil, Pasuruan"
  )}`;

  return (
    <div className="space-y-3">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        // @ts-ignore
        crossOrigin="anonymous"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <MapPin size={15} className="text-emerald-600" />
            Tentukan Titik Lokasi Rumah Produksi (Peta Interaktif)
          </label>
          <p className="text-[11px] text-slate-500">
            Klik di mana saja pada peta atau geser pin hijau untuk menentukan lokasi secara presisi.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition"
            title="Gunakan lokasi GPS saat ini"
          >
            <Navigation size={13} />
            Lokasi Saya (GPS)
          </button>

          <a
            href={gmapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
            title="Buka Google Maps di tab baru"
          >
            <ExternalLink size={13} />
            Buka Google Maps ↗
          </a>
        </div>
      </div>

      {/* Smart Search Bar & Google Maps Link Paste */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSmartSearch();
              }
            }}
            placeholder="Cari jalan/tempat, atau tempel (paste) link Google Maps..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSmartSearch}
          disabled={isSearching || !searchQuery.trim()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-lg transition"
        >
          {isSearching ? "Mencari..." : "Terapkan"}
        </button>
      </div>

      {/* Feedback Message */}
      {searchFeedback && (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
          <Check size={14} className="text-emerald-600 flex-shrink-0" />
          <span>{searchFeedback}</span>
        </div>
      )}

      {/* Interactive Map Box */}
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
        <div
          ref={mapContainerRef}
          style={{ height: "280px", width: "100%" }}
          className="z-0"
        />

        {/* Map Overlay Badge */}
        <div className="absolute bottom-2 left-2 z-[400] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[10px] text-slate-600 flex items-center gap-1.5">
          <Compass size={12} className="text-emerald-600" />
          <span>Titik: <strong>{currentLat}</strong>, <strong>{currentLng}</strong> (Klik peta untuk ubah)</span>
        </div>
      </div>
    </div>
  );
}
