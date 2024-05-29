// jest.config.cjs
require('dotenv').config();

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub'
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'css'],
  setupFiles: ['<rootDir>/src/setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx'],
  globals: {
    'babel-jest': {
      useESM: true
    }
  }
};
