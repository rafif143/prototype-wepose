
## 🛠️ WEPOSE — Section 4: Tools Premium (Full Brief)

---

### ⚙️ TECH STACK & SETUP (Berlaku untuk semua Tools)

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion — `motion.div`, `AnimatePresence`, `useInView`, `useReducedMotion`
- **Icons:** Heroicons (`@heroicons/react/24/outline` + `/solid`) — sudah terinstall
- **Fonts:** Poppins (Bold, SemiBold, Medium) + DM Sans (Regular, Medium) via `next/font/google`
- **Responsif:** Mobile-first. Max content width 1280px centered.
- **Routes:**
  - `app/tools/quiz/page.tsx`
  - `app/tools/compare/page.tsx`
  - `app/tools/sponsor-letter/page.tsx`

---

### 🎨 DESIGN TOKENS (sama di semua tools)

```
navy:        #0F1F3D
navy-mid:    #1E3A5F
orange:      #F97316
orange-dark: #EA6B0A
orange-100:  #FFEDD5
orange-50:   #FFF7ED
gray-800:    #1F2937
gray-500:    #6B7280
gray-200:    #E5E7EB
gray-50:     #F9FAFB
green:       #16A34A
amber:       #D97706
red:         #DC2626
purple:      #7C3AED   ← khusus badge premium/tools

border-radius:
  button: 9999px
  card:   16px
  input:  10px
  modal:  20px
  badge:  9999px
```

---

---

## 4.1 — QUIZ KELAYAKAN VISA

**File:** `app/tools/quiz/page.tsx`

---

### 📐 LAYOUT UTAMA

Full-screen focus per pertanyaan — tidak ada distraksi, tidak ada navbar/footer saat quiz berlangsung. Hanya ada progress bar + tombol navigasi.

**Background:** Gradient `linear-gradient(135deg, #0F1F3D 0%, #1E3A5F 60%, #0F1F3D 100%)` — full viewport height `min-h-screen`. Subtle noise texture overlay (`opacity: 0.03`) untuk kedalaman visual.

**Progress Bar:**
- Posisi: `fixed top-0 left-0 right-0 z-50`
- Height: 3px
- Background: `rgba(255,255,255,0.1)`
- Fill: orange `#F97316`, transition smooth via Framer Motion `width` animate
- Value: `(currentQuestion / totalQuestions) * 100`%

**Nomor Pertanyaan:**
- Posisi: `fixed top-4 right-6 z-50`
- Style: DM Sans 13px, `text-white/50`
- Format: `3 / 8`

**Tombol Kembali:**
- Posisi: `fixed top-4 left-6 z-50`
- Style: ghost, Heroicons `ArrowLeftIcon` 20px putih/60, hover putih/100
- Muncul hanya ab pertanyaan ke-2

**Tombol Close/Exit:**
- Posisi: `fixed top-4 right-16 z-50`
- Heroicons `XMarkIcon` 20px putih/60
- Klik: `AnimatePresence` modal konfirmasi exit muncul

---

### 🔐 MODEL AKSES

**3 pertanyaan pertama:** GRATIS — semua user (login/tidak)

**Pertanyaan ke-4:** Paywall muncul smooth sebelum pertanyaan ditampilkan

**Kondisi bypass paywall (langsung akses penuh):**
- User punya order visa aktif
- User sudah beli paket tools

**State management:**
```ts
const [currentQ, setCurrentQ] = useState(0)
const [answers, setAnswers] = useState<Record<number, string>>({})
const [isUnlocked, setIsUnlocked] = useState(false) // dari session/cookie
const [showPaywall, setShowPaywall] = useState(false)
const [showResult, setShowResult] = useState(false)
```

---

### ❓ PERTANYAAN — STRUKTUR & ANIMASI

**Container per pertanyaan:**
- `max-w-xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen`
- Setiap pertanyaan adalah satu "screen" — tidak scroll

**Animasi transisi antar pertanyaan:**
```tsx
// Pertanyaan lama: slide ke kiri (x: 0 → -60) + opacity 0
// Pertanyaan baru: masuk dari kanan (x: 60 → 0) + opacity 0 → 1
// AnimatePresence mode="wait"
variants={{
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { x: -60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
}}
```

**Setiap screen pertanyaan berisi:**

1. **Kategori label** (atas):
   Pill kecil, bg `white/10` border `white/20`, text `white/60`, DM Sans 12px uppercase
   Contoh: `TUJUAN PERJALANAN`

2. **Pertanyaan:**
   Poppins Bold 28px desktop / 22px mobile, text white, text-center, max 2 baris
   `line-height: 1.3`

3. **Pilihan Jawaban (2–4 opsi):**
   Grid: 2 kolom jika 4 opsi, 1 kolom jika 2 opsi
   
   Setiap card pilihan:
   - Min height: 120px desktop / 96px mobile
   - Background: `rgba(255,255,255,0.08)` border `rgba(255,255,255,0.15)`
   - Border-radius: 16px
   - Flex column center: emoji/icon 40px + label Poppins Medium 15px putih
   - **Hover:** border orange/60 + bg `rgba(249,115,22,0.1)`, `scale: 1.03` via `whileHover`
   - **Selected:** bg orange `#F97316`, border orange, text white — `scale: 1.02` animate
   - Animasi select: `whileTap: { scale: 0.97 }` + selected state transition 150ms

4. **Tombol Lanjut:**
   - Muncul HANYA setelah pilihan dipilih
   - `AnimatePresence` — fade-in + `y: 10→0` saat pertama muncul
   - Style: orange pill, Poppins SemiBold 15px, `px-8 py-3`, text `Lanjut →`
   - Hover: shadow-orange + `y: -2`
   - Posisi: centered, mt-8

---

### 📝 DATA PERTANYAAN (8 pertanyaan)

```ts
const questions = [
  {
    id: 1,
    category: "TUJUAN PERJALANAN",
    question: "Kamu mau pergi untuk apa?",
    options: [
      { icon: "✈️", label: "Wisata & Liburan" },
      { icon: "💼", label: "Bisnis & Konferensi" },
      { icon: "🎓", label: "Studi & Pendidikan" },
      { icon: "👨‍👩‍👧", label: "Kunjungan Keluarga" },
    ]
  },
  {
    id: 2,
    category: "DESTINASI",
    question: "Ke region mana kamu mau pergi?",
    options: [
      { icon: "🌍", label: "Eropa / Schengen" },
      { icon: "🌏", label: "Asia Timur" },
      { icon: "🌎", label: "Amerika" },
      { icon: "🌐", label: "Lainnya" },
    ]
  },
  {
    id: 3,
    category: "PROFIL PEMOHON",
    question: "Apa pekerjaan kamu saat ini?",
    options: [
      { icon: "👔", label: "Karyawan Swasta / PNS" },
      { icon: "💼", label: "Wiraswasta / Freelancer" },
      { icon: "🎓", label: "Pelajar / Mahasiswa" },
      { icon: "🏠", label: "Ibu Rumah Tangga / Lainnya" },
    ]
  },
  // Q4–Q8 di-unlock setelah bayar:
  {
    id: 4,
    category: "KEUANGAN",
    question: "Berapa estimasi saldo rekening kamu saat ini?",
    options: [
      { icon: "💰", label: "Di bawah Rp 10 juta" },
      { icon: "💵", label: "Rp 10–30 juta" },
      { icon: "💎", label: "Rp 30–100 juta" },
      { icon: "🏦", label: "Di atas Rp 100 juta" },
    ]
  },
  {
    id: 5,
    category: "DOKUMEN",
    question: "Sudah punya paspor yang masih berlaku?",
    options: [
      { icon: "✅", label: "Sudah, berlaku > 1 tahun" },
      { icon: "⚠️", label: "Sudah, tapi < 6 bulan lagi" },
      { icon: "❌", label: "Belum punya paspor" },
      { icon: "🔄", label: "Sedang dalam proses" },
    ]
  },
  {
    id: 6,
    category: "RIWAYAT VISA",
    question: "Pernah punya visa ke negara tujuan sebelumnya?",
    options: [
      { icon: "✅", label: "Pernah, masih aktif" },
      { icon: "📋", label: "Pernah, sudah expired" },
      { icon: "🆕", label: "Belum pernah sama sekali" },
    ]
  },
  {
    id: 7,
    category: "WAKTU KEBERANGKATAN",
    question: "Kapan rencana keberangkatanmu?",
    options: [
      { icon: "⚡", label: "< 2 minggu lagi" },
      { icon: "📅", label: "1–3 bulan lagi" },
      { icon: "🗓️", label: "3–6 bulan lagi" },
      { icon: "🌅", label: "Belum pasti / planning" },
    ]
  },
  {
    id: 8,
    category: "DURASI PERJALANAN",
    question: "Berapa lama kamu akan di sana?",
    options: [
      { icon: "🚀", label: "1–2 minggu" },
      { icon: "🗺️", label: "3–4 minggu" },
      { icon: "📆", label: "1–3 bulan" },
      { icon: "🏠", label: "Lebih dari 3 bulan" },
    ]
  },
]
```

---

### 💳 PAYWALL — MUNCUL SEBELUM Q4

**Style:** Card putih terpusat, rounded-2xl, shadow-lg, padding 32px, max-w-md mx-auto

**Konten dari atas:**
1. Ilustrasi: Heroicons `LockClosedIcon` 48px dalam lingkaran bg orange-100, centered
2. Badge: `PREMIUM TOOL` — pill bg purple/10 border purple/30 text purple, Poppins SemiBold 11px
3. H3: `Lanjutkan untuk Hasil Lengkap` Poppins Bold 22px navy, text-center
4. Sub: `Kamu sudah selesai 3 pertanyaan dasar. Lanjutkan untuk mendapatkan rekomendasi visa yang akurat berdasarkan profilmu.` DM Sans 14px gray-600 text-center
5. **Harga:** `Rp 25.000` Poppins Bold 32px orange + `/sesi` DM Sans 14px gray-400
6. Nilai tambah (3 row): Heroicons `CheckCircleIcon` 16px green + teks DM Sans 13px gray-600
   - `✓ Rekomendasi visa yang dipersonalisasi`
   - `✓ Analisis peluang approval (Tinggi/Sedang/Rendah)`
   - `✓ Checklist dokumen spesifik profil kamu`
7. **Tombol utama:** `Buka Quiz Sekarang — Rp 25.000` orange pill full-width lg
8. **Tombol secondary:** `Bundling dengan Order Visa (Gratis)` ghost navy pill full-width
9. **Link:** `Sudah punya akses? Masuk` — DM Sans 13px gray-400 text-center, underline

**Animasi paywall muncul:**
`AnimatePresence` — `scale: 0.92→1` + `opacity: 0→1`, overlay bg `rgba(15,31,61,0.7)` fade-in terpisah, duration 0.3s ease-out

---

### 🏆 HASIL QUIZ

**Trigger:** Setelah semua pertanyaan dijawab, `showResult: true`

**Transisi ke result:** `AnimatePresence` — screen pertanyaan exit ke kiri, result page enter dari kanan

**Layout Result Page:**
Background tetap navy gradient. `max-w-2xl mx-auto px-6 py-16`

**Reveal animasi bertahap (stagger per elemen, `useInView` atau `delay`):**

**1. Header Result:**
- Emoji besar animated: paspor 🛂 bounce-in, duration 0.4s spring
- `Rekomendasi untuk Kamu` — DM Sans 13px orange uppercase, `opacity 0→1` delay 0.1s
- H2: `France Schengen Tourist` — Poppins Bold 32px putih, delay 0.2s
- Flag: `🇫🇷 Prancis · Tourist Visa` — delay 0.3s

**2. Peluang Approval:**
Card bg `white/10` border `white/15` rounded-2xl padding 20px, delay 0.4s

- Label: `Peluang Approval` DM Sans 13px white/60
- **Meter visual:** Progress bar animasi `width: 0→75%`, height 12px, rounded-full
  - Warna: `Tinggi` = green gradient, `Sedang` = amber gradient, `Rendah` = red gradient
  - Di kanan bar: badge besar `TINGGI` / `SEDANG` / `RENDAH` — Poppins Bold 14px
- Sub teks: `Berdasarkan profil dan dokumen yang kamu miliki` DM Sans 12px white/50

**3. Tiga Tips Meningkatkan Peluang:**
Card bg `white/8` border `white/10` rounded-2xl padding 20px, delay 0.5s

- Header: Heroicons `LightBulbIcon` 20px orange + `Tips untuk Kamu` Poppins SemiBold 16px putih
- 3 row tips:
  - Row: Heroicons `ChevronRightIcon` 14px orange + teks DM Sans 14px white/80
  - Contoh: *"Pastikan saldo rekening minimal Rp 20 juta selama 3 bulan terakhir"*
  - *"Siapkan surat keterangan kerja dengan kop perusahaan resmi"*
  - *"Beli asuransi perjalanan min. 30.000 EUR sebelum submit"*

**4. Dokumen Kunci:**
Card bg `white/8` rounded-2xl padding 20px, delay 0.6s

- Header: Heroicons `DocumentTextIcon` 20px orange + `Dokumen yang Kamu Butuhkan`
- List 5 dokumen: checkbox icon (hollow putih) + nama dokumen DM Sans 14px white/80
- Link: `Lihat daftar lengkap →` orange underline

**5. CTA Row (delay 0.7s):**
- `Apply Visa France Schengen Sekarang →` — orange pill full-width lg, Heroicons `PaperAirplaneIcon`
- `Simpan Hasil ke Akun` — ghost white pill full-width

**6. Tombol Ulangi Quiz:**
- Bawah sendiri, ghost, Heroicons `ArrowPathIcon` + `Ulangi Quiz` — DM Sans 13px white/50

---

---

## 4.2 — VISA CHOICE (KOMPARASI)

**File:** `app/tools/compare/page.tsx`

---

### 🔍 ENTRY POINT — CARA USER MASUK

**Cara 1:** Centang checkbox `Bandingkan ○` di Visa Card di halaman katalog → sticky compare bar muncul di bawah → klik `Bandingkan Sekarang`

**Cara 2:** Tombol `Bandingkan` di halaman detail visa

**Cara 3:** Langsung akses `/tools/compare`

---

### 📊 STICKY COMPARE BAR

Muncul di **semua halaman** saat ada visa yang dicentang untuk dibandingkan.

**Style:**
- `position: fixed, bottom: 0, left: 0, right: 0, z-index: 50`
- Background: navy `#0F1F3D`, `box-shadow: 0 -4px 20px rgba(0,0,0,0.3)`
- Padding: `12px 24px`, height 72px
- `AnimatePresence` — `y: 100→0` slide up saat pertama muncul

**Konten (flex between):**
- **Kiri:** Row thumbnail visa yang dipilih (max 3):
  Setiap thumbnail: lingkaran 44px bg navy-mid, emoji bendera + nama visa truncate DM Sans 12px putih, tombol `×` kecil untuk hapus dari list — `AnimatePresence` untuk add/remove
- **Tengah:** `2 visa dipilih` — DM Sans 14px gray-400 (hidden di mobile)
- **Kanan:** Tombol `Bandingkan Sekarang →` orange pill md — disabled + gray kalau hanya 1 visa

---

### 🏗️ LAYOUT HALAMAN COMPARE

**Navbar:** Tampil normal (sticky navy)

**Header Section:**
- Background: navy-mid, padding 40px
- H1: `Bandingkan Visa` Poppins Bold 32px putih
- Sub: `Pilih 2–3 visa untuk melihat perbandingan detail` DM Sans 16px gray-300

**Tambah Visa (jika slot masih kosong):**
Card dashed border `border-2 border-dashed border-white/20` rounded-2xl, flex center, height 80px
- Heroicons `PlusCircleIcon` 24px white/40 + `Tambah Visa` DM Sans 14px white/40
- Klik: modal search visa muncul

---

### 📋 TABEL PERBANDINGAN

**Layout:** `overflow-x: auto` untuk mobile scroll horizontal

**Struktur tabel:**

**Header Row (sticky `position: sticky, top: 64px`):**
- Kolom 0 (kiri): label kriteria — background gray-50, width 200px desktop / 140px mobile
- Kolom 1–3: setiap visa

Setiap kolom visa di header:
- Background: navy-mid → putih gradient
- Bendera emoji 32px + nama visa Poppins SemiBold 15px navy
- Tombol `×` kecil (Heroicons `XMarkIcon` 16px gray-400) untuk hapus dari komparasi
- Tombol `Apply Visa Ini →` — orange pill sm, full width kolom, di bawah nama

**8 Baris Perbandingan:**

| No | Kriteria | Icon (Heroicons) |
|---|---|---|
| 1 | Harga Mulai Dari | `BanknotesIcon` |
| 2 | Durasi Tinggal | `CalendarDaysIcon` |
| 3 | Masa Berlaku Visa | `ClockIcon` |
| 4 | Waktu Proses | `BoltIcon` |
| 5 | Jenis Visa | `DocumentIcon` |
| 6 | Perlu Appointment | `BuildingOfficeIcon` |
| 7 | Dokumen Fisik | `DocumentArrowDownIcon` |
| 8 | Cocok Untuk | `UserGroupIcon` |

**Style rows:**
- Alternating: row ganjil bg white, row genap bg gray-50
- Kolom label: DM Sans 13px gray-500, flex items-center gap-2 (icon 16px gray-400 + teks)
- Kolom nilai: DM Sans 14px navy, text-center, padding 16px

**Highlight Terbaik & Terburuk:**
- Nilai terbaik di row: background `#DCFCE7` (hijau muda) + Heroicons `StarIcon` 12px green di pojok kanan atas cell
- Nilai terburuk: background `#FEE2E2` (merah muda) — hanya untuk kriteria harga dan waktu proses
- Animasi: highlight cells `opacity 0→1` delay 0.3s saat tabel render

**Data dummy untuk 3 visa:**

```ts
const visaData = [
  {
    name: "France Schengen Tourist",
    flag: "🇫🇷",
    price: "Rp 1.850.000",
    stayDuration: "90 hari",
    validity: "3 bulan",
    processTime: "15–20 hari kerja",
    visaType: "Sticker",
    needAppointment: "Tidak",
    needPhysicalDoc: "Ya",
    suitableFor: "Wisata, Bisnis",
  },
  {
    name: "Jepang Tourist",
    flag: "🇯🇵",
    price: "Rp 950.000",
    stayDuration: "15 hari",
    validity: "3 bulan",
    processTime: "7–10 hari kerja",
    visaType: "Sticker",
    needAppointment: "Tidak",
    needPhysicalDoc: "Ya",
    suitableFor: "Wisata",
  },
  {
    name: "Australia Tourist",
    flag: "🇦🇺",
    price: "Rp 1.250.000",
    stayDuration: "3 bulan",
    validity: "12 bulan",
    processTime: "10–15 hari kerja",
    visaType: "e-Visa",
    needAppointment: "Tidak",
    needPhysicalDoc: "Tidak",
    suitableFor: "Wisata, Keluarga",
  },
]
```

---

### 🎯 BANNER REKOMENDASI PERSONAL

Muncul di **bawah tabel** hanya jika user sudah login

**Style:** Card bg `orange-50` border-l-4 `border-orange` rounded-r-2xl padding 20px, flex between

**Konten:**
- Heroicons `SparklesIcon` 24px orange
- Teks: `Berdasarkan profilmu, kami rekomendasikan:` DM Sans 14px gray-600
- Nama visa rekomendasi: Poppins Bold 18px navy + flag emoji
- Alasan singkat: DM Sans 13px gray-500 italic *"Proses tercepat & paling sesuai dengan profil karyawan kamu"*
- Tombol: `Apply Visa Ini →` orange pill md

**Animasi:** `opacity 0→1, y: 16→0` delay 0.5s saat komponen mount

---

### 🔍 MODAL SEARCH TAMBAH VISA

Muncul saat user klik `+ Tambah Visa`

**Style:** Modal centered, rounded-2xl, shadow-lg, width 480px desktop / full mobile, bg white

**Konten:**
- Header: `Cari Visa` Poppins SemiBold 18px navy + `XMarkIcon` tombol close
- Search input: `MagnifyingGlassIcon` + placeholder `Cari nama negara atau visa...` — autofocus saat modal buka
- Hasil pencarian: list item — flag + nama visa + harga + tombol `Pilih` orange sm pill
- Empty state: `DocumentMagnifyingGlassIcon` 40px gray-300 + `Visa tidak ditemukan` gray-500

**Animasi modal:** `scale: 0.95→1` + `opacity: 0→1`, overlay fade-in, `AnimatePresence`, 0.25s ease-out

---

---

## 4.3 — GENERATE SURAT SPONSOR

**File:** `app/tools/sponsor-letter/page.tsx`

---

### 🏗️ LAYOUT UTAMA

**Navbar:** Tampil normal

**Header Section:**
- Background: navy-mid, padding 40px
- Badge: `PREMIUM TOOL` — pill bg purple/10 border purple text purple Poppins SemiBold 11px
- H1: `Generate Surat Sponsor` Poppins Bold 32px putih
- Sub: `Buat surat sponsor profesional dalam hitungan menit` DM Sans 16px gray-300
- **Toggle Bahasa:** pill toggle kanan atas — `🇮🇩 Indonesia` / `🇬🇧 English` — selected: bg orange text white, unselected: bg white/10 text white/60. Animasi: `AnimatePresence` swap

**Progress Steps Indicator:**
3 step horizontal di bawah header, sticky `top: 64px` bg white border-b gray-200

```
[1] Pilih Template  →  [2] Review & Edit  →  [3] Generate PDF
```

- Step selesai: bg hijau lingkaran + Heroicons `CheckIcon` 14px putih + teks hijau
- Step aktif: bg orange lingkaran + angka putih bold + teks orange bold
- Step belum: bg gray-200 lingkaran + angka gray + teks gray-400
- Connector line: hijau kalau step sebelumnya selesai, gray kalau belum
- Animasi step transition: `AnimatePresence` + `layoutId` untuk lingkaran indikator

**State:**
```ts
const [step, setStep] = useState<1|2|3>(1)
const [selectedTemplate, setSelectedTemplate] = useState<string|null>(null)
const [formData, setFormData] = useState<SponsorFormData>({})
const [language, setLanguage] = useState<'id'|'en'>('id')
const [isGenerating, setIsGenerating] = useState(false)
const [pdfUrl, setPdfUrl] = useState<string|null>(null)
```

---

### STEP 1 — PILIH TEMPLATE

**Layout:** Max-w-3xl mx-auto, centered, padding 40px 16px

**H2:** `Pilih Jenis Surat Sponsor` Poppins SemiBold 24px navy, centered

**3 Template Cards — grid 3 kolom desktop, 1 kolom mobile:**

Setiap card: bg white rounded-2xl shadow-md padding 24px, border-2 border-gray-200, cursor-pointer, min-height 280px

Anatomi per card:
1. **Preview Thumbnail** (top): Simulasi preview surat — kotak bg gray-50 border gray-200 rounded-lg height 120px, dengan garis-garis horizontal (simulasi teks surat): 3 garis navy (judul), gap, 8 garis gray (isi). Font kecil dummy `Rp` + nama perusahaan di atas thumbnail.
2. **Nama Template:** Poppins SemiBold 17px navy, mt-4
3. **Deskripsi:** DM Sans 13px gray-500, 2 baris
4. **Tag "Paling Populer"** (hanya template Keluarga): badge orange-100 text-orange pill kecil

**Data 3 Template:**

```ts
const templates = [
  {
    id: "keluarga",
    name: "Sponsor Keluarga",
    description: "Untuk pemohon yang dibiayai oleh anggota keluarga (orang tua, suami/istri, anak)",
    popular: true,
    icon: "👨‍👩‍👧",
    previewColor: "#FFF7ED"
  },
  {
    id: "perusahaan",
    name: "Sponsor Perusahaan",
    description: "Untuk perjalanan bisnis atau dinas yang dibiayai oleh perusahaan/instansi",
    popular: false,
    icon: "🏢",
    previewColor: "#EFF6FF"
  },
  {
    id: "pribadi",
    name: "Sponsor Pribadi",
    description: "Untuk pemohon yang membiayai perjalanan sendiri (self-sponsored)",
    popular: false,
    icon: "💼",
    previewColor: "#F0FDF4"
  },
]
```

**Hover card:** `scale: 1.02` + shadow-lg, border-gray-300, 0.2s ease-out via `whileHover`

**Selected card:** border-2 border-orange, bg orange-50, lingkaran check Heroicons `CheckCircleIcon` 20px orange di pojok kanan atas

**Tombol Lanjut:**
- Centered, mt-8
- Disabled (gray, cursor-not-allowed) kalau belum pilih template
- Active: orange pill lg `Lanjut ke Review & Edit →`
- `AnimatePresence` — tombol fade-in saat template dipilih

---

### STEP 2 — REVIEW & EDIT

**Sebelum step ini — PAYWALL CHECK:**
Jika user belum punya paket → paywall modal muncul (style sama seperti paywall quiz) dengan harga `Rp 15.000/generate`. Jika sudah → langsung masuk step 2.

**Layout:** 2 kolom desktop (kiri 45% form, kanan 55% preview), 1 kolom mobile (form di atas, preview di bawah accordion-style)

---

**KOLOM KIRI — FORM INPUT:**

Header kolom: `Isi Data Surat` Poppins SemiBold 18px navy + tombol `Ambil dari Profil` kecil (ghost orange, Heroicons `UserIcon` 16px)

**Form untuk template "Sponsor Keluarga":**

*Section: Data Pemohon (yang apply visa)*
- Nama Lengkap (text input)
- Nomor Paspor (text input)
- Tanggal Lahir (date input)
- Hubungan dengan Sponsor (select: Anak / Suami/Istri / Orang Tua)

*Section: Data Sponsor*
- Nama Lengkap Sponsor (text input)
- Nomor KTP Sponsor (text input)
- Alamat Lengkap (textarea, min-height 80px)
- Nomor Telepon (text input)

*Section: Detail Perjalanan*
- Negara Tujuan (text input)
- Tanggal Keberangkatan (date input)
- Tanggal Kepulangan (date input)
- Kota di Negara Tujuan (text input)

**Style semua input:**
- Border gray-200, rounded-xl (10px), DM Sans 15px
- Focus: border-orange + ring `rgba(249,115,22,0.15)`
- Label: DM Sans Medium 13px gray-700, mb-1
- Section header: Poppins SemiBold 14px navy, border-b gray-100 pb-2 mb-4

**Form untuk template "Sponsor Perusahaan":**
Tambahan field: Nama Perusahaan, Jabatan, Nomor Surat, Nama HR/Penandatangan, Jabatan Penandatangan

**Form untuk template "Sponsor Pribadi":**
Field lebih sederhana: Nama, Paspor, Pekerjaan, Penghasilan Bulanan, Tujuan & Durasi

---

**KOLOM KANAN — LIVE PREVIEW:**

Header kolom: `Preview Surat` Poppins SemiBold 18px navy + badge `Live Preview` pill green-100 text-green

**Preview container:**
- Aspect ratio: A4 (210/297 ≈ 0.707)
- Background: white
- Border: 1px solid gray-200
- Shadow: shadow-md
- Padding: 32px (simulasi margin surat)
- Overflow: `overflow-y: auto`, max-height 600px desktop
- Scale down untuk fit kolom: `transform: scale(0.85)` atau gunakan CSS `zoom`

**Konten preview surat (update real-time saat form diubah):**

```
[SURAT PERNYATAAN SPONSOR]           ← Poppins Bold 14px navy, center, uppercase

Yang bertanda tangan di bawah ini:
Nama    : [nama_sponsor]             ← DM Sans 12px, fill dari form
KTP     : [nomor_ktp]
Alamat  : [alamat]
Telepon : [telepon]

Dengan ini menyatakan bahwa saya bersedia menanggung biaya perjalanan untuk:
Nama    : [nama_pemohon]
Paspor  : [nomor_paspor]

Selama perjalanan ke [negara_tujuan] dari tanggal [tgl_berangkat] hingga
[tgl_pulang]...

[paragraf isi surat sesuai template & bahasa yang dipilih]

Demikian surat pernyataan ini dibuat dengan sebenarnya.

[Kota], [tanggal_hari_ini]

Yang Membuat Pernyataan,


____________________
[nama_sponsor]
```

**Animasi live preview:**
Setiap field yang berubah di form → teks yang berubah di preview melakukan `AnimatePresence` fade 0.15s (subtle, tidak mengganggu)

**Placeholder text (jika field kosong):** Highlight background kuning muda `#FEF3C7` pada bagian yang belum diisi — `[Isi nama pemohon]`

**Toggle bahasa efek:** `AnimatePresence` — seluruh konten preview fade out/in saat bahasa diubah, 0.2s

---

**Mobile — Preview sebagai Accordion:**
Tombol `Lihat Preview Surat ▾` — klik expand preview di bawah form, `AnimatePresence` height transition

---

### STEP 3 — GENERATE PDF

**Layout:** Max-w-xl mx-auto, centered, padding 40px 16px

**State 1 — Sebelum Generate:**

Card bg white rounded-2xl shadow-md padding 32px text-center

- Ilustrasi: Heroicons `DocumentArrowDownIcon` 64px dalam lingkaran bg orange-100, centered
- H3: `Surat Siap Di-Generate!` Poppins Bold 22px navy
- Sub: `Periksa sekali lagi sebelum generate. Setelah di-generate, surat akan tersimpan di Vault kamu.` DM Sans 14px gray-600
- **Summary box:** Card bg gray-50 rounded-xl padding 16px, text left:
  - `Template:` Sponsor Keluarga
  - `Bahasa:` Indonesia
  - `Pemohon:` [nama dari form]
  - `Tujuan:` [negara dari form]
  - DM Sans 13px gray-600, label gray-400
- Tombol: `← Kembali & Edit` ghost + `Generate PDF →` orange pill lg
- Trust note: `🔒 PDF dienkripsi & disimpan aman di vault kamu` DM Sans 12px gray-400 centered

**State 2 — Loading / Generating:**

`AnimatePresence` transition dari State 1

- Animasi "dokumen dicetak":
  - Heroicons `DocumentTextIcon` 64px animated — Framer Motion `y: -10→10→-10` loop + `rotate: -3→3→-3` loop, 1.5s ease-in-out repeat
  - Loading bar oranye progress dari 0→100% selama 2s (simulasi)
  - Teks: `Sedang membuat surat sponsor...` DM Sans 14px gray-600, dot animation (...)
- Background: blur overlay di belakang card

**State 3 — Setelah Generate Berhasil:**

`AnimatePresence` replace loading state

- Animasi masuk: `scale: 0.9→1` + `opacity: 0→1`, 0.4s ease-out
- Heroicons `CheckCircleIcon` 64px solid green dalam lingkaran bg green-100 — brief scale bounce `scale: 0→1.1→1` via spring
- H3: `Surat Berhasil Dibuat! 🎉` Poppins Bold 22px navy
- Sub: DM Sans 14px gray-600

**Preview PDF:**
- Card bg white border gray-200 rounded-xl shadow-sm, padding 16px
- Simulasi PDF preview: iframe atau div styled seperti dokumen, height 300px, `overflow: hidden`
- Overlay gradient di bawah: `linear-gradient(to bottom, transparent 60%, white 100%)` — dengan teks `Scroll untuk lihat semua ↓`

**4 Tombol Action:**
- `Download PDF` — orange pill lg, Heroicons `ArrowDownTrayIcon` — primary
- `Simpan ke Vault` — ghost navy pill lg, Heroicons `FolderArrowDownIcon`
- `Bagikan via WhatsApp` — ghost green pill lg, Heroicons `ShareIcon`
- `Generate Ulang` — ghost gray text sm, Heroicons `ArrowPathIcon` 14px — di bawah, kecil

---

### 🎞️ ANIMATION RULES — SEMUA TOOLS

**Prinsip: Framer Motion, subtle, purposeful. Pakai `useReducedMotion()` check.**

| Element | Effect | Duration |
|---|---|---|
| Quiz question transition | slide kiri/kanan `x: ±60` + opacity | 0.25s |
| Quiz answer select | `scale: 1.02` + bg change | 0.15s |
| Quiz `Lanjut` button appear | `opacity 0→1, y: 10→0` | 0.2s |
| Paywall modal appear | `scale: 0.92→1` + opacity | 0.3s |
| Quiz result reveal | stagger 0.1s per element | 0.4s each |
| Approval meter fill | `width: 0→X%` | 0.8s ease-out |
| Compare bar appear | `y: 100→0` | 0.25s ease-out |
| Highlight cells appear | `opacity: 0→1` | 0.3s delay 0.3s |
| Rekomendasi banner | `opacity: 0→1, y: 16→0` | 0.4s delay 0.5s |
| Step indicator transition | `layoutId` slide | 0.2s |
| Template card hover | `scale: 1.02` | 0.2s |
| Template selected | border + bg + check appear | 0.15s |
| Form → preview sync | placeholder highlight fade | 0.15s |
| Language toggle | preview content fade | 0.2s |
| Generate loading | document bounce loop | 1.5s loop |
| Generate success | `scale: 0.9→1` + bounce check | 0.4s spring |
| PDF preview fade | gradient overlay | static |

---

### 📁 FILE STRUCTURE — TOOLS

```
app/
  tools/
    quiz/
      page.tsx              ← Quiz kelayakan visa
    compare/
      page.tsx              ← Komparasi visa
    sponsor-letter/
      page.tsx              ← Generate surat sponsor

components/
  tools/
    quiz/
      QuizScreen.tsx        ← satu screen pertanyaan
      QuizOptions.tsx       ← grid pilihan jawaban
      QuizPaywall.tsx       ← paywall card Q4
      QuizResult.tsx        ← hasil + rekomendasi
      ProgressBar.tsx       ← bar tipis di atas
    compare/
      StickyCompareBar.tsx  ← bar muncul saat ada visa dipilih
      CompareTable.tsx      ← tabel perbandingan
      AddVisaModal.tsx      ← modal search tambah visa
      RecommendBanner.tsx   ← rekomendasi personal
    sponsor-letter/
      StepIndicator.tsx     ← progress 3 step
      TemplateSelector.tsx  ← step 1: pilih template
      SponsorForm.tsx       ← step 2: form kiri
      LetterPreview.tsx     ← step 2: preview kanan
      GenerateStep.tsx      ← step 3: generate + download
      LanguageToggle.tsx    ← toggle ID/EN
```