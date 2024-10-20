const { configs }    = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");

const angularEslintPlugin = require("@angular-eslint/eslint-plugin");
const nxEslintPlugin      = require("@nx/eslint-plugin");


const compat = new FlatCompat(
  {
    baseDirectory:     __dirname,
    recommendedConfig: configs.recommended,
    allConfig:         configs.all,
  },
);

module.exports = [
  {
    ignores: [
      "*-debug.log",
      ".DS_Store",
      ".angular",
      ".idea",
      ".run",
      "dist",
      "node_modules",
      "tmp",
      ".firebase",
      ".runtimeconfig.json",
      "gha-creds-*.json",
    ],
  },
  {
    plugins: {
      "@angular-eslint": angularEslintPlugin,
      "@nx":             nxEslintPlugin,
    },
  },
  ...compat
    .extends(
      "plugin:@angular-eslint/template/accessibility",
      "plugin:@angular-eslint/template/recommended",
      "plugin:@nx/angular-template",
    )
    .map(
      (config) => ({
        ...config,
        files: [
          "**/*.html",
        ],
      }),
    ),
  ...compat
    .extends(
      "plugin:@nx/typescript",
      "plugin:@nx/angular",
      "plugin:@nx/typescript",
    )
    .map(
      (config) => ({
        ...config,
        files: [
          "**/*.ts",
        ],
      }),
    ),
  {
    files: [
      "**/*.ts",
    ],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow:                         [],
          depConstraints:                [
            {
              onlyDependOnLibsWithTags: [
                "*",
              ],
              sourceTag:                "*",
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
  {
    files: [
      "apps/website/src/app/components/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "standard-website-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
    },
  },
  {
    files: [
      "apps/website/src/app/directives/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "standardWebsite",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
    },
  },
  {
    files: [
      "apps/website/src/app/pipes/src/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/pipe-prefix": [
        "error",
        {
          prefixes: [
            "standardWebsite",
          ],
        },
      ],
    },
  },

  {
    files: [
      "libs/components/src/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "standard-",
          style:  "kebab-case",
          type:   "element",
        },
      ],
    },
  },
  {
    files: [
      "libs/directives/src/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "standard",
          style:  "camelCase",
          type:   "attribute",
        },
      ],
    },
  },
  {
    files: [
      "libs/pipes/src/lib/**/*.ts",
    ],
    rules: {
      "@angular-eslint/pipe-prefix": [
        "error",
        {
          prefixes: [
            "standard",
          ],
        },
      ],
    },
  },
];
