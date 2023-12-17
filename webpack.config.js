const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const bodyParser = require('body-parser');
const request = require('sync-request');
const express = require('express')
const app = express();

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, "src"),
    entry: './main.js',
    output:  {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./root/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.exec\.js$/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './main.js'),
        },
        compress: true,
        port: 80,
    }
}