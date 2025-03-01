import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { plugins: [] },
});

// Use a simpler configuration that's compatible with Next.js 15
const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "public/**"]
  },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
