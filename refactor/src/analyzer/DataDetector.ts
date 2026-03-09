/**
 * Data Detector
 * 
 * Detects hardcoded data in components (large object/array literals)
 * that should be extracted to separate data files.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@typescript-eslint/parser';
import type { FileNode } from '../types/index.js';

export interface HardcodedData {
  file: string;
  type: 'object' | 'array';
  location: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  size: number; // Number of properties/elements
  variableName?: string;
  shouldExtract: boolean;
  reason: string;
}

export class DataDetector {
  private projectRoot: string;
  private objectSizeThreshold: number;
  private arraySizeThreshold: number;
  private lineSizeThreshold: number;

  constructor(
    projectRoot: string = process.cwd(),
    objectSizeThreshold: number = 10,
    arraySizeThreshold: number = 5,
    lineSizeThreshold: number = 20
  ) {
    this.projectRoot = projectRoot;
    this.objectSizeThreshold = objectSizeThreshold;
    this.arraySizeThreshold = arraySizeThreshold;
    this.lineSizeThreshold = lineSizeThreshold;
  }

  /**
   * Detect hardcoded data in files
   * @param files - Array of FileNode objects to analyze
   * @returns Array of HardcodedData findings
   */
  detectHardcodedData(files: FileNode[]): HardcodedData[] {
    const findings: HardcodedData[] = [];

    for (const file of files) {
      // Only analyze component and lib files
      if (file.type === 'component' || file.type === 'lib') {
        const fileFindings = this.analyzeFile(file);
        findings.push(...fileFindings);
      }
    }

    return findings;
  }

  /**
   * Analyze a single file for hardcoded data
   */
  private analyzeFile(file: FileNode): HardcodedData[] {
    const findings: HardcodedData[] = [];

    try {
      const filePath = path.join(this.projectRoot, file.path);
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      const ast = parse(content, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        loc: true,
        filePath,
      });

      // Traverse AST to find object and array literals
      this.traverseAST(ast, file.path, lines, findings);
    } catch (error) {
      console.error(`Error analyzing file ${file.path}:`, error);
    }

    return findings;
  }

  /**
   * Traverse AST to find object and array expressions
   */
  private traverseAST(
    node: any,
    filePath: string,
    lines: string[],
    findings: HardcodedData[]
  ): void {
    if (!node || typeof node !== 'object') {
      return;
    }

    // Check for object expressions
    if (node.type === 'ObjectExpression' && node.loc) {
      const size = node.properties?.length || 0;
      const lineSpan = node.loc.end.line - node.loc.start.line + 1;

      if (size >= this.objectSizeThreshold || lineSpan >= this.lineSizeThreshold) {
        const variableName = this.findVariableName(node, lines);
        
        findings.push({
          file: filePath,
          type: 'object',
          location: {
            start: { line: node.loc.start.line, column: node.loc.start.column },
            end: { line: node.loc.end.line, column: node.loc.end.column },
          },
          size,
          variableName,
          shouldExtract: true,
          reason: size >= this.objectSizeThreshold
            ? `Object has ${size} properties (threshold: ${this.objectSizeThreshold})`
            : `Object spans ${lineSpan} lines (threshold: ${this.lineSizeThreshold})`,
        });
      }
    }

    // Check for array expressions
    if (node.type === 'ArrayExpression' && node.loc) {
      const size = node.elements?.length || 0;
      const lineSpan = node.loc.end.line - node.loc.start.line + 1;

      if (size >= this.arraySizeThreshold || lineSpan >= this.lineSizeThreshold) {
        const variableName = this.findVariableName(node, lines);
        
        findings.push({
          file: filePath,
          type: 'array',
          location: {
            start: { line: node.loc.start.line, column: node.loc.start.column },
            end: { line: node.loc.end.line, column: node.loc.end.column },
          },
          size,
          variableName,
          shouldExtract: true,
          reason: size >= this.arraySizeThreshold
            ? `Array has ${size} elements (threshold: ${this.arraySizeThreshold})`
            : `Array spans ${lineSpan} lines (threshold: ${this.lineSizeThreshold})`,
        });
      }
    }

    // Recursively traverse child nodes
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) {
          node[key].forEach((child: any) => {
            this.traverseAST(child, filePath, lines, findings);
          });
        } else {
          this.traverseAST(node[key], filePath, lines, findings);
        }
      }
    }
  }

  /**
   * Try to find the variable name for a data literal
   */
  private findVariableName(node: any, lines: string[]): string | undefined {
    // Look at the parent context to find variable declarations
    // This is a simplified approach - in a real implementation,
    // we'd need to track parent nodes during traversal
    
    if (node.loc) {
      const line = lines[node.loc.start.line - 1];
      
      // Try to match variable declarations
      const constMatch = line.match(/const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
      if (constMatch) {
        return constMatch[1];
      }

      const letMatch = line.match(/let\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
      if (letMatch) {
        return letMatch[1];
      }

      const varMatch = line.match(/var\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
      if (varMatch) {
        return varMatch[1];
      }

      // Try to match property assignments
      const propMatch = line.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/);
      if (propMatch) {
        return propMatch[1];
      }
    }

    return undefined;
  }

  /**
   * Get statistics about hardcoded data
   */
  getStatistics(findings: HardcodedData[]): {
    total: number;
    objects: number;
    arrays: number;
    shouldExtract: number;
    byFile: Record<string, number>;
  } {
    const stats = {
      total: findings.length,
      objects: findings.filter(f => f.type === 'object').length,
      arrays: findings.filter(f => f.type === 'array').length,
      shouldExtract: findings.filter(f => f.shouldExtract).length,
      byFile: {} as Record<string, number>,
    };

    for (const finding of findings) {
      stats.byFile[finding.file] = (stats.byFile[finding.file] || 0) + 1;
    }

    return stats;
  }

  /**
   * Get files that contain hardcoded data requiring extraction
   */
  getFilesRequiringExtraction(findings: HardcodedData[]): string[] {
    const files = new Set<string>();
    
    for (const finding of findings) {
      if (finding.shouldExtract) {
        files.add(finding.file);
      }
    }

    return Array.from(files);
  }

  /**
   * Group findings by file
   */
  groupByFile(findings: HardcodedData[]): Map<string, HardcodedData[]> {
    const grouped = new Map<string, HardcodedData[]>();

    for (const finding of findings) {
      const existing = grouped.get(finding.file) || [];
      existing.push(finding);
      grouped.set(finding.file, existing);
    }

    return grouped;
  }
}
