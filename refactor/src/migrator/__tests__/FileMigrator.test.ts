/**
 * Tests for File Migrator
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { FileMigrator } from '../FileMigrator.js';
import type { FileCategorization, FileNode } from '../../types/index.js';
import * as path from 'path';

describe('FileMigrator', () => {
  let migrator: FileMigrator;
  const testProjectRoot = path.join(process.cwd(), '..');

  beforeEach(() => {
    migrator = new FileMigrator(testProjectRoot);
  });

  describe('constructor', () => {
    it('should create a FileMigrator instance', () => {
      expect(migrator).toBeDefined();
      expect(migrator).toBeInstanceOf(FileMigrator);
    });

    it('should use provided project root', () => {
      const customRoot = '/custom/path';
      const customMigrator = new FileMigrator(customRoot);
      expect(customMigrator).toBeDefined();
    });

    it('should use current directory as default', () => {
      const defaultMigrator = new FileMigrator();
      expect(defaultMigrator).toBeDefined();
    });
  });

  describe('migrateFeatureFiles', () => {
    it('should accept FileCategorization and return MigrationResult', () => {
      const categorization: FileCategorization = {
        visa: [],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      const result = migrator.migrateFeatureFiles(categorization);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('movedFiles');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.movedFiles)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should handle empty categorization', () => {
      const categorization: FileCategorization = {
        visa: [],
        blog: [],
        tools: [],
        landing: [],
        shared: [],
      };

      const result = migrator.migrateFeatureFiles(categorization);
      
      expect(result.movedFiles.length).toBe(0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('migrateSharedFiles', () => {
    it('should accept FileNode array and return MigrationResult', () => {
      const files: FileNode[] = [];

      const result = migrator.migrateSharedFiles(files);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('movedFiles');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.movedFiles)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should handle empty file array', () => {
      const files: FileNode[] = [];

      const result = migrator.migrateSharedFiles(files);
      
      expect(result.movedFiles.length).toBe(0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('resolveDuplicates', () => {
    it('should accept duplicate paths and target folder', () => {
      const duplicates = ['components/section', 'components/sections'];
      const targetFolder = 'features/landing/components';

      const result = migrator.resolveDuplicates(duplicates, targetFolder);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('movedFiles');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.movedFiles)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should handle non-existent folders gracefully', () => {
      const duplicates = ['non-existent-folder'];
      const targetFolder = 'features/test';

      const result = migrator.resolveDuplicates(duplicates, targetFolder);
      
      expect(result).toBeDefined();
      // Should have warnings for non-existent folders
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('standardizeNaming', () => {
    it('should accept file rename mappings', () => {
      const files = [
        { from: 'old-name.tsx', to: 'NewName.tsx' },
      ];

      const result = migrator.standardizeNaming(files);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('movedFiles');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.movedFiles)).toBe(true);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should handle empty rename list', () => {
      const files: Array<{ from: string; to: string }> = [];

      const result = migrator.standardizeNaming(files);
      
      expect(result.movedFiles.length).toBe(0);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('extractBusinessLogic', () => {
    it('should throw not implemented error', () => {
      const component: FileNode = {
        path: 'test.tsx',
        type: 'component',
        imports: [],
        exports: [],
      };

      expect(() => migrator.extractBusinessLogic(component)).toThrow('Not implemented');
    });
  });

  describe('relocateHardcodedData', () => {
    it('should throw not implemented error', () => {
      const component: FileNode = {
        path: 'test.tsx',
        type: 'component',
        imports: [],
        exports: [],
      };

      expect(() => migrator.relocateHardcodedData(component)).toThrow('Not implemented');
    });
  });
});
