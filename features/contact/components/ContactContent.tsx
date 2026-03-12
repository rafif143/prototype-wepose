"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Berapa lama proses visa?",
      answer: "Waktu proses bervariasi tergantung negara tujuan, umumnya 7-30 hari kerja. Untuk visa Schengen biasanya 15-20 hari kerja, sedangkan visa Jepang dan Korea lebih cepat sekitar 7-10 hari kerja."
    },
    {
      question: "Apakah ada garansi visa disetujui?",
      answer: "Kami tidak dapat menjamin persetujuan visa karena keputusan akhir ada di kedutaan. Namun, tingkat keberhasilan kami sangat tinggi berkat persiapan dokumen yang teliti dan pengalaman tim profesional."
    },
    {
      question: "Bagaimana cara tracking aplikasi?",
      answer: "Setelah pengajuan, Anda akan mendapat kode tracking unik via email. Gunakan kode ini di halaman tracking kami untuk memantau status aplikasi secara real-time."
    },
    {
      question: "Apakah bisa refund jika ditolak?",
      answer: "Kebijakan refund berlaku sesuai terms & conditions. Biaya konsular tidak dapat dikembalikan, namun biaya layanan kami dapat direfund sesuai ketentuan yang berlaku."
    },
    {
      question: "Dokumen apa saja yang diperlukan?",
      answer: "Dokumen bervariasi per negara, umumnya meliputi: paspor (berlaku min. 6 bulan), foto, rekening koran, slip gaji, booking hotel & tiket, asuransi perjalanan, dan dokumen pendukung lainnya."
    },
    {
      question: "Apakah perlu datang ke kantor?",
      answer: "Tidak selalu. Banyak proses dapat dilakukan online. Namun untuk beberapa jenis visa atau konsultasi khusus, kami menyarankan datang ke kantor untuk pelayanan yang lebih personal."
    }
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-poppins font-semibold text-base text-navy pr-4">{faq.question}</span>
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
                  <div className="px-5 pb-5">
                    <p className="font-dm-sans text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const offices = [
    {
      name: "Kantor Pusat Jakarta",
      type: "Headquarters",
      address: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
      phone: "+62 21 5555 0001",
      email: "jakarta@wepose.id",
      hours: "Senin - Jumat: 09:00 - 18:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJl.%20Jenderal%20Sudirman%2C%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1642678901234!5m2!1sen!2sid",
      isMain: true
    },
    {
      name: "Cabang Surabaya",
      type: "Branch Office",
      address: "Jl. Pemuda No. 45, Surabaya 60271",
      phone: "+62 31 5555 0002", 
      email: "surabaya@wepose.id",
      hours: "Senin - Jumat: 09:00 - 17:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5273048391957!2d112.7378261!3d-7.2574719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f96dc4d8b2a5%3A0x5030bfbcaf7f130!2sJl.%20Pemuda%2C%20Surabaya%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1642678901234!5m2!1sen!2sid",
      isMain: false
    },
    {
      name: "Cabang Bandung",
      type: "Branch Office", 
      address: "Jl. Asia Afrika No. 67, Bandung 40111",
      phone: "+62 22 5555 0003",
      email: "bandung@wepose.id", 
      hours: "Senin - Jumat: 09:00 - 17:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8977341423394!2d107.6098461!3d-6.9174639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sJl.%20Asia%20Afrika%2C%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1642678901234!5m2!1sen!2sid",
      isMain: false
    },
    {
      name: "Cabang Medan",
      type: "Branch Office",
      address: "Jl. Gatot Subroto No. 89, Medan 20235",
      phone: "+62 61 5555 0004",
      email: "medan@wepose.id",
      hours: "Senin - Jumat: 09:00 - 17:00",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0890830718944!2d98.6748061!3d3.5951956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f4c4d1e5c0f%3A0x5c3f9a1b2e4d6789!2sJl.%20Gatot%20Subroto%2C%20Medan%2C%20Sumatera%20Utara!5e0!3m2!1sen!2sid!4v1642678901234!5m2!1sen!2sid", 
      isMain: false
    }
  ];

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Telepon",
      value: "+62 21 5555 0001",
      description: "Hubungi kami langsung untuk konsultasi cepat",
      action: "tel:+622155550001"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      value: "info@wepose.id",
      description: "Kirim pertanyaan detail via email",
      action: "mailto:info@wepose.id"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "WhatsApp",
      value: "+62 812 3456 7890",
      description: "Chat langsung dengan tim support",
      action: "https://wa.me/6281234567890"
    }
  ];

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <PhoneIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-navy mb-4">
            Hubungi Kami
          </h1>
          <p className="font-dm-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tim profesional kami siap membantu Anda dengan layanan visa terbaik. Hubungi kami melalui berbagai channel yang tersedia.
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.action}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-orange transition-all duration-200 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6 text-orange group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-navy">{method.title}</h3>
                    <p className="font-dm-sans text-orange font-medium">{method.value}</p>
                  </div>
                </div>
                <p className="font-dm-sans text-sm text-gray-600">{method.description}</p>
              </a>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg h-fit">
              <h2 className="font-poppins font-bold text-2xl text-navy mb-6">Kirim Pesan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                      Subjek *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors"
                    >
                      <option value="">Pilih subjek</option>
                      <option value="visa-consultation">Konsultasi Visa</option>
                      <option value="document-help">Bantuan Dokumen</option>
                      <option value="pricing">Informasi Harga</option>
                      <option value="complaint">Keluhan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-sm text-navy mb-2">
                    Pesan *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-base focus:border-orange focus:outline-none transition-colors resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange hover:bg-orange-dark text-white font-poppins font-semibold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </motion.div>

          {/* Quick Info Sidebar - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-poppins font-bold text-lg text-navy mb-4">Kontak Cepat</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.action}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange transition-colors">
                        <IconComponent className="w-5 h-5 text-orange group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-poppins font-semibold text-sm text-navy">{method.title}</p>
                        <p className="font-dm-sans text-xs text-orange">{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <h3 className="font-poppins font-bold text-lg text-navy mb-4">Jam Operasional</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-dm-sans text-sm text-gray-600">Senin - Jumat</span>
                  <span className="font-dm-sans text-sm font-medium text-navy">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dm-sans text-sm text-gray-600">Sabtu</span>
                  <span className="font-dm-sans text-sm font-medium text-navy">09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dm-sans text-sm text-gray-600">Minggu</span>
                  <span className="font-dm-sans text-sm font-medium text-navy">Tutup</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="font-poppins font-bold text-2xl text-navy mb-8 text-center">Lokasi Kantor Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className={`bg-white border rounded-2xl overflow-hidden shadow-lg ${
                  office.isMain ? 'border-orange' : 'border-gray-200'
                }`}
              >
                {/* Map Preview */}
                <div className="h-48 relative">
                  <iframe
                    src={office.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-2xl"
                  />
                  {office.isMain && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-orange text-white text-xs font-poppins font-semibold rounded-full shadow-lg">
                        PUSAT
                      </span>
                    </div>
                  )}
                </div>

                {/* Office Info */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      office.isMain ? 'bg-orange' : 'bg-gray-100'
                    }`}>
                      <BuildingOfficeIcon className={`w-6 h-6 ${
                        office.isMain ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-poppins font-bold text-lg text-navy mb-1">{office.name}</h3>
                      <p className="font-dm-sans text-sm text-gray-500 mb-4">{office.type}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="font-dm-sans text-sm text-gray-600">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a href={`tel:${office.phone}`} className="font-dm-sans text-sm text-orange hover:underline">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="font-dm-sans text-sm text-orange hover:underline">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <p className="font-dm-sans text-sm text-gray-600">{office.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-orange-50 rounded-2xl p-8 md:p-10 border border-orange-200"
        >
          <div className="text-center mb-8">
            <h2 className="font-poppins font-bold text-2xl text-navy mb-4">Pertanyaan Umum</h2>
            <p className="font-dm-sans text-gray-600">Jawaban untuk pertanyaan yang sering diajukan</p>
          </div>
          
          <FAQAccordion />
        </motion.div>
      </div>
    </div>
  );
}