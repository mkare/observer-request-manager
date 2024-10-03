// rollup.config.cjs
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const path = require("path");

module.exports = {
  input: "src/index.ts",
  output: {
    file: path.resolve(__dirname, "dist", "bundle.js"), // Output to the dist folder
    format: "iife",
    name: "MyModuleName",
    sourcemap: true,
  },
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
