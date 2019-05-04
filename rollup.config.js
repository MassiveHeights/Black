export default {
  input: 'src/index.js',
  plugins: [
  ],
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
