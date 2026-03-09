# Feature-Based Architecture Refactor Tool

Automated refactoring tool to convert type-based folder structure to feature-based architecture.

## Overview

This tool automates the migration from:
```
components/
  visa/
  blog/
  ui/
hooks/
lib/
utils/
```

To:
```
features/
  visa/
    components/
    hooks/
    lib/
    types/
    utils/
  blog/
  tools/
  landing/
shared/
  ui/
  layout/
  hooks/
  utils/
  types/
  lib/
```

## Installation

```bash
cd refactor
npm install
```

## Usage

### Dry Run (Recommended First)
Analyze the codebase and generate a migration plan without making changes:
```bash
npm run refactor:dry-run
```

### Full Migration
Execute the complete migration:
```bash
npm run refactor:migrate
```

### Interactive Mode
Step through the migration with confirmations:
```bash
npm run refactor:interactive
```

### Abort/Rollback
Revert changes if something goes wrong:
```bash
npm run refactor:abort
```

## Development Status

This tool is currently under development. Task 1 (foundation setup) is complete.

### Completed
- ✅ Project structure
- ✅ TypeScript configuration
- ✅ Core type definitions
- ✅ Component scaffolding

### In Progress
- 🚧 Structure Analyzer (Task 2)
- 🚧 File Migrator (Task 5)
- 🚧 Import Updater (Task 7)
- 🚧 Migration Validator (Task 11)

## Architecture

The refactor system consists of four main components:

1. **Structure Analyzer** - Scans and analyzes the current codebase
2. **File Migrator** - Moves files to new locations using git mv
3. **Import Updater** - Updates all import paths
4. **Migration Validator** - Validates the refactored codebase

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Documentation

See the spec files in `.kiro/specs/feature-based-refactor/` for:
- Requirements document
- Design document
- Implementation tasks
