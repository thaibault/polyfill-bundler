import typescript from 'typescript-eslint'
import eslintjs from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@stylistic/eslint-plugin-ts'

export default typescript.config(
    {
        extends: [
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
            '@stylistic': typescriptPlugin
        },

        rules: {
            '@typescript-eslint/array-type': ['error', {default: 'generic'}]
        }
    },
    {
        ignores: ["*.js"]
    }
)
