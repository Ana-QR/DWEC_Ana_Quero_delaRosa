const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        modern: "./js/script.js",
        legacy: "./js/script.js"
    },
    output: {
        path: path.resolve(__dirname, "compilado"),
        filename: "[name]/[name].js"
    },
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!index.html']
        })
    ]
};