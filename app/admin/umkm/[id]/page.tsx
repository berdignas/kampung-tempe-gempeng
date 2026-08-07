"use client";

import { use } from "react";
import UMKMForm from "@/components/admin/UMKMForm";
import { useCMS } from "@/lib/cms/CMSContext";

export default function EditUMKMPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { umkmList } = useCMS();

  const item = umkmList.find((u) => u.id === resolvedParams.id);

  if (!item) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">Data UMKM tidak ditemukan atau telah dihapus.</p>
      </div>
    );
  }

  return <UMKMForm initialData={item} isEdit={true} />;
}
