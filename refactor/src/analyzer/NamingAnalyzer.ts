/**
 * Naming Analyzer
 * 
 * Analyzes naming conventions in files and directories.
 * Detects kebab-case, PascalCase, camelCase patterns and identifies inconsistencies.
 */

import * as path from 'path';
import type { FileNode } from '../types/index.js';

export type NamingConvention = 'kebab-case' | 'PascalCase' | 'camelCase' | 'snake_case' | 'SCREAMING_SNAKE_CASE' | 'mixed' | 'unknown';

export interface NamingAnalysis {
  file: string;
  fileName: string;
  directory: string;
  fileConvention: NamingConvention;
  directoryConvention: NamingConvention;
  expectedFileConvention: NamingConvention;
  expectedDirectoryConvention: NamingConvention;
  isConsistent: boolean;
  suggestions: string[];
}

export class NamingAnalyzer {
  /**
   * Analyze naming conventions for all files
   * @param files - Array of FileNode objects
   * @returns Array of NamingAnalysis results
   */
  analyzeNaming(files: FileNode[]): NamingAnalysis[] {
    return files.map(file => this.analyzeFile(file));
  }

  /**
   * Analyze naming convention for a single file
   */
  private analyzeFile(file: FileNode): NamingAnalysis {
    const fileName = path.basename(file.path, path.extname(file.path));
    const directory = path.dirname(file.path);
    const dirName = path.basename(directory);

    const fileConvention = this.detectConvention(fileName);
    const directoryConvention = this.detectConvention(dirName);

    const expectedFileConvention = this.getExpectedFileConvention(file);
    const expectedDirectoryConvention: NamingConvention = 'kebab-case';

    const isConsistent = 
      fileConvention === expectedFileConvention &&
      directoryConvention === expectedDirectoryConvention;

    const suggestions = this.generateSuggestions(
      file,
      fileName,
      dirName,
      fileConvention,
      directoryConvention,
      expectedFileConvention,
      expectedDirectoryConvention
    );

    return {
      file: file.path,
      fileName,
      directory,
      fileConvention,
      directoryConvention,
      expectedFileConvention,
      expectedDirectoryConvention,
      isConsistent,
      suggestions,
    };
  }

  /**
   * Detect the naming convention of a string
   */
  detectConvention(name: string): NamingConvention {
    if (!name || name.length === 0) {
      return 'unknown';
    }

    // Check for kebab-case (lowercase with hyphens)
    if (/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
      return 'kebab-case';
    }

    // Check for PascalCase (starts with uppercase, no separators)
    if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      return 'PascalCase';
    }

    // Check for camelCase (starts with lowercase, no separators)
    if (/^[a-z][a-zA-Z0-9]*$/.test(name)) {
      return 'camelCase';
    }

    // Check for snake_case (lowercase with underscores)
    if (/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(name)) {
      return 'snake_case';
    }

    // Check for SCREAMING_SNAKE_CASE (uppercase with underscores)
    if (/^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/.test(name)) {
      return 'SCREAMING_SNAKE_CASE';
    }

    // Mixed or unknown
    if (/[A-Z]/.test(name) && /[a-z]/.test(name) && /[-_]/.test(name)) {
      return 'mixed';
    }

    return 'unknown';
  }

  /**
   * Get the expected naming convention for a file based on its type
   */
  private getExpectedFileConvention(file: FileNode): NamingConvention {
    const fileName = path.basename(file.path);

    // React components should be PascalCase
    if (file.type === 'component' || fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
      return 'PascalCase';
    }

    // Hooks should be camelCase (useXxx pattern)
    if (file.type === 'hook' || fileName.startsWith('use')) {
      return 'camelCase';
    }

    // Utilities should be camelCase
    if (file.type === 'util') {
      return 'camelCase';
    }

    // Types can be PascalCase
    if (file.type === 'type') {
      return 'PascalCase';
    }

    // Lib files can be camelCase or kebab-case
    if (file.type === 'lib') {
      return 'camelCase';
    }

    return 'camelCase';
  }

  /**
   * Generate suggestions for fixing naming inconsistencies
   */
  private generateSuggestions(
    file: FileNode,
    fileName: string,
    dirName: string,
    fileConvention: NamingConvention,
    directoryConvention: NamingConvention,
    expectedFileConvention: NamingConvention,
    expectedDirectoryConvention: NamingConvention
  ): string[] {
    const suggestions: string[] = [];

    // File name suggestions
    if (fileConvention !== expectedFileConvention) {
      const suggestedName = this.convertToConvention(fileName, expectedFileConvention);
      const ext = path.extname(file.path);
      suggestions.push(`Rename file to: ${suggestedName}${ext}`);
    }

    // Directory name suggestions
    if (directoryConvention !== expectedDirectoryConvention && dirName !== '.' && dirName !== '') {
      const suggestedDir = this.convertToConvention(dirName, expectedDirectoryConvention);
      suggestions.push(`Rename directory to: ${suggestedDir}`);
    }

    return suggestions;
  }

  /**
   * Convert a string to a specific naming convention
   */
  convertToConvention(name: string, convention: NamingConvention): string {
    // First, split the name into words
    const words = this.splitIntoWords(name);

    switch (convention) {
      case 'kebab-case':
        return words.map(w => w.toLowerCase()).join('-');
      
      case 'PascalCase':
        return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
      
      case 'camelCase':
        return words.map((w, i) => 
          i === 0 
            ? w.toLowerCase() 
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        ).join('');
      
      case 'snake_case':
        return words.map(w => w.toLowerCase()).join('_');
      
      case 'SCREAMING_SNAKE_CASE':
        return words.map(w => w.toUpperCase()).join('_');
      
      default:
        return name;
    }
  }

  /**
   * Split a string into words based on various separators and case changes
   */
  private splitIntoWords(name: string): string[] {
    // Handle kebab-case and snake_case
    let words = name.split(/[-_]/);
    
    // Handle camelCase and PascalCase
    const result: string[] = [];
    for (const word of words) {
      // Split on uppercase letters
      const parts = word.split(/(?=[A-Z])/);
      result.push(...parts.filter(p => p.length > 0));
    }

    return result.filter(w => w.length > 0);
  }

  /**
   * Get statistics about naming conventions in the codebase
   */
  getStatistics(analyses: NamingAnalysis[]): {
    total: number;
    consistent: number;
    inconsistent: number;
    byFileConvention: Record<string, number>;
    byDirectoryConvention: Record<string, number>;
  } {
    const stats = {
      total: analyses.length,
      consistent: analyses.filter(a => a.isConsistent).length,
      inconsistent: analyses.filter(a => !a.isConsistent).length,
      byFileConvention: {} as Record<string, number>,
      byDirectoryConvention: {} as Record<string, number>,
    };

    for (const analysis of analyses) {
      stats.byFileConvention[analysis.fileConvention] = 
        (stats.byFileConvention[analysis.fileConvention] || 0) + 1;
      
      stats.byDirectoryConvention[analysis.directoryConvention] = 
        (stats.byDirectoryConvention[analysis.directoryConvention] || 0) + 1;
    }

    return stats;
  }

  /**
   * Get all files with naming inconsistencies
   */
  getInconsistentFiles(analyses: NamingAnalysis[]): NamingAnalysis[] {
    return analyses.filter(a => !a.isConsistent);
  }
}
