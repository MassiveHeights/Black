export default {
  input: 'src/index.js',
  plugins: [
  ],
  output: [
    {
      format: 'umd',
      name: 'black-engine',
      file: 'dist/black.js'
    },
    {
      format: 'es',
      file: 'dist/black.module.js'
    }
  ]
};
