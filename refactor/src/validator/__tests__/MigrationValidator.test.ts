/**
 * Unit tests for MigrationValidator
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MigrationValidator } from '../MigrationValidator.js';
import type { DependencyGraph, FileNode } from '../../types/index.js';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('MigrationValidator', () => {
  let validator: MigrationValidator;
  let tempDir: string;

  beforeEach(() => {
    // Create a temporary directory for test files
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'validator-test-'));
    validator = new MigrationValidator(tempDir);
  });

  afterEach(() => {
    // Clean up temporary directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('validateImports', () => {
    it('should pass when all imports resolve correctly', () => {
      // Create test files
      const fileA = path.join(tempDir, 'fileA.ts');
      const fileB = path.join(tempDir, 'fileB.ts');
      
      fs.writeFileSync(fileB, 'export const foo = 42;');
      fs.writeFileSync(fileA, 'import { foo } from "./fileB";');

      const result = validator.validateImports(['fileA.ts']);

      expect(result.passed).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect broken imports', () => {
      const fileA = path.join(tempDir, 'fileA.ts');
      fs.writeFileSync(fileA, 'import { foo } from "./nonexistent";');

      const result = validator.validateImports(['fileA.ts']);

      expect(result.passed).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain('nonexistent');
    });

    it('should skip external imports', () => {
      const fileA = path.join(tempDir, 'fileA.ts');
      fs.writeFileSync(fileA, 'import React from "react";');

      const result = validator.validateImports(['fileA.ts']);

      expect(result.passed).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle path alias imports', () => {
      // Create directory structure
      const featuresDir = path.join(tempDir, 'features', 'visa');
      fs.mkdirSync(featuresDir, { recursive: true });
      
      const fileA = path.join(tempDir, 'app', 'page.ts');
      const fileB = path.join(featuresDir, 'VisaCard.ts');
      
      fs.mkdirSync(path.dirname(fileA), { recursive: true });
      fs.writeFileSync(fileB, 'export const VisaCard = () => {};');
      fs.writeFileSync(fileA, 'import { VisaCard } from "@/features/visa/VisaCard";');

      const result = validator.validateImports(['app/page.ts']);

      expect(result.passed).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should report file path and line number for errors', () => {
      const fileA = path.join(tempDir, 'fileA.ts');
      fs.writeFileSync(fileA, 'const x = 1;\nimport { foo } from "./missing";\nconst y = 2;');

      const result = validator.validateImports(['fileA.ts']);

      expect(result.passed).toBe(false);
      expect(result.errors[0].file).toBe('fileA.ts');
      expect(result.errors[0].line).toBe(2);
    });
  });

  describe('checkTypeResolution', () => {
    it('should warn when no tsconfig.json exists', () => {
      const result = validator.checkTypeResolution([]);

      expect(result.passed).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0].message).toContain('tsconfig.json');
    });

    it('should detect TypeScript errors when compilation fails', () => {
      // Create a valid tsconfig.json
      const tsconfig = {
        compilerOptions: {
          target: 'ES2020',
          module: 'ESNext',
          strict: true,
          skipLibCheck: true,
        },
      };
      fs.writeFileSync(path.join(tempDir, 'tsconfig.json'), JSON.stringify(tsconfig));
      
      // Create a TypeScript file with type error
      const fileA = path.join(tempDir, 'fileA.ts');
      fs.writeFileSync(fileA, 'const x: number = "not a number";');

      const result = validator.checkTypeResolution(['fileA.ts']);

      // Should detect the type error
      expect(result.passed).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('detectCircularDependencies', () => {
    it('should detect no cycles in acyclic graph', () => {
      const graph: DependencyGraph = {
        nodes: new Map([
          ['A', { path: 'A', type: 'lib', imports: ['B'], exports: [] }],
          ['B', { path: 'B', type: 'lib', imports: ['C'], exports: [] }],
          ['C', { path: 'C', type: 'lib', imports: [], exports: [] }],
        ]),
        edges: new Map([
          ['A', ['B']],
          ['B', ['C']],
          ['C', []],
        ]),
      };

      const result = validator.detectCircularDependencies(graph);

      expect(result.found).toBe(false);
      expect(result.cycles).toHaveLength(0);
    });

    it('should detect simple circular dependency', () => {
      const graph: DependencyGraph = {
        nodes: new Map([
          ['A', { path: 'A', type: 'lib', imports: ['B'], exports: [] }],
          ['B', { path: 'B', type: 'lib', imports: ['A'], exports: [] }],
        ]),
        edges: new Map([
          ['A', ['B']],
          ['B', ['A']],
        ]),
      };

      const result = validator.detectCircularDependencies(graph);

      expect(result.found).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
      expect(result.cycles[0]).toContain('A');
      expect(result.cycles[0]).toContain('B');
    });

    it('should detect complex circular dependency', () => {
      const graph: DependencyGraph = {
        nodes: new Map([
          ['A', { path: 'A', type: 'lib', imports: ['B'], exports: [] }],
          ['B', { path: 'B', type: 'lib', imports: ['C'], exports: [] }],
          ['C', { path: 'C', type: 'lib', imports: ['D'], exports: [] }],
          ['D', { path: 'D', type: 'lib', imports: ['B'], exports: [] }],
        ]),
        edges: new Map([
          ['A', ['B']],
          ['B', ['C']],
          ['C', ['D']],
          ['D', ['B']],
        ]),
      };

      const result = validator.detectCircularDependencies(graph);

      expect(result.found).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
      // The cycle should be B -> C -> D -> B
      const cycle = result.cycles[0];
      expect(cycle).toContain('B');
      expect(cycle).toContain('C');
      expect(cycle).toContain('D');
    });

    it('should handle multiple separate cycles', () => {
      const graph: DependencyGraph = {
        nodes: new Map([
          ['A', { path: 'A', type: 'lib', imports: ['B'], exports: [] }],
          ['B', { path: 'B', type: 'lib', imports: ['A'], exports: [] }],
          ['C', { path: 'C', type: 'lib', imports: ['D'], exports: [] }],
          ['D', { path: 'D', type: 'lib', imports: ['C'], exports: [] }],
        ]),
        edges: new Map([
          ['A', ['B']],
          ['B', ['A']],
          ['C', ['D']],
          ['D', ['C']],
        ]),
      };

      const result = validator.detectCircularDependencies(graph);

      expect(result.found).toBe(true);
      expect(result.cycles.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('validatePublicAPIs', () => {
    it('should pass when index.ts exists and exports resolve', () => {
      // Create module structure
      const moduleDir = path.join(tempDir, 'features', 'visa');
      fs.mkdirSync(moduleDir, { recursive: true });
      
      const componentFile = path.join(moduleDir, 'VisaCard.ts');
      const indexFile = path.join(moduleDir, 'index.ts');
      
      fs.writeFileSync(componentFile, 'export const VisaCard = () => {};');
      fs.writeFileSync(indexFile, 'export { VisaCard } from "./VisaCard";');

      const result = validator.validatePublicAPIs(['features/visa']);

      expect(result.passed).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should error when index.ts is missing', () => {
      const moduleDir = path.join(tempDir, 'features', 'visa');
      fs.mkdirSync(moduleDir, { recursive: true });

      const result = validator.validatePublicAPIs(['features/visa']);

      expect(result.passed).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain('index');
    });

    it('should error when export source does not exist', () => {
      const moduleDir = path.join(tempDir, 'features', 'visa');
      fs.mkdirSync(moduleDir, { recursive: true });
      
      const indexFile = path.join(moduleDir, 'index.ts');
      fs.writeFileSync(indexFile, 'export { VisaCard } from "./NonExistent";');

      const result = validator.validatePublicAPIs(['features/visa']);

      expect(result.passed).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain('NonExistent');
    });

    it('should handle export * from syntax', () => {
      const moduleDir = path.join(tempDir, 'shared', 'ui');
      fs.mkdirSync(moduleDir, { recursive: true });
      
      const componentFile = path.join(moduleDir, 'Button.ts');
      const indexFile = path.join(moduleDir, 'index.ts');
      
      fs.writeFileSync(componentFile, 'export const Button = () => {};');
      fs.writeFileSync(indexFile, 'export * from "./Button";');

      const result = validator.validatePublicAPIs(['shared/ui']);

      expect(result.passed).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
