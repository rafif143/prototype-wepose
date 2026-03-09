/**
 * Structure Creator - Creates the new feature-based directory structure
 */

import * as fs from 'fs';
import * as path from 'path';
import type { MigrationConfig } from '../types/index.js';

/**
 * Creates the new feature-based directory structure
 */
export class StructureCreator {
  private projectRoot: string;
  private config: MigrationConfig;

  constructor(projectRoot: string, config: MigrationConfig) {
    this.projectRoot = projectRoot;
    this.config = config;
  }

  /**
   * Creates the complete directory structure for features and shared modules
   */
  createStructure(): void {
    // Create features directory
    this.createFeaturesDirectory();

    // Create shared directory
    this.createSharedDirectory();
  }

  /**
   * Creates the features/ directory with all feature subdirectories
   */
  private createFeaturesDirectory(): void {
    const featuresDir = path.join(this.projectRoot, 'features');
    this.ensureDirectory(featuresDir);

    // Create each feature module
    for (const feature of this.config.features) {
      this.createFeatureModule(feature.name);
    }
  }

  /**
   * Creates a feature module with standard subdirectories
   */
  private createFeatureModule(featureName: string): void {
    const featureDir = path.join(this.projectRoot, 'features', featureName);
    this.ensureDirectory(featureDir);

    // Create standard subdirectories
    const subdirs = ['components', 'hooks', 'lib', 'types', 'utils'];
    for (const subdir of subdirs) {
      const subdirPath = path.join(featureDir, subdir);
      this.ensureDirectory(subdirPath);
    }
  }

  /**
   * Creates the shared/ directory with all shared subdirectories
   */
  private createSharedDirectory(): void {
    const sharedDir = path.join(this.projectRoot, 'shared');
    this.ensureDirectory(sharedDir);

    // Create shared subdirectories
    const subdirs = ['ui', 'layout', 'hooks', 'utils', 'types', 'lib'];
    for (const subdir of subdirs) {
      const subdirPath = path.join(sharedDir, subdir);
      this.ensureDirectory(subdirPath);
    }
  }

  /**
   * Ensures a directory exists, creating it if necessary
   */
  private ensureDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Verifies that all required directories were created
   */
  verifyStructure(): { success: boolean; missing: string[] } {
    const missing: string[] = [];

    // Check features directory
    const featuresDir = path.join(this.projectRoot, 'features');
    if (!fs.existsSync(featuresDir)) {
      missing.push('features/');
    } else {
      // Check each feature module
      for (const feature of this.config.features) {
        const featureDir = path.join(featuresDir, feature.name);
        if (!fs.existsSync(featureDir)) {
          missing.push(`features/${feature.name}/`);
        } else {
          // Check subdirectories
          const subdirs = ['components', 'hooks', 'lib', 'types', 'utils'];
          for (const subdir of subdirs) {
            const subdirPath = path.join(featureDir, subdir);
            if (!fs.existsSync(subdirPath)) {
              missing.push(`features/${feature.name}/${subdir}/`);
            }
          }
        }
      }
    }

    // Check shared directory
    const sharedDir = path.join(this.projectRoot, 'shared');
    if (!fs.existsSync(sharedDir)) {
      missing.push('shared/');
    } else {
      // Check shared subdirectories
      const subdirs = ['ui', 'layout', 'hooks', 'utils', 'types', 'lib'];
      for (const subdir of subdirs) {
        const subdirPath = path.join(sharedDir, subdir);
        if (!fs.existsSync(subdirPath)) {
          missing.push(`shared/${subdir}/`);
        }
      }
    }

    return {
      success: missing.length === 0,
      missing,
    };
  }
}
