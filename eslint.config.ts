import typescript from 'typescript-eslint'
import eslintjs from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@stylistic/eslint-plugin-ts'

export default typescript.config(
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        ignores: ['*.mjs', '*.js']
    }
)
