module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-eval": "error",
        "no-unsafe-finally": "error",
        "no-var": "error",
        "react/prop-types": "off"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
