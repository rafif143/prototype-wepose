/**
 * Demo script for Phase 2: Structure Creator
 * 
 * This script demonstrates creating the new feature-based directory structure
 * and generating index.ts files for public APIs.
 */

import * as path from 'path';
import { StructureCreator, IndexGenerator } from './creator/index.js';
import { defaultConfig } from './config/index.js';
import type { FileNode } from './types/index.js';

// Demo project root (use a test directory)
const demoRoot = path.join(process.cwd(), 'demo-output');

console.log('=== Phase 2: Structure Creator Demo ===\n');

// Step 1: Create directory structure
console.log('Step 1: Creating directory structure...');
const creator = new StructureCreator(demoRoot, defaultConfig);
creator.createStructure();

const verification = creator.verifyStructure();
if (verification.success) {
  console.log('✓ Directory structure created successfully');
  console.log('  - features/visa/');
  console.log('  - features/blog/');
  console.log('  - features/tools/');
  console.log('  - features/landing/');
  console.log('  - shared/ui/');
  console.log('  - shared/layout/');
  console.log('  - shared/hooks/');
  console.log('  - shared/utils/');
  console.log('  - shared/types/');
  console.log('  - shared/lib/');
} else {
  console.log('✗ Directory structure creation failed');
  console.log('Missing directories:', verification.missing);
  process.exit(1);
}

console.log('\nStep 2: Generating index.ts files...');

// Create sample file categorization for demo
const sampleCategorization = {
  visa: [
    {
      path: 'features/visa/components/VisaCard.tsx',
      type: 'component' as const,
      imports: [],
      exports: ['VisaCard'],
      feature: 'visa' as const,
    },
    {
      path: 'features/visa/hooks/useVisaData.ts',
      type: 'hook' as const,
      imports: [],
      exports: ['useVisaData'],
      feature: 'visa' as const,
    },
  ],
  blog: [
    {
      path: 'features/blog/components/BlogPost.tsx',
      type: 'component' as const,
      imports: [],
      exports: ['BlogPost'],
      feature: 'blog' as const,
    },
  ],
  tools: [
    {
      path: 'features/tools/components/ComparisonTool.tsx',
      type: 'component' as const,
      imports: [],
      exports: ['ComparisonTool'],
      feature: 'tools' as const,
    },
  ],
  landing: [
    {
      path: 'features/landing/components/HeroSection.tsx',
      type: 'component' as const,
      imports: [],
      exports: ['HeroSection'],
      feature: 'landing' as const,
    },
  ],
  shared: [
    {
      path: 'shared/ui/Button.tsx',
      type: 'component' as const,
      imports: [],
      exports: ['Button'],
      feature: 'shared' as const,
    },
    {
      path: 'shared/hooks/useDebounce.ts',
      type: 'hook' as const,
      imports: [],
      exports: ['useDebounce'],
      feature: 'shared' as const,
    },
  ],
};

const generator = new IndexGenerator(demoRoot, defaultConfig);
generator.generateAllIndexFiles(sampleCategorization);

const indexVerification = generator.verifyIndexFiles();
console.log('✓ Index files generated');
console.log('  - features/visa/index.ts');
console.log('  - features/blog/index.ts');
console.log('  - features/tools/index.ts');
console.log('  - features/landing/index.ts');
console.log('  - shared/ui/index.ts');
console.log('  - shared/hooks/index.ts');

console.log('\n=== Phase 2 Complete ===');
console.log(`\nOutput directory: ${demoRoot}`);
console.log('You can inspect the generated structure and index files.');
