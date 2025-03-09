import { Asignatura } from "./Asignatura.js";
import { actualizarListaAsignaturasUI, guardarAsignaturasEnLocalStorage } from "./script.js";

/** 
* Clase ListaAsignaturas
* @class ListaAsignaturas
* Array que contiene las asignaturas
*
* Atributos:  
*   -listadoAsignaturas
*
* Métodos:
*   - Constructor: Permite inicializar la lista de asignaturas.
*   - Getter: listadoAsignaturas (devuelve una copia del array de asignaturas).
*   - addAsignatura: Añadir una asignatura en la lista.
*   - eliminarAsignatura: Eliminar una asignatura de la lista.
*   - buscarAsignaturas: Buscar asignaturas según un patrón de texto.
*/

export class ListaAsignaturas {
    #listadoAsignaturas;

    /**
   * Constructor para inicializar la lista de asignaturas
   * @param {...Asignatura} asignaturas - Las asignaturas a añadir a la lista
   */
    constructor(...asignaturas) {
        this.#listadoAsignaturas = [];

        for (let asignatura of asignaturas) {
            this.addAsignatura(asignatura);
        }
    }

    get listadoAsignaturas() {
        return [...this.#listadoAsignaturas];
    }

    /**
   * Añade una asignatura a la lista
   * @param {Asignatura} asignatura - La asignatura a añadir
   */
    addAsignatura(asignatura) {
        if (!asignatura || !asignatura.nombre) {
            console.error("Error: La asignatura debe tener un nombre válido.");
            return false;
        }

        if (this.#listadoAsignaturas.some(elemento => elemento.nombre.toLowerCase() === asignatura.nombre.toLowerCase())) {
            console.error("Error: Ya existe la asignatura");
            return false;
        }

        this.#listadoAsignaturas.push(asignatura);
        return true;
    }

    /**
 * Elimina una asignatura de la lista y actualiza localStorage.
 * @param {string} nombre - Nombre de la asignatura a eliminar.
 */
    eliminarAsignatura(nombre) {
        if (typeof nombre !== "string") throw new Error("El nombre de la asignatura debe ser una cadena de texto");
    
        const index = this.#listadoAsignaturas.findIndex(a => a.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    
        if (index !== -1) {
            this.#listadoAsignaturas.splice(index, 1);
            console.log(`Asignatura '${nombre}' eliminada con éxito`);
    
            // Guardar cambios en LocalStorage
            guardarAsignaturasEnLocalStorage();

            // Actualizar la lista de asignaturas en la interfaz
            actualizarListaAsignaturasUI();
        } else {
            throw new Error(`La asignatura '${nombre}' no se encuentra en el listado`);
        }
    }
    
    
    
    /**
     * Añade una calificación a una asignatura.
     * @param {Object} asignatura - Asignatura a calificar.
     * @param {number} calificacion - Calificación entre 0 y 10.
     */
    calificar(asignatura, calificacion) {
        if (!this.asignaturas.some(a => a.nombre === asignatura.nombre)) {
            alert(`El estudiante no está matriculado en ${asignatura.nombre}`);
            return;
        }
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        let asignaturaMatriculada = this.asignaturas.find(a => a.nombre === asignatura.nombre);
        if (!asignaturaMatriculada.calificaciones) {
            asignaturaMatriculada.calificaciones = []; // Asegurar que calificaciones es un array
        }
        asignaturaMatriculada.calificaciones.push(calificacion);
    }


    /**
   * Busca asignaturas según un patrón de texto
   * @param {string} patron - El patrón de texto a buscar
   * @returns {Asignatura[]} Las asignaturas que coinciden con el patrón
   */
    buscarAsignaturas(patron) {
        if (typeof patron !== "string") throw new Error("El patrón debe ser una cadena de texto");

        const asignaturasEncontradas = this.#listadoAsignaturas.filter(asignatura =>
            asignatura.nombre.toLowerCase().includes(patron.toLowerCase())
        );

        if (asignaturasEncontradas.length === 0) {
            console.warn(`No se encontraron asignaturas con el patrón '${patron}'.`);
            return [];
        }

        return asignaturasEncontradas;
    }

    /**
     * Busca una asignatura por su nombre exacto
     * @param {string} nombre - Nombre de la asignatura a buscar
     * @returns {Asignatura|null} La asignatura si se encuentra, de lo contrario null.
     */
    busquedaPorNombre(nombre) {
        return this.#listadoAsignaturas.find(asig => asig.nombre.toLowerCase() === nombre.toLowerCase()) || null;
    }

    /**
     * Muestra la lista de asignaturas en la consola.
     */
    mostrarAsignaturas() {
        this.#listadoAsignaturas.forEach(asignatura => {
            console.log(asignatura.toString());
        });
    }
}