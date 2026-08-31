"use client";

import { useState, useRef } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  SlidersHorizontal,
  Trash2,
  Crop,
} from "lucide-react";
import ImageCropperModal from "./ImageCropperModal";
import { useAlertModal } from "@/components/ui/AlertModal";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
  aspectRatio?: number;
  aspectRatioLabel?: string;
  previewMaxWidth?: string;
  allowCrop?: boolean;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  placeholder = "https://... atau upload file gambar",
  helpText = "Upload foto dari file komputer Anda atau masukkan URL gambar.",
  aspectRatio = 16 / 9,
  aspectRatioLabel = "16:9 (Ukuran Kartu UMKM)",
  previewMaxWidth,
  allowCrop = true,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string>("");
  const { showAlert } = useAlertModal();

  // Width for the preview column depending on ratio
  const previewColWidth =
    aspectRatio < 0.8
      ? "w-32 sm:w-36 flex-shrink-0"
      : aspectRatio <= 1.1
      ? "w-36 sm:w-44 flex-shrink-0"
      : "w-44 sm:w-56 flex-shrink-0";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert({
        title: "Format File Tidak Didukung",
        message: "Silakan pilih file gambar yang valid seperti JPG, PNG, atau WebP.",
        type: "warning",
      });
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
      {label && <label className="block text-xs font-bold text-slate-800">{label}</label>}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Side-by-Side Card: Image on Left, Upload Buttons on Right */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-4 items-start">
        {/* LEFT: Image Preview Box */}
        <div className={previewColWidth}>
          <div
            style={{ aspectRatio: `${aspectRatio}` }}
            className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shadow-xs group"
          >
            {value ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Pratinjau Foto"
                  className="w-full h-full object-cover"
                />
                {allowCrop && (
                  <button
                    type="button"
                    onClick={handleOpenCropperForExisting}
                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 text-[11px] font-semibold cursor-pointer"
                  >
                    <Crop size={18} />
                    <span>Atur Posisi</span>
                  </button>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 text-center text-slate-400 gap-1.5">
                <ImageIcon size={26} className="text-slate-300 stroke-[1.5]" />
                <span className="text-[10px] font-semibold text-slate-400">
                  Belum ada foto
                </span>
              </div>
            )}
          </div>

          <div className="mt-1.5 text-center">
            <span className="text-[10px] text-slate-400 font-medium block">
              Format: {aspectRatioLabel}
            </span>
          </div>
        </div>

        {/* RIGHT: Action Controls & URL Input */}
        <div className="flex-1 w-full space-y-3">
          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              <Upload size={14} />
              <span>{isUploading ? "Memproses..." : value ? "Ganti / Upload Foto" : "Cari & Upload File"}</span>
            </button>

            {value && allowCrop && (
              <button
                type="button"
                onClick={handleOpenCropperForExisting}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer"
              >
                <SlidersHorizontal size={13} className="text-slate-600" />
                <span>Sesuaikan Posisi</span>
              </button>
            )}

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 active:scale-95 text-xs font-semibold rounded-xl border border-rose-200 transition cursor-pointer"
                title="Hapus foto saat ini"
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <LinkIcon size={12} />
              <span>Atau masukkan tautan URL gambar:</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none transition font-medium text-slate-700"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {helpText && (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {helpText}
            </p>
          )}
        </div>
      </div>

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

