import path from "path";
import { fileURLToPath } from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  entry: "./js/index.js",
  output: {
    filename: "bundle.legacy.js",
    path: path.resolve(__dirname, "dist/legacy"), // Guardar en la carpeta correcta
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
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["> 0.2%", "not dead", "ie 11", "firefox 43"]
                  },
                  useBuiltIns: "entry",
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html", // Copia automáticamente `index.html`
      filename: "index.html" // Se guarda dentro de `dist/legacy/`
    })
  ]
};
