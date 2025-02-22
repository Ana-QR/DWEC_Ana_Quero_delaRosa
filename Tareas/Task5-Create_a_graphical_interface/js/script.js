/**
 * Hecho por: Ana Quero de la Rosa
*/

// ************* IMPORTACIÓN DE FICHEROS ******************
import { Estudiante } from "./Estudiante.js";
import { Asignatura } from "./Asignatura.js";
import { Direccion } from "./Direccion.js";
import { ListaEstudiantes } from "./ListaEstudiantes.js";
import { ListaAsignaturas } from "./ListaAsignaturas.js";


/**
* Pruebas de la clase ListaEstudiantes y ListaAsignaturas.
*/
const listaEstu = new ListaEstudiantes();
const listaAsig = new ListaAsignaturas();

// console.log("Listas de estudiantes y asignaturas creadas con éxito");
// const direccion1 = new Direccion("Calle Quero", 12, 1, "23790", "Jaén", "Porcuna");
// const direccion2 = new Direccion("Calle Huesa", 13, "", "23790", "Jaén", "Porcuna");
// const direccion3 = new Direccion("Calle Emilio Sebastián", 14, "1C", "18013", "Granada", "Granada");
// const direccion4 = new Direccion("hola", 12, "", "23790", "Jaén", "Porcuna");

// /* Definir estudiantes */
// const estudiante1 = new Estudiante("Mario Vaquerizo", 40, direccion1);
// const estudiante2 = new Estudiante("Paula Mola", 20, direccion2);
// const estudiante3 = new Estudiante("Federico Garcia", 50, direccion3);
// const estudiante4 = new Estudiante("ana", 20, direccion4);

// /* Agregar estudiantes a la lista usando addEstudiante */
// listaEstu.addEstudiante(estudiante1);
// listaEstu.addEstudiante(estudiante2);
// listaEstu.addEstudiante(estudiante3);
// listaEstu.addEstudiante(estudiante4);

// /* Crear asignaturas */
// const matematicas = new Asignatura("Matemáticas");
// const historia = new Asignatura("Historia");
// const artes = new Asignatura("Artes");
// const tecnologia = new Asignatura("Tecnología");
// const musica = new Asignatura("musica");

// /* Agregar asignaturas a la lista usando addAsignatura */
// listaAsig.addAsignatura(matematicas);
// listaAsig.addAsignatura(historia);
// listaAsig.addAsignatura(artes);
// listaAsig.addAsignatura(tecnologia);
// listaAsig.addAsignatura(musica);

// /* Matricular estudiantes en asignaturas */
// estudiante1.matricular(matematicas, historia, tecnologia);
// estudiante2.matricular(matematicas, artes);
// estudiante3.matricular(historia, artes, tecnologia);
// estudiante4.matricular(musica, matematicas, historia, tecnologia);

// /* Asignar notas */
// matematicas.calificar(estudiante1, 8.5);
// matematicas.calificar(estudiante2, 9.0);

// historia.calificar(estudiante1, 7.5);
// historia.calificar(estudiante3, 8.0);

// artes.calificar(estudiante2, 9.5);
// artes.calificar(estudiante3, 8.5);

// tecnologia.calificar(estudiante1, 10.0);
// tecnologia.calificar(estudiante3, 8.8);

// prompt("Datos inicializados correctamente. Presiona Enter para continuar.");

// /* Eliminar estudiantes y asignaturas */
// try {
//     listaEstu.eliminarEstudiante(estudiante3);
//     listaAsig.eliminarAsignatura(artes);
//     prompt("Estudiantes y asignaturas eliminados con éxito");
// } catch (error) {
//     console.error(error.message);
// }

// /*Matricular y desmatricular estudiantes de asignaturas */
// try {
//     estudiante2.matricular(historia);
//     estudiante1.desmatricular(historia);
// } catch (error) {
//     console.error(error.message);
// }

// /*Calificación de estudiantes en asignaturas con la funcion calificar de estudiante */
// try {
//     estudiante1.calificar(tecnologia, 7);
//     estudiante3.calificar(tecnologia, 8);
//     estudiante3.calificar(historia, 6);
//     estudiante1.calificar(historia, 8);
//     estudiante2.calificar(matematicas, 6);
//     estudiante2.calificar(historia, 7);
// } catch (error) {
//     console.error(error.message);
// }


/* Guardar datos en localstorage */
function guardarDatos(event) {
    event.preventDefault();
    guardarEstudiantes();
    guardarAsignaturas();
    alert("Datos guardados correctamente.");
}

// Función para cargar estudiantes desde localStorage
function cargarEstudiantes() {
    let estudiantesGuardados = localStorage.getItem("listaEstudiantes_1");
    if (estudiantesGuardados) {
        estudiantesGuardados = JSON.parse(estudiantesGuardados);
        estudiantesGuardados.forEach(valor => {
            let direccion = new Direccion(
                valor.direccion.calle, valor.direccion.numero,
                valor.direccion.piso, valor.direccion.codigo_postal,
                valor.direccion.provincia, valor.direccion.localidad
            );
            let estudiante = new Estudiante(valor.nombre, valor.edad, direccion);
            listaEstu.addEstudiante(estudiante);
        });
    }
}

// Función para guardar estudiantes en localStorage
function guardarEstudiantes() {
    let estudiantes_1 = listaEstu.listadoEstudiantes.map(valor => ({  // <-- usa listaEstu.estudiantes
        nombre: valor.nombre,
        edad: valor.edad,
        direccion: {
            calle: valor.direccion.calle,
            numero: valor.direccion.numero,
            piso: valor.direccion.piso,
            codigo_postal: valor.direccion.codigo_postal,
            provincia: valor.direccion.provincia,
            localidad: valor.direccion.localidad
        }
    }));
    localStorage.setItem("listaEstudiantes_1", JSON.stringify(estudiantes_1));
}

// Función para eliminar un estudiante
function eliminarEstudiante(id) {
    listaEstu.eliminarEstudiante(id);  
    guardarEstudiantes();
}

// Función para mostrar estudiantes
function mostrarEstudiantes() {
    listaEstu.forEach(estudiante => {
        console.log(`Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}`);
    });
}

// Función para cargar asignaturas desde localStorage
function cargarAsignaturas() {
    let asignaturasGuardadas = localStorage.getItem("listaAsignaturas_1");
    if (asignaturasGuardadas) {
        asignaturasGuardadas = JSON.parse(asignaturasGuardadas);
        asignaturasGuardadas.forEach(asig => {
            let nuevaAsignatura = new Asignatura(asig.nombreA);
            listaAsig.addAsignatura(nuevaAsignatura);
        });
    }
}

// Función para guardar asignaturas en localStorage
function guardarAsignaturas() {
    let asignaturas_1 = listaAsig.listadoAsignaturas.map(asig => ({ nombreA: asig.nombre }));
    localStorage.setItem("listaAsignaturas_1", JSON.stringify(asignaturas_1));
}

// Función para eliminar una asignatura
function eliminarAsignatura(nombre) {
    listaAsig.eliminarAsignatura(nombre);  
    guardarAsignaturas();
}

// Función para mostrar asignaturas
function mostrarAsignaturas() {
    listaAsig.forEach(asig => {
        console.log(`Asignatura: ${asig.nombre}`);
    });
}

// Función para matricular un estudiante en una asignatura
function matricularEstudiante(estudiante, nombreAsig) {
    let estEncontrado = listaEstu.busquedaPorNombre(estudiante);
    let asignatura = listaAsig.listadoAsignaturas.find(asig => asig.nombre === nombreAsig);
    if (estEncontrado && asignatura) {
        estEncontrado.matricular(asignatura);
        guardarEstudiantes();
    }
}

// Función para desmatricular un estudiante de una asignatura
function desmatricularEstudiante(estudiante, nombreAsig) {
    let estEncontrado = listaEstu.busquedaPorNombre(estudiante);
    if (estEncontrado) {
        estEncontrado.asignaturas = estEncontrado.asignaturas.filter(asig => asig.nombre !== nombreAsig);
        guardarEstudiantes();
    }
}

// Función para calificar a un estudiante
function calificarEstudiante(estudiante, nombreAsig, nota) {
    let estEncontrado = listaEstu.busquedaPorNombre(estudiante);
    if (estEncontrado) {
        let asignatura = estEncontrado.asignaturas.find(asig => asig.nombre === nombreAsig);
        if (asignatura) {
            asignatura.nota = nota;
            guardarEstudiantes();
        }
    }
}

// Función para calcular el promedio de un estudiante
function calcularPromedioEstudiante(estudiante) {
    let estEncontrado = listaEstu.busquedaPorNombre(estudiante);
    if (estEncontrado) {
        let notas = estEncontrado.asignaturas.map(asig => asig.nota).filter(nota => nota !== undefined);
        let promedio = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length) : 0;
        console.log(`Promedio de ${estEncontrado.nombre}: ${promedio.toFixed(2)}`);
    }
}

// Función para calcular el promedio general de todos los estudiantes
function calcularPromedioGeneral() {
    let notasTotales = [];
    listaEstu.forEach(est => {
        let notas = est.asignaturas.map(asig => asig.nota).filter(nota => nota !== undefined);
        notasTotales.push(...notas);
    });
    let promedio = notasTotales.length ? (notasTotales.reduce((a, b) => a + b, 0) / notasTotales.length) : 0;
    console.log(`Promedio general de todos los estudiantes: ${promedio.toFixed(2)}`);
}

// Cargar datos al inicio
cargarEstudiantes();
cargarAsignaturas();


// ************* EVENTOS ******************
document.getElementById("guardarDatos").addEventListener("click", guardarDatos);
document.getElementById("mostrarEstudiantes").addEventListener("click", mostrarEstudiantes);
document.getElementById("mostrarAsignaturas").addEventListener("click", mostrarAsignaturas);
document.getElementById("calcularPromedioGeneral").addEventListener("click", calcularPromedioGeneral);
document.getElementById("calcularPromedioEstudiante").addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    calcularPromedioEstudiante(estudiante);
});
document.getElementById("eliminarEstudiante").addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    eliminarEstudiante(estudiante);
});
document.getElementById("eliminarAsignatura").addEventListener("click", () => {
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    eliminarAsignatura(asignatura);
});
document.getElementById("matricularEstudiante").addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    matricularEstudiante(estudiante, asignatura);
});
document.getElementById("desmatricularEstudiante").addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    desmatricularEstudiante(estudiante, asignatura);
});
document.getElementById("calificarEstudiante").addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    let nota = prompt("Introduce la nota:");
    calificarEstudiante(estudiante, asignatura, nota);
});
