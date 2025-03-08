/**
 * Clase Estudiante
 * @class Estudiante
 * 
 * Representa un estudiante que hereda de la clase Persona. 
 * Un estudiante tiene datos personales, asignaturas matriculadas y funcionalidades asociadas.
 * 
 * Atributos:
 *   - ID único del estudiante.
 *   - Asignaturas: Array de objetos con las asignaturas matriculadas. 
 *     Cada objeto contiene:
 *     - Nombre de la asignatura.
 *     - Calificaciones.
 *     - Fecha de matriculación.
 *     - Fecha de desmatriculación.
 * 
 * Métodos:
 *   - Constructor.
 *   - Getter y Setter: ID y asignaturas.
 *   - matricular: Matricula al estudiante en una asignatura.
 *   - desmatricular: Elimina al estudiante de una asignatura.
 *   - calificar: Añade una calificación a una asignatura.
 *   - calcularPromedioEstudiante: Calcula el promedio de calificaciones del estudiante.
 *   - buscarAsignaturas: Busca asignaturas según un patrón de texto.
 *   - toString(): Devuelve una representación en texto del estudiante.
 */
import { Persona } from "./Persona.js";
import { Direccion } from "./Direccion.js";

export class Estudiante extends Persona {
    /**
     * ID único del estudiante, generado automáticamente.
     * @type {number}
     */
    #id;

    /**
     * Lista de asignaturas en las que el estudiante está matriculado.
     * @type {Array<Object>}
     */
    #asignaturas;

    /**
     * Historial de acciones realizadas por el estudiante.
     * @type {Array<[string, Date]>}
     */
    #relacion;

    /**
     * Contador estático para asignar un ID único a cada estudiante.
     * @type {number}
     */
    static contadorId = 0;
    
    /**
     * Constructor de la clase Estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    constructor(nombre, edad, direccion) {
        super(nombre, edad, direccion instanceof Direccion ? direccion : new Direccion(direccion.calle, direccion.numero, direccion.ciudad, direccion.pais));
        this.#id = Estudiante.contadorId++;
        this.#asignaturas = [];
        this.#relacion = [];
    }

    ///////GETTER///////
    /**
     * Obtiene el ID del estudiante.
     * @returns {number}
     */
    get id() {
        return this.#id;
    }

    /**
     * Obtiene las asignaturas del estudiante.
     * @returns {Object}
     */
    get asignaturas() {
        return this.#asignaturas;
    }

    /**
     * Matricula al estudiante en una o más asignaturas.
     * @param {...Object} asignaturas - Lista de asignaturas a matricular.
     */
    matricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            this.#asignaturas.push(asignatura);
            this.#relacion.push([`Matriculación de ${asignatura.nombre}`, new Date()]);
        }
    }

    /**
     * Desmatricula al estudiante de una o más asignaturas.
     * @param {...Object} asignaturas - Lista de asignaturas a desmatricular.
     */
    desmatricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            this.#asignaturas = this.#asignaturas.filter(a => a.nombre !== asignatura.nombre);
            this.#relacion.push([`Desmatriculación de ${asignatura.nombre}`, new Date()]);
        }
    }

    /**
     * Añade una calificación a una asignatura.
     * @param {Object} asignatura - Asignatura a calificar.
     * @param {number} calificacion - Calificación entre 0 y 10.
     * @throws {Error} Si la calificación no está entre 0 y 10.
     */
    calificar(asignatura, calificacion) {
        if (arguments.length === 1) {
            throw new Error("Faltan datos para calificar al estudiante");
        }
        const asignaturaMatriculada = this.#asignaturas.find(a => a.nombre === asignatura.nombre);
        if (!asignaturaMatriculada) {
            alert(`El estudiante no está matriculado en ${asignatura.nombre}`); 
            return;
        }
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        asignaturaMatriculada.calificaciones.push(calificacion);
        this.#relacion.push([`Calificación añadida a ${asignatura.nombre}`, new Date()]);
    }

    /**
     * Calcula el promedio de las calificaciones del estudiante.
     * @returns {number|string} Promedio de calificaciones o mensaje si no hay calificaciones.
     */
    calcularPromedioEstudiante() {
        let sum = 0;
        let contador = 0;

        for (let asignatura of this.#asignaturas) {
            console.log("Asignatura:", asignatura);

            if (Array.isArray(asignatura.calificaciones)) {  // Aseguramos que sea un array
                for (let calificacion of asignatura.calificaciones) {
                    console.log("Calificación encontrada:", calificacion, "Tipo:", typeof calificacion);

                    if (typeof calificacion === "number" && !isNaN(calificacion)) {
                        sum += calificacion;
                        contador++;
                    } else {
                        console.log("Calificación inválida (descartada):", calificacion);
                    }
                }
            } else {
                console.log("asignatura.calificaciones no es un array:", asignatura.calificaciones);
            }
        }

        console.log(`Suma final: ${sum}, Contador final: ${contador}`);
        let media = sum / contador;
        return contador === 0 ? 0 : Number(media.toFixed(2));
    }

    /**
     * Devuelve el historial de acciones del estudiante.
     * @returns {string[]} El historial de matriculaciones y desmatriculaciones.
     */
    get relacion() {
        return this.#relacion.map(([accion, fecha]) => {
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            return `${accion} - ${fechaFormateada}`;
        });
    }

    /**
     * Devuelve una representación en texto del estudiante.
     * @returns {string}
     */
    toString() {
        return `ID del estudiante: ${this.#id},\n
        Nombre del estudiante: ${this.nombre},\n
        Edad del estudiante: ${this.edad},\n
        Dirección del estudiante: ${this.direccion.toString()}\n`;
    }
}