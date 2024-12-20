module.exports = {
  root: true,
  env: {
    amd: true,
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
    semi: "off",
    "no-async-promise-executor": "off",
    "no-undef": "off",
    "quotes": [2, "double", { "avoidEscape": true }]
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  globals: {
    wx: "writable",
    PIXI: "writable",
    canvas: "writable",
    pixiUtil: "writable",
  },
};
