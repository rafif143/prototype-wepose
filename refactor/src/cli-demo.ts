#!/usr/bin/env node
/**
 * CLI Demo for Structure Analyzer
 * 
 * Demonstrates the Phase 1 implementation by analyzing the current codebase
 */

import { StructureAnalyzer } from './analyzer/index.js';
import * as path from 'path';

async function main() {
  console.log('🔍 Feature-Based Refactor - Structure Analyzer Demo\n');

  // Initialize analyzer with parent directory (the actual project)
  const projectRoot = path.join(process.cwd(), '..');
  const analyzer = new StructureAnalyzer(projectRoot);

  console.log(`📁 Project Root: ${projectRoot}\n`);

  // Directories to analyze
  const directories = ['components', 'hooks', 'lib', 'utils'];
  console.log(`📂 Scanning directories: ${directories.join(', ')}\n`);

  try {
    // Perform complete analysis
    console.log('⏳ Running analysis...\n');
    const result = analyzer.analyzeAll(directories);

    // Display results
    console.log('✅ Analysis Complete!\n');
    console.log('═'.repeat(60));
    console.log('📊 RESULTS SUMMARY');
    console.log('═'.repeat(60));

    // Files scanned
    console.log(`\n📄 Files Scanned: ${result.files.length}`);
    console.log(`   - Components: ${result.files.filter(f => f.type === 'component').length}`);
    console.log(`   - Hooks: ${result.files.filter(f => f.type === 'hook').length}`);
    console.log(`   - Utilities: ${result.files.filter(f => f.type === 'util').length}`);
    console.log(`   - Libraries: ${result.files.filter(f => f.type === 'lib').length}`);
    console.log(`   - Types: ${result.files.filter(f => f.type === 'type').length}`);

    // Dependency graph
    console.log(`\n🔗 Dependency Graph:`);
    console.log(`   - Nodes: ${result.dependencyGraph.nodes.size}`);
    console.log(`   - Edges: ${result.dependencyGraph.edges.size}`);
    const totalDeps = Array.from(result.dependencyGraph.edges.values())
      .reduce((sum, deps) => sum + deps.length, 0);
    console.log(`   - Total Dependencies: ${totalDeps}`);

    // Categorization
    console.log(`\n🏷️  Feature Categorization:`);
    console.log(`   - Visa: ${result.categorization.visa.length} files`);
    console.log(`   - Blog: ${result.categorization.blog.length} files`);
    console.log(`   - Tools: ${result.categorization.tools.length} files`);
    console.log(`   - Landing: ${result.categorization.landing.length} files`);
    console.log(`   - Shared: ${result.categorization.shared.length} files`);

    // Duplicates
    console.log(`\n📋 Duplicate Detection:`);
    console.log(`   - Duplicate Groups Found: ${result.duplicates.length}`);
    if (result.duplicates.length > 0) {
      console.log(`\n   Top Duplicates:`);
      result.duplicates.slice(0, 3).forEach((group, i) => {
        console.log(`   ${i + 1}. ${group.files.length} files (similarity: ${(group.similarity * 100).toFixed(0)}%)`);
        console.log(`      Action: ${group.recommendedAction}`);
        console.log(`      Files: ${group.files.map(f => path.basename(f.path)).join(', ')}`);
      });
    }

    // Naming analysis
    const inconsistentNaming = result.namingAnalysis.filter(a => !a.isConsistent);
    console.log(`\n📝 Naming Convention Analysis:`);
    console.log(`   - Total Files Analyzed: ${result.namingAnalysis.length}`);
    console.log(`   - Consistent: ${result.namingAnalysis.length - inconsistentNaming.length}`);
    console.log(`   - Inconsistent: ${inconsistentNaming.length}`);
    if (inconsistentNaming.length > 0) {
      console.log(`\n   Examples of Inconsistent Naming:`);
      inconsistentNaming.slice(0, 3).forEach((analysis, i) => {
        console.log(`   ${i + 1}. ${analysis.fileName}`);
        console.log(`      Current: ${analysis.fileConvention}`);
        console.log(`      Expected: ${analysis.expectedFileConvention}`);
        if (analysis.suggestions.length > 0) {
          console.log(`      Suggestion: ${analysis.suggestions[0]}`);
        }
      });
    }

    // Hardcoded data
    console.log(`\n💾 Hardcoded Data Detection:`);
    console.log(`   - Total Findings: ${result.hardcodedData.length}`);
    console.log(`   - Objects: ${result.hardcodedData.filter(d => d.type === 'object').length}`);
    console.log(`   - Arrays: ${result.hardcodedData.filter(d => d.type === 'array').length}`);
    console.log(`   - Should Extract: ${result.hardcodedData.filter(d => d.shouldExtract).length}`);
    if (result.hardcodedData.length > 0) {
      console.log(`\n   Top Files with Hardcoded Data:`);
      const fileGroups = new Map<string, number>();
      result.hardcodedData.forEach(d => {
        fileGroups.set(d.file, (fileGroups.get(d.file) || 0) + 1);
      });
      const topFiles = Array.from(fileGroups.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      topFiles.forEach(([file, count], i) => {
        console.log(`   ${i + 1}. ${path.basename(file)}: ${count} instances`);
      });
    }

    console.log('\n' + '═'.repeat(60));
    console.log('✨ Phase 1: Structure Analyzer - Complete!');
    console.log('═'.repeat(60));
    console.log('\nNext Steps:');
    console.log('  - Review the analysis results');
    console.log('  - Proceed to Phase 2: Structure Creation');
    console.log('  - Run migration with: npm run refactor:migrate\n');

  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  }
}

main();
