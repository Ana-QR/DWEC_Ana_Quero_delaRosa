/**
 * Hecho por: Ana Quero de la Rosa
 */

/*https://ana-qr.github.io/DWEC_QueroDeLaRosa_Ana-tareas/primertrimestre/index.html */

/**
 * 2. Definición de Clases
 * 
 * En esta parte se definen las clases Direccion, Estudiante y Asignatura, con sus respectivas funcionalidades.
 * Se incluye validación de datos, métodos para gestionar información y ejemplos de uso.
 */

/**
 * 2.1. Clase Direccion
 * 
 * Representa una dirección postal.
 * Atributos: calle, número, piso, código postal, provincia y localidad. Todos son privados.
 * Métodos:
 *  - Constructor: Permite inicializar los datos, validando el código postal (5 dígitos).
 *  - Getter y Setter: Para acceder y modificar cada atributo.
 *  - toString(): Devuelve una representación en texto de la dirección.
 */


class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#provincia = provincia;
        this.#localidad = localidad;
        this.#codigoPostal = this.validarCodigoPostal(codigoPostal);
    }

    get calle() {
        return this.#calle;
    }

    set calle(calle) {
        this.#calle = calle;
    }

    get numero() {
        return this.#numero;
    }

    set numero(numero) {
        this.#numero = numero;
    }

    get piso() {
        return this.#piso;
    }

    set piso(piso) {
        this.#piso = piso;
    }

    get codigoPostal() {
        return this.#codigoPostal;
    }

    set codigoPostal(codigoPostal) {
        this.#codigoPostal = codigoPostal;
    }

    get provincia() {
        return this.#provincia;
    }

    set provincia(provincia) {
        this.#provincia = provincia;
    }

    get localidad() {
        return this.#localidad;
    }

    set localidad(localidad) {
        this.#localidad = localidad;
    }

    validarCodigoPostal(codigoPostal) {
        const regex = /^\d{5}$/;  // Expresión regular para verificar que sea un código postal de 5 dígitos
        return regex.test(codigoPostal) ? codigoPostal : "00000";  // Si es válido, devuelve el codigo postal; si no, pone "00000"
    }

    toString() {
        return `${this.#calle}, ${this.#numero}, ${this.#piso}, ${this.#codigoPostal}, ${this.#provincia}, ${this.#localidad}`;
    }


}

/**
 * 2.2. Clase Estudiante
 * 
 * Representa un estudiante con atributos como ID, nombre, edad, dirección y asignaturas matriculadas.
 * Métodos:
 *  - Matricular/desmatricular asignaturas.
 *  - Agregar calificaciones.
 *  - Calcular el promedio de las calificaciones.
 *  - Buscar asignaturas por patrón de texto.
 */
class Estudiante {
    #id;
    #nombre; //el nombre debe tener solo letras y espacios
    #edad;
    #direccion;
    #asignaturas;

    constructor(id, nombre, edad, direccion) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) { //el gorrito indica una negacion, coincidirá con cualquier carácter que no esté dentro de los corchetes y el \s es para que coincida con cualquier caracter de espacio en blanco
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#id = id;
        this.#nombre = nombre;
        this.#edad = edad >= 0 ? edad : 0; //si la edad es negativa se inicializa a 0, esto ayuda a que no puedan haber edades negativas
        this.#direccion = direccion;
        this.#asignaturas = new Map();
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nuevoNombre) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nuevoNombre)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nuevoNombre;
    }

    get edad() {
        return this.#edad;
    }

    set edad(nuevaEdad) {
        if (nuevaEdad < 0) {
            throw new Error("La edad debe ser un número positivo");
        }
        this.#edad = nuevaEdad;
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(nuevaDireccion) {
        if (!(nuevaDireccion instanceof Direccion)) {
            throw new Error("La dirección debe ser una instancia de la clase direccion");
        }
        this.#direccion = nuevaDireccion;
    }

    get asignaturas() {
        return { ...this.#asignaturas };
    }

    toString() {
        return `${this.#id}, ${this.#nombre}, ${this.#edad}, ${this.#direccion}, ${this.#asignaturas}`;
    }

    // Matricular al estudiante en una asignatura
    matricular(asignatura) {
        if (!this.#asignaturas[asignatura]) {
            this.#asignaturas[asignatura] = { calificaciones: [], fechaMatricula: new Date(), fechaDesmatricula: null };
            console.log(`Estudiante ${this.#nombre} matriculado en ${asignatura}`);
        } else {
            console.log(`El estudiante ${this.#nombre} ya está matriculado en ${asignatura}`);
        }
    }

    desmatricular(asignatura) {
        if (!this.#asignaturas[asignatura]) {
            throw new Error(`La asignatura "${asignatura}" no está registrada`);
        } else {
            delete this.#asignaturas[asignatura];
            console.log(`Estudiante ${this.#nombre} desmatriculado de ${asignatura}`);
        }

    }

    //cada estudiante puede recibir varias clasificaciones por asignatura. Numeros entre 0 y 10
    calificar(asignatura, calificacion) {
        if (this.#asignaturas[asignatura]) {
            if (calificacion >= 0 && calificacion <= 10) {
                this.#asignaturas[asignatura].calificaciones.push(calificacion);
                console.log(`La calificación ${calificacion} se ha añadido a ${asignatura} para ${this.#nombre}`);
            } else {
                console.log("La calificación debe ser entre 0 y 10");
            }
        } else {
            console.log(this.#nombre + " no está matriculado en " + asignatura);
        }

    }

    //media de las notas del estudiante
    calcularPromedio() {
        // Filter out subjects with no grades
        const asignaturasCalificadas = Object.values(this.#asignaturas).filter(asignatura => asignatura.calificaciones.length > 0);

        if (asignaturasCalificadas.length === 0) return "Sin evaluar";

        const resultado = asignaturasCalificadas.reduce((suma, asignatura) => {
            const promedioAsignatura = asignatura.calificaciones.reduce((a, b) => a + b, 0) / asignatura.calificaciones.length;
            return suma + promedioAsignatura;
        }, 0) / asignaturasCalificadas.length;

        return Number(resultado).toFixed(2);
    }


    //buscar asignaturas según un patrón de texto
    buscarAsignaturas(patron) {
        const regex = new RegExp(patron, "i");
        return Object.keys(this.#asignaturas).filter(asignatura => regex.test(asignatura));
    }


}



/**
 * 2.3. Clase Asignatura
 * 
 * Representa una asignatura con un nombre y calificaciones asociadas.
 * Métodos:
 *  - Añadir calificaciones.
 *  - Obtener el promedio de calificaciones.
*/

class Asignatura {
    #nombre;
    #calificaciones; //son las calificaciones generales, no están asociadas a ningún estudiante
    #estudiantes;

    constructor(nombre) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) {
            throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = []; //calificaciones generales
        this.#estudiantes = new Map() // map para asociar los estudiantes son sus calificaciones
    }

    get nombre() {
        return this.#nombre;
    }

    get calificaciones() {
        return this.#calificaciones;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    set calificaciones(calificaciones) {
        this.#calificaciones = calificaciones;
    }

    get estudiantes() {
        return this.#estudiantes;
    }

    set estudiantes(estudiantes) {
        this.#estudiantes = estudiantes;
    }

    addEstudiante(estudiante) {
        if (this.#estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} ya está matriculado en ${this.#nombre}`);
        } else {
            this.#estudiantes.set(estudiante, []); //se inicializa un array vacío para sus calificaciones
        }
    }

    eliminarEstudiante(estudiante) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}`);
        } else {
            this.estudiantes.delete(estudiante); //se elimina el estudiante de la asignatura
        }
    }

    calificar(estudiante, nota) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}.`);
        } else if (nota < 0 || nota > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        } else {
            this.estudiantes.get(estudiante).push(nota); //añade la nota al array del estudiante
        }

    }

    addCalificacion(calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        } else {
            this.#calificaciones.push(calificacion);//añade calificaciones generales
        }
    }

    eliminarCalificacion(calificacion) {
        const indiceCalificacion = this.#calificaciones.indexOf(calificacion);

        if (indiceCalificacion == -1) throw new Error("Ningún estudiante ha sacado dicha calificación.");

        this.#calificaciones.splice(indiceCalificacion, 1);
    }

    toString() {
        return `${this.#nombre}, ${this.#calificaciones}, ${this.#estudiantes}`;
    }

}

//Herencia
class Lista {
    #elementos;
    constructor() {
        this.#elementos = [];
    }

    get elementos() {
        return [...this.#elementos]; //lo que tiene la lista
    }

    add(elemento) {
        if (!this.#elementos.includes(elemento)) {
            this.#elementos.push(elemento);
            console.log("Se han añadido nuevos elementos a la lista");
        } else {
            throw new Error("El elemento ya existe en la lista");
        }
    }

    borrar(elemento) {
        const longitudInicial = this.#elementos.length;
        this.#elementos = this.#elementos.filter(i => i !== elemento);
        if (this.#elementos.length === longitudInicial) {
            throw new Error("El elemento no se ha encontrado en la lista")
        }
    }

    buscar(patron) {
        const regex = new RegExp(patron, 'i');
        return this.#elementos.filter(elemento => regex.test(elemento.nombre || elemento.toString()));
    }

    get size() {
        return this.#elementos.length;
    }

    // Método protegido para las subclases
    _getElementos() {
        return this.#elementos;
    }
}

/**
 * 2.3. Clase ListaEstudiantes
 */

class ListaEstudiantes extends Lista {
    constructor(...estudiantes) {
        super();

        for (const estudiante of estudiantes) {

            this.addEstudiante(estudiante);

        }
    }

    get promedioGeneral() {
        const estudiantes = this._getElementos();
        if (estudiantes.length === 0) return 0;
        const total = estudiantes.reduce((sum, estudiante) => sum + parseFloat(estudiante.calcularPromedio()), 0);
        return (total / estudiantes.length).toFixed(2);
    }

    addEstudiante(estudiante) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("Solo se pueden añadir objetos de tipo Estudiante.");
        } else {
            super.add(estudiante);
        }
    }

    encontrarPorNombre(nombre) {
        return super.buscar(nombre);
    }

    mostrarDatos() {
        console.log("Reporte de estudiantes:");
        this._getElementos().forEach(estudiante => {
            console.groupCollapsed(`Estudiante: ${estudiante.nombre}`);
            console.log(`ID: ${estudiante.id}`);
            console.log(`Edad: ${estudiante.edad}`);
            console.log(`Promedio de calificaciones: ${estudiante.calcularPromedio()}`);
            console.log(`Asignaturas: ${Object.keys(estudiante.asignaturas).join(', ')}`);
            console.groupEnd();
        });
    }

}


/**
 * 2.5. Clase ListaAsignaturas
*/

class ListaAsignaturas extends Lista {
    constructor(...asignaturas) {
        super();

        for (const asignatura of asignaturas) {

            this.addAsignatura(asignatura);

        }
    }

    addAsignatura(asignatura) {
        if (!(asignatura instanceof Asignatura)) {
            throw new Error("Solo se pueden añadir objetos de tipo asignatura")
        } else {
            this.add(asignatura);
        }
    }

    obtenerPromedioCalificaciones() {
        const asignaturas = this._getElementos();
        return asignaturas.map(asignatura => ({
            nombre: asignatura.nombre,
            promedio: asignatura.getPromedio()
        }));
    }
}

//PROGRAMA
// Inicialización de estructuras de datos
const listaEstudiantes = [];
const listaAsignaturas = [];
const listaDirecciones = [];

// Función para mostrar el menú
function mostrarMenu() {
    console.log("\nMenú de opciones:");
    console.log("1. Crear dirección");
    console.log("2. Crear estudiante");
    console.log("3. Crear asignatura");
    console.log("4. Eliminar dirección");
    console.log("5. Eliminar estudiante");
    console.log("6. Eliminar asignatura");
    console.log("7. Matricular a un estudiante en una asignatura");
    console.log("8. Desmatricular a un estudiante de una asignatura");
    console.log("9. Mostrar direcciones");
    console.log("10. Mostrar estudiantes");
    console.log("11. Mostrar asignaturas");
    console.log("12. Calificar estudiante");
    console.log("13. Buscar estudiante");
    console.log("14. Buscar asignatura");
    console.log("15. Calcular promedio general");
    console.log("0. Salir");
}

// Función principal
function main() {
    let eleccion;
    do {
        mostrarMenu();
        eleccion = parseInt(prompt("Ingrese el número de la opción deseada:"));

        switch (eleccion) {
            case 1:
                crearDireccion();
                break;
            case 2:
                crearEstudiante();
                break;
            case 3:
                crearAsignatura();
                break;
            case 13:
                const nombreEstudiante = prompt("Ingrese el nombre del estudiante a buscar: ");
                buscar(nombreEstudiante);
                break;

            case 14:
                const nombreAsignatura = prompt("Ingrese el nombre de la asignatura a buscar: ");
                buscar(nombreAsignatura);
                break;

            case 15:
                console.log("Seleccione un estudiante para calcular el promedio:");
                listaEstudiantes.forEach((estudiante, indice) => {
                    console.log(`${indice + 1}. ${estudiante.nombre}`);
                });
                const indiceEstudiantePromedio = parseInt(prompt("Ingrese el número del estudiante: ")) - 1;
                if (indiceEstudiantePromedio >= 0 && indiceEstudiantePromedio < listaEstudiantes.length) {
                    const estudianteParaPromedio = listaEstudiantes[indiceEstudiantePromedio];
                    const promedio = estudianteParaPromedio.calcularPromedio();
                    console.log(`El promedio de calificaciones de ${estudianteParaPromedio.nombre} es: ${promedio}`);
                } else {
                    console.log("Índice de estudiante no válido.");
                }
                break;

            case 0:
                console.log("Saliendo del programa...");
                break;

            default:
                console.log("Opción no válida. Intente de nuevo.");

        }
    } while (eleccion !== 0);
}

// Funciones auxiliares
function crearDireccion() {
    const calle = prompt("Ingrese la calle:");
    const numero = prompt("Ingrese el número:");
    const piso = prompt("Ingrese el piso (opcional):");
    const codigoPostal = prompt("Ingrese el código postal:");
    const provincia = prompt("Ingrese la provincia:");
    const localidad = prompt("Ingrese la localidad:");

    listaDirecciones.push(new Direccion(calle, numero, piso, codigoPostal, provincia, localidad));
    console.log("Dirección creada con éxito.");
}

function crearEstudiante() {
    const id = parseInt(prompt("Ingrese el ID del estudiante:"));
    const nombre = prompt("Ingrese el nombre del estudiante:");
    const edad = parseInt(prompt("Ingrese la edad del estudiante:"));

    console.log("Seleccione una dirección para el estudiante:");
    listaDirecciones.forEach((direccion, indice) => {
        console.log(`${indice + 1}. ${direccion}`);
    });

    const indiceDireccion = parseInt(prompt("Ingrese el número de la dirección:")) - 1;
    if (indiceDireccion >= 0 && indiceDireccion < listaDirecciones.length) {
        const direccionEstudiante = listaDirecciones[indiceDireccion];
        listaEstudiantes.push(new Estudiante(id, nombre, edad, direccionEstudiante));
        console.log("Estudiante creado con éxito.");
    } else {
        console.log("Índice de dirección no válido.");
    }
}

function crearAsignatura() {
    const nombreAsignatura = prompt("Ingrese el nombre de la asignatura:");
    listaAsignaturas.push(new Asignatura(nombreAsignatura));
    console.log("Asignatura creada con éxito.");
}

//Funciones para eliminar
function eliminarEstudiante(){
    const id = parseInt(prompt("Introduce el ID del estudiante que deseas eliminar:"), 10);
    listaEstudiantes.eliminarEstudiante(id);
}

// Función para buscar estudiante o asignatura
function buscar(nombre) {
    const estudianteEncontrado = listaEstudiantes.find(e => e.nombre.toLowerCase().includes(nombre.toLowerCase()));
    const asignaturaEncontrada = listaAsignaturas.find(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));

    if (estudianteEncontrado) {
        console.log(`Estudiante encontrado: ${estudianteEncontrado.nombre}`);
    } else if (asignaturaEncontrada) {
        console.log(`Asignatura encontrada: ${asignaturaEncontrada.nombre}`);
    } else {
        console.log("No se encontró ningún estudiante o asignatura con ese nombre.");
    }
}

// Iniciar el programa
main();
