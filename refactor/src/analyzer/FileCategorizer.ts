/**
 * File Categorizer
 * 
 * Categorizes files into feature domains (visa, blog, tools, landing, shared)
 * based on path patterns, naming conventions, and import analysis.
 */

import * as path from 'path';
import type { FileNode, FileCategorization, DependencyGraph } from '../types/index.js';

export class FileCategorizer {
  /**
   * Categorize files into feature domains
   * @param files - Array of FileNode objects to categorize
   * @param graph - Optional dependency graph for import analysis
   * @returns FileCategorization with files grouped by feature
   */
  categorizeFiles(files: FileNode[], graph?: DependencyGraph): FileCategorization {
    const categorization: FileCategorization = {
      visa: [],
      blog: [],
      tools: [],
      landing: [],
      shared: [],
    };

    for (const file of files) {
      const feature = this.determineFeature(file, files, graph);
      file.feature = feature;
      categorization[feature].push(file);
    }

    return categorization;
  }

  /**
   * Determine which feature a file belongs to
   */
  private determineFeature(
    file: FileNode,
    allFiles: FileNode[],
    graph?: DependencyGraph
  ): FileNode['feature'] {
    const filePath = file.path.toLowerCase();
    const fileName = path.basename(file.path).toLowerCase();

    // Check path patterns for explicit feature indicators
    
    // Visa feature
    if (
      filePath.includes('/visa/') ||
      filePath.includes('/visa-detail/') ||
      filePath.startsWith('visa/') ||
      filePath.startsWith('visa-detail/') ||
      fileName.includes('visa') ||
      fileName.includes('sponsor')
    ) {
      return 'visa';
    }

    // Blog feature
    if (
      filePath.includes('/blog/') ||
      filePath.startsWith('blog/') ||
      fileName.includes('blog') ||
      fileName.includes('article') ||
      fileName.includes('post')
    ) {
      return 'blog';
    }

    // Tools feature
    if (
      filePath.includes('/tools/') ||
      filePath.startsWith('tools/') ||
      fileName.includes('tool') ||
      fileName.includes('compare') ||
      fileName.includes('calculator')
    ) {
      return 'tools';
    }

    // Landing page feature (sections)
    if (
      filePath.includes('/section/') ||
      filePath.includes('/sections/') ||
      filePath.startsWith('section/') ||
      filePath.startsWith('sections/') ||
      fileName.includes('hero') ||
      fileName.includes('footer') ||
      fileName.includes('header') ||
      fileName.includes('landing')
    ) {
      return 'landing';
    }

    // Check for shared indicators
    if (
      filePath.includes('/ui/') ||
      filePath.includes('/layout/') ||
      filePath.startsWith('ui/') ||
      filePath.startsWith('layout/') ||
      this.isGenericUtility(fileName)
    ) {
      return 'shared';
    }

    // If no clear pattern, analyze imports to determine feature
    if (graph) {
      const featureFromImports = this.determineFeatureFromImports(file, allFiles, graph);
      if (featureFromImports) {
        return featureFromImports;
      }
    }

    // Default to shared if no clear feature association
    return 'shared';
  }

  /**
   * Check if a file is a generic utility (likely shared)
   */
  private isGenericUtility(fileName: string): boolean {
    const genericNames = [
      'utils',
      'helpers',
      'constants',
      'config',
      'types',
      'interfaces',
      'common',
      'shared',
      'debounce',
      'throttle',
      'format',
      'validate',
      'animation',
    ];

    return genericNames.some(name => fileName.includes(name));
  }

  /**
   * Determine feature based on import patterns
   * If a file is primarily imported by files from one feature, it likely belongs to that feature
   */
  private determineFeatureFromImports(
    file: FileNode,
    allFiles: FileNode[],
    graph: DependencyGraph
  ): FileNode['feature'] | null {
    // Find all files that import this file
    const importers: FileNode[] = [];
    
    for (const otherFile of allFiles) {
      const deps = graph.edges.get(otherFile.path) || [];
      if (deps.includes(file.path)) {
        importers.push(otherFile);
      }
    }

    if (importers.length === 0) {
      return null;
    }

    // Count how many importers belong to each feature
    const featureCounts = {
      visa: 0,
      blog: 0,
      tools: 0,
      landing: 0,
      shared: 0,
    };

    for (const importer of importers) {
      // Recursively determine the importer's feature (without graph to avoid infinite recursion)
      const importerFeature = this.determineFeature(importer, allFiles);
      if (importerFeature && importerFeature !== 'shared') {
        featureCounts[importerFeature]++;
      }
    }

    // If more than 50% of importers are from one feature, assign to that feature
    const totalNonShared = featureCounts.visa + featureCounts.blog + 
                           featureCounts.tools + featureCounts.landing;
    
    if (totalNonShared === 0) {
      return 'shared';
    }

    const threshold = totalNonShared * 0.5;
    
    if (featureCounts.visa > threshold) return 'visa';
    if (featureCounts.blog > threshold) return 'blog';
    if (featureCounts.tools > threshold) return 'tools';
    if (featureCounts.landing > threshold) return 'landing';

    // If used by multiple features, it's shared
    const featuresUsed = Object.entries(featureCounts)
      .filter(([feature, count]) => feature !== 'shared' && count > 0)
      .length;

    if (featuresUsed >= 2) {
      return 'shared';
    }

    return null;
  }

  /**
   * Get statistics about the categorization
   */
  getStatistics(categorization: FileCategorization): {
    total: number;
    byFeature: Record<string, number>;
  } {
    return {
      total: Object.values(categorization).reduce((sum, files) => sum + files.length, 0),
      byFeature: {
        visa: categorization.visa.length,
        blog: categorization.blog.length,
        tools: categorization.tools.length,
        landing: categorization.landing.length,
        shared: categorization.shared.length,
      },
    };
  }

  /**
   * Validate that each file is categorized into exactly one feature
   */
  validateCategorization(categorization: FileCategorization, originalFiles: FileNode[]): boolean {
    const allCategorized = [
      ...categorization.visa,
      ...categorization.blog,
      ...categorization.tools,
      ...categorization.landing,
      ...categorization.shared,
    ];

    // Check that all files are categorized
    if (allCategorized.length !== originalFiles.length) {
      return false;
    }

    // Check that no file appears in multiple categories
    const paths = new Set<string>();
    for (const file of allCategorized) {
      if (paths.has(file.path)) {
        return false;
      }
      paths.add(file.path);
    }

    return true;
  }
}
