/**
 * Import Updater - Updates import paths after migration
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@typescript-eslint/parser';
import type {
  FileNode,
  ImportAnalysis,
  PathTransformation,
  UpdateResult,
  MigrationResult,
} from '../types/index.js';

/**
 * Updates all import paths to reflect new file locations
 */
export class ImportUpdater {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Analyzes imports in a file
   * Task 7.1: Implement import analyzer
   */
  analyzeImports(file: FileNode): ImportAnalysis {
    const filePath = path.join(this.projectRoot, file.path);
    
    if (!fs.existsSync(filePath)) {
      return {
        file: file.path,
        imports: [],
      };
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const imports: ImportAnalysis['imports'] = [];

    try {
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        filePath,
      });

      // Traverse AST to find import declarations
      const traverse = (node: any) => {
        // Static imports: import { foo } from './bar'
        if (node.type === 'ImportDeclaration' && node.source?.value) {
          const source = node.source.value;
          const specifiers: string[] = [];

          // Extract imported identifiers
          if (node.specifiers) {
            node.specifiers.forEach((spec: any) => {
              if (spec.type === 'ImportDefaultSpecifier') {
                specifiers.push('default');
              } else if (spec.type === 'ImportNamespaceSpecifier') {
                specifiers.push('*');
              } else if (spec.type === 'ImportSpecifier' && spec.imported?.name) {
                specifiers.push(spec.imported.name);
              }
            });
          }

          imports.push({
            source,
            specifiers,
            isRelative: this.isRelativeImport(source),
            isExternal: this.isExternalImport(source),
          });
        }

        // Dynamic imports: import('./bar')
        if (node.type === 'ImportExpression' && node.source?.value) {
          const source = node.source.value;
          imports.push({
            source,
            specifiers: [],
            isRelative: this.isRelativeImport(source),
            isExternal: this.isExternalImport(source),
          });
        }

        // Require calls: require('./bar')
        if (
          node.type === 'CallExpression' &&
          node.callee?.name === 'require' &&
          node.arguments?.[0]?.value
        ) {
          const source = node.arguments[0].value;
          imports.push({
            source,
            specifiers: [],
            isRelative: this.isRelativeImport(source),
            isExternal: this.isExternalImport(source),
          });
        }

        // Recursively traverse child nodes
        for (const key in node) {
          if (node[key] && typeof node[key] === 'object') {
            if (Array.isArray(node[key])) {
              node[key].forEach((child: any) => {
                if (child && typeof child === 'object') {
                  traverse(child);
                }
              });
            } else {
              traverse(node[key]);
            }
          }
        }
      };

      traverse(ast);
    } catch (error) {
      // If parsing fails, fall back to regex
      const importRegex = /(?:import|require)\s*\(?['"]([^'"]+)['"]\)?/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const source = match[1];
        imports.push({
          source,
          specifiers: [],
          isRelative: this.isRelativeImport(source),
          isExternal: this.isExternalImport(source),
        });
      }
    }

    return {
      file: file.path,
      imports,
    };
  }

  /**
   * Check if an import is relative (starts with . or ..)
   */
  private isRelativeImport(source: string): boolean {
    return source.startsWith('./') || source.startsWith('../');
  }

  /**
   * Check if an import is external (from node_modules)
   */
  private isExternalImport(source: string): boolean {
    // External imports don't start with . or / and aren't path aliases
    return !source.startsWith('.') && !source.startsWith('/') && !source.startsWith('@/');
  }

  /**
   * Transforms import paths for a file
   * Task 7.2: Implement path transformer
   */
  transformPaths(analysis: ImportAnalysis, newLocation: string): PathTransformation {
    const transformations: PathTransformation['transformations'] = [];

    for (const imp of analysis.imports) {
      // Skip external imports - they don't need transformation
      if (imp.isExternal) {
        continue;
      }

      const oldImport = imp.source;
      let newImport = oldImport;
      let reason = '';

      // Apply transformation rules based on import patterns
      const transformed = this.applyTransformationRules(oldImport, newLocation);
      if (transformed.newPath !== oldImport) {
        newImport = transformed.newPath;
        reason = transformed.reason;
      }

      // Only add to transformations if the path actually changed
      if (newImport !== oldImport) {
        transformations.push({
          oldImport,
          newImport,
          reason,
        });
      }
    }

    return {
      file: analysis.file,
      transformations,
    };
  }

  /**
   * Apply transformation rules to convert old import paths to new paths
   */
  private applyTransformationRules(
    importPath: string,
    currentFileLocation: string
  ): { newPath: string; reason: string } {
    // Transformation rules based on the design document
    const rules = [
      // Feature imports - visa
      {
        pattern: /^@\/components\/visa(-detail)?\//,
        replacement: '@/features/visa/components/',
        reason: 'Moved to feature-based structure',
      },
      {
        pattern: /^@\/hooks\/(useQuizState|useSponsorLetterState)/,
        replacement: '@/features/visa/hooks/$1',
        reason: 'Moved visa-specific hook to feature',
      },
      {
        pattern: /^@\/lib\/visa-data/,
        replacement: '@/features/visa/lib/data',
        reason: 'Moved visa data to feature',
      },
      
      // Feature imports - blog
      {
        pattern: /^@\/components\/blog\//,
        replacement: '@/features/blog/components/',
        reason: 'Moved to feature-based structure',
      },
      
      // Feature imports - tools
      {
        pattern: /^@\/components\/tools\//,
        replacement: '@/features/tools/components/',
        reason: 'Moved to feature-based structure',
      },
      {
        pattern: /^@\/hooks\/useCompareState/,
        replacement: '@/features/tools/hooks/useCompareState',
        reason: 'Moved tools-specific hook to feature',
      },
      {
        pattern: /^@\/lib\/tools\//,
        replacement: '@/features/tools/lib/',
        reason: 'Moved tools lib to feature',
      },
      
      // Feature imports - landing (sections)
      {
        pattern: /^@\/components\/sections?\//,
        replacement: '@/features/landing/components/',
        reason: 'Moved to feature-based structure',
      },
      
      // Shared imports - UI
      {
        pattern: /^@\/components\/ui\//,
        replacement: '@/shared/ui/',
        reason: 'Moved to shared UI',
      },
      
      // Shared imports - Layout
      {
        pattern: /^@\/components\/layout\//,
        replacement: '@/shared/layout/',
        reason: 'Moved to shared layout',
      },
      
      // Shared imports - Hooks
      {
        pattern: /^@\/hooks\/(useDebounce|useReducedMotion|useAnimationConfig)/,
        replacement: '@/shared/hooks/$1',
        reason: 'Moved to shared hooks',
      },
      {
        pattern: /^@\/utils\/useAnimationConfig/,
        replacement: '@/shared/hooks/useAnimationConfig',
        reason: 'Moved animation hook to shared',
      },
      
      // Shared imports - Utils
      {
        pattern: /^@\/lib\/utils$/,
        replacement: '@/shared/utils',
        reason: 'Moved to shared utils',
      },
      {
        pattern: /^@\/utils\//,
        replacement: '@/shared/utils/',
        reason: 'Moved to shared utils',
      },
    ];

    // Try each rule
    for (const rule of rules) {
      if (rule.pattern.test(importPath)) {
        const newPath = importPath.replace(rule.pattern, rule.replacement);
        return { newPath, reason: rule.reason };
      }
    }

    // If it's a relative import, we need to recalculate the path
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      // For relative imports, we would need to know both the old and new locations
      // This is handled in updateAllImports where we have the full migration context
      return { newPath: importPath, reason: 'Relative import - needs context' };
    }

    // No transformation needed
    return { newPath: importPath, reason: 'No transformation needed' };
  }

  /**
   * Calculate relative path between two files
   */
  private calculateRelativePath(fromFile: string, toFile: string): string {
    const fromDir = path.dirname(fromFile);
    let relativePath = path.relative(fromDir, toFile);
    
    // Ensure it starts with ./ or ../
    if (!relativePath.startsWith('.')) {
      relativePath = './' + relativePath;
    }
    
    // Remove file extension for imports
    relativePath = relativePath.replace(/\.(ts|tsx|js|jsx)$/, '');
    
    // Normalize path separators for cross-platform compatibility
    return relativePath.split(path.sep).join('/');
  }

  /**
   * Generates public API index.ts file
   * Note: This is implemented in IndexGenerator (task 4.3)
   */
  generatePublicAPI(module: string, files: FileNode[]): string {
    // This functionality is handled by IndexGenerator in the creator module
    throw new Error('Use IndexGenerator.generateIndexFile() instead');
  }

  /**
   * Updates all imports across the codebase
   * Task 7.7: Implement import updater execution
   */
  updateAllImports(migrations: MigrationResult): UpdateResult {
    const result: UpdateResult = {
      updatedFiles: [],
      errors: [],
    };

    // Build a map of old paths to new paths
    const pathMap = new Map<string, string>();
    for (const move of migrations.movedFiles) {
      pathMap.set(move.from, move.to);
    }

    // Get all files in the project (both moved and unmoved)
    const allFiles = this.getAllProjectFiles();

    for (const filePath of allFiles) {
      try {
        const absolutePath = path.join(this.projectRoot, filePath);
        
        if (!fs.existsSync(absolutePath)) {
          continue;
        }

        const content = fs.readFileSync(absolutePath, 'utf-8');
        let updatedContent = content;
        let hasChanges = false;

        // Parse imports from this file
        const fileNode: FileNode = {
          path: filePath,
          type: 'lib',
          imports: [],
          exports: [],
        };
        
        const analysis = this.analyzeImports(fileNode);

        // Transform each import
        for (const imp of analysis.imports) {
          // Skip external imports
          if (imp.isExternal) {
            continue;
          }

          const oldImport = imp.source;
          let newImport = oldImport;

          // Handle path alias imports (@/...)
          if (oldImport.startsWith('@/')) {
            const transformed = this.applyTransformationRules(oldImport, filePath);
            newImport = transformed.newPath;
          }
          // Handle relative imports
          else if (oldImport.startsWith('./') || oldImport.startsWith('../')) {
            // Resolve the relative import to an absolute path
            const currentDir = path.dirname(absolutePath);
            const resolvedPath = this.resolveImportPath(currentDir, oldImport);
            
            if (resolvedPath) {
              const relativePath = path.relative(this.projectRoot, resolvedPath);
              
              // Check if the imported file was moved
              if (pathMap.has(relativePath)) {
                const newTargetPath = pathMap.get(relativePath)!;
                const newTargetAbsolute = path.join(this.projectRoot, newTargetPath);
                
                // Calculate new relative path from current file to new target location
                newImport = this.calculateRelativePath(absolutePath, newTargetAbsolute);
              }
            }
          }

          // Replace the import in the content
          if (newImport !== oldImport) {
            // Use regex to replace the import, handling different quote styles
            const importRegex = new RegExp(
              `(['"\`])${this.escapeRegex(oldImport)}\\1`,
              'g'
            );
            updatedContent = updatedContent.replace(importRegex, `$1${newImport}$1`);
            hasChanges = true;
          }
        }

        // Write updated content back to file
        if (hasChanges) {
          fs.writeFileSync(absolutePath, updatedContent, 'utf-8');
          result.updatedFiles.push(filePath);
        }
      } catch (error) {
        result.errors.push({
          file: filePath,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return result;
  }

  /**
   * Get all project files (TypeScript/JavaScript)
   */
  private getAllProjectFiles(): string[] {
    const files: string[] = [];
    
    const scanDir = (dir: string) => {
      const fullPath = path.join(this.projectRoot, dir);
      
      if (!fs.existsSync(fullPath)) {
        return;
      }

      const entries = fs.readdirSync(fullPath, { withFileTypes: true });

      for (const entry of entries) {
        const relativePath = path.join(dir, entry.name);
        const fullEntryPath = path.join(fullPath, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules and hidden directories
          if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
            continue;
          }
          scanDir(relativePath);
        } else if (entry.isFile()) {
          // Include TypeScript and JavaScript files
          if (this.isCodeFile(entry.name)) {
            files.push(relativePath);
          }
        }
      }
    };

    // Scan common directories
    const dirsToScan = ['app', 'features', 'shared', 'components', 'hooks', 'lib', 'utils', 'src'];
    for (const dir of dirsToScan) {
      scanDir(dir);
    }

    return files;
  }

  /**
   * Check if a file is a code file
   */
  private isCodeFile(filename: string): boolean {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  /**
   * Resolve an import path to an absolute file path
   */
  private resolveImportPath(fromDir: string, importPath: string): string | null {
    // Try with different extensions
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
    
    for (const ext of extensions) {
      const resolved = path.resolve(fromDir, importPath + ext);
      if (fs.existsSync(resolved)) {
        return resolved;
      }
    }
    
    return null;
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
