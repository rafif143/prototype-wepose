'use client';

import { Paywall } from '@/components/tools/shared/Paywall';

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
      subtitle="Buat surat sponsor profesional dalam hitungan menit"
      price="Rp 15.000"
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
