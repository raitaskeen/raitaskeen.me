import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextConfig,
];

export default eslintConfig;
