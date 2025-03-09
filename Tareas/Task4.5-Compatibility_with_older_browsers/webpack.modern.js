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
    filename: "bundle.modern.js",
    path: path.resolve(__dirname, "dist/modern"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html", // Usa el `index.html` original
      filename: "index.html",
    }),
  ],
};

