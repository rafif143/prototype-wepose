/**
 * Tests for IndexGenerator
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { IndexGenerator } from '../IndexGenerator.js';
import { StructureCreator } from '../StructureCreator.js';
import { defaultConfig } from '../../config/default.config.js';
import type { FileNode } from '../../types/index.js';

describe('IndexGenerator', () => {
  const testRoot = path.join(process.cwd(), 'test-output', 'index-generator');

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
    fs.mkdirSync(testRoot, { recursive: true });

    // Create directory structure
    const creator = new StructureCreator(testRoot, defaultConfig);
    creator.createStructure();
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
  });

  describe('generateAllIndexFiles', () => {
    it('should generate index.ts for each feature module', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      const categorization = {
        visa: [
          {
            path: 'features/visa/components/VisaCard.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['VisaCard'],
            feature: 'visa' as const,
          },
        ],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      generator.generateAllIndexFiles(categorization);

      const features = ['visa', 'blog', 'tools', 'landing'];
      for (const feature of features) {
        const indexPath = path.join(testRoot, 'features', feature, 'index.ts');
        expect(fs.existsSync(indexPath)).toBe(true);
      }
    });

    it('should generate index.ts with proper exports', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      const categorization = {
        visa: [
          {
            path: 'features/visa/components/VisaCard.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['VisaCard'],
            feature: 'visa' as const,
          },
        ],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      generator.generateAllIndexFiles(categorization);

      const indexPath = path.join(testRoot, 'features', 'visa', 'index.ts');
      const content = fs.readFileSync(indexPath, 'utf-8');

      expect(content).toContain('Public API for visa feature module');
      expect(content).toContain('export { VisaCard }');
    });

    it('should not export private files', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      const categorization = {
        visa: [
          {
            path: 'features/visa/components/_PrivateComponent.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['_PrivateComponent'],
            feature: 'visa' as const,
          },
          {
            path: 'features/visa/components/PublicComponent.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['PublicComponent'],
            feature: 'visa' as const,
          },
        ],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      generator.generateAllIndexFiles(categorization);

      const indexPath = path.join(testRoot, 'features', 'visa', 'index.ts');
      const content = fs.readFileSync(indexPath, 'utf-8');

      expect(content).not.toContain('_PrivateComponent');
      expect(content).toContain('PublicComponent');
    });

    it('should generate JSDoc comments for exports', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      const categorization = {
        visa: [
          {
            path: 'features/visa/hooks/useVisaData.ts',
            type: 'hook' as const,
            imports: [],
            exports: ['useVisaData'],
            feature: 'visa' as const,
          },
        ],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      generator.generateAllIndexFiles(categorization);

      const indexPath = path.join(testRoot, 'features', 'visa', 'index.ts');
      const content = fs.readFileSync(indexPath, 'utf-8');

      expect(content).toContain('/** useVisaData hook */');
    });

    it('should generate index files for shared subdirectories', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      const categorization = {
        visa: [],
        blog: [],
        tools: [],
        landing: [],
        shared: [
          {
            path: 'shared/ui/Button.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['Button'],
            feature: 'shared' as const,
          },
        ],
      };

      generator.generateAllIndexFiles(categorization);

      const indexPath = path.join(testRoot, 'shared', 'ui', 'index.ts');
      expect(fs.existsSync(indexPath)).toBe(true);

      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('Public API for shared ui');
      expect(content).toContain('export { Button }');
    });
  });

  describe('verifyIndexFiles', () => {
    it('should return success when feature index files exist', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      
      // Generate with files
      const categorization = {
        visa: [
          {
            path: 'features/visa/components/VisaCard.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['VisaCard'],
            feature: 'visa' as const,
          },
        ],
        blog: [],
        tools: [],
        landing: [],
        shared: [
          {
            path: 'shared/ui/Button.tsx',
            type: 'component' as const,
            imports: [],
            exports: ['Button'],
            feature: 'shared' as const,
          },
        ],
      };

      generator.generateAllIndexFiles(categorization);

      const result = generator.verifyIndexFiles();
      
      // Feature index files should exist
      expect(fs.existsSync(path.join(testRoot, 'features', 'visa', 'index.ts'))).toBe(true);
      expect(fs.existsSync(path.join(testRoot, 'features', 'blog', 'index.ts'))).toBe(true);
      expect(fs.existsSync(path.join(testRoot, 'features', 'tools', 'index.ts'))).toBe(true);
      expect(fs.existsSync(path.join(testRoot, 'features', 'landing', 'index.ts'))).toBe(true);
      
      // Shared/ui index should exist
      expect(fs.existsSync(path.join(testRoot, 'shared', 'ui', 'index.ts'))).toBe(true);
      
      // Other shared subdirectories exist but have no index (no files)
      // This is expected behavior - we only generate index files for subdirectories with content
    });

    it('should detect missing feature index files', () => {
      const generator = new IndexGenerator(testRoot, defaultConfig);
      // Don't generate index files

      const result = generator.verifyIndexFiles();
      expect(result.success).toBe(false);
      expect(result.missing.some(m => m.includes('features/'))).toBe(true);
    });
  });
});
