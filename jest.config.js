module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.spec.ts"],
  moduleNameMapper: {
    "^@ng-vagabond-lab/ng-dsv/(.*)$": "<rootDir>/projects/ng-dsv/$1",
  },
  transform: {
    "^.+\\.(ts|mjs|js|html|svg)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
};
