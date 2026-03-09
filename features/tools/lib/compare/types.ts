// Comparison tool data structures

export interface VisaData {
  id: string;
  name: string;
  flag: string;
  price: string;
  stayDuration: string;
  validity: string;
  processTime: string;
  visaType: string;
  needAppointment: string;
  needPhysicalDoc: string;
  suitableFor: string;
}

export interface ComparisonCriteria {
  key: keyof VisaData;
  label: string;
  icon: string;
  highlightBest: boolean;
  highlightWorst: boolean;
}

export const comparisonCriteria: ComparisonCriteria[] = [
  {
    key: 'price',
    label: 'Harga Mulai Dari',
    icon: 'BanknotesIcon',
    highlightBest: true,
    highlightWorst: true,
  },
  {
    key: 'stayDuration',
    label: 'Durasi Tinggal',
    icon: 'CalendarDaysIcon',
    highlightBest: false,
    highlightWorst: false,
  },
  {
    key: 'validity',
    label: 'Masa Berlaku Visa',
    icon: 'ClockIcon',
    highlightBest: false,
    highlightWorst: false,
  },
  {
    key: 'processTime',
    label: 'Waktu Proses',
    icon: 'BoltIcon',
    highlightBest: true,
    highlightWorst: true,
  },
  {
    key: 'visaType',
    label: 'Jenis Visa',
    icon: 'DocumentIcon',
    highlightBest: false,
    highlightWorst: false,
  },
  {
    key: 'needAppointment',
    label: 'Perlu Appointment',
    icon: 'BuildingOfficeIcon',
    highlightBest: false,
    highlightWorst: false,
  },
  {
    key: 'needPhysicalDoc',
    label: 'Dokumen Fisik',
    icon: 'DocumentArrowDownIcon',
    highlightBest: false,
    highlightWorst: false,
  },
  {
    key: 'suitableFor',
    label: 'Cocok Untuk',
    icon: 'UserGroupIcon',
    highlightBest: false,
    highlightWorst: false,
  },
];

// Sample visa data for comparison
export const sampleVisaData: VisaData[] = [
  {
    id: 'france-schengen',
    name: 'France Schengen Tourist',
    flag: '🇫🇷',
    price: 'Rp 1.850.000',
    stayDuration: '90 hari',
    validity: '3 bulan',
    processTime: '15–20 hari kerja',
    visaType: 'Sticker',
    needAppointment: 'Tidak',
    needPhysicalDoc: 'Ya',
    suitableFor: 'Wisata, Bisnis',
  },
  {
    id: 'japan-tourist',
    name: 'Japan Tourist',
    flag: '🇯🇵',
    price: 'Rp 950.000',
    stayDuration: '15 hari',
    validity: '3 bulan',
    processTime: '7–10 hari kerja',
    visaType: 'Sticker',
    needAppointment: 'Tidak',
    needPhysicalDoc: 'Ya',
    suitableFor: 'Wisata',
  },
  {
    id: 'australia-tourist',
    name: 'Australia Tourist',
    flag: '🇦🇺',
    price: 'Rp 1.250.000',
    stayDuration: '3 bulan',
    validity: '12 bulan',
    processTime: '10–15 hari kerja',
    visaType: 'e-Visa',
    needAppointment: 'Tidak',
    needPhysicalDoc: 'Tidak',
    suitableFor: 'Wisata, Keluarga',
  },
];
