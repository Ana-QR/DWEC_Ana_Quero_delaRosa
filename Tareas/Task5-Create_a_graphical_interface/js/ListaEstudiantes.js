import { Estudiante } from "./Estudiante.js";

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
     * Añade un estudiante a la lista.
     * @param {Estudiante} estudiante - El estudiante a añadir.
     * @throws {Error} Si el estudiante ya está en la lista.
     */
    addEstudiante(estudiante) {
        if (this.#listadoEstudiantes.includes(estudiante)) {
            throw new Error("El estudiante ya se encuentra en la lista, no puede haber duplicados");
        } else {
            this.#listadoEstudiantes.push(estudiante);
        }
    }

    /**
     * Elimina un estudiante de la lista.
     * @param {Estudiante} estudiante - El estudiante a eliminar.
     * @throws {Error} Si el estudiante no se encuentra en la lista.
     */
    eliminarEstudiante(estudiante) {
        if (this.#listadoEstudiantes.includes(estudiante)) {
            this.#listadoEstudiantes = this.#listadoEstudiantes.filter(e => e !== estudiante);
            console.log("Estudiante eliminado con éxito");
        } else {
            throw new Error("El estudiante no se encuentra en el listado");
        }
    }

    /**
     * Busca un estudiante por nombre.
     * @param {string} nombre - El nombre del estudiante a buscar.
     * @returns {Estudiante[]} Lista de estudiantes que coinciden con el nombre.
     */
    busquedaPorNombre(nombre) {
        const estudiante = this.#listadoEstudiantes.find(function(estudiante) {
            return estudiante.nombre.toLowerCase() === nombre.toLowerCase();
        });
        if (!estudiante) {
            throw new Error(`No se encontró ningún estudiante con el nombre: ${nombre}`);
        }
        return estudiante;
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
