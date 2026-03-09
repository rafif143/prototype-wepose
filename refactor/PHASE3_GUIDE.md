# Phase 3: File Migration Guide

## Overview

Phase 3 implements the actual file migration from the old type-based structure to the new feature-based architecture. This phase uses `git mv` commands to preserve file history and creates logical git commits for each migration step.

## What Phase 3 Does

### 5.1: Git-Aware File Mover
- Implements `moveFileWithGit()` method that uses `git mv` to preserve history
- Creates destination directories automatically
- Handles errors gracefully (missing files, existing destinations, etc.)
- Tracks all moved files for reporting

### 5.4: Feature File Migrator
- Migrates visa files to `features/visa/`
- Migrates blog files to `features/blog/`
- Migrates tools files to `features/tools/`
- Migrates landing files to `features/landing/`
- Organizes files into appropriate subdirectories (components/, hooks/, lib/, types/, utils/)

### 5.5: Shared File Migrator
- Migrates UI components to `shared/ui/`
- Migrates layout components to `shared/layout/`
- Migrates shared hooks to `shared/hooks/`
- Migrates utilities to `shared/utils/`

### 5.8: Duplicate Resolver
- Merges `section/` and `sections/` folders into `features/landing/components/`
- Merges `visa/` and `visa-detail/` folders into `features/visa/components/`
- Consolidates duplicate files
- Updates all import references

### 5.11: Naming Standardizer
- Renames directories to kebab-case
- Renames React components to PascalCase
- Renames hooks to camelCase (useXxx pattern)
- Renames utilities to camelCase

## Prerequisites

Before running Phase 3:

1. **Complete Phase 1 and Phase 2**
   - Phase 1: Structure analysis must be complete
   - Phase 2: New directory structure must be created

2. **Clean Git Working Directory**
   ```bash
   git status
   # Should show "nothing to commit, working tree clean"
   ```

3. **Create a Backup Branch**
   ```bash
   git checkout -b backup-before-phase3
   git checkout main  # or your working branch
   ```

4. **Ensure All Tests Pass**
   ```bash
   cd refactor
   npm test
   ```

## Running Phase 3

### Option 1: Run the Orchestrator Script

```bash
cd refactor
npm run migrate:phase3
```

This will:
1. Analyze the current structure
2. Resolve duplicate folders (section/sections, visa/visa-detail)
3. Migrate feature-specific files
4. Migrate shared files
5. Standardize naming conventions
6. Create git commits for each logical group

### Option 2: Manual Step-by-Step Execution

If you prefer more control, you can run each step manually:

```typescript
import { FileMigrator } from './src/migrator/FileMigrator.js';
import { StructureAnalyzer } from './src/analyzer/StructureAnalyzer.js';

const projectRoot = '/path/to/project';
const migrator = new FileMigrator(projectRoot);
const analyzer = new StructureAnalyzer(projectRoot);

// Step 1: Analyze
const files = analyzer.scanDirectories(['components', 'hooks', 'lib', 'utils']);
const categorization = analyzer.categorizeFiles(files);

// Step 2: Resolve duplicates
const sectionResult = migrator.resolveDuplicates(
  ['components/section', 'components/sections'],
  'features/landing/components'
);

// Step 3: Migrate features
const featureResult = migrator.migrateFeatureFiles(categorization);

// Step 4: Migrate shared
const sharedResult = migrator.migrateSharedFiles(categorization.shared);
```

## Git Commits Created

Phase 3 creates the following git commits:

1. `refactor: merge section and sections folders`
2. `refactor: merge visa and visa-detail folders`
3. `refactor: migrate feature-specific files`
4. `refactor: migrate shared files`
5. `refactor: standardize naming conventions` (if applicable)

## Migration Results

After each step, you'll see output like:

```
Section/Sections Merge Results:
  Moved: 15 files
  Errors: 0
  Warnings: 0

Moved files:
  components/section/hero-section.tsx → features/landing/components/hero-section.tsx
  components/section/about-section.tsx → features/landing/components/about-section.tsx
  ...
```

## Error Handling

### Common Errors

1. **Source file does not exist**
   - The file was already moved or doesn't exist
   - Check if the file was moved in a previous run

2. **Destination file already exists**
   - The target location already has a file with the same name
   - Review and resolve manually, or use the duplicate resolver

3. **Git command failed**
   - Ensure git is installed and the directory is a git repository
   - Check that you have a clean working directory

### Rollback

If something goes wrong, you can rollback:

```bash
# Rollback all Phase 3 commits
git log --oneline  # Find the commit before Phase 3
git reset --hard <commit-sha>

# Or rollback specific commits
git reset --hard HEAD~5  # Undo last 5 commits
```

## Verification

After Phase 3 completes, verify the migration:

1. **Check File Locations**
   ```bash
   ls -la features/visa/components/
   ls -la features/blog/components/
   ls -la shared/ui/
   ```

2. **Verify Git History**
   ```bash
   git log --follow features/visa/components/VisaCard.tsx
   # Should show history from old location
   ```

3. **Check for Errors**
   ```bash
   # TypeScript compilation (will fail until imports are updated)
   npm run build
   ```

## Next Steps

After Phase 3:

1. **Phase 4: Update Import Paths**
   - All import statements need to be updated to reflect new file locations
   - This is a separate phase to keep commits logical

2. **Phase 5: Validation**
   - Verify all imports resolve correctly
   - Check TypeScript compilation
   - Run tests

3. **Phase 6: Cleanup**
   - Remove empty old directories
   - Update documentation

## Troubleshooting

### Issue: "fatal: not a git repository"
**Solution**: Ensure you're running from within a git repository

### Issue: "error: the following files have staged changes"
**Solution**: Commit or stash your changes before running Phase 3

### Issue: Migration hangs or takes too long
**Solution**: Check for very large files or directories. You may need to exclude them.

### Issue: Some files weren't moved
**Solution**: Check the categorization logic. Some files may be categorized as 'shared' when you expected them to be feature-specific.

## Implementation Details

### File Categorization Logic

Files are categorized based on:
1. **Path patterns**: `/visa/`, `/blog/`, `/tools/`, `/section/`
2. **File names**: `VisaCard.tsx` → visa feature
3. **Import patterns**: Files that import from multiple features → shared

### Duplicate Resolution Strategy

1. **Merge similar folders**: section + sections → landing
2. **Preserve all files**: No files are deleted, only moved
3. **Handle conflicts**: If two files have the same name, both are kept with descriptive names

### Naming Conventions

- **Directories**: kebab-case (e.g., `visa-detail` → `visa-detail`)
- **Components**: PascalCase (e.g., `VisaCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useVisaData.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)

## Testing

Run the test suite:

```bash
cd refactor
npm test
```

Specific tests for FileMigrator:

```bash
npm test -- FileMigrator.test.ts
```

## Support

If you encounter issues:

1. Check the error messages in the console output
2. Review the git log to see what was committed
3. Check the PHASE3_COMPLETE.md file (created after successful completion)
4. Rollback and try again with verbose logging

## Safety Features

- **Git history preservation**: All moves use `git mv`
- **Atomic commits**: Each logical group is committed separately
- **Error reporting**: Detailed error messages with file paths
- **Rollback capability**: Easy to undo with git reset
- **Dry-run mode**: (Coming in Phase 4) Preview changes without executing
