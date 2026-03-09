/**
 * Duplicate Detector
 * 
 * Identifies duplicate folders and similar files that should be consolidated.
 * Detects patterns like section/sections, visa/visa-detail.
 */

import * as path from 'path';
import * as fs from 'fs';
import type { FileNode, DuplicateGroup } from '../types/index.js';

export class DuplicateDetector {
  private projectRoot: string;
  private similarityThreshold: number;

  constructor(projectRoot: string = process.cwd(), similarityThreshold: number = 0.8) {
    this.projectRoot = projectRoot;
    this.similarityThreshold = similarityThreshold;
  }

  /**
   * Detect duplicate folders and similar files
   * @param files - Array of FileNode objects
   * @returns Array of DuplicateGroup objects
   */
  detectDuplicates(files: FileNode[]): DuplicateGroup[] {
    const duplicateGroups: DuplicateGroup[] = [];

    // Detect duplicate folders
    const folderDuplicates = this.detectDuplicateFolders(files);
    duplicateGroups.push(...folderDuplicates);

    // Detect similar files within the same logical group
    const fileDuplicates = this.detectSimilarFiles(files);
    duplicateGroups.push(...fileDuplicates);

    return duplicateGroups;
  }

  /**
   * Detect folders with similar names (e.g., section/sections, visa/visa-detail)
   */
  private detectDuplicateFolders(files: FileNode[]): DuplicateGroup[] {
    const duplicateGroups: DuplicateGroup[] = [];
    
    // Extract unique folder paths
    const folders = new Set<string>();
    for (const file of files) {
      const dir = path.dirname(file.path);
      const parts = dir.split(path.sep);
      
      // Add each folder level
      for (let i = 0; i < parts.length; i++) {
        const folderPath = parts.slice(0, i + 1).join(path.sep);
        if (folderPath) {
          folders.add(folderPath);
        }
      }
    }

    const folderArray = Array.from(folders);
    const processed = new Set<string>();

    // Compare folders for similarity
    for (let i = 0; i < folderArray.length; i++) {
      if (processed.has(folderArray[i])) continue;

      const similarFolders: string[] = [folderArray[i]];
      
      for (let j = i + 1; j < folderArray.length; j++) {
        if (processed.has(folderArray[j])) continue;

        if (this.areFoldersSimilar(folderArray[i], folderArray[j])) {
          similarFolders.push(folderArray[j]);
          processed.add(folderArray[j]);
        }
      }

      if (similarFolders.length > 1) {
        processed.add(folderArray[i]);
        
        // Get all files in these folders
        const filesInFolders = files.filter(file => 
          similarFolders.some(folder => 
            file.path.startsWith(folder + path.sep) || 
            path.dirname(file.path) === folder
          )
        );

        duplicateGroups.push({
          files: filesInFolders,
          similarity: 0.9, // High similarity for folder name matches
          recommendedAction: 'merge',
        });
      }
    }

    return duplicateGroups;
  }

  /**
   * Check if two folder names are similar
   */
  private areFoldersSimilar(folder1: string, folder2: string): boolean {
    const name1 = path.basename(folder1).toLowerCase();
    const name2 = path.basename(folder2).toLowerCase();

    // Check for plural/singular variations
    if (name1 === name2 + 's' || name2 === name1 + 's') {
      return true;
    }

    // Check for common variations
    const variations = [
      ['section', 'sections'],
      ['visa', 'visa-detail'],
      ['visa', 'visas'],
      ['component', 'components'],
      ['util', 'utils'],
      ['helper', 'helpers'],
    ];

    for (const [var1, var2] of variations) {
      if ((name1 === var1 && name2 === var2) || (name1 === var2 && name2 === var1)) {
        return true;
      }
    }

    // Check for hyphenated variations (e.g., visa and visa-detail)
    if (name1.startsWith(name2 + '-') || name2.startsWith(name1 + '-')) {
      return true;
    }

    // Check Levenshtein distance for other similarities
    const distance = this.levenshteinDistance(name1, name2);
    const maxLength = Math.max(name1.length, name2.length);
    const similarity = 1 - distance / maxLength;

    return similarity >= 0.8;
  }

  /**
   * Detect similar files that might be duplicates
   */
  private detectSimilarFiles(files: FileNode[]): DuplicateGroup[] {
    const duplicateGroups: DuplicateGroup[] = [];
    const processed = new Set<string>();

    for (let i = 0; i < files.length; i++) {
      if (processed.has(files[i].path)) continue;

      const similarFiles: FileNode[] = [files[i]];
      
      for (let j = i + 1; j < files.length; j++) {
        if (processed.has(files[j].path)) continue;

        const similarity = this.calculateFileSimilarity(files[i], files[j]);
        
        if (similarity >= this.similarityThreshold) {
          similarFiles.push(files[j]);
          processed.add(files[j].path);
        }
      }

      if (similarFiles.length > 1) {
        processed.add(files[i].path);
        
        const avgSimilarity = this.similarityThreshold;
        const action = this.determineRecommendedAction(similarFiles);

        duplicateGroups.push({
          files: similarFiles,
          similarity: avgSimilarity,
          recommendedAction: action,
        });
      }
    }

    return duplicateGroups;
  }

  /**
   * Calculate similarity between two files
   */
  private calculateFileSimilarity(file1: FileNode, file2: FileNode): number {
    const name1 = path.basename(file1.path, path.extname(file1.path)).toLowerCase();
    const name2 = path.basename(file2.path, path.extname(file2.path)).toLowerCase();

    // If names are identical, check content similarity
    if (name1 === name2) {
      return this.calculateContentSimilarity(file1, file2);
    }

    // Calculate name similarity
    const nameDistance = this.levenshteinDistance(name1, name2);
    const maxLength = Math.max(name1.length, name2.length);
    const nameSimilarity = 1 - nameDistance / maxLength;

    // If names are very different, not duplicates
    if (nameSimilarity < 0.7) {
      return 0;
    }

    // Check content similarity for similar names
    const contentSimilarity = this.calculateContentSimilarity(file1, file2);
    
    // Weighted average: 40% name, 60% content
    return nameSimilarity * 0.4 + contentSimilarity * 0.6;
  }

  /**
   * Calculate content similarity between two files
   */
  private calculateContentSimilarity(file1: FileNode, file2: FileNode): number {
    try {
      const content1 = fs.readFileSync(path.join(this.projectRoot, file1.path), 'utf-8');
      const content2 = fs.readFileSync(path.join(this.projectRoot, file2.path), 'utf-8');

      // Normalize content (remove whitespace, comments)
      const normalized1 = this.normalizeContent(content1);
      const normalized2 = this.normalizeContent(content2);

      // If contents are identical, return 1
      if (normalized1 === normalized2) {
        return 1;
      }

      // Calculate similarity based on common lines
      const lines1 = normalized1.split('\n').filter(line => line.trim());
      const lines2 = normalized2.split('\n').filter(line => line.trim());

      const commonLines = lines1.filter(line => lines2.includes(line)).length;
      const totalLines = Math.max(lines1.length, lines2.length);

      return totalLines > 0 ? commonLines / totalLines : 0;
    } catch (error) {
      // If we can't read files, assume low similarity
      return 0;
    }
  }

  /**
   * Normalize file content for comparison
   */
  private normalizeContent(content: string): string {
    return content
      // Remove single-line comments
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Determine the recommended action for a group of duplicates
   */
  private determineRecommendedAction(files: FileNode[]): DuplicateGroup['recommendedAction'] {
    // If files have identical names but different paths, likely should merge
    const names = files.map(f => path.basename(f.path));
    const uniqueNames = new Set(names);
    
    if (uniqueNames.size === 1) {
      return 'merge';
    }

    // If files have very similar names, might need renaming
    if (uniqueNames.size === files.length) {
      return 'rename';
    }

    // Mixed case, keep both but review
    return 'keep-both';
  }
}
