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

export function calculateRecommendation(
  answers: Record<number, string>
): VisaRecommendation {
  // Get key answers
  const destination = answers[1]; // eropa, asia, amerika, lainnya
  const purpose = answers[0]; // wisata, bisnis, studi, keluarga
  const financialStatus = answers[3]; // below_10m, 10_30m, 30_100m, above_100m
  const passportStatus = answers[4]; // valid_1year, valid_6months, no_passport, in_process
  const visaHistory = answers[5]; // active, expired, never
  const timing = answers[6]; // urgent, 1_3months, 3_6months, planning

  // Determine visa based on destination
  let visaName = '';
  let country = '';
  let flag = '';

  if (destination === 'eropa') {
    visaName = 'France Schengen Tourist';
    country = 'Prancis';
    flag = '🇫🇷';
  } else if (destination === 'asia') {
    visaName = 'Japan Tourist';
    country = 'Jepang';
    flag = '🇯🇵';
  } else if (destination === 'amerika') {
    visaName = 'USA Tourist (B1/B2)';
    country = 'Amerika Serikat';
    flag = '🇺🇸';
  } else {
    visaName = 'Australia Tourist';
    country = 'Australia';
    flag = '🇦🇺';
  }

  // Calculate approval level
  let approvalScore = 50; // Base score

  // Financial status impact
  if (financialStatus === 'above_100m') approvalScore += 20;
  else if (financialStatus === '30_100m') approvalScore += 10;
  else if (financialStatus === '10_30m') approvalScore += 0;
  else approvalScore -= 15;

  // Passport status impact
  if (passportStatus === 'valid_1year') approvalScore += 15;
  else if (passportStatus === 'valid_6months') approvalScore += 5;
  else if (passportStatus === 'in_process') approvalScore -= 5;
  else approvalScore -= 20;

  // Visa history impact
  if (visaHistory === 'active') approvalScore += 15;
  else if (visaHistory === 'expired') approvalScore += 5;
  else approvalScore -= 5;

  // Timing impact
  if (timing === 'urgent') approvalScore -= 10;
  else if (timing === 'planning') approvalScore += 5;

  // Determine level
  let approvalLevel: 'TINGGI' | 'SEDANG' | 'RENDAH';
  if (approvalScore >= 75) {
    approvalLevel = 'TINGGI';
  } else if (approvalScore >= 50) {
    approvalLevel = 'SEDANG';
  } else {
    approvalLevel = 'RENDAH';
  }

  // Generate tips based on weak points
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

  // Add general tips
  if (tips.length < 3) {
    tips.push('Siapkan surat keterangan kerja dengan kop perusahaan resmi');
    tips.push('Beli asuransi perjalanan min. 30.000 EUR sebelum submit');
  }

  // Required documents
  const requiredDocuments = [
    'Paspor asli (min. 6 bulan berlaku)',
    'Foto 3.5x4.5 cm (latar putih)',
    'Rekening koran 3 bulan terakhir',
    'Surat keterangan kerja',
    'Asuransi perjalanan',
  ];

  return {
    visaName,
    country,
    flag,
    approvalLevel,
    approvalPercentage: Math.min(95, Math.max(20, approvalScore)),
    tips: tips.slice(0, 3),
    requiredDocuments,
  };
}
