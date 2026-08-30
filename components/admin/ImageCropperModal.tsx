"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Sliders,
  Eye,
} from "lucide-react";

interface ImageCropperModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (croppedDataUrl: string) => void;
  aspectRatio?: number; // e.g. 16/9
  aspectRatioLabel?: string;
}

export default function ImageCropperModal({
  imageSrc,
  isOpen,
  onClose,
  onApply,
  aspectRatio = 16 / 9,
  aspectRatioLabel = "16:9 (Ukuran Kartu UMKM)",
}: ImageCropperModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Position and transform state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Reset transforms when modal opens with new image
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  }, [isOpen, imageSrc]);

  // Generate real-time preview canvas
  const generateCroppedCanvas = useCallback(
    (outputWidth = 1200): HTMLCanvasElement | null => {
      const img = imageRef.current;
      const container = containerRef.current;
      if (!img || !container) return null;

      const outputHeight = Math.round(outputWidth / aspectRatio);
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Container dimensions
      const containerRect = container.getBoundingClientRect();
      const containerW = containerRect.width;
      const containerH = containerRect.height;

      // Calculate scaling between container frame and output canvas
      const scaleToOutput = outputWidth / containerW;

      // Fill canvas background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, outputWidth, outputHeight);

      ctx.save();
      // Move to center of canvas
      ctx.translate(outputWidth / 2, outputHeight / 2);

      // Apply rotation
      ctx.rotate((rotation * Math.PI) / 180);

      // Apply pan position and zoom scale
      ctx.translate(position.x * scaleToOutput, position.y * scaleToOutput);
      ctx.scale(zoom, zoom);

      // Image natural dimensions scaled to container
      // Calculate how the base image fits into container
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let baseW = containerW;
      let baseH = containerW / imgRatio;

      if (baseH < containerH) {
        baseH = containerH;
        baseW = containerH * imgRatio;
      }

      const drawW = baseW * scaleToOutput;
      const drawH = baseH * scaleToOutput;

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      return canvas;
    },
    [aspectRatio, position, rotation, zoom]
  );

  // Update live thumbnail preview on adjustments
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const canvas = generateCroppedCanvas(400);
      if (canvas) {
        setPreviewUrl(canvas.toDataURL("image/jpeg", 0.8));
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen, generateCroppedCanvas, position, zoom, rotation]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Preset alignment shortcuts
  const handleAlign = (direction: "center" | "top" | "bottom" | "left" | "right") => {
    switch (direction) {
      case "center":
        setPosition({ x: 0, y: 0 });
        break;
      case "top":
        setPosition((prev) => ({ ...prev, y: 60 * zoom }));
        break;
      case "bottom":
        setPosition((prev) => ({ ...prev, y: -60 * zoom }));
        break;
      case "left":
        setPosition((prev) => ({ ...prev, x: 60 * zoom }));
        break;
      case "right":
        setPosition((prev) => ({ ...prev, x: -60 * zoom }));
        break;
    }
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleSave = () => {
    const canvas = generateCroppedCanvas(1200);
    if (canvas) {
      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onApply(croppedDataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Move size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Atur & Geser Posisi Foto Profil UMKM
              </h3>
              <p className="text-[11px] text-slate-500">
                Geser (drag) foto dan atur zoom agar pas di dalam kartu ({aspectRatioLabel})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            title="Tutup tanpa menyimpan"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left/Main Column: Interactive Drag Workspace */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders size={14} className="text-emerald-600" />
                  Area Pemotongan & Geser
                </span>
                <span className="text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  Rasio {aspectRatio === 16 / 9 ? "16:9" : "Custom"}
                </span>
              </div>

              {/* Interactive Cropper Box */}
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ aspectRatio: `${aspectRatio}` }}
                className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500 shadow-lg cursor-grab active:cursor-grabbing select-none flex items-center justify-center group touch-none"
              >
                {/* Visual Guidelines (Rule of Thirds Grid) */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none z-20 grid grid-cols-3 grid-rows-3 opacity-35 group-hover:opacity-60 transition-opacity">
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-b border-white/70"></div>
                    <div className="border-r border-white/70"></div>
                    <div className="border-r border-white/70"></div>
                    <div></div>
                  </div>
                )}

                {/* Drag Help Badge */}
                <div className="absolute top-3 left-3 pointer-events-none z-30 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Move size={11} className="text-emerald-400" />
                  <span>Klik & geser foto untuk memindahkan</span>
                </div>

                {/* The Image being transformed */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Foto yang akan dipotong"
                  draggable={false}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                    maxHeight: "none",
                    maxWidth: "none",
                  }}
                  className="w-full h-full object-cover pointer-events-none origin-center"
                />
              </div>

              {/* Controls Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                {/* Zoom & Rotate Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Zoom Slider */}
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer active:scale-95"
                      title="Perkecil Zoom"
                    >
                      <ZoomOut size={15} />
                    </button>

                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <span className="text-[11px] font-bold text-slate-600 w-10 text-right">
                        {Math.round(zoom * 100)}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer active:scale-95"
                      title="Perbesar Zoom"
                    >
                      <ZoomIn size={15} />
                    </button>
                  </div>

                  {/* Rotate & Grid Action Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer active:scale-95"
                      title="Putar foto 90 derajat"
                    >
                      <RotateCw size={13} />
                      <span>Putar 90°</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGrid(!showGrid)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        showGrid
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                      title="Tampilkan / Sembunyikan garis pandu"
                    >
                      Garis Kisi
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold transition cursor-pointer"
                      title="Reset posisi foto"
                    >
                      <RefreshCw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Quick Alignment Shortcuts */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400 font-medium flex items-center gap-1 text-[10px]">
                    <Sparkles size={11} className="text-amber-500" />
                    Pusatkan:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAlign("center")}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer active:scale-95"
                  >
                    Tengah (Center)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAlign("top")}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer active:scale-95"
                  >
                    Fokus Atas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAlign("bottom")}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer active:scale-95"
                  >
                    Fokus Bawah
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAlign("left")}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer active:scale-95"
                  >
                    Kiri
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAlign("right")}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 font-medium transition cursor-pointer active:scale-95"
                  >
                    Kanan
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Mockup Card Preview */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                <Eye size={14} className="text-emerald-600" />
                Hasil Pratinjau di Kartu UMKM
              </span>

              {/* Mockup Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-0 max-w-sm mx-auto">
                {/* Mockup Image Box */}
                <div
                  style={{ aspectRatio: `${aspectRatio}` }}
                  className="relative w-full bg-slate-100 overflow-hidden border-b border-slate-100"
                >
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Pratinjau Hasil Kartu"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      Memuat pratinjau...
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[9px] px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold">
                    16:9 Pas
                  </span>
                </div>

                {/* Mockup Content */}
                <div className="p-4 space-y-2">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                      Eceran & Grosir
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs">Nama Usaha Tempe Anda</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    Foto ini akan tampil rapi dan presisi di halaman direktori utama dan profil publik.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles size={12} className="text-emerald-600" />
                  Kelebihan Fitur Drag:
                </p>
                <p className="text-emerald-700 leading-relaxed">
                  Posisi yang Anda tentukan akan langsung dipotong presisi dan disimpan otomatis dengan kualitas tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-white border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            <Check size={15} />
            <span>Gunakan & Simpan Posisi Foto</span>
          </button>
        </div>
      </div>
    </div>
  );
}
