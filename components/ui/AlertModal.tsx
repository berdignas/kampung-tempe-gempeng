"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  type?: AlertType;
  badgeText?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  autoClose?: number; // ms, default 3500 for success
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
    }, 300);
  }, []);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
    setProgress(100);
  }, []);

  // Handle auto-close timer and animated progress bar
  useEffect(() => {
    if (!isOpen || !options) return;

    const duration = options.autoClose !== undefined ? options.autoClose : (options.type === "error" ? 0 : 3500);
    if (duration <= 0) return;

    const intervalTime = 50;
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

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    hideAlert();
  };

  const handleCancel = () => {
    if (options?.onCancel) {
      options.onCancel();
    }
    hideAlert();
  };

  const alertType = options?.type || "success";

  return (
    <AlertModalContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {/* Animated Pop-Up Modal */}
      {isOpen && options && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
        >
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
            onClick={hideAlert}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100 animate-scaleUp z-10">
            {/* Top Glowing Ambient Bar */}
            <div
              className={`h-2 w-full ${
                alertType === "success"
                  ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"
                  : alertType === "error"
                  ? "bg-gradient-to-r from-rose-500 to-red-600"
                  : alertType === "warning"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500"
                  : "bg-gradient-to-r from-sky-400 to-blue-600"
              }`}
            />

            {/* Close Button (X) */}
            <button
              type="button"
              onClick={hideAlert}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X size={18} />
            </button>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
              {/* Animated Icon Container */}
              <div className="relative flex items-center justify-center">
                {alertType === "success" && (
                  <div className="relative flex items-center justify-center">
                    {/* Outer Radiating Waves */}
                    <div className="absolute w-24 h-24 rounded-full bg-emerald-100/60 animate-ping opacity-75 pointer-events-none" />
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transform hover:rotate-6 transition-transform">
                      <CheckCircle2 size={42} className="stroke-[2.3] animate-pulse" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 items-center justify-center text-white">
                        <Sparkles size={11} />
                      </span>
                    </span>
                  </div>
                )}

                {alertType === "error" && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <XCircle size={42} className="stroke-[2.3]" />
                    </div>
                  </div>
                )}

                {alertType === "warning" && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <AlertTriangle size={40} className="stroke-[2.3]" />
                    </div>
                  </div>
                )}

                {alertType === "info" && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
                      <Info size={42} className="stroke-[2.3]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                <span
                  className={`w-2 h-2 rounded-full ${
                    alertType === "success"
                      ? "bg-emerald-500"
                      : alertType === "error"
                      ? "bg-rose-500"
                      : alertType === "warning"
                      ? "bg-amber-500"
                      : "bg-sky-500"
                  }`}
                />
                <span>{options.badgeText || (alertType === "success" ? "Tersimpan di Cloud & Server" : "Pemberitahuan Sistem")}</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {options.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm whitespace-pre-line">
                  {options.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-3 flex flex-col gap-2.5">
                {options.actionHref && options.actionText && (
                  <Link
                    href={options.actionHref}
                    onClick={hideAlert}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs"
                  >
                    <span>{options.actionText}</span>
                    <ExternalLink size={14} />
                  </Link>
                )}

                <div className="flex items-center gap-2.5 w-full">
                  {options.showCancel && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition cursor-pointer"
                    >
                      {options.cancelText || "Batal"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleConfirm}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer ${
                      alertType === "success"
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                        : alertType === "error"
                        ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/25"
                        : alertType === "warning"
                        ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/25"
                        : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/25"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    <span>{options.confirmText || "Oke, Selesai"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Auto-Dismiss Progress Bar */}
            {options.autoClose !== 0 && (
              <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className={`h-full transition-all duration-75 ${
                    alertType === "success"
                      ? "bg-emerald-500"
                      : alertType === "error"
                      ? "bg-rose-500"
                      : alertType === "warning"
                      ? "bg-amber-500"
                      : "bg-sky-500"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </AlertModalContext.Provider>
  );
}
