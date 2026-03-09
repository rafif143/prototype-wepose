export interface VisaData {
  slug: string;
  name: string;
  country: string;
  flag: string;
  type: string;
  coverImage: string;
  processDays: string;
  stayDuration: string;
  validity: string;
  area: string;
  priceBase: number;
  priceDisplay: string;
  coverGradient: string;
  addons: Array<{
    id: number;
    name: string;
    price: number;
    icon: string;
    badge?: string;
    description: string;
  }>;
  description: string[];
  timeline: Array<{
    status: 'completed' | 'active' | 'pending';
    title: string;
    description: string;
  }>;
  requirements: {
    [key: string]: Array<{
      name: string;
      required: boolean;
      description?: string;
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const visaDatabase: Record<string, VisaData> = {
  "france-schengen-tourist": {
    slug: "france-schengen-tourist",
    name: "France Schengen Tourist",
    country: "Prancis",
    flag: "🇫🇷",
    type: "Tourist",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    processDays: "15–20 Hari Kerja",
    stayDuration: "90 Hari",
    validity: "3 Bulan",
    area: "27 Negara Schengen",
    priceBase: 1850000,
    priceDisplay: "Rp 1.850.000",
    coverGradient: "linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 50%, #002395 100%)",
    description: [
      "Schengen Tourist Visa memungkinkan kamu mengunjungi 27 negara area Schengen dalam satu visa. Visa ini berlaku selama 90 hari dalam periode 180 hari.",
      "Dengan visa Schengen, kamu bisa bebas berpergian antar negara Schengen tanpa perlu visa tambahan. Cocok untuk liburan, kunjungan keluarga, atau perjalanan bisnis singkat.",
      "Proses pengajuan visa Schengen memerlukan dokumen lengkap dan appointment ke kedutaan. Tim Wepose akan membantu mempersiapkan semua dokumen dan mengurus appointment untuk kamu."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen ke vault' },
      { status: 'completed', title: 'Verifikasi Dokumen', description: 'Tim kami memeriksa kelengkapan dokumen (1–2 hari kerja)' },
      { status: 'active', title: 'Pengajuan ke Kedutaan', description: 'Dokumen dikirim ke Kedutaan Prancis' },
      { status: 'pending', title: 'Proses di Kedutaan', description: 'Kedutaan memproses permohonan (10–15 hari kerja)' },
      { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
    ],
    addons: [
      { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen oleh penerjemah tersumpah" },
      { id: 2, name: "Hotel Dummy Booking", price: 75000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel sebagai bukti akomodasi" },
      { id: 3, name: "Apostille Dokumen", price: 899000, icon: "StarIcon", badge: "OPSIONAL", description: "Legalisasi dokumen resmi" },
      { id: 4, name: "Asuransi Perjalanan Schengen", price: 350000, icon: "ShieldCheckIcon", badge: "WAJIB SCHENGEN", description: "Asuransi min. 30.000 EUR" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true, description: "Paspor harus memiliki minimal 2 halaman kosong" },
        { name: "Foto 3x4 background putih terbaru", required: true },
        { name: "KTP asli", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 20-30 juta" },
        { name: "Slip gaji 3 bulan terakhir", required: true }
      ],
      "Dokumen Perjalanan": [
        { name: "Tiket pesawat PP (bisa dummy)", required: true },
        { name: "Booking hotel / itinerary", required: true },
        { name: "Asuransi perjalanan min. 30.000 EUR", required: true }
      ]
    },
    faqs: [
      { question: "Apakah saya perlu appointment ke kedutaan?", answer: "Tidak perlu. Wepose akan mengurus appointment dan pengiriman dokumen ke kedutaan." },
      { question: "Berapa lama visa France Schengen berlaku?", answer: "Visa berlaku maksimal 90 hari dalam 180 hari, tergantung keputusan kedutaan." }
    ]
  },
  "japan-tourist": {
    slug: "japan-tourist",
    name: "Japan Tourist Visa",
    country: "Jepang",
    flag: "🇯🇵",
    type: "Tourist",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    processDays: "7–10 Hari Kerja",
    stayDuration: "15 Hari",
    validity: "3 Bulan",
    area: "Jepang",
    priceBase: 950000,
    priceDisplay: "Rp 950.000",
    coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
    description: [
      "Visa turis Jepang memungkinkan kamu menjelajahi negeri sakura selama 15 hari. Proses cepat dan mudah dengan tingkat approval tinggi.",
      "Jepang menawarkan pengalaman unik dari budaya tradisional hingga teknologi modern. Visa ini cocok untuk liburan, mengunjungi keluarga, atau wisata kuliner."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
      { status: 'active', title: 'Verifikasi Dokumen', description: 'Tim kami memeriksa kelengkapan (1 hari kerja)' },
      { status: 'pending', title: 'Proses di Kedutaan', description: 'Kedutaan Jepang memproses (5–7 hari kerja)' },
      { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
    ],
    addons: [
      { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
      { id: 2, name: "Hotel Booking Jepang", price: 100000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Jepang" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
        { name: "Foto 4x6 background putih", required: true },
        { name: "KTP asli", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 15 juta" },
        { name: "Slip gaji 3 bulan terakhir", required: true }
      ]
    },
    faqs: [
      { question: "Berapa lama visa Jepang berlaku?", answer: "Visa berlaku 15 hari sejak tanggal kedatangan di Jepang." },
      { question: "Apakah bisa extend visa di Jepang?", answer: "Visa turis tidak bisa diperpanjang. Harus apply visa baru dari Indonesia." }
    ]
  },
  "korea-tourist": {
    slug: "korea-tourist",
    name: "Korea Tourist Visa",
    country: "Korea Selatan",
    flag: "🇰🇷",
    type: "Tourist",
    coverImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
    processDays: "5–7 Hari Kerja",
    stayDuration: "30 Hari",
    validity: "3 Bulan",
    area: "Korea Selatan",
    priceBase: 850000,
    priceDisplay: "Rp 850.000",
    coverGradient: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
    description: [
      "Visa turis Korea Selatan memungkinkan kamu menjelajahi negeri ginseng selama 30 hari. Proses tercepat dengan approval rate tinggi.",
      "Korea Selatan menawarkan K-culture, kuliner, shopping, dan pemandangan indah. Cocok untuk liburan, K-pop tour, atau wisata kuliner."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
      { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Korea memproses (3–5 hari kerja)' },
      { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
    ],
    addons: [
      { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
      { id: 2, name: "Hotel Booking Korea", price: 100000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Korea" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
        { name: "Foto 3x4 background putih", required: true },
        { name: "KTP asli", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 10 juta" }
      ]
    },
    faqs: [
      { question: "Berapa lama visa Korea berlaku?", answer: "Visa berlaku 30 hari sejak tanggal kedatangan di Korea." }
    ]
  },
  "australia-tourist": {
    slug: "australia-tourist",
    name: "Australia Tourist Visa",
    country: "Australia",
    flag: "🇦🇺",
    type: "Tourist",
    coverImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    processDays: "10–15 Hari Kerja",
    stayDuration: "3 Bulan",
    validity: "1 Tahun",
    area: "Australia",
    priceBase: 1250000,
    priceDisplay: "Rp 1.250.000",
    coverGradient: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
    description: [
      "E-Visa Australia memungkinkan kamu menjelajahi negeri kanguru selama 3 bulan. Proses online tanpa perlu ke kedutaan.",
      "Australia menawarkan alam yang indah, kota modern, dan Great Barrier Reef. Cocok untuk liburan, mengunjungi keluarga, atau road trip."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
      { status: 'active', title: 'Proses E-Visa', description: 'Imigrasi Australia memproses (7–12 hari kerja)' },
      { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
    ],
    addons: [
      { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
        { name: "Foto digital background putih", required: true },
        { name: "KTP scan", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 25 juta" }
      ]
    },
    faqs: [
      { question: "Apakah visa Australia e-visa?", answer: "Ya, visa Australia adalah e-visa yang dikirim via email." }
    ]
  },
  "usa-b1-b2": {
    slug: "usa-b1-b2",
    name: "USA B1/B2 Visa",
    country: "Amerika Serikat",
    flag: "🇺🇸",
    type: "B1/B2",
    coverImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop",
    processDays: "30–60 Hari Kerja",
    stayDuration: "6 Bulan",
    validity: "10 Tahun",
    area: "Amerika Serikat",
    priceBase: 3500000,
    priceDisplay: "Rp 3.500.000",
    coverGradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
    description: [
      "Visa B1/B2 Amerika Serikat berlaku 10 tahun dengan multiple entry. Cocok untuk bisnis dan turis.",
      "Proses memerlukan wawancara di kedutaan. Tim Wepose akan membantu persiapan dokumen dan interview coaching."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi DS-160 dan upload dokumen' },
      { status: 'active', title: 'Appointment Wawancara', description: 'Jadwal wawancara di kedutaan' },
      { status: 'pending', title: 'Wawancara', description: 'Interview di kedutaan Amerika' },
      { status: 'pending', title: 'Proses Visa', description: 'Kedutaan memproses (5–10 hari kerja)' }
    ],
    addons: [
      { id: 1, name: "Interview Coaching", price: 500000, icon: "DocumentTextIcon", badge: "POPULER", description: "Coaching persiapan wawancara" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
        { name: "Foto 5x5 background putih", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 6 bulan terakhir", required: true, description: "Saldo minimal Rp 50 juta" }
      ]
    },
    faqs: [
      { question: "Berapa lama visa USA berlaku?", answer: "Visa B1/B2 berlaku 10 tahun dengan multiple entry." }
    ]
  },
  "uk-standard": {
    slug: "uk-standard",
    name: "UK Standard Visitor Visa",
    country: "Inggris",
    flag: "🇬🇧",
    type: "Standard",
    coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    processDays: "20–30 Hari Kerja",
    stayDuration: "6 Bulan",
    validity: "6 Bulan",
    area: "United Kingdom",
    priceBase: 2100000,
    priceDisplay: "Rp 2.100.000",
    coverGradient: "linear-gradient(135deg, #B45309 0%, #92400E 100%)",
    description: [
      "UK Standard Visitor Visa memungkinkan kamu mengunjungi Inggris selama 6 bulan. Cocok untuk turis, bisnis, atau mengunjungi keluarga.",
      "Proses memerlukan biometric appointment. Tim Wepose akan membantu persiapan dokumen dan booking biometric."
    ],
    timeline: [
      { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
      { status: 'active', title: 'Biometric Appointment', description: 'Jadwal biometric di VFS' },
      { status: 'pending', title: 'Proses Visa', description: 'UK Visa memproses (15–20 hari kerja)' }
    ],
    addons: [
      { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
    ],
    requirements: {
      "Dokumen Pribadi": [
        { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
        { name: "Foto digital background putih", required: true }
      ],
      "Dokumen Keuangan": [
        { name: "Rekening koran 6 bulan terakhir", required: true, description: "Saldo minimal Rp 30 juta" }
      ]
    },
    faqs: [
      { question: "Berapa lama visa UK berlaku?", answer: "Visa berlaku 6 bulan sejak tanggal terbit." }
    ]
  }
};

export const visaData = visaDatabase["france-schengen-tourist"];
