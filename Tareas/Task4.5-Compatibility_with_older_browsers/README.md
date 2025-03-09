# Polyfilling y Transpilación en SGAEA

## Descripción del Proyecto

Este proyecto tiene como objetivo implementar, configurar y verificar el uso de Node.js, Webpack y Babel para realizar polyfilling y transpilación del código del Sistema de Gestión Académica de Estudiantes y Asignaturas (SGAEA). Con esta configuración, se garantiza que el código pueda ejecutarse tanto en navegadores modernos como en versiones antiguas.

## Estructura del Proyecto

```
/Task4.5-Compatibility_with_older_browsers
│
├── /js
│   ├── Asignatura.js
│   ├── Direccion.js
│   ├── Estudiante.js
│   ├── ListaAsignaturas.js
│   ├── ListaEstudiantes.js
│   ├── Persona.js
│   └── index.js
├── .babelrc
├── .gitignore
├── package-lock.json
├── package.json
├── webpack.common.js
├── webpack.legacy.js
├── webpack.modern.js
└── index.html
```

## Configuración del Entorno

### 1. Instalación de Node.js y Creación del Proyecto

Descargar e instalar [Node.js](https://nodejs.org/). Una vez instalado, inicializar el proyecto ejecutando:

```sh
npm init -y
```

### 2. Instalación de Dependencias

Se instalan los paquetes necesarios para la transpilación y compatibilidad:

```sh
npm install --save-dev webpack webpack-cli webpack-merge @babel/core @babel/preset-env babel-loader core-js regenerator-runtime copy-webpack-plugin cross-env html-webpack-plugin
```

**Explicación de los paquetes:**

- `webpack`: Genera bundles de JavaScript.
- `webpack-cli`: Permite ejecutar Webpack desde la terminal.
- `webpack-merge`: Facilita la combinación de configuraciones de Webpack.
- `@babel/core` y `@babel/preset-env`: Configuran Babel para transpilación.
- `babel-loader`: Integra Babel con Webpack.
- `core-js`: Aporta polyfills.
- `regenerator-runtime`: Provee polyfills para funciones asíncronas.
- `copy-webpack-plugin`: Copia archivos estáticos.
- `html-webpack-plugin`: Genera archivos HTML.

## Configuración de Webpack

### `webpack.common.js`

```javascript
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from "path";
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

export default {
    entry: "./js/index.js",
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
```

### `webpack.modern.js`

```javascript
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
      filename: "../index.html", 
    }),
  ],
};


```

### `webpack.legacy.js`

```javascript
import path from "path";
import { fileURLToPath } from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
      template: "index.html",
      filename: "../index.html" // Se guarda dentro de `dist/legacy/`
    })
  ]
};

```

## Configuración de Babel

Se crea el archivo `babel.config.js` con la siguiente configuración:

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  
  "plugins": [
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

## Configuración del HTML

Para asegurar la compatibilidad, el `index.html` debe incluir:

```html
<script type="module" src="./dist/modern/bundle.modern.js"></script>
<script nomodule src="./dist/legacy/bundle.legacy.js"></script>
```

## Creación de Scripts en `package.json`

```json
"scripts": {
    "build:modern": "webpack --config webpack.modern.js",
    "build:legacy": "webpack --config webpack.legacy.js",
    "des": "cross-env modo=development run-s build:legacy build:modern",
    "prod": "run-s build:legacy build:modern",
    "clean:comp": "rimraf compilado",
    "start": "run-s clean:comp des prod"
}
```

## Generación de Bundles y Pruebas de Compatibilidad

Para generar los bundles:

```sh
npm run start
```

Esto creará la carpeta `compilado` con dos subcarpetas:

- `development` (modo desarrollo)
- `production` (modo producción)

Para verificar la compatibilidad en navegadores antiguos, se utilizó **BrowserStack** tras desplegar el proyecto en **Netlify**. Pasos:

1. Crear una cuenta en [Netlify](https://www.netlify.com/).
2. Subir el repositorio.
3. Configurar el directorio de publicación (`compilado/production`).
4. Desplegar el sitio web.

### Pruebas en Navegadores Antiguos

Se probaron los siguientes navegadores en **BrowserStack**:

#### **Opera 28**

![Opera 28](./img/opera28.png)

#### **Mozilla Firefox 42**

![Firefox 42](./img/firefox42.png)

## Conclusiones

- El sistema es compatible con navegadores antiguos y modernos.
- La configuración de Webpack y Babel permite la correcta transpilación.
- Algunos navegadores antiguos muestran problemas menores en estilos CSS.

## Autor

Ana Quero de la Rosa

