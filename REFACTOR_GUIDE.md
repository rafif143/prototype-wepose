# 🔧 Automated Large-Scale Refactoring Guide

## Kapan Pake Metode Ini?

Pake metode ini kalo project lu:
- ❌ Struktur folder acakadut/berantakan
- ❌ Import paths ga konsisten
- ❌ File placement ga jelas (mana shared, mana feature-specific)
- ❌ Hard to scale/maintain
- ❌ Banyak duplicate code
- ❌ Naming convention ga konsisten

## Prompt Template untuk AI

Copy paste prompt ini ke AI assistant (Kiro/Claude/ChatGPT):

```
Gw mau refactor total project ini dari struktur acakadut jadi feature-based architecture yang rapi dan maintainable.

**Current Problems:**
- [Jelasin masalah struktur project lu, contoh: "File placement ngawur, import paths berantakan, hard to find components"]

**Target Architecture:**
- Feature-based structure (isolate by domain/feature)
- Shared components di folder terpisah
- Clear separation of concerns
- Consistent naming conventions

**Requirements:**
1. Analyze current codebase structure
2. Design new feature-based architecture
3. Build automated refactor tool dengan:
   - AST-based analyzer (scan dependencies, categorize files)
   - Git-aware file migrator (preserve history)
   - Import path updater (update all references)
   - Validator (verify no broken imports)
4. Execute migration with proper git commits
5. Verify TypeScript compilation & build success

**Approach:**
- Jangan manual refactor, bikin tool otomatis
- Pake AST parsing untuk analyze code
- Pake git mv untuk preserve history
- Test-driven (property-based testing)
- Atomic commits per phase

**Deliverables:**
1. Refactor tool (TypeScript project dengan analyzer, migrator, updater, validator)
2. Executed migration (files moved, imports updated)
3. Clean git history
4. Passing TypeScript check & build

Lu bisa mulai dengan analyze struktur current project dulu, terus kasih proposal architecture baru.
```

## Contoh Struktur Target

### Feature-Based Architecture
```
features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── dashboard/
│   ├── components/
│   ├── hooks/
│   └── lib/
└── settings/
    ├── components/
    └── lib/

shared/
├── ui/              # Reusable UI components
├── layout/          # Layout components (Navbar, Footer)
├── hooks/           # Shared hooks
├── lib/             # Utilities & helpers
└── types/           # Shared TypeScript types
```

### Domain-Driven Architecture (Alternative)
```
domains/
├── user/
│   ├── api/
│   ├── components/
│   ├── models/
│   └── services/
├── product/
│   ├── api/
│   ├── components/
│   └── models/
└── order/
    ├── api/
    ├── components/
    └── models/

infrastructure/
├── api/
├── database/
└── config/
```

## Refactor Tool Components

Tool yang bakal di-generate punya struktur kayak gini:

```
refactor/
├── package.json              # Isolated dependencies
├── tsconfig.json
├── vitest.config.ts
└── src/
    ├── analyzer/             # 📊 Analyze codebase
    │   ├── DirectoryScanner.ts      # Scan all files
    │   ├── DependencyMapper.ts      # Build dependency graph
    │   ├── FileCategorizer.ts       # Categorize by feature
    │   ├── DuplicateDetector.ts     # Find duplicates
    │   └── NamingAnalyzer.ts        # Check naming issues
    ├── creator/              # 🏗️ Generate new structure
    │   ├── StructureCreator.ts      # Create folders
    │   └── IndexGenerator.ts        # Generate index.ts
    ├── migrator/             # 🚚 Move files
    │   └── FileMigrator.ts          # Git-aware file mover
    ├── updater/              # 🔄 Update imports
    │   └── ImportUpdater.ts         # AST-based import updater
    ├── validator/            # ✅ Verify results
    │   └── MigrationValidator.ts    # Check no broken imports
    └── types/
        └── core.ts                  # Type definitions
```

## Dependencies yang Dibutuhin

```json
{
  "dependencies": {
    "@typescript-eslint/parser": "^6.x",
    "@typescript-eslint/typescript-estree": "^6.x",
    "fast-check": "^3.x",
    "vitest": "^1.x"
  }
}
```

## Execution Flow

1. **Phase 1: Analysis**
   ```bash
   npm run analyze
   ```
   - Scan all files
   - Build dependency graph
   - Categorize by feature
   - Detect issues (duplicates, naming)

2. **Phase 2: Structure Creation**
   ```bash
   npm run create-structure
   ```
   - Generate new folder structure
   - Create index.ts files

3. **Phase 3: Migration**
   ```bash
   npm run migrate
   ```
   - Move files with `git mv`
   - Update import paths
   - Validate no broken imports

4. **Phase 4: Verification**
   ```bash
   npm run validate
   npm run build
   ```
   - TypeScript check
   - Build verification
   - Circular dependency check

## Key Techniques

### 1. AST-Based Analysis
```typescript
import { parse } from '@typescript-eslint/typescript-estree';

const ast = parse(sourceCode, {
  loc: true,
  range: true,
  jsx: true,
});

// Extract imports
ast.body.forEach(node => {
  if (node.type === 'ImportDeclaration') {
    const importPath = node.source.value;
    // Process import...
  }
});
```

### 2. Git-Aware Migration
```typescript
import { execSync } from 'child_process';

// Preserve git history
execSync(`git mv ${oldPath} ${newPath}`);
```

### 3. Property-Based Testing
```typescript
import fc from 'fast-check';

test('categorizer handles all file types', () => {
  fc.assert(
    fc.property(
      fc.record({
        path: fc.string(),
        type: fc.constantFrom('component', 'hook', 'lib'),
      }),
      (file) => {
        const result = categorizer.categorize(file);
        expect(result).toBeDefined();
      }
    )
  );
});
```

## Tips & Best Practices

✅ **DO:**
- Commit setiap phase (analysis, migration, validation)
- Run tests sebelum execute migration
- Backup project sebelum mulai (git branch)
- Verify build success setelah migration
- Document transformation rules

❌ **DON'T:**
- Manual refactor 50+ files (error-prone)
- Skip validation phase
- Forget to update import paths
- Mix multiple refactoring goals
- Rush the process

## Troubleshooting

**Problem: Import paths masih broken setelah migration**
- Solution: Run import updater lagi, check transformation rules

**Problem: Circular dependencies detected**
- Solution: Review dependency graph, refactor shared code

**Problem: TypeScript errors setelah migration**
- Solution: Check path aliases di tsconfig.json, verify all imports updated

**Problem: Build fails**
- Solution: Check for dynamic imports, verify all files moved correctly

## Real-World Example

**Before:**
```
components/
├── Button.tsx
├── Modal.tsx
├── UserProfile.tsx
├── ProductCard.tsx
├── OrderList.tsx
└── ... (50+ files mixed together)
```

**After:**
```
features/
├── user/
│   └── components/
│       └── UserProfile.tsx
├── product/
│   └── components/
│       └── ProductCard.tsx
└── order/
    └── components/
        └── OrderList.tsx

shared/
└── ui/
    ├── Button.tsx
    └── Modal.tsx
```

## Success Metrics

Refactor berhasil kalo:
- ✅ All files categorized correctly
- ✅ Zero broken imports
- ✅ TypeScript compilation passes
- ✅ Build succeeds
- ✅ No circular dependencies
- ✅ Git history preserved
- ✅ Consistent naming conventions

## Next Steps After Refactor

1. Update documentation
2. Add feature-specific README files
3. Setup path aliases di tsconfig.json
4. Create index.ts barrel exports
5. Add ESLint rules untuk enforce structure
6. Update team guidelines

---

## Quick Start Command

Kalo lu mau refactor project lain, tinggal:

1. Open project di Kiro/AI assistant
2. Copy paste prompt template di atas
3. Follow AI instructions
4. Review & approve each phase
5. Done! 🎉

**Estimated Time:** 30-60 menit untuk project dengan 50-100 files

**Risk Level:** Low (karena pake git, bisa rollback kapan aja)

**Effort:** Minimal (AI yang ngerjain, lu cuma review)
