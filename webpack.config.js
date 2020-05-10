const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: 'js/app.js',
		path: path.resolve(__dirname, 'public', 'dist'),
	},
	module: {
		rules: [
			{
				loader:  'babel-loader',
				test:    /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false, sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/style.css"
		})
	],
	devtool: 'source-map'
};