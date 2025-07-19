/* eslint-disable import/no-anonymous-default-export */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    {
        ignores: [
            'node_modules/',
            'dist/',
            'build/',
            '*.min.js',
            '.next/',
            'public/',
            'styles/favicon.ico',
            'next-env.d.ts',
            '*.config.ts',
            '*.config.mjs',
            'tsconfig.json',
        ],
    },
    ...compat.extends(
        'next/core-web-vitals',
        'next',
        'next/typescript'
    ),
    {
        files: ['**/*.{ts,tsx,cts,mts}'],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true,
            },
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'better-tailwindcss': eslintPluginBetterTailwindcss,
        },
        rules: {
            // enable all recommended rules to report a warning
            ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
            // enable all recommended rules to report an error
            ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
            // or configure rules individually
            'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100, indent: 4 }],
            'better-tailwindcss/no-unregistered-classes': 'off',
            // Enforce 4-space indentation for TSX (JSX) and props
            'indent': ['error', 4],
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
        },
        settings: {
            'better-tailwindcss': {
                // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
                entryPoint: 'src/global.css',
                // tailwindcss 3: the path to the tailwind config file (eg: `tailwind.config.js`)
                tailwindConfig: 'tailwind.config.js',
            },
        },
    },
];
