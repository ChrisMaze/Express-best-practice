/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20000,
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1",
  },
  clearMocks: true,
  collectCoverage: true,
};
