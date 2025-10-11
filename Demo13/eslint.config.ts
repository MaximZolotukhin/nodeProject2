import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["dist", "node_modules"],
	},

	pluginJs.configs.recommended,

	...tseslint.configs.recommended,

	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.node,
			},
			parser: tseslint.parser, // явно указываем парсер
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname, // ✅ КЛЮЧЕВАЯ СТРОКА
			},
		},
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
					singleQuote: false,
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
