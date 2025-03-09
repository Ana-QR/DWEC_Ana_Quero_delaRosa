/**
 * Clase Asignatura
 * @class Asignatura
 * 
 * Representa una asignatura con su nombre, calificaciones generales y estudiantes matriculados.
 *
 * Atributos:
 * - nombre: Nombre de la asignatura.
 * - calificaciones: Lista de calificaciones generales de la asignatura.
 * - estudiantes: Mapa que asocia los estudiantes con sus calificaciones.
 *
 * Métodos:
 * - calificar(nota): Añade una calificación a la asignatura.
 * - eliminarCalificacion(calificacion): Elimina una calificación de la asignatura.
 * - toString(): Devuelve una representación en texto de la asignatura.
 */
import { Estudiante } from "./Estudiante.js";


export class Asignatura {
    /**
     * Nombre de la asignatura.
     * @type {string}
     */
    #nombre;

    /**
     * Calificaciones generales de la asignatura (no asociadas a estudiantes).
     * @type {Array<number>}
     */
    #calificaciones;

    /**
     * Mapa que asocia a los estudiantes con sus calificaciones en la asignatura.
     * @type {Map<number, Estudiante>}
     */
    #estudiantes;

    /**
     * Crea una nueva asignatura con el nombre proporcionado.
     * @param {string} nombre - Nombre de la asignatura.
     * @throws {Error} Si el nombre de la asignatura contiene caracteres no permitidos.
     */
    constructor(nombre) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) {
            throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = []; // Calificaciones generales
        this.#estudiantes = new Map(); // Mapa para asociar los estudiantes a sus calificaciones
    }

    ///////GETTERS///////

    /**
     * Obtiene el nombre de la asignatura.
     * @returns {string} El nombre de la asignatura.
     */
    get nombre() {
        return this.#nombre;
    }

    /**
     * Obtiene las calificaciones generales de la asignatura.
     * @returns {Array<number>} Lista de calificaciones generales.
     */
    get calificaciones() {
        return this.#calificaciones;
    }

    /**
     * Obtiene el mapa de estudiantes matriculados en la asignatura.
     * @returns {Map<number, Estudiante>} Mapa de estudiantes con sus calificaciones.
     */
    get estudiantes() {
        return this.#estudiantes;
    }

    /**
     * Califica a un estudiante en la asignatura.
     * @param {number} nota - Calificación a asignar.
     * @throws {Error} Si la calificación no está entre 0 y 10.
     */
    calificar(estudiante, calificacion) {
        if (typeof calificacion !== "number" || calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
    
        if (!this.#estudiantes.has(estudiante.nombre)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.nombre}`);
        }
    
        console.log(`Calificación añadida: ${calificacion} para ${estudiante.nombre} en ${this.nombre}`);
    
        // Si el estudiante no tiene calificaciones aún, inicializar un array
        if (!Array.isArray(this.#calificaciones)) {
            this.#calificaciones = [];
        }
    
        this.#calificaciones.push(calificacion); // Agrega correctamente la calificación
    }
    

    /**
     * Elimina una calificación de la asignatura.
     * @param {number} calificacion - Calificación a eliminar.
     * @throws {Error} Si la calificación no existe en la lista de calificaciones.
     */
    eliminarCalificacion(calificacion) {
        const indiceCalificacion = this.#calificaciones.indexOf(calificacion);

        if (indiceCalificacion == -1) {
            throw new Error("Ningún estudiante ha sacado dicha calificación.");
        }

        this.#calificaciones.splice(indiceCalificacion, 1);
    }

    /**
     * Devuelve una representación en texto de la asignatura.
     * @returns {string} Información de la asignatura.
     */
    toString() {
        return `Asignatura: ${this.#nombre}`;
    }
}
