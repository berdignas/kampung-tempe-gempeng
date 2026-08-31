"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UMKM, daftarUMKM as initialUMKM } from "@/lib/data/umkm";
import { Produk, daftarProduk as initialProduk } from "@/lib/data/produk";
import { Berita, daftarBerita as initialBerita } from "@/lib/data/berita";
import {
  PengaturanPortal,
  initialPengaturan,
  ProfilKampungData,
  initialProfilKampung,
  loadStoredUMKM,
  saveStoredUMKM,
  loadStoredProduk,
  saveStoredProduk,
  loadStoredBerita,
  saveStoredBerita,
  loadStoredPengaturan,
  saveStoredPengaturan,
  loadStoredProfil,
  saveStoredProfil,
  resetAllCMSData,
} from "./cmsStore";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  fetchAllFromSupabase,
  upsertUmkmSupabase,
  deleteUmkmSupabase,
  upsertProdukSupabase,
  deleteProdukSupabase,
  upsertBeritaSupabase,
  deleteBeritaSupabase,
  updatePengaturanSupabase,
  updateProfilSupabase,
} from "@/lib/supabase/cmsSync";

interface CMSContextType {
  umkmList: UMKM[];
  produkList: Produk[];
  beritaList: Berita[];
  pengaturan: PengaturanPortal;
  profilData: ProfilKampungData;
  isSupabaseActive: boolean;
  
  // UMKM CRUD
  addUMKM: (data: Omit<UMKM, "id">) => void;
  updateUMKM: (id: string, data: Partial<UMKM>) => void;
  deleteUMKM: (id: string) => void;

  // Produk CRUD
  addProduk: (data: Omit<Produk, "id">) => void;
  updateProduk: (id: string, data: Partial<Produk>) => void;
  deleteProduk: (id: string) => void;

  // Berita CRUD
  addBerita: (data: Omit<Berita, "id">) => void;
  updateBerita: (id: string, data: Partial<Berita>) => void;
  deleteBerita: (id: string) => void;

  // Pengaturan
  updatePengaturan: (data: Partial<PengaturanPortal>) => void;

  // Profil Kampung
  updateProfil: (data: Partial<ProfilKampungData>) => void;

  // Reset
  resetData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [umkmList, setUmkmList] = useState<UMKM[]>(initialUMKM);
  const [produkList, setProdukList] = useState<Produk[]>(initialProduk);
  const [beritaList, setBeritaList] = useState<Berita[]>(initialBerita);
  const [pengaturan, setPengaturan] = useState<PengaturanPortal>(initialPengaturan);
  const [profilData, setProfilData] = useState<ProfilKampungData>(initialProfilKampung);
  const [isSupabaseActive, setIsSupabaseActive] = useState<boolean>(false);

  useEffect(() => {
    const syncLocal = () => {
      setUmkmList(loadStoredUMKM());
      setProdukList(loadStoredProduk());
      setBeritaList(loadStoredBerita());
      setPengaturan(loadStoredPengaturan());
      setProfilData(loadStoredProfil());
    };

    // 1. Muat data awal dari localStorage
    syncLocal();

    // 2. Listener storage lokal (sinkron antar tab & antar komponen di browser)
    const handleStorageChange = () => {
      syncLocal();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-cms-update", handleStorageChange);

    // 3. Listener Supabase & Realtime Websocket
    const client = supabase;
    if (isSupabaseConfigured && client) {
      const loadFromSupabase = () => {
        const currentLocal = {
          umkmList: loadStoredUMKM(),
          produkList: loadStoredProduk(),
          beritaList: loadStoredBerita(),
          pengaturan: loadStoredPengaturan(),
          profil: loadStoredProfil(),
        };

        fetchAllFromSupabase(currentLocal).then((data) => {
          if (data) {
            setIsSupabaseActive(true);
            if (data.umkmList && data.umkmList.length > 0) {
              setUmkmList(data.umkmList);
              saveStoredUMKM(data.umkmList);
            }
            if (data.produkList && data.produkList.length > 0) {
              setProdukList(data.produkList);
              saveStoredProduk(data.produkList);
            }
            if (data.beritaList && data.beritaList.length > 0) {
              setBeritaList(data.beritaList);
              saveStoredBerita(data.beritaList);
            }
            if (data.pengaturan) {
              setPengaturan(data.pengaturan);
              saveStoredPengaturan(data.pengaturan);
            }
            if (data.profil) {
              setProfilData(data.profil);
              saveStoredProfil(data.profil);
            }
          }
        });
      };

      loadFromSupabase();

      // Langganan perubahan Realtime PostgreSQL Supabase
      const channel = client
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public" },
          () => {
            loadFromSupabase();
          }
        )
        .subscribe();

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("local-cms-update", handleStorageChange);
        client.removeChannel(channel);
      };
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-cms-update", handleStorageChange);
    };
  }, []);

  // Save changes to localStorage & Supabase
  const handleSetUmkm = (newList: UMKM[]) => {
    setUmkmList(newList);
    saveStoredUMKM(newList);
  };

  const handleSetProduk = (newList: Produk[]) => {
    setProdukList(newList);
    saveStoredProduk(newList);
  };

  const handleSetBerita = (newList: Berita[]) => {
    setBeritaList(newList);
    saveStoredBerita(newList);
  };

  const handleSetPengaturan = (newPengaturan: PengaturanPortal) => {
    setPengaturan(newPengaturan);
    saveStoredPengaturan(newPengaturan);
    updatePengaturanSupabase(newPengaturan);
  };

  const handleSetProfil = (newProfil: ProfilKampungData) => {
    setProfilData(newProfil);
    saveStoredProfil(newProfil);
    updateProfilSupabase(newProfil);
  };

  // UMKM CRUD
  const addUMKM = (data: Omit<UMKM, "id">) => {
    const newId = `umkm-${String(Date.now()).slice(-4)}`;
    const newItem: UMKM = { ...data, id: newId };
    handleSetUmkm([newItem, ...umkmList]);
    upsertUmkmSupabase(newItem);
  };

  const updateUMKM = (id: string, data: Partial<UMKM>) => {
    const newList = umkmList.map((u) => (u.id === id ? { ...u, ...data } : u));
    handleSetUmkm(newList);
    const updated = newList.find((u) => u.id === id);
    if (updated) upsertUmkmSupabase(updated);
  };

  const deleteUMKM = (id: string) => {
    const newList = umkmList.filter((u) => u.id !== id);
    handleSetUmkm(newList);
    deleteUmkmSupabase(id);
  };

  // Produk CRUD
  const addProduk = (data: Omit<Produk, "id">) => {
    const newId = `produk-${String(Date.now()).slice(-4)}`;
    const newItem: Produk = { ...data, id: newId };
    handleSetProduk([newItem, ...produkList]);
    upsertProdukSupabase(newItem);
  };

  const updateProduk = (id: string, data: Partial<Produk>) => {
    const newList = produkList.map((p) => (p.id === id ? { ...p, ...data } : p));
    handleSetProduk(newList);
    const updated = newList.find((p) => p.id === id);
    if (updated) upsertProdukSupabase(updated);
  };

  const deleteProduk = (id: string) => {
    const newList = produkList.filter((p) => p.id !== id);
    handleSetProduk(newList);
    deleteProdukSupabase(id);
  };

  // Berita CRUD
  const addBerita = (data: Omit<Berita, "id">) => {
    const newId = `berita-${String(Date.now()).slice(-4)}`;
    const newItem: Berita = { ...data, id: newId };
    handleSetBerita([newItem, ...beritaList]);
    upsertBeritaSupabase(newItem);
  };

  const updateBerita = (id: string, data: Partial<Berita>) => {
    const newList = beritaList.map((b) => (b.id === id ? { ...b, ...data } : b));
    handleSetBerita(newList);
    const updated = newList.find((b) => b.id === id);
    if (updated) upsertBeritaSupabase(updated);
  };

  const deleteBerita = (id: string) => {
    const newList = beritaList.filter((b) => b.id !== id);
    handleSetBerita(newList);
    deleteBeritaSupabase(id);
  };

  // Pengaturan
  const updatePengaturan = (data: Partial<PengaturanPortal>) => {
    const updated = { ...pengaturan, ...data };
    handleSetPengaturan(updated);
  };

  // Profil
  const updateProfil = (data: Partial<ProfilKampungData>) => {
    const updated = { ...profilData, ...data };
    handleSetProfil(updated);
  };

  // Reset
  const resetData = () => {
    resetAllCMSData();
    setUmkmList(initialUMKM);
    setProdukList(initialProduk);
    setBeritaList(initialBerita);
    setPengaturan(initialPengaturan);
    setProfilData(initialProfilKampung);
  };

  return (
    <CMSContext.Provider
      value={{
        umkmList,
        produkList,
        beritaList,
        pengaturan,
        profilData,
        isSupabaseActive,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        addProduk,
        updateProduk,
        deleteProduk,
        addBerita,
        updateBerita,
        deleteBerita,
        updatePengaturan,
        updateProfil,
        resetData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
