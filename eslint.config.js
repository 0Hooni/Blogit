const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const { rules } = require("eslint-config-prettier");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      // Expo
      ".expo/**",
      ".expo-shared/**",

      // Dependencies
      "node_modules/**",

      // Build outputs
      "dist/**",
      "build/**",
      "web-build/**",

      // Logs
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",

      // Environment variables
      ".env*",

      // Coverage directory used by tools like istanbul
      "coverage/**",

      // Bundle and minified files
      "*.bundle.js",
      "*.min.js",

      // Git
      ".git/**",

      // macOS
      ".DS_Store",

      // IDE
      ".vscode/**",
      ".idea/**",
    ],
  },
  {
    rules: {
      "no-unused-vars": "off",
      "import/no-named-as-default": "off",
    },
  },
]);
