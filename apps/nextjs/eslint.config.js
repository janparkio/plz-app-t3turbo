import baseConfig, { restrictEnvAccess } from "@plz/eslint-config/base";
import nextjsConfig from "@plz/eslint-config/nextjs";
import reactConfig from "@plz/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
