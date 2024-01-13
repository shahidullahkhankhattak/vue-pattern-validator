const vue = require('rollup-plugin-vue');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/vue-pattern-validator.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/vue-pattern-validator.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/vue-pattern-validator.umd.js',
      format: 'umd',
      name: 'VuePatternValidator',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    vue(),
    resolve(),
    commonjs()
  ],
  external: ['vue']
};
