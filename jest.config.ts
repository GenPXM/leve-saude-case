import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',

  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],

  testRegex: '.*\\.spec\\.ts$',

  extensionsToTreatAsEsm: [
    '.ts',
  ],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  collectCoverageFrom: [
    'src/**/*.(t|j)s',
  ],

  coverageDirectory: './coverage',

  testEnvironment: 'node',

  clearMocks: true,
};

export default config;