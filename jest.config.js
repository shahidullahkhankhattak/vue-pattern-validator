module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      "^.+\\.vue$": "vue-jest",
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue']
  };
  