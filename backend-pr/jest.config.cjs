module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.js',
    '!src/**/*.{test,spec}.js',
    '!**/src/handler.js',
    '!**/src/local.js',
    '!**/src/db/**',
    '!**/src/config/**',
    '!**/src/repository/**',
    '!**/src/routes/**'

  ],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text'],
  testEnvironment: 'node',
  globals: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50
  }
}
