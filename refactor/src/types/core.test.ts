/**
 * Tests for core type definitions
 */

import { describe, it, expect } from 'vitest';
import type { FileNode, DependencyGraph, MigrationConfig } from './core.js';

describe('Core Types', () => {
  it('should create a valid FileNode', () => {
    const fileNode: FileNode = {
      path: 'components/visa/VisaCard.tsx',
      type: 'component',
      imports: ['react', './utils'],
      exports: ['VisaCard'],
      feature: 'visa',
    };

    expect(fileNode.path).toBe('components/visa/VisaCard.tsx');
    expect(fileNode.type).toBe('component');
    expect(fileNode.feature).toBe('visa');
  });

  it('should create a valid DependencyGraph', () => {
    const graph: DependencyGraph = {
      nodes: new Map(),
      edges: new Map(),
    };

    expect(graph.nodes).toBeInstanceOf(Map);
    expect(graph.edges).toBeInstanceOf(Map);
  });

  it('should validate MigrationConfig structure', () => {
    const config: MigrationConfig = {
      features: [
        {
          name: 'visa',
          patterns: ['**/visa/**'],
          targetDir: 'features/visa',
          subdirs: {
            components: [],
            hooks: [],
            lib: [],
            types: [],
            utils: [],
          },
        },
      ],
      shared: {
        ui: [],
        layout: [],
        hooks: [],
        utils: [],
        types: [],
        lib: [],
      },
      namingConventions: {
        directories: 'kebab-case',
        components: 'PascalCase',
        hooks: 'camelCase',
        utils: 'camelCase',
        types: 'PascalCase',
      },
      duplicateResolution: {
        strategy: 'merge',
        similarityThreshold: 0.8,
        conflictResolution: 'manual',
      },
    };

    expect(config.features).toHaveLength(1);
    expect(config.features[0].name).toBe('visa');
    expect(config.namingConventions.directories).toBe('kebab-case');
  });
});
