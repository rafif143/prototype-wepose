/**
 * Directory Scanner
 * 
 * Recursively scans target directories and builds FileNode objects
 * with metadata about imports, exports, and file types.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@typescript-eslint/parser';
import type { FileNode } from '../types/index.js';

export class DirectoryScanner {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Scan directories and return FileNode objects for all discovered files
   * @param directories - Array of directory paths to scan (relative to project root)
   * @returns Array of FileNode objects
   */
  scanDirectories(directories: string[]): FileNode[] {
    const fileNodes: FileNode[] = [];

    for (const dir of directories) {
      const fullPath = path.join(this.projectRoot, dir);
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`Directory not found: ${fullPath}`);
        continue;
      }

      this.scanDirectory(fullPath, fileNodes);
    }

    return fileNodes;
  }

  /**
   * Recursively scan a single directory
   */
  private scanDirectory(dirPath: string, fileNodes: FileNode[]): void {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
          continue;
        }
        this.scanDirectory(fullPath, fileNodes);
      } else if (entry.isFile()) {
        // Process TypeScript and JavaScript files
        if (this.isCodeFile(entry.name)) {
          const fileNode = this.createFileNode(fullPath);
          if (fileNode) {
            fileNodes.push(fileNode);
          }
        }
      }
    }
  }

  /**
   * Check if a file is a code file we should process
   */
  private isCodeFile(filename: string): boolean {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  /**
   * Create a FileNode from a file path
   */
  private createFileNode(filePath: string): FileNode | null {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(this.projectRoot, filePath);
      
      return {
        path: relativePath,
        type: this.determineFileType(relativePath, content),
        imports: this.extractImports(content, filePath),
        exports: this.extractExports(content, filePath),
      };
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Determine the type of file based on path and content
   */
  private determineFileType(
    relativePath: string,
    content: string
  ): FileNode['type'] {
    // Check by directory structure
    if (relativePath.includes('/hooks/') || relativePath.startsWith('hooks/')) {
      return 'hook';
    }
    if (relativePath.includes('/utils/') || relativePath.startsWith('utils/')) {
      return 'util';
    }
    if (relativePath.includes('/types/') || relativePath.startsWith('types/')) {
      return 'type';
    }
    if (relativePath.includes('/lib/') || relativePath.startsWith('lib/')) {
      return 'lib';
    }

    // Check by filename patterns
    const filename = path.basename(relativePath);
    if (filename.startsWith('use') && filename.match(/^use[A-Z]/)) {
      return 'hook';
    }

    // Check if it's a React component (contains JSX)
    if (content.includes('jsx') || content.includes('tsx') || 
        content.match(/<[A-Z][a-zA-Z0-9]*[\s>]/)) {
      return 'component';
    }

    // Default to lib for other files
    return 'lib';
  }

  /**
   * Extract import statements from file content
   */
  private extractImports(content: string, filePath: string): string[] {
    const imports: string[] = [];

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
        if (node.type === 'ImportDeclaration' && node.source?.value) {
          imports.push(node.source.value);
        }

        // Handle dynamic imports
        if (node.type === 'ImportExpression' && node.source?.value) {
          imports.push(node.source.value);
        }

        // Handle require() calls
        if (
          node.type === 'CallExpression' &&
          node.callee?.name === 'require' &&
          node.arguments?.[0]?.value
        ) {
          imports.push(node.arguments[0].value);
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
        imports.push(match[1]);
      }
    }

    return [...new Set(imports)]; // Remove duplicates
  }

  /**
   * Extract export statements from file content
   */
  private extractExports(content: string, filePath: string): string[] {
    const exports: string[] = [];

    try {
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        filePath,
      });

      // Traverse AST to find export declarations
      const traverse = (node: any) => {
        // Named exports: export const foo = ...
        if (node.type === 'ExportNamedDeclaration') {
          if (node.declaration) {
            // export const/let/var/function/class
            if (node.declaration.declarations) {
              node.declaration.declarations.forEach((decl: any) => {
                if (decl.id?.name) {
                  exports.push(decl.id.name);
                }
              });
            } else if (node.declaration.id?.name) {
              // export function/class
              exports.push(node.declaration.id.name);
            }
          }
          // export { foo, bar }
          if (node.specifiers) {
            node.specifiers.forEach((spec: any) => {
              if (spec.exported?.name) {
                exports.push(spec.exported.name);
              }
            });
          }
        }

        // Default export: export default ...
        if (node.type === 'ExportDefaultDeclaration') {
          if (node.declaration?.name) {
            exports.push(node.declaration.name);
          } else {
            exports.push('default');
          }
        }

        // Export all: export * from '...'
        if (node.type === 'ExportAllDeclaration') {
          exports.push('*');
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
      const exportRegex = /export\s+(?:default\s+)?(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
      let match;
      while ((match = exportRegex.exec(content)) !== null) {
        exports.push(match[1]);
      }
    }

    return [...new Set(exports)]; // Remove duplicates
  }
}
