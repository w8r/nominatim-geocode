import resolve    from 'rollup-plugin-node-resolve';
import commonjs   from 'rollup-plugin-commonjs';
import buble      from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';

import { version, description, license, name as packageName } from './package.json';

const banner = `
/**
 * ${packageName} v${version}
 * ${description}
 * @preserve
 * @license ${license}
 */
`;
const name = 'nominatim', sourcemap = true;

export default [{
  input: './index.js',
  output: {
    file: `dist/${name}.js`,
    name, sourcemap, banner,
    format: 'umd'
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    buble({ transforms: { dangerousForOf: true }})
  ]
}, {
  input: './example/index.js',
  output: {
    file: `./example/bundle.js`,
    name, sourcemap,
    format: 'iife',
    globals: { leaflet: 'L' },
    external: [ 'leaflet' ]
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    buble({ transforms: { dangerousForOf: true }})
  ]
}, {
  input: './index.js',
  output: {
    file: `dist/${name}.min.js`,
    name, sourcemap, banner,
    format: 'umd'
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    buble({ transforms: { dangerousForOf: true }}),
    uglify()
  ]
}];