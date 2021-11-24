module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts', '!**/node_modules/**'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.spec.+(ts|js)'],
};
