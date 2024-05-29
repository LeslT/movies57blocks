// require('dotenv').config();

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub'
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'css'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.jsx'],
  globals: {
    'babel-jest': {
      useESM: true
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.js',
    '!src/**/*.{test,spec}.js',
    '!**/src/handler.js',
    '!**/src/local.js',
    '!*/src/db/*',
    '!*/src/config/*',
    '!*/src/repository/*',
    '!*/src/routes/*'
  ],
};
