"use client";

import { use } from "react";
import ProdukForm from "@/components/admin/ProdukForm";
import { useCMS } from "@/lib/cms/CMSContext";

export default function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { produkList } = useCMS();

  const item = produkList.find((p) => p.id === resolvedParams.id);

  if (!item) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500 text-sm">Varian produk tidak ditemukan atau telah dihapus.</p>
      </div>
    );
  }

  return <ProdukForm initialData={item} isEdit={true} />;
}
