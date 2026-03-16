# Project Structure

## Architecture Pattern

Feature-based architecture with clear separation between features and shared code. The project is currently undergoing refactoring from a mixed structure to a more organized feature-based approach.

## Directory Organization

```
app/                          # Next.js App Router pages
├── auth/                     # Authentication pages
├── blog/                     # Blog listing and detail pages
├── tools/                    # Tool pages (quiz, compare, sponsor-letter)
├── visa/                     # Visa listing and detail pages
├── layout.tsx                # Root layout
├── page.tsx                  # Homepage
└── globals.css               # Global styles and theme

features/                     # Feature modules (domain-specific)
├── blog/
│   └── components/           # Blog-specific components
├── landing/                  # V1 Landing page components
│   └── components/           # V1-specific landing sections
├── landing-v2/               # V2 Landing page components  
│   └── components/           # V2-specific landing sections
├── tools/
│   ├── components/           # Tool components (quiz, compare, sponsor-letter)
│   ├── hooks/                # Tool-specific hooks
│   └── lib/                  # Tool utilities and business logic
└── visa/
    ├── components/           # Visa-related components
    ├── hooks/                # Visa-specific hooks
    └── lib/                  # Visa data and utilities

shared/                       # Shared/reusable code
├── ui/                       # Reusable UI components
├── layout/                   # Layout components (Navbar, Footer)
├── landing/                  # Shared landing components
│   └── components/           # Components used by both V1 & V2
├── hooks/                    # Shared hooks
├── lib/                      # Utilities and helpers
├── utils/                    # Utility functions
└── types/                    # Shared TypeScript types

.kiro/                        # Kiro configuration
├── specs/                    # Feature specifications
└── steering/                 # AI assistant guidance rules
```

## File Naming Conventions

- React components: PascalCase (e.g., `HeroSection.tsx`, `QuizScreen.tsx`)
- Utilities/hooks: camelCase (e.g., `useCompareState.ts`, `validation.ts`)
- Pages: lowercase with hyphens (e.g., `sponsor-letter/page.tsx`)
- Types: PascalCase or camelCase depending on context

## Component Organization

### Feature Components
- Located in `features/{domain}/components/`
- Domain-specific, not intended for reuse across features
- Can have nested folders for complex features (e.g., `quiz/`, `compare/`, `sponsor-letter/`)

### Shared Components
- Located in `shared/ui/` or `shared/layout/`
- Reusable across multiple features
- Should be generic and configurable

### Page Components
- Located in `app/` following Next.js App Router conventions
- Typically thin wrappers that compose feature components
- Handle routing, layouts, and data fetching

## Code Organization Patterns

### Component Structure
```typescript
'use client'; // Only when needed (client interactivity)

import statements (external first, then internal)

interface/type definitions

component implementation

export default or named export
```

### Feature Module Structure
```
features/{domain}/
├── components/          # UI components
├── hooks/              # Custom hooks
├── lib/                # Business logic, utilities
│   ├── types.ts        # Type definitions
│   ├── validation.ts   # Validation logic
│   └── utils.ts        # Helper functions
└── index.ts            # Optional barrel export
```

## Import Patterns

- Use `@/` path alias for all imports
- Group imports: external libraries → internal modules → types
- Prefer named exports for utilities, default exports for components

```typescript
// External
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Internal
import { WorldMap } from '@/shared/ui/WorldMap';
import { useCompareState } from '@/features/tools/hooks/useCompareState';

// Types
import type { QuizQuestion } from '@/features/tools/lib/quiz/types';
```

## Styling Conventions

- Tailwind CSS utility classes (no CSS modules)
- Custom utilities defined in `globals.css` using `@utility`
- Theme colors via CSS variables (e.g., `bg-orange`, `text-navy`)
- Responsive design: mobile-first with `md:`, `lg:` breakpoints
- Animations via Framer Motion for complex interactions

## State Management

- React hooks (useState, useEffect) for local state
- Custom hooks in `features/{domain}/hooks/` for feature-specific state
- No global state management library (Redux, Zustand) currently used
- Server components for data fetching where possible

## TypeScript Conventions

- Strict mode enabled
- Interface for component props, type for unions/intersections
- Explicit return types for complex functions
- Type files in `lib/types.ts` within each feature
