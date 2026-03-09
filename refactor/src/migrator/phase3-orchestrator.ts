#!/usr/bin/env node
/**
 * Phase 3 Migration Orchestrator
 * Executes the file migration process with git commits
 */

import { execSync } from 'child_process';
import * as path from 'path';
import { FileMigrator } from './FileMigrator.js';
import { StructureAnalyzer } from '../analyzer/StructureAnalyzer.js';
import type { FileCategorization, MigrationResult } from '../types/index.js';

/**
 * Creates a git commit with a descriptive message
 */
function createGitCommit(message: string, projectRoot: string): void {
  try {
    execSync(`git add -A`, { cwd: projectRoot, stdio: 'pipe' });
    execSync(`git commit -m "${message}"`, { cwd: projectRoot, stdio: 'pipe' });
    console.log(`✓ Created commit: ${message}`);
  } catch (error) {
    console.error(`✗ Failed to create commit: ${message}`);
    throw error;
  }
}

/**
 * Prints migration results
 */
function printMigrationResult(result: MigrationResult, phase: string): void {
  console.log(`\n${phase} Results:`);
  console.log(`  Moved: ${result.movedFiles.length} files`);
  console.log(`  Errors: ${result.errors.length}`);
  console.log(`  Warnings: ${result.warnings.length}`);

  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach((err) => {
      console.log(`  ✗ ${err.file}: ${err.error}`);
    });
  }

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach((warn) => {
      console.log(`  ⚠ ${warn.file}: ${warn.warning}`);
    });
  }

  if (result.movedFiles.length > 0) {
    console.log('\nMoved files:');
    result.movedFiles.slice(0, 10).forEach((move) => {
      console.log(`  ${move.from} → ${move.to}`);
    });
    if (result.movedFiles.length > 10) {
      console.log(`  ... and ${result.movedFiles.length - 10} more`);
    }
  }
}

/**
 * Main orchestration function for Phase 3
 */
async function runPhase3Migration(projectRoot: string): Promise<void> {
  console.log('='.repeat(60));
  console.log('Phase 3: File Migration');
  console.log('='.repeat(60));

  const migrator = new FileMigrator(projectRoot);
  const analyzer = new StructureAnalyzer(projectRoot);

  // Step 1: Analyze current structure
  console.log('\n[1/5] Analyzing current structure...');
  const files = analyzer.scanDirectories([
    'components',
    'hooks',
    'lib',
    'utils',
  ]);
  const categorization = analyzer.categorizeFiles(files);

  console.log(`  Found ${files.length} files to migrate`);
  console.log(`  - Visa: ${categorization.visa.length}`);
  console.log(`  - Blog: ${categorization.blog.length}`);
  console.log(`  - Tools: ${categorization.tools.length}`);
  console.log(`  - Landing: ${categorization.landing.length}`);
  console.log(`  - Shared: ${categorization.shared.length}`);

  // Step 2: Resolve duplicates (section/sections, visa/visa-detail)
  console.log('\n[2/5] Resolving duplicate folders...');
  
  // Merge section and sections into features/landing/components
  const sectionResult = migrator.resolveDuplicates(
    ['components/section', 'components/sections'],
    'features/landing/components'
  );
  printMigrationResult(sectionResult, 'Section/Sections Merge');
  
  if (sectionResult.movedFiles.length > 0) {
    createGitCommit('refactor: merge section and sections folders', projectRoot);
  }

  // Merge visa and visa-detail into features/visa/components
  const visaResult = migrator.resolveDuplicates(
    ['components/visa', 'components/visa-detail'],
    'features/visa/components'
  );
  printMigrationResult(visaResult, 'Visa/Visa-Detail Merge');
  
  if (visaResult.movedFiles.length > 0) {
    createGitCommit('refactor: merge visa and visa-detail folders', projectRoot);
  }

  // Step 3: Migrate feature files
  console.log('\n[3/5] Migrating feature-specific files...');
  
  // Re-categorize after duplicate resolution
  const remainingFiles = analyzer.scanDirectories([
    'components',
    'hooks',
    'lib',
    'utils',
  ]);
  const updatedCategorization = analyzer.categorizeFiles(remainingFiles);

  const featureResult = migrator.migrateFeatureFiles(updatedCategorization);
  printMigrationResult(featureResult, 'Feature Files Migration');
  
  if (featureResult.movedFiles.length > 0) {
    createGitCommit('refactor: migrate feature-specific files', projectRoot);
  }

  // Step 4: Migrate shared files
  console.log('\n[4/5] Migrating shared files...');
  const sharedResult = migrator.migrateSharedFiles(updatedCategorization.shared);
  printMigrationResult(sharedResult, 'Shared Files Migration');
  
  if (sharedResult.movedFiles.length > 0) {
    createGitCommit('refactor: migrate shared files', projectRoot);
  }

  // Step 5: Standardize naming (if needed)
  console.log('\n[5/5] Standardizing naming conventions...');
  // TODO: Implement naming standardization based on analysis
  console.log('  Naming standardization will be implemented based on specific needs');

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Phase 3 Migration Complete!');
  console.log('='.repeat(60));
  
  const totalMoved = 
    sectionResult.movedFiles.length +
    visaResult.movedFiles.length +
    featureResult.movedFiles.length +
    sharedResult.movedFiles.length;
  
  const totalErrors = 
    sectionResult.errors.length +
    visaResult.errors.length +
    featureResult.errors.length +
    sharedResult.errors.length;

  console.log(`\nTotal files moved: ${totalMoved}`);
  console.log(`Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n⚠ Migration completed with errors. Please review the errors above.');
    process.exit(1);
  } else {
    console.log('\n✓ Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('  1. Review the changes with: git log --oneline');
    console.log('  2. Update import paths (Phase 4)');
    console.log('  3. Run validation checks');
  }
}

// Main execution
const projectRoot = path.resolve(process.cwd(), '..');
runPhase3Migration(projectRoot).catch((error) => {
  console.error('\n✗ Migration failed:', error.message);
  console.error('\nTo rollback, use: git reset --hard HEAD~N');
  console.error('(where N is the number of commits to undo)');
  process.exit(1);
});
