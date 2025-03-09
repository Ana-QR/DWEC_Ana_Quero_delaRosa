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
import { Asignatura } from "./Asignatura.js";
import { guardarMatriculacionesEnLocalStorage, guardarCalificacionesEnLocalStorage} from "./script.js";

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
 * Matricula al estudiante en una asignatura y guarda en localStorage.
 * @param {Asignatura} asignatura - Asignatura a matricular.
 */
matricular(asignatura) {
    if (!asignatura || !(asignatura instanceof Asignatura)) {
        throw new Error("Debe proporcionarse una asignatura válida.");
    }

    if (this.#asignaturas.some(a => a.nombre.toLowerCase() === asignatura.nombre.toLowerCase())) {
        throw new Error(`El estudiante ya está matriculado en ${asignatura.nombre}`);
    }

    this.#asignaturas.push(asignatura);
    console.log(`Matriculado en: ${asignatura.nombre}`);

    // Guardar en localStorage
    guardarMatriculacionesEnLocalStorage();
}



    /**
 * Desmatricula al estudiante de una asignatura y actualiza localStorage.
 * @param {Asignatura} asignatura - Asignatura de la que se va a desmatricular.
 */
desmatricular(asignatura) {
    if (!asignatura || !(asignatura instanceof Asignatura)) {
        throw new Error("Debe proporcionarse una asignatura válida.");
    }

    const index = this.#asignaturas.findIndex(a => a.nombre.toLowerCase() === asignatura.nombre.toLowerCase());

    if (index !== -1) {
        this.#asignaturas.splice(index, 1);
        console.log(`Desmatriculado de: ${asignatura.nombre}`);

        // Guardar en localStorage
        guardarMatriculacionesEnLocalStorage();
    } else {
        throw new Error(`El estudiante no está matriculado en ${asignatura.nombre}`);
    }
}



    /**
 * Añade una calificación a una asignatura y actualiza LocalStorage.
 * @param {Asignatura} asignatura - Asignatura a calificar.
 * @param {number|string} calificacion - Calificación entre 0 y 10.
 */
calificar(asignatura, calificacion) {
    // Convertir la calificación a número
    const nota = Number(calificacion);

    if (!this.#asignaturas.some(a => a.nombre.toLowerCase() === asignatura.nombre.toLowerCase())) {
        throw new Error(`El estudiante no está matriculado en ${asignatura.nombre}`);
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
        throw new Error("La calificación debe ser un número entre 0 y 10.");
    }

    let asignaturaMatriculada = this.#asignaturas.find(a => a.nombre.toLowerCase() === asignatura.nombre.toLowerCase());
    if (!asignaturaMatriculada.calificaciones) {
        asignaturaMatriculada.calificaciones = [];
    }

    asignaturaMatriculada.calificaciones.push(nota);
    console.log(`Calificación de ${nota} añadida a ${asignatura.nombre}`);

    // Guardar en LocalStorage
    guardarCalificacionesEnLocalStorage();
}




    /**
 * Calcula el promedio de las calificaciones del estudiante.
 * @returns {number} Promedio de calificaciones o 0 si no hay calificaciones.
 */
    calcularPromedioEstudiante() {
        let totalNotas = 0;
        let totalCalificaciones = 0;

        for (let asignatura of this.#asignaturas) {
            if (Array.isArray(asignatura.calificaciones)) {
                totalNotas += asignatura.calificaciones.reduce((sum, nota) => sum + nota, 0);
                totalCalificaciones += asignatura.calificaciones.length;
            }
        }

        return totalCalificaciones === 0 ? 0 : Number((totalNotas / totalCalificaciones).toFixed(2));
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