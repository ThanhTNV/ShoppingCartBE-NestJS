let CopyWebpackPlugin = require('copy-webpack-plugin');
function modify(buffer) {
  // copy-webpack-plugin passes a buffer
  var package = JSON.parse(buffer.toString());
  // make any modifications you like, such as
  package.scripts = {
    start: 'node main.js',
  };
  // pretty print to JSON with two spaces
  let package_JSON = JSON.stringify(package, null, 2);
  return package_JSON;
}

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './package.json',
          to: 'package.json',
          transform(content, path) {
            return modify(content);
          },
        },
      ],
    }),
  ],
};
