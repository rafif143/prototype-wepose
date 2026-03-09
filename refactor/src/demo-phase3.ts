#!/usr/bin/env node
/**
 * Demo script for Phase 3 Migration
 * Shows what the migration would do without actually executing it
 */

import { StructureAnalyzer } from './analyzer/StructureAnalyzer.js';
import * as path from 'path';

async function demoPhase3() {
  console.log('='.repeat(60));
  console.log('Phase 3: File Migration Demo');
  console.log('='.repeat(60));
  console.log('\nThis demo shows what Phase 3 would do without executing it.\n');

  const projectRoot = path.resolve(process.cwd(), '..');
  const analyzer = new StructureAnalyzer(projectRoot);

  // Step 1: Analyze current structure
  console.log('[1/5] Analyzing current structure...\n');
  const files = analyzer.scanDirectories([
    'components',
    'hooks',
    'lib',
    'utils',
  ]);
  
  console.log(`Found ${files.length} files to analyze`);
  
  // Step 2: Categorize files
  console.log('\n[2/5] Categorizing files by feature...\n');
  const categorization = analyzer.categorizeFiles(files);
  
  console.log('Categorization Results:');
  console.log(`  Visa:    ${categorization.visa.length} files`);
  console.log(`  Blog:    ${categorization.blog.length} files`);
  console.log(`  Tools:   ${categorization.tools.length} files`);
  console.log(`  Landing: ${categorization.landing.length} files`);
  console.log(`  Shared:  ${categorization.shared.length} files`);

  // Step 3: Show duplicate folders
  console.log('\n[3/5] Detecting duplicate folders...\n');
  const duplicates = analyzer.detectDuplicates(files);
  
  if (duplicates.length > 0) {
    console.log('Duplicate folders detected:');
    duplicates.forEach((group, index) => {
      console.log(`\n  Group ${index + 1}:`);
      console.log(`    Similarity: ${(group.similarity * 100).toFixed(0)}%`);
      console.log(`    Action: ${group.recommendedAction}`);
      console.log(`    Files:`);
      group.files.forEach(file => {
        console.log(`      - ${file.path}`);
      });
    });
  } else {
    console.log('No duplicate folders detected');
  }

  // Step 4: Show migration plan
  console.log('\n[4/5] Migration Plan:\n');
  
  console.log('Duplicate Resolution:');
  console.log('  components/section/ + components/sections/');
  console.log('    → features/landing/components/');
  console.log('  components/visa/ + components/visa-detail/');
  console.log('    → features/visa/components/');

  console.log('\nFeature Files Migration:');
  const featureMap = [
    { feature: 'visa', count: categorization.visa.length, target: 'features/visa/' },
    { feature: 'blog', count: categorization.blog.length, target: 'features/blog/' },
    { feature: 'tools', count: categorization.tools.length, target: 'features/tools/' },
    { feature: 'landing', count: categorization.landing.length, target: 'features/landing/' },
  ];

  featureMap.forEach(({ feature, count, target }) => {
    if (count > 0) {
      console.log(`  ${feature}: ${count} files → ${target}`);
    }
  });

  console.log('\nShared Files Migration:');
  console.log(`  ${categorization.shared.length} files → shared/`);

  // Step 5: Show sample file movements
  console.log('\n[5/5] Sample File Movements:\n');
  
  // Show a few examples from each category
  const showSamples = (files: any[], category: string, max: number = 3) => {
    if (files.length > 0) {
      console.log(`${category}:`);
      files.slice(0, max).forEach(file => {
        const filename = path.basename(file.path);
        let targetDir = '';
        
        switch (file.feature) {
          case 'visa':
            targetDir = `features/visa/${file.type === 'component' ? 'components' : file.type + 's'}`;
            break;
          case 'blog':
            targetDir = `features/blog/${file.type === 'component' ? 'components' : file.type + 's'}`;
            break;
          case 'tools':
            targetDir = `features/tools/${file.type === 'component' ? 'components' : file.type + 's'}`;
            break;
          case 'landing':
            targetDir = `features/landing/${file.type === 'component' ? 'components' : file.type + 's'}`;
            break;
          case 'shared':
            if (file.path.includes('/ui/')) {
              targetDir = 'shared/ui';
            } else if (file.path.includes('/layout/')) {
              targetDir = 'shared/layout';
            } else {
              targetDir = `shared/${file.type === 'component' ? 'ui' : file.type + 's'}`;
            }
            break;
        }
        
        console.log(`  ${file.path}`);
        console.log(`    → ${targetDir}/${filename}`);
      });
      
      if (files.length > max) {
        console.log(`  ... and ${files.length - max} more files`);
      }
      console.log('');
    }
  };

  showSamples(categorization.visa, 'Visa Files', 2);
  showSamples(categorization.blog, 'Blog Files', 2);
  showSamples(categorization.tools, 'Tools Files', 2);
  showSamples(categorization.landing, 'Landing Files', 2);
  showSamples(categorization.shared, 'Shared Files', 2);

  // Summary
  console.log('='.repeat(60));
  console.log('Demo Complete!');
  console.log('='.repeat(60));
  console.log('\nTo execute the actual migration, run:');
  console.log('  npm run migrate:phase3');
  console.log('\nIMPORTANT: Before running the migration:');
  console.log('  1. Ensure git working directory is clean');
  console.log('  2. Create a backup branch');
  console.log('  3. Review the migration plan above');
  console.log('  4. Read PHASE3_GUIDE.md for detailed instructions');
  console.log('');
}

demoPhase3().catch((error) => {
  console.error('Demo failed:', error);
  process.exit(1);
});
