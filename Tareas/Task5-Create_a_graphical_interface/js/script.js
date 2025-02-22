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

// Función para guardar la lista de estudiantes en localStorage
function guardarEstudiantes() {
    let estudiantes_1 = listaEstu.listadoEstudiantes.map(valor => ({
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
    const listaAsignaturasElement = document.getElementById('listaAsignaturas');
    listaAsignaturasElement.innerHTML = ''; // Limpiar lista antes de agregar nuevas asignaturas

    listaAsig.listadoAsignaturas.forEach(asig => {
        const li = document.createElement('li');
        li.textContent = `Asignatura: ${asig.nombre}`;
        listaAsignaturasElement.appendChild(li);
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

// ************* INTERACCIÓN CON EL DOM ******************
// Función para mostrar texto en un elemento
function mostrarTexto(texto, elementId) {
    const mostrar = document.getElementById(elementId);
    const p = document.createElement("p");
    p.textContent = texto;
    mostrar.appendChild(p);
}


//Añadir estudiantes caso 1
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("1");
    const articulo = document.querySelector(".opcion1");
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");
    const mostrar = document.getElementById("output"); // Añadido

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Función para guardar estudiantes en localStorage
    function guardarEstudiantes() {
        let estudiantes_1 = listaEstu.listadoEstudiantes.map(valor => ({
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

    function mostrarEstudiantes() {
        mostrar.innerHTML = ""; // Limpiar el contenido del div
        listaEstu.listadoEstudiantes.forEach(estudiante => {
            const estudianteInfo = `Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Dirección: ${estudiante.direccion.calle}, ${estudiante.direccion.numero}, ${estudiante.direccion.piso}, ${estudiante.direccion.codigo_postal}, ${estudiante.direccion.provincia}, ${estudiante.direccion.localidad}`;
            const p = document.createElement("p");
            p.textContent = estudianteInfo;
            mostrar.appendChild(p);
        });
    }

    mostrarEstudiantes();

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Validar articulo antes de enviarlo
    form.addEventListener("submit", function (event) {
        let valido = true;
        let datos = {};

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                valido = false;
                input.style.border = "2px solid red"; // Resalta el input vacío
            } else {
                input.style.border = ""; // Elimina el borde rojo si se completa
                datos[input.id] = input.value.trim(); // Guardamos los valores de los inputs en un objeto
            }
        });

        if (!valido) {
            event.preventDefault(); // Evita el envío del articulo
            alert("Por favor, completa todos los campos antes de continuar.");
        } else {
            console.log("articulo enviado correctamente");

            // Crear la dirección
            let nuevaDireccion = new Direccion(
                datos.calle,
                Number(datos.numero),
                datos.piso,
                datos.codigo_postal,
                datos.provincia,
                datos.localidad
            );

            let nuevoEstudiante = new Estudiante(datos.nombre, Number(datos.edad), nuevaDireccion);

            let comprobacion_es = listaEstu.addEstudiante(nuevoEstudiante);

            if (comprobacion_es != false) {
                console.log("Estudiante creado y agregado con éxito:");
                guardarEstudiantes();
                mostrarEstudiantes();
                form.reset();
                articulo.style.display = "none"; // Ocultar el articulo


            }
        }
    });
});

//Eliminar estudiantes caso 2
// Ocultar el articulo al cargar la página
articulo.style.display = "none";

// Función para guardar la lista de estudiantes en localStorage
function guardarEstudiantes() {
    let estudiantes_1 = listaEstu.listadoEstudiantes.map(valor => ({ //se utiliza map para obtener bien el array de objetos en vez de un string
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

    // Función para guardar la lista de estudiantes en localStorage

    function guardarEstudiantes() {
        let estudiantes_1 = listaEstu.listadoEstudiantes.map(valor => ({
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

    if (!valido) {
        evento.preventDefault(); // Evita el envío del articulo
        alert("Por favor, completa todos los campos antes de continuar.");
    } else {
        console.log("articulo enviado correctamente");

        mostrar.innerHTML = ""; // Limpiar el contenido del section

        let mostrar_Estu = `Estudiantes en la lista:`;

        mostrarTexto(mostrar_Estu);


        for (let persona of listaEstu.listadoEstudiantes) {
            let personas = `${persona.nombre}, ${persona.edad}, ${persona.direccion.calle}, ${persona.direccion.numero}, ${persona.direccion.piso}, ${persona.direccion.codigo_postal}, ${persona.direccion.provincia}, ${persona.direccion.localidad}`;
            mostrarTexto(personas);
        }
        listaEstu.mostrarEstudiantes(); //lo muestra en consola



        let elim_estu = document.getElementById("ID_Eli").value;
        elim_estu = Number(elim_estu);

        if (isNaN(elim_estu) || elim_estu < 0) {
            const error = `El ID introducido debe ser un número positivo.`;
            mostrarTexto(error);
        }

        let idEliminar = listaEstu.listadoEstudiantes[elim_estu];
        console.log(idEliminar);

        // Liberar el ID eliminado en Estudiantes.numeros
        //eliminamos tambien al estudiante de la clase
        if (idEliminar) {
            listaEstu.eliminarEstudiante(idEliminar);
            guardarEstudiantes();
            const eliminado = `El estudiante ${idEliminar.nombre} ha sido eliminado correctamente.`;
            mostrarTexto(eliminado);
        } else {
            const error = `No se encontró ningún estudiante con el ID ${elim_estu}.`;
            mostrarTexto(error);
        }

        evento.preventDefault();
    }
}


//Mostrar estudiantes caso 3
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("3");
    const articulo = document.querySelector(".opcion3");
    const mostrar = document.getElementById("mostrar3");

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

    // Mostrar el articulo al hacer clic en el botón
    boton.addEventListener("click", function () {
        articulo.style.display = (articulo.style.display === "none") ? "block" : "none";
    });

    // Mostrar estudiantes al hacer clic en el botón
    mostrar.addEventListener("click", function () {
        mostrarEstudiantes();
    });
});

//Añadir asignaturas caso 4
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("4");
    const articulo = document.querySelector(".opcion4");
    const form = document.querySelector(".opcion4 form");
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


//Eliminar asignaturas caso 5
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("5");
    const articulo = document.querySelector(".opcion5");
    const form = document.querySelector(".opcion5 form");
    mostrarTexto(texto, "mostrar5");
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
});

//Mostar asignaturas caso 6
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("6");
    const articulo = document.querySelector(".opcion6");
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
    const articulo = document.querySelector(".opcion7");
    const form = document.querySelector(".opcion7 form");
    const inputs = form.querySelectorAll("input");
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
    const articulo = document.querySelector(".opcion8");
    const form = document.querySelector(".opcion8 form");
    const inputs = form.querySelectorAll("input");
    const mostrar = document.getElementById("mostrar8"); // Añadido

    function mostrarTexto(texto) {
        const p = document.createElement("p");// crea la etiqueta p
        p.textContent = texto;//pone la etiqueta al principio
        mostrar.appendChild(p);//pone la etiqueta al final
    }

    // Ocultar el articulo al cargar la página
    articulo.style.display = "none";

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
});

//Calificar estudiante en asignatura caso 9

document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("9");
    const articulo = document.querySelector(".opcion9");
    const form = document.querySelector(".opcion9 form");
    const inputs = form.querySelectorAll("input");
    const mostrar = document.getElementById("mostrar9"); // Añadido

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
});

//Calcular promedio de un estudiante caso 10
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton = document.getElementById("10");
    const articulo = document.querySelector(".opcion10");
    const form = document.querySelector(".opcion10 form");
    const inputs = form.querySelectorAll("input");
    const mostrar = document.getElementById("mostrar10"); // Añadido

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
    const articulo = document.querySelector(".opcion11");
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
