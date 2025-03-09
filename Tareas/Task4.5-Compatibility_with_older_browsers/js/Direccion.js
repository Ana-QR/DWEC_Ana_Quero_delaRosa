/**
 * Clase Direccion
 * Representa una dirección postal.
 * 
 * @class Direccion
 * Atributos: 
 *   -Calle.
 *   -Número.
 *   -Piso.
 *   -Código postal.
 *   -Provincia.
 *   -Localidad.
 * Todos son privados.
 *
 * Métodos:
 *   - Constructor: Permite inicializar los datos, validando el código postal (5 dígitos).
 *   - validarCodigoPostal(): Valida el código postal.
 *   - toString(): Devuelve una representación en texto de la dirección.
 */
export class Direccion {
    /**
     * Calle de la dirección.
     * @type {string} 
     * @private
     */
    #calle;
    
    /**
     * Número de la dirección.
     * @type {number} 
     * @private
     */
    #numero;
    
    /**
     * Piso de la dirección.
     * @type {string} 
     * @private
     */
    #piso;
    
    /**
     * Código postal (5 dígitos).
     * @type {string} 
     * @private
     */
    #codigoPostal;
    
    /**
     * Provincia de la dirección.
     * @type {string} 
     * @private
     */
    #provincia;
    
    /**
     * Localidad de la dirección.
     * @type {string} 
     * @private
     */
    #localidad;

    /**
     * Constructor de la clase Direccion.
     * @param {string} calle - Nombre de la calle.
     * @param {number} numero - Número de la dirección.
     * @param {string} piso - Piso de la dirección.
     * @param {string} codigoPostal - Código postal de la dirección.
     * @param {string} provincia - Provincia de la dirección.
     * @param {string} localidad - Localidad de la dirección.
     */
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#provincia = provincia;
        this.#localidad = localidad;
        this.#codigoPostal = this.validarCodigoPostal(codigoPostal);
    }

    /**
     * Valida el código postal.
     * @param {string} codigoPostal - Código postal a validar.
     * @returns {string} Código postal válido o "00000" si es inválido.
     */
    validarCodigoPostal(codigoPostal) {
        const regex = /^\d{5}$/;  // Expresión regular para verificar que sea un código postal de 5 dígitos
        return regex.test(codigoPostal) ? codigoPostal : "00000";  // Si es válido, devuelve el código postal; si no, pone "00000"
    }

    /**
     * Devuelve una representación en texto de la dirección.
     * @returns {string} Información de la dirección en formato texto.
     */
    toString() {
        return `Calle: ${this.#calle},\n
        Numero: ${this.#numero},\n
        Piso: ${this.#piso},\n
        Código Postal: ${this.#codigoPostal},\n
        Provincia: ${this.#provincia},\n
        Localidad: ${this.#localidad}\n`;
    }
}
