"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
  Check,
  Compass,
  Layers,
  Maximize2,
  X,
  Loader2,
  Sparkles,
  Building2,
  MapPinCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAlertModal } from "@/components/ui/AlertModal";

interface LocationPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
  alamat?: string;
  onAddressSelect?: (newAlamat: string) => void;
}

interface SearchSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  address?: {
    road?: string;
    suburb?: string;
    village?: string;
    city?: string;
    county?: string;
    state?: string;
  };
}

const BANGIL_LANDMARKS = [
  { name: "Sentra Tempe Gempeng", lat: -7.5953, lng: 112.7844, desc: "Pusat UMKM Gempeng" },
  { name: "Balai Kelurahan Gempeng", lat: -7.5941, lng: 112.7835, desc: "Kantor Kelurahan" },
  { name: "Pasar Bangil", lat: -7.5982, lng: 112.7788, desc: "Pasar Tradisional" },
  { name: "Stasiun Bangil", lat: -7.6015, lng: 112.7725, desc: "Stasiun Kereta Api" },
  { name: "Alun-Alun Bangil", lat: -7.5997, lng: 112.776, desc: "Pusat Kota Bangil" },
];

export default function LocationPicker({
  lat,
  lng,
  onChange,
  alamat,
  onAddressSelect,
}: LocationPickerProps) {
  const { showAlert } = useAlertModal();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const modalMapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const modalMapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const modalMarkerRef = useRef<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapType, setMapType] = useState<"streets" | "satellite">("streets");
  const [resolvedAddress, setResolvedAddress] = useState<string>("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);

  const currentLat = Number(lat) || -7.5953;
  const currentLng = Number(lng) || 112.7844;

  // Reverse Geocode coordinates to readable Indonesian address
  const fetchAddressFromCoords = useCallback(async (latitude: number, longitude: number) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        { headers: { "Accept-Language": "id" } }
      );
      if (!res.ok) throw new Error("Gagal mengambil alamat");
      const data = await res.json();
      if (data && data.display_name) {
        const addr = data.address || {};
        const road = addr.road || addr.pedestrian || addr.path || "";
        const village = addr.village || addr.suburb || addr.neighbourhood || "Gempeng";
        const district = addr.city_district || addr.county || addr.city || "Bangil";
        const state = addr.state || "Jawa Timur";

        let formatted = data.display_name;
        if (road) {
          formatted = `${road}, ${village}, ${district}, ${state}`;
        }
        setResolvedAddress(formatted);
      }
    } catch {
      // Fallback
      setResolvedAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  // Initial geocode when component mounts
  useEffect(() => {
    fetchAddressFromCoords(currentLat, currentLng);
  }, []);

  // Create custom pin icon
  const createPinIcon = (L: any) => {
    return L.divIcon({
      html: `<div class="custom-pin-wrapper" style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
      ">
        <div style="
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #10b981 0%, #047857 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid #ffffff;
          box-shadow: 0 8px 20px rgba(4, 120, 87, 0.45);
          display: flex; align-items: center; justify-content: center;
        ">
          <div style="
            width: 14px; height: 14px;
            background: #ffffff;
            border-radius: 50%;
            transform: rotate(45deg);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
          "></div>
        </div>
        <div style="
          width: 14px; height: 6px;
          background: rgba(0,0,0,0.25);
          border-radius: 50%;
          margin-top: 2px;
          filter: blur(1px);
        "></div>
      </div>`,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -42],
      className: "",
    });
  };

  // Switch Layer helper
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

  // Initialize Inline Map
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
        center: [currentLat, currentLng],
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      L.control.zoom({ position: "topright" }).addTo(map);

      updateMapLayer(map, mapType, L);

      const pinIcon = createPinIcon(L);
      const marker = L.marker([currentLat, currentLng], {
        icon: pinIcon,
        draggable: true,
        riseOnHover: true,
      }).addTo(map);

      marker.on("dragend", (e: any) => {
        const pos = e.target.getLatLng();
        handleApplyCoordinates(pos.lat, pos.lng, "Titik lokasi dipindahkan!");
      });

      map.on("click", (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        map.panTo([clickLat, clickLng]);
        handleApplyCoordinates(clickLat, clickLng, "Titik lokasi diperbarui!");
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

  // Initialize Fullscreen Modal Map when modal opens
  useEffect(() => {
    if (!isModalOpen || typeof window === "undefined") return;

    let isMounted = true;
    const timer = setTimeout(() => {
      if (!modalMapContainerRef.current) return;

      import("leaflet").then((L) => {
        if (!isMounted || !modalMapContainerRef.current) return;

        if (modalMapInstanceRef.current) {
          modalMapInstanceRef.current.remove();
          modalMapInstanceRef.current = null;
        }

        const map = L.map(modalMapContainerRef.current, {
          center: [currentLat, currentLng],
          zoom: 17,
          zoomControl: false,
          scrollWheelZoom: true,
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        updateMapLayer(map, mapType, L);

        const pinIcon = createPinIcon(L);
        const marker = L.marker([currentLat, currentLng], {
          icon: pinIcon,
          draggable: true,
          riseOnHover: true,
        }).addTo(map);

        marker.on("dragend", (e: any) => {
          const pos = e.target.getLatLng();
          handleApplyCoordinates(pos.lat, pos.lng, "Lokasi baru dipilih!");
        });

        map.on("click", (e: any) => {
          const { lat: clickLat, lng: clickLng } = e.latlng;
          marker.setLatLng([clickLat, clickLng]);
          map.panTo([clickLat, clickLng]);
          handleApplyCoordinates(clickLat, clickLng, "Lokasi baru dipilih!");
        });

        modalMapInstanceRef.current = map;
        modalMarkerRef.current = marker;
      });
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (modalMapInstanceRef.current) {
        modalMapInstanceRef.current.remove();
        modalMapInstanceRef.current = null;
      }
    };
  }, [isModalOpen]);

  // Update map layer on type switch
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then((L) => {
      if (mapInstanceRef.current) updateMapLayer(mapInstanceRef.current, mapType, L);
      if (modalMapInstanceRef.current) updateMapLayer(modalMapInstanceRef.current, mapType, L);
    });
  }, [mapType]);

  // Sync markers when coordinates change externally
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([currentLat, currentLng]);
      mapInstanceRef.current.panTo([currentLat, currentLng]);
    }
    if (modalMarkerRef.current && modalMapInstanceRef.current) {
      modalMarkerRef.current.setLatLng([currentLat, currentLng]);
      modalMapInstanceRef.current.panTo([currentLat, currentLng]);
    }
  }, [currentLat, currentLng]);

  // Handle Coordinates Apply
  const handleApplyCoordinates = (
    newLat: number,
    newLng: number,
    feedbackMsg?: string,
    zoomLevel: number = 17
  ) => {
    const formattedLat = Number(newLat.toFixed(6));
    const formattedLng = Number(newLng.toFixed(6));

    onChange(formattedLat, formattedLng);
    fetchAddressFromCoords(formattedLat, formattedLng);

    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([formattedLat, formattedLng]);
      mapInstanceRef.current.setView([formattedLat, formattedLng], zoomLevel);
    }
    if (modalMapInstanceRef.current && modalMarkerRef.current) {
      modalMarkerRef.current.setLatLng([formattedLat, formattedLng]);
      modalMapInstanceRef.current.setView([formattedLat, formattedLng], zoomLevel);
    }

    if (feedbackMsg) {
      setSearchFeedback(feedbackMsg);
      setTimeout(() => setSearchFeedback(null), 4000);
    }
  };

  // Live Place Search with Autocomplete suggestions (OpenStreetMap Nominatim)
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!text.trim() || text.trim().length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const query = text.trim();

        // 1. Direct Lat,Lng detection
        const directCoordMatch = query.match(/^(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)$/);
        if (directCoordMatch) {
          const pLat = parseFloat(directCoordMatch[1]);
          const pLng = parseFloat(directCoordMatch[2]);
          handleApplyCoordinates(pLat, pLng, "Koordinat berhasil diterapkan!");
          setSuggestions([]);
          setIsSearching(false);
          return;
        }

        // 2. Google Maps URL detection
        const atMatch = query.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (atMatch) {
          const pLat = parseFloat(atMatch[1]);
          const pLng = parseFloat(atMatch[2]);
          handleApplyCoordinates(pLat, pLng, "Koordinat diekstrak dari link Google Maps!");
          setSuggestions([]);
          setIsSearching(false);
          return;
        }

        // 3. Search place with Indonesia context
        const searchTarget =
          query.toLowerCase().includes("bangil") || query.toLowerCase().includes("pasuruan")
            ? query
            : `${query}, Bangil, Pasuruan`;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchTarget
          )}&limit=5&addressdetails=1&countrycodes=id`,
          { headers: { "Accept-Language": "id" } }
        );
        const data: SearchSuggestion[] = await res.json();
        setSuggestions(data || []);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);
  };

  // Select Search Suggestion
  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    const sLat = parseFloat(suggestion.lat);
    const sLng = parseFloat(suggestion.lon);
    handleApplyCoordinates(sLat, sLng, `Lokasi terpilih: ${suggestion.display_name.slice(0, 50)}...`);
    setSuggestions([]);
    setSearchQuery("");
  };

  // Get GPS Location (1-Click)
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      showAlert({
        title: "GPS Tidak Didukung",
        message: "Browser Anda tidak mendukung deteksi lokasi otomatis.",
        type: "warning",
        confirmText: "Mengerti",
      });
      return;
    }

    setIsLocatingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsLat = pos.coords.latitude;
        const gpsLng = pos.coords.longitude;
        handleApplyCoordinates(gpsLat, gpsLng, "Berhasil mengambil posisi GPS Anda saat ini!");
        setIsLocatingGPS(false);
      },
      (err) => {
        let msg = "Gagal mengakses GPS: " + err.message;
        if (err.code === 1) {
          msg = "Izin lokasi tidak diberikan. Harap aktifkan izin lokasi di browser Anda.";
        }
        showAlert({
          title: "Akses GPS Gagal",
          message: msg,
          type: "error",
          confirmText: "Tutup",
        });
        setIsLocatingGPS(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Apply resolved address to form
  const handleApplyAddressToForm = () => {
    if (onAddressSelect && resolvedAddress) {
      onAddressSelect(resolvedAddress);
      setSearchFeedback("Alamat berhasil diterapkan ke formulir UMKM!");
      setTimeout(() => setSearchFeedback(null), 3500);
    }
  };

  const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    alamat || resolvedAddress || "Kelurahan Gempeng, Bangil, Pasuruan"
  )}`;

  return (
    <div className="space-y-3">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        // @ts-ignore
        crossOrigin="anonymous"
      />

      {/* Header Bar & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <MapPin size={14} />
            </span>
            <label className="text-xs font-bold text-slate-800">
              Titik Lokasi Rumah Produksi UMKM
            </label>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Peta Interaktif
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tentukan titik usaha Anda secara presisi dengan cari nama jalan, tombol GPS, atau geser peta.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* GPS Button */}
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLocatingGPS}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition disabled:opacity-50 cursor-pointer"
            title="Deteksi lokasi posisi saya saat ini"
          >
            {isLocatingGPS ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Navigation size={13} className="text-white fill-white" />
            )}
            <span>{isLocatingGPS ? "Mencari GPS..." : "Lokasi Saya (GPS)"}</span>
          </button>

          {/* Fullscreen Modal Picker Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer"
            title="Buka pemilih peta interaktif layar penuh"
          >
            <Maximize2 size={13} />
            <span>Pilih di Peta Luas</span>
          </button>
        </div>
      </div>

      {/* Live Search Bar with Dropdown Suggestions */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            placeholder="Ketik nama jalan, pasar, RT/RW, atau tempat di sekitar Bangil/Pasuruan..."
            className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition font-medium shadow-xs"
          />
          {isSearching && (
            <div className="absolute right-3 text-emerald-600 flex items-center gap-1 text-[11px] font-medium">
              <Loader2 size={13} className="animate-spin" />
              <span>Mencari...</span>
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Saran Lokasi Terdekat
            </div>
            {suggestions.map((item) => (
              <button
                key={item.place_id}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/60 transition flex items-start gap-2.5 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                  <Building2 size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-800 truncate">
                    {item.name || item.display_name.split(",")[0]}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{item.display_name}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Landmark Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
        <span className="text-slate-400 font-medium flex items-center gap-1 text-[10px] flex-shrink-0">
          <Sparkles size={11} className="text-amber-500" />
          Pintas:
        </span>
        {BANGIL_LANDMARKS.map((lm) => (
          <button
            key={lm.name}
            type="button"
            onClick={() =>
              handleApplyCoordinates(lm.lat, lm.lng, `Peta bergeser ke ${lm.name}`, 17)
            }
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 font-medium transition flex-shrink-0 cursor-pointer active:scale-95"
          >
            {lm.name}
          </button>
        ))}
      </div>

      {/* Feedback Toast */}
      {searchFeedback && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 shadow-xs animate-in fade-in slide-in-from-top-1">
          <Check size={15} className="text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{searchFeedback}</span>
        </div>
      )}

      {/* Interactive Map Preview Box */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 group">
        <div
          ref={mapContainerRef}
          style={{ height: "260px", width: "100%" }}
          className="z-0"
        />

        {/* Map Type Switcher (Top Left) */}
        <div className="absolute top-3 left-3 z-[400] flex bg-white/90 backdrop-blur-md rounded-lg p-0.5 border border-slate-200/80 shadow-md">
          <button
            type="button"
            onClick={() => setMapType("streets")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer ${
              mapType === "streets"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Peta Jalan
          </button>
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition flex items-center gap-1 cursor-pointer ${
              mapType === "satellite"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers size={11} />
            Satelit
          </button>
        </div>

        {/* Expand Modal Quick Button (Top Right next to zoom) */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="absolute top-3 right-12 z-[400] bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 hover:text-emerald-700 p-1.5 rounded-lg border border-slate-200/80 shadow-md text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
          title="Buka peta ukuran penuh"
        >
          <Maximize2 size={13} />
        </button>

        {/* Bottom Location Floating Card */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPinCheck size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lokasi Terpilih Saat Ini
              </p>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {isGeocoding ? "Membaca alamat..." : resolvedAddress || "Kawasan Kelurahan Gempeng"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
            {onAddressSelect && (
              <button
                type="button"
                onClick={handleApplyAddressToForm}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition flex items-center gap-1 active:scale-95 cursor-pointer"
                title="Salin nama alamat ini ke kolom Alamat Usaha"
              >
                <Check size={12} />
                Terapkan ke Form
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
            >
              Ubah di Peta
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Technical Details (Latitude / Longitude) */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowCoordinates(!showCoordinates)}
          className="text-[11px] font-medium text-slate-400 hover:text-slate-600 flex items-center gap-1 transition cursor-pointer"
        >
          <span>Detail Teknis Koordinat</span>
          {showCoordinates ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {showCoordinates && (
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-600 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-emerald-600" />
                <span>
                  Latitude: <strong>{currentLat}</strong>, Longitude: <strong>{currentLng}</strong>
                </span>
              </div>
              <a
                href={gmapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                Buka Google Maps <ExternalLink size={11} />
              </a>
            </div>
            <p className="text-[10px] text-slate-400">
              * Koordinat ini tersimpan otomatis dan digunakan untuk penunjuk arah pembeli di Google Maps.
            </p>
          </div>
        )}
      </div>

      {/* FULLSCREEN / MODAL MAP PICKER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Modal Container */}
          <div className="relative w-full h-full md:max-w-4xl md:h-[88vh] md:m-auto bg-white md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Top Modal Header & Search */}
            <div className="p-4 bg-white border-b border-slate-200 flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Pilih Titik Lokasi Rumah Produksi
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Geser peta atau klik pada titik yang tepat untuk menentukan lokasi usaha
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                  title="Tutup peta"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Search Inside Modal */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  placeholder="Ketik nama jalan, pasar, atau tempat di Bangil..."
                  className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none transition font-medium"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1 text-[11px] font-medium">
                    <Loader2 size={13} className="animate-spin" />
                    <span>Mencari...</span>
                  </div>
                )}

                {/* Suggestions dropdown inside modal */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-50 max-h-56 overflow-y-auto divide-y divide-slate-100">
                    {suggestions.map((item) => (
                      <button
                        key={item.place_id}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 transition flex items-start gap-2.5 cursor-pointer"
                      >
                        <Building2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.name || item.display_name.split(",")[0]}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{item.display_name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Landmarks */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] no-scrollbar">
                {BANGIL_LANDMARKS.map((lm) => (
                  <button
                    key={lm.name}
                    type="button"
                    onClick={() =>
                      handleApplyCoordinates(lm.lat, lm.lng, `Peta bergeser ke ${lm.name}`, 17)
                    }
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 font-medium transition flex-shrink-0 text-[10px] cursor-pointer"
                  >
                    {lm.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Map View Canvas */}
            <div className="flex-1 relative bg-slate-100">
              <div ref={modalMapContainerRef} className="w-full h-full z-0" />

              {/* Map Layer Switcher (Streets / Satellite) */}
              <div className="absolute top-3 left-3 z-[400] flex bg-white/90 backdrop-blur-md rounded-xl p-1 border border-slate-200/80 shadow-md">
                <button
                  type="button"
                  onClick={() => setMapType("streets")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    mapType === "streets"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Peta Jalan
                </button>
                <button
                  type="button"
                  onClick={() => setMapType("satellite")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                    mapType === "satellite"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Layers size={13} />
                  Foto Satelit
                </button>
              </div>

              {/* GPS Button inside modal */}
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocatingGPS}
                className="absolute top-3 right-12 z-[400] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md text-xs font-semibold transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                {isLocatingGPS ? (
                  <Loader2 size={13} className="animate-spin text-emerald-600" />
                ) : (
                  <Navigation size={13} className="text-emerald-600 fill-emerald-600" />
                )}
                <span>GPS Saya</span>
              </button>
            </div>

            {/* Modal Bottom Confirmation Sheet */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 shadow-lg">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPinCheck size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Alamat Titik Ini
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {isGeocoding ? "Mendeteksi alamat jalan..." : resolvedAddress || "Kawasan Gempeng, Bangil"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Koordinat: {currentLat}, {currentLng}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onAddressSelect && resolvedAddress) {
                      onAddressSelect(resolvedAddress);
                    }
                    setIsModalOpen(false);
                    setSearchFeedback("Lokasi dan alamat berhasil ditetapkan!");
                    setTimeout(() => setSearchFeedback(null), 3500);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={15} />
                  <span>Pasang Titik Lokasi Ini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

