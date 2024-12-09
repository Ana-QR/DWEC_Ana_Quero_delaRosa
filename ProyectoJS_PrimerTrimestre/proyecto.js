/**
 * Hecho por: Ana Quero de la Rosa
 */

/**
 * 2. Definición de Clases
 * 
 * En esta parte se definen las clases Direccion, Estudiante y Asignatura, con sus respectivas funcionalidades.
 * Se incluye validación de datos, métodos para gestionar información y ejemplos de uso.
 */

/**
 * 2.1. Clase Direccion
 * 
 * Representa una dirección postal.
 * Atributos: calle, número, piso, código postal, provincia y localidad. Todos son privados.
 * Métodos:
 *  - Constructor: Permite inicializar los datos, validando el código postal (5 dígitos).
 *  - Getter y Setter: Para acceder y modificar cada atributo.
 *  - toString(): Devuelve una representación en texto de la dirección.
 */

class Direccion{
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle,numero,piso,codigoPostal,provincia,localidad){
        this.#calle = calle;
        this.#numero= numero;
        this.#piso = piso;
        this.#provincia = provincia;
        this.#localidad = localidad;
        this.#codigoPostal = this.validarCodigoPostal(codigoPostal);
    }

  get calle() {
    return this.#calle;
  }

  set calle(calle) {
    this.#calle = calle;
  }

  get numero() {
    return this.#numero;
  }

  set numero(numero) {
    this.#numero = numero;
  }

  get piso() {
    return this.#piso;
  }

  set piso(piso) {
    this.#piso = piso;
  }

  get codigoPostal() {
    return this.#codigoPostal;
  }

  set codigoPostal(codigoPostal) {
    this.#codigoPostal = codigoPostal;
  }

  get provincia() {
    return this.#provincia;
  }

  set provincia(provincia) {
    this.#provincia = provincia;
  }

  get localidad() {
    return this.#localidad;
  }

  set localidad(localidad) {
    this.#localidad = localidad;
  }

  validarCodigoPostal(codigoPostal) {
    const regex = /^\d{5}$/;  // Expresión regular para verificar que sea un código postal de 5 dígitos
    return regex.test(codigoPostal) ? codigoPostal : "00000";  // Si es válido, devuelve el codigo postal; si no, pone "00000"
  }

  toString() {
    return `${this.#calle}, ${this.#numero}, ${this.#piso}, ${this.#codigoPostal}, ${this.#provincia}, ${this.#localidad}`;
  }


}

// // función para pedir los datos al usuario y crear una dirección
// function crearDireccion() {
//     const calle = prompt("Introduce la calle:");
//     const numero = prompt("Introduce el número:");
//     const piso = prompt("Introduce el piso (si no tiene, deja vacío):");
//     const codigoPostal = prompt("Introduce el código postal (5 dígitos):");
//     const provincia = prompt("Introduce la provincia:");
//     const localidad = prompt("Introduce la localidad:");
  
//     // creamos un objeto de tipo Direccion con los datos introducidos
//     const direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
  
//     // mostramos la dirección en consola
//     console.log("Dirección creada: " + direccion.toString());
//   }
  
//   // llamamos a la función para crear una dirección
//   crearDireccion();

/**
 * 2.2. Clase Estudiante
 * 
 * Representa un estudiante con atributos como ID, nombre, edad, dirección y asignaturas matriculadas.
 * Métodos:
 *  - Matricular/desmatricular asignaturas.
 *  - Agregar calificaciones.
 *  - Calcular el promedio de las calificaciones.
 *  - Buscar asignaturas por patrón de texto.
 */
class Estudiante{
#id;
#nombre; //el nombre debe tener solo letras y espacios
#edad;
#direccion;
#asignaturas;

constructor(id, nombre, edad, direccion){
    if (/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) { //el gorrito indica una negacion, coincidirá con cualquier carácter que no esté dentro de los corchetes y el \s es para que coincida con cualquier caracter de espacio en blanco
        throw new Error("El nombre solo debe contener letras y espacios")
    }
    this.#id = id;
    this.#nombre = nombre;
    this.#edad = edad >= 0 ? edad: 0; //si la edad es negativa se inicializa a 0, esto ayuda a que no puedan haber edades negativas
    this.#direccion = direccion;
    this.#asignaturas = {};
}

get id() {
    return this.#id;
}

get nombre() {
    return this.#nombre;
}

set nombre(nuevoNombre) {
    if (/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nuevoNombre)) {
        throw new Error("El nombre solo debe contener letras y espacios");
    }
    this.#nombre = nuevoNombre;
}

get edad() {
    return this.#edad;
}

set edad(nuevaEdad) {
    if (nuevaEdad < 0) {
        throw new Error("La edad debe ser un número positivo");
    }
    this.#edad = nuevaEdad;
}

get direccion() {
    return this.#direccion;
}

set direccion(nuevaDireccion) {
    if (!(nuevaDireccion instanceof Direccion)) {
        throw new Error("La dirección debe ser una instancia de la clase direccion");
    }
    this.#direccion = nuevaDireccion;
}

get asignaturas() {
    return { ...this.#asignaturas };
}

toString(){
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

desmatricular(asignatura){
    if (!this.#asignaturas[asignatura]) {
        throw new Error(`La asignatura "${asignatura}" no está registrada`);
    }else{
        delete this.#asignaturas[asignatura];
        console.log(`Estudiante ${this.#nombre} desmatriculado de ${asignatura}`);
    }
    
}

//cada estudiante puede recibir varias clasificaciones por asignatura. Numeros entre 0 y 10
agregarCalificacion(asignatura, calificacion){
    if (this.#asignaturas[asignatura]) {
        if (calificacion >= 0 && calificacion <=10) {
            this.#asignaturas[asignatura].calificaciones.push(calificacion);
            console.log(`La calificación ${calificacion} se ha añadido a ${asignatura} para ${this.#nombre}`);
        }else{
            console.log("La calificación debe ser entre 0 y 10");
        }
    }else{
        console.log(this.#nombre +" no está matriculado en "+ asignatura);
    }

}

//media de las notas del estudiante
calcularPromedio(){
    let totalNotas = 0;
    let cantidadNotas = 0;

    //el for in que se utiliza está diseñado para recorrer todas las propiedades enumerables de un objeto
    /*  const ejemplo = { a: 1, b: 2, c: 3 };
        for (let clave in ejemplo) {
            console.log(clave); // Imprime: 'a', 'b', 'c'
        } 
        console.log(ejemplo[clave]); // Imprime: 1, 2, 3
    */
    for(let asignatura in this.#asignaturas){
        const calificaciones = this.#asignaturas[asignatura].calificaciones;
        totalNotas += calificaciones.reduce((a,b)=> a + b, 0);
        cantidadNotas += calificaciones.lenght;
    }

    return cantidadNotas > 0 ? (totalNotas / cantidadNotas).toFixed(2) : 0;
}

//buscar asignaturas según un patrón de texto
buscarAsignaturas(patron) {
    const regex = new RegExp(patron, "i");
    return Object.keys(this.#asignaturas).filter(asignatura => regex.test(asignatura));
  }

}

/**
 * 2.3. Clase Asignatura
 * 
 * Representa una asignatura con un nombre y calificaciones asociadas.
 * Métodos:
 *  - Añadir calificaciones.
 *  - Obtener el promedio de calificaciones.
*/

class Asignatura{
    #nombre;
    #calificaciones;
    constructor(nombre){
        if(!/^([a-zA-Z\sIVXLCDM]+)$/.test(nombre)){
            throw new Error("El nombre de la asignatura solo puede contener letras, números y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = [];
    }

    addEstudiante(estudiante) {
        this.estudiantes.set(estudiante, []);
    }

    eliminarEstudiante(estudiante) {
        this.estudiantes.delete(estudiante);
    }

    calificar(estudiante, nota) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}.`);
        }
        if (nota < 0 || nota > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        this.estudiantes.get(estudiante).push(nota);
    }

    addCalificaciones(calificacion){
        if(calificacion < 0 || calificacion > 10){
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        this.#calificaciones.push(calificacion);
    }

    getPromedio(){
        if(this.#calificaciones.length === 0) return 0;
        const total = this.#calificaciones.reduce((suma, calificacion)=> suma + calificacion, 0);
        return (total / this.#calificaciones.length).toFixed(2);
    }

    toString(){
        return`${this.#nombre}, ${this.#calificaciones}`;
    }
    
}

// function generarReporteEstudiantes(estudiantes) {
//     estudiantes.forEach(estudiante => {
//         console.log(estudiante.toString());
//         estudiante.asignaturas.forEach((notas, asignatura) => {
//             const promedio = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : "Sin calificaciones";
//             console.log(`  ${asignatura.nombre}: Promedio ${promedio}`);
//         });
//         console.log(`  Promedio General del Estudiante: ${estudiante.getPromedio()}`);
//     });
// }

// function calcularPromedioGeneral(estudiantes) {
//     const totalPromedios = estudiantes.reduce((suma, estudiante) => suma + parseFloat(estudiante.getPromedio()), 0);
//     return (totalPromedios / estudiantes.length).toFixed(2);
// }




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////EJEMPLO DE USO DE LAS CLASES ANTERIORES/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Crear una dirección
// const direccion1 = new Direccion("Calle Mayor", 10, "2ºB", "28013", "Madrid", "Madrid");

// // Crear un estudiante con la dirección
// const estudiante1 = new Estudiante(1, "Juan Pérez", 20, direccion1);

// // Mostrar información del estudiante
// console.log(`Estudiante creado: 
// ID: ${estudiante1.id}
// Nombre: ${estudiante1.nombre}
// Edad: ${estudiante1.edad}
// Dirección: ${estudiante1.direccion.toString()}`);

// // Matricular al estudiante en asignaturas
// estudiante1.matricular("Matemáticas");
// estudiante1.matricular("Historia");

// // Agregar calificaciones
// estudiante1.agregarCalificacion("Matemáticas", 9);
// estudiante1.agregarCalificacion("Matemáticas", 7.5);
// estudiante1.agregarCalificacion("Historia", 8);

// // Mostrar promedio de calificaciones
// console.log(`Promedio de ${estudiante1.nombre}: ${estudiante1.calcularPromedio()}`);

// // Buscar asignaturas por patrón
// const asignaturasEncontradas = estudiante1.buscarAsignaturas("mat");
// console.log(`Asignaturas encontradas: ${asignaturasEncontradas.join(", ")}`);

// // Desmatricular al estudiante de una asignatura
// estudiante1.desmatricular("Historia");

// // Mostrar asignaturas finales
// console.log(`Asignaturas actuales de ${estudiante1.nombre}:`);
// for (let asignatura in estudiante1.asignaturas) {
//     console.log(`- ${asignatura}`);
// }

// // Crear asignaturas
// const matematicas = new Asignatura("Matemáticas");
// const historia = new Asignatura("Historia");

// // Agregar calificaciones a las asignaturas
// matematicas.addCalificaciones(9);
// matematicas.addCalificaciones(8.5);
// historia.addCalificaciones(7);
// historia.addCalificaciones(6.5);

// // Mostrar promedio de calificaciones por asignatura
// console.log(`Promedio de ${matematicas.nombre}: ${matematicas.getPromedio()}`);
// console.log(`Promedio de ${historia.nombre}: ${historia.getPromedio()}`);

// // Crear una asignatura con un nombre inválido (esto lanzará un error)
// try {
//     const asignaturaInvalida = new Asignatura("Matemáticas_123");
// } catch (error) {
//     console.error("Error al crear la asignatura:", error.message);
// }



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Herencia
class Lista{
    #elementos;
    constructor(){
        this.#elementos = [];
    }

    get elementos(){
        return [...this.#elementos]; //lo que tiene la lista
    }

    add(elemento){
        if(!this.#elementos.includes(elemento)){
            this.#elementos.push(elemento);
            console.log("Se han añadido nuevos elementos a la lista");
        }else{
            throw new Error("El elemento ya existe en la lista");
        }
    }

    borrar(elemento){
        const longitudInicial = this.#elementos.length;
        this.#elementos = this.#elementos.filter(i => i !== elemento);
        if(this.#elementos.length === longitudInicial){
            throw new Error("El elemento no se ha encontrado en la lista")
        }
    }

    buscar(patron){
        const regex = new RegExp(patron, 'i');
        return this.#elementos(elemento => regex.test(elemento.nombre || elemento.toString()));
    }

    get size() {
        return this.#elementos.length;
    }

    // Método protegido para las subclases
    _getElementos() {
        return this.#elementos;
    }
}

/**
 * 2.3. Clase ListaEstudiantes
 * 
 * + mostrarReporte(): Muestra mediante console.log(), console.groupCollapsed() y console.groupEnd() el reporte
 *      con la información de todos los estudiantes del Array lista. console.log() muestra por
 *      consola un mensaje. console.groupCollapsed() muestra por consola un mensaje cómo título de una
 *      carpeta colapsada de los mensajes que vayan a continuación. console.groupEnd() indica el final de
 *      dicha carpeta de mensajes.
 */

class ListaEstudiantes extends Lista{
    constructor (){
        super();
    }

    obtenerPromedioGeneral(){
        const estudiantes = this._getElementos();
        if (estudiantes.length === 0) return 0;
        const total = estudiantes.reduce((sum, estudiante) => sum + parseFloat(estudiante.getOverallAverage()), 0);
        return (total / estudiantes.length).toFixed(2);
    }

    addEstudiante(estudiante) {
        if (!(estudiante instanceof Estudiante)) {
            throw new Error("Solo se pueden añadir objetos de tipo Estudiante.");
        }else{
            super.add(estudiante);
        }
    }
        
    encontrarPorNombre(nombre) {
        return super.buscar(nombre);
    }

    mostrarDatos(){
        const promedioAsignatura = estudiante.asignatura.calificaciones.reduce((a,b)=> a+b,0) / (estudiante.asignatura.calificaciones.lenght || 1); //promedio de una asignatura
        console.log("Reporte de estudiantes \n");
        this.lista.forEach(estudiante =>{
            console.log(`ID: ${estudiante.id}\n`);
            console.log(`Nombre: ${estudiante.nombre}\n`);
            console.log(`Edad: ${estudiante.edad}\n`);
            console.log(`ASIGNATURAS:\n`);
            console.log(`Nombre: ${estudiante.asignatura}\n`);
            console.log(`Nota: ${estudiante.calificaciones}\n`);
            console.log(`PROMEDIO DE LA ASIGNATURA:\n`);
            console.log(`Promedio: ${promedioAsignatura.toFixed(2)}\n`);
        })
    }
}


/**
 * 2.5. Clase ListaAsignaturas
*/

class ListaAsignaturas extends Lista{
    constructor(){
        super();
    }

    addAsignatura(asignatura){
        if(!(asignatura instanceof Asignatura)){
            throw new Error("Solo se pueden añadir objetos de tipo asignatura")
        }else{
            this.add(asignatura);
        }
    }

    obtenerPromedioCalificaciones(){
        const asignaturas = this._getElementos();
        return asignaturas.map(asignatura => ({
            nombre: asignatura.nombre,
            promedio: asignatura.getPromedio()
        }));
    }
}

// Ejemplo de uso completo

// Crear direcciones
const direccion1 = new Direccion("Calle Falsa", 123, 1, "12345", "Provincia1", "Localidad1");
const direccion2 = new Direccion("Avenida Real", 456, 2, "67890", "Provincia2", "Localidad2");

// Crear estudiantes
const estudiante1 = new Estudiante(1, "Juan Pérez", 20, direccion1);
const estudiante2 = new Estudiante(2, "María López", 22, direccion2);

// Crear asignaturas
const matematicas = new Asignatura("Matemáticas");
const historia = new Asignatura("Historia");

// Matricular estudiantes en asignaturas
estudiante1.matricular(matematicas);
estudiante1.matricular(historia);
estudiante2.matricular(matematicas);

// Agregar calificaciones
estudiante1.agregarCalificacion("Matemáticas", 9);
estudiante1.agregarCalificacion("Matemáticas", 7.5);
estudiante1.agregarCalificacion("Historia", 8);

estudiante2.agregarCalificacion("Matemáticas", 7);
estudiante2.agregarCalificacion("Matemáticas", 6.5);

// Crear lista de estudiantes y agregar estudiantes
const listaEstudiantes = new ListaEstudiantes();
listaEstudiantes.addEstudiante(estudiante1);
listaEstudiantes.addEstudiante(estudiante2);

// Mostrar reporte de estudiantes
listaEstudiantes.mostrarDatos();

// Mostrar promedio general de todos los estudiantes
console.log(`Promedio General de Todos los Estudiantes: ${listaEstudiantes.obtenerPromedioGeneral()}`);
