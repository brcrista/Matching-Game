const path = require('path');

module.exports = {
  entry: './out/main.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
    library: 'main'
  },
};