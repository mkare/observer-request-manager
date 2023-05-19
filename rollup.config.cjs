const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "bundle.js",
    format: "iife",
    name: "MyModuleName",
    sourcemap: true,
  },
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
