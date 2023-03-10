import resolve from '@rollup/plugin-node-resolve';
import commons from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
        exports: 'named',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commons(),
      typescript({tsconfig: './tsconfig-json'}),
      postcss(),
      terser(),
    ],
    external: ['react', 'react-native'],
  },
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
        name: 'named',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commons(),
      typescript({tsconfig: './tsconfig-json'}),
      postcss(),
      terser(),
    ],
    external: ['react', 'react-native'],
  },
];
