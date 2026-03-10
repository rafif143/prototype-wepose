// Sponsor letter data structures

export type TemplateType = 'keluarga' | 'perusahaan' | 'pribadi';
export type Language = 'id' | 'en' | 'zh' | 'ja' | 'th' | 'ru' | 'de' | 'fr' | 'ar';

export interface SponsorFormData {
  // Common fields
  applicantName: string;
  passportNumber: string;
  birthDate: string;
  destinationCountry: string;
  departureDate: string;
  returnDate: string;
  destinationCity: string;

  // Sponsor fields (keluarga, perusahaan)
  sponsorName?: string;
  sponsorIdNumber?: string;
  sponsorAddress?: string;
  sponsorPhone?: string;

  // Keluarga-specific
  relationship?: 'Anak' | 'Suami/Istri' | 'Orang Tua';

  // Perusahaan-specific
  companyName?: string;
  position?: string;
  letterNumber?: string;
  signerName?: string;
  signerPosition?: string;

  // Pribadi-specific
  occupation?: string;
  monthlyIncome?: string;
}

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  icon: string;
  popular: boolean;
  previewColor: string;
}

export const templates: TemplateConfig[] = [
  {
    id: 'keluarga',
    name: 'Sponsor Keluarga',
    description: 'Untuk pemohon yang dibiayai oleh anggota keluarga (orang tua, suami/istri, anak)',
    icon: '👨‍👩‍👧',
    popular: true,
    previewColor: '#FFF7ED',
  },
  {
    id: 'perusahaan',
    name: 'Sponsor Perusahaan',
    description: 'Untuk perjalanan bisnis atau dinas yang dibiayai oleh perusahaan/instansi',
    icon: '🏢',
    popular: false,
    previewColor: '#EFF6FF',
  },
  {
    id: 'pribadi',
    name: 'Sponsor Pribadi',
    description: 'Untuk pemohon yang membiayai perjalanan sendiri (self-sponsored)',
    icon: '💼',
    popular: false,
    previewColor: '#F0FDF4',
  },
];
