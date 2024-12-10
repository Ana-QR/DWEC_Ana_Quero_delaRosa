/**
 * Hecho por: Ana Quero de la Rosa
 */

/*https://ana-qr.github.io/DWEC_QueroDeLaRosa_Ana-tareas/primertrimestre/index.html */

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
    if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)) { //el gorrito indica una negacion, coincidirá con cualquier carácter que no esté dentro de los corchetes y el \s es para que coincida con cualquier caracter de espacio en blanco
        throw new Error("El nombre solo debe contener letras y espacios");
    }
    this.#id = id;
    this.#nombre = nombre;
    this.#edad = edad >= 0 ? edad: 0; //si la edad es negativa se inicializa a 0, esto ayuda a que no puedan haber edades negativas
    this.#direccion = direccion;
    this.#asignaturas = [];
}

get id() {
    return this.#id;
}

get nombre() {
    return this.#nombre;
}

set nombre(nuevoNombre) {
    if (!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nuevoNombre)) {
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
    const asignaturasCalificadas = this.#asignaturas.filter(a => typeof a[1] != "string");
        
    if(asignaturasCalificadas.length == 0) return "Sin evaluar";
        
    const resultado = asignaturasCalificadas.reduce((suma, asignatura) => suma += asignatura[1], 0) / asignaturasCalificadas.length;
        
    return Number(resultado).toFixed(2);
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
    #calificaciones; //son las calificaciones generales, no están asociadas a ningún estudiante
    #estudiantes;

    constructor(nombre){
        if(!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(nombre)){
            throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");
        }
        this.#nombre = nombre;
        this.#calificaciones = []; //calificaciones generales
        this.#estudiantes = new Map() // map para asociar los estudiantes son sus calificaciones
    }

    get nombre() {
        return this.#nombre;
    }

    get calificaciones(){
        return this.#calificaciones;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    set calificaciones(calificaciones){
        this.#calificaciones = calificaciones;
    }

    get estudiantes(){
        return this.#estudiantes;
    }

    set estudiantes(estudiantes){
        this.#estudiantes = estudiantes;
    }

    addEstudiante(estudiante) {
        if(this.#estudiantes.has(estudiante)){
            throw new Error(`${estudiante.nombre} ya está matriculado en ${this.#nombre}`);
        }else{
            this.#estudiantes.set(estudiante, []); //se inicializa un array vacío para sus calificaciones
        }
    }

    eliminarEstudiante(estudiante) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}`);
        }else{
            this.estudiantes.delete(estudiante); //se elimina el estudiante de la asignatura
        }
    }

    calificar(estudiante, nota) {
        if (!this.estudiantes.has(estudiante)) {
            throw new Error(`${estudiante.nombre} no está matriculado en ${this.#nombre}.`);
        }else if (nota < 0 || nota > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }else{
            this.estudiantes.get(estudiante).push(nota); //añade la nota al array del estudiante
        }
        
    }

    addCalificaciones(calificacion){
        if(calificacion < 0 || calificacion > 10){
            throw new Error("La calificación debe estar entre 0 y 10.");
        }else{
            this.#calificaciones.push(calificacion);//añade calificaciones generales
        }
    }

    eliminarCalificación(calificacion){
        const indiceCalificacion = this.#calificaciones.indexOf(calificacion);

        if(indiceCalificacion == -1) throw new Error("Ningún estudiante ha sacado dicha calificación.");

        this.#calificaciones.splice(indiceCalificacion, 1);
    }

    toString(){
        return`${this.#nombre}, ${this.#calificaciones}, ${this.#estudiantes}`;
    }
    
}

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
    constructor (...estudiantes){
        super();

        for(const estudiante of estudiantes){

            this.añadirEstudiante(estudiante);

        }
    }

    get promedioGeneral(){
        const estudiantes = this._getElementos();
        if (estudiantes.length === 0) return 0;
        const total = estudiantes.reduce((sum, estudiante) => sum + parseFloat(estudiante.calcularPromedio()), 0);
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


/**
 * 2.5. Clase ListaAsignaturas
*/

class ListaAsignaturas extends Lista{
    constructor(...asignaturas){
        super();

        for(const asignatura of asignaturas){

            this.addAsignatura(asignatura);

        }
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

// Paso 1: Crear direcciones
const calle1 = prompt("Ingrese la calle de la primera dirección:");
const numero1 = parseInt(prompt("Ingrese el número de la primera dirección:"));
const piso1 = parseInt(prompt("Ingrese el piso de la primera dirección:"));
const codigoPostal1 = prompt("Ingrese el código postal de la primera dirección:");
const provincia1 = prompt("Ingrese la provincia de la primera dirección:");
const localidad1 = prompt("Ingrese la localidad de la primera dirección:");
const direccion1 = new Direccion(calle1, numero1, piso1, codigoPostal1, provincia1, localidad1);
console.log("Dirección creada:", direccion1);

const calle2 = prompt("Ingrese la calle de la segunda dirección:");
const numero2 = parseInt(prompt("Ingrese el número de la segunda dirección:"));
const piso2 = parseInt(prompt("Ingrese el piso de la segunda dirección:"));
const codigoPostal2 = prompt("Ingrese el código postal de la segunda dirección:");
const provincia2 = prompt("Ingrese la provincia de la segunda dirección:");
const localidad2 = prompt("Ingrese la localidad de la segunda dirección:");
const direccion2 = new Direccion(calle2, numero2, piso2, codigoPostal2, provincia2, localidad2);
console.log("Dirección creada:", direccion2);

// Paso 2: Crear estudiantes
const id1 = parseInt(prompt("Ingrese el ID del primer estudiante:"));
const nombre1 = prompt("Ingrese el nombre del primer estudiante:");
const edad1 = parseInt(prompt("Ingrese la edad del primer estudiante:"));
const estudiante1 = new Estudiante(id1, nombre1, edad1, direccion1);
console.log("Estudiante creado:", estudiante1);

const id2 = parseInt(prompt("Ingrese el ID del segundo estudiante:"));
const nombre2 = prompt("Ingrese el nombre del segundo estudiante:");
const edad2 = parseInt(prompt("Ingrese la edad del segundo estudiante:"));
const estudiante2 = new Estudiante(id2, nombre2, edad2, direccion2);
console.log("Estudiante creado:", estudiante2);

// Paso 3: Crear asignaturas
const nombreAsignatura1 = prompt("Ingrese el nombre de la primera asignatura:");
const matematicas = new Asignatura(nombreAsignatura1);
console.log("Asignatura creada:", matematicas);

const nombreAsignatura2 = prompt("Ingrese el nombre de la segunda asignatura:");
const historia = new Asignatura(nombreAsignatura2);
console.log("Asignatura creada:", historia);

// Paso 4: Matricular estudiantes en asignaturas
console.log("\nMatriculando estudiantes...");
estudiante1.matricular(matematicas);
console.log(`Estudiante ${estudiante1.nombre} matriculado en ${matematicas.nombre}`);

estudiante1.matricular(historia);
console.log(`Estudiante ${estudiante1.nombre} matriculado en ${historia.nombre}`);

estudiante2.matricular(matematicas);
console.log(`Estudiante ${estudiante2.nombre} matriculado en ${matematicas.nombre}`);

// Paso 5: Agregar calificaciones
console.log("\nAgregando calificaciones...");
const calificacion1 = parseFloat(prompt(`Ingrese la calificación para ${estudiante1.nombre} en ${matematicas.nombre}:`));
estudiante1.agregarCalificacion("Matemáticas", calificacion1);

const calificacion2 = parseFloat(prompt(`Ingrese otra calificación para ${estudiante1.nombre} en ${matematicas.nombre}:`));
estudiante1.agregarCalificacion("Matemáticas", calificacion2);

const calificacion3 = parseFloat(prompt(`Ingrese la calificación para ${estudiante1.nombre} en ${historia.nombre}:`));
estudiante1.agregarCalificacion("Historia", calificacion3);

const calificacion4 = parseFloat(prompt(`Ingrese la calificación para ${estudiante2.nombre} en ${matematicas.nombre}:`));
estudiante2.agregarCalificacion("Matemáticas", calificacion4);

const calificacion5 = parseFloat(prompt(`Ingrese otra calificación para ${estudiante2.nombre} en ${matematicas.nombre}:`));
estudiante2.agregarCalificacion("Matemáticas", calificacion5);

// Paso 6: Crear lista de estudiantes y agregar estudiantes
const listaEstudiantes = new ListaEstudiantes();
listaEstudiantes.addEstudiante(estudiante1);
listaEstudiantes.addEstudiante(estudiante2);
console.log("Estudiantes agregados a la lista.");

// Paso 7: Mostrar reporte de estudiantes
console.log("\nMostrando reporte de estudiantes:");
listaEstudiantes.mostrarDatos();

// Paso 8: Mostrar promedio general
console.log("\nCalculando promedio general de todos los estudiantes...");
const promedioGeneral = listaEstudiantes.calcularPromedio();
console.log(`Promedio General de Todos los Estudiantes: ${promedioGeneral}`);








// // Crear direcciones predefinidas
// const direccion1 = new Direccion("Calle Falsa", 123, 1, "23001", "Jaén", "Porcuna");
// const direccion2 = new Direccion("Avenida Siempreviva", 742, 2, "23002", "Jaén", "Jaén");

// // Crear estudiantes
// const estudiante1 = new Estudiante(1, "Juan Pérez", 20, direccion1);
// const estudiante2 = new Estudiante(2, "María López", 22, direccion2);

// // Crear asignaturas predefinidas
// const matematicas = new Asignatura("Matemáticas");
// const historia = new Asignatura("Historia");

// // Matricular estudiantes en asignaturas
// estudiante1.matricular(matematicas);
// estudiante1.matricular(historia);
// estudiante2.matricular(matematicas);

// // Agregar calificaciones predefinidas
// estudiante1.agregarCalificacion("Matemáticas", 9);
// estudiante1.agregarCalificacion("Historia", 7);
// estudiante2.agregarCalificacion("Matemáticas", 6);
// estudiante2.agregarCalificacion("Matemáticas", 8);

// // Crear lista de estudiantes
// const listaEstudiantes = new ListaEstudiantes();
// listaEstudiantes.addEstudiante(estudiante1);
// listaEstudiantes.addEstudiante(estudiante2);

// // Mostrar los datos de los estudiantes
// console.log("\nMostrando reporte de estudiantes:");
// listaEstudiantes.mostrarDatos();

// // Mostrar el promedio general de calificaciones
// console.log("\nCalculando promedio general de todos los estudiantes...");
// const promedioGeneral = listaEstudiantes.obtenerPromedioGeneral();
// console.log(`Promedio General: ${promedioGeneral}`);