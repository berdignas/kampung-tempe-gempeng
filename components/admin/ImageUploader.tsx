"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  placeholder = "/images/hero-tempe-production.jpg atau https://...",
  helpText = "Upload foto dari file komputer Anda atau masukkan URL gambar.",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      const img = new Image();
      img.onload = () => {
        // Compress / resize image if larger than 1200px width to keep performance & storage clean
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to data URL (JPEG 85% quality)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        onChange(dataUrl);
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}

      {/* Preview Box if image exists */}
      {value && (
        <div className="relative group w-full max-w-md h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-3 shadow-xs flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Pratinjau Gambar" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition shadow-md"
            title="Hapus Gambar"
          >
            <X size={14} />
          </button>
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-xl transition shadow-2xs"
        >
          <Upload size={15} />
          {isUploading ? "Memproses Gambar..." : "📁 Cari & Upload File dari Komputer"}
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
    </div>
  );
}
