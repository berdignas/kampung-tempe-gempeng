"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  email: string;
  role: "admin";
  name: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "ktg_admin_session";

// Default admin credentials
export const DEFAULT_ADMIN_EMAIL = "admin@kampungtempegempeng.com";
export const DEFAULT_ADMIN_PASSWORD = "admin";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role === "admin") {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: "Email dan kata sandi wajib diisi." };
    }

    if (
      (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() || cleanEmail === "admin@gempeng.com" || cleanEmail === "admin@gmail.com") &&
      (cleanPassword === DEFAULT_ADMIN_PASSWORD || cleanPassword === "admin123" || cleanPassword === "gempeng2026")
    ) {
      const adminData: AdminUser = {
        email: cleanEmail,
        role: "admin",
        name: "Administrator Kawasan",
      };

      setUser(adminData);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      return { success: true };
    }

    return {
      success: false,
      error: "Email atau kata sandi tidak cocok. Silakan periksa kembali.",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    router.push("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
