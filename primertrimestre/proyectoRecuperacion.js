/**
 * Hecho por: Ana Quero de la Rosa
 */

/*https://ana-qr.github.io/DWEC_QueroDeLaRosa_Ana-tareas/primertrimestre/index.html */


/*
Clase Persona
Es la clase de la que va a heredar estudiante, cualquier estudiante es una persona

Atributos:
    -nombre
    -edad
    -dirección

*/
class Persona {
    #nombre;
    #edad;
    #direccion;

    constructor(nombre, edad, direccion) {
        if (!/^[a-zA-Z\s]+$/.test(nombre)) { //el gorrito indica una negacion, coincidirá con cualquier carácter que no esté dentro de los corchetes y el \s es para que coincida con cualquier caracter de espacio en blanco
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nombre;
        this.#edad = edad >= 0 ? edad : 0; //si la edad es negativa se inicializa a 0, esto ayuda a que no puedan haber edades negativas
        this.#direccion = direccion;
    }

    ///////GETTER///////
    get nombre() {
        return this.#nombre;
    }

    get edad() {
        return this.#edad;
    }

    get direccion() {
        return this.#direccion;
    }

    ///////SETTER///////
    set nombre(nombreNuevo) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombreNuevo)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nombreNuevo;
    }

    set edad(edadNueva) {
        if (edadNueva < 0) {
            throw new Error("La edad debe ser un número positivo");
        }
        this.#edad = edadNueva;
    }

    set direccion(direccionNueva) {
        if (!(direccionNueva instanceof Direccion)) {
            throw new Error("La dirección debe ser una instancia de la clase direccion");
        }
        this.#direccion = direccionNueva;
    }

    toString() {
        return `Nombre: ${this.#nombre},\n
        Edad: ${this.#edad}, \n
        Dirección: ${this.#direccion}\n`;
    }
}


/*
Clase Estudiante 
Representa un estudiante, hereda de la clase persona, este tiene sus datos, asignaturas y funcionalidades.

Atributos:
    - ID
    - asignaturas--> es un array que muestra en qué asignaturas está matriculado el estudiante. El array contiene:
        * La asignatura de la que está matriculado.
        * La fecha en la que se matriculó.

Métodos:
    - Constructor.
    - Getter y Setter
    - Matricular/desmatricular asignaturas.
    - Calificar
    - Calcular el promedio de las calificaciones.
*/

class Estudiante extends Persona {
    #id;
    #asignaturas;

    static contadorId = 0;
    constructor(nombre, edad, direccion) {
        super(nombre, edad, direccion);

        this.#id = Estudiante.contadorId++;
        this.#asignaturas = [];
    }

    ///////GETTER///////
    get id() {
        return this.#id;
    }

    get asignaturas() {
        return { ...this.#asignaturas };
    }

    // Matricular al estudiante en una asignatura
    matricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            if (!this.#asignaturas.some(objetos => objetos.nombre === asignatura)) {
                this.#asignaturas.push({
                    nombre: asignatura,
                    calificaciones: [],
                    fechaMatricula: new Date(),
                    fechaDesmatricula: null
                });
                console.log(`Estudiante ${this.nombre} matriculado en ${asignatura}`);
            } else {
                console.log(`El estudiante ${this.nombre} ya está matriculado en ${asignatura}`);
            }
        }
    }

    //Desmatricular al estudiante de una asignatura
    desmatricular(...asignaturas) {
        for (let asignatura of asignaturas) {
            const index = this.#asignaturas.findIndex(objetos => objetos.nombre === asignatura);
            if (index !== -1) {
                this.#asignaturas.splice(index, 1);
                console.log(`Estudiante ${this.nombre} desmatriculado de ${asignatura}`);
            } else {
                console.log(`El estudiante ${this.nombre} no está matriculado en ${asignatura}`);
            }
        }
    }

    //Cada estudiante puede recibir varias clasificaciones por asignatura. Numeros entre 0 y 10
    calificar(asignatura, calificacion) {
        const index = this.#asignaturas.findIndex(objetos => objetos.nombre === asignatura);
        if (index !== -1) {
            if (calificacion >= 0 && calificacion <= 10) {
                this.#asignaturas[index].calificaciones.push(calificacion);
                console.log(`Calificación añadida con éxito`);
            } else {
                console.log(`La calificación debe estar entre 0 y 10`);
            }
        } else {
            console.log(`El estudiante ${this.nombre} no está matriculado en ${asignatura}`);
        }

    }

    //Media de las notas del estudiante
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


    //Buscar asignaturas según un patrón de texto
    buscarAsignaturas(patron) {
        const regex = new RegExp(patron, "i"); //el modificador "i" indica que la busqueda sea insensible a mayusculas y minusculas
        return Object.keys(this.#asignaturas).filter(asignatura => regex.test(asignatura));
    }

    toString() {
        return `ID del estudiante: ${this.#id},\n
        Nombre del estudiante: ${this.nombre},\n
        Edad del estudiante: ${this.edad},\n
        Dirección del estudiante: ${this.direccion.toString()}\n`;
    }
}


/*
Clase Direccion
Representa una dirección postal.

Atributos: 
    -calle
    -número
    -piso
    -código postal
    -provincia y localidad
Todos son privados.

Métodos:
    - Constructor: Permite inicializar los datos, validando el código postal (5 dígitos).
    - Getter y Setter: Para acceder y modificar cada atributo.
    - toString(): Devuelve una representación en texto de la dirección.
*/

class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#provincia = provincia;
        this.#localidad = localidad;
        this.#codigoPostal = this.validarCodigoPostal(codigoPostal);
    }

    validarCodigoPostal(codigoPostal) {
        const regex = /^\d{5}$/;  // Expresión regular para verificar que sea un código postal de 5 dígitos
        return regex.test(codigoPostal) ? codigoPostal : "00000";  // Si es válido, devuelve el codigo postal; si no, pone "00000"
    }

    toString() {
        return `Calle: ${this.#calle},\n
        Numero: ${this.#numero},\n
        Piso: ${this.#piso},\n
        Código Postal: ${this.#codigoPostal},\n
        Provincia: ${this.#provincia},\n
        Localidad: ${this.#localidad}\n`;
    }
}


/*
Clase Asignatura
Representa una asignatura 

Atributos:
    -nombre 
    -calificaciones
    -estudiantes

Métodos:
    - Añadir calificaciones
    - Obtener el promedio de calificaciones
*/

class Asignatura {
    #nombre;
    #calificaciones; //son las calificaciones generales, no están asociadas a ningún estudiante

    constructor(nombre) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) {
            throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = []; //calificaciones generales
    }

    get nombre() {
        return this.#nombre;
    }

    get calificaciones() {
        return this.#calificaciones;
    }

    calificar(nota) {
        if (0 <= nota <= 10) {
            // Agrega la calificación al array
            this.#calificaciones.push(nota);
        } else {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
    }

    eliminarCalificacion(calificacion) {
        const indiceCalificacion = this.#calificaciones.indexOf(calificacion);

        if (indiceCalificacion == -1) throw new Error("Ningún estudiante ha sacado dicha calificación.");

        this.#calificaciones.splice(indiceCalificacion, 1);
    }

    toString() {
        return `Asignatura: ${this.#nombre}`;
    }

}


/*
Clase ListaEstudiantes
Array que contiene a los estudiantes

Métodos:
    - Constructor
    - Promedio de las asignaturas de un estudiante 
    - Añadir un estudiante en la lista
    - Eliminar un estudiante de la lista
    - Buscar un estudiante por nombre
    - Mostrar el contenido de la lista de los estudiantes
 */

class ListaEstudiantes {
    #listadoEstudiantes;

    constructor(...estudiantes) {
        this.#listadoEstudiantes = [];

        for (const estudiante of estudiantes) {
            this.addEstudiante(estudiante);
        }
    }

    get listadoEstudiantes() {
        return [...this.#listadoEstudiantes];
    }

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

    addEstudiante(estudiante) {
        if (this.#listadoEstudiantes.includes(estudiante)) {
            throw new Error("El estudiante ya se encuentra en la lista, no puede haber duplicados");
        } else {
            this.#listadoEstudiantes.push(estudiante);
        }
    }

    eliminarEstudiante(estudiante) {
        if (this.#listadoEstudiantes.includes(estudiante)) {
            this.#listadoEstudiantes = this.#listadoEstudiantes.filter(e => e !== estudiante);
            console.log("Estudiante eliminado con éxito");
        } else {
            throw new Error("El estudiante no se encuentra en el listado");
        }
    }

    busquedaPorNombre(nombre) {
        const regex = new RegExp(nombre, 'i');
        return this.#listadoEstudiantes.filter(elemento => regex.test(elemento.nombre || elemento.toString()));
    }

}


/*
Clase ListaAsignaturas
Array que contiene las asignaturas

Métodos:
    - Constructor
    - Promedio de las calificaciones de todas las asignaturas
    - Añadir una asignatura en la lista
    - Eliminar una asignatura de la lista
    - Buscar una asignatura por un patrón 
*/

class ListaAsignaturas {
    #listadoAsignaturas;

    constructor(...asignaturas) {
        this.#listadoAsignaturas = [];

        for (let asignatura of asignaturas) {
            this.addAsignatura(asignatura);
        }
    }

    get listadoAsignaturas() {
        return this.#listadoAsignaturas;
    }

    addAsignatura(asignatura) {
        this.#listadoAsignaturas.push(asignatura);
    }

    eliminarAsignatura(asignatura) {
        if (this.#listadoAsignaturas.includes(asignatura)) {
            this.#listadoAsignaturas = this.#listadoAsignaturas.filter(e => e !== asignatura);
            console.log("Asignatura eliminada con éxito");
        } else {
            throw new Error("La asignatura no se encuentra en el listado");
        }
    }

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
listaEstu.eliminarEstudiante(estudiante3);
listaAsig.eliminarAsignatura(artes);

prompt("Estudiantes y asignaturas eliminados con éxito");

//Matricular y desmatricular estudiantes de asignaturas
estudiante2.matricular(historia);
estudiante1.desmatricular(historia);

//Calificación de estudiantes en asignaturas con la funcion calificar de estudiante
estudiante1.calificar(tecnologia, 7);
estudiante3.calificar(tecnologia, 8);
estudiante3.calificar(historia, 6);
estudiante1.calificar(historia, 8);
estudiante2.calificar(matematicas, 6);


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

        switch (opcion) {
            case "1":
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
                console.clear();
                if (listaEstu.listadoEstudiantes.length === 0) {
                    prompt("No hay estudiantes en la lista. Presiona Enter para continuar.");                    
                }else{
                    console.log("Lista de estudiantes:\n");
                    for (const estudiante of listaEstu.listadoEstudiantes) {
                        console.log(estudiante.toString());
                    }
                }
                break;

            case "4":
                console.clear();
                const nombreAsig = prompt("Nombre de la asignatura:");

                const nuevaAsignatura = new Asignatura(nombreAsig);

                listaAsig.addAsignatura(nuevaAsignatura);
                prompt(`Asignatura ${nombreAsig} añadida con éxito. Presiona Enter para continuar.`);
                break;

            case "5":
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
                console.clear();
                if (listaAsig.listadoAsignaturas.length === 0) {
                    prompt("No hay asignaturas en la lista. Presiona Enter para continuar.");                    
                }else{
                    console.log("Lista de asignaturas:\n");
                    for (const asignatura of listaAsig.listadoAsignaturas) {
                        console.log(asignatura.toString());
                    }
                }
                break;

            case "7":
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
                console.clear();
                const idEstDesmatricular = parseInt(prompt("ID del estudiante a desmatricular:"), 10);
                const nombreAsigDesmatricular = prompt("Nombre de la asignatura:");
                const estudianteDesmatricular = listaEstu[idEstDesmatricular];
                const asignaturaDesmatricular = listaAsig.find(function (a) {
                    return a.nombre === nombreAsigDesmatricular;
                });

                if (estudianteDesmatricular && asignaturaDesmatricular) {
                    estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                    prompt(`Estudiante ${estudianteDesmatricular.nombre} desmatriculado de ${asignaturaDesmatricular.nombre}. Presiona Enter para continuar.`);
                } else {
                    prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                }
                break;

            case "9":
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
                console.clear();
                const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                const estudiantePromedio = listaEstu.listadoEstudiantes[idEstPromedio];
                const promedioEstudiante = estudiantePromedio.calcularPromedioEstudiante();

                prompt(`Promedio del estudiante: ${promedioEstudiante}. Presiona Enter para continuar.`);
                break;

            case "11":
                console.clear();
                const promedioGeneral = listaEstu.promedioEstudiantes();
                prompt(`Promedio general de los estudiantes: ${promedioGeneral}. Presiona Enter para continuar.`);
                break;

            case "0":
                console.clear();
                prompt("Saliendo del programa... Presiona Enter para finalizar.");
                continuar = false;
                break;

            default:
                prompt("Opción no válida. Por favor, introduce un número entre 0 y 10. Presiona Enter para continuar.");
        }
    }
}

// Ejecutar el programa
mostrarMenu();