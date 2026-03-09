/**
 * Core type definitions for the feature-based refactor system
 */

/**
 * Represents a file node in the project structure
 */
export interface FileNode {
  /** Absolute or relative path to the file */
  path: string;
  /** Type of the file based on its purpose */
  type: 'component' | 'hook' | 'util' | 'type' | 'lib';
  /** List of import paths from this file */
  imports: string[];
  /** List of exported identifiers from this file */
  exports: string[];
  /** Feature domain this file belongs to (if categorized) */
  feature?: 'visa' | 'blog' | 'tools' | 'landing' | 'shared';
}

/**
 * Represents the dependency graph of the project
 */
export interface DependencyGraph {
  /** Map of file paths to their FileNode objects */
  nodes: Map<string, FileNode>;
  /** Map of file paths to arrays of files they depend on */
  edges: Map<string, string[]>;
}

/**
 * Categorization of files by feature domain
 */
export interface FileCategorization {
  visa: FileNode[];
  blog: FileNode[];
  tools: FileNode[];
  landing: FileNode[];
  shared: FileNode[];
}

/**
 * Group of duplicate or similar files
 */
export interface DuplicateGroup {
  /** Files that are duplicates or similar */
  files: FileNode[];
  /** Similarity score (0-1) */
  similarity: number;
  /** Recommended action for resolving duplicates */
  recommendedAction: 'merge' | 'keep-both' | 'rename';
}

/**
 * Result of a file migration operation
 */
export interface MigrationResult {
  /** List of files that were successfully moved */
  movedFiles: Array<{ from: string; to: string }>;
  /** List of errors encountered during migration */
  errors: Array<{ file: string; error: string }>;
  /** List of warnings generated during migration */
  warnings: Array<{ file: string; warning: string }>;
}

/**
 * Result of extracting business logic from a component
 */
export interface ExtractionResult {
  /** Path to the original component file */
  originalFile: string;
  /** List of newly created files with extracted logic */
  extractedFiles: Array<{ path: string; content: string }>;
  /** Updated component content after extraction */
  updatedComponent: string;
}

/**
 * Result of relocating hardcoded data
 */
export interface RelocationResult {
  /** Path to the original file */
  originalFile: string;
  /** Path to the new data file */
  dataFile: string;
  /** Updated component content after relocation */
  updatedComponent: string;
}

/**
 * Analysis of import statements in a file
 */
export interface ImportAnalysis {
  /** Path to the file being analyzed */
  file: string;
  /** List of import statements found */
  imports: Array<{
    /** Import source (e.g., './utils', 'react') */
    source: string;
    /** Imported identifiers (e.g., ['useState', 'useEffect']) */
    specifiers: string[];
    /** Whether this is a relative import */
    isRelative: boolean;
    /** Whether this is an external package import */
    isExternal: boolean;
  }>;
}

/**
 * Transformation of import paths for a file
 */
export interface PathTransformation {
  /** Path to the file being transformed */
  file: string;
  /** List of import path transformations */
  transformations: Array<{
    /** Original import path */
    oldImport: string;
    /** New import path */
    newImport: string;
    /** Reason for the transformation */
    reason: string;
  }>;
}

/**
 * Result of updating imports across the codebase
 */
export interface UpdateResult {
  /** List of files that had imports updated */
  updatedFiles: string[];
  /** List of errors encountered during update */
  errors: Array<{ file: string; error: string }>;
}

/**
 * Result of a validation check
 */
export interface ValidationResult {
  /** Whether the validation passed */
  passed: boolean;
  /** List of errors found */
  errors: Array<{ file: string; line: number; message: string }>;
  /** List of warnings found */
  warnings: Array<{ file: string; line: number; message: string }>;
}

/**
 * Result of circular dependency detection
 */
export interface CircularDepResult {
  /** Whether circular dependencies were found */
  found: boolean;
  /** List of circular dependency chains */
  cycles: Array<string[]>;
}

/**
 * Comprehensive migration report
 */
export interface MigrationReport {
  /** Summary statistics */
  summary: {
    totalFiles: number;
    movedFiles: number;
    updatedImports: number;
    errors: number;
    warnings: number;
  };
  /** Mapping of old file paths to new file paths */
  fileMapping: Array<{ from: string; to: string }>;
  /** List of breaking changes */
  breakingChanges: string[];
  /** List of manual steps required */
  manualSteps: string[];
}

/**
 * Configuration for the migration process
 */
export interface MigrationConfig {
  /** Feature mappings configuration */
  features: FeatureMapping[];
  /** Shared module mapping configuration */
  shared: SharedMapping;
  /** Naming convention rules */
  namingConventions: NamingRules;
  /** Duplicate resolution rules */
  duplicateResolution: DuplicateRules;
}

/**
 * Mapping configuration for a feature
 */
export interface FeatureMapping {
  /** Feature name */
  name: 'visa' | 'blog' | 'tools' | 'landing';
  /** Glob patterns to match files for this feature */
  patterns: string[];
  /** Target directory for this feature */
  targetDir: string;
  /** Subdirectory mappings */
  subdirs: {
    components: string[];
    hooks: string[];
    lib: string[];
    types: string[];
    utils: string[];
  };
}

/**
 * Mapping configuration for shared modules
 */
export interface SharedMapping {
  ui: string[];
  layout: string[];
  hooks: string[];
  utils: string[];
  types: string[];
  lib: string[];
}

/**
 * Naming convention rules
 */
export interface NamingRules {
  directories: 'kebab-case';
  components: 'PascalCase';
  hooks: 'camelCase';
  utils: 'camelCase';
  types: 'PascalCase';
}

/**
 * Rules for resolving duplicate files
 */
export interface DuplicateRules {
  /** Strategy for handling duplicates */
  strategy: 'merge' | 'keep-both' | 'prompt';
  /** Similarity threshold (0-1) for considering files as duplicates */
  similarityThreshold: number;
  /** How to resolve conflicts between duplicate files */
  conflictResolution: 'newest' | 'largest' | 'manual';
}

/**
 * Error categories for refactoring operations
 */
export type ErrorCategory = 
  | 'file-system'
  | 'parse'
  | 'dependency'
  | 'validation'
  | 'git';

/**
 * Refactoring error with context
 */
export interface RefactorError {
  /** Error category */
  category: ErrorCategory;
  /** Error severity */
  severity: 'fatal' | 'error' | 'warning';
  /** Error message */
  message: string;
  /** File where error occurred (if applicable) */
  file?: string;
  /** Line number where error occurred (if applicable) */
  line?: number;
  /** Whether the error is recoverable */
  recoverable: boolean;
}

/**
 * Resolution for a refactoring error
 */
export interface ErrorResolution {
  /** Action to take */
  action: 'abort' | 'skip' | 'retry' | 'manual';
  /** Message explaining the resolution */
  message: string;
  /** Suggested fix (if available) */
  suggestedFix?: string;
}

/**
 * Checkpoint for rollback purposes
 */
export interface MigrationCheckpoint {
  /** Checkpoint identifier */
  id: string;
  /** Git commit SHA */
  sha: string;
  /** Phase name */
  phase: string;
  /** Timestamp */
  timestamp: Date;
}
