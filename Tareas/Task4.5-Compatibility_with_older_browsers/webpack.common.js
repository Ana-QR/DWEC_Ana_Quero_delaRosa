import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from "path";
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

export default {
    entry: "./js/Task4-5-Compatibility_with_older_browsers.js",
    output: {
        path: path.resolve(process.cwd(), 'compilado', process.env.modo),
        filename: "[name].js"
    },
    mode: process.env.modo,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css|html)$/,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './index.html', to: '.' }, 
            ],
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!index.html']
        })
    ],
};