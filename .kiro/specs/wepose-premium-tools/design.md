# Design Document: WEPOSE Premium Tools

## Overview

WEPOSE Premium Tools is a comprehensive feature that adds three interactive premium tools to the WEPOSE platform: Quiz Kelayakan Visa (Visa Eligibility Quiz), Visa Comparison Tool, and Sponsor Letter Generator. These tools provide value-added services to users through guided, visual, and professional experiences.

### Purpose

The Premium Tools feature serves multiple business and user objectives:
- Provide interactive tools that help users make informed visa decisions
- Generate additional revenue through freemium model (quiz and sponsor letter are paid)
- Enhance user engagement through immersive, full-screen experiences
- Deliver professional-grade outputs (visa recommendations, comparison tables, sponsor letters)
- Maintain design consistency with the WEPOSE landing page

### Key Features

1. **Quiz Kelayakan Visa**: An 8-question interactive quiz that provides personalized visa recommendations with approval probability analysis
2. **Visa Comparison Tool**: A side-by-side comparison table for 2-3 visas across 8 criteria with intelligent highlighting
3. **Sponsor Letter Generator**: A 3-step wizard that generates professional sponsor letters in Indonesian or English with live preview

### Technology Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion for smooth transitions and interactions
- **Icons**: Heroicons (@heroicons/react/24/outline and /solid)
- **Fonts**: Poppins (Bold, SemiBold, Medium) for headings, DM Sans (Regular, Medium) for body text
- **Routing**: Next.js App Router with file-based routing

## Architecture

### High-Level Architecture


```
┌─────────────────────────────────────────────────────────────┐
│                     WEPOSE Platform                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Quiz Tool   │  │  Compare     │  │  Sponsor     │     │
│  │  /tools/quiz │  │  /tools/     │  │  Letter      │     │
│  │              │  │  compare     │  │  /tools/     │     │
│  │              │  │              │  │  sponsor-    │     │
│  │              │  │              │  │  letter      │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │  Shared         │                        │
│                  │  Components     │                        │
│                  │  - Navbar       │                        │
│                  │  - Paywall      │                        │
│                  │  - Modals       │                        │
│                  └────────┬────────┘                        │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │  Design System  │                        │
│                  │  - Colors       │                        │
│                  │  - Typography   │                        │
│                  │  - Animations   │                        │
│                  └─────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

The Premium Tools feature follows a modular component architecture with three main tool modules and shared components:

**Tool Modules:**
- Each tool is a self-contained Next.js page with its own components
- Tools share common design patterns but have unique workflows
- State management is local to each tool (React hooks)

**Shared Components:**
- Navbar: Consistent navigation across all tools
- Paywall: Reusable payment gate for quiz and sponsor letter
- Modals: Confirmation dialogs, search modals
- Animation wrappers: Framer Motion utilities

**Design System:**
- Centralized design tokens (colors, spacing, typography)
- Reusable animation variants
- Consistent interaction patterns



### Data Flow

#### Quiz Tool Data Flow

```
User starts quiz
    ↓
Load question 1-3 (free)
    ↓
User answers questions → Store in state (Record<number, string>)
    ↓
Update progress bar → Calculate (currentQ / 8) * 100%
    ↓
Reach question 4 → Check access
    ├─ Has premium access? → Continue to Q4-8
    └─ No access? → Show paywall
        ├─ User pays → Unlock quiz → Continue
        └─ User cancels → Stay at Q3
    ↓
Complete all 8 questions
    ↓
Calculate recommendation based on answers
    ↓
Display results with approval meter
```

#### Comparison Tool Data Flow

```
User selects visa from catalog/detail page
    ↓
Add to comparison state (array of visa IDs)
    ↓
Show sticky compare bar at bottom
    ↓
User clicks "Bandingkan Sekarang"
    ↓
Navigate to /tools/compare
    ↓
Fetch visa details for selected IDs
    ↓
Render comparison table with 8 criteria
    ↓
Highlight best/worst values per row
    ↓
Show personalized recommendation (if logged in)
```

#### Sponsor Letter Data Flow

```
User navigates to /tools/sponsor-letter
    ↓
Step 1: Select template (Keluarga/Perusahaan/Pribadi)
    ↓
Check access → Show paywall if needed
    ↓
Step 2: Fill form + Live preview
    ├─ User types in form → Update formData state
    └─ formData changes → Re-render preview with new data
    ↓
Toggle language (ID/EN) → Update preview content
    ↓
Step 3: Review summary
    ↓
User clicks "Generate PDF"
    ↓
Show loading animation (2s simulation)
    ↓
Generate PDF (backend API call)
    ↓
Display success state with preview + download button
```



## Components and Interfaces

### Quiz Kelayakan Visa Components

#### 1. QuizPage (`app/tools/quiz/page.tsx`)

Main page component that orchestrates the quiz experience.

**State:**
```typescript
interface QuizState {
  currentQuestion: number;           // 0-7 (index of current question)
  answers: Record<number, string>;   // Map of question index to selected answer
  isUnlocked: boolean;               // Whether user has premium access
  showPaywall: boolean;              // Whether to show paywall modal
  showResult: boolean;               // Whether to show results page
}
```

**Props:** None (page component)

**Responsibilities:**
- Manage quiz state and navigation
- Handle paywall logic at question 4
- Coordinate transitions between questions
- Trigger result calculation when complete

#### 2. ProgressBar (`components/tools/quiz/ProgressBar.tsx`)

Fixed progress indicator at the top of the screen.

**Props:**
```typescript
interface ProgressBarProps {
  current: number;    // Current question number (1-8)
  total: number;      // Total questions (8)
}
```

**Styling:**
- Position: `fixed top-0 left-0 right-0 z-50`
- Height: 3px
- Background: `rgba(255,255,255,0.1)`
- Fill: Orange `#F97316` with smooth width animation

**Animation:**
- Width animates from previous percentage to new percentage
- Duration: 300ms ease-out
- Uses Framer Motion `motion.div` with `animate` prop



#### 3. QuizScreen (`components/tools/quiz/QuizScreen.tsx`)

Single question screen with category, question text, and answer options.

**Props:**
```typescript
interface QuizScreenProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  icon: string;      // Emoji
  label: string;
}
```

**Layout:**
- Max-width: `xl` (1280px)
- Padding: `px-6 py-16`
- Min-height: Full viewport
- Centered with flexbox

**Animation Variants:**
```typescript
const variants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { x: -60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
};
```

#### 4. QuizOptions (`components/tools/quiz/QuizOptions.tsx`)

Grid of answer option cards.

**Props:**
```typescript
interface QuizOptionsProps {
  options: QuizOption[];
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}
```

**Grid Layout:**
- 2 columns when 4 options: `grid-cols-2`
- 1 column when 2-3 options: `grid-cols-1`
- Gap: `gap-4`

**Card States:**
- Default: `bg-white/8 border-white/15`
- Hover: `border-orange/60 bg-orange/10 scale-1.03`
- Selected: `bg-orange border-orange scale-1.02`
- Tap: `scale-0.97`



#### 5. QuizPaywall (`components/tools/quiz/QuizPaywall.tsx`)

Payment gate modal that appears before question 4.

**Props:**
```typescript
interface QuizPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onBundleWithVisa: () => void;
}
```

**Content Structure:**
1. Lock icon (48px) in orange-100 circle
2. "PREMIUM TOOL" badge (purple)
3. Heading: "Lanjutkan untuk Hasil Lengkap"
4. Description paragraph
5. Price: "Rp 25.000" (large) + "/sesi" (small)
6. 3 value propositions with checkmarks
7. Primary CTA: "Buka Quiz Sekarang — Rp 25.000"
8. Secondary CTA: "Bundling dengan Order Visa (Gratis)"
9. Link: "Sudah punya akses? Masuk"

**Animation:**
- Modal: `scale: 0.92→1, opacity: 0→1` (300ms)
- Overlay: `opacity: 0→1` (300ms)
- Uses `AnimatePresence` for mount/unmount

#### 6. QuizResult (`components/tools/quiz/QuizResult.tsx`)

Results page showing visa recommendation and approval analysis.

**Props:**
```typescript
interface QuizResultProps {
  recommendation: VisaRecommendation;
  onRestart: () => void;
  onApply: () => void;
  onSave: () => void;
}

interface VisaRecommendation {
  visaName: string;
  country: string;
  flag: string;
  approvalLevel: 'TINGGI' | 'SEDANG' | 'RENDAH';
  approvalPercentage: number;
  tips: string[];
  requiredDocuments: string[];
}
```

**Stagger Animation:**
- Each section appears with 100ms delay
- Uses `useInView` from Framer Motion
- Sequence: emoji → label → visa name → approval meter → tips → documents → CTAs

**Approval Meter:**
- Progress bar animates width from 0 to percentage
- Duration: 800ms ease-out
- Color based on level:
  - TINGGI: Green gradient
  - SEDANG: Amber gradient
  - RENDAH: Red gradient



### Visa Comparison Tool Components

#### 1. ComparePage (`app/tools/compare/page.tsx`)

Main comparison page with table and controls.

**State:**
```typescript
interface CompareState {
  selectedVisas: string[];        // Array of visa IDs (max 3)
  visaData: VisaData[];          // Fetched visa details
  showAddModal: boolean;          // Whether add visa modal is open
}

interface VisaData {
  id: string;
  name: string;
  flag: string;
  price: string;
  stayDuration: string;
  validity: string;
  processTime: string;
  visaType: string;
  needAppointment: string;
  needPhysicalDoc: string;
  suitableFor: string;
}
```

**Layout:**
- Navbar: Sticky at top
- Header: Navy-mid background with title
- Add visa cards: Dashed border placeholders
- Comparison table: Scrollable on mobile
- Recommendation banner: Below table (if logged in)

#### 2. StickyCompareBar (`components/tools/compare/StickyCompareBar.tsx`)

Persistent bottom bar showing selected visas across all pages.

**Props:**
```typescript
interface StickyCompareBarProps {
  selectedVisas: VisaThumbnail[];
  onRemove: (visaId: string) => void;
  onCompare: () => void;
}

interface VisaThumbnail {
  id: string;
  name: string;
  flag: string;
}
```

**Styling:**
- Position: `fixed bottom-0 left-0 right-0 z-50`
- Background: Navy `#0F1F3D`
- Height: 72px
- Shadow: `0 -4px 20px rgba(0,0,0,0.3)`

**Animation:**
- Appears: `y: 100→0` slide-up (250ms)
- Thumbnail add/remove: `AnimatePresence` with scale and opacity

**Behavior:**
- Shows max 3 visa thumbnails
- Compare button disabled when < 2 visas
- Persists across page navigation



#### 3. CompareTable (`components/tools/compare/CompareTable.tsx`)

Side-by-side comparison table with 8 criteria rows.

**Props:**
```typescript
interface CompareTableProps {
  visas: VisaData[];
  onRemoveVisa: (visaId: string) => void;
  onApplyVisa: (visaId: string) => void;
}
```

**Table Structure:**
- Column 0: Criteria labels (200px desktop, 140px mobile)
- Columns 1-3: Visa data
- Header row: Sticky at `top: 64px`

**8 Criteria Rows:**
1. Harga Mulai Dari (BanknotesIcon)
2. Durasi Tinggal (CalendarDaysIcon)
3. Masa Berlaku Visa (ClockIcon)
4. Waktu Proses (BoltIcon)
5. Jenis Visa (DocumentIcon)
6. Perlu Appointment (BuildingOfficeIcon)
7. Dokumen Fisik (DocumentArrowDownIcon)
8. Cocok Untuk (UserGroupIcon)

**Highlighting Logic:**
- Best value per row: Green background `#DCFCE7` + star icon
- Worst value per row (price/time only): Red background `#FEE2E2`
- Highlight animation: `opacity: 0→1` with 300ms delay

**Responsive:**
- Desktop: Full table visible
- Mobile: Horizontal scroll with `overflow-x: auto`

#### 4. AddVisaModal (`components/tools/compare/AddVisaModal.tsx`)

Search modal for adding visas to comparison.

**Props:**
```typescript
interface AddVisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVisa: (visaId: string) => void;
  excludeIds: string[];  // Already selected visas
}
```

**Features:**
- Search input with autofocus
- Real-time filtering of visa list
- Empty state when no results
- Keyboard navigation support

**Animation:**
- Modal: `scale: 0.95→1, opacity: 0→1` (250ms)
- Overlay: `rgba(0,0,0,0.5)` fade-in



#### 5. RecommendBanner (`components/tools/compare/RecommendBanner.tsx`)

Personalized recommendation banner (shown only when logged in).

**Props:**
```typescript
interface RecommendBannerProps {
  recommendedVisa: {
    name: string;
    flag: string;
    reason: string;
  };
  onApply: () => void;
}
```

**Styling:**
- Background: `orange-50`
- Border-left: 4px solid orange
- Rounded-right: 2xl
- Padding: 20px

**Content:**
- Sparkles icon (24px orange)
- Text: "Berdasarkan profilmu, kami rekomendasikan:"
- Visa name with flag
- Reason in italic
- Apply button (orange pill)

**Animation:**
- Appears: `opacity: 0→1, y: 16→0` with 500ms delay

### Sponsor Letter Generator Components

#### 1. SponsorLetterPage (`app/tools/sponsor-letter/page.tsx`)

Main page with 3-step wizard.

**State:**
```typescript
interface SponsorLetterState {
  step: 1 | 2 | 3;
  selectedTemplate: 'keluarga' | 'perusahaan' | 'pribadi' | null;
  formData: SponsorFormData;
  language: 'id' | 'en';
  isGenerating: boolean;
  pdfUrl: string | null;
}

interface SponsorFormData {
  // Common fields
  applicantName: string;
  passportNumber: string;
  birthDate: string;
  
  // Sponsor fields
  sponsorName: string;
  sponsorIdNumber: string;
  sponsorAddress: string;
  sponsorPhone: string;
  
  // Travel fields
  destinationCountry: string;
  departureDate: string;
  returnDate: string;
  destinationCity: string;
  
  // Template-specific fields
  relationship?: string;           // Keluarga
  companyName?: string;            // Perusahaan
  position?: string;               // Perusahaan
  letterNumber?: string;           // Perusahaan
  signerName?: string;             // Perusahaan
  signerPosition?: string;         // Perusahaan
  occupation?: string;             // Pribadi
  monthlyIncome?: string;          // Pribadi
}
```



#### 2. StepIndicator (`components/tools/sponsor-letter/StepIndicator.tsx`)

Progress indicator showing 3 steps.

**Props:**
```typescript
interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  completedSteps: number[];
}
```

**Step States:**
- Completed: Green circle with checkmark + green text
- Active: Orange circle with number + orange bold text
- Pending: Gray circle with number + gray text

**Connector Lines:**
- Green if previous step completed
- Gray if not completed

**Animation:**
- Uses `layoutId` for smooth circle transitions
- Step change: 200ms ease-out

#### 3. TemplateSelector (`components/tools/sponsor-letter/TemplateSelector.tsx`)

Step 1: Template selection cards.

**Props:**
```typescript
interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  onNext: () => void;
}
```

**3 Templates:**
1. **Sponsor Keluarga** (👨‍👩‍👧)
   - Tag: "Paling Populer"
   - Description: "Untuk pemohon yang dibiayai oleh anggota keluarga"
   
2. **Sponsor Perusahaan** (🏢)
   - Description: "Untuk perjalanan bisnis atau dinas yang dibiayai perusahaan"
   
3. **Sponsor Pribadi** (💼)
   - Description: "Untuk pemohon yang membiayai perjalanan sendiri"

**Card Interaction:**
- Hover: `scale: 1.02` + shadow-lg (200ms)
- Selected: Orange border + orange-50 background + checkmark



#### 4. SponsorForm (`components/tools/sponsor-letter/SponsorForm.tsx`)

Step 2: Form input (left column on desktop).

**Props:**
```typescript
interface SponsorFormProps {
  template: 'keluarga' | 'perusahaan' | 'pribadi';
  formData: SponsorFormData;
  onChange: (field: string, value: string) => void;
  onLoadFromProfile: () => void;
}
```

**Form Sections:**

**For "Keluarga" template:**
- Data Pemohon: Nama, Paspor, Tanggal Lahir, Hubungan dengan Sponsor
- Data Sponsor: Nama, KTP, Alamat, Telepon
- Detail Perjalanan: Negara, Tanggal Berangkat, Tanggal Pulang, Kota

**For "Perusahaan" template:**
- Data Pemohon: Nama, Paspor, Tanggal Lahir, Jabatan
- Data Perusahaan: Nama Perusahaan, Nomor Surat, Nama Penandatangan, Jabatan Penandatangan
- Detail Perjalanan: (same as above)

**For "Pribadi" template:**
- Data Pemohon: Nama, Paspor, Pekerjaan, Penghasilan Bulanan
- Detail Perjalanan: (same as above)

**Input Styling:**
- Border: gray-200, rounded-xl (10px)
- Focus: border-orange + ring `rgba(249,115,22,0.15)`
- Label: DM Sans Medium 13px gray-700

#### 5. LetterPreview (`components/tools/sponsor-letter/LetterPreview.tsx`)

Step 2: Live preview (right column on desktop).

**Props:**
```typescript
interface LetterPreviewProps {
  template: 'keluarga' | 'perusahaan' | 'pribadi';
  formData: SponsorFormData;
  language: 'id' | 'en';
}
```

**Preview Container:**
- Aspect ratio: A4 (0.707)
- Background: white
- Border: 1px gray-200
- Shadow: md
- Padding: 32px (simulates letter margins)
- Max-height: 600px with scroll

**Content Structure:**
```
[SURAT PERNYATAAN SPONSOR]

Yang bertanda tangan di bawah ini:
Nama    : [nama_sponsor]
KTP     : [nomor_ktp]
Alamat  : [alamat]
Telepon : [telepon]

Dengan ini menyatakan bahwa saya bersedia menanggung biaya perjalanan untuk:
Nama    : [nama_pemohon]
Paspor  : [nomor_paspor]

[Template-specific paragraphs based on selected template and language]

Demikian surat pernyataan ini dibuat dengan sebenarnya.

[Kota], [tanggal_hari_ini]

Yang Membuat Pernyataan,

____________________
[nama_sponsor]
```

**Live Update:**
- When form field changes, preview updates with 150ms fade animation
- Empty fields show yellow highlight: `bg-yellow-100` with placeholder text
- Language toggle triggers full content fade (200ms)



#### 6. LanguageToggle (`components/tools/sponsor-letter/LanguageToggle.tsx`)

Toggle between Indonesian and English.

**Props:**
```typescript
interface LanguageToggleProps {
  language: 'id' | 'en';
  onChange: (language: 'id' | 'en') => void;
}
```

**Styling:**
- Pill toggle with two options
- Selected: Orange background + white text
- Unselected: white/10 background + white/60 text
- Smooth transition with `AnimatePresence`

#### 7. GenerateStep (`components/tools/sponsor-letter/GenerateStep.tsx`)

Step 3: Review, generate, and download.

**Props:**
```typescript
interface GenerateStepProps {
  formData: SponsorFormData;
  template: string;
  language: 'id' | 'en';
  isGenerating: boolean;
  pdfUrl: string | null;
  onGenerate: () => void;
  onBack: () => void;
  onDownload: () => void;
  onSaveToVault: () => void;
  onShareWhatsApp: () => void;
  onGenerateAgain: () => void;
}
```

**Three States:**

**1. Before Generate:**
- Document icon in orange-100 circle
- Heading: "Surat Siap Di-Generate!"
- Summary box with template, language, applicant, destination
- Buttons: "← Kembali & Edit" (ghost) + "Generate PDF →" (orange)
- Trust note: "🔒 PDF dienkripsi & disimpan aman di vault kamu"

**2. Loading:**
- Animated document icon (bounce + rotate loop, 1500ms)
- Progress bar: 0→100% in 2000ms
- Text: "Sedang membuat surat sponsor..." with dot animation
- Blur overlay behind card

**3. Success:**
- Green checkmark with bounce animation (spring)
- Heading: "Surat Berhasil Dibuat! 🎉"
- PDF preview (300px height) with gradient overlay
- 4 action buttons:
  - "Download PDF" (orange pill, primary)
  - "Simpan ke Vault" (ghost navy)
  - "Bagikan via WhatsApp" (ghost green)
  - "Generate Ulang" (ghost gray, small)



## Data Models

### Quiz Data Model

```typescript
// Question data structure
interface QuizQuestion {
  id: number;                    // 1-8
  category: string;              // e.g., "TUJUAN PERJALANAN"
  question: string;              // Question text
  options: QuizOption[];         // 2-4 options
}

interface QuizOption {
  icon: string;                  // Emoji (e.g., "✈️")
  label: string;                 // Option text
  value: string;                 // Internal value for logic
}

// Quiz state
interface QuizState {
  currentQuestion: number;       // 0-7 (array index)
  answers: Record<number, string>; // { 0: "wisata", 1: "eropa", ... }
  isUnlocked: boolean;           // Premium access flag
  showPaywall: boolean;
  showResult: boolean;
}

// Result data
interface VisaRecommendation {
  visaName: string;              // e.g., "France Schengen Tourist"
  country: string;               // e.g., "Prancis"
  flag: string;                  // Emoji flag
  approvalLevel: 'TINGGI' | 'SEDANG' | 'RENDAH';
  approvalPercentage: number;    // 0-100
  tips: string[];                // 3 tips to improve approval
  requiredDocuments: string[];   // List of required documents
}
```

### Comparison Data Model

```typescript
// Visa data for comparison
interface VisaData {
  id: string;                    // Unique visa ID
  name: string;                  // e.g., "France Schengen Tourist"
  flag: string;                  // Emoji flag
  price: string;                 // e.g., "Rp 1.850.000"
  stayDuration: string;          // e.g., "90 hari"
  validity: string;              // e.g., "3 bulan"
  processTime: string;           // e.g., "15–20 hari kerja"
  visaType: string;              // e.g., "Sticker" or "e-Visa"
  needAppointment: string;       // "Ya" or "Tidak"
  needPhysicalDoc: string;       // "Ya" or "Tidak"
  suitableFor: string;           // e.g., "Wisata, Bisnis"
}

// Comparison state
interface CompareState {
  selectedVisas: string[];       // Array of visa IDs (max 3)
  visaData: VisaData[];         // Fetched details
  showAddModal: boolean;
}

// Criteria for comparison table
interface ComparisonCriteria {
  key: keyof VisaData;
  label: string;
  icon: string;                  // Heroicon name
  highlightBest: boolean;        // Whether to highlight best value
  highlightWorst: boolean;       // Whether to highlight worst value
  compareFunction: (a: string, b: string) => number; // For sorting
}
```



### Sponsor Letter Data Model

```typescript
// Template types
type TemplateType = 'keluarga' | 'perusahaan' | 'pribadi';
type Language = 'id' | 'en';

// Form data structure
interface SponsorFormData {
  // Common fields (all templates)
  applicantName: string;
  passportNumber: string;
  birthDate: string;
  destinationCountry: string;
  departureDate: string;
  returnDate: string;
  destinationCity: string;
  
  // Sponsor fields (keluarga, perusahaan)
  sponsorName?: string;
  sponsorIdNumber?: string;
  sponsorAddress?: string;
  sponsorPhone?: string;
  
  // Keluarga-specific
  relationship?: 'Anak' | 'Suami/Istri' | 'Orang Tua';
  
  // Perusahaan-specific
  companyName?: string;
  position?: string;
  letterNumber?: string;
  signerName?: string;
  signerPosition?: string;
  
  // Pribadi-specific
  occupation?: string;
  monthlyIncome?: string;
}

// Template configuration
interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  icon: string;
  popular: boolean;
  previewColor: string;
  requiredFields: (keyof SponsorFormData)[];
}

// Letter content
interface LetterContent {
  title: string;
  introText: string;
  bodyParagraphs: string[];
  closingText: string;
}

// Generation state
interface GenerationState {
  step: 1 | 2 | 3;
  selectedTemplate: TemplateType | null;
  formData: SponsorFormData;
  language: Language;
  isGenerating: boolean;
  pdfUrl: string | null;
  error: string | null;
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following testable properties. Through reflection, I've eliminated redundant properties and combined related ones:

**Redundancies Eliminated:**
- Multiple animation properties (3.2, 3.3, 3.5, 3.6, 3.7) consolidated into general animation property
- Multiple styling checks consolidated into component structure properties
- Conditional display properties (5.3, 5.4) combined into single access control property
- Form field properties for different templates combined into template-specific validation property

**Properties Retained:**
- Core behavioral properties that validate unique functionality
- Round-trip and state management properties
- Interaction and navigation properties
- Accessibility and responsive design properties

### Property 1: Quiz Navigation Consistency

*For any* quiz state with N answered questions, navigating forward then backward should return to the same question with the same answer preserved.

**Validates: Requirements 3.1, 3.4**

### Property 2: Progress Bar Accuracy

*For any* question number Q in the quiz (1-8), the progress bar width percentage should equal (Q / 8) * 100.

**Validates: Requirements 1.5**

### Property 3: Paywall Access Control

*For any* user state, if the user has either an active visa order OR a tools package, then the paywall should not appear at question 4.

**Validates: Requirements 5.2, 5.3, 5.4**



### Property 4: Quiz Completion Triggers Result

*For any* quiz session, when all 8 questions have been answered, the system should display the result page with a visa recommendation.

**Validates: Requirements 6.1**

### Property 5: Answer Selection Shows Next Button

*For any* quiz question, when an answer is selected, the "Lanjut →" button should appear with fade-in animation.

**Validates: Requirements 2.11**

### Property 6: Grid Layout Adapts to Option Count

*For any* quiz question with 4 options, the grid should display 2 columns; for any question with 2-3 options, the grid should display 1 column.

**Validates: Requirements 2.5, 2.6**

### Property 7: Comparison Bar Visibility

*For any* page in the WEPOSE platform, if at least one visa is selected for comparison, the sticky compare bar should be visible at the bottom of the screen.

**Validates: Requirements 7.1, 7.11**

### Property 8: Comparison Button Enablement

*For any* comparison state, the "Bandingkan Sekarang" button should be enabled if and only if 2 or 3 visas are selected.

**Validates: Requirements 7.9**

### Property 9: Comparison Table Highlighting

*For any* comparison table row with numeric values (price, process time), the cell with the best value should have green background and the cell with the worst value should have red background.

**Validates: Requirements 9.10, 9.11**

### Property 10: Recommendation Banner Conditional Display

*For any* user on the comparison page, the recommendation banner should be displayed if and only if the user is logged in.

**Validates: Requirements 10.1, 10.9**



### Property 11: Template Selection Enables Next Button

*For any* template selection state, the "Lanjut ke Review & Edit →" button should be enabled if and only if a template has been selected.

**Validates: Requirements 13.14**

### Property 12: Live Preview Synchronization

*For any* form field change in the sponsor letter form, the corresponding text in the live preview should update within 150ms.

**Validates: Requirements 15.12**

### Property 13: Language Toggle Updates Preview

*For any* sponsor letter with form data filled, toggling the language from Indonesian to English (or vice versa) should update all preview content to the selected language.

**Validates: Requirements 19.10**

### Property 14: Template-Specific Form Fields

*For any* selected template type (keluarga, perusahaan, pribadi), the form should display only the fields required for that specific template type.

**Validates: Requirements 16.1-16.6, 17.1-17.7, 18.1-18.5**

### Property 15: Step Progression Validation

*For any* sponsor letter wizard state, advancing from step N to step N+1 should only be possible if all required fields for step N are completed.

**Validates: Requirements 12.10, 13.14**

### Property 16: Reduced Motion Compliance

*For any* user with reduced motion preference enabled, all transform and transition animations should be disabled across all premium tools.

**Validates: Requirements 24.2, 24.3**

### Property 17: Responsive Layout Adaptation

*For any* viewport width less than 768px, the sponsor letter step 2 layout should display as a single column with form above and preview in an accordion below.

**Validates: Requirements 15.2, 20.1-20.5, 25.8**



### Property 18: Keyboard Navigation Accessibility

*For any* interactive element in the premium tools (buttons, cards, inputs), the element should be accessible via keyboard Tab navigation and activatable via Enter or Space key.

**Validates: Requirements 29.1, 29.2, 29.3**

### Property 19: Modal Focus Management

*For any* modal that opens, focus should move to the first interactive element within the modal, and when the modal closes, focus should return to the element that triggered the modal.

**Validates: Requirements 29.8, 29.9, 29.10**

### Property 20: State Persistence During Navigation

*For any* comparison state with selected visas, navigating to a different page and returning should preserve the selected visas in the comparison list.

**Validates: Requirements 30.4, 30.5**

### Property 21: Form Validation Error Display

*For any* form field that fails validation, an error message should be displayed below the field in red text (DM Sans 12px).

**Validates: Requirements 31.2**

### Property 22: Empty Search Results Handling

*For any* search query in the add visa modal that returns no results, the modal should display an empty state with icon and "Visa tidak ditemukan" message.

**Validates: Requirements 31.4**

### Property 23: Quiz Answer Grid Display

*For any* quiz question, the system should display between 2 and 4 answer options in a grid layout.

**Validates: Requirements 2.4**

### Property 24: Navbar Visibility During Quiz

*For any* quiz screen (questions 1-8), the Navbar and Footer components should not be rendered.

**Validates: Requirements 1.3**



### Property 25: Back Button Visibility

*For any* quiz question number Q, the back button should be visible if and only if Q > 1.

**Validates: Requirements 1.8**

### Property 26: Comparison Table Maximum Visas

*For any* comparison state, the system should allow a maximum of 3 visas to be selected for comparison.

**Validates: Requirements 7.6**

### Property 27: PDF Generation State Transitions

*For any* sponsor letter generation request, the system should transition through three states in order: before generate → loading → success (or error).

**Validates: Requirements 21.1-21.9, 22.1-22.6, 23.1-23.10**

### Property 28: Sponsor Letter Paywall Check

*For any* user attempting to access step 2 of the sponsor letter generator, if the user does not have a tools package, the paywall modal should be displayed.

**Validates: Requirements 14.1, 14.7**

### Property 29: All Answer Options Have Icons

*For any* quiz question option, the option should have both an emoji icon and a descriptive label text.

**Validates: Requirements 4.10**

### Property 30: Hover State Feedback

*For any* interactive card (quiz answer, template card, comparison row), hovering should provide visual feedback through scale transformation and/or background color change.

**Validates: Requirements 28.1, 28.3, 28.4**



## Error Handling

### Error Categories

The Premium Tools feature handles four main categories of errors:

#### 1. Payment Errors

**Scenario:** User attempts to purchase quiz access or sponsor letter generation but payment fails.

**Handling:**
- Display error message below payment button in red (DM Sans 14px)
- Message: "Pembayaran gagal. Silakan coba lagi atau hubungi support."
- Provide "Coba Lagi" button to retry payment
- Log error details to monitoring system
- Do not advance user past paywall

**User Recovery:**
- Retry payment with same method
- Try alternative payment method
- Contact support via provided link

#### 2. Form Validation Errors

**Scenario:** User submits form with invalid or missing required fields.

**Handling:**
- Display error message below each invalid field (DM Sans 12px red)
- Scroll to first error field
- Disable submit button until all errors resolved
- Provide clear, actionable error messages:
  - Empty field: "Field ini wajib diisi"
  - Invalid format: "Format tidak valid. Contoh: DD/MM/YYYY"
  - Invalid range: "Tanggal kepulangan harus setelah tanggal keberangkatan"

**User Recovery:**
- Fix validation errors based on messages
- Use "Ambil dari Profil" button to auto-fill if available
- Clear and re-enter data



#### 3. PDF Generation Errors

**Scenario:** Sponsor letter PDF generation fails due to server error or network issue.

**Handling:**
- Replace loading state with error state
- Display Heroicons XCircleIcon (64px red) in circle
- Heading: "Gagal Membuat Surat"
- Error message: "Terjadi kesalahan saat membuat surat. Silakan coba lagi."
- Provide "Coba Lagi" button (orange pill)
- Provide "Kembali & Edit" button (ghost) to return to form
- Log error to monitoring system with form data hash (not actual data)

**User Recovery:**
- Click "Coba Lagi" to retry generation
- Click "Kembali & Edit" to modify form data
- Wait and retry if server is temporarily unavailable

#### 4. Search/Data Fetching Errors

**Scenario:** Visa search returns no results or data fetch fails.

**No Results:**
- Display empty state in modal
- Heroicons DocumentMagnifyingGlassIcon (40px gray-300)
- Message: "Visa tidak ditemukan"
- Suggestion: "Coba kata kunci lain atau lihat semua visa"

**Network Error:**
- Display toast notification at top of screen
- Message: "Gagal memuat data. Periksa koneksi internet Anda."
- Auto-dismiss after 5 seconds
- Provide retry mechanism

**User Recovery:**
- Modify search query
- Check internet connection
- Refresh page
- Try again later

### Error Logging and Monitoring

All errors should be logged with the following information:
- Error type and message
- User ID (if logged in)
- Tool name (quiz/compare/sponsor-letter)
- Current state/step
- Timestamp
- Browser and device information

Critical errors (payment failures, PDF generation failures) should trigger alerts to the development team.



## Testing Strategy

### Overview

The Premium Tools feature requires a dual testing approach combining unit tests for specific scenarios and property-based tests for universal behaviors. This comprehensive strategy ensures both concrete functionality and general correctness across all possible inputs.

### Testing Approach

**Unit Tests:**
- Verify specific examples and edge cases
- Test integration points between components
- Validate error conditions and recovery
- Check specific UI states and styling

**Property-Based Tests:**
- Verify universal properties across all inputs
- Test with randomized data to find edge cases
- Ensure correctness properties hold for all valid states
- Minimum 100 iterations per property test

### Property-Based Testing Library

**Selected Library:** `fast-check` for TypeScript/JavaScript

**Rationale:**
- Native TypeScript support with excellent type inference
- Mature library with extensive generator support
- Integrates well with Jest/Vitest
- Good performance for browser-based testing
- Active maintenance and community

**Configuration:**
```typescript
// jest.config.js or vitest.config.ts
export default {
  testMatch: ['**/*.property.test.ts'],
  testTimeout: 10000, // Property tests may take longer
};
```

### Test Organization

```
tests/
  unit/
    quiz/
      QuizScreen.test.tsx
      QuizOptions.test.tsx
      QuizPaywall.test.tsx
      QuizResult.test.tsx
    compare/
      CompareTable.test.tsx
      StickyCompareBar.test.tsx
      AddVisaModal.test.tsx
    sponsor-letter/
      TemplateSelector.test.tsx
      SponsorForm.test.tsx
      LetterPreview.test.tsx
      GenerateStep.test.tsx
  property/
    quiz.property.test.ts
    compare.property.test.ts
    sponsor-letter.property.test.ts
    accessibility.property.test.ts
    responsive.property.test.ts
```



### Property Test Examples

#### Example 1: Quiz Navigation Consistency (Property 1)

```typescript
// tests/property/quiz.property.test.ts
import fc from 'fast-check';
import { renderQuiz, answerQuestion, navigateBack } from './quiz-helpers';

/**
 * Feature: wepose-premium-tools, Property 1: Quiz Navigation Consistency
 * For any quiz state with N answered questions, navigating forward then 
 * backward should return to the same question with the same answer preserved.
 */
test('quiz navigation preserves answers', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 6 }), // Question index (0-6, not 7 since we need to go forward)
      fc.array(fc.string(), { minLength: 8, maxLength: 8 }), // 8 answers
      (questionIndex, answers) => {
        const quiz = renderQuiz();
        
        // Navigate to questionIndex and answer questions
        for (let i = 0; i <= questionIndex; i++) {
          answerQuestion(quiz, answers[i]);
          if (i < questionIndex) quiz.clickNext();
        }
        
        const currentAnswer = quiz.getSelectedAnswer();
        const currentQuestionNumber = quiz.getCurrentQuestionNumber();
        
        // Navigate forward then back
        quiz.clickNext();
        quiz.clickBack();
        
        // Verify we're back at the same question with same answer
        expect(quiz.getCurrentQuestionNumber()).toBe(currentQuestionNumber);
        expect(quiz.getSelectedAnswer()).toBe(currentAnswer);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Example 2: Progress Bar Accuracy (Property 2)

```typescript
/**
 * Feature: wepose-premium-tools, Property 2: Progress Bar Accuracy
 * For any question number Q in the quiz (1-8), the progress bar width 
 * percentage should equal (Q / 8) * 100.
 */
test('progress bar reflects current question accurately', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 8 }), // Question number 1-8
      (questionNumber) => {
        const quiz = renderQuiz();
        
        // Navigate to question
        for (let i = 1; i < questionNumber; i++) {
          answerQuestion(quiz, 'any-answer');
          quiz.clickNext();
        }
        
        const expectedPercentage = (questionNumber / 8) * 100;
        const actualPercentage = quiz.getProgressBarWidth();
        
        expect(actualPercentage).toBeCloseTo(expectedPercentage, 1);
      }
    ),
    { numRuns: 100 }
  );
});
```



#### Example 3: Live Preview Synchronization (Property 12)

```typescript
/**
 * Feature: wepose-premium-tools, Property 12: Live Preview Synchronization
 * For any form field change in the sponsor letter form, the corresponding 
 * text in the live preview should update within 150ms.
 */
test('live preview updates when form changes', () => {
  fc.assert(
    fc.property(
      fc.record({
        applicantName: fc.string({ minLength: 1, maxLength: 50 }),
        passportNumber: fc.string({ minLength: 1, maxLength: 20 }),
        sponsorName: fc.string({ minLength: 1, maxLength: 50 }),
      }),
      async (formData) => {
        const { form, preview } = renderSponsorLetter('keluarga');
        
        // Fill form field
        const startTime = Date.now();
        form.fillField('applicantName', formData.applicantName);
        
        // Wait for preview to update
        await preview.waitForUpdate();
        const updateTime = Date.now() - startTime;
        
        // Verify update happened within 150ms
        expect(updateTime).toBeLessThan(150);
        
        // Verify preview contains the new value
        expect(preview.getContent()).toContain(formData.applicantName);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Example 4: Comparison Table Highlighting (Property 9)

```typescript
/**
 * Feature: wepose-premium-tools, Property 9: Comparison Table Highlighting
 * For any comparison table row with numeric values (price, process time), 
 * the cell with the best value should have green background and the cell 
 * with the worst value should have red background.
 */
test('comparison table highlights best and worst values', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          id: fc.uuid(),
          name: fc.string(),
          price: fc.integer({ min: 500000, max: 3000000 }),
          processTime: fc.integer({ min: 5, max: 30 }), // days
        }),
        { minLength: 2, maxLength: 3 }
      ),
      (visas) => {
        const table = renderComparisonTable(visas);
        
        // Check price row
        const prices = visas.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        visas.forEach((visa, index) => {
          const priceCell = table.getPriceCell(index);
          
          if (visa.price === minPrice) {
            expect(priceCell).toHaveClass('bg-green-100');
          }
          if (visa.price === maxPrice) {
            expect(priceCell).toHaveClass('bg-red-100');
          }
        });
        
        // Check process time row
        const processTimes = visas.map(v => v.processTime);
        const minTime = Math.min(...processTimes);
        const maxTime = Math.max(...processTimes);
        
        visas.forEach((visa, index) => {
          const timeCell = table.getProcessTimeCell(index);
          
          if (visa.processTime === minTime) {
            expect(timeCell).toHaveClass('bg-green-100');
          }
          if (visa.processTime === maxTime) {
            expect(timeCell).toHaveClass('bg-red-100');
          }
        });
      }
    ),
    { numRuns: 100 }
  );
});
```



### Unit Test Coverage

#### Quiz Tool Unit Tests

**QuizScreen.test.tsx:**
- Renders question with correct category and text
- Displays correct number of options (2-4)
- Shows "Lanjut" button only when answer selected
- Hides back button on first question
- Applies correct grid layout based on option count

**QuizPaywall.test.tsx:**
- Displays correct price (Rp 25.000)
- Shows 3 value propositions
- Calls onPurchase when primary button clicked
- Calls onBundleWithVisa when secondary button clicked
- Closes when overlay clicked

**QuizResult.test.tsx:**
- Displays visa recommendation with flag
- Shows approval meter with correct color based on level
- Renders 3 tips
- Displays document checklist
- Calls onApply when apply button clicked

#### Comparison Tool Unit Tests

**CompareTable.test.tsx:**
- Renders 8 criteria rows
- Displays correct icons for each criterion
- Shows visa data in correct columns
- Applies sticky header at correct scroll position
- Handles 2-3 visas correctly

**StickyCompareBar.test.tsx:**
- Appears when visas selected
- Shows correct visa count
- Disables compare button when < 2 visas
- Removes visa when × clicked
- Animates in/out correctly

#### Sponsor Letter Unit Tests

**TemplateSelector.test.tsx:**
- Displays 3 template cards
- Shows "Paling Populer" badge on Keluarga template
- Applies selected state when card clicked
- Enables next button only when template selected

**SponsorForm.test.tsx:**
- Renders correct fields for each template type
- Validates required fields
- Shows error messages for invalid inputs
- Calls onChange when field updated
- Loads data from profile when button clicked

**LetterPreview.test.tsx:**
- Displays letter with correct structure
- Updates when form data changes
- Highlights empty fields with yellow background
- Changes content when language toggled
- Maintains A4 aspect ratio

**GenerateStep.test.tsx:**
- Shows summary in before-generate state
- Displays loading animation during generation
- Shows success state with download button after generation
- Handles generation error correctly



### Integration Tests

Integration tests verify that components work together correctly:

**Quiz Flow Integration:**
- Complete quiz from start to finish
- Verify paywall appears at question 4 for non-premium users
- Verify premium users bypass paywall
- Verify result calculation based on answers

**Comparison Flow Integration:**
- Select visas from catalog page
- Verify sticky bar appears
- Navigate to comparison page
- Verify table displays correct data
- Verify recommendation banner shows for logged-in users

**Sponsor Letter Flow Integration:**
- Select template
- Fill form with valid data
- Verify live preview updates
- Toggle language
- Generate PDF
- Verify success state and download

### Accessibility Tests

**Keyboard Navigation:**
- Tab through all interactive elements
- Activate buttons with Enter/Space
- Close modals with Escape
- Navigate quiz with keyboard only

**Screen Reader:**
- Verify ARIA labels on all buttons
- Check progress bar has aria-valuenow
- Verify form labels are properly associated
- Check modal focus trap works

**Focus Management:**
- Verify focus moves to modal when opened
- Verify focus returns when modal closed
- Check focus visible indicators
- Verify skip links work

### Performance Tests

**Load Time:**
- Measure initial page load (target: < 2s on 3G)
- Measure time to interactive
- Check bundle size for each tool

**Runtime Performance:**
- Measure animation frame rate (target: 60fps)
- Check memory usage during quiz
- Verify no memory leaks in live preview
- Test with 100+ form updates

**Optimization Verification:**
- Verify dynamic imports are used
- Check images are lazy loaded
- Verify debouncing on search and preview
- Check React.memo usage on heavy components



### Visual Regression Tests

Use Playwright or Chromatic for visual regression testing:

**Quiz Screens:**
- Question screen with 2 options
- Question screen with 4 options
- Paywall modal
- Result page with high approval
- Result page with low approval

**Comparison Screens:**
- Empty comparison page
- Comparison table with 2 visas
- Comparison table with 3 visas
- Sticky compare bar
- Recommendation banner

**Sponsor Letter Screens:**
- Template selection
- Form with Keluarga template
- Form with Perusahaan template
- Form with Pribadi template
- Live preview (Indonesian)
- Live preview (English)
- Generate success state

**Responsive Views:**
- All screens at mobile (375px)
- All screens at tablet (768px)
- All screens at desktop (1280px)

### Test Data Generators

Create reusable generators for property-based tests:

```typescript
// test-utils/generators.ts
import fc from 'fast-check';

export const quizAnswerGenerator = fc.constantFrom(
  'wisata', 'bisnis', 'studi', 'keluarga'
);

export const visaDataGenerator = fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 5, maxLength: 50 }),
  flag: fc.constantFrom('🇫🇷', '🇯🇵', '🇦🇺', '🇺🇸', '🇬🇧'),
  price: fc.integer({ min: 500000, max: 3000000 }).map(p => `Rp ${p.toLocaleString()}`),
  stayDuration: fc.constantFrom('15 hari', '30 hari', '90 hari', '180 hari'),
  validity: fc.constantFrom('3 bulan', '6 bulan', '12 bulan', '24 bulan'),
  processTime: fc.integer({ min: 5, max: 30 }).map(d => `${d} hari kerja`),
  visaType: fc.constantFrom('Sticker', 'e-Visa'),
  needAppointment: fc.constantFrom('Ya', 'Tidak'),
  needPhysicalDoc: fc.constantFrom('Ya', 'Tidak'),
  suitableFor: fc.constantFrom('Wisata', 'Bisnis', 'Wisata, Bisnis'),
});

export const sponsorFormDataGenerator = (template: TemplateType) => {
  const base = fc.record({
    applicantName: fc.fullName(),
    passportNumber: fc.string({ minLength: 8, maxLength: 9 }),
    birthDate: fc.date({ min: new Date('1950-01-01'), max: new Date('2005-01-01') }),
    destinationCountry: fc.constantFrom('Prancis', 'Jepang', 'Australia', 'Amerika'),
    departureDate: fc.date({ min: new Date(), max: new Date('2025-12-31') }),
    returnDate: fc.date({ min: new Date(), max: new Date('2025-12-31') }),
    destinationCity: fc.string({ minLength: 3, maxLength: 30 }),
  });
  
  if (template === 'keluarga') {
    return fc.record({
      ...base,
      sponsorName: fc.fullName(),
      sponsorIdNumber: fc.string({ minLength: 16, maxLength: 16 }),
      sponsorAddress: fc.string({ minLength: 20, maxLength: 100 }),
      sponsorPhone: fc.string({ minLength: 10, maxLength: 15 }),
      relationship: fc.constantFrom('Anak', 'Suami/Istri', 'Orang Tua'),
    });
  }
  
  // Similar for 'perusahaan' and 'pribadi'
};
```

### Continuous Integration

All tests should run in CI pipeline:

```yaml
# .github/workflows/test.yml
name: Test Premium Tools

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run property tests
        run: npm run test:property
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Check coverage
        run: npm run test:coverage
        # Require minimum 80% coverage
```

### Test Maintenance

- Review and update tests when requirements change
- Add new property tests for new features
- Keep test data generators up to date
- Monitor test execution time and optimize slow tests
- Regularly review test coverage reports



## UI/UX Specifications

### Design System

#### Color Palette

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1F3D',
          mid: '#1E3A5F',
        },
        orange: {
          DEFAULT: '#F97316',
          dark: '#EA6B0A',
          50: '#FFF7ED',
          100: '#FFEDD5',
        },
        purple: {
          DEFAULT: '#7C3AED',
        },
      },
    },
  },
};
```

#### Typography

**Headings:**
- H1: Poppins Bold 32px (mobile: 24px)
- H2: Poppins Bold 28px (mobile: 22px)
- H3: Poppins SemiBold 22px (mobile: 18px)
- H4: Poppins SemiBold 18px (mobile: 16px)

**Body Text:**
- Large: DM Sans Regular 16px
- Medium: DM Sans Regular 15px
- Small: DM Sans Regular 14px
- Extra Small: DM Sans Regular 13px
- Tiny: DM Sans Regular 12px

**Buttons:**
- Large: Poppins SemiBold 15px
- Medium: Poppins SemiBold 14px
- Small: Poppins SemiBold 13px

#### Spacing Scale

```typescript
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '64px',
};
```

#### Border Radius

- Button: `9999px` (fully rounded)
- Card: `16px`
- Input: `10px`
- Modal: `20px`
- Badge: `9999px`



### Animation Specifications

#### Timing Functions

```typescript
const easings = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};
```

#### Duration Standards

- Micro: 150ms (hover states, small transitions)
- Short: 200-250ms (component transitions, slides)
- Medium: 300-400ms (modals, page transitions)
- Long: 500-800ms (complex animations, progress bars)

#### Animation Variants

```typescript
// Framer Motion variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
};

export const slideHorizontal = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

export const scaleIn = {
  initial: { scale: 0.92, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.92, opacity: 0 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

#### Reduced Motion Support

```typescript
import { useReducedMotion } from 'framer-motion';

export function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.3 },
    initial: shouldReduceMotion ? false : { opacity: 0 },
  };
}
```



### Interaction Patterns

#### Button States

**Primary Button (Orange):**
- Default: `bg-orange text-white`
- Hover: `shadow-[0_4px_16px_rgba(249,115,22,0.25)] translate-y-[-2px]`
- Active: `scale-[0.97]`
- Disabled: `bg-gray-300 text-gray-500 cursor-not-allowed`

**Ghost Button:**
- Default: `border-2 border-current bg-transparent`
- Hover: `bg-current/10`
- Active: `scale-[0.97]`

**Icon Button:**
- Default: `text-white/60`
- Hover: `text-white/100`
- Active: `scale-[0.95]`

#### Card States

**Interactive Card:**
- Default: `bg-white border-2 border-gray-200`
- Hover: `scale-[1.02] shadow-lg border-gray-300`
- Selected: `border-orange bg-orange-50`
- Active: `scale-[0.98]`

#### Input States

**Text Input:**
- Default: `border-gray-200 bg-white`
- Focus: `border-orange ring-4 ring-orange/15`
- Error: `border-red-500 ring-4 ring-red/15`
- Disabled: `bg-gray-100 text-gray-400 cursor-not-allowed`

### Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
};
```

#### Responsive Behavior

**Quiz:**
- Mobile (< 768px): 
  - Font size 22px for questions
  - Card min-height 96px
  - Single column for all options
- Desktop (≥ 768px):
  - Font size 28px for questions
  - Card min-height 120px
  - 2 columns for 4 options

**Comparison:**
- Mobile (< 768px):
  - Horizontal scroll for table
  - Column width 140px
  - Hide counter text in sticky bar
- Desktop (≥ 768px):
  - Full table visible
  - Column width 200px
  - Show all elements

**Sponsor Letter:**
- Mobile (< 768px):
  - Single column layout
  - Form above, preview in accordion
  - Full-width modals
- Desktop (≥ 768px):
  - Two column layout (45% / 55%)
  - Side-by-side form and preview
  - Modal width 480px



## Implementation Details

### File Structure

```
app/
  tools/
    quiz/
      page.tsx                    # Main quiz page
      layout.tsx                  # Quiz-specific layout (no navbar)
    compare/
      page.tsx                    # Comparison page
    sponsor-letter/
      page.tsx                    # Sponsor letter page

components/
  tools/
    quiz/
      ProgressBar.tsx
      QuizScreen.tsx
      QuizOptions.tsx
      QuizPaywall.tsx
      QuizResult.tsx
    compare/
      StickyCompareBar.tsx
      CompareTable.tsx
      AddVisaModal.tsx
      RecommendBanner.tsx
    sponsor-letter/
      StepIndicator.tsx
      TemplateSelector.tsx
      SponsorForm.tsx
      LetterPreview.tsx
      GenerateStep.tsx
      LanguageToggle.tsx
    shared/
      Paywall.tsx                 # Reusable paywall component
      Modal.tsx                   # Base modal component

lib/
  tools/
    quiz/
      questions.ts                # Quiz question data
      recommendation.ts           # Recommendation logic
    compare/
      criteria.ts                 # Comparison criteria config
      highlighting.ts             # Best/worst value logic
    sponsor-letter/
      templates.ts                # Template configurations
      letter-content.ts           # Letter text by language
      pdf-generator.ts            # PDF generation logic
  
hooks/
  useQuizState.ts
  useCompareState.ts
  useSponsorLetterState.ts
  usePaywall.ts
  useAnimationConfig.ts

utils/
  animations.ts                   # Framer Motion variants
  validation.ts                   # Form validation helpers
```

### State Management Strategy

#### Local State with React Hooks

Each tool manages its own state using React hooks. No global state management library needed for MVP.

**Quiz State:**
```typescript
// hooks/useQuizState.ts
export function useQuizState() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const answerQuestion = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };
  
  const goToNext = () => {
    if (currentQuestion === 2 && !isUnlocked) {
      setShowPaywall(true);
      return;
    }
    
    if (currentQuestion === 7) {
      setShowResult(true);
      return;
    }
    
    setCurrentQuestion(prev => prev + 1);
  };
  
  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  return {
    currentQuestion,
    answers,
    isUnlocked,
    showPaywall,
    showResult,
    answerQuestion,
    goToNext,
    goToPrevious,
    unlock: () => setIsUnlocked(true),
  };
}
```



**Comparison State:**
```typescript
// hooks/useCompareState.ts
export function useCompareState() {
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const addVisa = (visaId: string) => {
    if (selectedVisas.length < 3 && !selectedVisas.includes(visaId)) {
      setSelectedVisas(prev => [...prev, visaId]);
    }
  };
  
  const removeVisa = (visaId: string) => {
    setSelectedVisas(prev => prev.filter(id => id !== visaId));
  };
  
  const canCompare = selectedVisas.length >= 2;
  
  return {
    selectedVisas,
    showAddModal,
    canCompare,
    addVisa,
    removeVisa,
    openAddModal: () => setShowAddModal(true),
    closeAddModal: () => setShowAddModal(false),
  };
}
```

**Sponsor Letter State:**
```typescript
// hooks/useSponsorLetterState.ts
export function useSponsorLetterState() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [formData, setFormData] = useState<SponsorFormData>({});
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const goToNextStep = () => {
    if (step < 3) setStep(prev => (prev + 1) as 1 | 2 | 3);
  };
  
  const goToPreviousStep = () => {
    if (step > 1) setStep(prev => (prev - 1) as 1 | 2 | 3);
  };
  
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const url = await generateSponsorLetterPDF(formData, selectedTemplate!, language);
      setPdfUrl(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    step,
    selectedTemplate,
    formData,
    language,
    isGenerating,
    pdfUrl,
    setSelectedTemplate,
    updateFormData,
    setLanguage,
    goToNextStep,
    goToPreviousStep,
    generatePDF,
  };
}
```

### Data Fetching

#### Quiz Recommendation Logic

```typescript
// lib/tools/quiz/recommendation.ts
export function calculateRecommendation(
  answers: Record<number, string>
): VisaRecommendation {
  // Simple rule-based recommendation
  const destination = answers[1]; // Eropa, Asia, Amerika, Lainnya
  const purpose = answers[0];     // Wisata, Bisnis, Studi, Keluarga
  const financialStatus = answers[3]; // Saldo rekening
  const passportStatus = answers[4];  // Status paspor
  
  // Determine visa based on destination and purpose
  let visaName = '';
  let country = '';
  let flag = '';
  
  if (destination === 'eropa') {
    visaName = 'France Schengen Tourist';
    country = 'Prancis';
    flag = '🇫🇷';
  } else if (destination === 'asia') {
    visaName = 'Japan Tourist';
    country = 'Jepang';
    flag = '🇯🇵';
  } else if (destination === 'amerika') {
    visaName = 'USA Tourist (B1/B2)';
    country = 'Amerika Serikat';
    flag = '🇺🇸';
  }
  
  // Calculate approval level based on financial and document status
  let approvalLevel: 'TINGGI' | 'SEDANG' | 'RENDAH' = 'SEDANG';
  let approvalPercentage = 60;
  
  if (financialStatus === 'above_100m' && passportStatus === 'valid_1year') {
    approvalLevel = 'TINGGI';
    approvalPercentage = 85;
  } else if (financialStatus === 'below_10m' || passportStatus === 'no_passport') {
    approvalLevel = 'RENDAH';
    approvalPercentage = 35;
  }
  
  // Generate tips based on weak points
  const tips = generateTips(answers);
  
  return {
    visaName,
    country,
    flag,
    approvalLevel,
    approvalPercentage,
    tips,
    requiredDocuments: getRequiredDocuments(visaName),
  };
}
```



#### Comparison Highlighting Logic

```typescript
// lib/tools/compare/highlighting.ts
export function calculateHighlights(
  visas: VisaData[],
  criterion: keyof VisaData
): { bestIndices: number[]; worstIndices: number[] } {
  if (criterion === 'price') {
    // Lower is better for price
    const prices = visas.map(v => parsePrice(v.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return {
      bestIndices: prices.map((p, i) => p === minPrice ? i : -1).filter(i => i !== -1),
      worstIndices: prices.map((p, i) => p === maxPrice ? i : -1).filter(i => i !== -1),
    };
  }
  
  if (criterion === 'processTime') {
    // Lower is better for process time
    const times = visas.map(v => parseProcessTime(v.processTime));
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    return {
      bestIndices: times.map((t, i) => t === minTime ? i : -1).filter(i => i !== -1),
      worstIndices: times.map((t, i) => t === maxTime ? i : -1).filter(i => i !== -1),
    };
  }
  
  // For other criteria, no highlighting
  return { bestIndices: [], worstIndices: [] };
}

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ''));
}

function parseProcessTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}
```

#### PDF Generation

```typescript
// lib/tools/sponsor-letter/pdf-generator.ts
import { jsPDF } from 'jspdf';

export async function generateSponsorLetterPDF(
  formData: SponsorFormData,
  template: TemplateType,
  language: 'id' | 'en'
): Promise<string> {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const title = language === 'id' 
    ? 'SURAT PERNYATAAN SPONSOR' 
    : 'SPONSORSHIP LETTER';
  doc.text(title, 105, 20, { align: 'center' });
  
  // Body
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let y = 40;
  const lineHeight = 7;
  
  // Sponsor information
  const sponsorText = language === 'id'
    ? 'Yang bertanda tangan di bawah ini:'
    : 'I, the undersigned:';
  doc.text(sponsorText, 20, y);
  y += lineHeight * 2;
  
  doc.text(`Nama    : ${formData.sponsorName || '[Nama Sponsor]'}`, 20, y);
  y += lineHeight;
  doc.text(`KTP     : ${formData.sponsorIdNumber || '[Nomor KTP]'}`, 20, y);
  y += lineHeight;
  doc.text(`Alamat  : ${formData.sponsorAddress || '[Alamat]'}`, 20, y);
  y += lineHeight;
  doc.text(`Telepon : ${formData.sponsorPhone || '[Telepon]'}`, 20, y);
  y += lineHeight * 2;
  
  // Statement
  const statementText = language === 'id'
    ? 'Dengan ini menyatakan bahwa saya bersedia menanggung biaya perjalanan untuk:'
    : 'Hereby declare that I am willing to sponsor the travel expenses for:';
  doc.text(statementText, 20, y);
  y += lineHeight * 2;
  
  doc.text(`Nama    : ${formData.applicantName || '[Nama Pemohon]'}`, 20, y);
  y += lineHeight;
  doc.text(`Paspor  : ${formData.passportNumber || '[Nomor Paspor]'}`, 20, y);
  y += lineHeight * 2;
  
  // Template-specific content
  const bodyContent = getLetterBody(template, language, formData);
  const lines = doc.splitTextToSize(bodyContent, 170);
  doc.text(lines, 20, y);
  y += lines.length * lineHeight + lineHeight;
  
  // Closing
  const closingText = language === 'id'
    ? 'Demikian surat pernyataan ini dibuat dengan sebenarnya.'
    : 'This letter is made in good faith.';
  doc.text(closingText, 20, y);
  y += lineHeight * 3;
  
  // Signature
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.text(`Jakarta, ${today}`, 20, y);
  y += lineHeight * 4;
  
  doc.text('____________________', 20, y);
  y += lineHeight;
  doc.text(formData.sponsorName || '[Nama Sponsor]', 20, y);
  
  // Convert to blob URL
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}
```



### Performance Optimization

#### Code Splitting

```typescript
// app/tools/quiz/page.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const QuizPaywall = dynamic(() => import('@/components/tools/quiz/QuizPaywall'));
const QuizResult = dynamic(() => import('@/components/tools/quiz/QuizResult'));

export default function QuizPage() {
  const { showPaywall, showResult } = useQuizState();
  
  return (
    <>
      {/* Always loaded */}
      <QuizScreen />
      
      {/* Lazy loaded when needed */}
      {showPaywall && <QuizPaywall />}
      {showResult && <QuizResult />}
    </>
  );
}
```

#### Debouncing

```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in search
function AddVisaModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  
  const filteredVisas = useMemo(() => {
    return visas.filter(v => 
      v.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);
  
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
```

#### Memoization

```typescript
// components/tools/compare/CompareTable.tsx
import { memo, useMemo } from 'react';

export const CompareTable = memo(function CompareTable({ visas }: Props) {
  const highlights = useMemo(() => {
    return {
      price: calculateHighlights(visas, 'price'),
      processTime: calculateHighlights(visas, 'processTime'),
    };
  }, [visas]);
  
  return (
    <table>
      {/* Table content */}
    </table>
  );
});
```

### Security Considerations

#### Input Sanitization

```typescript
// utils/validation.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

// Usage in form
function SponsorForm() {
  const handleChange = (field: string, value: string) => {
    const sanitized = sanitizeInput(value);
    updateFormData(field, sanitized);
  };
}
```

#### Payment Security

- Use secure payment gateway (Midtrans, Xendit)
- Never store payment credentials
- Implement CSRF protection
- Use HTTPS for all payment requests
- Validate payment status server-side

#### PDF Security

- Generate PDFs server-side to prevent tampering
- Add watermark with generation timestamp
- Encrypt PDFs with user-specific password
- Store PDFs in secure, private storage
- Implement access control for PDF downloads



### Deployment Considerations

#### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.wepose.com
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY=pk_test_xxx
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX

# Server-only
PAYMENT_GATEWAY_SECRET=sk_live_xxx
PDF_STORAGE_BUCKET=wepose-pdfs
DATABASE_URL=postgresql://xxx
```

#### Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: ['wepose.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Analyze bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default config;
```

#### Monitoring and Analytics

```typescript
// lib/analytics.ts
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Usage
trackEvent('quiz_completed', {
  recommendation: visaName,
  approval_level: approvalLevel,
});

trackEvent('pdf_generated', {
  template: selectedTemplate,
  language: language,
});
```

### Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on icon-only buttons
- [ ] Form labels properly associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Modal focus trap implemented
- [ ] Skip links for keyboard navigation
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Animations respect prefers-reduced-motion
- [ ] Alt text for all images (if any)
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Tables have proper headers and captions

### Browser Support

**Target Browsers:**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 10+

**Polyfills:**
- Not required for modern browsers
- Consider polyfills for older browsers if needed

### Internationalization (Future)

While the MVP supports Indonesian and English for sponsor letters, the architecture should support future expansion:

```typescript
// lib/i18n/translations.ts
export const translations = {
  id: {
    quiz: {
      title: 'Quiz Kelayakan Visa',
      next: 'Lanjut',
      back: 'Kembali',
    },
  },
  en: {
    quiz: {
      title: 'Visa Eligibility Quiz',
      next: 'Next',
      back: 'Back',
    },
  },
};
```

## Summary

The WEPOSE Premium Tools feature provides three interactive tools that enhance the user experience and generate revenue through a freemium model. The design emphasizes:

1. **Immersive Experiences**: Full-screen quiz, focused workflows
2. **Visual Feedback**: Smooth animations, clear state changes
3. **Mobile-First**: Responsive design that works on all devices
4. **Accessibility**: Keyboard navigation, screen reader support
5. **Performance**: Code splitting, lazy loading, debouncing
6. **Testability**: Property-based tests ensure correctness
7. **Consistency**: Shared design system with landing page

The implementation uses modern React patterns with Next.js 14, TypeScript for type safety, Tailwind CSS for styling, and Framer Motion for animations. The architecture is modular and maintainable, with clear separation of concerns and comprehensive testing strategy.

