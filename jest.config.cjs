module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    verbose: true,
    transformIgnorePatterns: [
      "node_modules/(?!react-native|native-base|react-clone-referenced-element)"
    ]
  };