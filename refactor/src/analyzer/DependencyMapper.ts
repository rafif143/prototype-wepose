/**
 * Dependency Mapper
 * 
 * Builds a dependency graph from FileNode objects by resolving
 * import statements to actual file paths.
 */

import * as path from 'path';
import * as fs from 'fs';
import type { FileNode, DependencyGraph } from '../types/index.js';

export class DependencyMapper {
  private projectRoot: string;
  private fileMap: Map<string, FileNode>;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.fileMap = new Map();
  }

  /**
   * Build a dependency graph from an array of FileNode objects
   * @param files - Array of FileNode objects
   * @returns DependencyGraph with nodes and edges
   */
  mapDependencies(files: FileNode[]): DependencyGraph {
    // Build file map for quick lookups
    this.fileMap.clear();
    for (const file of files) {
      this.fileMap.set(file.path, file);
    }

    const nodes = new Map<string, FileNode>();
    const edges = new Map<string, string[]>();

    for (const file of files) {
      nodes.set(file.path, file);
      
      const dependencies: string[] = [];
      
      for (const importPath of file.imports) {
        const resolvedPath = this.resolveImport(file.path, importPath);
        if (resolvedPath) {
          dependencies.push(resolvedPath);
        }
      }

      edges.set(file.path, dependencies);
    }

    return { nodes, edges };
  }

  /**
   * Resolve an import statement to an actual file path
   * @param fromFile - The file containing the import
   * @param importPath - The import path to resolve
   * @returns Resolved file path or null if not found
   */
  private resolveImport(fromFile: string, importPath: string): string | null {
    // Skip external packages (not starting with . or /)
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
      // Check if it's an alias (e.g., @/...)
      if (importPath.startsWith('@/')) {
        // Remove @/ prefix and resolve from project root
        const withoutAlias = importPath.substring(2);
        return this.resolveRelativeImport(withoutAlias, '');
      }
      // External package, skip
      return null;
    }

    // Resolve relative imports
    const fromDir = path.dirname(fromFile);
    return this.resolveRelativeImport(importPath, fromDir);
  }

  /**
   * Resolve a relative import path
   */
  private resolveRelativeImport(importPath: string, fromDir: string): string | null {
    // Calculate the absolute path
    const absolutePath = path.join(this.projectRoot, fromDir, importPath);
    
    // Try different extensions and index files
    const candidates = [
      importPath,
      `${importPath}.ts`,
      `${importPath}.tsx`,
      `${importPath}.js`,
      `${importPath}.jsx`,
      `${importPath}/index.ts`,
      `${importPath}/index.tsx`,
      `${importPath}/index.js`,
      `${importPath}/index.jsx`,
    ];

    for (const candidate of candidates) {
      const candidatePath = path.join(fromDir, candidate);
      const normalizedPath = path.normalize(candidatePath);
      
      // Check if this file exists in our file map
      if (this.fileMap.has(normalizedPath)) {
        return normalizedPath;
      }

      // Also check with different path separators
      const withForwardSlash = normalizedPath.replace(/\\/g, '/');
      if (this.fileMap.has(withForwardSlash)) {
        return withForwardSlash;
      }
    }

    // Try checking the file system as a fallback
    for (const candidate of candidates) {
      const candidatePath = path.join(fromDir, candidate);
      const fullPath = path.join(this.projectRoot, candidatePath);
      
      if (fs.existsSync(fullPath)) {
        const relativePath = path.relative(this.projectRoot, fullPath);
        return relativePath;
      }
    }

    return null;
  }

  /**
   * Get all dependencies of a file (direct dependencies only)
   * @param filePath - Path to the file
   * @param graph - The dependency graph
   * @returns Array of file paths that this file depends on
   */
  getDependencies(filePath: string, graph: DependencyGraph): string[] {
    return graph.edges.get(filePath) || [];
  }

  /**
   * Get all dependents of a file (files that depend on this file)
   * @param filePath - Path to the file
   * @param graph - The dependency graph
   * @returns Array of file paths that depend on this file
   */
  getDependents(filePath: string, graph: DependencyGraph): string[] {
    const dependents: string[] = [];
    
    for (const [file, deps] of graph.edges.entries()) {
      if (deps.includes(filePath)) {
        dependents.push(file);
      }
    }

    return dependents;
  }

  /**
   * Get all transitive dependencies of a file (recursive)
   * @param filePath - Path to the file
   * @param graph - The dependency graph
   * @returns Set of all file paths in the dependency tree
   */
  getTransitiveDependencies(filePath: string, graph: DependencyGraph): Set<string> {
    const visited = new Set<string>();
    const queue = [filePath];

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current)) {
        continue;
      }
      
      visited.add(current);
      
      const deps = this.getDependencies(current, graph);
      for (const dep of deps) {
        if (!visited.has(dep)) {
          queue.push(dep);
        }
      }
    }

    // Remove the starting file from the result
    visited.delete(filePath);
    return visited;
  }

  /**
   * Check if there's a path from one file to another in the dependency graph
   * @param from - Starting file path
   * @param to - Target file path
   * @param graph - The dependency graph
   * @returns True if there's a path from 'from' to 'to'
   */
  hasPath(from: string, to: string, graph: DependencyGraph): boolean {
    const transitiveDeps = this.getTransitiveDependencies(from, graph);
    return transitiveDeps.has(to);
  }
}
