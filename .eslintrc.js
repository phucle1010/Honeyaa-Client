module.exports = {
    root: true,
    extends: '@react-native-community',
    ignorePatterns: ['temp.js', '**/vendor/*.js'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
