"use client";

import { use } from "react";
import BeritaForm from "@/components/admin/BeritaForm";
import { useCMS } from "@/lib/cms/CMSContext";

export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { beritaList } = useCMS();

  const item = beritaList.find((b) => b.id === resolvedParams.id);

  if (!item) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">Artikel berita tidak ditemukan atau telah dihapus.</p>
      </div>
    );
  }

  return <BeritaForm initialData={item} isEdit={true} />;
}
