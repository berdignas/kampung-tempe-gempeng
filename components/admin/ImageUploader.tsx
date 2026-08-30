"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Move, SlidersHorizontal } from "lucide-react";
import ImageCropperModal from "./ImageCropperModal";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
  aspectRatio?: number;
  aspectRatioLabel?: string;
  allowCrop?: boolean;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  placeholder = "/images/hero-tempe-production.jpg atau https://...",
  helpText = "Upload foto dari file komputer Anda atau masukkan URL gambar.",
  aspectRatio = 16 / 9,
  aspectRatioLabel = "16:9 (Ukuran Kartu UMKM)",
  allowCrop = true,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar yang valid (JPG, PNG, WebP, dsb).");
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      setIsUploading(false);

      if (allowCrop) {
        setCropperSrc(rawDataUrl);
        setIsCropperOpen(true);
      } else {
        onChange(rawDataUrl);
      }
    };
    reader.readAsDataURL(file);

    // Reset file input value so selecting the same file triggers onChange again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenCropperForExisting = () => {
    if (!value) return;
    setCropperSrc(value);
    setIsCropperOpen(true);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}

      {/* Preview Box if image exists */}
      {value && (
        <div className="relative group w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 mb-3 shadow-xs">
          <div style={{ aspectRatio: `${aspectRatio}` }} className="relative w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Pratinjau Gambar" className="w-full h-full object-cover" />

            {/* Quick Action Overlay */}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs p-3">
              {allowCrop && (
                <button
                  type="button"
                  onClick={handleOpenCropperForExisting}
                  className="px-3 py-2 bg-white/95 hover:bg-white text-slate-800 rounded-xl text-xs font-bold shadow-lg transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Move size={14} className="text-emerald-600" />
                  <span>Geser / Atur Posisi</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-2 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-lg transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                title="Hapus Gambar"
              >
                <X size={14} />
                <span>Hapus</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar on Preview */}
          {allowCrop && (
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 font-medium truncate">
                Rasio: {aspectRatioLabel}
              </span>
              <button
                type="button"
                onClick={handleOpenCropperForExisting}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition cursor-pointer active:scale-95"
              >
                <SlidersHorizontal size={13} />
                <span>Sesuaikan Posisi</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons & Inputs */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-xl transition shadow-2xs cursor-pointer active:scale-95"
        >
          <Upload size={15} />
          {isUploading ? "Memproses Gambar..." : "📁 Cari & Upload File"}
        </button>

        {/* Text Input URL Fallback */}
        <div className="relative flex-1">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}

      {/* Image Cropper Modal */}
      {allowCrop && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          imageSrc={cropperSrc}
          onClose={() => setIsCropperOpen(false)}
          onApply={(croppedUrl) => {
            onChange(croppedUrl);
            setIsCropperOpen(false);
          }}
          aspectRatio={aspectRatio}
          aspectRatioLabel={aspectRatioLabel}
        />
      )}
    </div>
  );
}

