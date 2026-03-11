# Tech Stack

## Framework & Runtime

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Node.js 20+

## Styling & UI

- Tailwind CSS 4 (with @tailwindcss/postcss)
- Framer Motion 12.35.1 (animations)
- shadcn/ui components
- Radix UI primitives
- Heroicons (icons)
- Lucide React (additional icons)
- class-variance-authority + clsx + tailwind-merge (utility management)

## Specialized Libraries

- jsPDF 4.2.0 (PDF generation for sponsor letters)
- cobe (3D globe visualization)
- dotted-map (world map visualization)
- country-flag-icons (flag displays)
- next-themes (dark mode support)

## Development Tools

- ESLint 9 (with Next.js config)
- PostCSS

## Common Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Build System

- Uses Next.js built-in build system (Turbopack in dev, Webpack in production)
- No custom build configuration required
- Automatic code splitting and optimization
- Image optimization via next/image with remote patterns configured

## Path Aliases

- `@/*` maps to project root
- Enables clean imports: `@/features/...`, `@/shared/...`
