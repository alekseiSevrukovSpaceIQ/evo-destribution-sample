import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export const packageJson = require('package.json');

const styledComponentsTransformer = createStyledComponentsTransformer({
  displayName: false,
  componentIdPrefix: 'dsx',
});

export const plugins = [
  peerDepsExternal(),
  nodeResolve(),
  commonjs(),
  json(),
  image(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: [
        'src/**/tests/**',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx'
      ],
    },
  }),
  babel({
    exclude: ['node_modules/**'],
    presets: ['module:metro-react-native-babel-preset'],
    babelHelpers: 'bundled',
  }),
  terser()
];

export const subFolderPlugins = (folderName, direction) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${direction}/${folderName}`,
      private: true,
      main: './index.js',
      module: './index.js',
      types: `./index.d.ts`,
    },
  }),
];
