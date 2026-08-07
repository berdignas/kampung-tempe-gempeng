// lib/whatsapp.ts

/**
 * Membuat URL WhatsApp dengan nomor dan pesan opsional.
 * @param phone - Nomor dalam format internasional tanpa + (contoh: "628123456789")
 * @param message - Pesan pembuka opsional
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function buildWhatsAppMessageUMKM(namaUsaha: string): string {
  return `Halo, saya ingin mengetahui lebih lanjut tentang produk tempe dari ${namaUsaha}. Apakah masih tersedia?`;
}
