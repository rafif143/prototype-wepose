/**
 * Migration Validator - Validates the refactored codebase
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { parse } from '@typescript-eslint/parser';
import type {
  ValidationResult,
  CircularDepResult,
  DependencyGraph,
  MigrationReport,
} from '../types/index.js';

/**
 * Validates the refactored codebase maintains functionality
 */
export class MigrationValidator {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Validates all imports resolve correctly
   * Task 11.1: Implement import validator
   */
  validateImports(files: string[]): ValidationResult {
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];

    for (const file of files) {
      const filePath = path.join(this.projectRoot, file);
      
      if (!fs.existsSync(filePath)) {
        errors.push({
          file,
          line: 0,
          message: `File does not exist: ${file}`,
        });
        continue;
      }

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const imports = this.extractImports(content, filePath);

        for (const imp of imports) {
          const { source, line } = imp;
          
          // Skip external imports (from node_modules)
          if (this.isExternalImport(source)) {
            continue;
          }

          // Resolve the import path
          const resolved = this.resolveImport(filePath, source);
          
          if (!resolved) {
            errors.push({
              file,
              line,
              message: `Cannot resolve import: "${source}"`,
            });
          } else if (!fs.existsSync(resolved)) {
            errors.push({
              file,
              line,
              message: `Import target does not exist: "${source}" (resolved to ${resolved})`,
            });
          }
        }
      } catch (error) {
        errors.push({
          file,
          line: 0,
          message: `Failed to parse file: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    return {
      passed: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Checks TypeScript type resolution
   * Task 11.3: Implement TypeScript type checker
   */
  checkTypeResolution(files: string[]): ValidationResult {
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];

    try {
      // Check if tsconfig.json exists
      const tsconfigPath = path.join(this.projectRoot, 'tsconfig.json');
      if (!fs.existsSync(tsconfigPath)) {
        warnings.push({
          file: '',
          line: 0,
          message: 'No tsconfig.json found, skipping TypeScript type checking',
        });
        return { passed: true, errors, warnings };
      }

      // Run tsc --noEmit to check for type errors
      try {
        execSync('npx tsc --noEmit', {
          cwd: this.projectRoot,
          encoding: 'utf-8',
          stdio: 'pipe',
        });
      } catch (error: any) {
        // Parse TypeScript error output
        const output = error.stdout || error.stderr || '';
        const errorLines = output.split('\n');
        
        for (const line of errorLines) {
          // Parse TypeScript error format: file.ts(line,col): error TS####: message
          const match = line.match(/^(.+?)\((\d+),\d+\):\s*error\s+TS\d+:\s*(.+)$/);
          if (match) {
            const [, file, lineNum, message] = match;
            errors.push({
              file: path.relative(this.projectRoot, file),
              line: parseInt(lineNum, 10),
              message: message.trim(),
            });
          }
        }
        
        // If we couldn't parse any errors but tsc failed, add a generic error
        if (errors.length === 0) {
          errors.push({
            file: '',
            line: 0,
            message: 'TypeScript compilation failed. Run "tsc --noEmit" for details.',
          });
        }
      }
    } catch (error) {
      errors.push({
        file: '',
        line: 0,
        message: `Failed to run TypeScript compiler: ${error instanceof Error ? error.message : String(error)}`,
      });
    }

    return {
      passed: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Detects circular dependencies
   * Task 11.5: Implement circular dependency detector
   */
  detectCircularDependencies(graph: DependencyGraph): CircularDepResult {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const currentPath: string[] = [];

    // Depth-first search to detect cycles
    const dfs = (node: string): void => {
      visited.add(node);
      recursionStack.add(node);
      currentPath.push(node);

      const dependencies = graph.edges.get(node) || [];
      
      for (const dep of dependencies) {
        if (!visited.has(dep)) {
          dfs(dep);
        } else if (recursionStack.has(dep)) {
          // Found a cycle
          const cycleStart = currentPath.indexOf(dep);
          if (cycleStart !== -1) {
            const cycle = [...currentPath.slice(cycleStart), dep];
            // Check if this cycle is already recorded (in any rotation)
            if (!this.isCycleDuplicate(cycle, cycles)) {
              cycles.push(cycle);
            }
          }
        }
      }

      currentPath.pop();
      recursionStack.delete(node);
    };

    // Run DFS from each node
    for (const node of graph.nodes.keys()) {
      if (!visited.has(node)) {
        dfs(node);
      }
    }

    return {
      found: cycles.length > 0,
      cycles,
    };
  }

  /**
   * Validates public API exports are accessible
   * Task 11.7: Implement public API validator
   */
  validatePublicAPIs(modules: string[]): ValidationResult {
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];

    for (const module of modules) {
      const indexPath = path.join(this.projectRoot, module, 'index.ts');
      const indexPathJs = path.join(this.projectRoot, module, 'index.js');
      
      // Check if index file exists
      const actualIndexPath = fs.existsSync(indexPath) ? indexPath : 
                             fs.existsSync(indexPathJs) ? indexPathJs : null;
      
      if (!actualIndexPath) {
        errors.push({
          file: module,
          line: 0,
          message: `No index.ts or index.js found in module: ${module}`,
        });
        continue;
      }

      try {
        const content = fs.readFileSync(actualIndexPath, 'utf-8');
        const exports = this.extractExports(content, actualIndexPath);

        // Validate each export
        for (const exp of exports) {
          const { source, line } = exp;
          
          if (source) {
            // This is a re-export (export { foo } from './bar')
            const resolved = this.resolveImport(actualIndexPath, source);
            
            if (!resolved) {
              errors.push({
                file: path.relative(this.projectRoot, actualIndexPath),
                line,
                message: `Cannot resolve export source: "${source}"`,
              });
            } else if (!fs.existsSync(resolved)) {
              errors.push({
                file: path.relative(this.projectRoot, actualIndexPath),
                line,
                message: `Export source does not exist: "${source}"`,
              });
            }
          }
        }
      } catch (error) {
        errors.push({
          file: path.relative(this.projectRoot, actualIndexPath),
          line: 0,
          message: `Failed to parse index file: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    return {
      passed: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Generates comprehensive migration report
   */
  generateReport(results: ValidationResult[]): MigrationReport {
    // TODO: Implement in task 12.1
    throw new Error('Not implemented');
  }

  // Helper methods

  /**
   * Extract imports from file content
   */
  private extractImports(content: string, filePath: string): Array<{ source: string; line: number }> {
    const imports: Array<{ source: string; line: number }> = [];

    try {
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        filePath,
        loc: true,
      });

      const traverse = (node: any) => {
        if (node.type === 'ImportDeclaration' && node.source?.value) {
          imports.push({
            source: node.source.value,
            line: node.loc?.start?.line || 0,
          });
        }

        if (node.type === 'ImportExpression' && node.source?.value) {
          imports.push({
            source: node.source.value,
            line: node.loc?.start?.line || 0,
          });
        }

        if (
          node.type === 'CallExpression' &&
          node.callee?.name === 'require' &&
          node.arguments?.[0]?.value
        ) {
          imports.push({
            source: node.arguments[0].value,
            line: node.loc?.start?.line || 0,
          });
        }

        for (const key in node) {
          if (node[key] && typeof node[key] === 'object') {
            if (Array.isArray(node[key])) {
              node[key].forEach((child: any) => {
                if (child && typeof child === 'object') traverse(child);
              });
            } else {
              traverse(node[key]);
            }
          }
        }
      };

      traverse(ast);
    } catch (error) {
      // Fallback to regex if parsing fails
      const lines = content.split('\n');
      const importRegex = /(?:import|require)\s*\(?['"]([^'"]+)['"]\)?/;
      
      lines.forEach((line, index) => {
        const match = line.match(importRegex);
        if (match) {
          imports.push({
            source: match[1],
            line: index + 1,
          });
        }
      });
    }

    return imports;
  }

  /**
   * Extract exports from file content
   */
  private extractExports(content: string, filePath: string): Array<{ source?: string; line: number }> {
    const exports: Array<{ source?: string; line: number }> = [];

    try {
      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        filePath,
        loc: true,
      });

      const traverse = (node: any) => {
        // export { foo } from './bar'
        if (node.type === 'ExportNamedDeclaration' && node.source?.value) {
          exports.push({
            source: node.source.value,
            line: node.loc?.start?.line || 0,
          });
        }

        // export * from './bar'
        if (node.type === 'ExportAllDeclaration' && node.source?.value) {
          exports.push({
            source: node.source.value,
            line: node.loc?.start?.line || 0,
          });
        }

        for (const key in node) {
          if (node[key] && typeof node[key] === 'object') {
            if (Array.isArray(node[key])) {
              node[key].forEach((child: any) => {
                if (child && typeof child === 'object') traverse(child);
              });
            } else {
              traverse(node[key]);
            }
          }
        }
      };

      traverse(ast);
    } catch (error) {
      // Fallback to regex if parsing fails
      const lines = content.split('\n');
      const exportRegex = /export\s+(?:\*|{[^}]+})\s+from\s+['"]([^'"]+)['"]/;
      
      lines.forEach((line, index) => {
        const match = line.match(exportRegex);
        if (match) {
          exports.push({
            source: match[1],
            line: index + 1,
          });
        }
      });
    }

    return exports;
  }

  /**
   * Check if an import is external (from node_modules)
   */
  private isExternalImport(source: string): boolean {
    return !source.startsWith('.') && !source.startsWith('/') && !source.startsWith('@/');
  }

  /**
   * Resolve an import path to an absolute file path
   */
  private resolveImport(fromFile: string, importPath: string): string | null {
    // Handle path aliases (@/...)
    if (importPath.startsWith('@/')) {
      const relativePath = importPath.substring(2);
      return this.resolveWithExtensions(path.join(this.projectRoot, relativePath));
    }

    // Handle relative imports
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const fromDir = path.dirname(fromFile);
      const resolved = path.resolve(fromDir, importPath);
      return this.resolveWithExtensions(resolved);
    }

    // External import
    return null;
  }

  /**
   * Try to resolve a path with different extensions
   */
  private resolveWithExtensions(basePath: string): string | null {
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
    
    for (const ext of extensions) {
      const fullPath = basePath + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    return null;
  }

  /**
   * Check if a cycle is a duplicate of existing cycles
   */
  private isCycleDuplicate(cycle: string[], existingCycles: string[][]): boolean {
    for (const existing of existingCycles) {
      if (this.areCyclesEqual(cycle, existing)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if two cycles are equal (considering rotations)
   */
  private areCyclesEqual(cycle1: string[], cycle2: string[]): boolean {
    if (cycle1.length !== cycle2.length) {
      return false;
    }

    // Try all rotations
    for (let i = 0; i < cycle1.length; i++) {
      let match = true;
      for (let j = 0; j < cycle1.length; j++) {
        if (cycle1[j] !== cycle2[(i + j) % cycle2.length]) {
          match = false;
          break;
        }
      }
      if (match) {
        return true;
      }
    }

    return false;
  }
}
