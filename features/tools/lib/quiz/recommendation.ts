import {
  APPROVAL_THRESHOLDS,
  APPROVAL_SCORE_IMPACT,
  BASE_APPROVAL_SCORE,
  MIN_APPROVAL_PERCENTAGE,
  MAX_APPROVAL_PERCENTAGE,
} from '@/shared/constants/approval';

// Visa recommendation logic based on quiz answers

export interface VisaRecommendation {
  visaName: string;
  country: string;
  flag: string;
  approvalLevel: 'TINGGI' | 'SEDANG' | 'RENDAH';
  approvalPercentage: number;
  tips: string[];
  requiredDocuments: string[];
}

type FinancialStatus = 'below_10m' | '10_30m' | '30_100m' | 'above_100m';
type PassportStatus = 'valid_1year' | 'valid_6months' | 'no_passport' | 'in_process';
type VisaHistory = 'active' | 'expired' | 'never';
type Timing = 'urgent' | '1_3months' | '3_6months' | 'planning';

// Visa destination mapping
const VISA_DESTINATIONS = {
  eropa: { name: 'France Schengen Tourist', country: 'Prancis', flag: '🇫🇷' },
  asia: { name: 'Japan Tourist', country: 'Jepang', flag: '🇯🇵' },
  amerika: { name: 'USA Tourist (B1/B2)', country: 'Amerika Serikat', flag: '🇺🇸' },
  lainnya: { name: 'Australia Tourist', country: 'Australia', flag: '🇦🇺' },
} as const;

// Calculate score impact from financial status
function calculateFinancialImpact(status: string): number {
  const impacts = APPROVAL_SCORE_IMPACT.FINANCIAL;
  switch (status) {
    case 'above_100m': return impacts.ABOVE_100M;
    case '30_100m': return impacts.BETWEEN_30_100M;
    case '10_30m': return impacts.BETWEEN_10_30M;
    default: return impacts.BELOW_10M;
  }
}

// Calculate score impact from passport status
function calculatePassportImpact(status: string): number {
  const impacts = APPROVAL_SCORE_IMPACT.PASSPORT;
  switch (status) {
    case 'valid_1year': return impacts.VALID_1_YEAR;
    case 'valid_6months': return impacts.VALID_6_MONTHS;
    case 'in_process': return impacts.IN_PROCESS;
    default: return impacts.NO_PASSPORT;
  }
}

// Calculate score impact from visa history
function calculateVisaHistoryImpact(history: string): number {
  const impacts = APPROVAL_SCORE_IMPACT.VISA_HISTORY;
  switch (history) {
    case 'active': return impacts.ACTIVE;
    case 'expired': return impacts.EXPIRED;
    default: return impacts.NEVER;
  }
}

// Calculate score impact from timing
function calculateTimingImpact(timing: string): number {
  const impacts = APPROVAL_SCORE_IMPACT.TIMING;
  if (timing === 'urgent') return impacts.URGENT;
  if (timing === 'planning') return impacts.PLANNING;
  return impacts.NORMAL;
}

// Determine approval level from score
function determineApprovalLevel(score: number): 'TINGGI' | 'SEDANG' | 'RENDAH' {
  if (score >= APPROVAL_THRESHOLDS.HIGH) return 'TINGGI';
  if (score >= APPROVAL_THRESHOLDS.MEDIUM) return 'SEDANG';
  return 'RENDAH';
}

// Generate tips based on weak points
function generateTips(
  financialStatus: string,
  passportStatus: string,
  visaHistory: string,
  timing: string
): string[] {
  const tips: string[] = [];

  if (financialStatus === 'below_10m' || financialStatus === '10_30m') {
    tips.push('Pastikan saldo rekening minimal Rp 20 juta selama 3 bulan terakhir');
  }

  if (passportStatus === 'no_passport' || passportStatus === 'in_process') {
    tips.push('Segera urus paspor dengan masa berlaku minimal 6 bulan');
  }

  if (visaHistory === 'never') {
    tips.push('Siapkan dokumen pendukung tambahan untuk aplikasi visa pertama');
  }

  if (timing === 'urgent') {
    tips.push('Pertimbangkan layanan express untuk mempercepat proses');
  }

  // Add general tips if needed
  if (tips.length < 3) {
    tips.push('Siapkan surat keterangan kerja dengan kop perusahaan resmi');
    tips.push('Beli asuransi perjalanan min. 30.000 EUR sebelum submit');
  }

  return tips.slice(0, 3);
}

// Required documents list
const REQUIRED_DOCUMENTS = [
  'Paspor asli (min. 6 bulan berlaku)',
  'Foto 3.5x4.5 cm (latar putih)',
  'Rekening koran 3 bulan terakhir',
  'Surat keterangan kerja',
  'Asuransi perjalanan',
];

export function calculateRecommendation(
  answers: Record<number, string>
): VisaRecommendation {
  // Extract answers
  const destination = answers[1] as keyof typeof VISA_DESTINATIONS;
  const financialStatus = answers[3];
  const passportStatus = answers[4];
  const visaHistory = answers[5];
  const timing = answers[6];

  // Determine visa based on destination
  const visa = VISA_DESTINATIONS[destination] || VISA_DESTINATIONS.lainnya;

  // Calculate approval score
  let approvalScore = BASE_APPROVAL_SCORE;
  approvalScore += calculateFinancialImpact(financialStatus);
  approvalScore += calculatePassportImpact(passportStatus);
  approvalScore += calculateVisaHistoryImpact(visaHistory);
  approvalScore += calculateTimingImpact(timing);

  // Determine approval level
  const approvalLevel = determineApprovalLevel(approvalScore);

  // Generate tips
  const tips = generateTips(financialStatus, passportStatus, visaHistory, timing);

  // Clamp approval percentage
  const approvalPercentage = Math.min(
    MAX_APPROVAL_PERCENTAGE,
    Math.max(MIN_APPROVAL_PERCENTAGE, approvalScore)
  );

  return {
    visaName: visa.name,
    country: visa.country,
    flag: visa.flag,
    approvalLevel,
    approvalPercentage,
    tips,
    requiredDocuments: REQUIRED_DOCUMENTS,
  };
}
