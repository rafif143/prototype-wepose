import { notFound } from "next/navigation"
import BlogDetailClient from "@/features/blog/components/BlogDetailClient"
import Footer from "@/shared/layout/Footer"

// Sample blog data
const blogPosts = {
  "jasa-visa-australia": {
    title: "Jasa Visa Australia",
    excerpt: "Mengurus visa Australia bisa menjadi proses yang cukup kompleks karena banyaknya persyaratan dan dokumen yang harus dipenuhi.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
    date: "5 Maret 2025",
    author: "Tim WePose",
    category: "Visa Australia",
    readTime: "5 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Jasa Visa Australia: Panduan Lengkap
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Mengurus visa Australia bisa menjadi proses yang cukup kompleks karena banyaknya persyaratan dan dokumen yang harus dipenuhi. Menggunakan jasa visa dapat membantu mempercepat proses pengurusan serta meminimalkan risiko penolakan.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Jenis Visa Australia untuk WNI
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Visa Turis (Subclass 600)</li>
          <li>Visa Pelajar (Subclass 500)</li>
          <li>Visa Kerja (Subclass 482)</li>
          <li>Visa Bisnis (Subclass 188)</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Mengapa Menggunakan Jasa Visa?
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Dengan menggunakan jasa profesional, Anda dapat memastikan semua dokumen lengkap dan sesuai persyaratan, sehingga meminimalkan risiko penolakan visa.
        </p>
      </>
    )
  },
  "visa-schengen-jerman-kunjungan": {
    title: "Visa Schengen Jerman Kunjungan Keluarga dan Teman",
    excerpt: "Visa Schengen Jerman Visit Family or Friends adalah visa kunjungan singkat yang memungkinkan WNI mengunjungi keluarga atau teman di Jerman hingga 90 hari dalam periode 180 hari.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    date: "5 Maret 2025",
    author: "Tim WePose",
    category: "Visa Schengen",
    readTime: "8 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Visa Schengen Jerman Kunjungan Keluarga atau Teman: Panduan Lengkap
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Mengunjungi keluarga atau teman di Jerman adalah salah satu alasan paling umum bagi warga negara Indonesia untuk mengajukan visa Schengen.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Melalui panduan ini Anda akan memahami secara lengkap:
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Apa itu visa kunjungan keluarga Jerman</li>
          <li>Syarat dokumen yang diperlukan</li>
          <li>Estimasi waktu proses visa</li>
          <li>Tips agar visa Schengen disetujui</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Apa itu visa Schengen kunjungan keluarga atau teman?
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Visa Schengen Visit Family or Friends adalah visa short stay (Tipe C) yang memungkinkan Anda masuk ke Jerman untuk tujuan kunjungan pribadi.
        </p>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          Tujuan kunjungan biasanya meliputi:
        </h3>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Mengunjungi keluarga yang tinggal di Jerman</li>
          <li>Bertemu pasangan atau kerabat</li>
          <li>Mengunjungi teman dekat</li>
          <li>Menghadiri acara keluarga</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Durasi Tinggal Visa Schengen Jerman
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-navy font-semibold leading-relaxed mb-4">
          Durasi tinggal maksimal: 90 hari dalam periode 180 hari
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Dokumen Penting untuk Visa Kunjungan Jerman
        </h2>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          1. Paspor
        </h3>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Masa berlaku minimal 6 bulan sebelum keberangkatan</li>
          <li>Memiliki halaman kosong untuk visa</li>
          <li>Paspor telah ditandatangani</li>
        </ul>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          2. Foto Visa
        </h3>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Ukuran 3.5 x 4.5 cm</li>
          <li>Latar belakang putih</li>
          <li>Wajah terlihat jelas 70–80%</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Estimasi Waktu Proses Visa
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-navy font-semibold leading-relaxed mb-4">
          Estimasi waktu pemrosesan: 5 hingga 20 hari kerja
        </p>
      </>
    )
  },
  "proses-visa-jerman-berapa-lama": {
    title: "Proses Visa Jerman Berapa Lama?",
    excerpt: "Berapa lama proses visa Jerman Schengen? Waktu pemrosesan visa biasanya berkisar 10-15 hari kerja untuk visa kunjungan singkat.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop",
    date: "5 Maret 2025",
    author: "Tim WePose",
    category: "Visa Jerman",
    readTime: "6 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Proses Visa Jerman Berapa Lama?
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Waktu pemrosesan visa Jerman biasanya berkisar 10-15 hari kerja untuk visa kunjungan singkat, namun bisa lebih lama tergantung jenis visa, kelengkapan dokumen, dan volume aplikasi.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Faktor yang Mempengaruhi Waktu Proses
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Kelengkapan dokumen</li>
          <li>Jenis visa yang diajukan</li>
          <li>Volume aplikasi di kedutaan</li>
          <li>Verifikasi tambahan yang diperlukan</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Tips Mempercepat Proses
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Pastikan semua dokumen lengkap dan sesuai persyaratan sebelum mengajukan visa. Ajukan visa minimal 2-3 bulan sebelum keberangkatan.
        </p>
      </>
    )
  },
  "tips-visa-korea-selatan": {
    title: "Tips Visa Korea Selatan",
    excerpt: "Mengajukan visa Korea Selatan memerlukan persiapan dokumen yang lengkap dan akurat.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1200&auto=format&fit=crop",
    date: "4 Maret 2025",
    author: "Tim WePose",
    category: "Visa Korea",
    readTime: "8 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Tips Visa Korea Selatan
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Mengajukan visa Korea Selatan memerlukan persiapan dokumen yang lengkap dan akurat. Artikel ini memberikan tips praktis untuk meningkatkan peluang approval visa Korea.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Persyaratan Dokumen
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Paspor dengan masa berlaku minimal 6 bulan</li>
          <li>Formulir aplikasi visa</li>
          <li>Foto 3.5 x 4.5 cm</li>
          <li>Rekening koran 3 bulan terakhir</li>
          <li>Surat sponsor dari perusahaan</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Tips Agar Visa Disetujui
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Pastikan semua dokumen asli dan lengkap. Tunjukkan bukti keuangan yang kuat dan itinerary perjalanan yang jelas.
        </p>
      </>
    )
  },
  "panduan-visa-jepang-tourist": {
    title: "Panduan Visa Jepang Tourist",
    excerpt: "Visa turis Jepang adalah salah satu visa yang paling banyak diajukan oleh WNI.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    date: "3 Maret 2025",
    author: "Tim WePose",
    category: "Visa Jepang",
    readTime: "6 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Panduan Lengkap Visa Jepang untuk Wisata
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Jepang adalah salah satu destinasi wisata favorit warga Indonesia. Dengan keindahan alam, budaya yang kaya, dan teknologi modern, tidak heran banyak yang ingin berkunjung ke Negeri Sakura ini.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Syarat Dokumen Visa Jepang
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Paspor dengan masa berlaku minimal 6 bulan</li>
          <li>Formulir aplikasi visa</li>
          <li>Foto 4x6 cm (2 lembar)</li>
          <li>Rekening koran 3 bulan terakhir</li>
          <li>Surat sponsor dari perusahaan</li>
          <li>Itinerary perjalanan</li>
          <li>Booking hotel</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Proses Pengajuan
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Proses pengajuan visa Jepang biasanya memakan waktu 5-7 hari kerja. Pastikan semua dokumen lengkap untuk mempercepat proses.
        </p>
      </>
    )
  },
  "cara-apply-visa-schengen": {
    title: "Cara Apply Visa Schengen",
    excerpt: "Visa Schengen memungkinkan Anda mengunjungi 27 negara Eropa dengan satu visa.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    date: "2 Maret 2025",
    author: "Tim WePose",
    category: "Visa Schengen",
    readTime: "10 menit",
    content: (
      <>
        <h1 className="font-poppins font-bold text-[28px] md:text-[32px] text-navy mb-4 mt-8">
          Cara Apply Visa Schengen
        </h1>
        
        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Visa Schengen memungkinkan Anda mengunjungi 27 negara Eropa dengan satu visa. Proses aplikasinya memerlukan persiapan yang matang dan dokumen yang lengkap.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Langkah-langkah Apply Visa Schengen
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Tentukan negara tujuan utama</li>
          <li>Siapkan dokumen lengkap</li>
          <li>Booking appointment di VFS Global</li>
          <li>Hadiri interview di kedutaan</li>
          <li>Tunggu proses verifikasi</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Dokumen yang Diperlukan
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Paspor, foto, rekening koran, asuransi perjalanan, booking hotel, tiket pesawat, dan surat sponsor.
        </p>
      </>
    )
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <>
      <BlogDetailClient post={post} />
      <Footer />
    </>
  )
}
