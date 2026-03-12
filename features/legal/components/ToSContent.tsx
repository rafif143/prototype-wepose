"use client";

import { motion } from "framer-motion";
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ScaleIcon
} from "@heroicons/react/24/outline";

export function ToSContent() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Penerimaan Syarat",
      icon: DocumentTextIcon,
      content: [
        "Dengan mengakses dan menggunakan platform WePose, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini.",
        "Jika Anda tidak menyetujui syarat-syarat ini, mohon untuk tidak menggunakan layanan kami.",
        "Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya."
      ]
    },
    {
      id: "services",
      title: "2. Layanan WePose",
      icon: GlobeAltIcon,
      content: [
        "WePose menyediakan layanan konsultasi dan bantuan pengajuan visa untuk berbagai negara tujuan.",
        "Kami membantu mempersiapkan dokumen, mengisi formulir aplikasi, dan memberikan panduan proses visa.",
        "Layanan kami mencakup visa turis, bisnis, pelajar, dan jenis visa lainnya sesuai kebutuhan.",
        "Kami tidak menjamin persetujuan visa dari kedutaan atau konsulat yang bersangkutan."
      ]
    },
    {
      id: "user-obligations",
      title: "3. Kewajiban Pengguna",
      icon: UserGroupIcon,
      content: [
        "Pengguna wajib memberikan informasi yang akurat, lengkap, dan terkini.",
        "Pengguna bertanggung jawab atas kerahasiaan akun dan password mereka.",
        "Dilarang menggunakan platform untuk kegiatan ilegal atau melanggar hukum.",
        "Pengguna wajib mematuhi semua persyaratan yang ditetapkan oleh kedutaan tujuan."
      ]
    },
    {
      id: "payment",
      title: "4. Pembayaran dan Biaya",
      icon: CreditCardIcon,
      content: [
        "Semua biaya layanan harus dibayar sesuai dengan tarif yang berlaku.",
        "Pembayaran dapat dilakukan melalui metode yang tersedia di platform.",
        "Biaya konsular dan biaya pihak ketiga lainnya ditanggung oleh pengguna.",
        "Kebijakan refund berlaku sesuai dengan ketentuan yang telah ditetapkan."
      ]
    },
    {
      id: "privacy",
      title: "5. Privasi dan Keamanan Data",
      icon: ShieldCheckIcon,
      content: [
        "Kami berkomitmen melindungi privasi dan keamanan data pribadi pengguna.",
        "Data pribadi hanya digunakan untuk keperluan proses pengajuan visa.",
        "Kami tidak akan membagikan informasi pribadi kepada pihak ketiga tanpa persetujuan.",
        "Sistem keamanan berlapis digunakan untuk melindungi data pengguna."
      ]
    },
    {
      id: "limitations",
      title: "6. Batasan Tanggung Jawab",
      icon: ExclamationTriangleIcon,
      content: [
        "WePose tidak bertanggung jawab atas penolakan visa oleh kedutaan atau konsulat.",
        "Kami tidak menjamin waktu pemrosesan visa sesuai estimasi yang diberikan.",
        "Tanggung jawab kami terbatas pada layanan konsultasi dan bantuan administratif.",
        "Pengguna bertanggung jawab penuh atas keputusan perjalanan mereka."
      ]
    },
    {
      id: "intellectual-property",
      title: "7. Hak Kekayaan Intelektual",
      icon: ScaleIcon,
      content: [
        "Semua konten, desain, dan teknologi di platform WePose adalah milik kami.",
        "Pengguna dilarang menyalin, memodifikasi, atau mendistribusikan konten tanpa izin.",
        "Logo, merek dagang, dan materi lainnya dilindungi oleh hak cipta.",
        "Pelanggaran hak kekayaan intelektual dapat dikenakan sanksi hukum."
      ]
    },
    {
      id: "termination",
      title: "8. Penghentian Layanan",
      icon: InformationCircleIcon,
      content: [
        "Kami berhak menghentikan atau menangguhkan akun pengguna yang melanggar syarat dan ketentuan.",
        "Pengguna dapat menghentikan penggunaan layanan kapan saja.",
        "Penghentian akun tidak menghilangkan kewajiban pembayaran yang belum diselesaikan.",
        "Data pengguna akan dihapus sesuai dengan kebijakan retensi data kami."
      ]
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
            <ScaleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-navy mb-4">
            Syarat dan Ketentuan
          </h1>
          <p className="font-dm-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Syarat dan ketentuan penggunaan platform WePose yang berlaku untuk semua pengguna layanan kami
          </p>
          <div className="mt-6 text-sm text-gray-500 font-dm-sans">
            Terakhir diperbarui: 15 Januari 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-orange px-6 md:px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="font-poppins font-bold text-xl md:text-2xl text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div className="px-6 md:px-8 py-6">
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="font-dm-sans text-base text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-orange-50 rounded-2xl p-8 md:p-10 border border-orange-200 text-center"
        >
          <h3 className="font-poppins font-bold text-2xl text-navy mb-4">
            Ada Pertanyaan?
          </h3>
          <p className="font-dm-sans text-gray-600 mb-6 leading-relaxed">
            Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, jangan ragu untuk menghubungi tim support kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@wepose.id"
              className="px-6 py-3 bg-orange hover:bg-orange-dark text-white font-poppins font-semibold rounded-xl transition-colors"
            >
              Email Legal Team
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-orange text-orange hover:bg-orange hover:text-white font-poppins font-semibold rounded-xl transition-colors"
            >
              Hubungi Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}