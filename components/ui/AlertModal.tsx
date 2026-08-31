"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertOptions {
  title?: string;
  message?: string;
  type?: AlertType;
  autoClose?: number; // ms, default 3000
  badgeText?: string;
  confirmText?: string;
  actionHref?: string;
  actionText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertModalContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertModalContext = createContext<AlertModalContextType | undefined>(undefined);

export function useAlertModal() {
  const context = useContext(AlertModalContext);
  if (!context) {
    throw new Error("useAlertModal must be used within an AlertModalProvider");
  }
  return context;
}

export function AlertModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);
  const [progress, setProgress] = useState(100);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setOptions(null);
    }, 250);
  }, []);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
    setProgress(100);
  }, []);

  useEffect(() => {
    if (!isOpen || !options) return;

    const duration = options.autoClose !== undefined ? options.autoClose : 3000;
    if (duration <= 0) return;

    const intervalTime = 40;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          hideAlert();
          if (options.onConfirm) {
            options.onConfirm();
          }
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, options, hideAlert]);

  const alertType = options?.type || "success";
  const isSuccess = alertType === "success";
  const isError = alertType === "error";

  return (
    <AlertModalContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {/* Floating Small Toast in Top-Right Corner */}
      {isOpen && options && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-[9999] max-w-xs sm:max-w-sm w-full select-none pointer-events-none transition-all duration-300"
        >
          <div
            className={`pointer-events-auto relative flex flex-col rounded-2xl shadow-xl border overflow-hidden backdrop-blur-md transition-all duration-300 animate-slideInRight ${
              isSuccess
                ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/20"
                : isError
                ? "bg-rose-600 border-rose-500 text-white shadow-rose-950/20"
                : alertType === "warning"
                ? "bg-amber-600 border-amber-500 text-white shadow-amber-950/20"
                : "bg-sky-600 border-sky-500 text-white shadow-sky-950/20"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Animated Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shadow-xs">
                {isSuccess && <CheckCircle2 size={18} className="stroke-[2.5]" />}
                {isError && <XCircle size={18} className="stroke-[2.5]" />}
                {alertType === "warning" && <AlertTriangle size={18} className="stroke-[2.5]" />}
                {alertType === "info" && <Info size={18} className="stroke-[2.5]" />}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-sm font-bold tracking-tight leading-tight">
                  {options.title || (isSuccess ? "Berhasil Disimpan" : "Gagal Disimpan")}
                </p>
                {options.message && (
                  <p className="text-xs text-white/90 line-clamp-2 mt-0.5 font-medium leading-normal">
                    {options.message}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={hideAlert}
                className="flex-shrink-0 p-1 text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup notifikasi"
              >
                <X size={16} />
              </button>
            </div>

            {/* Bottom Auto-Dismiss Progress Bar */}
            {options.autoClose !== 0 && (
              <div className="w-full bg-black/15 h-1 overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-white/40 transition-all duration-75 ease-linear"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </AlertModalContext.Provider>
  );
}
