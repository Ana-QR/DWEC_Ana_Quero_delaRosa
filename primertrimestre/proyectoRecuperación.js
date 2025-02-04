/**
 * Hecho por: Ana Quero de la Rosa
 */

/*https://ana-qr.github.io/DWEC_QueroDeLaRosa_Ana-tareas/primertrimestre/index.html */


/*
2.1. Clase Direccion
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
        return `${this.#calle}, ${this.#numero}, ${this.#piso}, ${this.#codigoPostal}, ${this.#provincia}, ${this.#localidad}`;
    }
}

/*
Clase Persona
Es la clase de la que va a heredar estudiante, cualquier estudiante es una persona

Atributos:
    -nombre
    -edad
    -dirección

*/
class Persona{
    #nombre;
    #edad;
    #direccion;

    constructor(nombre, edad, direccion){
        this.#nombre = nombre;
        this.#edad = edad;
        this.#direccion = direccion;
    }

    toString(){
        return `Nombre: ${this.#nombre},\nEdad: ${this.#edad}, \nDirección: ${this.#direccion}\n`;
    }
}



/*
2.2. Clase Estudiante 
Representa un estudiante

Atributos:
    -ID
    -nombre
    -edad
    -dirección
    -asignaturas matriculadas

Métodos:
    - Matricular/desmatricular asignaturas.
    - Agregar calificaciones.
    - Calcular el promedio de las calificaciones.
    - Buscar asignaturas por patrón de texto.
*/

class Estudiante extends Persona{
    #id;
    #nombre; //el nombre debe tener solo letras y espacios
    #edad;
    #direccion;
    #asignaturas;

    constructor(id, nombre, edad, direccion) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) { //el gorrito indica una negacion, coincidirá con cualquier carácter que no esté dentro de los corchetes y el \s es para que coincida con cualquier caracter de espacio en blanco
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#id = id;
        this.#nombre = nombre;
        this.#edad = edad >= 0 ? edad : 0; //si la edad es negativa se inicializa a 0, esto ayuda a que no puedan haber edades negativas
        this.#direccion = direccion;
        this.#asignaturas = new Map();
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombreNuevo) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombreNuevo)) {
            throw new Error("El nombre solo debe contener letras y espacios");
        }
        this.#nombre = nombreNuevo;
    }

    get edad() {
        return this.#edad;
    }

    set edad(edadNueva) {
        if (edadNueva < 0) {
            throw new Error("La edad debe ser un número positivo");
        }
        this.#edad = edadNueva;
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(direccionNueva) {
        if (!(direccionNueva instanceof Direccion)) {
            throw new Error("La dirección debe ser una instancia de la clase direccion");
        }
        this.#direccion = direccionNueva;
    }

    get asignaturas() {
        return { ...this.#asignaturas };
    }

    toString() {
        return `${this.#id}, ${this.#nombre}, ${this.#edad}, ${this.#direccion}, ${this.#asignaturas}`;
    }

    // Matricular al estudiante en una asignatura
    matricular(asignatura) {
        if (!this.#asignaturas[asignatura]) {
            this.#asignaturas[asignatura] = { calificaciones: [], fechaMatricula: new Date(), fechaDesmatricula: null };
            console.log(`Estudiante ${this.#nombre} matriculado en ${asignatura}`);
        } else {
            console.log(`El estudiante ${this.#nombre} ya está matriculado en ${asignatura}`);
        }
    }

    //Desmatricular al estudiante de una asignatura
    desmatricular(asignatura) {
        if (!this.#asignaturas[asignatura]) {
            throw new Error(`La asignatura "${asignatura}" no está registrada`);
        } else {
            delete this.#asignaturas[asignatura];
            console.log(`Estudiante ${this.#nombre} desmatriculado de ${asignatura}`);
        }

    }

    //Cada estudiante puede recibir varias clasificaciones por asignatura. Numeros entre 0 y 10
    calificar(asignatura, calificacion) {
        if (this.#asignaturas[asignatura]) {
            if (calificacion >= 0 && calificacion <= 10) {
                this.#asignaturas[asignatura].calificaciones.push(calificacion);
                console.log(`La calificación ${calificacion} se ha añadido a ${asignatura} para ${this.#nombre}`);
            } else {
                console.log("La calificación debe ser entre 0 y 10");
            }
        } else {
            console.log(this.#nombre + " no está matriculado en " + asignatura);
        }

    }

    //Media de las notas del estudiante
    calcularPromedio() { 
        const asignaturasCalificadas = [];
    
        for (const asignatura in this.#asignaturas) {
            if (this.#asignaturas[asignatura].calificaciones.length > 0) {
                asignaturasCalificadas.push(this.#asignaturas[asignatura]);
            }
        }
        
        if (asignaturasCalificadas.length === 0){
            return "Sin evaluar";
    
        }
        
        let sumaTotal = 0;
        for (let i = 0; i < asignaturasCalificadas.length; i++) {
            let sumaCalificaciones = 0;
            let asignatura = asignaturasCalificadas[i];
        
            for (let j = 0; j < asignatura.calificaciones.length; j++) {
                sumaCalificaciones += asignatura.calificaciones[j];
            }
        
            sumaTotal += sumaCalificaciones / asignatura.calificaciones.length;
        }        
    
        const resultado = sumaTotal / asignaturasCalificadas.length;
    
        return Number(resultado).toFixed(2);
    }
    




    //Buscar asignaturas según un patrón de texto
    buscarAsignaturas(patron) {
        const regex = new RegExp(patron, "i"); //el modificador "i" indica que la busqueda sea insensible a mayusculas y minusculas
        return Object.keys(this.#asignaturas).filter(asignatura => regex.test(asignatura));
    }
}


/*
2.3. Clase Asignatura
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
    #estudiantes;

    constructor(nombre) {
        if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) {
            throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = []; //calificaciones generales
        this.#estudiantes = new Map() // map para asociar los estudiantes son sus calificaciones
    }

    get nombre() {
        return this.#nombre;
    }

    get calificaciones() {
        return this.#calificaciones;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    set calificaciones(calificaciones) {
        this.#calificaciones = calificaciones;
    }

    get estudiantes() {
        return this.#estudiantes;
    }

    set estudiantes(estudiantes) {
        this.#estudiantes = estudiantes;
    }

    addEstudiante(estudiante) {
        if (this.#estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} ya está matriculado en ${this.#nombre}`);
        } else {
            this.#estudiantes.set(estudiante, []); //se inicializa un array vacío para sus calificaciones
        }
    }

    eliminarEstudiante(estudiante) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}`);
        } else {
            this.estudiantes.delete(estudiante); //se elimina el estudiante de la asignatura
        }
    }

    calificar(estudiante, nota) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}.`);
        } else if (nota < 0 || nota > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        } else {
            this.estudiantes.get(estudiante).push(nota); //añade la nota al array del estudiante
        }

    }

    addCalificacion(calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        } else {
            this.#calificaciones.push(calificacion);//añade calificaciones generales
        }
    }

    eliminarCalificacion(calificacion) {
        const indiceCalificacion = this.#calificaciones.indexOf(calificacion);

        if (indiceCalificacion == -1) throw new Error("Ningún estudiante ha sacado dicha calificación.");

        this.#calificaciones.splice(indiceCalificacion, 1);
    }

    toString() {
        return `${this.#nombre}, ${this.#calificaciones}, ${this.#estudiantes}`;
    }

}


class Lista {
    #elementos;
    constructor() {
        this.#elementos = [];
    }

    get elementos() {
        return [...this.#elementos]; //lo que tiene la lista
    }

    add(elemento) {
        if (!this.#elementos.includes(elemento)) {
            this.#elementos.push(elemento);
            console.log("Se han añadido nuevos elementos a la lista");
        } else {
            throw new Error("El elemento ya existe en la lista");
        }
    }

    borrar(elemento) {
        const longitudInicial = this.#elementos.length;
        this.#elementos = this.#elementos.filter(i => i !== elemento);
        if (this.#elementos.length === longitudInicial) {
            throw new Error("El elemento no se ha encontrado en la lista")
        }
    }

    buscar(patron) {
        const regex = new RegExp(patron, 'i');
        return this.#elementos.filter(elemento => regex.test(elemento.nombre || elemento.toString()));
    }

    get size() {
        return this.#elementos.length;
    }

    // Método protegido para las subclases
    _getElementos() {
        return this.#elementos;
    }
}

/*
2.3. Clase ListaEstudiantes
Array que contiene a los estudiantes

Métodos:
    - Añadir estudiantes
    - Encontrar un estudiante por nombre
    - Mostrar datos de los estudiantes
 */

class ListaEstudiantes{
    constructor(...estudiantes) {
        super();

        for (const estudiante of estudiantes) {

            this.addEstudiante(estudiante);

        }
    }

    get promedioGeneral() {
        const estudiantes = this._getElementos();
        if (estudiantes.length === 0) return 0;
        const total = estudiantes.reduce((sum, estudiante) => sum + parseFloat(estudiante.calcularPromedio()), 0);
        return (total / estudiantes.length).toFixed(2);
    }

    addEstudiante(estudiante) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("Solo se pueden añadir objetos de tipo Estudiante.");
        } else {
            super.add(estudiante);
        }
    }

    borrarEstudiante(estudiante) {
        const longitudInicial = this.estudiantes.length;
        this.estudiantes = this.estudiantes.filter(i => i !== estudiante);
        if (this.estudiantes.length === longitudInicial) {
            throw new Error("El estudiante no se ha encontrado en la lista")
        }
    }

    encontrarPorNombre(nombre) {
        return super.buscar(nombre);
    }

    mostrarDatos() {
        console.log("Reporte de estudiantes:");
        this._getElementos().forEach(estudiante => {
            console.groupCollapsed(`Estudiante: ${estudiante.nombre}`);
            console.log(`ID: ${estudiante.id}`);
            console.log(`Edad: ${estudiante.edad}`);
            console.log(`Promedio de calificaciones: ${estudiante.calcularPromedio()}`);
            console.log(`Asignaturas: ${Object.keys(estudiante.asignaturas).join(', ')}`);
            console.groupEnd();
        });
    }

}


// Llamada a la función para inicializar datos antes de mostrar el menú
//inicializarDatos();

function programa() {
    function mostrarMenu() {
        let continuar = true;
        while (continuar) {
            const opcion = prompt(
                `=== Menú Principal ===
                1. Añadir estudiante
                2. Eliminar estudiante
                3. Mostrar estudiantes
                4. Añadir asignatura
                5. Mostrar asignaturas
                6. Matricular estudiante en asignatura
                7. Desmatricular estudiante de asignatura
                8. Asignar nota a un estudiante
                9. Calcular promedio de un estudiante
                10. Calcular promedio general de estudiantes
                0. Salir
                Escribe tu opción:`
            );

            switch (opcion) {
                case "1":
                    const nombre = prompt("Nombre del estudiante:");
                    const edad = parseInt(prompt("Edad del estudiante:"), 10);
                    const calle = prompt("Calle de la dirección:");
                    const numero = prompt("Número de la dirección:");
                    const piso = prompt("Piso de la dirección:");
                    const codPostal = prompt("Código postal de la dirección:");
                    const provincia = prompt("Provincia de la dirección:");
                    const localidad = prompt("Localidad de la dirección:");
                    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
                    PlistaEstudiantes.addEstudiante(nombre, edad, direccion);
                    prompt(`Estudiante ${nombre} añadido con éxito. Presiona Enter para continuar.`);
                    break;

                case "2":
                    const idEliminar = parseInt(prompt("ID del estudiante a eliminar:"), 10);
                    listaEstudiantes.eliminarEstudiante(idEliminar);
                    prompt(`Estudiante con ID ${idEliminar} eliminado. Presiona Enter para continuar.`);
                    break;

                case "3":
                    let listaEstud = "Lista de estudiantes:\n";
                    for (const id in listaEstudiantes.listaEstud) {
                        listaEstud += `${listaEstudiantes.listaEstud[id].toString()}\n`;
                    }
                    prompt(listaEstud);
                    break;

                case "4":
                    const nombreAsignatura = prompt("Nombre de la asignatura:");
                    asignaturas.push(new Asignatura(nombreAsignatura));
                    prompt(`Asignatura ${nombreAsignatura} añadida con éxito. Presiona Enter para continuar.`);
                    break;

                case "5":
                    let listaAsignaturas = "Lista de asignaturas:\n";
                    asignaturas.forEach(a => {
                        listaAsignaturas += `Asignatura: ${a.nombre}, Estudiantes matriculados: ${a.listaEstudiantes.length}\n`;
                    });
                    prompt(listaAsignaturas);
                    break;

                case "6":
                    const idEstMatricular = parseInt(prompt("ID del estudiante a matricular:"), 10);
                    const nombreAsigMatricular = prompt("Nombre de la asignatura:");
                    const estudianteMatricular = PlistaEstudiantes.listaEstudiantes[idEstMatricular];
                    const asignaturaMatricular = asignaturas.find(a => a.nombre === nombreAsigMatricular);
                    if (estudianteMatricular && asignaturaMatricular) {
                        estudianteMatricular.matricular(asignaturaMatricular);
                        prompt(`Estudiante ${estudianteMatricular.nombre} matriculado en ${asignaturaMatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "7":
                    const idEstDesmatricular = parseInt(prompt("ID del estudiante a desmatricular:"), 10);
                    const nombreAsigDesmatricular = prompt("Nombre de la asignatura:");
                    const estudianteDesmatricular = listaEstudiantes.listaEstudiantes[idEstDesmatricular];
                    const asignaturaDesmatricular = asignatura.find(a => a.nombre === nombreAsigDesmatricular);

                    if (estudianteDesmatricular && asignaturaDesmatricular) {
                        estudianteDesmatricular.desmatricular(asignaturaDesmatricular);
                        prompt(`Estudiante ${estudianteDesmatricular._nombre} desmatriculado de ${asignaturaDesmatricular.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "8":
                    const idEstNota = parseInt(prompt("ID del estudiante:"), 10);
                    const nombreAsigNota = prompt("Nombre de la asignatura:");
                    const nota = parseFloat(prompt("Introduce la nota (0-10):"));
                    const estudianteNota = listaEstudiantes.listaEstudiantes[idEstNota];
                    const asignaturaNota = asignaturas.buscarAsignaturas(a => a.nombre === nombreAsigNota);

                    if (estudianteNota && asignaturaNota) {
                        asignaturaNota.addCalificacion(estudianteNota, nota);
                        prompt(`Nota ${nota} asignada a ${estudianteNota._nombre} en ${asignaturaNota.nombre}. Presiona Enter para continuar.`);
                    } else {
                        prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");
                    }
                    break;

                case "9":
                    const idEstPromedio = parseInt(prompt("ID del estudiante:"), 10);
                    const estudiantePromedio = listaEstudiantes.listaEstudiantes[idEstPromedio];

                    if (estudiantePromedio && estudiantePromedio._asignaturas.length > 0) {
                        const promedio = estudiantePromedio.promedioIndividual();
                        prompt(`Promedio de ${estudiantePromedio._nombre}: ${promedio}. Presiona Enter para continuar.`);
                    } else {
                        prompt("No hay asignaturas matriculadas o el estudiante no existe. Presiona Enter para continuar.");
                    }
                    break;

                case "10":
                    let sumaPromedios = 0;
                    let totalEstudiantes = 0;

                    for (const id in listaEstudiantes.listaEstudiantes) {
                        const estudiante = PlistaEstudiantes.listaEstudiantes[id];
                        const promedio = parseFloat(estudiante.promedio());
                        if (!isNaN(promedio)) {
                            sumaPromedios += promedio;
                            totalEstudiantes++;
                        }
                    }

                    const promedioGeneral = totalEstudiantes ? (sumaPromedios / totalEstudiantes).toFixed(2) : 0;
                    prompt(`Promedio general de todos los estudiantes: ${promedioGeneral}. Presiona Enter para continuar.`);
                    break;

                case "0":
                    prompt("Saliendo del programa... Presiona Enter para finalizar.");
                    continuar = false;
                    break;

                default:
                    prompt("Opción no válida. Por favor, introduce un número entre 0 y 10. Presiona Enter para continuar.");
            }
        }
    }

    mostrarMenu();
}

// Ejecutar el programa
//programa();