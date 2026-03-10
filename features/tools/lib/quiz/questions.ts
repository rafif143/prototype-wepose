// Quiz data structure and questions for Visa Eligibility Quiz
import React from 'react';
import {
  PaperAirplaneIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  GlobeAsiaAustraliaIcon,
  GlobeAmericasIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  SparklesIcon as DiamondIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  BoltIcon,
  CalendarDaysIcon,
  CalendarIcon,
  SunIcon,
  RocketLaunchIcon,
  MapIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline';

export interface QuizOption {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'TUJUAN PERJALANAN',
    question: 'Kamu mau pergi untuk apa?',
    options: [
      { icon: PaperAirplaneIcon, label: 'Wisata & Liburan', value: 'wisata' },
      { icon: BriefcaseIcon, label: 'Bisnis & Konferensi', value: 'bisnis' },
      { icon: AcademicCapIcon, label: 'Studi & Pendidikan', value: 'studi' },
      { icon: UserGroupIcon, label: 'Kunjungan Keluarga', value: 'keluarga' },
    ],
  },
  {
    id: 2,
    category: 'DESTINASI',
    question: 'Ke region mana kamu mau pergi?',
    options: [
      { icon: GlobeEuropeAfricaIcon, label: 'Eropa / Schengen', value: 'eropa' },
      { icon: GlobeAsiaAustraliaIcon, label: 'Asia Timur', value: 'asia' },
      { icon: GlobeAmericasIcon, label: 'Amerika', value: 'amerika' },
      { icon: GlobeAltIcon, label: 'Lainnya', value: 'lainnya' },
    ],
  },
  {
    id: 3,
    category: 'PROFIL PEMOHON',
    question: 'Apa pekerjaan kamu saat ini?',
    options: [
      { icon: BuildingOfficeIcon, label: 'Karyawan Swasta / PNS', value: 'karyawan' },
      { icon: BriefcaseIcon, label: 'Wiraswasta / Freelancer', value: 'wiraswasta' },
      { icon: AcademicCapIcon, label: 'Pelajar / Mahasiswa', value: 'pelajar' },
      { icon: HomeIcon, label: 'Ibu Rumah Tangga / Lainnya', value: 'lainnya' },
    ],
  },
  {
    id: 4,
    category: 'KEUANGAN',
    question: 'Berapa estimasi saldo rekening kamu saat ini?',
    options: [
      { icon: CurrencyDollarIcon, label: 'Di bawah Rp 10 juta', value: 'below_10m' },
      { icon: BanknotesIcon, label: 'Rp 10–30 juta', value: '10_30m' },
      { icon: DiamondIcon, label: 'Rp 30–100 juta', value: '30_100m' },
      { icon: BuildingLibraryIcon, label: 'Di atas Rp 100 juta', value: 'above_100m' },
    ],
  },
  {
    id: 5,
    category: 'DOKUMEN',
    question: 'Sudah punya paspor yang masih berlaku?',
    options: [
      { icon: CheckCircleIcon, label: 'Sudah, berlaku > 1 tahun', value: 'valid_1year' },
      { icon: ExclamationTriangleIcon, label: 'Sudah, tapi < 6 bulan lagi', value: 'valid_6months' },
      { icon: XCircleIcon, label: 'Belum punya paspor', value: 'no_passport' },
      { icon: ArrowPathIcon, label: 'Sedang dalam proses', value: 'in_process' },
    ],
  },
  {
    id: 6,
    category: 'RIWAYAT VISA',
    question: 'Pernah punya visa ke negara tujuan sebelumnya?',
    options: [
      { icon: DocumentCheckIcon, label: 'Pernah, masih aktif', value: 'active' },
      { icon: ClipboardDocumentListIcon, label: 'Pernah, sudah expired', value: 'expired' },
      { icon: SparklesIcon, label: 'Belum pernah sama sekali', value: 'never' },
    ],
  },
  {
    id: 7,
    category: 'WAKTU KEBERANGKATAN',
    question: 'Kapan rencana keberangkatanmu?',
    options: [
      { icon: BoltIcon, label: '< 2 minggu lagi', value: 'urgent' },
      { icon: CalendarDaysIcon, label: '1–3 bulan lagi', value: '1_3months' },
      { icon: CalendarIcon, label: '3–6 bulan lagi', value: '3_6months' },
      { icon: SunIcon, label: 'Belum pasti / planning', value: 'planning' },
    ],
  },
  {
    id: 8,
    category: 'DURASI PERJALANAN',
    question: 'Berapa lama kamu akan di sana?',
    options: [
      { icon: RocketLaunchIcon, label: '1–2 minggu', value: '1_2weeks' },
      { icon: MapIcon, label: '3–4 minggu', value: '3_4weeks' },
      { icon: CalendarDaysIcon, label: '1–3 bulan', value: '1_3months' },
      { icon: HomeModernIcon, label: 'Lebih dari 3 bulan', value: 'over_3months' },
    ],
  },
];
