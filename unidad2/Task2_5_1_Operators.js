//1-What are the final values of all variables a, b, c and d after the code below?

let a =1;
let b =1;
let c = ++a; //2 --> porque se suma el valor de a
let d = b++;//1 --> porque incrementa el valor despues de darselo a d, entonces sigue valiendo 1
console.log (c,d);

//2-What are the values of a and x after the code below?

let e = 2;
let x = 1+(e*=2);//5--> e*=2 es lo mismo que e = e*2 por lo que e vale 4 ahora
                // sabiendo que ahora e vale 4, x = 1+4
console.log (x);

//3-What will be the result for these expressions?
console.log(5>4);// true porque efectivamente 5 es mayor que 4
console.log("apple">"pinapple");// false porque a es de las primeras letras, por tanto 
//tiene un valor menor que p
console.log("2">"12");//true-->2 es mayor porque 12 tiene un 1 delante
console.log(undefined == null);//true --> undefined es igual a null
console.log(undefined === null);//false --> el triple igual es un igual estricto, compara el tipo
console.log(null == "\n0\n");//false --> null solo es igual a undefined cuando se le pone el doble igual
console.log(null === +"\n0\n");//false --> convierte la cadena a 0, null y 0 no son tipos iguales


//4-What are the results of these expressions?
console.log("" + 1 + 0);// 10 --> una cadena vacía con un número convierte todo a cadena
console.log("" - 1 + 0);// -1 --> "" se convierte a 0 en una operación de resta, así que la expresión es 0 - 1 + 0
console.log(true + false);// 1 --> true es 1 y false 0 por tanto 1+0 = 1
console.log(6 / "3");//2--> JavaScript convierte la cadena 3 en el número 3, y 6/3 es 2
console.log("2" * "3");// 6 --> JavaScript ha convertido las cadenas 2 y 3 en los numeros, por tanto se multiplica
console.log(4 + 5 + "px");//9px --> suma 4 y 5 y le añade la cadena px
console.log("$" + 4 + 5);//$45 --> al tener delante una cadena, lo pone todo como cadena
console.log("4" - 2);//2--> al ser una resta, se convierte al valor 4 y lo resta
console.log("4px" - 2);//NaN--> 4px no se puede convertir a numero, nan significa not a number
console.log(" -9 " + 5);//-9 5--> se hace una concatenacion
console.log(" -9 " - 5);//-14 --> -9 se convierte en numero y se restan entre si
console.log(null + 1);//1 --> si no hay valor y le añades 1, hay 1
console.log(undefined + 1);//NaN --> undefined no se convierte a numero
console.log(" \t \n" - 2);//-2 --> Si los espacios en blanco se ignoran, \t\n se convierte a 0


//5-Here’s a code that asks the user for two numbers and shows their sum. It works incorrectly.
//The output in the example below is 12 (for default prompt values). Why? Fix it. The result
//should be 3.
//let f = prompt("First number?", 1);
//let g = prompt("Second number?", 2);
//alert(f + g); // 12

//la funcion prompt devuelven cadenas, por lo que tenemos que hacer que se combierta en número, 
//para ello lo que deberemos usar será Number() resultando de la siguiente manera:
let f = Number(prompt("First number",1));
let g = Number(prompt("Second number",2));
alert(f+g); //esto tiene que resultar 3
