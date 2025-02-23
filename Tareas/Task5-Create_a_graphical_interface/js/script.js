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

function guardarEstudiantes(){
    let estudiantes = listaEstu.listadoEstudiantes.map(estu => ({
        nombre: estu.nombre,
        edad: estu.edad,
        direccion: {
            calle: estu.direccion.calle,
            numero: estu.direccion.numero,
            piso: estu.direccion.piso,
            codigoPostal: estu.direccion.codigoPostal,
            provincia: estu.direccion.provincia,
            localidad: estu.direccion.localidad
        }
    }));
    localStorage.setItem("listaEstudiantes", JSON.stringify(estudiantes));
}

function guardarAsignaturas(){
    let asignaturas = listaAsig.listadoAsignaturas.map(asig => ({
        nombre: asig.nombre
    }));
    localStorage.setItem("listaAsignaturas", JSON.stringify(asignaturas));
}

function guardarMatriculas(){
    let matriculas = listaEstu.listadoEstudiantes.map(estu => estu.asignaturas.map(asig => ({
        estudiante: estu.nombre,
        asignatura: asig.nombre
    }))).flat();
    localStorage.setItem("matriculas", JSON.stringify(matriculas));
}

function guardarCalificaciones(){
    let calificaciones = listaEstu.listadoEstudiantes.map(estu => estu.asignaturas.map(asig => ({
        estudiante: estu.nombre,
        asignatura: asig.nombre,
        nota: asig.nota
    }))).flat();
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
}

// Función para cargar estudiantes desde localStorage
function cargarEstudiantes() {
    let estudiantesGuardados = localStorage.getItem("listaEstudiantes");

    if (estudiantesGuardados) {
        estudiantesGuardados = JSON.parse(estudiantesGuardados);

        estudiantesGuardados.forEach(estu => {
            let direccion = new Direccion(
                estu.direccion.calle, estu.direccion.numero,
                estu.direccion.piso, estu.direccion.codigoPostal,
                estu.direccion.provincia, estu.direccion.localidad
            );
            let estudiante = new Estudiante(estu.nombre, estu.edad, direccion);
            listaEstu.addEstudiante(estudiante);
        });
    }
}

// Función para cargar asignaturas desde localStorage
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

// Función para cargar matriculas desde localStorage
function cargarMatriculas() {
    let matriculasGuardadas = localStorage.getItem("matriculas");

    if (matriculasGuardadas) {
        matriculasGuardadas = JSON.parse(matriculasGuardadas);

        matriculasGuardadas.forEach(mat => {
            let estudiante = listaEstu.listadoEstudiantes.find(est => est.nombre === mat.estudiante);
            let asignatura = listaAsig.listadoAsignaturas.find(asig => asig.nombre === mat.asignatura);
            if (estudiante && asignatura) {
                estudiante.matricular(asignatura);
            }
        });
    }
}

// Función para cargar calificaciones desde localStorage
function cargarCalificaciones() {
    let calificacionesGuardadas = localStorage.getItem("calificaciones");

    if (calificacionesGuardadas) {
        calificacionesGuardadas = JSON.parse(calificacionesGuardadas);

        calificacionesGuardadas.forEach(cal => {
            let estudiante = listaEstu.listadoEstudiantes.find(est => est.nombre === cal.estudiante);
            let asignatura = estudiante.asignaturas.find(asig => asig.nombre === cal.asignatura);
            if (estudiante && asignatura) {
                asignatura.nota = cal.nota;
            }
                if (asignatura) {
                    asignatura.nota = cal.nota;
                }
            
        });
    }
}

// Cargar datos desde localStorage
cargarEstudiantes();
cargarAsignaturas();
cargarMatriculas();
cargarCalificaciones();

// ************* INTERACCIÓN CON EL DOM ******************
// Crear estudiantes caso 1
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("1");
    const form = document.getElementById("opcion1");

    // Verificar que los elementos existen
    if (!form) {
        console.error("Formulario dentro de 'opcion1' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton.addEventListener("click", function () {
        form.style.display = (form.style.display === "none") ? "block" : "none";
    });

    // Validación de formulario
    document.getElementById("opcion1").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombre = document.getElementById("nombre").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const calle = document.getElementById("calle").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const piso = document.getElementById("piso").value.trim();
        const codigoPostal = document.getElementById("codigopostal").value.trim();
        const provincia = document.getElementById("provincia").value.trim();
        const localidad = document.getElementById("localidad").value.trim();

        if (!nombre || !edad || !calle || !numero || !codigoPostal || !provincia || !localidad) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        let direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
        let estudiante = new Estudiante(nombre, edad, direccion);
        try {
            listaEstu.addEstudiante(estudiante);
            alert("Estudiante añadido con éxito");
        } catch (error) {
            alert(error.message);
        }

        // Guardar estudiantes en localStorage
        guardarEstudiantes();
    });
});


//Eliminar estudiantes caso 2
document.addEventListener("DOMContentLoaded", function () {
    const boton2 = document.getElementById("2");
    const form2 = document.getElementById("opcion2");

    // Verificar que los elementos existen
    if (!form2) {
        console.error("Formulario dentro de 'opcion2' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form2.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton2.addEventListener("click", function () {
        form2.style.display = (form2.style.display === "none") ? "block" : "none";
    });

    // Validación de formulario
    document.getElementById("opcion2").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombre = document.getElementById("nombreEliminar").value.trim();

        if (!nombre) {
            alert("Por favor, introduce el nombre del estudiante a eliminar.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombre);
                let eliminado = listaEstu.eliminarEstudiante(estudiante);
                if (eliminado) {
                listaEstu.eliminarEstudiante(estudiante);
                guardarEstudiantes();
                alert("Estudiante eliminado con éxito");
                    guardarEstudiantes();
                } else {
                    alert("No se pudo eliminar el estudiante");
                }
                guardarEstudiantes();
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
            alert("Ocurrió un error al intentar eliminar el estudiante. Por favor, inténtalo de nuevo.");
        }

    });
});

//Mostrar estudiantes caso 3
document.addEventListener("DOMContentLoaded", function () {
    const boton3 = document.getElementById("3");
    const form3 = document.getElementById("opcion3");
    const mostrar3 = document.getElementById("mostrar3");

    // Verificar que los elementos existen
    if (!form3) {
        console.error("Formulario dentro de 'opcion3' no encontrado en el DOM.");
        return;
    }

    if (!mostrar3) {
        console.error("Elemento con ID 'mostrar3' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form3.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton3.addEventListener("click", function () {
        form3.style.display = (form3.style.display === "none") ? "block" : "none";
    });
    
    // Mostrar estudiantes al hacer clic en el botón
    mostrar3.addEventListener("click", function () {
        try {
            mostrar3.innerHTML = "";
            listaEstu.listadoEstudiantes.forEach(estudiante => {
                mostrar3.innerHTML += `<p>Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, 
                Dirección: ${estudiante.direccion.calle} ${estudiante.direccion.numero}, ${estudiante.direccion.piso}, ${estudiante.direccion.codigoPostal}, ${estudiante.direccion.provincia}, ${estudiante.direccion.localidad}</p>`;
            });
        } catch (error) {
            console.error("Error al mostrar los estudiantes:", error);
            alert("Ocurrió un error al intentar mostrar los estudiantes. Por favor, inténtalo de nuevo.");
        }
    });
});

//Añadir asignaturas caso 4
document.addEventListener("DOMContentLoaded", function () {
    const boton4 = document.getElementById("4");
    const form4 = document.getElementById("opcion4");

    // Verificar que los elementos existen
    if (!form4) {
        console.error("Formulario dentro de 'opcion4' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form4.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton4.addEventListener("click", function () {
        form4.style.display = (form4.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion4").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        let nombreAsignatura = document.getElementById("nombreAsignatura").value.trim();

        if (!nombreAsignatura) {
            alert("Por favor, introduce el nombre de la asignatura.");
            return;
        }

        let nuevaAsignatura = new Asignatura(nombreAsignatura);
        try {
            listaAsig.addAsignatura(nuevaAsignatura);
            alert("Asignatura añadida con éxito");
            guardarAsignaturas();
        } catch (error) {
            alert(error.message);
        }
    });
});

//Eliminar asignaturas caso 5
document.addEventListener("DOMContentLoaded", function () {
    const boton5 = document.getElementById("5");
    const form5 = document.getElementById("opcion5");

    // Verificar que los elementos existen
    if (!form5) {
        console.error("Formulario dentro de 'opcion5' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form5.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton5.addEventListener("click", function () {
        form5.style.display = (form5.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion5").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombre = document.getElementById("nombreEliminarAsignatura").value.trim();

        if (!nombre) {
            alert("Por favor, introduce el nombre de la asignatura a eliminar.");
            return;
        }

        try {
            let asignatura = listaAsig.busquedaPorNombre(nombre);
            if (asignatura) {
                listaAsig.eliminarAsignatura(asignatura);
                alert("Asignatura eliminada con éxito");
                guardarAsignaturas();
            } else {
                alert("No se encontró ninguna asignatura con ese nombre");
            }
            guardarAsignaturas();
        } catch (error) {
            console.error("Error al eliminar la asignatura:", error);
            alert("Ocurrió un error al intentar eliminar la asignatura. Por favor, inténtalo de nuevo.");
        }
    });
});

//Mostar asignaturas caso 6
document.addEventListener("DOMContentLoaded", function () {
    const boton6 = document.getElementById("6");
    const form6 = document.getElementById("opcion6");
    const mostrar6 = document.getElementById("mostrar6");

    // Verificar que los elementos existen
    if (!form6) {
        console.error("Formulario dentro de 'opcion6' no encontrado en el DOM.");
        return;
    }

    if (!mostrar6) {
        console.error("Elemento con ID 'mostrar6' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form6.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton6.addEventListener("click", function () {
        form6.style.display = (form6.style.display === "none") ? "block" : "none";
    });

    // Mostrar asignaturas al hacer clic en el botón
    mostrar6.addEventListener("click", function () {
        try {
            mostrar6.innerHTML = "";
            listaAsig.listadoAsignaturas.forEach(asignatura => {
                mostrar6.innerHTML += `<p>${asignatura.nombre}</p>`;
            });
        } catch (error) {
            console.error("Error al mostrar las asignaturas:", error);
            alert("Ocurrió un error al intentar mostrar las asignaturas. Por favor, inténtalo de nuevo.");
        }
    });
});

//Matricular estudiante en asignatura caso 7
document.addEventListener("DOMContentLoaded", function () {
    const boton7 = document.getElementById("7");
    const form7 = document.getElementById("opcion7");

    // Verificar que los elementos existen
    if (!form7) {
        console.error("Formulario dentro de 'opcion7' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form7.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton7.addEventListener("click", function () {
        form7.style.display = (form7.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion7").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombreEstudiante = document.getElementById("nombreEstudiante").value.trim();
        const nombreAsignatura = document.getElementById("nombreAsignatura").value.trim();

        if (!nombreEstudiante || !nombreAsignatura) {
            alert("Por favor, introduce el nombre del estudiante y de la asignatura.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            let asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);
            if (estudiante && asignatura) {
                estudiante.matricular(asignatura);
                alert("Estudiante matriculado con éxito");
            } else {
                alert("No se encontró el estudiante o la asignatura especificada");
            }
        } catch (error) {
            console.error("Error al matricular el estudiante:", error);
            alert("Ocurrió un error al intentar matricular el estudiante. Por favor, inténtalo de nuevo.");
            return;
        }
        guardarMatriculas();
    });
});

//Desmatricular estudiante en asignatura caso 8
document.addEventListener("DOMContentLoaded", function () { 
    const boton8 = document.getElementById("8");
    const form8 = document.getElementById("opcion8");

    // Verificar que los elementos existen
    if (!form8) {
        console.error("Formulario dentro de 'opcion8' no encontrado en el DOM.");
        return;
    }

    // Mostrar el formulario al hacer clic en el botón
    boton8.addEventListener("click", function () {
        form8.style.display = (form8.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion8").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombreEstudiante = document.getElementById("nombreEstudianteDes").value.trim();
        const nombreAsignatura = document.getElementById("nombreAsignaturaDes").value.trim();

        if (!nombreEstudiante || !nombreAsignatura) {
            alert("Por favor, introduce el nombre del estudiante y de la asignatura.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            let asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);
            if (estudiante && asignatura) {
                estudiante.desmatricular(asignatura);
            }
            else {
                alert("No se encontró el estudiante o la asignatura especificada");
            }
            guardarMatriculas();
        } catch (error) {
            console.error("Error al desmatricular el estudiante:", error);
            alert("Ocurrió un error al intentar desmatricular el estudiante. Por favor, inténtalo de nuevo.");
        }
    });
});

//Calificar a un estudiante de una asignatura case 9 
document.addEventListener("DOMContentLoaded", function () {
    const boton9 = document.getElementById("9");
    const form9 = document.getElementById("opcion9");

    // Verificar que los elementos existen
    if (!form9) {
        console.error("Formulario dentro de 'opcion9' no encontrado en el DOM.");
        return;
    }

    // Mostrar el formulario al hacer clic en el botón
    boton9.addEventListener("click", function () {
        form9.style.display = (form9.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion9").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombreEstudiante = document.getElementById("nombreEstudianteCal").value.trim();
        const nombreAsignatura = document.getElementById("nombreAsignaturaCal").value.trim();
        const nota = document.getElementById("nota").value.trim();

        if (!nombreEstudiante || !nombreAsignatura || !nota) {
            alert("Por favor, completa todos los campos antes de continuar.");
            return;
        }

        if (isNaN(nota)) {
            alert("Por favor, introduce un valor numérico válido para la nota.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            let asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);
            if (estudiante && asignatura) {
                estudiante.calificar(asignatura, parseFloat(nota));
                alert("Estudiante calificado con éxito");
            } else {
                alert("No se encontró el estudiante o la asignatura especificada");
            }
            guardarCalificaciones();
        } catch (error) {
            console.error("Error al calificar al estudiante:", error);
            alert("Ocurrió un error al intentar calificar al estudiante. Por favor, inténtalo de nuevo.");
        }
    });
});

//Calcular promedio de un estudiante caso 10
document.addEventListener("DOMContentLoaded", function () { 
    const boton10 = document.getElementById("10");
    const form10 = document.getElementById("opcion10");

    // Verificar que los elementos existen
    if (!form10) {
        console.error("Formulario dentro de 'opcion10' no encontrado en el DOM.");
        return;
    }

    // Mostrar el formulario al hacer clic en el botón
    boton10.addEventListener("click", function () {
        form10.style.display = (form10.style.display === "none") ? "block" : "none";
    });

    // Validar el formulario antes de enviarlo
    document.getElementById("opcion10").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const nombreEstudiante = document.getElementById("nombreEstudianteProm").value.trim();

        if (!nombreEstudiante) {
            alert("Por favor, introduce el nombre del estudiante para calcular su promedio.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            if (estudiante) {
                let promedio = estudiante.calcularPromedioEstudiante();
                alert(`Promedio de ${estudiante.nombre}: ${promedio.toFixed(2)}`);
            } else {
                alert("No se encontró el estudiante especificado");
            }
        } catch (error) {
            console.error("Error al calcular el promedio del estudiante:", error);
            alert("Ocurrió un error al intentar calcular el promedio del estudiante. Por favor, inténtalo de nuevo.");
        }
    });
});

//Calcular promedio general de todos los estudiantes caso 11
document.addEventListener("DOMContentLoaded", function () { 
    const boton11 = document.getElementById("11");
    const form11 = document.getElementById("opcion11");

    // Verificar que los elementos existen
    if (!form11) {
        console.error("Elemento con clase 'opcion11' no encontrado en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form11.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton11.addEventListener("click", function () {
        form11.style.display = (form11.style.display === "none") ? "block" : "none";
    });

    document.getElementById("opcion11").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        try {
            let promedioGeneral = listaEstu.promedioEstudiantes();
            alert(`Promedio general de todos los estudiantes: ${promedioGeneral.toFixed(2)}`);
        } catch (error) {
            console.error("Error al calcular el promedio general de los estudiantes:", error);
            alert("Ocurrió un error al intentar calcular el promedio general de los estudiantes. Por favor, inténtalo de nuevo.");
        }
    });
});

