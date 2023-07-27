module.exports = {
  clearMocks: true,
  "bail": 1,
  "verbose": true,
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx"],
  coveragePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/docs/",
    "<rootDir>/build/",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/docs/",
    "<rootDir>/build/",
  ],
  collectCoverageFrom: ["src/**"]
};
