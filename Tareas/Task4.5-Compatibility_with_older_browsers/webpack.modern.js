const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

export default merge(common, {
    output: {
        filename: "./modern.js",
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
                                    esmodules: true
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    }
});