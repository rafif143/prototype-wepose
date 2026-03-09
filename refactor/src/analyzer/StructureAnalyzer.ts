/**
 * Structure Analyzer - Analyzes the current codebase structure
 */

import type {
  FileNode,
  DependencyGraph,
  FileCategorization,
  DuplicateGroup,
} from '../types/index.js';
import { DirectoryScanner } from './DirectoryScanner.js';
import { DependencyMapper } from './DependencyMapper.js';
import { FileCategorizer } from './FileCategorizer.js';
import { DuplicateDetector } from './DuplicateDetector.js';
import { NamingAnalyzer, type NamingAnalysis } from './NamingAnalyzer.js';
import { DataDetector, type HardcodedData } from './DataDetector.js';

/**
 * Analyzes the current codebase structure and builds a migration plan
 */
export class StructureAnalyzer {
  private projectRoot: string;
  private scanner: DirectoryScanner;
  private dependencyMapper: DependencyMapper;
  private categorizer: FileCategorizer;
  private duplicateDetector: DuplicateDetector;
  private namingAnalyzer: NamingAnalyzer;
  private dataDetector: DataDetector;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.scanner = new DirectoryScanner(projectRoot);
    this.dependencyMapper = new DependencyMapper(projectRoot);
    this.categorizer = new FileCategorizer();
    this.duplicateDetector = new DuplicateDetector(projectRoot);
    this.namingAnalyzer = new NamingAnalyzer();
    this.dataDetector = new DataDetector(projectRoot);
  }

  /**
   * Scans directories and returns all file nodes
   */
  scanDirectories(paths: string[]): FileNode[] {
    return this.scanner.scanDirectories(paths);
  }

  /**
   * Maps dependencies between files
   */
  mapDependencies(files: FileNode[]): DependencyGraph {
    return this.dependencyMapper.mapDependencies(files);
  }

  /**
   * Categorizes files by feature domain
   */
  categorizeFiles(files: FileNode[], graph?: DependencyGraph): FileCategorization {
    return this.categorizer.categorizeFiles(files, graph);
  }

  /**
   * Detects duplicate folders and files
   */
  detectDuplicates(files: FileNode[]): DuplicateGroup[] {
    return this.duplicateDetector.detectDuplicates(files);
  }

  /**
   * Analyzes naming conventions
   */
  analyzeNaming(files: FileNode[]): NamingAnalysis[] {
    return this.namingAnalyzer.analyzeNaming(files);
  }

  /**
   * Detects hardcoded data in files
   */
  detectHardcodedData(files: FileNode[]): HardcodedData[] {
    return this.dataDetector.detectHardcodedData(files);
  }

  /**
   * Perform complete analysis of the codebase
   */
  analyzeAll(directories: string[]): {
    files: FileNode[];
    dependencyGraph: DependencyGraph;
    categorization: FileCategorization;
    duplicates: DuplicateGroup[];
    namingAnalysis: NamingAnalysis[];
    hardcodedData: HardcodedData[];
  } {
    // Scan directories
    const files = this.scanDirectories(directories);

    // Build dependency graph
    const dependencyGraph = this.mapDependencies(files);

    // Categorize files
    const categorization = this.categorizeFiles(files, dependencyGraph);

    // Detect duplicates
    const duplicates = this.detectDuplicates(files);

    // Analyze naming
    const namingAnalysis = this.analyzeNaming(files);

    // Detect hardcoded data
    const hardcodedData = this.detectHardcodedData(files);

    return {
      files,
      dependencyGraph,
      categorization,
      duplicates,
      namingAnalysis,
      hardcodedData,
    };
  }
}
