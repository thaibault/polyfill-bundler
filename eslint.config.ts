import typescript from 'typescript-eslint'
import {defineConfig} from 'eslint/config'

import eslintjs from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import javascriptPlugin from '@stylistic/eslint-plugin'

export const config = defineConfig(
    {
        extends: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            eslintjs.configs.recommended,
            ...typescript.configs.strictTypeChecked,
            ...typescript.configs.strict,
            ...typescript.configs.stylistic
        ],
        files: ['*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: typescriptParser,
            parserOptions: {
                impliedStrict: true,
                project: './tsconfig.json'
            },
            sourceType: 'module'
        },
        plugins: {
            '@stylistic': javascriptPlugin
        },

        rules: {
            '@typescript-eslint/array-type': ['error', {default: 'generic'}]
        }
    },
    {
        ignores: ['*.mjs', '*.js']
    }
)

export default config
