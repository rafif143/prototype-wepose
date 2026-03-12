
* 
**Menu Navigasi Sidebar:** Ada menu buat akses ke Beranda, Order Saya, Dokumen, Profil & Keluarga, Saldo & Voucher, Notifikasi, dan Bantuan.


* 
**Greeting Card:** Bagian paling atas yang nyapa user pakai teks 'Halo, [Nama]!', lengkap sama tanggal hari ini dan *progress bar* kelengkapan profil mereka.


* 
**Active Orders:** Nampilin daftar pesanan visa yang lagi jalan pakai *card* dengan *badge* status berwarna, yang bisa diklik buat liat detailnya.


* 
**Saldo Widget:** Sebuah *card* berwarna oranye yang ngasih liat sisa saldo user, tombol buat "Top Up", dan riwayat transaksi.


* 
**Voucher Active:** *Card* berwarna kuning yang nampilin jumlah *voucher* yang masih aktif dan info *voucher* mana yang masa berlakunya paling cepet habis (*expired soonest*).


* 
**Quick Actions (Jalan Pintas):** Kumpulan *card shortcut* buat fitur-fitur krusial kayak Cari Visa, Upload Dokumen, Cek Status, dan Quiz Visa.


* 
**Notifications Preview:** Fitur buat nampilin 3 notifikasi terbaru, lengkap dengan tombol CTA "Lihat Semua".


* 
**Tracking Status Order:** Fitur *timeline* vertikal buat ngecek progres pesanan.


* Sistem ini pakai titik warna: hijau buat yang udah kelar, oranye (dengan animasi *pulse*) buat status yang lagi jalan sekarang, dan abu-abu buat tahap yang belum dilewatin.


* Fitur ini juga nampilin label statusnya, tanggal dan waktu *update*, serta catatan dari staf Wepose kalau ada.


* Kalau statusnya udah nyampe tahap final yaitu 'Paspor Siap', bakal ada notifikasi *push* dan animasi *confetti* kecil yang muncul.



Berperanlah sebagai Frontend Developer ahli. Buatkan komponen halaman "Portal Tamu" (User Dashboard) menggunakan Next.js 15 (App Router), Tailwind CSS, dan Lucide Icons. Terapkan UI/UX spesifikasi berikut:

**1. Design System Utama**

* **Font**: Poppins (Bold/Semi-bold) untuk Heading, DM Sans (Regular/Medium) untuk Body.
* **Warna Primary**: Orange `#F97316` (CTA & Aksen aktif), Orange Dark `#EA6B0A` (Hover).
* **Warna Secondary/Navy**: Navy Deep `#0F1F3D` (Teks Heading), Navy Mid `#1E3A5F` (Background Sidebar/Menu aktif).
* **Base UI**: Card menggunakan `rounded-2xl` (16px) dengan `shadow-md`. Button menggunakan `rounded-full` (9999px).

**2. Layout Utama (Grid & Sidebar)**

* **Sidebar (Kiri)**: Lebar tetap 240px (Desktop), background warna Navy. Ada logo di atas.
* List Menu: Beranda, Order Saya, Dokumen, Profil & Keluarga, Saldo & Voucher, Notifikasi, Bantuan.
* Style Menu Aktif: Background warna Navy-mid, border kiri tebal 4px warna Orange, dan teks warna Orange.
* Tambahkan tombol *collapse* di bawah untuk mengecilkan sidebar menjadi 64px (hanya ikon).


* **Main Content (Kanan)**: Area konten utama dengan background abu-abu sangat terang (`#F9FAFB`). Padding yang lega.

**3. Komponen Dashboard Overview (Area Konten)**
Buatkan susunan widget berikut dari atas ke bawah:

* **Top Header (Greeting)**: Teks "Halo, [Nama User]!", elemen tanggal hari ini, dan *progress bar* kecil bertuliskan kelengkapan profil.
* **Row 1 (Overview)**: Gunakan Grid (3 kolom).
* Kolom 1 (Lebar penuh atau 1/3): **Active Orders**. Tampilkan card pesanan visa dengan *badge* status berwarna.
* Kolom 2 (1/3 lebar): **Saldo Widget**. Card background warna Orange `#F97316` teks putih. Tampilkan nominal saldo, tombol "Top Up", dan link "Riwayat".
* Kolom 3 (1/3 lebar): **Voucher Active**. Card background warna kuning/cerah. Tampilkan jumlah voucher aktif dan info "1 voucher expired dalam 3 hari".


* **Row 2 (Quick Actions)**: Grid berisi 4 card jalan pintas (Cari Visa, Upload Dokumen, Cek Status, Quiz Visa). Desain clean dengan ikon Lucide besar di tengah.
* **Row 3 (Notifications)**: Card memanjang menampilkan list 3 notifikasi terbaru. Beri tombol CTA "Lihat Semua" di sudut atas.

**4. Komponen Tracking Status (Order Timeline)**
Buatkan komponen *vertical timeline* untuk melacak status order di dalam halaman detail order:

* **Status Selesai**: Titik warna Hijau (`#16A34A`).
* **Status Aktif/Saat ini**: Titik warna Oranye (`#F97316`) dengan efek animasi Tailwind `animate-pulse`.
* **Status Belum Tercapai**: Titik warna Abu-abu.
* Setiap titik harus memiliki label status (misal: "Dokumen Direview"), tanggal/waktu update, dan area untuk catatan staf.

Tolong generate kode komponen lengkapnya agar responsif.

---

