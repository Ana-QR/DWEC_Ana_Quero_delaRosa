(()=>{"use strict";function a(a,e,n){(function(a,e){if(e.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")})(a,e),e.set(a,n)}function e(a,e){return a.get(r(a,e))}function n(a,e,n){return a.set(r(a,e),n),n}function r(a,e,n){if("function"==typeof a?a===e:a.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var t,o,i=new WeakMap,s=new WeakMap;class c extends Persona{constructor(e,r,t){super(e,r,t),a(this,i,void 0),a(this,s,void 0),n(i,this,c.contadorId++),n(s,this,[])}get id(){return e(i,this)}get asignaturas(){return e(s,this)}matricular(){for(var a=this,n=arguments.length,r=new Array(n),t=0;t<n;t++)r[t]=arguments[t];var o=function(n){void 0===e(s,a).find((a=>a.nombre===n.nombre))?(e(s,a).push(n),console.log("Matriculación de ".concat(n.nombre," realizada el ").concat(new Date))):console.log("El estudiante ya está matriculado en ".concat(n.nombre))};for(var i of r)o(i)}desmatricular(){for(var a=this,r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];var i=function(r){void 0!==e(s,a).find((a=>a.nombre===r.nombre))?(n(s,a,e(s,a).filter((a=>a.nombre!==r.nombre))),console.log("Desmatriculación de ".concat(r.nombre," realizada el ").concat(new Date))):console.log("El estudiante no está matriculado en ".concat(r.nombre))};for(var c of t)i(c)}calificar(a,n){if("number"!=typeof n||n<0||n>10)throw new Error("La calificación debe estar entre 0 y 10.");var r=e(s,this).findIndex((e=>e.nombre===a.nombre));-1!==r?(console.log("Calificación añadida a ".concat(a.nombre," para ").concat(this.nombre,": ").concat(n)),e(s,this)[r].calificaciones.push(n),a.calificar(this,n)):console.log("El estudiante ".concat(this.nombre," no está matriculado en ").concat(a.nombre))}calcularPromedioEstudiante(){var a=0,n=0;for(var r of e(s,this))if(console.log("Asignatura:",r),Array.isArray(r.calificaciones))for(var t of r.calificaciones)console.log("Calificación encontrada:",t,"Tipo:",typeof t),"number"!=typeof t||isNaN(t)?console.log("Calificación inválida (descartada):",t):(a+=t,n++);else console.log("asignatura.calificaciones no es un array:",r.calificaciones);return console.log("Suma final: ".concat(a,", Contador final: ").concat(n)),0===n?0:Number((a/n).toFixed(2))}toString(){return"ID del estudiante: ".concat(e(i,this),",\n\n        Nombre del estudiante: ").concat(this.nombre,",\n\n        Edad del estudiante: ").concat(this.edad,",\n\n        Dirección del estudiante: ").concat(this.direccion.toString(),"\n")}}function l(a,e,n){(function(a,e){if(e.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")})(a,e),e.set(a,n)}function u(a,e){return a.get(m(a,e))}function d(a,e,n){return a.set(m(a,e),n),n}function m(a,e,n){if("function"==typeof a?a===e:a.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}t=c,(o=function(a){var e=function(a){if("object"!=typeof a||!a)return a;var e=a[Symbol.toPrimitive];if(void 0!==e){var n=e.call(a,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(a)}(a);return"symbol"==typeof e?e:e+""}(o="contadorId"))in t?Object.defineProperty(t,o,{value:0,enumerable:!0,configurable:!0,writable:!0}):t[o]=0;var p=new WeakMap,f=new WeakMap,h=new WeakMap;class g{constructor(a){if(l(this,p,void 0),l(this,f,void 0),l(this,h,void 0),!/^([a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+)$/.test(a))throw new Error("El nombre de la asignatura solo puede contener letras y espacios.");d(p,this,a),d(f,this,[]),d(h,this,new Map)}get nombre(){return u(p,this)}get calificaciones(){return u(f,this)}get estudiantes(){return u(h,this)}calificar(a,e){if("number"!=typeof e||e<0||e>10)throw new Error("La calificación debe estar entre 0 y 10.");var n=u(h,this).findIndex((e=>e.nombre===a.nombre));-1!==n?(console.log("Calificación añadida: ".concat(e," para ").concat(a.nombre," en ").concat(this.nombre)),u(f,this).push(e)):console.log("".concat(a.nombre," no está matriculado en ").concat(this.nombre))}eliminarCalificacion(a){var e=u(f,this).indexOf(a);if(-1==e)throw new Error("Ningún estudiante ha sacado dicha calificación.");u(f,this).splice(e,1)}toString(){return"Asignatura: ".concat(u(p,this))}}function b(a,e,n){(function(a,e){if(e.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")})(a,e),e.set(a,n)}function w(a,e){return a.get(E(a,e))}function v(a,e,n){return a.set(E(a,e),n),n}function E(a,e,n){if("function"==typeof a?a===e:a.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var P=new WeakMap,y=new WeakMap,A=new WeakMap,C=new WeakMap,N=new WeakMap,k=new WeakMap;class M{constructor(a,e,n,r,t,o){b(this,P,void 0),b(this,y,void 0),b(this,A,void 0),b(this,C,void 0),b(this,N,void 0),b(this,k,void 0),v(P,this,a),v(y,this,e),v(A,this,n),v(N,this,t),v(k,this,o),v(C,this,this.validarCodigoPostal(r))}validarCodigoPostal(a){return/^\d{5}$/.test(a)?a:"00000"}toString(){return"Calle: ".concat(w(P,this),",\n\n        Numero: ").concat(w(y,this),",\n\n        Piso: ").concat(w(A,this),",\n\n        Código Postal: ").concat(w(C,this),",\n\n        Provincia: ").concat(w(N,this),",\n\n        Localidad: ").concat(w(k,this),"\n")}}function L(a,e){return a.get(T(a,e))}function j(a,e,n){return a.set(T(a,e),n),n}function T(a,e,n){if("function"==typeof a?a===e:a.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var W=new WeakMap;function x(a,e){return a.get(z(a,e))}function S(a,e,n){return a.set(z(a,e),n),n}function z(a,e,n){if("function"==typeof a?a===e:a.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var q=new WeakMap,I=new class{constructor(){(function(a,e,n){(function(a,e){if(e.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")})(a,e),e.set(a,n)})(this,W,void 0),j(W,this,[]);for(var a=arguments.length,e=new Array(a),n=0;n<a;n++)e[n]=arguments[n];for(var r of e)this.addEstudiante(r)}get listadoEstudiantes(){return[...L(W,this)]}promedioEstudiantes(){var a=0,e=0;for(var n of(console.log("Calculando promedio general..."),L(W,this))){var r=n.calcularPromedioEstudiante();console.log("Promedio de ".concat(n.nombre,":"),r),"number"!=typeof r||isNaN(r)?console.log("Promedio inválido para ".concat(n.nombre,":"),r):(a+=r,e++)}return 0===e?0:a/e}addEstudiante(a){if(L(W,this).includes(a))throw new Error("El estudiante ya se encuentra en la lista, no puede haber duplicados");L(W,this).push(a)}eliminarEstudiante(a){if(!L(W,this).includes(a))throw new Error("El estudiante no se encuentra en el listado");j(W,this,L(W,this).filter((e=>e!==a))),console.log("Estudiante eliminado con éxito")}busquedaPorNombre(a){var e=L(W,this).find((function(e){return e.nombre.toLowerCase()===a.toLowerCase()}));if(!e)throw new Error("No se encontró ningún estudiante con el nombre: ".concat(a));return e}mostrarEstudiantes(){console.log("Lista de estudiantes:"),L(W,this).forEach((a=>{console.log(a.toString())}))}},D=new class{constructor(){(function(a,e,n){(function(a,e){if(e.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")})(a,e),e.set(a,n)})(this,q,void 0),S(q,this,[]);for(var a=arguments.length,e=new Array(a),n=0;n<a;n++)e[n]=arguments[n];for(var r of e)this.addAsignatura(r)}get listadoAsignaturas(){return[...x(q,this)]}addAsignatura(a){x(q,this).push(a)}eliminarAsignatura(a){if(!x(q,this).includes(a))throw new Error("La asignatura no se encuentra en el listado");S(q,this,x(q,this).filter((e=>e!==a))),console.log("Asignatura eliminada con éxito")}buscarAsignaturas(a){var e=x(q,this).find((function(e){return e.nombre.toLowerCase()==a.toLowerCase()}));if(!e)throw new Error("Asignatura(s) con el patrón '".concat(a,"' no encontrada(s)."));return e}mostrarAsignaturas(){x(q,this).forEach((a=>{console.log(a.toString())}))}};console.log("Listas de estudiantes y asignaturas creadas con éxito");var F=new M("Calle Quero",12,1,"23790","Jaén","Porcuna"),G=new M("Calle Huesa",13,"","23790","Jaén","Porcuna"),J=new M("Calle Emilio Sebastián",14,"1C","18013","Granada","Granada"),O=new M("hola",12,"","23790","Jaén","Porcuna"),H=new c("Mario Vaquerizo",40,F),$=new c("Paula Mola",20,G),Q=new c("Federico Garcia",50,J),V=new c("ana",20,O);I.addEstudiante(H),I.addEstudiante($),I.addEstudiante(Q),I.addEstudiante(V);var Z=new g("Matemáticas"),B=new g("Historia"),K=new g("Artes"),R=new g("Tecnología"),U=new g("musica");D.addAsignatura(Z),D.addAsignatura(B),D.addAsignatura(K),D.addAsignatura(R),D.addAsignatura(U),H.matricular(Z,B,R),$.matricular(Z,K),Q.matricular(B,K,R),V.matricular(U,Z,B,R),Z.calificar(H,8.5),Z.calificar($,9),B.calificar(H,7.5),B.calificar(Q,8),K.calificar($,9.5),K.calificar(Q,8.5),R.calificar(H,10),R.calificar(Q,8.8),prompt("Datos inicializados correctamente. Presiona Enter para continuar.");try{I.eliminarEstudiante(Q),D.eliminarAsignatura(K),prompt("Estudiantes y asignaturas eliminados con éxito")}catch(a){console.error(a.message)}try{$.matricular(B),H.desmatricular(B)}catch(a){console.error(a.message)}try{H.calificar(R,7),Q.calificar(R,8),Q.calificar(B,6),H.calificar(B,8),$.calificar(Z,6),$.calificar(B,7)}catch(a){console.error(a.message)}!function(){for(var a=!0;a;){var e=prompt("=== Menú Principal ===\n1. Añadir estudiante\n2. Eliminar estudiante\n3. Mostrar estudiantes\n4. Añadir asignatura\n5. Eliminar asignatura\n6. Mostrar asignaturas\n7. Matricular estudiante en asignatura\n8. Desmatricular estudiante de asignatura\n9. Calificar a un estudiante\n10. Calcular promedio de un estudiante\n11. Calcular promedio general de estudiantes\n0. Salir\nEscribe tu opción:");try{switch(e){case"1":console.clear(),prompt("Introduce los datos del estudiante:");var n=prompt("Nombre del estudiante:"),r=parseInt(prompt("Edad del estudiante:"),10),t=prompt("Calle de la dirección:"),o=prompt("Número de la dirección:"),i=prompt("Piso de la dirección:"),s=prompt("Código postal de la dirección:"),l=prompt("Provincia de la dirección:"),u=prompt("Localidad de la dirección:"),d=new M(t,o,i,s,l,u),m=new c(n,r,d);I.addEstudiante(m),prompt("Estudiante ".concat(n," añadido con éxito. Presiona Enter para continuar."));break;case"2":console.clear();var p=prompt("Nombre del estudiante a eliminar:"),f=I.busquedaPorNombre(p);f?(I.eliminarEstudiante(f),prompt("Estudiante ".concat(f.nombre," eliminado. Presiona Enter para continuar."))):prompt("Estudiante no encontrado. Presiona Enter para continuar.");break;case"3":console.clear(),console.log("Lista de estudiantes:"),console.log(I.mostrarEstudiantes());break;case"4":console.clear();var h=prompt("Nombre de la asignatura:"),b=new g(h);D.addAsignatura(b),prompt("Asignatura ".concat(h," añadida con éxito. Presiona Enter para continuar."));break;case"5":console.clear();var w=prompt("Nombre de la asignatura a eliminar:"),v=D.buscarAsignaturas(w);v?(D.eliminarAsignatura(v),prompt("Asignatura ".concat(v.nombre," eliminada. Presiona Enter para continuar."))):prompt("Asignatura no encontrada. Presiona Enter para continuar.");break;case"6":console.clear(),console.log("Lista de asignaturas:"),console.log(D.mostrarAsignaturas());break;case"7":console.clear();var E=prompt("Nombre del estudiante a matricular:"),P=prompt("Nombre de la asignatura:"),y=I.busquedaPorNombre(E),A=D.buscarAsignaturas(P);y&&A?(y.matricular(A),prompt("Estudiante ".concat(y.nombre," matriculado en ").concat(A.nombre,". Presiona Enter para continuar."))):prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");break;case"8":console.clear(),prompt("Introduce el nombre del estudiante que deseas desmatricular:");var C=prompt("Nombre del estudiante:");prompt("Introduce el nombre de la asignatura de la que deseas desmatricular al estudiante:");var N=prompt("Nombre de la asignatura:");C=I.busquedaPorNombre(C),N=D.buscarAsignaturas(N),C&&N?(C.desmatricular(N),prompt("Estudiante ".concat(C.nombre," desmatriculado de ").concat(N.nombre,". Presiona Enter para continuar."))):prompt("No se ha podido desmatricular a ".concat(C.nombre," de ").concat(N.nombre));break;case"9":console.clear();var k=prompt("Nombre del estudiante a calificar:"),L=prompt("Nombre de la asignatura:"),j=parseFloat(prompt("Calificación (0-10):"));if(j<0||j>10){prompt("La calificación debe estar entre 0 y 10. Presiona Enter para continuar.");break}var T=I.busquedaPorNombre(k),W=D.buscarAsignaturas(L);T&&W?(T.calificar(W,j),prompt("Calificación añadida con éxito. Presiona Enter para continuar.")):prompt("Estudiante o asignatura no encontrados. Presiona Enter para continuar.");break;case"10":console.clear();var x=prompt("Nombre del estudiante:"),S=I.busquedaPorNombre(x);S?console.log("Promedio del estudiante: ".concat(S.calcularPromedioEstudiante(),". Presiona Enter para continuar.")):prompt("Estudiante no encontrado. Presiona Enter para continuar.");break;case"11":console.clear();var z=I.promedioEstudiantes();prompt("Promedio general de los estudiantes: ".concat(z,". Presiona Enter para continuar."));break;case"0":console.clear(),prompt("Saliendo del programa... Presiona Enter para finalizar."),a=!1;break;default:prompt("Opción no válida. Por favor, introduce un número entre 0 y 11. Presiona Enter para continuar.")}}catch(a){console.error(a.message)}}}()})();