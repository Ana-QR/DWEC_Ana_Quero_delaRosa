# Proyecto de Organización del Código

## Descripción del Proyecto

El objetivo principal de este proyecto es aprender a organizar el código JavaScript de manera efectiva y asegurarse de que funcione en navegadores más antiguos. Se utiliza Webpack para la gestión de módulos y transpilación con Babel para mejorar la compatibilidad.

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
└── webpack.config.js
```

## Configuración del Entorno

1. Instalamos Node.js.
2. Navegamos a la carpeta del proyecto y ejecutamos `npm install` para instalar las dependencias.
3. Instalamos Webpack y Webpack CLI ejecutando:
   ```sh
   npm install --save-dev webpack webpack-cli
   ```
4. Instalamos Babel y sus complementos para transpilación de código moderno a versiones más antiguas:
   ```sh
   npm install --save-dev @babel/core @babel/preset-env babel-loader
   ```
5. Configuramos Webpack y Babel en `webpack.config.js` y `.babelrc`.

## Scripts

- `npm run build`: Compila el código para producción.
- `npm start`: Inicia un servidor de desarrollo con Webpack Dev Server.

## Configuración de Webpack

Asegúrate de que el archivo `webpack.config.js` incluya la siguiente configuración básica:

```js
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
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
```

## Subir el Código a un Proveedor de Hosting

1. Creamos una cuenta en Netlify.
2. Conectamos el repositorio de GitHub, GitLab o Bitbucket.
3. Configuramos los ajustes de compilación:
    - Build command: `npm run build`
    - Publish directory: `dist`
4. Hacemos clic en "Deploy site".

## Probar el Código

1. Creamos una cuenta en BrowserStack.
2. Seleccionamos "Live" para probar el sitio web en tiempo real.
3. Ingresamos la URL del sitio web desplegado en Netlify.
4. Seleccionamos los navegadores y dispositivos para probar.
5. Realizamos las pruebas y verificamos que todo funcione correctamente.

## Resultados de la Prueba

### Resultados de las Pruebas en BrowserStack

1. **Navegador: Internet Explorer 11**
    - **Resultado:** El sitio web se carga correctamente, pero algunos estilos CSS no se aplican como se esperaba.
    - **Problemas Encontrados:**
      - Los bordes redondeados no se muestran.
      - Algunos elementos de flexbox no se alinean correctamente.

2. **Navegador: Firefox 45**
    - **Resultado:** El sitio web funciona bien, pero hay problemas menores con la tipografía.
    - **Problemas Encontrados:**
      - Las fuentes personalizadas no se cargan en algunos casos.

3. **Navegador: Safari 9**
    - **Resultado:** El sitio web tiene problemas de rendimiento y algunos elementos no se muestran.
    - **Problemas Encontrados:**
      - Las animaciones CSS son lentas.
      - Algunos íconos SVG no se renderizan.

4. **Navegador: Chrome 49**
    - **Resultado:** El sitio web se comporta como se esperaba sin problemas significativos.
    - **Problemas Encontrados:** Ninguno.

### Conclusiones

En general, el sitio web es compatible con la mayoría de los navegadores más antiguos, aunque se encontraron algunos problemas menores que deben ser abordados para mejorar la compatibilidad y la experiencia del usuario.

## Autor

Ana Quero de la Rosa