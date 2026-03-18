/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|@shopify/restyle)/)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test-utils/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test-utils/jest-setup.ts'],
};
