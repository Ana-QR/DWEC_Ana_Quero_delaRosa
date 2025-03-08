# Tarea 6 - Asincronía: Galería de Gatos

Este proyecto consiste en un sitio web con dos páginas, `index.html` y `jquery.html`, que consumen la API de **The Cat API** para mostrar imágenes de gatos de forma dinámica. Cada página utiliza un enfoque diferente para interactuar con la API: una usa **JavaScript** puro y la otra usa **jQuery**.

## Características

- **Dos páginas:** `index.html` y `jquery.html`.
- **Uso de la API** de **The Cat API** para obtener imágenes de gatos.
- **Efecto de desplazamiento infinito (infinite scroll)**: Carga de más imágenes cuando el usuario llega al final de la página.
- **Diseño adaptativo (Responsive Design)** utilizando **TailwindCSS**.
- **Componentes externos de TailwindCSS** para el encabezado y el pie de página.
- **Interactividad**: Las tarjetas tienen un efecto de escala al pasar el ratón.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

```
/Task6-Asynchronous_communication
│ 
├── /dist 
│   └── /css
│       └── styles.css
├── /node_modules 
├── /src 
│   ├── /styles 
│   │   └── input.css
│   ├── /js 
│   │   ├── jquery.js
│   │   └── index.js
│   ├── /assets 
│   │   └── /img
│   ├── index.html 
│   └── jquery.html 
├── package.json 
├── package-lock.json
├── .gitignore
├── tailwind.config.js
└── README.md
```

## Flujo de Trabajo

Este proyecto está configurado para trabajar con **TailwindCSS** y **Node.js**. Se utiliza **PostCSS** como empaquetador para traducir, prefijar, minimizar y empaquetar los archivos CSS. Aquí se describe cómo instalar y ejecutar el proyecto:

### Requisitos

- **Node.js** (recomendado: versión 14.x o superior)
- **npm**

### Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Ana-QR/DWEC_Ana_Quero_delaRosa.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd Task6-Asynchronous_communication
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

### Configuración de TailwindCSS

El proyecto utiliza TailwindCSS para los estilos. Se configura de la siguiente manera:

- `tailwind.config.js`: Configura TailwindCSS para habilitar el uso de clases personalizadas y optimizar los estilos.
- `/src/styles/input.css`: Este archivo importa las directivas de TailwindCSS y las personalizaciones necesarias.

PostCSS se usa para compilar el CSS y generar los archivos finales.

### Compilación y Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Esto iniciará un servidor local y abrirá el sitio web en tu navegador. Los cambios en los archivos se reflejarán automáticamente.

### Producción

Para generar los archivos de producción, ejecuta:

```bash
npm run build
```

Este comando empaquetará el CSS, minimizará los archivos y optimizará el código para producción.

## Descripción de las Páginas

### `index.html` (JavaScript)

- Utiliza JavaScript puro para consumir la API de The Cat API.
- Muestra imágenes de gatos en tarjetas con un efecto de escala al pasar el ratón sobre ellas.
- Implementa el desplazamiento infinito para cargar más imágenes a medida que el usuario se desplaza por la página.

### `jquery.html` (jQuery)

- Utiliza jQuery para realizar las solicitudes AJAX a la API de The Cat API.
- Al igual que `index.html`, muestra tarjetas de gatos con un efecto de escala y el desplazamiento infinito.

## GitHub Repository

- **Nombre del repositorio**: Task6-Asynchronous_communication
- **URL del repositorio**: https://github.com/Ana-QR/DWEC_Ana_Quero_delaRosa/tree/main/Task6-Asynchronous_communication
