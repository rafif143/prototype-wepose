# Implementation Plan: Feature-Based Architecture Refactor

## Overview

This implementation plan converts the current type-based folder structure (components/, hooks/, lib/, utils/) into a feature-based architecture (features/, shared/). The refactoring will be executed in four phases: Analysis, Structure Creation, File Migration, and Validation. Each phase builds incrementally with checkpoints to ensure safe, reversible progress.

## Tasks

- [x] 1. Set up refactor system foundation
  - Create project structure for refactor tooling
  - Set up TypeScript configuration for refactor scripts
  - Install dependencies (fast-check for property testing, @typescript-eslint/parser for AST parsing)
  - Create types and interfaces for core data models (FileNode, DependencyGraph, MigrationConfig)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Implement Phase 1: Structure Analyzer
  - [x] 2.1 Implement directory scanner
    - Create DirectoryScanner class to recursively scan components/, hooks/, lib/, utils/
    - Parse TypeScript/JavaScript files to extract imports and exports using AST
    - Build FileNode objects with path, type, imports, exports metadata
    - _Requirements: 1.1_
  
  - [ ]* 2.2 Write property test for directory scanning
    - **Property 1: Complete Directory Scanning**
    - **Validates: Requirements 1.1**
  
  - [x] 2.3 Implement dependency graph builder
    - Create DependencyMapper class to build graph from FileNode array
    - Map import statements to file paths (handle relative paths, aliases, index files)
    - Create adjacency list representation of dependencies
    - _Requirements: 1.4_
  
  - [ ]* 2.4 Write property test for dependency mapping
    - **Property 4: Complete Dependency Mapping**
    - **Validates: Requirements 1.4**
  
  - [x] 2.5 Implement file categorizer
    - Create FileCategorizer class to assign files to feature domains
    - Use path patterns (visa, blog, tools, section/sections → landing)
    - Analyze import patterns for ambiguous files
    - Categorize into visa, blog, tools, landing, or shared
    - _Requirements: 1.5, 3.1, 3.2, 3.3, 3.4_
  
  - [ ]* 2.6 Write property test for file categorization
    - **Property 5: Correct File Categorization**
    - **Validates: Requirements 1.5, 3.1, 3.2, 3.3, 3.4**
  
  - [x] 2.7 Implement duplicate detector
    - Create DuplicateDetector class to find similar folders/files
    - Detect folder name similarities (section/sections, visa/visa-detail)
    - Calculate file similarity scores based on content and structure
    - Group duplicates with recommended actions (merge, keep-both, rename)
    - _Requirements: 1.2, 5.1, 5.2_
  
  - [ ]* 2.8 Write property test for duplicate detection
    - **Property 2: Duplicate Folder Detection**
    - **Validates: Requirements 1.2**
  
  - [x] 2.9 Implement naming convention analyzer
    - Create NamingAnalyzer class to detect naming patterns
    - Identify kebab-case, PascalCase, camelCase for files and directories
    - Flag naming inconsistencies
    - _Requirements: 1.3, 6.1, 6.2, 6.3, 6.4_
  
  - [ ]* 2.10 Write property test for naming detection
    - **Property 3: Naming Convention Detection**
    - **Validates: Requirements 1.3**
  
  - [x] 2.11 Implement hardcoded data detector
    - Create DataDetector class to find large object/array literals in components
    - Use AST to identify ObjectExpression and ArrayExpression nodes
    - Apply size threshold (e.g., > 10 properties or > 20 lines)
    - Mark files for data extraction
    - _Requirements: 1.6, 10.1_
  
  - [ ]* 2.12 Write property test for hardcoded data detection
    - **Property 6: Hardcoded Data Detection**
    - **Validates: Requirements 1.6**

- [x] 3. Checkpoint - Verify analysis phase
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement Phase 2: Structure Creator
  - [x] 4.1 Implement directory structure generator
    - Create StructureCreator class to generate new folder hierarchy
    - Create features/ directory with visa/, blog/, tools/, landing/ subdirectories
    - Create standard subdirectories in each feature (components/, hooks/, lib/, types/, utils/)
    - Create shared/ directory with ui/, layout/, hooks/, utils/, types/, lib/ subdirectories
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ]* 4.2 Write property test for feature module structure
    - **Property 7: Feature Module Structure Consistency**
    - **Validates: Requirements 2.3**
  
  - [x] 4.3 Implement public API index generator
    - Create IndexGenerator class to generate index.ts files
    - Create index.ts in each feature module and shared module subdirectory
    - Generate named exports for all public components, hooks, utilities, types
    - Add JSDoc comments to each export
    - Exclude private implementations (files starting with _, internal/ directories)
    - _Requirements: 2.6, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [ ]* 4.4 Write property test for public API index files
    - **Property 18: Public API Index Files**
    - **Validates: Requirements 2.6, 8.1, 8.2**
  
  - [ ]* 4.5 Write property test for public API exports
    - **Property 19: Public API Export Completeness**
    - **Validates: Requirements 8.3, 8.4**
  
  - [ ]* 4.6 Write property test for public API documentation
    - **Property 20: Public API Documentation**
    - **Validates: Requirements 8.5**
  
  - [ ]* 4.7 Write property test for private implementation exclusion
    - **Property 21: Private Implementation Exclusion**
    - **Validates: Requirements 8.6**

- [x] 5. Implement Phase 3: File Migrator
  - [x] 5.1 Implement git-aware file mover
    - Create FileMigrator class to move files using git mv
    - Execute git mv commands to preserve file history
    - Handle file move errors gracefully
    - Track moved files for reporting
    - _Requirements: 3.5, 12.1, 12.4_
  
  - [ ]* 5.2 Write property test for file migration completeness
    - **Property 26: File Migration Completeness**
    - **Validates: Requirements 11.1**
  
  - [ ]* 5.3 Write property test for git history preservation
    - **Property 33: Git History Preservation**
    - **Validates: Requirements 12.1, 12.4**
  
  - [x] 5.4 Implement feature file migrator
    - Migrate visa files to features/visa/ (components, hooks, lib, types, utils)
    - Migrate blog files to features/blog/
    - Migrate tools files to features/tools/
    - Migrate landing files (section/sections) to features/landing/
    - Create git commits for each feature migration
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 12.2_
  
  - [x] 5.5 Implement shared file migrator
    - Identify multi-use components (used by 2+ features)
    - Migrate UI components to shared/ui/
    - Migrate layout components to shared/layout/
    - Migrate shared hooks to shared/hooks/
    - Migrate utilities to shared/utils/
    - Create git commit for shared migration
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ]* 5.6 Write property test for multi-use component sharing
    - **Property 9: Multi-Use Component Sharing**
    - **Validates: Requirements 4.6**
  
  - [ ]* 5.7 Write property test for multi-use hook sharing
    - **Property 10: Multi-Use Hook Sharing**
    - **Validates: Requirements 4.7**
  
  - [x] 5.8 Implement duplicate resolver
    - Merge section/ and sections/ folders into features/landing/components/
    - Merge visa/ and visa-detail/ folders into features/visa/components/
    - Consolidate duplicate files with high similarity
    - Preserve conflicting implementations with distinct names
    - Update all import references to consolidated files
    - Create git commit for duplicate resolution
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 5.9 Write property test for duplicate consolidation
    - **Property 11: Duplicate File Consolidation**
    - **Validates: Requirements 5.2, 5.3, 5.5**
  
  - [ ]* 5.10 Write property test for conflict preservation
    - **Property 12: Conflict Preservation**
    - **Validates: Requirements 5.4**
  
  - [x] 5.11 Implement naming standardizer
    - Rename directories to kebab-case
    - Rename React components to PascalCase
    - Rename hooks to camelCase (useXxx pattern)
    - Rename utilities to camelCase
    - Update all import references to renamed files
    - Create git commit for naming standardization
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  
  - [ ]* 5.12 Write property test for naming convention compliance
    - **Property 13: Naming Convention Compliance**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**

- [x] 6. Checkpoint - Verify file migration
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement import updater
  - [x] 7.1 Implement import analyzer
    - Create ImportAnalyzer class to parse import statements from files
    - Extract import source, specifiers, and type (relative, alias, external)
    - Build import map for all files
    - _Requirements: 6.5, 7.1_
  
  - [x] 7.2 Implement path transformer
    - Create PathTransformer class to convert old import paths to new paths
    - Apply transformation rules based on file mappings
    - Calculate correct relative paths between files
    - Convert to public API imports (via index.ts) where appropriate
    - Preserve external package imports unchanged
    - Handle dynamic imports and lazy-loaded components
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ]* 7.3 Write property test for import update completeness
    - **Property 14: Import Update Completeness**
    - **Validates: Requirements 6.5, 7.1**
  
  - [ ]* 7.4 Write property test for import path correctness
    - **Property 15: Import Path Correctness**
    - **Validates: Requirements 7.2, 7.3, 7.6**
  
  - [ ]* 7.5 Write property test for external import preservation
    - **Property 16: External Import Preservation**
    - **Validates: Requirements 7.4**
  
  - [ ]* 7.6 Write property test for dynamic import updates
    - **Property 17: Dynamic Import Updates**
    - **Validates: Requirements 7.5**
  
  - [x] 7.7 Implement import updater execution
    - Update all import statements in all files
    - Write updated file contents back to disk
    - Create git commit for import updates
    - _Requirements: 6.5, 7.1_

- [ ] 8. Implement business logic extractor
  - [x] 8.1 Implement API call extractor
    - Create LogicExtractor class to extract fetch/axios calls from components
    - Use AST to identify HTTP client invocations
    - Extract to separate files in lib/ directory
    - Update component to import and use extracted functions
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ]* 8.2 Write property test for API call extraction
    - **Property 22: API Call Extraction**
    - **Validates: Requirements 9.4**
  
  - [ ]* 8.3 Write property test for behavioral equivalence
    - **Property 23: Behavioral Equivalence After Extraction**
    - **Validates: Requirements 9.6**
  
  - [x] 8.4 Implement hardcoded data extractor
    - Extract large object/array literals from components
    - Move to lib/data.ts or lib/constants.ts
    - Place in feature lib/ if feature-specific, shared/lib/ if multi-use
    - Update component to import extracted data
    - Create git commit for logic and data extraction
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_
  
  - [ ]* 8.5 Write property test for hardcoded data extraction
    - **Property 24: Hardcoded Data Extraction**
    - **Validates: Requirements 10.1**
  
  - [ ]* 8.6 Write property test for data location by scope
    - **Property 25: Data Location by Scope**
    - **Validates: Requirements 10.5, 10.6**

- [ ] 9. Implement app directory preservation
  - [x] 9.1 Verify app/ directory unchanged
    - Create AppDirectoryValidator to ensure app/ structure is identical
    - Compare file list, content, and structure before/after migration
    - Report any unintended changes
    - _Requirements: 2.7_
  
  - [ ]* 9.2 Write property test for app directory preservation
    - **Property 8: App Directory Preservation**
    - **Validates: Requirements 2.7**

- [x] 10. Checkpoint - Verify migration complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Phase 4: Migration Validator
  - [x] 11.1 Implement import validator
    - Create ImportValidator class to verify all imports resolve correctly
    - Check each import statement resolves to an existing file
    - Report broken imports with file path and line number
    - _Requirements: 11.2_
  
  - [ ]* 11.2 Write property test for import resolution validity
    - **Property 27: Import Resolution Validity**
    - **Validates: Requirements 11.2**
  
  - [x] 11.3 Implement TypeScript type checker
    - Create TypeChecker class to run TypeScript compiler programmatically
    - Execute tsc --noEmit to check for type errors
    - Parse and report type errors with file path and line number
    - _Requirements: 11.3_
  
  - [ ]* 11.4 Write property test for TypeScript type resolution
    - **Property 28: TypeScript Type Resolution**
    - **Validates: Requirements 11.3**
  
  - [x] 11.5 Implement circular dependency detector
    - Create CircularDepDetector class to analyze dependency graph
    - Use depth-first search to detect cycles
    - Report all circular dependency chains
    - _Requirements: 11.4_
  
  - [ ]* 11.6 Write property test for circular dependency prevention
    - **Property 29: Circular Dependency Prevention**
    - **Validates: Requirements 11.4**
  
  - [x] 11.7 Implement public API validator
    - Create APIValidator class to test all index.ts exports are accessible
    - Attempt to import each exported item
    - Report inaccessible exports
    - _Requirements: 11.5_
  
  - [ ]* 11.8 Write property test for public API accessibility
    - **Property 30: Public API Accessibility**
    - **Validates: Requirements 11.5**
  
  - [ ]* 11.9 Write property test for validation error reporting
    - **Property 31: Validation Error Reporting**
    - **Validates: Requirements 11.6**

- [x] 12. Implement migration reporter
  - [x] 12.1 Implement report generator
    - Create ReportGenerator class to compile migration statistics
    - Generate summary (total files, moved files, updated imports, errors, warnings)
    - Create file mapping table (from → to)
    - List breaking changes and manual steps required
    - Write MIGRATION.md with before/after structure, import examples, file mappings
    - _Requirements: 11.7, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_
  
  - [ ]* 12.2 Write property test for migration report generation
    - **Property 32: Migration Report Generation**
    - **Validates: Requirements 11.7**
  
  - [ ]* 12.3 Write property test for migration documentation completeness
    - **Property 35: Migration Documentation Completeness**
    - **Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 13.6**
  
  - [ ]* 12.4 Write property test for logical commit grouping
    - **Property 34: Logical Commit Grouping**
    - **Validates: Requirements 12.2**

- [x] 13. Implement error handling and rollback
  - [x] 13.1 Implement error handler
    - Create ErrorHandler class to categorize and handle errors
    - Support error categories (file-system, parse, dependency, validation, git)
    - Determine if errors are recoverable
    - Provide actionable error messages with suggested fixes
    - _Requirements: 11.6_
  
  - [x] 13.2 Implement checkpoint system
    - Create CheckpointManager to save git checkpoints before each phase
    - Store checkpoint SHAs for rollback
    - _Requirements: 12.3_
  
  - [x] 13.3 Implement rollback mechanism
    - Create RollbackManager to revert to checkpoints
    - Support full rollback (revert all changes)
    - Support partial rollback (revert specific phases)
    - Use git reset or git checkout to restore files
    - _Requirements: 12.3_

- [x] 14. Implement CLI and orchestration
  - [x] 14.1 Create CLI interface
    - Implement dry-run mode (analyze and plan without changes)
    - Implement full migration mode (execute all phases)
    - Implement interactive mode (prompt for confirmation at each phase)
    - Add verbose logging option
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  
  - [x] 14.2 Create migration orchestrator
    - Create RefactorOrchestrator class to coordinate all phases
    - Execute phases in sequence: Analysis → Structure → Migration → Validation
    - Create checkpoints between phases
    - Handle errors and trigger rollback if needed
    - Generate final report
    - _Requirements: 11.7, 12.2, 12.3_

- [x] 15. Integration and wiring
  - [x] 15.1 Wire all components together
    - Connect StructureAnalyzer, FileMigrator, ImportUpdater, MigrationValidator
    - Integrate with RefactorOrchestrator
    - Set up configuration loading (MigrationConfig)
    - Add logging and progress reporting
    - _Requirements: All requirements_
  
  - [x] 15.2 Create npm scripts
    - Add refactor:dry-run script
    - Add refactor:migrate script
    - Add refactor:interactive script
    - Add refactor:abort script for rollback
    - _Requirements: 12.3_
  
  - [ ]* 15.3 Write integration tests
    - Test end-to-end migration on sample project
    - Verify git history preservation
    - Verify TypeScript compilation after migration
    - Test rollback functionality

- [x] 16. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across randomized inputs
- Unit tests (not shown) should be written for specific examples and edge cases
- Checkpoints ensure incremental validation and safe rollback
- All file operations use git mv to preserve history
- Migration is executed in logical phases with separate commits
- The refactor system is designed to be safe, reversible, and transparent
