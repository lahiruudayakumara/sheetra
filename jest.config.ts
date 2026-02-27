import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Use ts-jest preset for TypeScript
  preset: 'ts-jest',
  
  // Set test environment
  testEnvironment: 'node',
  
  // Root directory for tests
  roots: ['<rootDir>/test'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  
  // TypeScript transformation
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
    '!src/**/index.ts',
    '!src/**/*.types.ts',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/core/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/builders/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  
  // Path aliases (matching tsconfig paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@builders/(.*)$': '<rootDir>/src/builders/$1',
    '^@writers/(.*)$': '<rootDir>/src/writers/$1',
    '^@formatters/(.*)$': '<rootDir>/src/formatters/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  
  // Global setup/teardown
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  
  // Test timeout
  testTimeout: 30000,
  
  // Verbose output
  verbose: true,
  
  // Display individual test results
  bail: false,
  
  // Maximum number of concurrent workers
  maxWorkers: '50%',
  
  // Test sequencer
  testSequencer: '<rootDir>/test/testSequencer.ts',
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  
  // Reporters
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/html',
        filename: 'test-report.html',
        expand: true,
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './reports/junit',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
  ],
  
  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  
  // Detect open handles (async operations that didn't close)
  detectOpenHandles: true,
  
  // Force exit after tests complete
  forceExit: false,
  
  // Run tests in parallel
  maxConcurrency: 5,
  
  // Cache configuration
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  
  // Error handling
  errorOnDeprecated: true,
  
  // Display stack trace
  displayName: {
    name: 'SHEETRA',
    color: 'blue',
  },
  
  // Projects (for monorepo)
  projects: undefined,
  
  // Module loaders
  moduleLoader: '<rootDir>/node_modules/ts-jest',
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],
  
  // Module path ignore patterns
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/reports/',
  ],
  
  // Watchman
  watchman: true,
  
  // Worker idle memory limit (in bytes)
  workerIdleMemoryLimit: '512MB',
  
  // Snapshot configuration
  snapshotFormat: {
    printBasicPrototype: true,
    escapeString: true,
  },
  
  // Fake timers
  fakeTimers: {
    enableGlobally: false,
    legacyFakeTimers: false,
  },
  
  // Reset mocks
  resetMocks: false,
  restoreMocks: false,
  clearMocks: true,
  
  // Mock paths
  moduleDirectories: ['node_modules', 'src'],
  
  // Unhandled rejection handling
  unhandledRejectionHandling: 'warn',
  
  // Slow test threshold
  slowTestThreshold: 5,
};

export default config;