# Design Document: WEPOSE Landing Page

## Overview

WEPOSE landing page adalah single-page application (SPA) yang dibangun dengan Next.js 14 (App Router), TypeScript, Tailwind CSS, dan Framer Motion. Landing page ini dirancang untuk memberikan pengalaman yang warm, guided, local, visual, dan trustworthy dengan fokus pada animasi yang subtle dan purposeful.

### Design Goals

1. **Visual Impact**: Menggunakan WorldMap component sebagai hero background untuk menunjukkan jangkauan global WEPOSE
2. **Conversational Tone**: Menggunakan bahasa Indonesia yang natural dan friendly
3. **Smooth Animations**: Semua animasi menggunakan Framer Motion dengan prinsip purposeful motion
4. **Mobile-First**: Responsive design yang optimal di semua device sizes
5. **Performance**: Fast loading dengan optimized images dan lazy loading
6. **Accessibility**: WCAG compliant dengan proper semantic HTML dan keyboard navigation

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion v11
- **Icons**: Heroicons v2
- **Fonts**: Google Fonts (Poppins, DM Sans)
- **Map Visualization**: dotted-map library

### Key Features

- Sticky navigation dengan mega menu dropdown
- Hero section dengan WorldMap interactive background
- 6 visa cards dengan hover animations
- FAQ accordion dengan smooth transitions
- Stats counter dengan count-up animation
- Mobile drawer navigation
- Scroll-triggered animations dengan useInView

## Architecture

### High-Level Structure

```
app/
├── page.tsx                    # Main landing page
├── layout.tsx                  # Root layout dengan fonts
├── globals.css                 # Tailwind imports + custom styles
components/
├── layout/
│   ├── Navbar.tsx             # Sticky navbar dengan mega menu
│   ├── MegaMenu.tsx           # Dropdown menu untuk "Visa"
│   ├── MobileDrawer.tsx       # Full-screen mobile navigation
│   └── Footer.tsx             # Footer dengan 4 kolom
├── sections/
│   ├── HeroSection.tsx        # Hero dengan WorldMap background
│   ├── CaraKerjaSection.tsx   # 4 step cards
│   ├── VisaPopulerSection.tsx # 6 visa cards grid
│   ├── TestimoniSection.tsx   # 3 review cards
│   ├── StatsSection.tsx       # 4 stats dengan counter
│   ├── FAQSection.tsx         # Accordion FAQ
│   └── FinalCTASection.tsx    # Final call-to-action
├── ui/
│   ├── WorldMap.tsx           # Interactive world map component
│   ├── VisaCard.tsx           # Reusable visa card
│   ├── StepCard.tsx           # Step card untuk Cara Kerja
│   ├── ReviewCard.tsx         # Review card untuk Testimoni
│   ├── FAQAccordion.tsx       # Accordion item
│   ├── Button.tsx             # Reusable button component
│   ├── Badge.tsx              # Reusable badge component
│   └── StatsCounter.tsx       # Animated counter component
├── hooks/
│   └── useCountUp.ts          # Custom hook untuk count-up animation
└── lib/
    ├── constants.ts           # Colors, breakpoints, animation configs
    └── types.ts               # TypeScript interfaces
```

### Component Hierarchy

```
LandingPage
├── Navbar
│   ├── Logo
│   ├── NavLinks (desktop)
│   │   └── MegaMenu (on "Visa" hover)
│   ├── ActionButtons
│   └── HamburgerButton (mobile)
│       └── MobileDrawer
├── HeroSection
│   ├── WorldMap (absolute background)
│   ├── Badge
│   ├── Headline
│   ├── SubHeadline
│   ├── SearchBar
│   ├── QuickCategoryChips
│   └── StatsBar
│       └── StatsCounter (x4)
├── CaraKerjaSection
│   ├── Badge
│   ├── Heading
│   └── StepCard (x4)
├── VisaPopulerSection
│   ├── Badge
│   ├── Heading
│   ├── VisaCard (x6)
│   └── CTAButton
├── TestimoniSection
│   ├── Badge
│   ├── Heading
│   ├── Rating
│   └── ReviewCard (x3)
├── StatsSection
│   └── StatsCounter (x4)
├── FAQSection
│   ├── Badge
│   ├── Heading
│   └── FAQAccordion (x6)
├── FinalCTASection
│   ├── Heading
│   ├── SubHeading
│   ├── CTAButtons (x2)
│   └── TrustSignals (x3)
└── Footer
    ├── Column1 (Logo + Tagline + Social)
    ├── Column2 (Layanan links)
    ├── Column3 (Perusahaan links)
    ├── Column4 (Kontak info)
    └── BottomBar
```

### File Organization Strategy

- **Separation of Concerns**: Layout components terpisah dari section components
- **Reusability**: UI components dapat digunakan di berbagai sections
- **Co-location**: Hooks dan utilities dekat dengan components yang menggunakannya
- **Type Safety**: Semua interfaces dan types di `lib/types.ts`
- **Constants**: Colors, animation configs, dan data di `lib/constants.ts`

## Components and Interfaces

### 1. Navbar Component

**File**: `components/layout/Navbar.tsx`

**Purpose**: Sticky navigation bar dengan logo, menu links, dan action buttons. Menampilkan shadow saat scroll melewati 80px.

**Props Interface**:
```typescript
interface NavbarProps {
  // No props - self-contained component
}
```

**State**:
```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
```

**Key Features**:
- Scroll detection dengan `useEffect` dan `window.addEventListener('scroll')`
- Conditional shadow dengan `isScrolled ? 'shadow-md' : ''`
- Hover state untuk nav links dengan Tailwind `hover:text-orange-500`
- Active link detection dengan `usePathname()` dari Next.js
- Responsive: Desktop menampilkan nav links, mobile menampilkan hamburger

**Styling**:
- Height: 64px
- Background: `bg-[#1E3A5F]` (navy-mid)
- Position: `sticky top-0 z-50`
- Logo: "WE" putih + "POSE" oranye, Poppins Bold
- Nav links: DM Sans Medium, white, hover:orange
- Buttons: Ghost small untuk language, ghost white pill untuk "Masuk", solid orange pill untuk "Daftar"

**Animation**:
- Shadow transition: `transition-shadow duration-300`
- Hover transitions: `transition-colors duration-150`

---

### 2. MegaMenu Component

**File**: `components/layout/MegaMenu.tsx`

**Purpose**: Dropdown panel yang muncul saat hover/klik menu "Visa" dengan 3 kolom kategori.

**Props Interface**:
```typescript
interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Data Structure**:
```typescript
interface MegaMenuItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

const columns: MegaMenuColumn[] = [
  {
    title: "Berdasarkan Region",
    items: [
      { label: "Schengen/Eropa", href: "/visa/schengen" },
      { label: "Asia Timur", href: "/visa/asia-timur" },
      // ... 4 more items
    ]
  },
  // ... 2 more columns
];
```

**Key Features**:
- AnimatePresence untuk smooth mount/unmount
- Click outside detection dengan `useRef` dan `useEffect`
- Escape key handler untuk close
- Hover state untuk items dengan `hover:bg-orange-50 hover:text-orange-500`

**Styling**:
- Width: 720px
- Background: white
- Border radius: `rounded-b-xl` (0 0 12px 12px)
- Shadow: `shadow-lg`
- Grid: 3 columns dengan `grid-cols-3 gap-6`
- Item padding: `px-3 py-2`
- Item hover: `bg-orange-50 text-orange-500 rounded-lg`

**Animation**:
```typescript
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
>
```

---

### 3. MobileDrawer Component

**File**: `components/layout/MobileDrawer.tsx`

**Purpose**: Full-screen navigation drawer untuk mobile dengan accordion untuk mega menu.

**Props Interface**:
```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Key Features**:
- Full-screen overlay dengan backdrop blur
- Slide-down animation dari top
- Accordion untuk "Visa" menu items
- Close button dengan X icon
- Action buttons di bottom

**Styling**:
- Position: `fixed inset-0 z-50`
- Background: `bg-[#1E3A5F]` (navy-mid)
- Backdrop: `backdrop-blur-sm`
- Padding: `p-6`

**Animation**:
```typescript
<motion.div
  initial={{ y: "-100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-100%" }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```

---

### 4. HeroSection Component

**File**: `components/sections/HeroSection.tsx`

**Purpose**: Hero section dengan WorldMap background, headline, search bar, dan quick category chips.

**Props Interface**:
```typescript
interface HeroSectionProps {
  // No props - self-contained component
}
```

**State**:
```typescript
const [searchQuery, setSearchQuery] = useState("");
```

**Key Features**:
- WorldMap sebagai absolute background dengan opacity 30-40%
- Stagger animation untuk konten dengan delays 0.1s - 0.5s
- Search bar dengan focus state
- Quick category chips dengan hover effect
- Stats bar dengan count-up animation

**Styling**:
- Min height: `min-h-screen`
- Background: `bg-[#0F1F3D]` (navy)
- Content: `relative z-10` untuk di atas WorldMap
- Max width: `max-w-4xl mx-auto`
- Padding: `px-6 py-20`

**WorldMap Configuration**:
```typescript
const dots = [
  {
    start: { lat: -6.2088, lng: 106.8456, label: "Jakarta" },
    end: { lat: 48.8566, lng: 2.3522, label: "Paris" }
  },
  // ... 5 more routes to Tokyo, Seoul, London, New York, Sydney
];

<WorldMap
  dots={dots}
  lineColor="#F97316"
  showLabels={false}
  animationDuration={2}
  loop={true}
  className="absolute inset-0 opacity-30"
/>
```

**Animation**:
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};
```

---

### 5. WorldMap Component

**File**: `components/ui/WorldMap.tsx`

**Purpose**: Interactive world map dengan animated lines dari Jakarta ke destinasi populer.

**Props Interface**:
```typescript
interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  className?: string;
}
```

**Implementation Notes**:
- Menggunakan `dotted-map` library untuk generate map SVG
- Animated lines menggunakan SVG path dengan `strokeDasharray` dan `strokeDashoffset`
- Framer Motion untuk animate path drawing
- Theme-aware dengan `useTheme()` dari next-themes

**Key Features**:
- Responsive SVG yang scale dengan container
- Animated line drawing dengan loop
- Dots di start dan end points
- Optional labels untuk cities

**Styling**:
- SVG fill: dots dengan map color
- Line stroke: orange (#F97316)
- Line width: 2px
- Opacity: 30-40% saat digunakan sebagai background

---

### 6. VisaCard Component

**File**: `components/ui/VisaCard.tsx`

**Purpose**: Reusable card untuk menampilkan informasi visa dengan cover gradient, pricing, dan add-ons.

**Props Interface**:
```typescript
interface VisaCardProps {
  country: string;
  emoji: string;
  type: string;
  processDays: string;
  stayDuration: string;
  price: string;
  addOns: string[];
  gradient: string;
  href: string;
}
```

**Key Features**:
- Cover dengan gradient background dan emoji flag
- Badge untuk visa type di pojok kanan atas
- Duration info dengan icons
- Price dengan "Mulai dari" prefix
- Add-on badges dalam row
- Footer dengan "Bandingkan" dan "Lihat Detail" buttons
- Hover effect: scale 1.02 dan shadow-lg

**Styling**:
- Background: white
- Border radius: `rounded-2xl` (16px)
- Shadow: `shadow-md`, hover: `shadow-lg`
- Cover height: 140px
- Padding: `p-4`
- Gradient: dynamic via props (e.g., `from-[#0F1F3D] to-[#1E3A5F]`)

**Animation**:
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="cursor-pointer"
>
```

---

### 7. StepCard Component

**File**: `components/ui/StepCard.tsx`

**Purpose**: Card untuk menampilkan step dalam "Cara Kerja" section.

**Props Interface**:
```typescript
interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}
```

**Key Features**:
- Circular number badge di top center
- Icon dengan orange color
- Title dan description centered
- Stagger animation saat masuk viewport

**Styling**:
- Background: white
- Border radius: `rounded-2xl` (16px)
- Shadow: `shadow-md`
- Padding: `p-6`
- Text align: center
- Number badge: 48px circle, orange background, white text

**Animation**:
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

---

### 8. FAQAccordion Component

**File**: `components/ui/FAQAccordion.tsx`

**Purpose**: Accordion item untuk FAQ section dengan smooth expand/collapse.

**Props Interface**:
```typescript
interface FAQAccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}
```

**State**:
```typescript
const [isOpen, setIsOpen] = useState(defaultOpen || false);
```

**Key Features**:
- Click to toggle open/close
- Chevron icon rotation 180deg saat open
- AnimatePresence untuk smooth height transition
- Border bottom untuk separator

**Styling**:
- Border bottom: `border-b border-gray-200`
- Padding: `py-4`
- Question: Poppins Medium 16px navy
- Answer: DM Sans 15px gray-600
- Chevron: 20px gray-400

**Animation**:
```typescript
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
```

---

### 9. StatsCounter Component

**File**: `components/ui/StatsCounter.tsx`

**Purpose**: Animated counter yang count-up dari 0 ke target value saat masuk viewport.

**Props Interface**:
```typescript
interface StatsCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
  className?: string;
}
```

**Key Features**:
- useInView untuk trigger animation saat masuk viewport
- Custom hook `useCountUp` untuk animasi count
- Easing function untuk smooth count-up

**Implementation**:
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });
const count = useCountUp(isInView ? end : 0, duration || 1200);

return (
  <div ref={ref} className={className}>
    <div className="text-5xl font-bold text-white">
      {count}{suffix}
    </div>
    <div className="text-orange-100">{label}</div>
  </div>
);
```

---

### 10. Button Component

**File**: `components/ui/Button.tsx`

**Purpose**: Reusable button dengan variants (solid, ghost, outline) dan sizes (sm, md, lg).

**Props Interface**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}
```

**Variants**:
- **solid**: Orange background, white text, hover: darker orange
- **ghost**: Transparent background, white text, hover: white/10 background
- **outline**: Transparent background, white border, white text, hover: white/10 background

**Sizes**:
- **sm**: `px-3 py-1.5 text-sm`
- **md**: `px-4 py-2 text-base`
- **lg**: `px-6 py-3 text-lg`

**Animation**:
```typescript
<motion.button
  whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(249,115,22,0.25)" }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
>
```

---

### 11. Badge Component

**File**: `components/ui/Badge.tsx`

**Purpose**: Reusable badge untuk section headers dan labels.

**Props Interface**:
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "green" | "blue";
  size?: "sm" | "md";
  className?: string;
}
```

**Variants**:
- **orange**: `bg-orange-100/10 border-orange-500/30 text-orange-500`
- **green**: `bg-green-100/10 border-green-500/30 text-green-500`
- **blue**: `bg-blue-100/10 border-blue-500/30 text-blue-500`

**Styling**:
- Border radius: `rounded-full`
- Border: 1px solid
- Padding: `px-3 py-1` (sm), `px-4 py-1.5` (md)
- Font: Poppins SemiBold, uppercase
- Size: 11px (sm), 12px (md)

## Data Models

### Visa Data Model

```typescript
interface Visa {
  id: string;
  country: string;
  emoji: string;
  type: string;
  processDays: string;
  stayDuration: string;
  price: string;
  addOns: string[];
  gradient: string;
  href: string;
}

const visaData: Visa[] = [
  {
    id: "france-schengen",
    country: "France Schengen Tourist",
    emoji: "🇫🇷",
    type: "Wisata",
    processDays: "15-20 hari kerja",
    stayDuration: "90 hari tinggal",
    price: "Rp 1.850.000",
    addOns: ["Asuransi", "Hotel Booking", "Itinerary"],
    gradient: "from-[#0F1F3D] to-[#1E3A5F]",
    href: "/visa/france-schengen"
  },
  // ... 5 more visa objects
];
```

### Navigation Data Model

```typescript
interface NavLink {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Visa", href: "/visa", hasMegaMenu: true },
  { label: "Tools", href: "/tools" },
  { label: "Promo", href: "/promo" },
  { label: "Blog", href: "/blog" },
  { label: "Tentang Kami", href: "/tentang" }
];
```

### FAQ Data Model

```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    id: "faq-1",
    question: "Apakah Wepose resmi dan terdaftar?",
    answer: "Ya, Wepose beroperasi sejak 2019 dan telah melayani 10.000+ pelanggan dari seluruh Indonesia."
  },
  // ... 5 more FAQ objects
];
```

### Review Data Model

```typescript
interface Review {
  id: string;
  name: string;
  initials: string;
  avatarGradient: string;
  rating: number;
  text: string;
  destination: string;
  verified: boolean;
}

const reviewData: Review[] = [
  {
    id: "review-1",
    name: "Rina S.",
    initials: "RS",
    avatarGradient: "from-orange-400 to-pink-500",
    rating: 5,
    text: "Prosesnya gampang banget, tiap langkah ada panduan. Visa Schengen approved 17 hari, nggak nyangka secepat itu!",
    destination: "Schengen",
    verified: true
  },
  // ... 2 more review objects
];
```

### Step Data Model

```typescript
interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const stepsData: Step[] = [
  {
    number: 1,
    icon: <UserPlusIcon className="w-8 h-8 text-orange-500" />,
    title: "Daftar & Cari Visa",
    description: "Temukan dari 100+ tipe visa ke 35+ negara tujuan"
  },
  // ... 3 more step objects
];
```

### Stats Data Model

```typescript
interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const statsData: Stat[] = [
  { value: 35, suffix: "+", label: "Negara Tujuan" },
  { value: 100, suffix: "+", label: "Tipe Visa" },
  { value: 10000, suffix: "+", label: "Pelanggan Puas" },
  { value: 5, suffix: "+", label: "Tahun Pengalaman" }
];
```

### WorldMap Dots Data Model

```typescript
interface MapDot {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

const worldMapDots: MapDot[] = [
  {
    start: { lat: -6.2088, lng: 106.8456, label: "Jakarta" },
    end: { lat: 48.8566, lng: 2.3522, label: "Paris" }
  },
  {
    start: { lat: -6.2088, lng: 106.8456 },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" }
  },
  {
    start: { lat: -6.2088, lng: 106.8456 },
    end: { lat: 37.5665, lng: 126.9780, label: "Seoul" }
  },
  {
    start: { lat: -6.2088, lng: 106.8456 },
    end: { lat: 51.5074, lng: -0.1278, label: "London" }
  },
  {
    start: { lat: -6.2088, lng: 106.8456 },
    end: { lat: 40.7128, lng: -74.0060, label: "New York" }
  },
  {
    start: { lat: -6.2088, lng: 106.8456 },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" }
  }
];
```

### Color Tokens

```typescript
const colors = {
  orange: {
    DEFAULT: "#F97316",
    dark: "#EA6B0A",
    50: "#FFF7ED",
    100: "#FFEDD5"
  },
  navy: {
    DEFAULT: "#0F1F3D",
    mid: "#1E3A5F",
    light: "#E8EDF5"
  },
  gray: {
    50: "#F9FAFB",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    800: "#1F2937"
  }
};
```

### Animation Configs

```typescript
const animations = {
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    easeIn: "easeIn",
    easeOut: "easeOut"
  },
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    countUp: 1.2
  },
  stagger: {
    children: 0.1,
    delay: 0.1
  }
};
```

### Breakpoints

```typescript
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};
```

