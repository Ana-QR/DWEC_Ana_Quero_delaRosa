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

/* Guardar estudiantes y asignaturas en localstorage */
function guardarEstudiantes() {
    let estudiantes = listaEstu.getEstudiantes().map(estudiante => ({
        nombre: estudiante.nombre,
        edad: estudiante.edad,
        direccion: {
            calle: estudiante.direccion.calle,
            numero: estudiante.direccion.numero,
            piso: estudiante.direccion.piso,
            codigo_postal: estudiante.direccion.codigo_postal,
            provincia: estudiante.direccion.provincia,
            localidad: estudiante.direccion.localidad
        }
    }));
    localStorage.setItem("listaEstudiantes", JSON.stringify(estudiantes));
}

/* Guardar asignaturas en localstorage */
function guardarAsignaturas() {
    let asignaturas = listaAsig.getAsignaturas().map(asignatura => ({
        nombre: asignatura.nombre
    }));
    localStorage.setItem("listaAsignaturas", JSON.stringify(asignaturas));
}

/* Cargar datos de localstorage */
function cargarDatos() {
    cargarEstudiantes();
    cargarAsignaturas();
}

/* Cargar estudiantes de localstorage */
function cargarEstudiantes() {
    let estudiantesGuardados = localStorage.getItem("listaEstudiantes");
    if (estudiantesGuardados) {
        estudiantesGuardados = JSON.parse(estudiantesGuardados);
        estudiantesGuardados.forEach(valor => {
            let direccion = new Direccion(
                valor.direccion.calle,
                valor.direccion.numero,
                valor.direccion.piso,
                valor.direccion.codigo_postal,
                valor.direccion.provincia,
                valor.direccion.localidad
            );

            let estudiante = new Estudiante(valor.nombre, valor.edad, direccion);
            listaEstu.addEstudiante(estudiante);
        });
    }
}

/* Cargar asignaturas de localstorage */
function cargarAsignaturas() {
    let asignaturasGuardadas = localStorage.getItem("listaAsignaturas");
    if (asignaturasGuardadas) {
        asignaturasGuardadas = JSON.parse(asignaturasGuardadas);
        asignaturasGuardadas.forEach(asig => {
            let nuevaAsignatura = new Asignatura(asig.nombre);
            listaAsig.addAsignatura(nuevaAsignatura);
        });
    }
}

/* Guardar registros en localStorage */
/* Guardar registros de estudiantes en localStorage */
function guardarRegistrosEstudiantes() {
    let registros = listaEstu.getEstudiantes().map(estudiante => ({
        id: estudiante.id,
        nombre: estudiante.nombre,
        asignaturas: estudiante.getAsignaturas().map(asig => asig.nombre),
        registros: estudiante.registros
    }));

    localStorage.setItem("registrosEstudiantes", JSON.stringify(registros));
    console.log(registros);
}

/* Guardar registros de asignaturas en localStorage */
function guardarRegistrosAsignaturas() {
    let registros = listaAsig.getAsignaturas().map(asignatura => ({
        nombre: asignatura.nombre,
        estudiantes: asignatura.getEstudiantes().map(est => est.nombre),
        registros: asignatura.registros
    }));

    localStorage.setItem("registrosAsignaturas", JSON.stringify(registros));
    console.log(registros);
}

/* Cargar registros de estudiantes de localStorage */
function cargarRegistrosEstudiantes(estudiante) {
    let registrosGuardados = localStorage.getItem("registrosEstudiantes");
    let final = [];

    if (registrosGuardados) {
        let mostrarR = JSON.parse(registrosGuardados);
        for (let dato of mostrarR) {
            if (dato.id == estudiante.id) {
                final = dato.registros;
            }
        }
    }
    return final;
}

/* Cargar registros de asignaturas de localStorage */
function cargarRegistrosAsignaturas(asignatura) {
    let registrosGuardados = localStorage.getItem("registrosAsignaturas");
    let final = [];

    if (registrosGuardados) {
        let mostrarR = JSON.parse(registrosGuardados);
        for (let dato of mostrarR) {
            if (dato.nombre == asignatura.nombre) {
                final = dato.registros;
            }
        }
    }
    return final;
}

function cargarMatriculaciones() {
    let matriculacionesGuardadas = localStorage.getItem("registrosEstudiantes");
    console.log(matriculacionesGuardadas);
    if (matriculacionesGuardadas) {
        let datos = JSON.parse(matriculacionesGuardadas);
        console.log(datos);

        datos.forEach(mat => {
            let estudiante = listaEstu.getEstudiantes().find(e => e.id === mat.id);
            if (estudiante) {
                mat.asignaturas.forEach(nombreAsig => {
                    let asignatura = listaAsig.getAsignaturas().find(asig => asig.nombre === nombreAsig);
                    if (asignatura) {
                        estudiante.matricular(asignatura);
                    }
                });
            }
        });
    }
}

// Cargar las matriculaciones
cargarMatriculaciones();

/* Guardar notas en localStorage */
function guargarNotas() {
    let notas = listaEstu.getEstudiantes().map(estudiante => ({
        id: estudiante.id,
        nombre: estudiante.nombre,
        notas: estudiante.notas
    }));

    localStorage.setItem("notas", JSON.stringify(notas));
}

/* Cargar notas de localStorage */
function cargarNotas() {
    let notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
        let notas = JSON.parse(notasGuardadas);
        notas.forEach(nota => {
            let estudiante = listaEstu.getEstudiantes().find(e => e.id === nota.id);
            if (estudiante) {
                estudiante.notas = nota.notas;
            }
        });
    }
}

/* Cargar notas de localStorage */
cargarNotas();

/* Validación de los inputs */
function validarInput(event) {
    let errorSpan = event.target.nextElementSibling;
    if (!event.target.validity.valid) {
        errorSpan.textContent = "Por favor, introduce un valor válido.";
    } else {
        errorSpan.textContent = "";
    }
}

/* Eventos */
document.getElementById("formulario").addEventListener("submit", guardarDatos);
window.addEventListener("load", cargarDatos);
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", validarInput);
});

/* Modificar las fases */
let faseActual = 0;

function mostrarFase(fase) {
    const fases = document.querySelectorAll('.fase');
    fases.forEach((f, indice) => {
        f.style.display = (indice === fase) ? 'block' : 'none';
    });
}

function siguienteFase() {
    const fases = document.querySelectorAll('.fase');
    if (faseActual < fases.length - 1) {
        faseActual++;
        mostrarFase(faseActual);
    }
}

function anteriorFase() {
    if (faseActual > 0) {
        faseActual--;
        mostrarFase(faseActual);
    }
}

document.getElementById('botonSiguiente').addEventListener('click', siguienteFase);
document.getElementById('botonAnterior').addEventListener('click', anteriorFase);

// Inicializar la primera fase
mostrarFase(faseActual);


