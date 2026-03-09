/**
 * Tests for Structure Analyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { StructureAnalyzer } from '../StructureAnalyzer.js';
import * as fs from 'fs';
import * as path from 'path';

describe('StructureAnalyzer', () => {
  let analyzer: StructureAnalyzer;
  const testProjectRoot = path.join(process.cwd(), '..');

  beforeEach(() => {
    analyzer = new StructureAnalyzer(testProjectRoot);
  });

  describe('scanDirectories', () => {
    it('should scan directories and return FileNode objects', () => {
      const files = analyzer.scanDirectories(['components', 'hooks', 'lib', 'utils']);
      
      expect(files).toBeDefined();
      expect(Array.isArray(files)).toBe(true);
      
      // Should find some files
      expect(files.length).toBeGreaterThan(0);
      
      // Each file should have required properties
      files.forEach(file => {
        expect(file).toHaveProperty('path');
        expect(file).toHaveProperty('type');
        expect(file).toHaveProperty('imports');
        expect(file).toHaveProperty('exports');
        expect(Array.isArray(file.imports)).toBe(true);
        expect(Array.isArray(file.exports)).toBe(true);
      });
    });

    it('should handle non-existent directories gracefully', () => {
      const files = analyzer.scanDirectories(['non-existent-dir']);
      expect(files).toBeDefined();
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBe(0);
    });
  });

  describe('mapDependencies', () => {
    it('should build a dependency graph from files', () => {
      const files = analyzer.scanDirectories(['components']);
      const graph = analyzer.mapDependencies(files);
      
      expect(graph).toBeDefined();
      expect(graph.nodes).toBeInstanceOf(Map);
      expect(graph.edges).toBeInstanceOf(Map);
      
      // Nodes should contain all files
      expect(graph.nodes.size).toBe(files.length);
      
      // Each file should have an edge entry (even if empty)
      files.forEach(file => {
        expect(graph.edges.has(file.path)).toBe(true);
      });
    });
  });

  describe('categorizeFiles', () => {
    it('should categorize files into feature domains', () => {
      const files = analyzer.scanDirectories(['components', 'hooks']);
      const categorization = analyzer.categorizeFiles(files);
      
      expect(categorization).toBeDefined();
      expect(categorization).toHaveProperty('visa');
      expect(categorization).toHaveProperty('blog');
      expect(categorization).toHaveProperty('tools');
      expect(categorization).toHaveProperty('landing');
      expect(categorization).toHaveProperty('shared');
      
      // All arrays should be defined
      expect(Array.isArray(categorization.visa)).toBe(true);
      expect(Array.isArray(categorization.blog)).toBe(true);
      expect(Array.isArray(categorization.tools)).toBe(true);
      expect(Array.isArray(categorization.landing)).toBe(true);
      expect(Array.isArray(categorization.shared)).toBe(true);
      
      // Total categorized should equal input
      const total = 
        categorization.visa.length +
        categorization.blog.length +
        categorization.tools.length +
        categorization.landing.length +
        categorization.shared.length;
      
      expect(total).toBe(files.length);
    });

    it('should assign feature property to each file', () => {
      const files = analyzer.scanDirectories(['components']);
      const categorization = analyzer.categorizeFiles(files);
      
      const allFiles = [
        ...categorization.visa,
        ...categorization.blog,
        ...categorization.tools,
        ...categorization.landing,
        ...categorization.shared,
      ];
      
      allFiles.forEach(file => {
        expect(file.feature).toBeDefined();
        expect(['visa', 'blog', 'tools', 'landing', 'shared']).toContain(file.feature);
      });
    });
  });

  describe('detectDuplicates', () => {
    it('should detect duplicate folders and files', () => {
      const files = analyzer.scanDirectories(['components']);
      const duplicates = analyzer.detectDuplicates(files);
      
      expect(duplicates).toBeDefined();
      expect(Array.isArray(duplicates)).toBe(true);
      
      // Each duplicate group should have required properties
      duplicates.forEach(group => {
        expect(group).toHaveProperty('files');
        expect(group).toHaveProperty('similarity');
        expect(group).toHaveProperty('recommendedAction');
        expect(Array.isArray(group.files)).toBe(true);
        expect(group.files.length).toBeGreaterThan(1);
        expect(group.similarity).toBeGreaterThanOrEqual(0);
        expect(group.similarity).toBeLessThanOrEqual(1);
        expect(['merge', 'keep-both', 'rename']).toContain(group.recommendedAction);
      });
    });
  });

  describe('analyzeNaming', () => {
    it('should analyze naming conventions', () => {
      const files = analyzer.scanDirectories(['components']);
      const namingAnalysis = analyzer.analyzeNaming(files);
      
      expect(namingAnalysis).toBeDefined();
      expect(Array.isArray(namingAnalysis)).toBe(true);
      expect(namingAnalysis.length).toBe(files.length);
      
      // Each analysis should have required properties
      namingAnalysis.forEach(analysis => {
        expect(analysis).toHaveProperty('file');
        expect(analysis).toHaveProperty('fileName');
        expect(analysis).toHaveProperty('fileConvention');
        expect(analysis).toHaveProperty('expectedFileConvention');
        expect(analysis).toHaveProperty('isConsistent');
        expect(analysis).toHaveProperty('suggestions');
        expect(Array.isArray(analysis.suggestions)).toBe(true);
      });
    });
  });

  describe('detectHardcodedData', () => {
    it('should detect hardcoded data in files', () => {
      const files = analyzer.scanDirectories(['components', 'lib']);
      const hardcodedData = analyzer.detectHardcodedData(files);
      
      expect(hardcodedData).toBeDefined();
      expect(Array.isArray(hardcodedData)).toBe(true);
      
      // Each finding should have required properties
      hardcodedData.forEach(finding => {
        expect(finding).toHaveProperty('file');
        expect(finding).toHaveProperty('type');
        expect(finding).toHaveProperty('location');
        expect(finding).toHaveProperty('size');
        expect(finding).toHaveProperty('shouldExtract');
        expect(finding).toHaveProperty('reason');
        expect(['object', 'array']).toContain(finding.type);
      });
    });
  });

  describe('analyzeAll', () => {
    it('should perform complete analysis', () => {
      const result = analyzer.analyzeAll(['components', 'hooks']);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('files');
      expect(result).toHaveProperty('dependencyGraph');
      expect(result).toHaveProperty('categorization');
      expect(result).toHaveProperty('duplicates');
      expect(result).toHaveProperty('namingAnalysis');
      expect(result).toHaveProperty('hardcodedData');
      
      expect(Array.isArray(result.files)).toBe(true);
      expect(result.files.length).toBeGreaterThan(0);
      expect(result.dependencyGraph.nodes.size).toBe(result.files.length);
    });
  });
});
