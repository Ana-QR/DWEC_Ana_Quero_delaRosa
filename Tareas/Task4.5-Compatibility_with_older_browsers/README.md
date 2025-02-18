# Proyecto de Organización del Código

## Descripción del Proyecto

El objetivo de este proyecto es aprender a organizar el código JavaScript de manera efectiva, asegurando su funcionamiento en navegadores más antiguos. Se utiliza Webpack para la gestión de módulos y transpilación con Babel, lo que mejora la compatibilidad entre versiones modernas y antiguas de los navegadores.

## Estructura del Proyecto

```
/Task4-5-Compatibility_with_older_browsers
│
├── /js
│   ├── Asignatura.js
│   ├── Direccion.js
│   ├── Estudiante.js
│   ├── ListaAsignaturas.js
│   ├── ListaEstudiantes.js
│   ├── Persona.js
│   └── Task4-5-Compatibility_with_older_browsers.js
├── .babelrc
├── .gitignore
├── package-lock.json
├── package.json
├── webpack.common.js
├── webpack.legacy.js
└── webpack.modern.js
```

## Configuración del Entorno

1. Instalar [Node.js](https://nodejs.org/) en su versión recomendada.
2. Clonar este repositorio en tu máquina local usando el siguiente comando:
    ```sh
    git clone <url-del-repositorio>
    ```
3. Navegar a la carpeta del proyecto y ejecutar `npm install` para instalar todas las dependencias necesarias.
4. Instalar Webpack y Webpack CLI:
    ```sh
    npm install --save-dev webpack webpack-cli
    ```
5. Instalar Babel y sus complementos para la transpilación de código:
    ```sh
    npm install --save-dev @babel/core @babel/preset-env babel-loader
    ```
6. Configurar Webpack y Babel mediante los archivos `webpack.common.js`, `webpack.legacy.js`, `webpack.modern.js` y `.babelrc`.

## Scripts

- `npm run build:modern`: Compila el código para navegadores modernos.
- `npm run build:legacy`: Compila el código para navegadores antiguos.
- `npm start`: Inicia un servidor de desarrollo.

## Configuración de Webpack

El proyecto utiliza tres configuraciones de Webpack para manejar diferentes entornos y compatibilidades:

1. **webpack.common.js**: Contiene la configuración común que se comparte entre las configuraciones modernas y heredadas.
2. **webpack.legacy.js**: Configuración específica para navegadores más antiguos.
3. **webpack.modern.js**: Configuración específica para navegadores modernos.

### webpack.common.js

```javascript
const path = require('path');

module.exports = {
    entry: './js/Task4-5-Compatibility_with_older_browsers.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
```

### webpack.legacy.js

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    target: ['web', 'es5'],
    output: {
        filename: 'bundle.legacy.js'
    }
});
```

### webpack.modern.js

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    target: 'web',
    output: {
        filename: 'bundle.modern.js'
    }
});
```

## Uso de Babel

Babel se utiliza para transpirar el código JavaScript moderno a una versión compatible con navegadores más antiguos. La configuración de Babel se encuentra en el archivo `.babelrc`:

```json
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["last 2 versions", "ie >= 11"]
            }
        }]
    ]
}
```

Con esta configuración, Babel se encargará de convertir el código ES6+ a una versión compatible con los navegadores especificados.

## Subir el Código a un Proveedor de Hosting

1. Crear una cuenta en Netlify.
2. Conectar el repositorio de GitHub, GitLab o Bitbucket.
3. Configurar los ajustes de compilación:
    - Comando de build: `npm run build:modern` o `npm run build:legacy`
    - Directorio de publicación: `dist`
4. Hacer clic en "Deploy site" para desplegar el sitio web.

## Pruebas de Compatibilidad

1. Crear una cuenta en BrowserStack.
2. Seleccionar la opción "Live" para probar el sitio web en tiempo real.
3. Ingresar la URL del sitio desplegado en Netlify.
4. Seleccionar los navegadores y dispositivos para realizar las pruebas.
5. Comprobar que todo funcione correctamente en los diferentes navegadores.

## Resultados de las Pruebas

### Resultados de las Pruebas en BrowserStack

- **Navegador: Internet Explorer 11**
  - Resultado: El sitio web se carga correctamente, aunque algunos estilos CSS no se aplican como se esperaba.
  - Problemas Encontrados:
    - Los bordes redondeados no se muestran correctamente.
    - Algunos elementos de flexbox no se alinean bien.

- **Navegador: Firefox 45**
  - Resultado: El sitio web funciona bien, pero con algunos problemas menores de tipografía.
  - Problemas Encontrados:
    - Las fuentes personalizadas no se cargan de forma consistente.

- **Navegador: Safari 9**
  - Resultado: El sitio web presenta problemas de rendimiento y algunos elementos no se muestran correctamente.
  - Problemas Encontrados:
    - Las animaciones CSS son lentas.
    - Algunos íconos SVG no se renderizan correctamente.

- **Navegador: Chrome 49**
  - Resultado: El sitio web funciona correctamente sin problemas significativos.
  - Problemas Encontrados: Ninguno.

## Conclusiones

En general, el sitio web es compatible con la mayoría de los navegadores más antiguos, aunque se han encontrado algunos problemas menores. Estos problemas pueden solucionarse mediante ajustes adicionales en el CSS y la optimización de la transpilación con Babel.

## Autor

Ana Quero de la Rosa