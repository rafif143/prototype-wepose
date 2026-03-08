import { notFound } from "next/navigation"
import BlogDetailClient from "@/components/blog/BlogDetailClient"

// Sample blog data
const blogPosts = {
  "visa-schengen-jerman-kunjungan": {
    title: "Visa Schengen Jerman Kunjungan Keluarga dan Teman",
    excerpt: "Visa Schengen Jerman Visit Family or Friends adalah visa kunjungan singkat yang memungkinkan WNI mengunjungi keluarga atau teman di Jerman hingga 90 hari dalam periode 180 hari.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    date: "15 Januari 2024",
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

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Dengan visa ini, Anda dapat melakukan kunjungan singkat ke Jerman untuk bertemu keluarga, pasangan, atau teman yang tinggal di sana.
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Visa Schengen untuk kunjungan keluarga atau teman memungkinkan Anda tinggal di kawasan Schengen Area hingga 90 hari dalam periode 180 hari.
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

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Visa ini berlaku untuk perjalanan singkat dan tidak dapat digunakan untuk bekerja atau tinggal jangka panjang.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Durasi Tinggal Visa Schengen Jerman
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Visa kunjungan ini memiliki aturan durasi tertentu.
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-navy font-semibold leading-relaxed mb-4">
          Durasi tinggal maksimal: 90 hari dalam periode 180 hari
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Artinya dalam jangka waktu 6 bulan, Anda hanya diperbolehkan tinggal maksimal 90 hari di kawasan Schengen.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Dokumen Penting untuk Visa Kunjungan Jerman
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Pengajuan visa Schengen memerlukan berbagai dokumen yang harus disiapkan dengan lengkap.
        </p>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          1. Paspor
        </h3>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-2">
          Paspor harus memenuhi beberapa syarat berikut:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Masa berlaku minimal 6 bulan sebelum keberangkatan</li>
          <li>Memiliki halaman kosong untuk visa</li>
          <li>Paspor telah ditandatangani</li>
        </ul>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          2. Foto Visa
        </h3>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-2">
          Diperlukan dua lembar foto terbaru dengan ketentuan:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Ukuran 3.5 x 4.5 cm</li>
          <li>Latar belakang putih</li>
          <li>Wajah terlihat jelas 70–80%</li>
        </ul>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          3. Bukti Keuangan
        </h3>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-2">
          Pemohon harus menunjukkan kemampuan finansial selama perjalanan:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Referensi bank</li>
          <li>Rekening koran 3 bulan terakhir</li>
          <li>Dokumen harus asli dan memiliki cap bank</li>
        </ul>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Estimasi Waktu Proses Visa
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Proses visa biasanya dilakukan melalui VFS Global yang bekerja sama dengan Kedutaan Jerman.
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-navy font-semibold leading-relaxed mb-4">
          Estimasi waktu pemrosesan: 5 hingga 20 hari kerja
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Disarankan untuk mengajukan visa minimal 2 hingga 3 bulan sebelum perjalanan agar memiliki cukup waktu jika terjadi keterlambatan proses.
        </p>

        <h2 className="font-poppins font-bold text-[24px] md:text-[28px] text-navy mb-4 mt-8">
          Mengapa Menggunakan Jasa Wepose Travel?
        </h2>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Pengajuan visa Schengen dikenal cukup kompleks karena membutuhkan banyak dokumen dan prosedur.
        </p>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Wepose Travel membantu memastikan semua proses visa Anda berjalan lancar.
        </p>

        <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-navy mb-3 mt-6">
          Layanan kami meliputi:
        </h3>

        <ul className="list-disc list-inside space-y-2 mb-6 font-dm-sans text-gray-700">
          <li>Konsultasi visa Schengen</li>
          <li>Pengecekan dokumen lengkap</li>
          <li>Bantuan pengisian formulir</li>
          <li>Pendampingan proses pengajuan visa</li>
        </ul>

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4">
          Dengan bantuan profesional, Anda dapat fokus mempersiapkan perjalanan tanpa stres mengurus administrasi visa.
        </p>
      </>
    )
  },
  "visa-jepang-wisata": {
    title: "Panduan Lengkap Visa Jepang untuk Wisata",
    excerpt: "Pelajari cara mengajukan visa turis Jepang dengan mudah. Panduan lengkap dokumen, biaya, dan tips agar visa disetujui.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    date: "10 Januari 2024",
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

        <p className="font-dm-sans text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-2">
          Untuk mengajukan visa turis Jepang, Anda perlu menyiapkan dokumen berikut:
        </p>

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
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return <BlogDetailClient post={post} />
}
