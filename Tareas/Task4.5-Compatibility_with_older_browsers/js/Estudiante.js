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
        super(nombre, edad, direccion);
        this.#id = Estudiante.contadorId++;
        this.#asignaturas = [];
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
            if (this.#asignaturas.find(asig => asig.nombre === asignatura.nombre) === undefined) {
                this.#asignaturas.push(asignatura);
                console.log(`Matriculación de ${asignatura.nombre} realizada el ${new Date()}`);
            } else {
                console.log(`El estudiante ya está matriculado en ${asignatura.nombre}`);
            }
        }
    }

    /**
     * Desmatricula al estudiante de una o más asignaturas.
     * @param {...Object} asignaturas - Lista de asignaturas a desmatricular.
     */
    desmatricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            if (this.#asignaturas.find(asig => asig.nombre === asignatura.nombre) !== undefined) {
                this.#asignaturas = this.#asignaturas.filter(asig => asig.nombre !== asignatura.nombre);
                console.log(`Desmatriculación de ${asignatura.nombre} realizada el ${new Date()}`);
            } else {
                console.log(`El estudiante no está matriculado en ${asignatura.nombre}`);
            }
        }
    }

    /**
     * Añade una calificación a una asignatura.
     * @param {Object} asignatura - Asignatura a calificar.
     * @param {number} calificacion - Calificación entre 0 y 10.
     * @throws {Error} Si la calificación no está entre 0 y 10.
     */
    calificar(asignatura, calificacion) {
        if (typeof calificacion !== "number" || calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
    
        const index = this.#asignaturas.findIndex(asig => asig.nombre === asignatura.nombre);
        
        if (index !== -1) {
            console.log(`Calificación añadida a ${asignatura.nombre} para ${this.nombre}: ${calificacion}`);
            this.#asignaturas[index].calificaciones.push(calificacion);
            asignatura.calificar(this, calificacion);
        } else {
            console.log(`El estudiante ${this.nombre} no está matriculado en ${asignatura.nombre}`);
        }
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