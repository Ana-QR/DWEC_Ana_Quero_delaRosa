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
    /** @type {string} Nombre de la persona (solo letras y espacios). */
    #nombre;
    
    /** @type {number} Edad de la persona (número positivo). */
    #edad;
    
    /** @type {Direccion} Dirección de la persona (instancia de la clase Direccion). */
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
        return { ...this.#asignaturas };
    }

    /**
     * Matricula al estudiante en una o más asignaturas.
     * @param {...Object} asignaturas - Lista de asignaturas a matricular.
     */
    matricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            if (!this.#asignaturas.some(objetos => objetos.nombre === asignatura)) {
                this.#asignaturas.push({
                    nombre: asignatura.nombre,
                    calificaciones: [],
                    fechaMatricula: new Date(),
                    fechaDesmatricula: null
                });
                // Agregar al estudiante en la lista de la asignatura
                if (!asignatura.estudiantes.has(this.id)) {
                    asignatura.estudiantes.set(this.id, this);
                }

                console.log(`Estudiante ${this.nombre} matriculado en ${asignatura.nombre}`);
            } else {
                console.log(`El estudiante ${this.nombre} ya está matriculado en ${asignatura.nombre}`);
            }
        }
    }

    /**
     * Desmatricula al estudiante de una o más asignaturas.
     * @param {...Object} asignaturas - Lista de asignaturas a desmatricular.
     */
    desmatricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            const index = this.#asignaturas.findIndex(function (obj) {
                return obj.nombre === asignatura.nombre;
            });
            if (index !== -1) {
                this.#asignaturas.splice(index, 1);

                // Asegurar que se elimina del registro de la asignatura
                if (asignatura instanceof Asignatura && asignatura.estudiantes.has(this.id)) {
                    asignatura.estudiantes.delete(this.id);
                    console.log(`Estudiante ${this.nombre} eliminado de ${asignatura.nombre}`);
                }
            } else {
                console.log(`El estudiante ${this.nombre} no está matriculado en ${asignatura.nombre}`);
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
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }

        const index = this.#asignaturas.findIndex(function (obj) {
            return obj.nombre === asignatura.nombre;
        });

        if (index !== -1) {
            this.#asignaturas[index].calificaciones.push(calificacion);
            console.log(`Calificación añadida con éxito`);
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
            for (let calificacion of asignatura.calificaciones) {
                sum += calificacion;
                contador++;
            }
        }

        if (contador === 0) {
            return "No hay calificaciones";
        } else {
            let promedio = (sum / contador).toFixed(2);
            return Number(promedio);
        }
    }

    /**
     * Busca asignaturas según un patrón de texto.
     * @param {string} patron - Patrón de búsqueda.
     * @returns {string[]} Lista de asignaturas coincidentes.
     */
    buscarAsignaturas(patron) {
        const regex = new RegExp(patron, "i");
        return Object.keys(this.#asignaturas).filter(asignatura => regex.test(asignatura));
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
 */
class Direccion {
    /**
     * @type {string} Calle de la dirección.
     * @private
     */
    #calle;
    
    /**
     * @type {number} Número de la dirección.
     * @private
     */
    #numero;
    
    /**
     * @type {string} Piso de la dirección.
     * @private
     */
    #piso;
    
    /**
     * @type {string} Código postal (5 dígitos).
     * @private
     */
    #codigoPostal;
    
    /**
     * @type {string} Provincia de la dirección.
     * @private
     */
    #provincia;
    
    /**
     * @type {string} Localidad de la dirección.
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
    calificar(nota) {
        if (nota < 0 || nota > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        this.#calificaciones.push(nota);
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


/*
Clase ListaEstudiantes
Array que contiene a los estudiantes

Atributos:
    -listadoEstudiantes

Métodos:
    - Constructor: Permite inicializar la lista de estudiantes.
    - promedioEstudiantes: Promedio de las asignaturas de un estudiante.
    - addEstudiante: Añadir un estudiante en la lista.
    - eliminarEstudiante: Eliminar un estudiante de la lista.
    - busquedaPorNombre: Buscar un estudiante por nombre.
*/

class ListaEstudiantes {
    #listadoEstudiantes;

    constructor(...estudiantes) {
        this.#listadoEstudiantes = [];

        for (const estudiante of estudiantes) {
            this.addEstudiante(estudiante);
        }
    }

    ///////GETTER///////
    //Devuelve una copia del array de estudiantes
    get listadoEstudiantes() {
        return this.#listadoEstudiantes;
    }

    //Promedio general de las asignaturas de los estudiantes
    promedioEstudiantes() {
        let sum = 0;
        let contador = 0;

        for (let estudiante of this.#listadoEstudiantes) {
            sum += estudiante.calcularPromedioEstudiante();
            contador++;
        }

        if (contador === 0) {
            return "No hay estudiantes";
        } else {
            let promedio = (sum / contador).toFixed(2);
            return Number(promedio);
        }
    }

    //Añadir un estudiante a la lista
    addEstudiante(estudiante) {
        if (this.#listadoEstudiantes.includes(estudiante)) {
            throw new Error("El estudiante ya se encuentra en la lista, no puede haber duplicados");
        } else {
            this.#listadoEstudiantes.push(estudiante);
        }
    }

    /**
    * Eliminar un estudiante de la lista
    * @param {Estudiante} estudiante - Estudiante a eliminar
    * @throws {Error} - Si el estudiante no se encuentra en la lista
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
   * Busca un estudiante por nombre
   * @param {string} nombre - El nombre del estudiante a buscar
   * @returns {Estudiante[]} Los estudiantes que coinciden con el nombre
   */
    busquedaPorNombre(nombre) {
        const regex = new RegExp(nombre, 'i');
        return this.#listadoEstudiantes.filter(elemento => regex.test(elemento.nombre || elemento.toString()));
    }

}


/*
Clase ListaAsignaturas
Array que contiene las asignaturas

Atributos:  
    -listadoAsignaturas

Métodos:
    - Constructor: Permite inicializar la lista de asignaturas.
    - Getter: listadoAsignaturas (devuelve una copia del array de asignaturas).
    - addAsignatura: Añadir una asignatura en la lista.
    - eliminarAsignatura: Eliminar una asignatura de la lista.
    - buscarAsignaturas: Buscar asignaturas según un patrón de texto.
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
        return this.#listadoAsignaturas;
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
        const regex = new RegExp(patron, 'i');
        return this.#listadoAsignaturas.filter(function (elemento) {
            return regex.test(elemento.nombre || elemento.toString());
        });
    }
}

///////////////////////////////////PRUEBAS///////////////////////////////////////
const listaEstu = new ListaEstudiantes();
const listaAsig = new ListaAsignaturas();

console.log("Listas de estudiantes y asignaturas creadas con éxito");
const direccion1 = new Direccion("Calle Quero", 12, 1, "23790", "Jaén", "Porcuna");
const direccion2 = new Direccion("Calle Huesa", 13, "", "23790", "Jaén", "Porcuna");
const direccion3 = new Direccion("Calle Emilio Sebastián", 14, "1C", "18013", "Granada", "Granada");

// Definir estudiantes
const estudiante1 = new Estudiante("Mario Vaquerizo", 40, direccion1);
const estudiante2 = new Estudiante("Paula Mola", 20, direccion2);
const estudiante3 = new Estudiante("Federico Garcia", 50, direccion3);

// Agregar estudiantes a la lista usando addEstudiante
listaEstu.addEstudiante(estudiante1);
listaEstu.addEstudiante(estudiante2);
listaEstu.addEstudiante(estudiante3);

// Crear asignaturas
const matematicas = new Asignatura("Matemáticas");
const historia = new Asignatura("Historia");
const artes = new Asignatura("Artes");
const tecnologia = new Asignatura("Tecnología");

//Agregar asignaturas a la lista usando addAsignatura
listaAsig.addAsignatura(matematicas);
listaAsig.addAsignatura(historia);
listaAsig.addAsignatura(artes);
listaAsig.addAsignatura(tecnologia);

// Matricular estudiantes en asignaturas
estudiante1.matricular(matematicas, historia, tecnologia);
estudiante2.matricular(matematicas, artes);
estudiante3.matricular(historia, artes, tecnologia);

// Asignar notas
matematicas.calificar(estudiante1, 8.5);
matematicas.calificar(estudiante2, 9.0);

historia.calificar(estudiante1, 7.5);
historia.calificar(estudiante3, 8.0);

artes.calificar(estudiante2, 9.5);
artes.calificar(estudiante3, 8.5);

tecnologia.calificar(estudiante1, 10.0);
tecnologia.calificar(estudiante3, 8.8);

prompt("Datos inicializados correctamente. Presiona Enter para continuar.");

// Eliminar estudiantes y asignaturas
try {
    listaEstu.eliminarEstudiante(estudiante3);
    listaAsig.eliminarAsignatura(artes);
    prompt("Estudiantes y asignaturas eliminados con éxito");
} catch (error) {
    console.error(error.message);
}

//Matricular y desmatricular estudiantes de asignaturas
try {
    estudiante2.matricular(historia);
    estudiante1.desmatricular(historia);
} catch (error) {
    console.error(error.message);
}

//Calificación de estudiantes en asignaturas con la funcion calificar de estudiante
try {
    estudiante1.calificar(tecnologia, 7);
    estudiante3.calificar(tecnologia, 8);
    estudiante3.calificar(historia, 6);
    estudiante1.calificar(historia, 8);
    estudiante2.calificar(matematicas, 6);
} catch (error) {
    console.error(error.message);
}


function mostrarMenu() {

    let continuar = true;
    while (continuar) {
        const opcion = prompt(
            `=== Menú Principal ===
                1. Añadir estudiante
                2. Eliminar estudiante
                3. Mostrar estudiantes
                4. Añadir asignatura
                5. Eliminar asignatura
                6. Mostrar asignaturas
                7. Matricular estudiante en asignatura
                8. Desmatricular estudiante de asignatura
                9. Asignar nota a un estudiante
                10. Calcular promedio de un estudiante
                11. Calcular promedio general de estudiantes
                0. Salir
                Escribe tu opción:`
        );

        try {
            switch (opcion) {
                case "1":
                    // Añadir estudiantes
                    console.clear();
                    prompt(`Introduce los datos que debe poseer el estudiante: (enter para continuar)`);
                    const nombre = prompt("Nombre del estudiante:");
                    const edad = parseInt(prompt("Edad del estudiante:"), 10);
                    const calle = prompt("Calle de la dirección:");
                    const numero = prompt("Número de la dirección:");
                    const piso = prompt("Piso de la dirección:");
                    const codPostal = prompt("Código postal de la dirección:");
                    const provincia = prompt("Provincia de la dirección:");
                    const localidad = prompt("Localidad de la dirección:");
                    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);

                    const nuevoEstudiante = new Estudiante(nombre, edad, direccion);

                    listaEstu.addEstudiante(nuevoEstudiante);
                    prompt(`Estudiante ${nombre} añadido con éxito. Presiona Enter para continuar.`);
                    break;

                case "2":
                    // Eliminar estudiantes
                    console.clear();
                    prompt(`Introduce lo siguiente para eliminar al estudiante: `);
                    const nombreEliminar = prompt("Nombre del estudiante a eliminar:");
                    const estudianteEliminar = listaEstu.busquedaPorNombre(nombreEliminar)[0];
                    if (estudianteEliminar) {
                        listaEstu.eliminarEstudiante(estudianteEliminar);
                        prompt(`Estudiante ${estudianteEliminar.nombre} eliminado. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                    }
                    break;

                case "3":
                    // Mostrar estudiantes
                    console.clear();
                    if (listaEstu.listadoEstudiantes.length === 0) {
                        prompt("No hay estudiantes en la lista. Presiona Enter para continuar.");
                    } else {
                        console.log("Lista de estudiantes:\n");
                        for (const estudiante of listaEstu.listadoEstudiantes) {
                            console.log(estudiante.toString());
                        }
                    }
                    break;

                case "4":
                    // Añadir asignaturas
                    console.clear();
                    const nombreAsig = prompt("Nombre de la asignatura:");

                    const nuevaAsignatura = new Asignatura(nombreAsig);

                    listaAsig.addAsignatura(nuevaAsignatura);
                    prompt(`Asignatura ${nombreAsig} añadida con éxito. Presiona Enter para continuar.`);
                    break;

                case "5":
                    // Eliminar asignaturas
                    console.clear();
                    prompt(`Introduce lo siguiente para eliminar la asignatura: `);
                    const nombreAsigEliminar = prompt("Nombre de la asignatura a eliminar:");
                    const asignaturaEliminar = listaAsig.buscarAsignaturas(nombreAsigEliminar)[0];
                    if (asignaturaEliminar) {
                        listaAsig.eliminarAsignatura(asignaturaEliminar);
                        prompt(`Asignatura ${asignaturaEliminar.nombre} eliminada. Presiona Enter para continuar.`);
                    } else {
                        prompt("Asignatura no encontrada. Presiona Enter para continuar.");
                    }
                    break;

                case "6":
                    // Mostrar asignaturas
                    console.clear();
                    if (listaAsig.listadoAsignaturas.length === 0) {
                        prompt("No hay asignaturas en la lista. Presiona Enter para continuar.");
                    } else {
                        console.log("Lista de asignaturas:\n");
                        for (const asignatura of listaAsig.listadoAsignaturas) {
                            console.log(asignatura.toString());
                        }
                    }
                    break;

                case "7":
                    // Matricular estudiantes en asignaturas
                    console.clear();
                    const idEstMatricular = parseInt(prompt("ID del estudiante a matricular:"), 10);
                    const nombreAsigMatricular = prompt("Nombre de la asignatura:");
                    const estudianteMatricular = listaEstu.listadoEstudiantes[idEstMatricular];
                    const asignaturaMatricular = listaAsig.listadoAsignaturas.find(function (a) {
                        return a.nombre === nombreAsigMatricular;
                    });

                    if (estudianteMatricular && asignaturaMatricular) {
                        estudianteMatricular.matricular(asignaturaMatricular);
                        prompt(`Estudiante ${estudianteMatricular.nombre} matriculado en ${asignaturaMatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "8":
                    // Desmatricular estudiantes de asignaturas
                    console.clear();
                    const idEstDesmatricular = parseInt(prompt("ID del estudiante a desmatricular:"), 10);
                    const estudianteDesmatricular = listaEstu.listadoEstudiantes.find(function (est) {
                        return est.id === idEstDesmatricular;
                    });

                    if (!estudianteDesmatricular) {
                        prompt("Estudiante no encontrado. Presiona Enter para continuar.");
                        break;
                    }

                    const nombreAsigDesmatricular = prompt("Nombre de la asignatura:");
                    const asignaturaDesmatricular = listaAsig.listadoAsignaturas.find(function (asig) {
                        return asig.nombre === nombreAsigDesmatricular;
                    });

                    if (!asignaturaDesmatricular) {
                        prompt("Asignatura no encontrada. Presiona Enter para continuar.");
                        break;
                    }

                    estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                    prompt(`Estudiante ${estudianteDesmatricular.nombre} desmatriculado de ${asignaturaDesmatricular.nombre}. Presiona Enter para continuar.`);
                    break;

                case "9":
                    // Calificar estudiantes en asignaturas
                    console.clear();
                    const idEstCalificar = parseInt(prompt("ID del estudiante a calificar:"), 10);
                    const nombreAsigCalificar = prompt("Nombre de la asignatura:");
                    const calificacion = parseFloat(prompt("Calificación (0-10):"));
                    const estudianteCalificar = listaEstu.listadoEstudiantes[idEstCalificar];
                    const asignaturaCalificar = listaAsig.listadoAsignaturas.find(function (a) {
                        return a.nombre === nombreAsigCalificar;
                    });

                    if (estudianteCalificar && asignaturaCalificar) {
                        estudianteCalificar.calificar(asignaturaCalificar, calificacion);
                        prompt(`Calificación añadida con éxito. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "10":
                    // Calcular promedio de un estudiante
                    console.clear();
                    const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                    const estudiantePromedio = listaEstu.listadoEstudiantes[idEstPromedio];
                    const promedioEstudiante = estudiantePromedio.calcularPromedioEstudiante();

                    prompt(`Promedio del estudiante: ${promedioEstudiante}. Presiona Enter para continuar.`);
                    break;

                case "11":
                    // Calcular promedio general de los estudiantes
                    console.clear();
                    const promedioGeneral = listaEstu.promedioEstudiantes();
                    prompt(`Promedio general de los estudiantes: ${promedioGeneral}. Presiona Enter para continuar.`);
                    break;

                case "0":
                    // Salir del programa
                    console.clear();
                    prompt("Saliendo del programa... Presiona Enter para finalizar.");
                    continuar = false;
                    break;

                default:
                    prompt("Opción no válida. Por favor, introduce un número entre 0 y 10. Presiona Enter para continuar.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Ejecutar el programa
mostrarMenu();