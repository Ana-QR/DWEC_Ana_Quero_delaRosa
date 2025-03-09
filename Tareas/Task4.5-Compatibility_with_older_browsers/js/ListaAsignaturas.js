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
import { Asignatura } from "./Asignatura.js";


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
        this.#listadoAsignaturas.push(asignatura);
    }

    /**
   * Elimina una asignatura de la lista
   * @param {Asignatura} asignatura - La asignatura a eliminar
   * @throws {Error} Si la asignatura no se encuentra en el listado
   */
    eliminarAsignatura(asignatura) {
        if (this.#listadoAsignaturas.includes(asignatura)) {
            this.#listadoAsignaturas = this.#listadoAsignaturas.filter(e => e !== asignatura);
            console.log("Asignatura eliminada con éxito");
        } else {
            throw new Error("La asignatura no se encuentra en el listado");
        }
    }

    /**
   * Busca asignaturas según un patrón de texto
   * @param {string} patron - El patrón de texto a buscar
   * @returns {Asignatura[]} Las asignaturas que coinciden con el patrón
   */
    buscarAsignaturas(patron) {
        const asignaturaEncontrada = this.#listadoAsignaturas.find(function (asignatura) {
            return asignatura.nombre.toLowerCase() == patron.toLowerCase();
        });
        if (!asignaturaEncontrada) {
            throw new Error(`Asignatura(s) con el patrón '${patron}' no encontrada(s).`);
        }
        return asignaturaEncontrada;
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