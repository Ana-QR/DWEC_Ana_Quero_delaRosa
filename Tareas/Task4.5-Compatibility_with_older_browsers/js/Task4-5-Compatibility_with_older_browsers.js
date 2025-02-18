/**
 * Hecho por: Ana Quero de la Rosa
*/

// ************* IMPORTACIÓN DE FICHEROS ******************
import { Estudiante } from "./Estudiante.js";
import { Asignatura } from "./Asignatura.js";
import { Direccion } from "./Direccion.js";
import { ListaEstudiantes } from "./ListaEstudiantes.js";
import { ListaAsignaturas } from "./ListaAsignaturas.js";


///////////////////////////////////PRUEBAS///////////////////////////////////////
/**
 * Pruebas de la clase ListaEstudiantes y ListaAsignaturas.
 */
const listaEstu = new ListaEstudiantes();
const listaAsig = new ListaAsignaturas();

console.log("Listas de estudiantes y asignaturas creadas con éxito");
const direccion1 = new Direccion("Calle Quero", 12, 1, "23790", "Jaén", "Porcuna");
const direccion2 = new Direccion("Calle Huesa", 13, "", "23790", "Jaén", "Porcuna");
const direccion3 = new Direccion("Calle Emilio Sebastián", 14, "1C", "18013", "Granada", "Granada");
const direccion4 = new Direccion("hola", 12, "", "23790", "Jaén", "Porcuna");

/* Definir estudiantes */
const estudiante1 = new Estudiante("Mario Vaquerizo", 40, direccion1);
const estudiante2 = new Estudiante("Paula Mola", 20, direccion2);
const estudiante3 = new Estudiante("Federico Garcia", 50, direccion3);
const estudiante4 = new Estudiante("ana", 20, direccion4);

/* Agregar estudiantes a la lista usando addEstudiante */
listaEstu.addEstudiante(estudiante1);
listaEstu.addEstudiante(estudiante2);
listaEstu.addEstudiante(estudiante3);
listaEstu.addEstudiante(estudiante4);

/* Crear asignaturas */
const matematicas = new Asignatura("Matemáticas");
const historia = new Asignatura("Historia");
const artes = new Asignatura("Artes");
const tecnologia = new Asignatura("Tecnología");
const musica = new Asignatura("musica");

/* Agregar asignaturas a la lista usando addAsignatura */
listaAsig.addAsignatura(matematicas);
listaAsig.addAsignatura(historia);
listaAsig.addAsignatura(artes);
listaAsig.addAsignatura(tecnologia);
listaAsig.addAsignatura(musica);

/* Matricular estudiantes en asignaturas */
estudiante1.matricular(matematicas, historia, tecnologia);
estudiante2.matricular(matematicas, artes);
estudiante3.matricular(historia, artes, tecnologia);
estudiante4.matricular(musica, matematicas, historia, tecnologia);

/* Asignar notas */
matematicas.calificar(estudiante1, 8.5);
matematicas.calificar(estudiante2, 9.0);

historia.calificar(estudiante1, 7.5);
historia.calificar(estudiante3, 8.0);

artes.calificar(estudiante2, 9.5);
artes.calificar(estudiante3, 8.5);

tecnologia.calificar(estudiante1, 10.0);
tecnologia.calificar(estudiante3, 8.8);

prompt("Datos inicializados correctamente. Presiona Enter para continuar.");

/* Eliminar estudiantes y asignaturas */
try {
    listaEstu.eliminarEstudiante(estudiante3);
    listaAsig.eliminarAsignatura(artes);
    prompt("Estudiantes y asignaturas eliminados con éxito");
} catch (error) {
    console.error(error.message);
}

/*Matricular y desmatricular estudiantes de asignaturas */
try {
    estudiante2.matricular(historia);
    estudiante1.desmatricular(historia);
} catch (error) {
    console.error(error.message);
}

/*Calificación de estudiantes en asignaturas con la funcion calificar de estudiante */
try {
    estudiante1.calificar(tecnologia, 7);
    estudiante3.calificar(tecnologia, 8);
    estudiante3.calificar(historia, 6);
    estudiante1.calificar(historia, 8);
    estudiante2.calificar(matematicas, 6);
    estudiante2.calificar(historia, 7);
} catch (error) {
    console.error(error.message);
}


/**
 * Muestra el menú principal del sistema de gestión de estudiantes y asignaturas.
 * Permite realizar operaciones como añadir/eliminar estudiantes y asignaturas,
 * matricular/desmatricular estudiantes, asignar notas y calcular promedios.
 */
function mostrarMenu() {
    let continuar = true;
    while (continuar) {
        /**
         * Solicita al usuario una opción del menú.
         * @type {string}
         */
        const opcion = prompt(
            `=== Menú Principal ===\n`
            + `1. Añadir estudiante\n`
            + `2. Eliminar estudiante\n`
            + `3. Mostrar estudiantes\n`
            + `4. Añadir asignatura\n`
            + `5. Eliminar asignatura\n`
            + `6. Mostrar asignaturas\n`
            + `7. Matricular estudiante en asignatura\n`
            + `8. Desmatricular estudiante de asignatura\n`
            + `9. Calificar a un estudiante\n`
            + `10. Calcular promedio de un estudiante\n`
            + `11. Calcular promedio general de estudiantes\n`
            + `0. Salir\n`
            + `Escribe tu opción:`
        );

        try {
            switch (opcion) {
                case "1": {
                    /**
                     * Añade un nuevo estudiante al sistema.
                     * @description Solicita los datos del estudiante, crea una instancia y la añade a la lista.
                     */
                    console.clear();
                    prompt("Introduce los datos del estudiante:");

                    /**
                     * Nombre del estudiante.
                     * @type {string} 
                     */
                    const nombre = prompt("Nombre del estudiante:");
                    /**
                     * Edad del estudiante.
                     * @type {number} 
                     */
                    const edad = parseInt(prompt("Edad del estudiante:"), 10);

                    /* Dirección del estudiante */
                    /**
                     * Calle de la dirección del estudiante.
                     * @type {string} 
                     */
                    const calle = prompt("Calle de la dirección:");
                    /**
                     * Número de la dirección del estudiante.
                     * @type {string} 
                     */
                    const numero = prompt("Número de la dirección:");
                    /**
                     * Piso de la dirección del estudiante.
                     * @type {string} 
                     */
                    const piso = prompt("Piso de la dirección:");
                    /**
                     * Código postal de la dirección del estudiante.
                     * @type {string} 
                     */
                    const codPostal = prompt("Código postal de la dirección:");
                    /**
                     * Provincia de la dirección del estudiante.
                     * @type {string} 
                     */
                    const provincia = prompt("Provincia de la dirección:");
                    /**
                     * Localidad de la dirección del estudiante.
                     * @type {string} 
                     */
                    const localidad = prompt("Localidad de la dirección:");

                    /**
                     * Crea una nueva dirección para el estudiante.
                     * @type {Direccion}
                     */
                    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
                    /**
                     * Crea una nueva instancia de estudiante y lo agrega a la lista.
                     * @type {Estudiante}
                     */
                    const nuevoEstudiante = new Estudiante(nombre, edad, direccion);

                    listaEstu.addEstudiante(nuevoEstudiante);
                    prompt(`Estudiante ${nombre} añadido con éxito. Presiona Enter para continuar.`);
                    break;
                }

                case "2": {
                    /**
                     * Elimina un estudiante del sistema.
                     * @description Solicita el nombre del estudiante, lo busca y lo elimina si existe.
                     */
                    console.clear();
                    const nombreEliminar = prompt("Nombre del estudiante a eliminar:");
                    const estudianteEliminar = listaEstu.busquedaPorNombre(nombreEliminar);
                    if (estudianteEliminar) {
                        listaEstu.eliminarEstudiante(estudianteEliminar);
                        prompt(`Estudiante ${estudianteEliminar.nombre} eliminado. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                    }
                    break;
                }

                case "3": {
                    /**
                     * Muestra la lista de estudiantes registrados.
                     * @description Imprime en consola la lista de estudiantes almacenados en el sistema.
                     */
                    console.clear();
                    console.log("Lista de estudiantes:");
                    console.log(listaEstu.mostrarEstudiantes());
                    break;
                }

                case "4": {
                    /**
                     * Añade una nueva asignatura al sistema.
                     * @description Solicita el nombre de la asignatura y la agrega a la lista.
                     */
                    console.clear();
                    const nombreAsig = prompt("Nombre de la asignatura:");
                    /**
                     * Crea una nueva instancia de asignatura.
                     * @type {Asignatura}
                     */
                    const nuevaAsignatura = new Asignatura(nombreAsig);
                    listaAsig.addAsignatura(nuevaAsignatura);
                    prompt(`Asignatura ${nombreAsig} añadida con éxito. Presiona Enter para continuar.`);
                    break;
                }

                case "5": {
                    /**
                     * Elimina una asignatura del sistema.
                     * @description Solicita el nombre de la asignatura, la busca y la elimina si existe.
                     */
                    console.clear();
                    const nombreAsigEliminar = prompt("Nombre de la asignatura a eliminar:");
                    const asignaturaEliminar = listaAsig.buscarAsignaturas(nombreAsigEliminar);
                    if (asignaturaEliminar) {
                        listaAsig.eliminarAsignatura(asignaturaEliminar);
                        prompt(`Asignatura ${asignaturaEliminar.nombre} eliminada. Presiona Enter para continuar.`);
                    } else {
                        prompt("Asignatura no encontrada. Presiona Enter para continuar.");
                    }
                    break;
                }

                case "6": {
                    /**
                     * Muestra la lista de asignaturas registradas.
                     * @description Imprime en consola la lista de asignaturas almacenadas en el sistema.
                     */
                    console.clear();
                    console.log("Lista de asignaturas:");
                    console.log(listaAsig.mostrarAsignaturas());
                    break;
                }

                case "7":
                    /**
                     * Matricula a un estudiante en una asignatura.
                     * @description Solicita el ID del estudiante y el nombre de la asignatura,
                     * verifica que existan y matricula al estudiante en la asignatura.
                     */
                    console.clear();
                    const nombreEstuMatricular = prompt("Nombre del estudiante a matricular:");
                    const nombreAsigMatricular = prompt("Nombre de la asignatura:");
                    const estudianteMatricular = listaEstu.busquedaPorNombre(nombreEstuMatricular);
                    const asignaturaMatricular = listaAsig.buscarAsignaturas(nombreAsigMatricular);

                    if (estudianteMatricular && asignaturaMatricular) {
                        estudianteMatricular.matricular(asignaturaMatricular);
                        prompt(`Estudiante ${estudianteMatricular.nombre} matriculado en ${asignaturaMatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "8":
                    /**
                     * Desmatricula a un estudiante de una asignatura.
                     * @description Solicita el ID del estudiante y el nombre de la asignatura,
                     * verifica que existan y elimina la matrícula del estudiante en la asignatura.
                     */
                    console.clear();

                    prompt("Introduce el nombre del estudiante que deseas desmatricular:");
                    let estudianteDesmatricular = prompt("Nombre del estudiante:");
                    prompt("Introduce el nombre de la asignatura de la que deseas desmatricular al estudiante:");
                    let asignaturaDesmatricular = prompt("Nombre de la asignatura:");

                    estudianteDesmatricular = listaEstu.busquedaPorNombre(estudianteDesmatricular);
                    asignaturaDesmatricular = listaAsig.buscarAsignaturas(asignaturaDesmatricular);

                    if (estudianteDesmatricular && asignaturaDesmatricular) {
                        estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                        prompt(`Estudiante ${estudianteDesmatricular.nombre} desmatriculado de ${asignaturaDesmatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt(`No se ha podido desmatricular a ${estudianteDesmatricular.nombre} de ${asignaturaDesmatricular.nombre}`);
                    }
                    break;

                case "9":
                    /**
                     * Asigna una calificación a un estudiante en una asignatura.
                     * @description Solicita el ID del estudiante, la asignatura y la calificación,
                     * verifica que existan y asigna la nota.
                     */
                    console.clear();
                    const nombreEstuCalificar = prompt("Nombre del estudiante a calificar:");
                    const nombreAsigCalificar = prompt("Nombre de la asignatura:");
                    const calificacion = parseFloat(prompt("Calificación (0-10):"));
                    if (calificacion < 0 || calificacion > 10) {
                        prompt("La calificación debe estar entre 0 y 10. Presiona Enter para continuar.");
                        break;
                    }
                    const estudianteCalificar = listaEstu.busquedaPorNombre(nombreEstuCalificar);
                    const asignaturaCalificar = listaAsig.buscarAsignaturas(nombreAsigCalificar);

                    if (estudianteCalificar && asignaturaCalificar) {
                        estudianteCalificar.calificar(asignaturaCalificar, calificacion);
                        prompt(`Calificación añadida con éxito. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "10":
                    /**
                     * Calcula el promedio de un estudiante.
                     * @description Solicita el ID del estudiante, obtiene sus calificaciones y calcula su promedio.
                     */
                    console.clear();
                    const estPromedio = prompt("Nombre del estudiante:");
                    const estudiantePromedio = listaEstu.busquedaPorNombre(estPromedio);
                    if (estudiantePromedio) {
                        console.log(`Promedio del estudiante: ${estudiantePromedio.calcularPromedioEstudiante()}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                    }
                    break;

                case "11":
                    /**
                     * Calcula el promedio general de todos los estudiantes.
                     * @description Obtiene el promedio de calificaciones de todos los estudiantes y lo muestra.
                     */
                    console.clear();
                    const promedioGeneral = listaEstu.promedioEstudiantes();
                    prompt(`Promedio general de los estudiantes: ${promedioGeneral}. Presiona Enter para continuar.`);
                    break;

                case "0":
                    /**
                     * Finaliza la ejecución del programa.
                     * @description Muestra un mensaje de salida y cambia la variable de control para terminar el bucle.
                     */
                    console.clear();
                    prompt("Saliendo del programa... Presiona Enter para finalizar.");
                    continuar = false;
                    break;

                default:
                    /**
                     * Maneja opciones inválidas.
                     * @description Muestra un mensaje de error cuando el usuario ingresa una opción no válida.
                     */
                    prompt("Opción no válida. Por favor, introduce un número entre 0 y 11. Presiona Enter para continuar.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Ejecutar el programa
mostrarMenu();