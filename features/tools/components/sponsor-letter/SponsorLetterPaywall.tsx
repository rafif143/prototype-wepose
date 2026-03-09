'use client';

import { Paywall } from '@/features/tools/components/shared/Paywall';

interface SponsorLetterPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

export function SponsorLetterPaywall({
  isOpen,
  onClose,
  onPurchase,
}: SponsorLetterPaywallProps) {
  return (
    <Paywall
      isOpen={isOpen}
      onClose={onClose}
      title="Unlock Generator Surat Sponsor"
      description="Buat surat sponsor profesional dalam hitungan menit"
      price="Rp 15.000"
      priceUnit="sekali pakai"
      primaryButtonText="Beli Sekarang"
      features={[
        '3 template surat sponsor (Keluarga, Perusahaan, Pribadi)',
        'Bahasa Indonesia & English',
        'Live preview real-time',
        'Download PDF berkualitas tinggi',
        'Simpan ke Document Vault',
        'Share langsung ke WhatsApp',
      ]}
      onPurchase={onPurchase}
    />
  );
}
