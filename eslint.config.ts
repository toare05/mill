import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { plugins: [] },
});

// Next.js 15에 맞는 설정
const eslintConfig: Linter.FlatConfig[] = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "public/**"]
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig; 