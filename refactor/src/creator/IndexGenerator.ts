/**
 * Index Generator - Generates index.ts files for public APIs
 */

import * as fs from 'fs';
import * as path from 'path';
import type { FileNode, MigrationConfig } from '../types/index.js';

/**
 * Generates index.ts files for feature modules and shared modules
 */
export class IndexGenerator {
  private projectRoot: string;
  private config: MigrationConfig;

  constructor(projectRoot: string, config: MigrationConfig) {
    this.projectRoot = projectRoot;
    this.config = config;
  }

  /**
   * Generates all index.ts files for the new structure
   */
  generateAllIndexFiles(categorization: {
    visa: FileNode[];
    blog: FileNode[];
    tools: FileNode[];
    landing: FileNode[];
    shared: FileNode[];
  }): void {
    // Generate index files for each feature module
    this.generateFeatureIndexFiles(categorization);

    // Generate index files for shared modules
    this.generateSharedIndexFiles(categorization.shared);
  }

  /**
   * Generates index.ts files for all feature modules
   */
  private generateFeatureIndexFiles(categorization: {
    visa: FileNode[];
    blog: FileNode[];
    tools: FileNode[];
    landing: FileNode[];
  }): void {
    const features: Array<keyof typeof categorization> = ['visa', 'blog', 'tools', 'landing'];

    for (const featureName of features) {
      const files = categorization[featureName];
      this.generateFeatureIndex(featureName, files);
    }
  }

  /**
   * Generates index.ts file for a single feature module
   */
  private generateFeatureIndex(featureName: string, files: FileNode[]): void {
    const featureDir = path.join(this.projectRoot, 'features', featureName);
    const indexPath = path.join(featureDir, 'index.ts');

    // Group files by subdirectory
    const grouped = this.groupFilesBySubdirectory(files);

    // Generate exports for each subdirectory
    const exports: string[] = [];

    // Add header comment
    exports.push(`/**`);
    exports.push(` * Public API for ${featureName} feature module`);
    exports.push(` */`);
    exports.push('');

    // Export from each subdirectory
    for (const [subdir, subdirFiles] of Object.entries(grouped)) {
      if (subdirFiles.length > 0) {
        exports.push(`// ${subdir.charAt(0).toUpperCase() + subdir.slice(1)}`);
        for (const file of subdirFiles) {
          const exportStatements = this.generateExportStatements(file, subdir);
          exports.push(...exportStatements);
        }
        exports.push('');
      }
    }

    // Write index file
    const content = exports.join('\n');
    fs.writeFileSync(indexPath, content, 'utf-8');
  }

  /**
   * Generates index.ts files for shared modules
   */
  private generateSharedIndexFiles(sharedFiles: FileNode[]): void {
    const sharedDir = path.join(this.projectRoot, 'shared');

    // Group files by their actual path in shared directory
    const grouped = this.groupSharedFilesByPath(sharedFiles);

    // Generate index file for each shared subdirectory
    for (const [subdir, subdirFiles] of Object.entries(grouped)) {
      if (subdirFiles.length > 0) {
        this.generateSharedSubdirIndex(subdir, subdirFiles);
      }
    }
  }

  /**
   * Groups shared files by their actual subdirectory path
   */
  private groupSharedFilesByPath(files: FileNode[]): Record<string, FileNode[]> {
    const grouped: Record<string, FileNode[]> = {
      ui: [],
      layout: [],
      hooks: [],
      utils: [],
      types: [],
      lib: [],
    };

    for (const file of files) {
      // Extract subdirectory from path (e.g., shared/ui/Button.tsx -> ui)
      const pathParts = file.path.split('/');
      const sharedIndex = pathParts.indexOf('shared');
      if (sharedIndex >= 0 && sharedIndex < pathParts.length - 1) {
        const subdir = pathParts[sharedIndex + 1];
        if (grouped[subdir]) {
          grouped[subdir].push(file);
        }
      }
    }

    return grouped;
  }

  /**
   * Generates index.ts file for a shared subdirectory
   */
  private generateSharedSubdirIndex(subdir: string, files: FileNode[]): void {
    const subdirPath = path.join(this.projectRoot, 'shared', subdir);
    const indexPath = path.join(subdirPath, 'index.ts');

    const exports: string[] = [];

    // Add header comment
    exports.push(`/**`);
    exports.push(` * Public API for shared ${subdir}`);
    exports.push(` */`);
    exports.push('');

    // Generate exports
    for (const file of files) {
      const exportStatements = this.generateExportStatements(file, subdir);
      exports.push(...exportStatements);
    }

    // Write index file
    const content = exports.join('\n');
    fs.writeFileSync(indexPath, content, 'utf-8');
  }

  /**
   * Groups files by their subdirectory (components, hooks, lib, etc.)
   */
  private groupFilesBySubdirectory(files: FileNode[]): Record<string, FileNode[]> {
    const grouped: Record<string, FileNode[]> = {
      components: [],
      hooks: [],
      lib: [],
      types: [],
      utils: [],
    };

    for (const file of files) {
      // Determine subdirectory based on file type
      const subdir = this.getSubdirectoryForFile(file);
      if (subdir && grouped[subdir]) {
        grouped[subdir].push(file);
      }
    }

    return grouped;
  }

  /**
   * Determines which subdirectory a file belongs to
   */
  private getSubdirectoryForFile(file: FileNode): string | null {
    if (file.type === 'component') return 'components';
    if (file.type === 'hook') return 'hooks';
    if (file.type === 'lib') return 'lib';
    if (file.type === 'type') return 'types';
    if (file.type === 'util') return 'utils';
    return null;
  }

  /**
   * Generates export statements for a file
   */
  private generateExportStatements(file: FileNode, subdir: string): string[] {
    const statements: string[] = [];

    // Skip private files (starting with _ or in internal directories)
    if (this.isPrivateFile(file)) {
      return statements;
    }

    // Get file name without extension
    const fileName = path.basename(file.path, path.extname(file.path));
    
    // For shared files, extract the relative path from the subdirectory
    let relativePath: string;
    if (file.path.includes('shared/')) {
      // Extract path after shared/subdir/
      const pathParts = file.path.split('/');
      const subdirIndex = pathParts.indexOf(subdir);
      if (subdirIndex >= 0) {
        const filePathParts = pathParts.slice(subdirIndex + 1);
        const filePathWithoutExt = filePathParts.join('/').replace(/\.[^/.]+$/, '');
        relativePath = `./${filePathWithoutExt}.js`;
      } else {
        relativePath = `./${fileName}.js`;
      }
    } else {
      // For feature files
      relativePath = `./${subdir}/${fileName}.js`;
    }

    // Add JSDoc comment
    statements.push(`/** ${this.generateJSDocComment(file)} */`);

    // Generate export statement
    if (file.exports.length > 0) {
      // Export specific named exports
      const exportNames = file.exports.filter(exp => !exp.startsWith('_'));
      if (exportNames.length > 0) {
        statements.push(`export { ${exportNames.join(', ')} } from '${relativePath}';`);
      }
    } else {
      // Export everything
      statements.push(`export * from '${relativePath}';`);
    }

    return statements;
  }

  /**
   * Checks if a file is private (should not be exported)
   */
  private isPrivateFile(file: FileNode): boolean {
    const fileName = path.basename(file.path);
    
    // Files starting with underscore are private
    if (fileName.startsWith('_')) {
      return true;
    }

    // Files in 'internal' directories are private
    if (file.path.includes('/internal/') || file.path.includes('\\internal\\')) {
      return true;
    }

    return false;
  }

  /**
   * Generates a JSDoc comment for a file
   */
  private generateJSDocComment(file: FileNode): string {
    const fileName = path.basename(file.path, path.extname(file.path));
    
    // Generate description based on file type
    switch (file.type) {
      case 'component':
        return `${fileName} component`;
      case 'hook':
        return `${fileName} hook`;
      case 'util':
        return `${fileName} utility`;
      case 'type':
        return `${fileName} types`;
      case 'lib':
        return `${fileName} library`;
      default:
        return fileName;
    }
  }

  /**
   * Verifies that all required index files were created
   */
  verifyIndexFiles(): { success: boolean; missing: string[] } {
    const missing: string[] = [];

    // Check feature module index files
    for (const feature of this.config.features) {
      const indexPath = path.join(this.projectRoot, 'features', feature.name, 'index.ts');
      if (!fs.existsSync(indexPath)) {
        missing.push(`features/${feature.name}/index.ts`);
      }
    }

    // Check shared subdirectory index files
    const sharedSubdirs = ['ui', 'layout', 'hooks', 'utils', 'types', 'lib'];
    for (const subdir of sharedSubdirs) {
      const indexPath = path.join(this.projectRoot, 'shared', subdir, 'index.ts');
      // Only check if the directory exists (it might be empty)
      const subdirPath = path.join(this.projectRoot, 'shared', subdir);
      if (fs.existsSync(subdirPath) && !fs.existsSync(indexPath)) {
        missing.push(`shared/${subdir}/index.ts`);
      }
    }

    return {
      success: missing.length === 0,
      missing,
    };
  }
}
