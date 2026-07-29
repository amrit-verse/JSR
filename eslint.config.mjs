import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Strict quality rules
  {
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
      "eqeqeq": ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "curly": ["error", "all"],
      "no-duplicate-imports": "error",
    },
  },
]);

export default eslintConfig;
