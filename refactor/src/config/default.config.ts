/**
 * Default migration configuration
 */

import type { MigrationConfig } from '../types/index.js';

/**
 * Default configuration for the feature-based refactor
 */
export const defaultConfig: MigrationConfig = {
  features: [
    {
      name: 'visa',
      patterns: [
        '**/components/visa/**',
        '**/components/visa-detail/**',
        '**/hooks/useQuizState.ts',
        '**/hooks/useSponsorLetterState.ts',
        '**/lib/visa-data.ts',
      ],
      targetDir: 'features/visa',
      subdirs: {
        components: ['**/components/visa/**', '**/components/visa-detail/**'],
        hooks: ['**/hooks/useQuizState.ts', '**/hooks/useSponsorLetterState.ts'],
        lib: ['**/lib/visa-data.ts'],
        types: [],
        utils: [],
      },
    },
    {
      name: 'blog',
      patterns: ['**/components/blog/**'],
      targetDir: 'features/blog',
      subdirs: {
        components: ['**/components/blog/**'],
        hooks: [],
        lib: [],
        types: [],
        utils: [],
      },
    },
    {
      name: 'tools',
      patterns: [
        '**/components/tools/**',
        '**/hooks/useCompareState.ts',
        '**/lib/tools/**',
      ],
      targetDir: 'features/tools',
      subdirs: {
        components: ['**/components/tools/**'],
        hooks: ['**/hooks/useCompareState.ts'],
        lib: ['**/lib/tools/**'],
        types: [],
        utils: [],
      },
    },
    {
      name: 'landing',
      patterns: ['**/components/section/**', '**/components/sections/**'],
      targetDir: 'features/landing',
      subdirs: {
        components: ['**/components/section/**', '**/components/sections/**'],
        hooks: [],
        lib: [],
        types: [],
        utils: [],
      },
    },
  ],
  shared: {
    ui: ['**/components/ui/**'],
    layout: ['**/components/layout/**'],
    hooks: [
      '**/hooks/useDebounce.ts',
      '**/hooks/useReducedMotion.ts',
      '**/utils/useAnimationConfig.ts',
    ],
    utils: ['**/utils/**', '**/lib/utils.ts'],
    types: [],
    lib: [],
  },
  namingConventions: {
    directories: 'kebab-case',
    components: 'PascalCase',
    hooks: 'camelCase',
    utils: 'camelCase',
    types: 'PascalCase',
  },
  duplicateResolution: {
    strategy: 'merge',
    similarityThreshold: 0.8,
    conflictResolution: 'manual',
  },
};
