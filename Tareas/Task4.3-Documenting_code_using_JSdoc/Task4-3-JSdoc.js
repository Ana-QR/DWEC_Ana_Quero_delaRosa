/**
 * Hecho por: Ana Quero de la Rosa
*/

/* Cuando abra el live server, abra la consola, dele a 0 para salir del programa y recargue la página para volver a empezar 
y que se muestre el menú de nuevo, así irá correctamente todo. */

/*https://ana-qr.github.io/DWEC_QueroDeLaRosa_Ana-tareas/primertrimestre/index.html */

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
class Persona {
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
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
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
class Estudiante extends Persona {
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

class Direccion {
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
class Asignatura {
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
    
        const index = this.#estudiantes.findIndex(e => e.nombre === estudiante.nombre);
    
        if (index !== -1) {
            console.log(`Calificación añadida: ${calificacion} para ${estudiante.nombre} en ${this.nombre}`);
            this.#calificaciones.push(calificacion); // Asegurar que solo se agregan números
        } else {
            console.log(`${estudiante.nombre} no está matriculado en ${this.nombre}`);
        }
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

class ListaEstudiantes {
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

class ListaAsignaturas {
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

///////////////////////////////////PRUEBAS///////////////////////////////////////
/**
 * Pruebas de la clase ListaEstudiantes y ListaAsignaturas.
 */
const listaEstu = new ListaEstudiantes();
const listaAsig = new ListaAsignaturas();

console.log("Listas de estudiantes y asignaturas creadas con éxito");
const direccion1 = new Direccion("Calle Quero", 12, 1, "23790", "Jaén", "Porcuna");
const direccion2 = new Direccion("Calle Huesa", 13, "", "23790", "Jaén", "Porcuna");
const direccion3 = new Direccion("Calle Emilio Sebastián", 14, "1C", "18013", "Granada", "Granada");
const direccion4 = new Direccion("hola", 12, "", "23790", "Jaén", "Porcuna");

/* Definir estudiantes */
const estudiante1 = new Estudiante("Mario Vaquerizo", 40, direccion1);
const estudiante2 = new Estudiante("Paula Mola", 20, direccion2);
const estudiante3 = new Estudiante("Federico Garcia", 50, direccion3);
const estudiante4 = new Estudiante("ana", 20, direccion4);

/* Agregar estudiantes a la lista usando addEstudiante */
listaEstu.addEstudiante(estudiante1);
listaEstu.addEstudiante(estudiante2);
listaEstu.addEstudiante(estudiante3);
listaEstu.addEstudiante(estudiante4);

/* Crear asignaturas */
const matematicas = new Asignatura("Matemáticas");
const historia = new Asignatura("Historia");
const artes = new Asignatura("Artes");
const tecnologia = new Asignatura("Tecnología");
const musica = new Asignatura("musica");

/* Agregar asignaturas a la lista usando addAsignatura */
listaAsig.addAsignatura(matematicas);
listaAsig.addAsignatura(historia);
listaAsig.addAsignatura(artes);
listaAsig.addAsignatura(tecnologia);
listaAsig.addAsignatura(musica);

/* Matricular estudiantes en asignaturas */
estudiante1.matricular(matematicas, historia, tecnologia);
estudiante2.matricular(matematicas, artes);
estudiante3.matricular(historia, artes, tecnologia);
estudiante4.matricular(musica, matematicas, historia, tecnologia);

/* Asignar notas */
matematicas.calificar(estudiante1, 8.5);
matematicas.calificar(estudiante2, 9.0);

historia.calificar(estudiante1, 7.5);
historia.calificar(estudiante3, 8.0);

artes.calificar(estudiante2, 9.5);
artes.calificar(estudiante3, 8.5);

tecnologia.calificar(estudiante1, 10.0);
tecnologia.calificar(estudiante3, 8.8);

prompt("Datos inicializados correctamente. Presiona Enter para continuar.");

/* Eliminar estudiantes y asignaturas */
try {
    listaEstu.eliminarEstudiante(estudiante3);
    listaAsig.eliminarAsignatura(artes);
    prompt("Estudiantes y asignaturas eliminados con éxito");
} catch (error) {
    console.error(error.message);
}

/*Matricular y desmatricular estudiantes de asignaturas */
try {
    estudiante2.matricular(historia);
    estudiante1.desmatricular(historia);
} catch (error) {
    console.error(error.message);
}

/*Calificación de estudiantes en asignaturas con la funcion calificar de estudiante */
try {
    estudiante1.calificar(tecnologia, 7);
    estudiante3.calificar(tecnologia, 8);
    estudiante3.calificar(historia, 6);
    estudiante1.calificar(historia, 8);
    estudiante2.calificar(matematicas, 6);
    estudiante2.calificar(historia, 7);
} catch (error) {
    console.error(error.message);
}


/**
 * Muestra el menú principal del sistema de gestión de estudiantes y asignaturas.
 * Permite realizar operaciones como añadir/eliminar estudiantes y asignaturas,
 * matricular/desmatricular estudiantes, asignar notas y calcular promedios.
 */
function mostrarMenu() {
    let continuar = true;
    while (continuar) {
        /**
         * Solicita al usuario una opción del menú.
         * @type {string}
         */
        const opcion = prompt(
            `=== Menú Principal ===\n`
            + `1. Añadir estudiante\n`
            + `2. Eliminar estudiante\n`
            + `3. Mostrar estudiantes\n`
            + `4. Añadir asignatura\n`
            + `5. Eliminar asignatura\n`
            + `6. Mostrar asignaturas\n`
            + `7. Matricular estudiante en asignatura\n`
            + `8. Desmatricular estudiante de asignatura\n`
            + `9. Calificar a un estudiante\n`
            + `10. Calcular promedio de un estudiante\n`
            + `11. Calcular promedio general de estudiantes\n`
            + `0. Salir\n`
            + `Escribe tu opción:`
        );

        try {
            switch (opcion) {
                case "1": {
                    /**
                     * Añade un nuevo estudiante al sistema.
                     * @description Solicita los datos del estudiante, crea una instancia y la añade a la lista.
                     */
                    console.clear();
                    prompt("Introduce los datos del estudiante:");

                    /**
                     * Nombre del estudiante.
                     * @type {string} 
                     */
                    const nombre = prompt("Nombre del estudiante:");
                    /**
                     * Edad del estudiante.
                     * @type {number} 
                     */
                    const edad = parseInt(prompt("Edad del estudiante:"), 10);

                    /* Dirección del estudiante */
                    /**
                     * Calle de la dirección del estudiante.
                     * @type {string} 
                     */
                    const calle = prompt("Calle de la dirección:");
                    /**
                     * Número de la dirección del estudiante.
                     * @type {string} 
                     */
                    const numero = prompt("Número de la dirección:");
                    /**
                     * Piso de la dirección del estudiante.
                     * @type {string} 
                     */
                    const piso = prompt("Piso de la dirección:");
                    /**
                     * Código postal de la dirección del estudiante.
                     * @type {string} 
                     */
                    const codPostal = prompt("Código postal de la dirección:");
                    /**
                     * Provincia de la dirección del estudiante.
                     * @type {string} 
                     */
                    const provincia = prompt("Provincia de la dirección:");
                    /**
                     * Localidad de la dirección del estudiante.
                     * @type {string} 
                     */
                    const localidad = prompt("Localidad de la dirección:");

                    /**
                     * Crea una nueva dirección para el estudiante.
                     * @type {Direccion}
                     */
                    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
                    /**
                     * Crea una nueva instancia de estudiante y lo agrega a la lista.
                     * @type {Estudiante}
                     */
                    const nuevoEstudiante = new Estudiante(nombre, edad, direccion);

                    listaEstu.addEstudiante(nuevoEstudiante);
                    prompt(`Estudiante ${nombre} añadido con éxito. Presiona Enter para continuar.`);
                    break;
                }

                case "2": {
                    /**
                     * Elimina un estudiante del sistema.
                     * @description Solicita el nombre del estudiante, lo busca y lo elimina si existe.
                     */
                    console.clear();
                    const nombreEliminar = prompt("Nombre del estudiante a eliminar:");
                    const estudianteEliminar = listaEstu.busquedaPorNombre(nombreEliminar);
                    if (estudianteEliminar) {
                        listaEstu.eliminarEstudiante(estudianteEliminar);
                        prompt(`Estudiante ${estudianteEliminar.nombre} eliminado. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                    }
                    break;
                }

                case "3": {
                    /**
                     * Muestra la lista de estudiantes registrados.
                     * @description Imprime en consola la lista de estudiantes almacenados en el sistema.
                     */
                    console.clear();
                    console.log("Lista de estudiantes:");
                    console.log(listaEstu.mostrarEstudiantes());
                    break;
                }

                case "4": {
                    /**
                     * Añade una nueva asignatura al sistema.
                     * @description Solicita el nombre de la asignatura y la agrega a la lista.
                     */
                    console.clear();
                    const nombreAsig = prompt("Nombre de la asignatura:");
                    /**
                     * Crea una nueva instancia de asignatura.
                     * @type {Asignatura}
                     */
                    const nuevaAsignatura = new Asignatura(nombreAsig);
                    listaAsig.addAsignatura(nuevaAsignatura);
                    prompt(`Asignatura ${nombreAsig} añadida con éxito. Presiona Enter para continuar.`);
                    break;
                }

                case "5": {
                    /**
                     * Elimina una asignatura del sistema.
                     * @description Solicita el nombre de la asignatura, la busca y la elimina si existe.
                     */
                    console.clear();
                    const nombreAsigEliminar = prompt("Nombre de la asignatura a eliminar:");
                    const asignaturaEliminar = listaAsig.buscarAsignaturas(nombreAsigEliminar);
                    if (asignaturaEliminar) {
                        listaAsig.eliminarAsignatura(asignaturaEliminar);
                        prompt(`Asignatura ${asignaturaEliminar.nombre} eliminada. Presiona Enter para continuar.`);
                    } else {
                        prompt("Asignatura no encontrada. Presiona Enter para continuar.");
                    }
                    break;
                }

                case "6": {
                    /**
                     * Muestra la lista de asignaturas registradas.
                     * @description Imprime en consola la lista de asignaturas almacenadas en el sistema.
                     */
                    console.clear();
                    console.log("Lista de asignaturas:");
                    console.log(listaAsig.mostrarAsignaturas());
                    break;
                }

                case "7":
                    /**
                     * Matricula a un estudiante en una asignatura.
                     * @description Solicita el ID del estudiante y el nombre de la asignatura,
                     * verifica que existan y matricula al estudiante en la asignatura.
                     */
                    console.clear();
                    const nombreEstuMatricular = prompt("Nombre del estudiante a matricular:");
                    const nombreAsigMatricular = prompt("Nombre de la asignatura:");
                    const estudianteMatricular = listaEstu.busquedaPorNombre(nombreEstuMatricular);
                    const asignaturaMatricular = listaAsig.buscarAsignaturas(nombreAsigMatricular);

                    if (estudianteMatricular && asignaturaMatricular) {
                        estudianteMatricular.matricular(asignaturaMatricular);
                        prompt(`Estudiante ${estudianteMatricular.nombre} matriculado en ${asignaturaMatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "8":
                    /**
                     * Desmatricula a un estudiante de una asignatura.
                     * @description Solicita el ID del estudiante y el nombre de la asignatura,
                     * verifica que existan y elimina la matrícula del estudiante en la asignatura.
                     */
                    console.clear();

                    prompt("Introduce el nombre del estudiante que deseas desmatricular:");
                    let estudianteDesmatricular = prompt("Nombre del estudiante:");
                    prompt("Introduce el nombre de la asignatura de la que deseas desmatricular al estudiante:");
                    let asignaturaDesmatricular = prompt("Nombre de la asignatura:");

                    estudianteDesmatricular = listaEstu.busquedaPorNombre(estudianteDesmatricular);
                    asignaturaDesmatricular = listaAsig.buscarAsignaturas(asignaturaDesmatricular);

                    if (estudianteDesmatricular && asignaturaDesmatricular) {
                        estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                        prompt(`Estudiante ${estudianteDesmatricular.nombre} desmatriculado de ${asignaturaDesmatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt(`No se ha podido desmatricular a ${estudianteDesmatricular.nombre} de ${asignaturaDesmatricular.nombre}`);
                    }
                    break;

                case "9":
                    /**
                     * Asigna una calificación a un estudiante en una asignatura.
                     * @description Solicita el ID del estudiante, la asignatura y la calificación,
                     * verifica que existan y asigna la nota.
                     */
                    console.clear();
                    const nombreEstuCalificar = prompt("Nombre del estudiante a calificar:");
                    const nombreAsigCalificar = prompt("Nombre de la asignatura:");
                    const calificacion = parseFloat(prompt("Calificación (0-10):"));
                    if (calificacion < 0 || calificacion > 10) {
                        prompt("La calificación debe estar entre 0 y 10. Presiona Enter para continuar.");
                        break;
                    }
                    const estudianteCalificar = listaEstu.busquedaPorNombre(nombreEstuCalificar);
                    const asignaturaCalificar = listaAsig.buscarAsignaturas(nombreAsigCalificar);

                    if (estudianteCalificar && asignaturaCalificar) {
                        estudianteCalificar.calificar(asignaturaCalificar, calificacion);
                        prompt(`Calificación añadida con éxito. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "10":
                    /**
                     * Calcula el promedio de un estudiante.
                     * @description Solicita el ID del estudiante, obtiene sus calificaciones y calcula su promedio.
                     */
                    console.clear();
                    const estPromedio = prompt("Nombre del estudiante:");
                    const estudiantePromedio = listaEstu.busquedaPorNombre(estPromedio);
                    if (estudiantePromedio) {
                        console.log(`Promedio del estudiante: ${estudiantePromedio.calcularPromedioEstudiante()}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                    }
                    break;

                case "11":
                    /**
                     * Calcula el promedio general de todos los estudiantes.
                     * @description Obtiene el promedio de calificaciones de todos los estudiantes y lo muestra.
                     */
                    console.clear();
                    const promedioGeneral = listaEstu.promedioEstudiantes();
                    prompt(`Promedio general de los estudiantes: ${promedioGeneral}. Presiona Enter para continuar.`);
                    break;

                case "0":
                    /**
                     * Finaliza la ejecución del programa.
                     * @description Muestra un mensaje de salida y cambia la variable de control para terminar el bucle.
                     */
                    console.clear();
                    prompt("Saliendo del programa... Presiona Enter para finalizar.");
                    continuar = false;
                    break;

                default:
                    /**
                     * Maneja opciones inválidas.
                     * @description Muestra un mensaje de error cuando el usuario ingresa una opción no válida.
                     */
                    prompt("Opción no válida. Por favor, introduce un número entre 0 y 11. Presiona Enter para continuar.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Ejecutar el programa
mostrarMenu();