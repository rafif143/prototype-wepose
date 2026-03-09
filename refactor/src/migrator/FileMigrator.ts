/**
 * File Migrator - Moves files to their new locations
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import type {
  FileCategorization,
  FileNode,
  MigrationResult,
  ExtractionResult,
  RelocationResult,
} from '../types/index.js';

/**
 * Moves files to their new locations while preserving git history
 */
export class FileMigrator {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Moves a single file using git mv to preserve history
   * @param from Source file path (relative to project root)
   * @param to Destination file path (relative to project root)
   * @returns Success status
   */
  private moveFileWithGit(from: string, to: string): { success: boolean; error?: string } {
    try {
      const fromAbs = path.resolve(this.projectRoot, from);
      const toAbs = path.resolve(this.projectRoot, to);

      // Check if source file exists
      if (!fs.existsSync(fromAbs)) {
        return { success: false, error: `Source file does not exist: ${from}` };
      }

      // Create destination directory if it doesn't exist
      const toDir = path.dirname(toAbs);
      if (!fs.existsSync(toDir)) {
        fs.mkdirSync(toDir, { recursive: true });
      }

      // Check if destination file already exists
      if (fs.existsSync(toAbs)) {
        return { success: false, error: `Destination file already exists: ${to}` };
      }

      // Use git mv to preserve history
      execSync(`git mv "${from}" "${to}"`, {
        cwd: this.projectRoot,
        stdio: 'pipe',
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Resolves duplicate folders by merging their contents
   * @param duplicates Array of duplicate folder paths
   * @param targetFolder Target folder to merge into
   * @returns Migration result
   */
  resolveDuplicates(
    duplicates: string[],
    targetFolder: string
  ): MigrationResult {
    const result: MigrationResult = {
      movedFiles: [],
      errors: [],
      warnings: [],
    };

    for (const duplicateFolder of duplicates) {
      const duplicatePath = path.resolve(this.projectRoot, duplicateFolder);
      
      if (!fs.existsSync(duplicatePath)) {
        result.warnings.push({
          file: duplicateFolder,
          warning: 'Folder does not exist, skipping',
        });
        continue;
      }

      // Get all files in the duplicate folder
      const files = this.getAllFilesRecursive(duplicatePath);

      for (const file of files) {
        const relativePath = path.relative(duplicatePath, file);
        const targetPath = path.join(targetFolder, relativePath);
        const sourceRelative = path.relative(this.projectRoot, file);
        const targetRelative = path.relative(this.projectRoot, path.resolve(this.projectRoot, targetPath));

        const moveResult = this.moveFileWithGit(sourceRelative, targetRelative);

        if (moveResult.success) {
          result.movedFiles.push({
            from: sourceRelative,
            to: targetRelative,
          });
        } else {
          result.errors.push({
            file: sourceRelative,
            error: moveResult.error || 'Unknown error',
          });
        }
      }
    }

    return result;
  }

  /**
   * Standardizes file naming conventions
   * @param files Array of files to rename
   * @returns Migration result
   */
  standardizeNaming(files: Array<{ from: string; to: string }>): MigrationResult {
    const result: MigrationResult = {
      movedFiles: [],
      errors: [],
      warnings: [],
    };

    for (const { from, to } of files) {
      const moveResult = this.moveFileWithGit(from, to);

      if (moveResult.success) {
        result.movedFiles.push({ from, to });
      } else {
        result.errors.push({
          file: from,
          error: moveResult.error || 'Unknown error',
        });
      }
    }

    return result;
  }

  /**
   * Gets all files recursively from a directory
   */
  private getAllFilesRecursive(dir: string): string[] {
    const files: string[] = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...this.getAllFilesRecursive(fullPath));
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Migrates feature-specific files to feature directories
   */
  migrateFeatureFiles(categorization: FileCategorization): MigrationResult {
    const result: MigrationResult = {
      movedFiles: [],
      errors: [],
      warnings: [],
    };

    // Define feature mappings
    const featureMappings: Array<{
      feature: keyof FileCategorization;
      targetBase: string;
    }> = [
      { feature: 'visa', targetBase: 'features/visa' },
      { feature: 'blog', targetBase: 'features/blog' },
      { feature: 'tools', targetBase: 'features/tools' },
      { feature: 'landing', targetBase: 'features/landing' },
    ];

    for (const { feature, targetBase } of featureMappings) {
      const files = categorization[feature];

      for (const file of files) {
        // Determine target subdirectory based on file type
        let targetSubdir = '';
        switch (file.type) {
          case 'component':
            targetSubdir = 'components';
            break;
          case 'hook':
            targetSubdir = 'hooks';
            break;
          case 'util':
            targetSubdir = 'utils';
            break;
          case 'type':
            targetSubdir = 'types';
            break;
          case 'lib':
            targetSubdir = 'lib';
            break;
        }

        // Extract filename from path
        const filename = path.basename(file.path);
        const targetPath = path.join(targetBase, targetSubdir, filename);

        const moveResult = this.moveFileWithGit(file.path, targetPath);

        if (moveResult.success) {
          result.movedFiles.push({
            from: file.path,
            to: targetPath,
          });
        } else {
          result.errors.push({
            file: file.path,
            error: moveResult.error || 'Unknown error',
          });
        }
      }
    }

    return result;
  }

  /**
   * Migrates shared files to shared directory
   */
  migrateSharedFiles(files: FileNode[]): MigrationResult {
    const result: MigrationResult = {
      movedFiles: [],
      errors: [],
      warnings: [],
    };

    for (const file of files) {
      // Determine target subdirectory based on file type
      let targetSubdir = '';
      switch (file.type) {
        case 'component':
          // Check if it's a UI component or layout component
          if (file.path.includes('/ui/')) {
            targetSubdir = 'ui';
          } else if (file.path.includes('/layout/')) {
            targetSubdir = 'layout';
          } else {
            targetSubdir = 'ui'; // Default to ui
          }
          break;
        case 'hook':
          targetSubdir = 'hooks';
          break;
        case 'util':
          targetSubdir = 'utils';
          break;
        case 'type':
          targetSubdir = 'types';
          break;
        case 'lib':
          targetSubdir = 'lib';
          break;
      }

      // Extract filename from path
      const filename = path.basename(file.path);
      const targetPath = path.join('shared', targetSubdir, filename);

      const moveResult = this.moveFileWithGit(file.path, targetPath);

      if (moveResult.success) {
        result.movedFiles.push({
          from: file.path,
          to: targetPath,
        });
      } else {
        result.errors.push({
          file: file.path,
          error: moveResult.error || 'Unknown error',
        });
      }
    }

    return result;
  }

  /**
   * Extracts business logic from components
   */
  extractBusinessLogic(component: FileNode): ExtractionResult {
    // TODO: Implement in task 8.1
    throw new Error('Not implemented');
  }

  /**
   * Relocates hardcoded data from components
   */
  relocateHardcodedData(component: FileNode): RelocationResult {
    // TODO: Implement in task 8.4
    throw new Error('Not implemented');
  }
}
