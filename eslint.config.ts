import typescript from 'typescript-eslint'
import eslintjs from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import javascriptPlugin from '@stylistic/eslint-plugin'

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
