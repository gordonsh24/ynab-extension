const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


require('dotenv').config({ path: './config/dev.env' });


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
		}),
		new webpack.DefinePlugin({
			'process.env.YNAB_TOKEN': JSON.stringify(process.env.YNAB_TOKEN),
			'process.env.FIXER_TOKEN': JSON.stringify(process.env.FIXER_TOKEN),
		})
	],
	devtool: 'source-map'
};