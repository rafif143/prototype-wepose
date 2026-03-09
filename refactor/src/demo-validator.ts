/**
 * Demo script for Phase 4: Migration Validator
 * 
 * This demonstrates the validation capabilities after migration:
 * - Import validation
 * - TypeScript type checking
 * - Circular dependency detection
 * - Public API validation
 */

import { MigrationValidator } from './validator/MigrationValidator.js';
import { DirectoryScanner } from './analyzer/DirectoryScanner.js';
import { DependencyMapper } from './analyzer/DependencyMapper.js';
import type { DependencyGraph } from './types/index.js';
import * as path from 'path';

async function runValidationDemo() {
  console.log('='.repeat(80));
  console.log('Phase 4: Migration Validator Demo');
  console.log('='.repeat(80));
  console.log();

  // Initialize validator with project root
  const projectRoot = path.resolve(process.cwd(), '..');
  const validator = new MigrationValidator(projectRoot);

  console.log('Project Root:', projectRoot);
  console.log();

  // Step 1: Validate Imports
  console.log('Step 1: Validating Imports');
  console.log('-'.repeat(80));
  
  try {
    // Scan for all TypeScript/JavaScript files
    const scanner = new DirectoryScanner(projectRoot);
    const allFiles = scanner.scanDirectories([
      'app',
      'features',
      'shared',
      'components',
      'hooks',
      'lib',
      'utils',
    ]);

    const filePaths = allFiles.map(f => f.path);
    console.log(`Found ${filePaths.length} files to validate`);
    
    const importResult = validator.validateImports(filePaths);
    
    if (importResult.passed) {
      console.log('✓ All imports resolve correctly');
    } else {
      console.log(`✗ Found ${importResult.errors.length} import errors:`);
      importResult.errors.slice(0, 5).forEach(err => {
        console.log(`  - ${err.file}:${err.line} - ${err.message}`);
      });
      if (importResult.errors.length > 5) {
        console.log(`  ... and ${importResult.errors.length - 5} more errors`);
      }
    }
    
    if (importResult.warnings.length > 0) {
      console.log(`⚠ ${importResult.warnings.length} warnings:`);
      importResult.warnings.forEach(warn => {
        console.log(`  - ${warn.file}:${warn.line} - ${warn.message}`);
      });
    }
  } catch (error) {
    console.log('✗ Import validation failed:', error instanceof Error ? error.message : String(error));
  }
  
  console.log();

  // Step 2: Check TypeScript Type Resolution
  console.log('Step 2: Checking TypeScript Type Resolution');
  console.log('-'.repeat(80));
  
  try {
    const typeResult = validator.checkTypeResolution([]);
    
    if (typeResult.passed) {
      console.log('✓ TypeScript compilation successful');
    } else {
      console.log(`✗ Found ${typeResult.errors.length} type errors:`);
      typeResult.errors.slice(0, 5).forEach(err => {
        console.log(`  - ${err.file}:${err.line} - ${err.message}`);
      });
      if (typeResult.errors.length > 5) {
        console.log(`  ... and ${typeResult.errors.length - 5} more errors`);
      }
    }
    
    if (typeResult.warnings.length > 0) {
      console.log(`⚠ ${typeResult.warnings.length} warnings:`);
      typeResult.warnings.forEach(warn => {
        console.log(`  - ${warn.message}`);
      });
    }
  } catch (error) {
    console.log('✗ Type checking failed:', error instanceof Error ? error.message : String(error));
  }
  
  console.log();

  // Step 3: Detect Circular Dependencies
  console.log('Step 3: Detecting Circular Dependencies');
  console.log('-'.repeat(80));
  
  try {
    // Build dependency graph
    const scanner = new DirectoryScanner(projectRoot);
    const allFiles = scanner.scanDirectories([
      'app',
      'features',
      'shared',
      'components',
      'hooks',
      'lib',
      'utils',
    ]);

    const mapper = new DependencyMapper(projectRoot);
    const graph = mapper.buildGraph(allFiles);
    
    console.log(`Analyzing ${graph.nodes.size} files for circular dependencies...`);
    
    const circularResult = validator.detectCircularDependencies(graph);
    
    if (!circularResult.found) {
      console.log('✓ No circular dependencies detected');
    } else {
      console.log(`✗ Found ${circularResult.cycles.length} circular dependencies:`);
      circularResult.cycles.slice(0, 3).forEach((cycle, index) => {
        console.log(`  Cycle ${index + 1}:`);
        cycle.forEach((file, i) => {
          console.log(`    ${i + 1}. ${file}`);
        });
      });
      if (circularResult.cycles.length > 3) {
        console.log(`  ... and ${circularResult.cycles.length - 3} more cycles`);
      }
    }
  } catch (error) {
    console.log('✗ Circular dependency detection failed:', error instanceof Error ? error.message : String(error));
  }
  
  console.log();

  // Step 4: Validate Public APIs
  console.log('Step 4: Validating Public APIs');
  console.log('-'.repeat(80));
  
  try {
    const modules = [
      'features/visa',
      'features/blog',
      'features/tools',
      'features/landing',
      'shared/ui',
      'shared/layout',
      'shared/hooks',
      'shared/utils',
    ];
    
    console.log(`Validating ${modules.length} module public APIs...`);
    
    const apiResult = validator.validatePublicAPIs(modules);
    
    if (apiResult.passed) {
      console.log('✓ All public APIs are accessible');
    } else {
      console.log(`✗ Found ${apiResult.errors.length} API errors:`);
      apiResult.errors.slice(0, 5).forEach(err => {
        console.log(`  - ${err.file}:${err.line} - ${err.message}`);
      });
      if (apiResult.errors.length > 5) {
        console.log(`  ... and ${apiResult.errors.length - 5} more errors`);
      }
    }
  } catch (error) {
    console.log('✗ Public API validation failed:', error instanceof Error ? error.message : String(error));
  }
  
  console.log();
  console.log('='.repeat(80));
  console.log('Validation Complete');
  console.log('='.repeat(80));
}

// Run the demo
runValidationDemo().catch(error => {
  console.error('Demo failed:', error);
  process.exit(1);
});
