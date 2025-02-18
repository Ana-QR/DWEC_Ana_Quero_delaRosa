const path = require("path");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "compilado/legacy"),
        filename: "legacy.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                targets: {
                                    browsers: ["> 1%", "last 2 versions", "ie >= 11"]
                                },
                                useBuiltIns: "entry",
                                corejs: 3
                            }]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
});