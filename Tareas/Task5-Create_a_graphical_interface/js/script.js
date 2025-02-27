/*
Proyecto: Task5-Create_a_graphical_interface
Hecho por: Ana Quero de la Rosa

Repositorio: 
https://github.com/Ana-QR/DWEC_Ana_Quero_delaRosa.git

Ruta del ejercicio:
Tareas/Task5-Create_a_graphical_interface
https://github.com/Ana-QR/DWEC_Ana_Quero_delaRosa/tree/main/Tareas/Task5-Create_a_graphical_interface
*/


// ************* IMPORTACIÓN DE FICHEROS ******************
import { Estudiante } from "./Estudiante.js";
import { Asignatura } from "./Asignatura.js";
import { Direccion } from "./Direccion.js";
import { ListaEstudiantes } from "./ListaEstudiantes.js";
import { ListaAsignaturas } from "./ListaAsignaturas.js";

// Creacion de listas ListaEstudiantes y ListaAsignaturas.
let listaEstu = new ListaEstudiantes();
let listaAsig = new ListaAsignaturas();

// Función para cargar los datos del LocalStorage
function cargarDatosLocalStorage() {
    // Cargar datos de estudiantes
    let estudiantesGuardados = localStorage.getItem("listaEstudiantes");
    console.log(estudiantesGuardados);

    if (estudiantesGuardados) {
        estudiantesGuardados = JSON.parse(estudiantesGuardados);

        estudiantesGuardados.forEach(est => {
            let nuevaDireccion = new Direccion(est.direccion.calle, est.direccion.numero, est.direccion.piso, est.direccion.codigoPostal, est.direccion.provincia, est.direccion.localidad);
            let nuevoEstudiante = new Estudiante(est.nombre, est.edad, nuevaDireccion);
            listaEstu.addEstudiante(nuevoEstudiante);
        });
    }

    // Cargar datos de asignaturas
    let asignaturasGuardadas = localStorage.getItem("listaAsignaturas");
    console.log(asignaturasGuardadas);

    if (asignaturasGuardadas) {
        asignaturasGuardadas = JSON.parse(asignaturasGuardadas);

        asignaturasGuardadas.forEach(asig => {
            let nuevaAsignatura = new Asignatura(asig.nombre);
            listaAsig.addAsignatura(nuevaAsignatura);
        });
    }

    // Cargar datos de matriculaciones
    let matriculacionesGuardadas = localStorage.getItem("matriculas");
    console.log(matriculacionesGuardadas);

    if (matriculacionesGuardadas) {
        matriculacionesGuardadas = JSON.parse(matriculacionesGuardadas);

        for (let matriculacion of matriculacionesGuardadas) {
            let estudiante = listaEstu.busquedaPorNombre(matriculacion.estudiante);
            let asignatura = listaAsig.busquedaPorNombre(matriculacion.asignatura);
            if (estudiante && asignatura) {
                estudiante.matricular(asignatura);
            }
        }
    }

    // Cargar datos de calificaciones
    let calificacionesGuardadas = localStorage.getItem("calificaciones");
    console.log(calificacionesGuardadas);

    if (calificacionesGuardadas) {
        calificacionesGuardadas = JSON.parse(calificacionesGuardadas);

        for (let calificacion of calificacionesGuardadas) {
            let estudiante = listaEstu.busquedaPorNombre(calificacion.estudiante);
            let asignatura = listaAsig.busquedaPorNombre(calificacion.asignatura);
            if (estudiante && asignatura) {
                estudiante.calificar(asignatura, calificacion.nota);
            }
        }
    }
}

// Cargar los estudiantes y asignaturas al iniciar
cargarDatosLocalStorage();

function guardarEstudiantes() {
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

function guardarAsignaturas() {
    let asignaturas = listaAsig.listadoAsignaturas.map(asig => ({
        nombre: asig.nombre
    }));
    localStorage.setItem("listaAsignaturas", JSON.stringify(asignaturas));
}

function guardarMatriculas() {
    let matriculas = listaEstu.listadoEstudiantes.map(estu => estu.asignaturas.map(asig => ({
        estudiante: estu.nombre,
        asignatura: asig.nombre
    }))).flat();
    localStorage.setItem("matriculas", JSON.stringify(matriculas));
}

function guardarCalificaciones() {
    let calificaciones = listaEstu.listadoEstudiantes.map(estu => estu.asignaturas.map(asig => ({
        estudiante: estu.nombre,
        asignatura: asig.nombre,
        nota: asig.nota
    }))).flat();
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
}

// ************* INTERACCIÓN CON EL DOM ******************
// Crear estudiantes caso 1
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton1 = document.getElementById("1");
    const form1 = document.getElementById("opcion1");

    // Verificar que los elementos existen
    if (!boton1 || !form1) {
        console.error("Elementos necesarios para el caso 1 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form1.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton1.addEventListener("click", function () {
        form1.style.display = form1.style.display === "none" ? "block" : "none";
    }); 

    // Validación de formulario
    form1.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const calle = document.getElementById("calle").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const piso = document.getElementById("piso").value.trim();
        const codigoPostal = document.getElementById("codigo_postal").value.trim();
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

        guardarEstudiantes();
    });
});

// Eliminar estudiantes caso 2
document.addEventListener("DOMContentLoaded", function () {
    const boton2 = document.getElementById("2");
    const form2 = document.getElementById("opcion2");
    const salida2 = document.getElementById("salida2");

    // Verificar que los elementos existen
    if (!boton2 || !form2 || !salida2) {
        console.error("Elementos necesarios para el caso 2 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form2.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton2.addEventListener("click", function () {
        form2.style.display = form2.style.display === "none" ? "block" : "none";
    });

    // Validación de formulario
    form2.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombreEliminar").value.trim();

        if (!nombre) {
            alert("Por favor, introduce el nombre del estudiante a eliminar.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombre);
            let eliminado = listaEstu.eliminarEstudiante(estudiante);
            if (eliminado) {
                guardarEstudiantes();
                alert("Estudiante eliminado con éxito");
            } else {
                alert("No se pudo eliminar el estudiante");
            }
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
            alert("Ocurrió un error al intentar eliminar el estudiante. Por favor, inténtalo de nuevo.");
        }
    });

    if (localStorage.getItem("listaEstudiantes") !== null) {
        const datos = JSON.parse(localStorage.getItem("listaEstudiantes"));
        datos.forEach(estudiante => {
            salida2.innerHTML += `<li style="color: white;">${estudiante.nombre}</li>`;
        });
    }
});

// Mostrar estudiantes caso 3
document.addEventListener("DOMContentLoaded", function () {
    const boton3 = document.getElementById("3");
    const form3 = document.getElementById("opcion3");
    const salida3 = document.getElementById("salida3");

    // Verificar que los elementos existen
    if (!boton3 || !form3 || !salida3) {
        console.error("Elementos necesarios para el caso 3 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form3.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton3.addEventListener("click", function () {
        form3.style.display = (form3.style.display === "none") ? "block" : "none";
    });

    // Mostrar estudiantes al hacer clic en el botón
    salida3.addEventListener("click", function () {
        try {
            salida3.innerHTML = "";
            listaEstu.listadoEstudiantes.forEach(estudiante => {
                salida3.innerHTML += `<p>Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, 
                Dirección: ${estudiante.direccion.calle} ${estudiante.direccion.numero}, ${estudiante.direccion.piso}, ${estudiante.direccion.codigoPostal}, ${estudiante.direccion.provincia}, ${estudiante.direccion.localidad}</p>`;
            });
        } catch (error) {
            console.error("Error al mostrar los estudiantes:", error);
            alert("Ocurrió un error al intentar mostrar los estudiantes. Por favor, inténtalo de nuevo.");
        }
    });
});

// Añadir asignaturas caso 4
document.addEventListener("DOMContentLoaded", function () {
    const boton4 = document.getElementById("4");
    const form4 = document.getElementById("opcion4");

    // Verificar que los elementos existen
    if (!boton4 || !form4) {
        console.error("Elementos necesarios para el caso 4 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form4.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton4.addEventListener("click", function () {
        form4.style.display = (form4.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form4.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

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

// Eliminar asignaturas caso 5
document.addEventListener("DOMContentLoaded", function () {
    const boton5 = document.getElementById("5");
    const form5 = document.getElementById("opcion5");
    const salida5 = document.getElementById("salida5");

    // Verificar que los elementos existen
    if (!boton5 || !form5 || !salida5) {
        console.error("Elementos necesarios para el caso 5 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form5.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton5.addEventListener("click", function () {
        form5.style.display = (form5.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form5.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

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
        } catch (error) {
            console.error("Error al eliminar la asignatura:", error);
            alert("Ocurrió un error al intentar eliminar la asignatura. Por favor, inténtalo de nuevo.");
        }

        localStorage.setItem("listaAsignaturas", JSON.stringify(listaAsig.listadoAsignaturas));
    });

    // Mostrar las asignaturas en el HTML
    if (localStorage.getItem("listaAsignaturas") !== null) {
        const datos = JSON.parse(localStorage.getItem("listaAsignaturas"));
        datos.forEach(asignatura => {
            salida5.innerHTML += `<li style="color: white;">${asignatura.nombre}</li>`;
        });
    }
});

// Mostrar asignaturas caso 6
document.addEventListener("DOMContentLoaded", function () {
    const boton6 = document.getElementById("6");
    const form6 = document.getElementById("opcion6");
    const salida6 = document.getElementById("salida6");

    // Verificar que los elementos existen
    if (!boton6 || !form6 || !salida6) {
        console.error("Elementos necesarios para el caso 6 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form6.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton6.addEventListener("click", function () {
        form6.style.display = (form6.style.display === "none") ? "block" : "none";
    });

    // Mostrar asignaturas al hacer clic en el botón
    salida6.addEventListener("click", function () {
        try {
            salida6.innerHTML = "";
            listaEstu.listadoEstudiantes.forEach(estudiante => {
                salida6.innerHTML += `<h3>Nombre del estudiante: ${estudiante.nombre}</h3>`;
                salida6.innerHTML += `<h4>Calificaciones:</h4>`;
                estudiante.asignaturas.forEach(asignatura => {
                    salida6.innerHTML += `<p>${asignatura.nombre} - Nota: ${asignatura.nota || "No calificado"}</p>`;
                });
                salida6.innerHTML += `<h4>Promedio del estudiante: ${estudiante.calcularPromedioEstudiante().toFixed(2)}</h4>`;
                salida6.innerHTML += "<hr>";
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
    if (!boton7 || !form7) {
        console.error("Elementos necesarios para el caso 7 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form7.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton7.addEventListener("click", function () {
        form7.style.display = (form7.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form7.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEstudianteMatricula").value.trim();
        const nombreAsignatura = document.getElementById("nombreAsignaturaMatricula").value.trim();

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
    const salida8 = document.getElementById("salida8");

    // Verificar que los elementos existen
    if (!boton8 || !form8 || !salida8) {
        console.error("Elementos necesarios para el caso 8 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form8.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton8.addEventListener("click", function () {
        form8.style.display = (form8.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form8.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEstudianteDesmatricula").value.trim();
        const nombreAsignatura = document.getElementById("nombreAsignaturaDesmatricula").value.trim();

        if (!nombreEstudiante || !nombreAsignatura) {
            alert("Por favor, introduce el nombre del estudiante y de la asignatura.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            let asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);
            if (estudiante && asignatura) {
                estudiante.desmatricular(asignatura);
                alert("Estudiante desmatriculado con éxito");

                const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
                const index = matriculas.findIndex(m => m.estudiante === nombreEstudiante && m.asignatura === nombreAsignatura);
                if (index !== -1) {
                    matriculas.splice(index, 1);
                    localStorage.setItem("matriculas", JSON.stringify(matriculas));
                }
            } else {
                alert("No se encontró el estudiante o la asignatura especificada");
            }
            guardarMatriculas();

            const datos = JSON.parse(localStorage.getItem("matriculas")) || [];
            salida8.innerHTML = "";
            for (let matricula of datos) {
                salida8.innerHTML += `<li style="color: white;">${matricula.estudiante} - ${matricula.asignatura}</li>`;
            }
        } catch (error) {
            console.error("Error al desmatricular el estudiante:", error);
            alert("Ocurrió un error al intentar desmatricular el estudiante. Por favor, inténtalo de nuevo.");
        }
    });
});

//Calificar a un estudiante caso 9
document.addEventListener("DOMContentLoaded", function () {
    const boton9 = document.getElementById("9");
    const form9 = document.getElementById("opcion9");
    const salida9 = document.getElementById("salida9");

    // Verificar que los elementos existen
    if (!boton9 || !form9 || !salida9) {
        console.error("Elementos necesarios para el caso 9 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form9.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton9.addEventListener("click", function () {
        form9.style.display = (form9.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form9.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

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

                const calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];
                calificaciones.push({ estudiante: nombreEstudiante, asignatura: nombreAsignatura, nota: parseFloat(nota) });
                localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
            } else {
                alert("No se encontró el estudiante o la asignatura especificada");
            }
            guardarCalificaciones();

            const datos = JSON.parse(localStorage.getItem("calificaciones")) || [];
            salida9.innerHTML = "";
            for (let calificacion of datos) {
                salida9.innerHTML += `<li style="color: white;">${calificacion.estudiante} - ${calificacion.asignatura} - ${calificacion.nota}</li>`;
            }
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
    const salida10 = document.getElementById("salida10");

    // Verificar que los elementos existen
    if (!boton10 || !form10 || !salida10) {
        console.error("Elementos necesarios para el caso 10 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form10.style.display = "none";

    // Mostrar el formulario al hacer clic en el botón
    boton10.addEventListener("click", function () {
        form10.style.display = (form10.style.display === "none") ? "block" : "none";
    });

    // Validar el formulario antes de enviarlo
    form10.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEstudianteProm").value.trim();

        if (!nombreEstudiante) {
            alert("Por favor, introduce el nombre del estudiante para calcular su promedio.");
            return;
        }

        try {
            let estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
            if (estudiante) {
                let promedio = estudiante.calcularPromedioEstudiante();
                salida10.innerHTML = "";
                salida10.innerHTML += `Promedio de ${estudiante.nombre}: ${promedio.toFixed(2)}`;
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
    const salida11 = document.getElementById("salida11");

    // Verificar que los elementos existen
    if (!boton11 || !form11 || !salida11) {
        console.error("Elementos necesarios no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form11.style.display = "none";
    
    // Mostrar el formulario al hacer clic en el botón
    boton11.addEventListener("click", function () {
        form11.style.display = (form11.style.display === "none") ? "block" : "none";
    });

    // Validar el formulario antes de enviarlo
    form11.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        try {
            // Mostrar el promedio de todos los estudiantes
            salida11.innerHTML = "";
            salida11.innerHTML = `<p>El promedio general de todos los estudiantes es: ${listaEstu.promedioEstudiantes().toFixed(2)}</p>`;
        } catch (error) {
            console.error("Error al calcular el promedio general de los estudiantes:", error);
            alert("Ocurrió un error al intentar calcular el promedio general de los estudiantes. Por favor, inténtalo de nuevo.");
        }
    });
});