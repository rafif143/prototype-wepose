/**
 * Tests for StructureCreator
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { StructureCreator } from '../StructureCreator.js';
import { defaultConfig } from '../../config/default.config.js';

describe('StructureCreator', () => {
  const testRoot = path.join(process.cwd(), 'test-output', 'structure-creator');

  beforeEach(() => {
    // Clean up test directory
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
    fs.mkdirSync(testRoot, { recursive: true });
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
  });

  describe('createStructure', () => {
    it('should create features directory', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const featuresDir = path.join(testRoot, 'features');
      expect(fs.existsSync(featuresDir)).toBe(true);
    });

    it('should create all feature modules', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const features = ['visa', 'blog', 'tools', 'landing'];
      for (const feature of features) {
        const featureDir = path.join(testRoot, 'features', feature);
        expect(fs.existsSync(featureDir)).toBe(true);
      }
    });

    it('should create standard subdirectories in each feature', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const features = ['visa', 'blog', 'tools', 'landing'];
      const subdirs = ['components', 'hooks', 'lib', 'types', 'utils'];

      for (const feature of features) {
        for (const subdir of subdirs) {
          const subdirPath = path.join(testRoot, 'features', feature, subdir);
          expect(fs.existsSync(subdirPath)).toBe(true);
        }
      }
    });

    it('should create shared directory', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const sharedDir = path.join(testRoot, 'shared');
      expect(fs.existsSync(sharedDir)).toBe(true);
    });

    it('should create all shared subdirectories', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const subdirs = ['ui', 'layout', 'hooks', 'utils', 'types', 'lib'];
      for (const subdir of subdirs) {
        const subdirPath = path.join(testRoot, 'shared', subdir);
        expect(fs.existsSync(subdirPath)).toBe(true);
      }
    });
  });

  describe('verifyStructure', () => {
    it('should return success when all directories exist', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      creator.createStructure();

      const result = creator.verifyStructure();
      expect(result.success).toBe(true);
      expect(result.missing).toHaveLength(0);
    });

    it('should detect missing features directory', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      // Don't create structure

      const result = creator.verifyStructure();
      expect(result.success).toBe(false);
      expect(result.missing).toContain('features/');
    });

    it('should detect missing shared directory', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      // Create only features directory
      fs.mkdirSync(path.join(testRoot, 'features'), { recursive: true });

      const result = creator.verifyStructure();
      expect(result.success).toBe(false);
      expect(result.missing).toContain('shared/');
    });

    it('should detect missing feature subdirectories', () => {
      const creator = new StructureCreator(testRoot, defaultConfig);
      // Create features directory but not subdirectories
      fs.mkdirSync(path.join(testRoot, 'features', 'visa'), { recursive: true });

      const result = creator.verifyStructure();
      expect(result.success).toBe(false);
      expect(result.missing.some(m => m.includes('features/visa/'))).toBe(true);
    });
  });
});
