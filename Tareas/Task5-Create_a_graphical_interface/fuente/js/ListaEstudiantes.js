import { Estudiante } from "./Estudiante.js";
import { guardarEstudiantesEnLocalStorage, actualizarListaEstudiantesUI } from "./script.js";
/**
 * Clase ListaEstudiantes
 * @class ListaEstudiantes
 * Array que contiene a los estudiantes
 *
 * Atributos:
 *   -listadoEstudiantes
 *
 * Métodos:
 *   - Constructor: Permite inicializar la lista de estudiantes.
 *   - promedioEstudiantes: Promedio de las asignaturas de un estudiante.
 *   - addEstudiante: Añadir un estudiante en la lista.
 *   - eliminarEstudiante: Eliminar un estudiante de la lista.
 *   - busquedaPorNombre: Buscar un estudiante por nombre.
 */

export class ListaEstudiantes {
    /**
     * Array privado que contiene a los estudiantes.
     * @type {Estudiante[]}
     */
    #listadoEstudiantes;

    /**
     * Crea una nueva instancia de ListaEstudiantes.
     * @param {...Estudiante} estudiantes - Lista inicial de estudiantes.
     */
    constructor(...estudiantes) {
        this.#listadoEstudiantes = [];
        for (const estudiante of estudiantes) {
            this.addEstudiante(estudiante);
        }
    }

    /**
     * Obtiene la lista de estudiantes.
     * @returns {Estudiante[]} Copia del array de estudiantes.
     */
    get listadoEstudiantes() {
        return [...this.#listadoEstudiantes];
    }

    /**
     * Calcula el promedio general de las asignaturas de los estudiantes.
     * @returns {number|string} El promedio general o un mensaje si no hay estudiantes.
     */
    promedioEstudiantes() {
        let sum = 0;
        let contador = 0;

        console.log("Calculando promedio general...");

        for (let estudiante of this.#listadoEstudiantes) {
            const promedioEstudiante = estudiante.calcularPromedioEstudiante();
            console.log(`Promedio de ${estudiante.nombre}:`, promedioEstudiante);

            if (typeof promedioEstudiante === "number" && !isNaN(promedioEstudiante)) {
                sum += promedioEstudiante;
                contador++;
            } else {
                console.log(`Promedio inválido para ${estudiante.nombre}:`, promedioEstudiante);
            }
        }

        return contador === 0 ? 0 : sum / contador;
    }

    /**
     * Muestra un reporte con el nombre, calificaciones y promedio de cada estudiante.
     */
    reporte() {
        // Recorre la lista de estudiantes y muestra su nombre, calificaciones y promedio
        this.#listadoEstudiantes.forEach(estudiante => {
            console.log();
            console.log(`Nombre del estudiante: ${estudiante.nombre}`);
            console.log(`Calificaciones:`);
            // Muestra las calificaciones de cada asignatura
            estudiante.asignaturas.forEach(asignatura => {
                const nota = Number(asignatura[1]);
                console.log(`${asignatura.nombre}: ${nota}`);
            });
            console.log(`Promedio: ${estudiante.calcularPromedioEstudiante()}`);
            console.log("--------------------------------");
        });
    }

    /**
     * Añade un estudiante a la lista.
     * @param {Estudiante} estudiante - El estudiante a añadir.
     * @throws {Error} Si el estudiante ya está en la lista.
     */
    addEstudiante(estudiante) {
        if (this.#listadoEstudiantes.some(e => e.nombre.toLowerCase() === estudiante.nombre.toLowerCase())) {
            throw new Error("El estudiante ya se encuentra en la lista, no puede haber duplicados");
        } else {
            this.#listadoEstudiantes.push(estudiante);
        }
    }

    /**
 * Elimina un estudiante de la lista por su nombre y actualiza localStorage.
 * @param {string} nombre - Nombre del estudiante a eliminar.
 */
    eliminarEstudiante(nombre) {
        if (typeof nombre !== "string") throw new Error("El nombre del estudiante debe ser una cadena de texto");
    
        const index = this.#listadoEstudiantes.findIndex(est => est.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    
        if (index !== -1) {
            this.#listadoEstudiantes.splice(index, 1);
            console.log(`Estudiante '${nombre}' eliminado con éxito`);
    
            // Guardar cambios en localStorage
            guardarEstudiantesEnLocalStorage();
    
            // Actualizar UI
            actualizarListaEstudiantesUI();
        } else {
            throw new Error(`El estudiante '${nombre}' no se encuentra en el listado`);
        }
    }
    
    


    /**
 * Busca un estudiante por nombre exacto.
 * @param {string} nombre - Nombre del estudiante a buscar.
 * @returns {Estudiante|null} Retorna el estudiante si se encuentra, de lo contrario null.
 */
    busquedaPorNombre(nombre) {
        if (typeof nombre !== "string") throw new Error("El nombre debe ser una cadena de texto");
    
        return this.#listadoEstudiantes.find(estudiante => estudiante.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()) || null;
    }
    


    /**
     * Muestra la lista de estudiantes en la consola.
     */
    mostrarEstudiantes() {
        console.log("Lista de estudiantes:");
        this.#listadoEstudiantes.forEach(estudiante => {
            console.log(estudiante.toString());
        });
    }
}
