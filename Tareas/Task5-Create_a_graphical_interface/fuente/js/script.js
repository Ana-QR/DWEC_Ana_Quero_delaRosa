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

// Función para cargar los datos del LocalStorage
function cargarDatosLocalStorage() {

    //? Carga de datos de estudiantes
    let estudiantesGuardados = localStorage.getItem("todosLosEstudiantes");
    console.log(estudiantesGuardados);

    if (estudiantesGuardados) {
        estudiantesGuardados = estudiantesGuardados ? JSON.parse(estudiantesGuardados) : []; ///con json.parse convertimos el string en un objeto y asi llamamos a los valores

        estudiantesGuardados.forEach(est => {
            let nuevaDireccion = new Direccion(est.direccion.calle, est.direccion.numero, est.direccion.piso, est.direccion.cp, est.direccion.provincia, est.direccion.localidad);
            let nuevoEstudiante = new Estudiante(est.nombre, est.edad, nuevaDireccion);
            listaEstu.addEstudiante(nuevoEstudiante);
        });
    }

    //? Carga de datos de asignaturas
    let asignaturasGuardadas = localStorage.getItem("todasLasAsignaturas");
    console.log(asignaturasGuardadas);



    if (asignaturasGuardadas) {
        asignaturasGuardadas = asignaturasGuardadas ? JSON.parse(asignaturasGuardadas) : []; ///con json.parse convertimos el string en un objeto y asi llamamos a los valores

        asignaturasGuardadas.forEach(asig => {
            let nuevaAsignatura = new Asignatura(asig.nombre);
            listaAsig.addAsignatura(nuevaAsignatura);
        });

    }

    //? Carga de datos de matriculaciones
    let matriculacionesGuardadas = localStorage.getItem("matriculaciones");
    console.log(matriculacionesGuardadas);

    if (matriculacionesGuardadas) {
        matriculacionesGuardadas = JSON.parse(matriculacionesGuardadas); // Convertimos el string en un objeto

        for (let matriculacion of matriculacionesGuardadas) {
            let estudiante = listaEstu.busquedaPorNombre(matriculacion.estudiante);
            let asignatura = listaAsig.busquedaPorNombre(matriculacion.asignatura);
            if (estudiante && asignatura) {
                estudiante.matricular(asignatura);
            }
        }
    }

    //? Carga de datos de calificaciones
    let calificacionesGuardadas = localStorage.getItem("calificaciones");
    console.log(calificacionesGuardadas);

    if (calificacionesGuardadas) {
        calificacionesGuardadas = JSON.parse(calificacionesGuardadas); // Convertimos el string en un objeto

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


// ************* INTERACCIÓN CON EL DOM ******************

// Crear estudiantes caso 1
document.addEventListener("DOMContentLoaded", () => { // DOMContentLoaded se utiliza para asegurarse de que el DOM esté listo antes de intentar manipularlo
    const boton1 = document.getElementById("bot1");
    const form1 = document.getElementById("opcion1");

    // Verificar que los elementos existen
    if (!boton1 || !form1) {
        console.error("Elementos necesarios para el caso 1 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form1.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton1.addEventListener("click", function () {
        form1.classList.toggle("hidden");
    });

    // Validación de formulario
    document.getElementById("opcion1").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (!document.getElementById("nombre").value.match(/^[A-Za-zÁÉÍÓÚáéíóú ]+$/)) {
            alert("El nombre solo puede contener letras y espacios");
            return;
        }

        const nombreEstudiante = document.getElementById("nombre").value;
        const edadEstudiante = document.getElementById("edad").value;
        const calleEstudiante = document.getElementById("calle").value;
        const numeroEstudiante = document.getElementById("numero").value;
        const pisoEstudiante = document.getElementById("piso").value;
        const cpEstudiante = document.getElementById("cp").value;
        const provinciaEstudiante = document.getElementById("provincia").value;
        const localidadEstudiante = document.getElementById("localidad").value;

        if (!nombreEstudiante || !edadEstudiante || !calleEstudiante || !numeroEstudiante || !cpEstudiante || !provinciaEstudiante || !localidadEstudiante) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        let nuevaDireccion = new Direccion(calleEstudiante, numeroEstudiante, pisoEstudiante, cpEstudiante, provinciaEstudiante, localidadEstudiante);
        let nuevoEstudiante = new Estudiante(nombreEstudiante, edadEstudiante, nuevaDireccion);
        try {
            listaEstu.addEstudiante(nuevoEstudiante);
            alert("Estudiante añadido con éxito");
        } catch (error) {
            alert(error.message);
        }

        const estudiantesArray = listaEstu.listadoEstudiantes.map(estudiante => ({
            nombre: estudiante.nombre,
            edad: estudiante.edad,
            direccion: {
                calle: estudiante.direccion.calle,
                numero: estudiante.direccion.numero,
                piso: estudiante.direccion.piso,
                cp: estudiante.direccion.cp,
                provincia: estudiante.direccion.provincia,
                localidad: estudiante.direccion.localidad
            }
        }));

        // Guardar en LocalStorage
        localStorage.setItem("todosLosEstudiantes", JSON.stringify(estudiantesArray));
    });
});


// Eliminar estudiantes caso 2
document.addEventListener("DOMContentLoaded", () => {
    const boton2 = document.getElementById("bot2");
    const form2 = document.getElementById("opcion2");
    const salida2 = document.getElementById("salida2");

    // Verificar que los elementos existen
    if (!boton2 || !form2 || !salida2) {
        console.error("Elementos necesarios para el caso 2 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form2.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton2.addEventListener("click", function () {
        form2.classList.toggle("hidden");
    });

    // Validación de formulario
    document.getElementById("opcion2").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEliminar").value;

        if (!nombreEstudiante) {
            alert("Por favor, introduce el nombre del estudiante a eliminar.");
            return;
        }

        try {
            listaEstu.eliminarEstudiante(nombreEstudiante);
            alert("Estudiante eliminado con éxito");
        } catch (error) {
            alert(error.message);
        }

        const estudiantesArray = listaEstu.listadoEstudiantes.map(estudiante => ({
            nombre: estudiante.nombre,
            edad: estudiante.edad,
            direccion: {
                calle: estudiante.direccion.calle,
                numero: estudiante.direccion.numero,
                piso: estudiante.direccion.piso,
                cp: estudiante.direccion.cp,
                provincia: estudiante.direccion.provincia,
                localidad: estudiante.direccion.localidad
            }
        }));

        // Eliminar del LocalStorage
        localStorage.setItem("todosLosEstudiantes", JSON.stringify(estudiantesArray));
    });

    // Obtener datos del LocalStorage
    if (localStorage.getItem("todosLosEstudiantes") !== null) {
        const datos = JSON.parse(localStorage.getItem("todosLosEstudiantes"));
        // Mostrar los estudiantes en el HTML
        salida2.innerHTML = "";
        datos.forEach(estudiante => {
            salida2.innerHTML += `<li style="color: white;">${estudiante.nombre}</li>`;
        });
    }
});

// Añadir asignaturas caso 4
document.addEventListener("DOMContentLoaded", () => {
    const boton4 = document.getElementById("bot4");
    const form4 = document.getElementById("opcion4");

    // Verificar que los elementos existen
    if (!boton4 || !form4) {
        console.error("Elementos necesarios para el caso 4 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form4.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton4.addEventListener("click", function () {
        form4.classList.toggle("hidden");
    });

    // Validación de formulario
    document.getElementById("opcion4").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (!document.getElementById("nombreAsignatura").value.match(/^[A-Za-zÁÉÍÓÚáéíóú ]+$/)) {
            alert("El nombre solo puede contener letras y espacios");
            return;
        }

        const nombreAsignatura = document.getElementById("nombreAsignatura").value;
        let nuevaAsignatura = new Asignatura(nombreAsignatura);
        const asignaturaAñadida = listaAsig.addAsignatura(nuevaAsignatura);

        if (asignaturaAñadida) {
            alert("Asignatura añadida con éxito");

            const asignaturasArray = listaAsig.listadoAsignaturas.map(asignatura => ({
                nombre: asignatura.nombre
            }));

            // Guardar en LocalStorage
            localStorage.setItem("todasLasAsignaturas", JSON.stringify(asignaturasArray));
        } else {
            alert("La asignatura ya existe");
        }
    });
});

// Eliminar asignaturas caso 5
document.addEventListener("DOMContentLoaded", () => {
    const boton5 = document.getElementById("bot5");
    const form5 = document.getElementById("opcion5");
    const salida5 = document.getElementById("salida5");

    // Verificar que los elementos existen
    if (!boton5 || !form5 || !salida5) {
        console.error("Elementos necesarios para el caso 5 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form5.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton5.addEventListener("click", function () {
        form5.classList.toggle("hidden");
    });

    // Validar formulario 
    document.getElementById("opcion5").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        const nombreAsignatura = document.getElementById("nombreEliminarAsignatura").value;

        try {
            listaAsig.eliminarAsignatura(nombreAsignatura);
            alert("Asignatura eliminada con éxito");
        } catch (error) {
            alert(error.message);
        }

        const asignaturasArray = listaAsig.listadoAsignaturas.map(asignatura => ({
            nombre: asignatura.nombre
        }));
        
        // Eliminar del LocalStorage
        localStorage.setItem("todasLasAsignaturas", JSON.stringify(asignaturasArray));
    });

    // Mostrar las asignaturas en el HTML
    if (localStorage.getItem("todasLasAsignaturas") !== null) {
        const datos = JSON.parse(localStorage.getItem("todasLasAsignaturas"));

        //Mostar las asignaturas en el HTML
        salida5.innerHTML = "";
        datos.forEach(asignatura => {
            salida5.innerHTML += `<li class="white-text">${asignatura.nombre}</li>`;
        });
    }
});


//Matricular estudiante en asignatura caso 7
document.addEventListener("DOMContentLoaded", () => {
    const boton7 = document.getElementById("bot7");
    const form7 = document.getElementById("opcion7");

    // Verificar que los elementos existen
    if (!boton7 || !form7) {
        console.error("Elementos necesarios para el caso 7 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form7.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton7.addEventListener("click", function () {
        form7.classList.toggle("hidden");
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion7").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEstudianteMatricular").value;
        const nombreAsignatura = document.getElementById("nombreAsignaturaMatricular").value;

        const estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
        const asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);

        if (estudiante && asignatura) {
            estudiante.matricular(asignatura);
            alert("Estudiante matriculado con éxito");

            // Guardar en LocalStorage
            const matriculaciones = JSON.parse(localStorage.getItem("matriculaciones")) || [];
            matriculaciones.push({ estudiante: nombreEstudiante, asignatura: nombreAsignatura });
            localStorage.setItem("matriculaciones", JSON.stringify(matriculaciones));
        } else {
            alert("No se encontró el estudiante o la asignatura especificada");
        }
    });

});

//Desmatricular estudiante en asignatura caso 8
document.addEventListener("DOMContentLoaded", () => {
    const boton8 = document.getElementById("bot8");
    const form8 = document.getElementById("opcion8");
    const salida8 = document.getElementById("salida8");

    // Verificar que los elementos existen
    if (!boton8 || !form8 || !salida8) {
        console.error("Elementos necesarios para el caso 8 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form8.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton8.addEventListener("click", function () {
        form8.classList.toggle("hidden");
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion8").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const nombreEstudiante = document.getElementById("nombreEstudianteDesmatricular").value;
        const nombreAsignatura = document.getElementById("nombreAsignaturaDesmatricular").value;

        const estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
        const asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);

        if (estudiante && asignatura) {
            estudiante.desmatricular(asignatura);
            alert("Estudiante desmatriculado con éxito");

            //Eliminar del LocalStorage
            const matriculaciones = JSON.parse(localStorage.getItem("matriculaciones")) || [];
            const index = matriculaciones.findIndex(matriculacion => matriculacion.estudiante === nombreEstudiante && matriculacion.asignatura === nombreAsignatura);
            if (index !== -1){
                matriculaciones.splice(index, 1);
                localStorage.setItem("matriculaciones", JSON.stringify(matriculaciones));
            }
        }else{
            alert("No se encontró el estudiante o la asignatura especificada o el estudiante no está matriculado en la asignatura");
        }

        // Obtener datos del LocalStorage
        const datos = JSON.parse(localStorage.getItem("matriculaciones")) || [];

        // Mostrar las matriculaciones en el HTML
        salida8.innerHTML = "";
        for (let matriculacion of datos) {
            salida8.innerHTML += `<li class="white-text">${matriculacion.estudiante} - ${matriculacion.asignatura}</li>`;
        }
    });

    // Obtener datos del LocalStorage al cargar la página
    const datos = JSON.parse(localStorage.getItem("matriculaciones")) || [];

    // Mostrar las matriculaciones en el HTML
    salida8.innerHTML = "";
    for (let matriculacion of datos) {
        salida8.innerHTML += `<li class="white-text">${matriculacion.estudiante} - ${matriculacion.asignatura}</li>`;
    }
});

//Calificar a un estudiante caso 9
document.addEventListener("DOMContentLoaded", () => {
    const boton9 = document.getElementById("bot9");
    const form9 = document.getElementById("opcion9");
    const salida9 = document.getElementById("salida9");

    // Verificar que los elementos existen
    if (!boton9 || !form9 || !salida9) {
        console.error("Elementos necesarios para el caso 9 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form9.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton9.addEventListener("click", function () {
        form9.classList.toggle("hidden");
    });

    // Validar formulario antes de enviarlo
    document.getElementById("opcion9").querySelector("form").addEventListener("submit", function () {
        const nombreEstudiante = document.getElementById("nombreEstudianteCal").value;
        const nombreAsignatura = document.getElementById("nombreAsignaturaCal").value;
        const nota = document.getElementById("nota").value;

        const estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);
        const asignatura = listaAsig.busquedaPorNombre(nombreAsignatura);

        if (estudiante && asignatura){
            estudiante.calificar(asignatura, nota)? alert("Calificación añadida con éxito"): alert("El estudiante no está matriculado en la asignatura");

            // Guardar en LocalStorage
            const calificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];
            calificaciones.push({ estudiante: nombreEstudiante, asignatura: nombreAsignatura, nota: nota });
            localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
        }else{
            alert("No se encontró el estudiante o la asignatura especificada o el estudiante no está matriculado en la asignatura");
        }
    });

    // Obtener datos del LocalStorage al cargar la página
    const datos = JSON.parse(localStorage.getItem("calificaciones")) || [];

    // Mostrar las calificaciones en el HTML
    salida9.innerHTML = "";
    for (let calificacion of datos) {
        salida9.innerHTML += `<li class="white-text">${calificacion.estudiante} - ${calificacion.asignatura} - ${calificacion.nota}</li>`;
    }
});

//Calcular promedio de un estudiante caso 10
document.addEventListener("DOMContentLoaded", () => {
    const boton10 = document.getElementById("bot10");
    const form10 = document.getElementById("opcion10");

    // Verificar que los elementos existen
    if (!boton10 || !form10 || !salida10) {
        console.error("Elementos necesarios para el caso 10 no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form10.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton10.addEventListener("click", function () {
        form10.classList.toggle("hidden");
    });

    // Validar el formulario antes de enviarlo
    document.getElementById("opcion10").querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreEstudiante = document.getElementById("nombreEstudianteProm").value;

        const estudiante = listaEstu.busquedaPorNombre(nombreEstudiante);

        if (estudiante) {
            salida10.innerHTML = "";
            salida10.innerHTML = `<p>El promedio de ${nombreEstudiante} es: ${estudiante.calcularPromedioEstudiante().toFixed(2)}</p>`;
        } else {
            alert("El estudiante no existe");
        }
    });
});

//Calcular promedio general de todos los estudiantes caso 11
document.addEventListener("DOMContentLoaded", () => {
    const boton11 = document.getElementById("bot11");
    const form11 = document.getElementById("opcion11");
    const salida11 = document.getElementById("salida11");

    // Verificar que los elementos existen
    if (!boton11 || !form11 || !salida11) {
        console.error("Elementos necesarios no encontrados en el DOM.");
        return;
    }

    // Ocultar el formulario al cargar la página
    form11.classList.add("hidden");

    // Mostrar el formulario al hacer clic en el botón
    boton11.addEventListener("click", function () {
        form11.classList.toggle("hidden");
    });

    //Mostrar el promedio de todos los estudiantes
    salida11.innerHTML = "";
    salida11.innerHTML = `<p>El promedio general de todos los estudiantes es: ${listaEstu.promedioEstudiantes()}</p>`;
});

// Reporte completo
document.addEventListener("DOMContentLoaded", () => {
    const boton12 = document.getElementById("bot12");
    const contenidoReporte = document.getElementById("opcion12");
    const salida12 = document.getElementById("salida12");

    contenidoReporte.classList.add("hidden"); // Ocultar el contenido del reporte al cargar la página

    boton12.addEventListener("click", function () {
        contenidoReporte.classList.toggle("hidden");
    });

    //Mostrar el reporte completo
    salida12.innerHTML = "";
    listaEstu.listadoEstudiantes.forEach(estudiante => {
        salida12.innerHTML += `<h3>Nombre del estudiante: ${estudiante.nombre}</h3>`;
        salida12.innerHTML += `<h4>Calificaciones:</h4>`;
        estudiante.asignaturas.forEach(asignatura => {
            const nota = asignatura.calificacion; // Assuming 'calificacion' is the property that holds the grade
            salida12.innerHTML += `<p>${asignatura.nombre}: ${nota}</p>`;
        });
        salida12.innerHTML += `<h4>Promedio: ${estudiante.calcularPromedioEstudiante()}</h4>`;
        salida12.innerHTML += "<hr>";
    });
});