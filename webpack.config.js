const path = require('path');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public', 'dist', 'js'),
	},
	module: {
		rules: [
			{
				loader:  'babel-loader',
				test:    /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	}
};