"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  BookOpenIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: React.ComponentType<any>;
}

const mockFAQs: FAQ[] = [
  {
    id: "faq-001",
    question: "Berapa lama proses visa biasanya?",
    answer: "Waktu proses visa bervariasi tergantung negara tujuan. Umumnya berkisar 7-30 hari kerja. Visa Schengen biasanya 15-20 hari, Jepang dan Korea 7-10 hari, sedangkan Australia dan Amerika bisa 2-4 minggu.",
    category: "Proses Visa"
  },
  {
    id: "faq-002",
    question: "Dokumen apa saja yang diperlukan untuk visa?",
    answer: "Dokumen umum meliputi: paspor (berlaku min. 6 bulan), foto, rekening koran 3 bulan terakhir, slip gaji, booking hotel & tiket, asuransi perjalanan, dan surat keterangan kerja. Dokumen spesifik bervariasi per negara.",
    category: "Dokumen"
  },
  {
    id: "faq-003",
    question: "Apakah ada garansi visa disetujui?",
    answer: "Kami tidak dapat menjamin 100% persetujuan visa karena keputusan akhir ada di kedutaan. Namun, tingkat keberhasilan kami sangat tinggi berkat persiapan dokumen yang teliti dan pengalaman tim profesional.",
    category: "Garansi"
  },
  {
    id: "faq-004",
    question: "Bagaimana cara tracking status aplikasi?",
    answer: "Setelah pengajuan, Anda akan mendapat kode tracking unik via email. Gunakan kode ini di halaman tracking kami atau dashboard untuk memantau status aplikasi secara real-time.",
    category: "Tracking"
  },
  {
    id: "faq-005",
    question: "Apakah bisa refund jika visa ditolak?",
    answer: "Kebijakan refund berlaku sesuai terms & conditions. Biaya konsular tidak dapat dikembalikan, namun biaya layanan kami dapat direfund sesuai ketentuan yang berlaku.",
    category: "Pembayaran"
  },
  {
    id: "faq-006",
    question: "Apakah perlu datang ke kantor?",
    answer: "Tidak selalu. Banyak proses dapat dilakukan online. Namun untuk beberapa jenis visa atau konsultasi khusus, kami menyarankan datang ke kantor untuk pelayanan yang lebih personal.",
    category: "Layanan"
  }
];

const helpArticles: HelpArticle[] = [
  {
    id: "article-001",
    title: "Panduan Lengkap Aplikasi Visa Pertama Kali",
    description: "Pelajari langkah-langkah detail untuk mengajukan visa pertama kali",
    category: "Panduan",
    readTime: "5 menit",
    icon: BookOpenIcon
  },
  {
    id: "article-002",
    title: "Tips Mempersiapkan Dokumen Visa",
    description: "Cara mempersiapkan dokumen yang benar dan lengkap",
    category: "Dokumen",
    readTime: "3 menit",
    icon: DocumentTextIcon
  },
  {
    id: "article-003",
    title: "Video Tutorial: Cara Upload Dokumen",
    description: "Tutorial video step-by-step upload dokumen di platform",
    category: "Tutorial",
    readTime: "2 menit",
    icon: VideoCameraIcon
  },
  {
    id: "article-004",
    title: "Mengenal Jenis-Jenis Visa",
    description: "Perbedaan visa tourist, business, dan jenis visa lainnya",
    category: "Informasi",
    readTime: "4 menit",
    icon: BookOpenIcon
  }
];

export function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(mockFAQs.map(faq => faq.category)))];

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactMethods = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Chat langsung dengan tim support",
      action: "Mulai Chat",
      available: "Online 24/7",
      color: "bg-green-50 text-green-600 hover:bg-green-100"
    },
    {
      icon: PhoneIcon,
      title: "Telepon",
      description: "Hubungi customer service",
      action: "+62 21 5555 0001",
      available: "Senin-Jumat 09:00-18:00",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      description: "Kirim pertanyaan via email",
      action: "support@wepose.id",
      available: "Respon dalam 24 jam",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-navy mb-2">
          Pusat Bantuan
        </h1>
        <p className="font-dm-sans text-gray-600">
          Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="relative max-w-2xl mx-auto">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pertanyaan atau topik bantuan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          
          return (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group ${method.color}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-navy">
                    {method.title}
                  </h3>
                  <p className="font-dm-sans text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-poppins font-semibold text-base text-navy">
                  {method.action}
                </p>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <p className="font-dm-sans text-sm text-gray-500">
                    {method.available}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Help Articles */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="font-poppins font-bold text-xl text-navy mb-6">
          Artikel Bantuan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpArticles.map((article, index) => {
            const IconComponent = article.icon;
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-base text-navy group-hover:text-orange transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="font-dm-sans text-sm text-gray-600 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-full font-dm-sans">
                        {article.category}
                      </span>
                      <span className="font-dm-sans">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins font-bold text-xl text-navy">
            Pertanyaan yang Sering Diajukan
          </h2>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl font-dm-sans text-sm focus:border-orange focus:outline-none transition-colors appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "Semua Kategori" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openFAQ === faq.id;
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-poppins font-semibold text-base text-navy mb-1">
                      {faq.question}
                    </h3>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-dm-sans">
                      {faq.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-gray-100">
                        <p className="font-dm-sans text-base text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QuestionMarkCircleIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
                Tidak ada FAQ ditemukan
              </h3>
              <p className="font-dm-sans text-gray-600">
                Coba ubah kata kunci pencarian atau kategori
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}