const path = require('path');
const fs = require('fs');
const license = require('rollup-plugin-license');

let lic = fs.readFileSync('LICENSE.md').toString();

export default {
  input: 'src/index.js',
  plugins: [license({
    banner: `@preserve
             Blacksmith 2D v<%= pkg.version %>
             
             ${lic}`
  }),],
  output: [
    {
      format: 'umd',
      name: 'black-engine',
      file: 'dist/black-engine.js'
    },
    {
      format: 'es',
      file: 'dist/black-engine.module.js'
    }
  ]
};


