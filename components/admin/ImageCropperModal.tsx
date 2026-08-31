"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
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
  aspectRatioLabel = "16:9 (Ukuran Pas Kartu UMKM)",
}: ImageCropperModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded image object
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Position and transform state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  // Drag tracking refs
  const dragStartRef = useRef<{ clientX: number; clientY: number; posX: number; posY: number }>({
    clientX: 0,
    clientY: 0,
    posX: 0,
    posY: 0,
  });

  // Touch pinch tracking refs
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);

  // Load image when imageSrc changes or modal opens
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    setImageLoaded(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImageRef.current = img;
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [isOpen, imageSrc]);

  // Main drawing routine that works identically for workspace and export
  const renderToCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      targetWidth: number,
      domWidth: number,
      pos: { x: number; y: number },
      z: number,
      rot: number
    ) => {
      const img = loadedImageRef.current;
      if (!img || !canvas) return;

      const targetHeight = Math.round(targetWidth / aspectRatio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Background
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Effective dimensions considering 90 / 270 deg rotation
      const isRotated90 = rot === 90 || rot === 270;
      const effW = isRotated90 ? img.naturalHeight : img.naturalWidth;
      const effH = isRotated90 ? img.naturalWidth : img.naturalHeight;

      // Base scale factor to "cover" target dimensions at 100% zoom
      const scaleFactor = Math.max(targetWidth / effW, targetHeight / effH);
      const baseW = img.naturalWidth * scaleFactor;
      const baseH = img.naturalHeight * scaleFactor;

      const scaleRatio = targetWidth / Math.max(1, domWidth);

      ctx.save();
      // Center of canvas
      ctx.translate(targetWidth / 2, targetHeight / 2);

      // Rotate
      ctx.rotate((rot * Math.PI) / 180);

      // Translate (pan offset)
      ctx.translate(pos.x * scaleRatio, pos.y * scaleRatio);

      // Zoom
      ctx.scale(z, z);

      // Draw image centered
      ctx.drawImage(img, -baseW / 2, -baseH / 2, baseW, baseH);

      ctx.restore();
    },
    [aspectRatio]
  );

  // Redraw workspace canvas & preview canvas when state changes
  useEffect(() => {
    if (!isOpen || !imageLoaded || !containerRef.current) return;

    const container = containerRef.current;
    const domWidth = container.clientWidth || 500;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const workspaceWidth = Math.round(domWidth * dpr);

    // Draw main interactive workspace canvas
    if (canvasRef.current) {
      renderToCanvas(canvasRef.current, workspaceWidth, domWidth, position, zoom, rotation);
    }

    // Draw live preview mockup canvas (400px width for sharp thumbnail)
    if (previewCanvasRef.current) {
      renderToCanvas(previewCanvasRef.current, 400, domWidth, position, zoom, rotation);
    }
  }, [isOpen, imageLoaded, position, zoom, rotation, renderToCanvas]);

  // Window resize observer to adapt canvas resolution
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const domWidth = containerRef.current.clientWidth || 500;
        const dpr = window.devicePixelRatio || 1;
        renderToCanvas(canvasRef.current, Math.round(domWidth * dpr), domWidth, position, zoom, rotation);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, position, zoom, rotation, renderToCanvas]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    setPosition({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((prev) => Math.min(3, Math.max(1, +(prev + delta).toFixed(3))));
  };

  // Touch drag & pinch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        posX: position.x,
        posY: position.y,
      };
      pinchStartDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.clientX;
      const dy = e.touches[0].clientY - dragStartRef.current.clientY;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    } else if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = dist / pinchStartDistRef.current;
      setZoom(Math.min(3, Math.max(1, +(pinchStartZoomRef.current * scale).toFixed(3))));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    pinchStartDistRef.current = null;
  };

  // Smart Alignment Presets based on actual image dimensions
  const handleAlign = (direction: "center" | "top" | "bottom" | "left" | "right") => {
    const img = loadedImageRef.current;
    const container = containerRef.current;
    if (!img || !container) {
      if (direction === "center") setPosition({ x: 0, y: 0 });
      return;
    }

    const domWidth = container.clientWidth || 500;
    const domHeight = domWidth / aspectRatio;

    const isRotated90 = rotation === 90 || rotation === 270;
    const effW = isRotated90 ? img.naturalHeight : img.naturalWidth;
    const effH = isRotated90 ? img.naturalWidth : img.naturalHeight;

    const scaleFactor = Math.max(domWidth / effW, domHeight / effH);
    const curW = effW * scaleFactor * zoom;
    const curH = effH * scaleFactor * zoom;

    const maxDeltaY = Math.max(0, (curH - domHeight) / 2);
    const maxDeltaX = Math.max(0, (curW - domWidth) / 2);

    switch (direction) {
      case "center":
        setPosition({ x: 0, y: 0 });
        break;
      case "top":
        // Moves image down so top of photo touches top of crop box
        setPosition((prev) => ({ ...prev, y: Math.round(maxDeltaY) }));
        break;
      case "bottom":
        // Moves image up so bottom of photo touches bottom of crop box
        setPosition((prev) => ({ ...prev, y: -Math.round(maxDeltaY) }));
        break;
      case "left":
        setPosition((prev) => ({ ...prev, x: Math.round(maxDeltaX) }));
        break;
      case "right":
        setPosition((prev) => ({ ...prev, x: -Math.round(maxDeltaX) }));
        break;
    }
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleSave = () => {
    if (!loadedImageRef.current || !containerRef.current) return;

    const exportCanvas = document.createElement("canvas");
    const domWidth = containerRef.current.clientWidth || 400;
    // Optimized resolution: crisp for web & responsive screens, tiny storage footprint (~40KB)
    const outputWidth = aspectRatio < 1 ? 640 : 800;

    renderToCanvas(exportCanvas, outputWidth, domWidth, position, zoom, rotation);

    const croppedDataUrl = exportCanvas.toDataURL("image/jpeg", 0.82);
    onApply(croppedDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  const isPortrait = aspectRatio < 1;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Move size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Atur & Geser Posisi Foto
              </h3>
              <p className="text-[11px] text-slate-500">
                Geser (drag) foto dan atur zoom agar pas di dalam bingkai ({aspectRatioLabel})
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
            {/* Left Column: Interactive Drag Workspace Canvas */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders size={14} className="text-emerald-600" />
                  Area Pemotongan & Geser
                </span>
                <span className="text-[11px] text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
                  Rasio {aspectRatioLabel}
                </span>
              </div>

              {/* Interactive Cropper Box Container */}
              <div className={`w-full flex justify-center ${isPortrait ? "py-2" : ""}`}>
                <div
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ aspectRatio: `${aspectRatio}` }}
                  className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-lg cursor-grab active:cursor-grabbing select-none flex items-center justify-center touch-none group ${
                    isPortrait ? "w-full max-w-[260px] sm:max-w-[280px]" : "w-full"
                  }`}
                >
                  {/* The Interactive High-DPI Canvas */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain pointer-events-none block"
                  />

                {/* Loading indicator */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 bg-slate-900/80">
                    Memuat foto...
                  </div>
                )}

                {/* Visual Rule-of-Thirds Guidelines */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none z-20 grid grid-cols-3 grid-rows-3 opacity-35 group-hover:opacity-60 transition-opacity">
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div className="border-r border-b border-white/70"></div>
                    <div></div>
                  </div>
                )}

                {/* Drag Help Badge */}
                <div className="absolute top-3 left-3 pointer-events-none z-30 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Move size={11} className="text-emerald-400" />
                  <span>Klik & geser foto untuk memindahkan</span>
                </div>
              </div>
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
            <div className="lg:col-span-5 space-y-3">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                <Eye size={14} className="text-emerald-600" />
                Hasil Pratinjau Tampilan Website
              </span>

              {/* Mockup Card */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-0 mx-auto ${
                isPortrait ? "max-w-[220px] sm:max-w-[240px]" : "max-w-sm"
              }`}>
                {/* Mockup Image Canvas */}
                <div
                  style={{ aspectRatio: `${aspectRatio}` }}
                  className="relative w-full bg-slate-900 overflow-hidden border-b border-slate-100"
                >
                  <canvas
                    ref={previewCanvasRef}
                    className="w-full h-full object-contain block"
                  />
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[9px] px-2 py-0.5 rounded-md backdrop-blur-xs font-semibold pointer-events-none">
                    {aspectRatioLabel.split("(")[0].trim()} Pas
                  </span>
                </div>

                {/* Mockup Content */}
                <div className="p-3.5 space-y-1.5 bg-slate-50/50">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-emerald-700">
                      {aspectRatioLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Hasil pemotongan di atas adalah bentuk persis 100% yang akan tampil di halaman website.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles size={12} className="text-emerald-600" />
                  Presisi Sesuai Website:
                </p>
                <p className="text-emerald-700 leading-relaxed">
                  Posisi, zoom, dan geseran foto yang Anda atur di sisi kiri akan tersimpan 100% presisi dan sama persis dengan yang terlihat di pratinjau.
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
