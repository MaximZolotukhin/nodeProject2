import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	// Игнорирование
	{
		ignores: ["dist", "node_modules"],
	},

	// Базовые рекомендации от ESLint
	pluginJs.configs.recommended,

	// Рекомендации от TypeScript ESLint
	...tseslint.configs.recommended,

	// Глобальные переменные и настройки парсера
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
			parserOptions: {
				project: true, // или ["./tsconfig.json"]
			},
		},
	},

	// Правила для .ts/.tsx файлов
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			prettier: prettierPlugin,
		},
		rules: {
			...eslintConfigPrettier.rules,
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"prettier/prettier": [
				"error",
				{
					singleQuote: true,
					useTabs: true,
					semi: true,
					trailingComma: "all",
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: "auto",
				},
			],
		},
	},
];
