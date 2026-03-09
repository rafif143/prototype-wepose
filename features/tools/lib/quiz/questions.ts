// Quiz data structure and questions for Visa Eligibility Quiz

export interface QuizOption {
  icon: string;
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
      { icon: '✈️', label: 'Wisata & Liburan', value: 'wisata' },
      { icon: '💼', label: 'Bisnis & Konferensi', value: 'bisnis' },
      { icon: '🎓', label: 'Studi & Pendidikan', value: 'studi' },
      { icon: '👨‍👩‍👧', label: 'Kunjungan Keluarga', value: 'keluarga' },
    ],
  },
  {
    id: 2,
    category: 'DESTINASI',
    question: 'Ke region mana kamu mau pergi?',
    options: [
      { icon: '🌍', label: 'Eropa / Schengen', value: 'eropa' },
      { icon: '🌏', label: 'Asia Timur', value: 'asia' },
      { icon: '🌎', label: 'Amerika', value: 'amerika' },
      { icon: '🌐', label: 'Lainnya', value: 'lainnya' },
    ],
  },
  {
    id: 3,
    category: 'PROFIL PEMOHON',
    question: 'Apa pekerjaan kamu saat ini?',
    options: [
      { icon: '👔', label: 'Karyawan Swasta / PNS', value: 'karyawan' },
      { icon: '💼', label: 'Wiraswasta / Freelancer', value: 'wiraswasta' },
      { icon: '🎓', label: 'Pelajar / Mahasiswa', value: 'pelajar' },
      { icon: '🏠', label: 'Ibu Rumah Tangga / Lainnya', value: 'lainnya' },
    ],
  },
  {
    id: 4,
    category: 'KEUANGAN',
    question: 'Berapa estimasi saldo rekening kamu saat ini?',
    options: [
      { icon: '💰', label: 'Di bawah Rp 10 juta', value: 'below_10m' },
      { icon: '💵', label: 'Rp 10–30 juta', value: '10_30m' },
      { icon: '💎', label: 'Rp 30–100 juta', value: '30_100m' },
      { icon: '🏦', label: 'Di atas Rp 100 juta', value: 'above_100m' },
    ],
  },
  {
    id: 5,
    category: 'DOKUMEN',
    question: 'Sudah punya paspor yang masih berlaku?',
    options: [
      { icon: '✅', label: 'Sudah, berlaku > 1 tahun', value: 'valid_1year' },
      { icon: '⚠️', label: 'Sudah, tapi < 6 bulan lagi', value: 'valid_6months' },
      { icon: '❌', label: 'Belum punya paspor', value: 'no_passport' },
      { icon: '🔄', label: 'Sedang dalam proses', value: 'in_process' },
    ],
  },
  {
    id: 6,
    category: 'RIWAYAT VISA',
    question: 'Pernah punya visa ke negara tujuan sebelumnya?',
    options: [
      { icon: '✅', label: 'Pernah, masih aktif', value: 'active' },
      { icon: '📋', label: 'Pernah, sudah expired', value: 'expired' },
      { icon: '🆕', label: 'Belum pernah sama sekali', value: 'never' },
    ],
  },
  {
    id: 7,
    category: 'WAKTU KEBERANGKATAN',
    question: 'Kapan rencana keberangkatanmu?',
    options: [
      { icon: '⚡', label: '< 2 minggu lagi', value: 'urgent' },
      { icon: '📅', label: '1–3 bulan lagi', value: '1_3months' },
      { icon: '🗓️', label: '3–6 bulan lagi', value: '3_6months' },
      { icon: '🌅', label: 'Belum pasti / planning', value: 'planning' },
    ],
  },
  {
    id: 8,
    category: 'DURASI PERJALANAN',
    question: 'Berapa lama kamu akan di sana?',
    options: [
      { icon: '🚀', label: '1–2 minggu', value: '1_2weeks' },
      { icon: '🗺️', label: '3–4 minggu', value: '3_4weeks' },
      { icon: '📆', label: '1–3 bulan', value: '1_3months' },
      { icon: '🏠', label: 'Lebih dari 3 bulan', value: 'over_3months' },
    ],
  },
];
