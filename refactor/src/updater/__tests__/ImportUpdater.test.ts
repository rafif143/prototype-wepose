/**
 * Tests for ImportUpdater
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ImportUpdater } from '../ImportUpdater.js';
import type { FileNode, MigrationResult } from '../../types/index.js';
import * as path from 'path';

describe('ImportUpdater', () => {
  let updater: ImportUpdater;
  const projectRoot = process.cwd();

  beforeEach(() => {
    updater = new ImportUpdater(projectRoot);
  });

  describe('analyzeImports', () => {
    it('should return empty imports for non-existent file', () => {
      const file: FileNode = {
        path: 'non-existent-file.ts',
        type: 'lib',
        imports: [],
        exports: [],
      };

      const result = updater.analyzeImports(file);

      expect(result).toBeDefined();
      expect(result.file).toBe('non-existent-file.ts');
      expect(result.imports).toEqual([]);
    });

    it('should have correct structure for analysis result', () => {
      const file: FileNode = {
        path: 'non-existent-file.ts',
        type: 'lib',
        imports: [],
        exports: [],
      };

      const result = updater.analyzeImports(file);

      expect(result).toHaveProperty('file');
      expect(result).toHaveProperty('imports');
      expect(Array.isArray(result.imports)).toBe(true);
    });
  });

  describe('transformPaths', () => {
    it('should transform visa component imports', () => {
      const analysis = {
        file: 'app/visa/page.tsx',
        imports: [
          {
            source: '@/components/visa/VisaCard',
            specifiers: ['VisaCard'],
            isRelative: false,
            isExternal: false,
          },
        ],
      };

      const result = updater.transformPaths(analysis, 'app/visa/page.tsx');

      expect(result.transformations.length).toBe(1);
      expect(result.transformations[0].oldImport).toBe('@/components/visa/VisaCard');
      expect(result.transformations[0].newImport).toBe('@/features/visa/components/VisaCard');
      expect(result.transformations[0].reason).toBe('Moved to feature-based structure');
    });

    it('should transform shared UI imports', () => {
      const analysis = {
        file: 'app/page.tsx',
        imports: [
          {
            source: '@/components/ui/button',
            specifiers: ['Button'],
            isRelative: false,
            isExternal: false,
          },
        ],
      };

      const result = updater.transformPaths(analysis, 'app/page.tsx');

      expect(result.transformations.length).toBe(1);
      expect(result.transformations[0].oldImport).toBe('@/components/ui/button');
      expect(result.transformations[0].newImport).toBe('@/shared/ui/button');
    });

    it('should skip external imports', () => {
      const analysis = {
        file: 'app/page.tsx',
        imports: [
          {
            source: 'react',
            specifiers: ['useState'],
            isRelative: false,
            isExternal: true,
          },
        ],
      };

      const result = updater.transformPaths(analysis, 'app/page.tsx');

      expect(result.transformations.length).toBe(0);
    });

    it('should transform multiple import types', () => {
      const analysis = {
        file: 'app/visa/page.tsx',
        imports: [
          {
            source: '@/components/visa/VisaCard',
            specifiers: ['VisaCard'],
            isRelative: false,
            isExternal: false,
          },
          {
            source: '@/components/ui/button',
            specifiers: ['Button'],
            isRelative: false,
            isExternal: false,
          },
          {
            source: '@/hooks/useQuizState',
            specifiers: ['useQuizState'],
            isRelative: false,
            isExternal: false,
          },
          {
            source: 'react',
            specifiers: ['useState'],
            isRelative: false,
            isExternal: true,
          },
        ],
      };

      const result = updater.transformPaths(analysis, 'app/visa/page.tsx');

      expect(result.transformations.length).toBe(3);
      expect(result.transformations[0].newImport).toBe('@/features/visa/components/VisaCard');
      expect(result.transformations[1].newImport).toBe('@/shared/ui/button');
      expect(result.transformations[2].newImport).toBe('@/features/visa/hooks/useQuizState');
    });
  });

  describe('updateAllImports', () => {
    it('should handle empty migration result', () => {
      const migrations: MigrationResult = {
        movedFiles: [],
        errors: [],
        warnings: [],
      };

      const result = updater.updateAllImports(migrations);

      expect(result).toBeDefined();
      expect(result.updatedFiles).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    it('should return result structure', () => {
      const migrations: MigrationResult = {
        movedFiles: [
          { from: 'components/visa/VisaCard.tsx', to: 'features/visa/components/VisaCard.tsx' },
        ],
        errors: [],
        warnings: [],
      };

      const result = updater.updateAllImports(migrations);

      expect(result).toHaveProperty('updatedFiles');
      expect(result).toHaveProperty('errors');
      expect(Array.isArray(result.updatedFiles)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('generatePublicAPI', () => {
    it('should throw error directing to IndexGenerator', () => {
      const files: FileNode[] = [];
      
      expect(() => {
        updater.generatePublicAPI('visa', files);
      }).toThrow('Use IndexGenerator.generateIndexFile() instead');
    });
  });
});
