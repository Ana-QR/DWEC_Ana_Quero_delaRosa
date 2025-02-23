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

// Función para cargar estudiantes desde localStorage
function cargarEstudiantes() {
    let estudiantesGuardados = localStorage.getItem("listaEstudiantes");

    if (estudiantesGuardados) {
        estudiantesGuardados = JSON.parse(estudiantesGuardados);

        estudiantesGuardados.forEach(estu => {
            let direccion = new Direccion(
                estu.direccion.calle, estu.direccion.numero,
                estu.direccion.piso, estu.direccion.codigo_postal,
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
            let nuevaAsignatura = new Asignatura(asig.nombreA);
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
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("1");
    const articulo = document.getElementById("opcion1");
    const form = document.getElementById("opcion1_form");
    const mostrar = document.getElementById("mostrar1");

    // Verificar que los elementos existen
    if (!articulo) {
        console.error("Elemento con clase 'opcion1' no encontrado en el DOM.");
        return;
    }

    if (!form) {
        console.error("Formulario dentro de 'opcion1_form' no encontrado en el DOM.");
        return;
    }

    if (!mostrar) {
        console.error("Elemento con ID 'mostrar1' no encontrado en el DOM.");
        return;
    }

    // Ocultar el artículo al cargar la página
    articulo.style.display = "none";

    // Mostrar el artículo al hacer clic en el botón
    boton.addEventListener("click", function () {
        form.classList.toggle("oculto");
    });

    // Validación de formulario
    document.getElementById("opcion1").querySelector("form").addEventListener("submit", function (e) {

        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const calle = document.getElementById("calle").value;
        const numero = document.getElementById("numero").value;
        const piso = document.getElementById("piso").value;
        const codigoPostal = document.getElementById("codigopostal").value;
        const provincia = document.getElementById("provincia").value;
        const localidad = document.getElementById("localidad").value;

        let direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
        let estudiante = new Estudiante(nombre, edad, direccion);
        try {
            listaEstu.agregaEstudiante(estudiante);
            alert("Estudiante añadido con éxito");
        } catch (error) {
            alert(error.message);
        }

        // Función para guardar estudiantes en localStorage
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

        guardarEstudiantes();
    });
});


//Eliminar estudiantes caso 2
document.addEventListener("DOMContentLoaded", function () {
    const boton2 = document.getElementById("2");
    const articulo2 = document.getElementById("opcion2");
    const form2 = document.getElementById("opcion2_form");
    const mostrar2 = document.getElementById("mostrar2");

    // Verificar que los elementos existen
    if (!articulo2) {
        console.error("Elemento con clase 'opcion2' no encontrado en el DOM.");
        return;
    }

    if (!form2) {
        console.error("Formulario dentro de 'opcion2_form' no encontrado en el DOM.");
        return;
    }

    if (!mostrar2) {
        console.error("Elemento con ID 'mostrar2' no encontrado en el DOM.");
        return;
    }

    // Ocultar el artículo al cargar la página
    articulo2.style.display = "none";

    // Mostrar el artículo al hacer clic en el botón
    boton2.addEventListener("click", function () {
        form2.classList.toggle("oculto");
    });

    // Validación de formulario
    document.getElementById("opcion2").querySelector("form").addEventListener("submit", function (e) {
        const nombre = document.getElementById("nombreEliminar").value;

        let estudiante = listaEstu.busquedaPorNombre(nombre);
        if (estudiante) {
            listaEstu.eliminarEstudiante(estudiante);
            alert("Estudiante eliminado con éxito");
        } else {
            alert("No se encontró ningún estudiante con ese nombre");
        }

        // Función para guardar estudiantes en localStorage
        function eliminarEstudiantes() {
            const estudiantes = listaEstu.listadoEstudiantes.map(estudiante => ({
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
        eliminarEstudiantes();
    });
});

//Mostrar estudiantes caso 3
document.addEventListener("DOMContentLoaded", function () {
    const boton3 = document.getElementById("3");
    const articulo3 = document.querySelector("opcion3");
    const form3 = document.querySelector("opcion3_form");
    const mostrar3 = document.getElementById("mostrar3");

    // Verificar que los elementos existen
    if (!articulo3) {
        console.error("Elemento con clase 'opcion3' no encontrado en el DOM.");
        return;
    }

    if (!form3) {
        console.error("Formulario dentro de 'opcion3_form' no encontrado en el DOM.");
        return;
    }

    if (!mostrar3) {
        console.error("Elemento con ID 'mostrar3' no encontrado en el DOM.");
        return;
    }

    // Ocultar el articulo al cargar la página
    articulo3.style.display = "none";
    
    // Mostrar el articulo al hacer clic en el botón
    boton3.addEventListener("click", function () {
        if (elemento) { elemento.style.display = "none"; }
    });

    // Mostrar el promdio de las calificaciones de los estudiantes
    mostrar3.innerHTML = "";
    listaEstu.listadoEstudiantes.forEach(estudiante => {
        mostrar3.innerHTML += `<h3>Nombre del estudiante: ${estudiante.nombre}</h3>`;
        mostrar3.innerHTML += `<h4>Calificaciones:</h4>`;
        estudiante.asignaturas.forEach(asignatura => {
            const nota = Number(asignatura.calculaPromedio());
            mostrar3.innerHTML += `<p>${asignatura.nombre}: ${nota}</p>`;
        });
        mostrar3.innerHTML += `<h4>Promedio: ${estudiante.promedioEstudiante()}</h4>`;
        mostrar3.innerHTML += `<hr>`;
    });
});

//Añadir asignaturas caso 4
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("4");
    const articulo = document.querySelector("opcion4");
    const form = document.querySelector("opcion4 form");
    const inputs = form.querySelectorAll("input");
    const mostrar = document.getElementById("output4"); // Añadido

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Función para guardar asignaturas en localStorage
    function guardarAsignaturas() {
        let asignaturas_1 = listaAsig.listadoAsignaturas.map(asig => ({
            nombreA: asig.nombre
        }));
        localStorage.setItem("listaAsignaturas_1", JSON.stringify(asignaturas_1));
    }

    function mostrarAsignaturas() {
        mostrar.innerHTML = ""; // Limpiar el contenido del div
        listaAsig.listadoAsignaturas.forEach(asignatura => {
            const asignaturaInfo = `Asignatura: ${asignatura.nombre}`;
            const p = document.createElement("p");
            p.textContent = asignaturaInfo;
            mostrar.appendChild(p);
        });
    }

    mostrarAsignaturas();

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Validar formulario antes de enviarlo
    form.addEventListener("submit", function (event) {
        let valido = true;
        let datos = {};

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                // Función para guardar asignaturas en localStorage
                function guardarAsignaturas() {
                    let asignaturas_1 = listaAsig.listadoAsignaturas.map(asig => ({ nombreA: asig.nombre }));
                    localStorage.setItem("listaAsignaturas_1", JSON.stringify(asignaturas_1));
                }

                if (!valido) {
                    event.preventDefault(); // Evita el envío del formulario
                    alert("Por favor, completa todos los campos antes de continuar.");
                } else {
                    console.log("Formulario enviado correctamente");

                    let nuevaAsignatura = new Asignatura(datos.nombreAsig);
                    let comprobacion_as = listaAsig.addAsignatura(nuevaAsignatura);

                    if (comprobacion_as != false) {
                        console.log("Asignatura creada y agregada con éxito:");
                        guardarAsignaturas();
                        mostrarAsignaturas();
                        form.reset();
                        articulo.style.display = "none"; // Ocultar el articulo
                    }
                }
            }
        });
    });
});


let texto = "Texto de ejemplo";
mostrarTexto(texto, "mostrar5");
const boton = document.getElementById("5");
const articulo = document.querySelector("opcion5");
const form = document.querySelector("opcion5 form");
const inputs = form ? form.querySelectorAll("input") : [];
const mostrar = document.getElementById("mostrar5");


// Ocultar el articulo al cargar la página
articulo.style.display = "none";

// Mostrar el articulo al hacer clic en el botón
boton.addEventListener("click", function () {
    articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
});

form.addEventListener("submit", function (evento) {
    let valido = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            valido = false;
            input.style.border = "2px solid red"; // Resalta el input vacío
        } else {
            input.style.border = ""; // Elimina el borde rojo si se completa
        }
    });

    if (!valido) {
        evento.preventDefault(); // Evita el envío del formulario
        alert("Por favor, completa todos los campos antes de continuar.");
    } else {
        console.log("Formulario enviado correctamente");

        mostrar.innerHTML = ""; // Limpiar el contenido del section

        let mostrar_Asig = `Asignaturas en la lista:`;

        mostrarTexto(mostrar_Asig);

        listaAsig.listadoAsignaturas.forEach(asig => {
            let asignaturas = `Asignatura: ${asig.nombre}`;
            mostrarTexto(asignaturas);
        });

        let elim_asig = document.getElementById("ID_Eli_Asig").value;
        elim_asig = elim_asig.trim();

        let asignaturaEliminar = listaAsig.listadoAsignaturas.find(asig => asig.nombre === elim_asig);
        console.log(asignaturaEliminar);

        if (asignaturaEliminar) {
            listaAsig.eliminarAsignatura(asignaturaEliminar.nombre);
            guardarAsignaturas();
            const eliminado = `La asignatura ${asignaturaEliminar.nombre} ha sido eliminada correctamente.`;
            mostrarTexto(eliminado);
        } else {
            const error = `No se encontró ninguna asignatura con el nombre ${elim_asig}.`;
            mostrarTexto(error);
        }

        evento.preventDefault();
    }
});


//Mostar asignaturas caso 6
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("6");
    const articulo = document.querySelector("opcion6");
    const mostrar = document.getElementById("mostrar6");

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Mostrar asignaturas al hacer clic en el botón
    mostrar.addEventListener("click", function () {
        mostrarAsignaturas();
    });
});

//Matricular estudiante en asignatura caso 7
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("7");
    const articulo = document.querySelector("opcion7");
    const form = document.querySelector("opcion7 form");
    const inputs = form ? form.querySelectorAll("input") : [];
    const mostrar = document.getElementById("mostrar7"); // Añadido

    // Reuse the mostrarTexto function
    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
        // Reuse the mostrarTexto function defined earlier
        form.addEventListener("submit", function (evento) {
            let valido = true;

            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    valido = false;
                    input.style.border = "2px solid red"; // Resalta el input vacío
                } else {
                    input.style.border = ""; // Elimina el borde rojo si se completa
                }
            });

            if (!valido) {
                evento.preventDefault(); // Evita el envío del articulo
                alert("Por favor, completa todos los campos antes de continuar.");
            } else {
                console.log("articulo enviado correctamente");

                let nombreEstudiante = document.querySelector("#nombreEstudiante").value;
                let nombreAsignatura = document.querySelector("#nombreAsignatura").value;

                let estEncontrado = listaEstu.busquedaPorNombre(nombreEstudiante);
                let asignatura = listaAsig.listadoAsignaturas.find(asig => asig.nombre === nombreAsignatura);

                if (estEncontrado && asignatura) {
                    let matriculado = estEncontrado.matricular(asignatura);
                    if (matriculado) {
                        console.log(`${estEncontrado.nombre} ha sido matriculado en ${asignatura.nombre} con éxito.`);
                        mostrar.innerHTML = ""; // Limpiar el contenido del section
                        const exito = `${estEncontrado.nombre} ha sido matriculado en ${asignatura.nombre} con éxito.`;
                        mostrarTexto(exito);
                        guardarEstudiantes();
                    } else {
                        mostrar.innerHTML = ""; // Limpiar el contenido del section
                        const error = `El estudiante ${estEncontrado.nombre} ya está matriculado en la asignatura ${asignatura.nombre}.`;
                        mostrarTexto(error);
                    }
                } else {
                    mostrar.innerHTML = ""; // Limpiar el contenido del section
                    const error = `No se encontró el estudiante o la asignatura especificada.`;
                    mostrarTexto(error);
                }
            }
        });
    });
});

//Desmatricular estudiante en asignatura caso 8
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("8");
    const articulo = document.querySelector("opcion8");
    const form = document.querySelector("opcion8 form");

    function mostrarTexto(texto) {
        const p = document.createElement("p");// crea la etiqueta p
        p.textContent = texto;//pone la etiqueta al principio
        mostrar.appendChild(p);//pone la etiqueta al final
    }

    if (articulo) {
        // Ocultar el articulo al cargar la página
        articulo.style.display = "none";
    } else {
        console.error("Elemento con clase 'opcion8' no encontrado en el DOM.");
    }

    if (form) {
        form.addEventListener("submit", function (evento) {
            let valido = true;
            const inputs = form.querySelectorAll("input");

            inputs.forEach(input => {
                if (input.value.trim() === "") {
                    valido = false;
                    input.style.border = "2px solid red"; // Resalta el input vacío
                } else {
                    input.style.border = ""; // Elimina el borde rojo si se completa
                }
            });

            if (!valido) {
                evento.preventDefault(); // Evita el envío del articulo
                alert("Por favor, completa todos los campos antes de continuar.");
            } else {
                console.log("articulo enviado correctamente");

                let nombreEstudiante = document.querySelector("#nombreEstudianteDes").value;
                let nombreAsignatura = document.querySelector("#nombreAsignaturaDes").value;

                let estEncontrado = listaEstu.busquedaPorNombre(nombreEstudiante);
                if (estEncontrado) {
                    let desmatriculado = estEncontrado.desmatricular(nombreAsignatura);
                    if (desmatriculado) {
                        console.log(`${estEncontrado.nombre} ha sido desmatriculado de ${nombreAsignatura} con éxito.`);
                        mostrar.innerHTML = ""; // Limpiar el contenido del section
                        const exito = `${estEncontrado.nombre} ha sido desmatriculado de ${nombreAsignatura} con éxito.`;
                        mostrarTexto(exito);
                        guardarEstudiantes();
                    } else {
                        mostrar.innerHTML = ""; // Limpiar el contenido del section
                        const error = `El estudiante ${estEncontrado.nombre} no está matriculado en la asignatura ${nombreAsignatura}.`;
                        mostrarTexto(error);
                        evento.preventDefault(); // Evita el envío del formulario
                    }
                } else {
                    mostrar.innerHTML = ""; // Limpiar el contenido del section
                    const error = `No se encontró el estudiante especificado.`;
                    mostrarTexto(error);
                }
            }
        });
    } else {
        const boton = document.getElementById("9");
        const articulo = document.querySelector("opcion9");
        const form = document.querySelector("opcion9 form");

        function mostrarTexto(texto) {
            const p = document.createElement("p");// crea la etiqueta p
            p.textContent = texto;//pone la etiqueta al principio
            mostrar.appendChild(p);//pone la etiqueta al final
        }

        if (articulo) {
            // Ocultar el articulo al cargar la página
            articulo.style.display = "none";
        } else {
            console.error("Elemento con clase 'opcion9' no encontrado en el DOM.");
        }

        if (form) {
            form.addEventListener("submit", function (evento) {
                let valido = true;
                const inputs = form.querySelectorAll("input");

                inputs.forEach(input => {
                    if (input.value.trim() === "") {
                        valido = false;
                        input.style.border = "2px solid red"; // Resalta el input vacío
                    } else {
                        input.style.border = ""; // Elimina el borde rojo si se completa
                    }
                });

                if (!valido) {
                    evento.preventDefault(); // Evita el envío del articulo
                    alert("Por favor, completa todos los campos antes de continuar.");
                } else {
                    console.log("articulo enviado correctamente");

                    let nombreEstudiante = document.querySelector("#nombreEstudianteCal").value;
                    let nombreAsignatura = document.querySelector("#nombreAsignaturaCal").value;
                    let nota = document.querySelector("#nota").value;

                    let estEncontrado = listaEstu.busquedaPorNombre(nombreEstudiante);
                    if (estEncontrado) {
                        let asignatura = estEncontrado.asignaturas.find(asig => asig.nombre === nombreAsignatura);
                        if (asignatura) {
                            asignatura.nota = Number(nota);
                            console.log(`El estudiante ${estEncontrado.nombre} ha sido calificado en ${asignatura.nombre} con éxito.`);
                            mostrar.innerHTML = ""; // Limpiar el contenido del section
                            const exito = `El estudiante ${estEncontrado.nombre} ha sido calificado en ${asignatura.nombre} con éxito.`;
                            mostrarTexto(exito);
                            guardarEstudiantes();
                        } else {
                            mostrar.innerHTML = ""; // Limpiar el contenido del section
                            const error = `El estudiante ${estEncontrado.nombre} no está matriculado en la asignatura ${nombreAsignatura}.`;
                            mostrarTexto(error);
                        }
                    } else {
                        mostrar.innerHTML = ""; // Limpiar el contenido del section
                        const error = `No se encontró el estudiante especificado.`;
                        mostrarTexto(error);
                    }
                }
            });
        } else {
            console.error("Form element not found in the DOM.");
        }

    }
});

//Calcular promedio de un estudiante caso 10
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("10");
    const articulo = document.querySelector("opcion10");
    const form = document.querySelector("opcion10 form");
    const inputs = form ? form.querySelectorAll("input") : [];

    function mostrarTexto(texto) {
        const p = document.createElement("p");// crea la etiqueta p
        p.textContent = texto;//pone la etiqueta al principio
        mostrar.appendChild(p);//pone la etiqueta al final
    }

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Validar articulo antes de enviarlo
    form.addEventListener("submit", function (evento) {
        let valido = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                valido = false;
                input.style.border = "2px solid red"; // Resalta el input vacío
            } else {
                input.style.border = ""; // Elimina el borde rojo si se completa
            }
        });

        if (!valido) {
            evento.preventDefault(); // Evita el envío del articulo
            alert("Por favor, completa todos los campos antes de continuar.");
        } else {
            console.log("articulo enviado correctamente");

            let nombreEstudiante = document.querySelector("#nombreEstudianteProm").value;

            let estEncontrado = listaEstu.busquedaPorNombre(nombreEstudiante);
            if (estEncontrado) {
                let notas = estEncontrado.asignaturas.map(asig => asig.nota).filter(nota => nota !== undefined);
                let promedio = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length) : 0;
                console.log(`Promedio de ${estEncontrado.nombre}: ${promedio.toFixed(2)}`);
                mostrar.innerHTML = ""; // Limpiar el contenido del section
                const exito = `Promedio de ${estEncontrado.nombre}: ${promedio.toFixed(2)}`;
                mostrarTexto(exito);
            }
            else {
                mostrar.innerHTML = ""; // Limpiar el contenido del section
                const error = `No se encontró el estudiante especificado.`;
                mostrarTexto(error);
            }
        }
    });
});

//Calcular promedio general de todos los estudiantes caso 11
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("11");
    const articulo = document.querySelector("opcion11");
    const mostrar = document.getElementById("mostrar11");

    function mostrarTexto(texto) {
        const p = document.createElement("p");// crea la etiqueta p
        p.textContent = texto;//pone la etiqueta al principio
        mostrar.appendChild(p);//pone la etiqueta al final
    }

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Mostrar promedio general al hacer clic en el botón
    mostrar.addEventListener("click", function () {
        let notasTotales = [];
        listaEstu.forEach(est => {
            let notas = est.asignaturas.map(asig => asig.nota).filter(nota => nota !== undefined);
            notasTotales.push(...notas);
        });
        let promedio = notasTotales.length ? (notasTotales.reduce((a, b) => a + b, 0) / notasTotales.length) : 0;
        console.log(`Promedio general de todos los estudiantes: ${promedio.toFixed(2)}`);
        mostrar.innerHTML = ""; // Limpiar el contenido del section
        const exito = `Promedio general de todos los estudiantes: ${promedio.toFixed(2)}`;
        mostrarTexto(exito);
    });
});

// ************* EVENTOS ******************
const guardarDatosBtn = document.getElementById("guardarDatos");
if (guardarDatosBtn) guardarDatosBtn.addEventListener("click", guardarDatos);

const mostrarEstudiantesBtn = document.getElementById("mostrarEstudiantes");
if (mostrarEstudiantesBtn) mostrarEstudiantesBtn.addEventListener("click", mostrarEstudiantes);

const mostrarAsignaturasBtn = document.getElementById("mostrarAsignaturas");
if (mostrarAsignaturasBtn) mostrarAsignaturasBtn.addEventListener("click", mostrarAsignaturas);

const calcularPromedioGeneralBtn = document.getElementById("calcularPromedioGeneral");
if (calcularPromedioGeneralBtn) calcularPromedioGeneralBtn.addEventListener("click", calcularPromedioGeneral);

const calcularPromedioEstudianteBtn = document.getElementById("calcularPromedioEstudiante");
if (calcularPromedioEstudianteBtn) calcularPromedioEstudianteBtn.addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    calcularPromedioEstudiante(estudiante);
});

const eliminarEstudianteBtn = document.getElementById("eliminarEstudiante");
if (eliminarEstudianteBtn) eliminarEstudianteBtn.addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    eliminarEstudiante(estudiante);
});

const eliminarAsignaturaBtn = document.getElementById("eliminarAsignatura");
if (eliminarAsignaturaBtn) eliminarAsignaturaBtn.addEventListener("click", () => {
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    eliminarAsignatura(asignatura);
});

const matricularEstudianteBtn = document.getElementById("matricularEstudiante");
if (matricularEstudianteBtn) matricularEstudianteBtn.addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    matricularEstudiante(estudiante, asignatura);
});

const desmatricularEstudianteBtn = document.getElementById("desmatricularEstudiante");
if (desmatricularEstudianteBtn) desmatricularEstudianteBtn.addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    desmatricularEstudiante(estudiante, asignatura);
});

const calificarEstudianteBtn = document.getElementById("calificarEstudiante");
if (calificarEstudianteBtn) calificarEstudianteBtn.addEventListener("click", () => {
    let estudiante = prompt("Introduce el nombre del estudiante:");
    let asignatura = prompt("Introduce el nombre de la asignatura:");
    let nota = prompt("Introduce la nota:");
    calificarEstudiante(estudiante, asignatura, nota);
});
