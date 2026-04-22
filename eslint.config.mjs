import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    reactHooks.configs.flat['recommended-latest'],
    {
        ignores: ["node_modules/**", ".next/**", "src/migrations/**", "out/**", "build/**", "next-env.d.ts"]
    }
];

export default eslintConfig;
