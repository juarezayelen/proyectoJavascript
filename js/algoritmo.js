//Proyecto: Página web de estudio juridico. Servicios: Derecho de Familia, Laboral, etc


// Creación de clase constructora y su método asociado
class Persona {
    constructor(nombre, sueldo, cantHijos, email) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.cantHijos = cantHijos;
        this.email = email;
        this.valorCuotaAlimentaria = 0;
    }
    calcularCuota() {
        this.valorCuotaAlimentaria = calcularCuotaAlimentaria(this.nombre, this.sueldo, this.cantHijos);
    }
}

//Variable de la función calcularCuotaAlimentaria
let valorCuotaA = 0;

/*Función que calcula la cuota alimentaria por cada hijo de acuerdo a un determinado sueldo*/

function calcularCuotaAlimentaria(nombre, sueldo, cantHijos) {

    switch (cantHijos) {
        case "1":
            valorCuotaA = (sueldo * 20) / 100; // Calcula el 20% del sueldo para un hijo
            console.log("El señor " + nombre, "debería pagar una cuota de " + valorCuotaA);
            return valorCuotaA;

        case "2":
            valorCuotaA = (sueldo * 25) / 100; // Calcula el 25% del sueldo para dos hijos
            console.log(valorCuotaA);
            console.log("El señor " + nombre, "debería pagar una cuota de " + valorCuotaA);
            return valorCuotaA;

        case "3":
            valorCuotaA = (sueldo * 30) / 100; // Calcula el 30% del sueldo para tres hijos
            console.log("El señor " + nombre, "debería pagar una cuota de " + valorCuotaA);
            return valorCuotaA;

        case "4":
            valorCuotaA = (sueldo * 35) / 100; // Calcula el 35% del sueldo para tres hijos
            console.log("El señor " + nombre, "debería pagar una cuota de " + valorCuotaA);
            return valorCuotaA;

        default:
            console.log("No es posible realizar el cálculo");
            break;

    }

}

//Aplicando array

const cuotas = []; //Nuevo array vacío

//Uso de JQuery
let nombre = $("#Nombre");
let sueldo = $("#Sueldo");
let cantHijos = $("#CantidadHijos");
let email = $("#email");

//Creación e inicialización de variable que guarda el valor de la cuota calculado
let valorCuota = 0;

//Uso del Ready para saber si el DOM está listo

$(document).ready(function () {
    console.log("El DOM esta listo");
});

// EVENTOS USANDO JQUERY
const boton = $("#calcularCuota");
boton.on("click", function (e) {
    e.preventDefault();
    console.log(nombre.val());
    console.log(sueldo.val());
    console.log(cantHijos.val());
    console.log(email.val());

    //Agrego objetos al arreglo
    cuotas.push(new Persona(nombre.val(), sueldo.val(), cantHijos.val(), email.val()));
    console.log(cuotas);

    for (const i of cuotas) {
        //Utilizo el método del objeto para llamar a la función que calcula la cuota
        valorCuota = i.calcularCuota(nombre.val(), sueldo.val(), cantHijos.val());
    }
    
    //Agrego IF que evalúa qué mensaje mostrar en pantalla

    if (cantHijos.val() <= 4) {
    //Agrego un elemento que le devuelva el valor de la cuota al usuario en pantalla
    $("#respuestaFormulario").append("<br>", "El señor " + nombre.val(), " debería pagar una cuota de " + valorCuotaA);
    }
    else{
    //Si cantHijos es MAYOR a 4 muestro mensaje avisando que no se puede realizar el cálculo
        $("#respuestaFormulario").append("<br>", "No es posible realizar el cálculo");
    }

    //Modifico css
    $("#respuestaFormulario").css({
        "color": "blue",
        "font-size": "20px",
        "letter-spacing": "2px",
        "line-height": "25px"
    });

    //Agrego animación al mostrar respuesta
    $("#respuestaFormulario").animate({
            left: '500px',
            opacity: '0.5',
            height: '150px',
            width: '800px'
        }, //1er parámetro propiedades
        "fast", //2do parámetro duración 
        function () { //3er parámetro callback
            console.log("final de animación");
        });

    //Agrego Fadeout a la respuesta y luego callback con FadeIn

    $("#respuestaFormulario").fadeOut("slow", function () {
        //Cuando termina de ocultarse el elemento lo mostramos nuevamente
        $("#respuestaFormulario").fadeIn(1000);
    });

    //Aplicación de AJAX al enviar un formulario

    const URL_POST = "https://jsonplaceholder.typicode.com/posts";

    $("#formulario").on("submit", (e) => {
        e.preventDefault();
        const correo = {
            email: $("#email").val()
        };
        $.post(URL_POST, correo, (respuesta, estado) => {
            console.log(respuesta);
            console.log(estado);
            //Agrego mensaje de confirmación
            if (estado === "success") {
                 $("#respuestaFormulario").append("<br>", `El valor de la cuota ha sido enviada al email ${respuesta.email}`);
            }
            
        })
    });

    //Uso del local storage
    const guardarLocal = (clave, valor) => {
        localStorage.setItem(clave, valor)
    };

    // Almaceno array completo
    guardarLocal("cuotas", JSON.stringify(cuotas));

    //Limpieza de formulario con Javascript

    $("#reset").on("click",
    function limpiarFormulario() {
        nombre.val("");
        sueldo.val("");
        cantHijos.val("");
        email.val("");
        $("#respuestaFormulario").empty(); //Elimina el div que muestra la respuesta del formulario
      })
});