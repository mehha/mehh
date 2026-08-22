import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    ignores: [
      '.next/',
      '.open-next/',
      '.tmp/',
      '.wrangler/',
      '**/build/',
      '**/dist/',
      '**/node_modules/',
      '**/temp/',
      'cloudflare-env.d.ts',
      'jest.config.js',
      'playwright.config.ts',
      'src/payload-generated-schema.ts',
      'src/payload-types.ts',
    ],
  },
]

export default eslintConfig
