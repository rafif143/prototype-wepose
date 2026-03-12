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
  "schengen-prancis": {
    slug: "schengen-prancis",
    name: "France Schengen Tourist",
    country: "Prancis",
    flag: "🇫🇷",
    type: "Schengen",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    processDays: "7–14 Hari Kerja",
    stayDuration: "90 Hari",
    validity: "90 Hari",
    area: "27 Negara Schengen",
    priceBase: 1350000,
    priceDisplay: "Rp 1.350.000",
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
      { question: "Berapa lama visa France Schengen berlaku?", answer: "Visa berlaku maksimal 90 hari dalam 180 hari, tergantung keputusan kedutaan." },
      { question: "Apakah bisa extend visa Schengen?", answer: "Visa Schengen tidak bisa diperpanjang. Harus keluar dari area Schengen dan apply visa baru." }
    ]
  }
};

export const visaData = visaDatabase["schengen-prancis"];
// Add remaining visa entries
visaDatabase["schengen-jerman"] = {
  slug: "schengen-jerman",
  name: "Germany Schengen Tourist",
  country: "Jerman",
  flag: "🇩🇪",
  type: "Schengen",
  coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
  processDays: "7–14 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "90 Hari",
  area: "27 Negara Schengen",
  priceBase: 1500000,
  priceDisplay: "Rp 1.500.000",
  coverGradient: "linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 50%, #002395 100%)",
  description: [
    "Visa Schengen Jerman memungkinkan kamu mengunjungi 27 negara area Schengen dalam satu visa.",
    "Jerman sebagai negara terbesar di Eropa menawarkan sejarah, budaya, dan teknologi yang menarik.",
    "Nikmati Berlin, Munich, Hamburg, dan kota-kota bersejarah lainnya dengan satu visa Schengen."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Jerman memproses (7–14 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Hotel Booking", price: 75000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Jerman" },
    { id: 3, name: "Asuransi Perjalanan Schengen", price: 350000, icon: "ShieldCheckIcon", badge: "WAJIB", description: "Asuransi min. 30.000 EUR" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true },
      { name: "KTP asli", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 20-30 juta" },
      { name: "Slip gaji 3 bulan terakhir", required: true }
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Booking hotel / itinerary", required: true },
      { name: "Asuransi perjalanan min. 30.000 EUR", required: true }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Schengen Jerman berlaku?", answer: "Visa berlaku maksimal 90 hari dalam 180 hari." },
    { question: "Apakah bisa mengunjungi negara Schengen lain?", answer: "Ya, dengan visa Schengen Jerman kamu bisa mengunjungi 27 negara Schengen." }
  ]
};
visaDatabase["schengen-italia"] = {
  slug: "schengen-italia",
  name: "Italy Schengen Tourist",
  country: "Italia",
  flag: "🇮🇹",
  type: "Schengen",
  coverImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
  processDays: "7–14 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "90 Hari",
  area: "27 Negara Schengen",
  priceBase: 1500000,
  priceDisplay: "Rp 1.500.000",
  coverGradient: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
  description: [
    "Visa Schengen Italia memungkinkan kamu menjelajahi negeri pasta dan pizza dengan bebas.",
    "Italia menawarkan sejarah kuno, seni Renaissance, dan kuliner yang mendunia.",
    "Kunjungi Roma, Florence, Venice, dan Milan dengan satu visa Schengen."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Italia memproses (7–14 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Hotel Booking Italia", price: 80000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Italia" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true },
      { name: "KTP asli", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 20-30 juta" }
    ]
  },
  faqs: [
    { question: "Apakah visa Italia bisa untuk negara Schengen lain?", answer: "Ya, visa Schengen Italia berlaku untuk 27 negara Schengen." }
  ]
};

visaDatabase["schengen-belanda"] = {
  slug: "schengen-belanda",
  name: "Netherlands Schengen Tourist",
  country: "Belanda",
  flag: "🇳🇱",
  type: "Schengen",
  coverImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
  processDays: "7–14 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "90 Hari",
  area: "27 Negara Schengen",
  priceBase: 1500000,
  priceDisplay: "Rp 1.500.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "Visa Schengen Belanda untuk menjelajahi negeri kincir angin dan tulip.",
    "Belanda menawarkan Amsterdam yang indah, museum kelas dunia, dan budaya yang unik."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Belanda memproses (7–14 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 20-30 juta" }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Belanda berlaku?", answer: "Visa berlaku maksimal 90 hari dalam 180 hari." }
  ]
};
visaDatabase["schengen-spanyol"] = {
  slug: "schengen-spanyol",
  name: "Spain Schengen Tourist",
  country: "Spanyol",
  flag: "🇪🇸",
  type: "Schengen",
  coverImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80",
  processDays: "7–14 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "90 Hari",
  area: "27 Negara Schengen",
  priceBase: 1200000,
  priceDisplay: "Rp 1.200.000",
  coverGradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  description: [
    "Visa Schengen Spanyol untuk menjelajahi negeri matador dan flamenco.",
    "Spanyol menawarkan Barcelona yang menawan, Madrid yang bersejarah, dan pantai-pantai indah."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Spanyol memproses (7–14 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 20-30 juta" }
    ]
  },
  faqs: [
    { question: "Apakah visa Spanyol berlaku untuk negara Schengen lain?", answer: "Ya, visa Schengen Spanyol berlaku untuk 27 negara Schengen." }
  ]
};

visaDatabase["schengen-swiss"] = {
  slug: "schengen-swiss",
  name: "Switzerland Schengen Tourist",
  country: "Swiss",
  flag: "🇨🇭",
  type: "Schengen",
  coverImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
  processDays: "7–14 Hari Kerja",
  stayDuration: "90 Hari",
  validity: "90 Hari",
  area: "27 Negara Schengen",
  priceBase: 1500000,
  priceDisplay: "Rp 1.500.000",
  coverGradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
  description: [
    "Visa Schengen Swiss untuk menjelajahi negeri pegunungan Alpen yang menakjubkan.",
    "Swiss menawarkan pemandangan alam yang spektakuler, cokelat terbaik, dan jam berkualitas tinggi."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Swiss memproses (7–14 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 25-35 juta" }
    ]
  },
  faqs: [
    { question: "Apakah Swiss termasuk negara Schengen?", answer: "Ya, Swiss adalah bagian dari area Schengen meskipun bukan anggota EU." }
  ]
};
visaDatabase["uk-inggris"] = {
  slug: "uk-inggris",
  name: "UK Standard Visitor Visa",
  country: "Inggris (UK)",
  flag: "🇬🇧",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  processDays: "15–21 Hari Kerja",
  stayDuration: "6 Bulan",
  validity: "180 Hari",
  area: "United Kingdom",
  priceBase: 2000000,
  priceDisplay: "Rp 2.000.000",
  coverGradient: "linear-gradient(135deg, #B45309 0%, #92400E 100%)",
  description: [
    "UK Standard Visitor Visa memungkinkan kamu mengunjungi Inggris selama 6 bulan.",
    "Jelajahi London, Edinburgh, dan kota-kota bersejarah lainnya di United Kingdom.",
    "Nikmati budaya Inggris, museum kelas dunia, dan pemandangan countryside yang indah."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Biometric Appointment', description: 'Jadwal biometric di VFS' },
    { status: 'pending', title: 'Proses Visa', description: 'UK Visa memproses (15–20 hari kerja)' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Priority Service", price: 500000, icon: "ClockIcon", badge: "OPSIONAL", description: "Proses lebih cepat 5-10 hari kerja" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto digital background putih", required: true },
      { name: "KTP asli", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 6 bulan terakhir", required: true, description: "Saldo minimal Rp 30 juta" },
      { name: "Slip gaji 6 bulan terakhir", required: true }
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Hotel booking", required: true }
    ]
  },
  faqs: [
    { question: "Berapa lama visa UK berlaku?", answer: "Visa berlaku 6 bulan sejak tanggal terbit." },
    { question: "Apakah perlu biometric?", answer: "Ya, semua applicant harus melakukan biometric di VFS Global." }
  ]
};

visaDatabase["jepang-tourist"] = {
  slug: "jepang-tourist",
  name: "Japan Tourist Visa",
  country: "Jepang",
  flag: "🇯🇵",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
  processDays: "5–7 Hari Kerja",
  stayDuration: "15 Hari",
  validity: "90 Hari",
  area: "Jepang",
  priceBase: 650000,
  priceDisplay: "Rp 650.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "Visa turis Jepang memungkinkan kamu menjelajahi negeri sakura selama 15 hari. Proses cepat dan mudah dengan tingkat approval tinggi.",
    "Jepang menawarkan pengalaman unik dari budaya tradisional hingga teknologi modern. Visa ini cocok untuk liburan, mengunjungi keluarga, atau wisata kuliner.",
    "Dengan visa Jepang, kamu bisa mengunjungi Tokyo, Osaka, Kyoto, dan kota-kota menarik lainnya. Nikmati sakura, onsen, dan kuliner autentik Jepang."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Verifikasi Dokumen', description: 'Tim kami memeriksa kelengkapan (1 hari kerja)' },
    { status: 'pending', title: 'Proses di Kedutaan', description: 'Kedutaan Jepang memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Hotel Booking Jepang", price: 100000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Jepang" },
    { id: 3, name: "JR Pass Booking", price: 200000, icon: "MapIcon", badge: "OPSIONAL", description: "Japan Rail Pass untuk transportasi" }
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
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Itinerary perjalanan", required: true }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Jepang berlaku?", answer: "Visa berlaku 15 hari sejak tanggal kedatangan di Jepang." },
    { question: "Apakah bisa extend visa di Jepang?", answer: "Visa turis tidak bisa diperpanjang. Harus apply visa baru dari Indonesia." },
    { question: "Apakah perlu sponsor di Jepang?", answer: "Tidak perlu sponsor jika dokumen keuangan mencukupi." }
  ]
};
visaDatabase["korea-selatan"] = {
  slug: "korea-selatan",
  name: "Korea Tourist Visa",
  country: "Korea Selatan",
  flag: "🇰🇷",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
  processDays: "5–7 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "90 Hari",
  area: "Korea Selatan",
  priceBase: 650000,
  priceDisplay: "Rp 650.000",
  coverGradient: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
  description: [
    "Visa turis Korea Selatan memungkinkan kamu menjelajahi negeri ginseng selama 30 hari. Proses tercepat dengan approval rate tinggi.",
    "Korea Selatan menawarkan K-culture, kuliner, shopping, dan pemandangan indah. Cocok untuk liburan, K-pop tour, atau wisata kuliner.",
    "Nikmati Seoul, Busan, Jeju Island, dan destinasi menarik lainnya. Rasakan pengalaman K-drama, K-pop, dan Korean BBQ yang autentik."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Korea memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Hotel Booking Korea", price: 100000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Korea" },
    { id: 3, name: "T-money Card", price: 50000, icon: "CreditCardIcon", badge: "OPSIONAL", description: "Kartu transportasi Seoul" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true },
      { name: "KTP asli", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 10 juta" },
      { name: "Slip gaji 3 bulan terakhir", required: false }
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Hotel booking", required: true }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Korea berlaku?", answer: "Visa berlaku 30 hari sejak tanggal kedatangan di Korea." },
    { question: "Apakah bisa visa on arrival?", answer: "Tidak, WNI harus apply visa sebelum berangkat." },
    { question: "Apakah bisa multiple entry?", answer: "Visa turis Korea umumnya single entry." }
  ]
};

visaDatabase["china-tourist"] = {
  slug: "china-tourist",
  name: "China Tourist Visa",
  country: "China",
  flag: "🇨🇳",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80",
  processDays: "7–10 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "30 Hari",
  area: "China",
  priceBase: 900000,
  priceDisplay: "Rp 900.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "Visa turis China memungkinkan kamu menjelajahi negeri tirai bambu selama 30 hari.",
    "China menawarkan sejarah ribuan tahun, Great Wall, dan kota-kota modern seperti Shanghai dan Beijing."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan China memproses (7–10 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 3x4 background putih", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 15 juta" }
    ]
  },
  faqs: [
    { question: "Berapa lama visa China berlaku?", answer: "Visa berlaku 30 hari sejak tanggal kedatangan di China." }
  ]
};
visaDatabase["singapura"] = {
  slug: "singapura",
  name: "Singapore Tourist Visa",
  country: "Singapura",
  flag: "🇸🇬",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  processDays: "3–5 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "30 Hari",
  area: "Singapura",
  priceBase: 500000,
  priceDisplay: "Rp 500.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "Visa turis Singapura untuk menjelajahi negara kota yang modern dan multikultural.",
    "Singapura menawarkan kuliner yang beragam, shopping, dan atraksi wisata kelas dunia."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Proses E-Visa', description: 'Imigrasi Singapura memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
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
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 10 juta" }
    ]
  },
  faqs: [
    { question: "Apakah visa Singapura e-visa?", answer: "Ya, visa Singapura adalah e-visa yang dikirim via email." }
  ]
};

visaDatabase["thailand"] = {
  slug: "thailand",
  name: "Thailand Tourist Visa",
  country: "Thailand",
  flag: "🇹🇭",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  processDays: "3–5 Hari Kerja",
  stayDuration: "60 Hari",
  validity: "60 Hari",
  area: "Thailand",
  priceBase: 450000,
  priceDisplay: "Rp 450.000",
  coverGradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  description: [
    "Visa turis Thailand untuk menjelajahi negeri gajah putih yang eksotis.",
    "Thailand menawarkan pantai indah, kuil-kuil bersejarah, dan kuliner yang menggugah selera."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi form dan upload dokumen' },
    { status: 'active', title: 'Proses di Kedutaan', description: 'Kedutaan Thailand memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'Paspor Siap Diambil', description: 'Notifikasi dikirim saat paspor siap' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 4x6 background putih", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 8 juta" }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Thailand berlaku?", answer: "Visa berlaku 60 hari sejak tanggal kedatangan di Thailand." }
  ]
};

visaDatabase["malaysia"] = {
  slug: "malaysia",
  name: "Malaysia Tourist Visa",
  country: "Malaysia",
  flag: "🇲🇾",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
  processDays: "3–5 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "30 Hari",
  area: "Malaysia",
  priceBase: 450000,
  priceDisplay: "Rp 450.000",
  coverGradient: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
  description: [
    "Visa turis Malaysia untuk menjelajahi negeri jiran yang kaya budaya.",
    "Malaysia menawarkan Kuala Lumpur yang modern, Penang yang bersejarah, dan alam Borneo yang eksotis."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Proses E-Visa', description: 'Imigrasi Malaysia memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
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
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 8 juta" }
    ]
  },
  faqs: [
    { question: "Apakah visa Malaysia e-visa?", answer: "Ya, visa Malaysia adalah e-visa yang dikirim via email." }
  ]
};
visaDatabase["amerika-serikat"] = {
  slug: "amerika-serikat",
  name: "USA B1/B2 Visa",
  country: "Amerika Serikat",
  flag: "🇺🇸",
  type: "B1/B2",
  coverImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop",
  processDays: "30–60 Hari Kerja",
  stayDuration: "6 Bulan",
  validity: "10 Tahun",
  area: "Amerika Serikat",
  priceBase: 3000000,
  priceDisplay: "Rp 3.000.000",
  coverGradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
  description: [
    "Visa B1/B2 Amerika Serikat berlaku 10 tahun dengan multiple entry. Cocok untuk bisnis dan turis.",
    "Proses memerlukan wawancara di kedutaan. Tim Wepose akan membantu persiapan dokumen dan interview coaching.",
    "Dengan visa USA, kamu bisa mengunjungi New York, Los Angeles, Las Vegas, dan kota-kota ikonik lainnya. Nikmati pengalaman American dream yang sesungguhnya."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan & Upload Dokumen', description: 'Lengkapi DS-160 dan upload dokumen' },
    { status: 'active', title: 'Appointment Wawancara', description: 'Jadwal wawancara di kedutaan' },
    { status: 'pending', title: 'Wawancara', description: 'Interview di kedutaan Amerika' },
    { status: 'pending', title: 'Proses Visa', description: 'Kedutaan memproses (5–10 hari kerja)' }
  ],
  addons: [
    { id: 1, name: "Interview Coaching", price: 500000, icon: "DocumentTextIcon", badge: "POPULER", description: "Coaching persiapan wawancara" },
    { id: 2, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto 5x5 background putih", required: true },
      { name: "KTP asli", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 6 bulan terakhir", required: true, description: "Saldo minimal Rp 50 juta" },
      { name: "Slip gaji 6 bulan terakhir", required: true },
      { name: "SPT Tahunan", required: true }
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Hotel booking", required: true },
      { name: "Itinerary detail", required: true }
    ]
  },
  faqs: [
    { question: "Berapa lama visa USA berlaku?", answer: "Visa B1/B2 berlaku 10 tahun dengan multiple entry." },
    { question: "Apakah wajib interview?", answer: "Ya, semua applicant harus interview di kedutaan Amerika." },
    { question: "Berapa tingkat approval visa USA?", answer: "Tingkat approval sekitar 80-85% dengan dokumen yang lengkap dan persiapan yang baik." }
  ]
};

visaDatabase["kanada"] = {
  slug: "kanada",
  name: "Canada Tourist Visa",
  country: "Kanada",
  flag: "🇨🇦",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
  processDays: "15–30 Hari Kerja",
  stayDuration: "6 Bulan",
  validity: "180 Hari",
  area: "Kanada",
  priceBase: 2500000,
  priceDisplay: "Rp 2.500.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "Visa turis Kanada memungkinkan kamu menjelajahi negeri maple leaf yang indah.",
    "Kanada menawarkan alam yang spektakuler, kota-kota modern, dan budaya multikultural yang ramah."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Biometric Appointment', description: 'Jadwal biometric di VFS' },
    { status: 'pending', title: 'Proses Visa', description: 'IRCC memproses (15–30 hari kerja)' }
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
      { name: "Rekening koran 6 bulan terakhir", required: true, description: "Saldo minimal Rp 40 juta" }
    ]
  },
  faqs: [
    { question: "Berapa lama visa Kanada berlaku?", answer: "Visa berlaku 6 bulan sejak tanggal kedatangan di Kanada." }
  ]
};
visaDatabase["australia"] = {
  slug: "australia",
  name: "Australia Tourist Visa",
  country: "Australia",
  flag: "🇦🇺",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
  processDays: "10–15 Hari Kerja",
  stayDuration: "3 Bulan",
  validity: "12 Bulan",
  area: "Australia",
  priceBase: 1850000,
  priceDisplay: "Rp 1.850.000",
  coverGradient: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
  description: [
    "E-Visa Australia memungkinkan kamu menjelajahi negeri kanguru selama 3 bulan. Proses online tanpa perlu ke kedutaan.",
    "Australia menawarkan alam yang indah, kota modern, dan Great Barrier Reef. Cocok untuk liburan, mengunjungi keluarga, atau road trip.",
    "Jelajahi Sydney, Melbourne, Brisbane, dan destinasi menakjubkan lainnya. Nikmati pantai indah, wildlife unik, dan budaya multikultural Australia."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Proses E-Visa', description: 'Imigrasi Australia memproses (7–12 hari kerja)' },
    { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
  ],
  addons: [
    { id: 1, name: "Translate Dokumen Tersumpah", price: 150000, icon: "DocumentTextIcon", badge: "POPULER", description: "Terjemahan dokumen tersumpah" },
    { id: 2, name: "Hotel Booking Australia", price: 120000, icon: "BuildingOffice2Icon", badge: "POPULER", description: "Booking hotel di Australia" }
  ],
  requirements: {
    "Dokumen Pribadi": [
      { name: "Paspor asli (berlaku min. 6 bulan)", required: true },
      { name: "Foto digital background putih", required: true },
      { name: "KTP scan", required: true }
    ],
    "Dokumen Keuangan": [
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 25 juta" },
      { name: "Slip gaji 3 bulan terakhir", required: true }
    ],
    "Dokumen Perjalanan": [
      { name: "Tiket pesawat PP", required: true },
      { name: "Itinerary perjalanan", required: true }
    ]
  },
  faqs: [
    { question: "Apakah visa Australia e-visa?", answer: "Ya, visa Australia adalah e-visa yang dikirim via email." },
    { question: "Berapa lama visa Australia berlaku?", answer: "Visa berlaku 12 bulan dengan multiple entry, stay maksimal 3 bulan per kunjungan." },
    { question: "Apakah perlu medical check-up?", answer: "Tidak perlu untuk visa turis jangka pendek." }
  ]
};

visaDatabase["dubai-uae"] = {
  slug: "dubai-uae",
  name: "Dubai UAE Tourist Visa",
  country: "Dubai (UAE)",
  flag: "🇦🇪",
  type: "Tourist",
  coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  processDays: "3–5 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "60 Hari",
  area: "UAE",
  priceBase: 1200000,
  priceDisplay: "Rp 1.200.000",
  coverGradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  description: [
    "Visa turis Dubai UAE untuk menjelajahi kota futuristik di gurun pasir.",
    "Dubai menawarkan kemewahan, shopping, dan arsitektur yang menakjubkan seperti Burj Khalifa."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Proses E-Visa', description: 'Imigrasi UAE memproses (3–5 hari kerja)' },
    { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
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
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 15 juta" }
    ]
  },
  faqs: [
    { question: "Apakah visa Dubai e-visa?", answer: "Ya, visa Dubai adalah e-visa yang dikirim via email." }
  ]
};

visaDatabase["turki"] = {
  slug: "turki",
  name: "Turkey E-Visa",
  country: "Turki",
  flag: "🇹🇷",
  type: "E-Visa",
  coverImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  processDays: "1–3 Hari Kerja",
  stayDuration: "30 Hari",
  validity: "180 Hari",
  area: "Turki",
  priceBase: 800000,
  priceDisplay: "Rp 800.000",
  coverGradient: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
  description: [
    "E-Visa Turki untuk menjelajahi negara yang menghubungkan Eropa dan Asia.",
    "Turki menawarkan Istanbul yang bersejarah, Cappadocia yang unik, dan pantai Mediterranean yang indah."
  ],
  timeline: [
    { status: 'completed', title: 'Pengajuan Online', description: 'Lengkapi form online dan upload dokumen' },
    { status: 'active', title: 'Proses E-Visa', description: 'Sistem otomatis memproses (1–3 hari kerja)' },
    { status: 'pending', title: 'E-Visa Terbit', description: 'E-Visa dikirim via email' }
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
      { name: "Rekening koran 3 bulan terakhir", required: true, description: "Saldo minimal Rp 12 juta" }
    ]
  },
  faqs: [
    { question: "Berapa lama e-visa Turki berlaku?", answer: "E-visa berlaku 180 hari dengan stay maksimal 30 hari." }
  ]
};