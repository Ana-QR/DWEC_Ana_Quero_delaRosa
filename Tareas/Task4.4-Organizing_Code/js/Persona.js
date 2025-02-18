/**
 * Clase Persona
 * @class Persona
 * 
 * Representa a una persona con atributos básicos como nombre, edad y dirección.
 * Es la clase de la que va a heredar Estudiante, ya que cualquier estudiante es una persona, pero no al revés.
 *
 * Atributos:
 *  - Nombre: Solo letras y espacios.
 *  - Edad: Número positivo.
 *  - Dirección: Instancia de la clase Direccion.
 *
 * Métodos:
 *  - Constructor.
 *  - Getter y Setter: Nombre, edad y dirección.
 *  - toString(): Devuelve una representación en texto de la persona.
 */
export default class Persona {
    /** @type {string}*/
    #nombre;
    
    /** @type {number}*/
    #edad;
    
    /** @type {Direccion}*/
    #direccion;

    /**
     * Constructor de la clase Persona.
     * @param {string} nombre - Nombre de la persona.
     * @param {number} edad - Edad de la persona.
     * @param {Direccion} direccion - Dirección de la persona.
     * @throws {Error} Si el nombre no contiene solo letras y espacios.
     */
    constructor(nombre, edad, direccion) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombreNuevo)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nombre;
        this.#edad = edad >= 0 ? edad : 0;
        this.#direccion = direccion;
    }

    ///////GETTER///////

    /** @returns {string} Nombre de la persona. */
    get nombre() {
        return this.#nombre;
    }

    /** @returns {number} Edad de la persona. */
    get edad() {
        return this.#edad;
    }

    /** @returns {Direccion} Dirección de la persona. */
    get direccion() {
        return this.#direccion;
    }

    ///////SETTER///////

    /**
     * Establece un nuevo nombre para la persona.
     * @param {string} nombreNuevo - Nuevo nombre de la persona.
     * @throws {Error} Si el nombre no contiene solo letras y espacios.
     */
    set nombre(nombreNuevo) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombreNuevo)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nombreNuevo;
    }

    /**
     * Establece una nueva edad para la persona.
     * @param {number} edadNueva - Nueva edad de la persona.
     * @throws {Error} Si la edad es negativa.
     */
    set edad(edadNueva) {
        if (edadNueva < 0) {
            throw new Error("La edad debe ser un número positivo");
        }
        this.#edad = edadNueva;
    }

    /**
     * Establece una nueva dirección para la persona.
     * @param {Direccion} direccionNueva - Nueva dirección de la persona.
     * @throws {Error} Si la dirección no es una instancia de la clase Direccion.
     */
    set direccion(direccionNueva) {
        if (!(direccionNueva instanceof Direccion)) {
            throw new Error("La dirección debe ser una instancia de la clase Direccion");
        }
        this.#direccion = direccionNueva;
    }

    /**
     * Devuelve una representación en texto de la persona.
     * @returns {string} Representación en texto de la persona.
     */
    toString() {
        return `Nombre: ${this.#nombre},\nEdad: ${this.#edad},\nDirección: ${this.#direccion}`;
    }
}