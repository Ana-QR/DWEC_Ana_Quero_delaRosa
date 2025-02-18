# Proyecto JS - Documentación del Código usando JSDoc

Este proyecto tiene como objetivo documentar el código utilizando JSDoc para mejorar la legibilidad y mantenibilidad del código fuente.

## Estructura del Proyecto

El proyecto sigue la siguiente estructura de carpetas y archivos:

```
├── .gitignore
├── jsdoc.json
├── package-lock.json
├── package.json
├── Task4-3-JSdoc.js
├── README.md
```

- **`.gitignore`**: Archivo que especifica qué archivos o directorios deben ser ignorados por Git.
- **`jsdoc.json`**: Archivo de configuración para JSDoc.
- **`package-lock.json`**: Archivo que asegura que las instalaciones de dependencias sean reproducibles.
- **`package.json`**: Archivo que contiene la información del proyecto y las dependencias necesarias.
- **`Task4-3-JSdoc.js`**: Archivo JavaScript con ejemplos y tareas relacionadas con JSDoc.
- **`README.md`**: Este archivo con instrucciones para instalar, ejecutar y contribuir al proyecto.

## Instalación

Para instalar dependencias necesarias (si aplica), ejecuta el siguiente comando en la terminal:

```bash
npm install
```

Si el proyecto no requiere paquetes adicionales, simplemente asegúrate de tener un navegador moderno para ejecutar el código.

## Uso

Para ejecutar el proyecto, abre el archivo `index.html` en tu navegador preferido. 

Si deseas generar la documentación en HTML utilizando JSDoc, sigue estos pasos:

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Instala JSDoc de manera global si no lo tienes:

    ```bash
    npm install -g jsdoc
    ```

3. Genera la documentación ejecutando el siguiente comando en la terminal dentro del directorio del proyecto:

    ```bash
    jsdoc main.js -d docs
    ```

4. La documentación generada se guardará en la carpeta `docs`. Abre `docs/index.html` en tu navegador para visualizarla.

## Convenciones de Documentación con JSDoc

Para documentar funciones, clases y objetos, sigue las convenciones de JSDoc. Ejemplo de documentación de una función:

```js
/**
 * Calcula la suma de dos números.
 * @param {number} a - El primer número.
 * @param {number} b - El segundo número.
 * @returns {number} La suma de los dos números.
 */
function sumar(a, b) {
     return a + b;
}
```

## Contribuciones

Las contribuciones al proyecto son bienvenidas. Para colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y confirma los commits (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio principal.

## Recursos Adicionales

- [Documentación oficial de JSDoc](https://jsdoc.app/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Markdown Guide](https://www.markdownguide.org/)
