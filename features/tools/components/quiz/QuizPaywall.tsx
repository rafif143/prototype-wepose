'use client';

import { Paywall } from '@/components/tools/shared/Paywall';

interface QuizPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onBundleWithVisa: () => void;
}

export function QuizPaywall({
  isOpen,
  onClose,
  onPurchase,
  onBundleWithVisa,
}: QuizPaywallProps) {
  return (
    <Paywall
      isOpen={isOpen}
      onClose={onClose}
      onPurchase={onPurchase}
      onSecondaryAction={onBundleWithVisa}
      price="Rp 25.000"
      priceUnit="/sesi"
      title="Lanjutkan untuk Hasil Lengkap"
      description="Kamu sudah selesai 3 pertanyaan dasar. Lanjutkan untuk mendapatkan rekomendasi visa yang akurat berdasarkan profilmu."
      features={[
        'Rekomendasi visa yang dipersonalisasi',
        'Analisis peluang approval (Tinggi/Sedang/Rendah)',
        'Checklist dokumen spesifik profil kamu',
      ]}
      primaryButtonText="Buka Quiz Sekarang — Rp 25.000"
      secondaryButtonText="Bundling dengan Order Visa (Gratis)"
      footerText="Sudah punya akses? Masuk"
    />
  );
}
