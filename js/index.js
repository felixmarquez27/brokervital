let divCartillas = document.getElementById('div-cartillas');
let btnCerrarAviso = document.getElementById('btn-cerrar-aviso');
let thumbCartilla = document.getElementById('thumb-cartilla');
let divSpinner = document.getElementById('div-spinner');
let btnCaracteristicas = document.getElementById('btn-caracteristicas');
let btnCotizaAhora = document.getElementById('btn-cotiza-ahora');
let sectionCaracteristicas = document.getElementById('section-caracteristicas');
let sectionCotizaAhora = document.getElementById('section-cotiza-ahora');


//----------form cotiza ahora---------------
let divEdadConyugue = document.getElementById('div-edad-conyugue');
let divCantidadDehijos = document.getElementById('div-cantidad-de-hijos');
let divCotizaAhora = document.getElementById('div-cotiza-ahora');
let formCotizaAhora = document.getElementById('form-cotiza-ahora');
let divAvisoErrorFormCotiza = document.getElementById('div-aviso-error-form-cotiza');
let divAvisoOkFormContacto = document.getElementById('div-aviso-ok-form-contacto');
let divAvisoErrorFormContacto = document.getElementById('div-aviso-error-form-contacto');
let inputEdad = document.getElementById('input-edad');
let TipoIngreso = document.getElementById('select-tipo-ingreso');
let selectLocalidad = document.getElementById('select-localidad');
let inputEdadConyugue = document.getElementById('input-edad-conyugue');
let inputCantidadHijos = document.getElementById('input-cantidad-hijos');
let inputNombre = document.getElementById('input-nombre');//enviar por mail
let inputEmail = document.getElementById('input-email');//enviar por mail
let divInputNombre = document.getElementById('div-input-nombre');
let divInputEmail = document.getElementById('div-input-email');
let enviarPorMail = document.getElementById('enviarPorMail');
let divSpinnerParcialCotiza = document.getElementById('div-spinner-parcial-cotiza');
let divSpinnerParcialContacto = document.getElementById('div-spinner-parcial-contacto');
//----------------planes--------------------
let sectionPlanes = document.getElementById('section-planes');
let planAPorTi = document.getElementById('plan-a-por-ti');
let planAPorConyugue = document.getElementById('plan-a-por-conyugue');
let planAPorHijo = document.getElementById('plan-a-por-hijo');
let planBPorTi = document.getElementById('plan-b-por-ti');
let planBPorConyugue = document.getElementById('plan-b-por-conyugue');
let planBPorHijo = document.getElementById('plan-b-por-hijo');
let planCPorTi = document.getElementById('plan-c-por-ti');
let planCPorConyugue = document.getElementById('plan-c-por-conyugue');
let planCPorHijo = document.getElementById('plan-c-por-hijo');
let precioPlanA = document.getElementById('precio-plan-a');
let precioPlanB = document.getElementById('precio-plan-b');
let precioPlanC = document.getElementById('precio-plan-c');

let btnCartillaPlanA = document.getElementById('btn-cartilla-plan-a');
let btnCartillaPlanB = document.getElementById('btn-cartilla-plan-b');
let btnCartillaPlanC = document.getElementById('btn-cartilla-plan-c');

let divContacto = document.getElementById('div-contacto');
let formContacto = document.getElementById('form-contacto');

//----------MENSAJES DE QUÉ SIGNIFICA------------------//
divExplicacion = document.getElementById('div-explicacion');
let particular = 'Como tu tipo de ingreso es particular, deberás abonar la totalidad del plan elegido.';
let Monotributo = 'Como tu tipo de ingreso es Monotributo, tu ya aportas $575 a tu obra social. En estos casos, debes pasar ese aporte a la prepaga y abonas el resto correspondiente al plan elegido.';
let relacionDeDependencia = 'Como tu tipo de ingreso es en relación de dependencia, recuerda que entre tú y tu empleador realizan el aporte total de tu obra social. Si ese total es igual a la suma de alguno de los planes ¡NO PAGAS NADA EXTRA!';
let responsableInscripto = 'Como tu tipo de ingreso es como Responsable Inscripto, deberás abonar la totalidad del plan elegido menos el 10% (IVA)';
let Jubilado = 'Como tu tipo de ingreso por jubilación, deberás abonar la totalidad del plan elegido.';
let mensajePorDefault = 'Por Favor elige un tipo de ingreso válido';


let mostrarFormComienza = () => {
    divAvisoComienza.classList.remove('oculto');
}

let mostrarPagina = () => {
    divSpinner.style.opacity = "0";
    setInterval(function() { divSpinner.classList.add('oculto') }, 1000);
}

let scrollTo = (offset) => {
    window.scrollTo(0, offset);
}

let hijos = (checkbox) => {
    if (checkbox.checked) {
        divCantidadDehijos.classList.remove('oculto');
    } else {
        divCantidadDehijos.classList.add('oculto');
        inputCantidadHijos.value = 0;
    }
}

let conyugue = (checkbox) => {
    if (checkbox.checked) {
        divEdadConyugue.classList.remove('oculto');
    } else {
        divEdadConyugue.classList.add('oculto');
        inputEdadConyugue.value = 0;
    }
}

let infoAMail = (checkbox) => {
    if (checkbox.checked) {
        divInputNombre.classList.remove('oculto');
        divInputEmail.classList.remove('oculto');
    } else {
        divInputNombre.classList.add('oculto');
        divInputEmail.classList.add('oculto');
    }
}

let cotizar = (form) => {
    //----------aactivar loader-------
    divSpinnerParcialCotiza.classList.remove('oculto');
    divCotizaAhora.classList.add('oculto');
    //--------------------------------
    divAvisoErrorFormCotiza.innerHTML = '';
    divExplicacion.innerHTML = '';

    let tuEdad = inputEdad.value;
    let tipoDeIngreso = TipoIngreso.value;
    let localidad = selectLocalidad.value;
    let EdadConyugue = inputEdadConyugue.value || 0;
    let cantidadHijos = inputCantidadHijos.value || 0;
    let nombre = inputNombre.value || '';
    let mail = inputEmail.value || '';
    localidadGlobal = localidad;
    let datos = [tuEdad, tipoDeIngreso, localidad, EdadConyugue, cantidadHijos, nombre, mail];

    let peticion = consulta_bd(`get_cotizacion&datos=${JSON.stringify(datos)}`);
    peticion.onload = function() {
        let error = 0;
        var datos = JSON.parse(peticion.responseText);
        for (let i = 0; i < datos[0][0].length; i++) {
            if (datos[0][0][i][0] == 1) {
                var textError = document.createElement('p');
                textError.innerHTML = datos[0][0][i][1];
                divAvisoErrorFormCotiza.appendChild(textError);
                error++;
            }

        }

        if (error > 0) {
            //----------desactiva loader
            divCotizaAhora.classList.remove('oculto');
            divSpinnerParcialCotiza.classList.add('oculto');
            //----------------------
            divAvisoErrorFormCotiza.classList.remove('oculto');
        } else {
            planAPorTi.innerHTML = `Por Tí: $${datos[0][1][0].plana}`;
            planAPorConyugue.innerHTML = `Por Conyugue: $${datos[0][2][0].plana}`;
            planAPorHijo.innerHTML = `Por Hijos: $${datos[0][3][0].plana}`;

            planBPorTi.innerHTML = `Por Tí: $${datos[0][1][0].planb}`;
            planBPorConyugue.innerHTML = `Por Conyugue: $${datos[0][2][0].planb}`
            planBPorHijo.innerHTML = `Por Hijos: $${datos[0][3][0].planb}`;

            planCPorTi.innerHTML = `Por Tí: $${datos[0][1][0].planc}`;
            planCPorConyugue.innerHTML = `Por Conyugue: $${datos[0][2][0].planc}`
            planCPorHijo.innerHTML = `Por Hijos: $${datos[0][3][0].planc}`;

            precioPlanA.innerHTML = '<span class="unidad-moneda">AR$</span>' + (parseInt(datos[0][1][0].plana) + parseInt(datos[0][2][0].plana) + parseInt(datos[0][3][0].plana));
            precioPlanB.innerHTML = '<span class="unidad-moneda">AR$</span>' + (parseInt(datos[0][1][0].planb) + parseInt(datos[0][2][0].planb) + parseInt(datos[0][3][0].planb));
            precioPlanC.innerHTML = '<span class="unidad-moneda">AR$</span>' + (parseInt(datos[0][1][0].planc) + parseInt(datos[0][2][0].planc) + parseInt(datos[0][3][0].planc));
            //----------------------------Mensajes por tipo de ingreso----------------------------//

            let textporIngreso = document.createElement('p');
            textporIngreso.classList.add('text-por-ingreso');
            switch (TipoIngreso.value) {
                case 'particular':
                    textporIngreso.innerHTML = particular;
                    break;
                case 'relaciondedependencia':
                    textporIngreso.innerHTML = relacionDeDependencia;
                    break;
                case 'monotributista':
                    textporIngreso.innerHTML = Monotributo;
                    break;
                case 'responsableinscripto':
                    textporIngreso.innerHTML = responsableInscripto;
                    break;
                case 'jubilado':
                    textporIngreso.innerHTML = Jubilado;
                    break;
                default:
                    textporIngreso.innerHTML = mensajePorDefault;
                    break;
            }
            divExplicacion.appendChild(textporIngreso);

            //----------desactiva loader
            divCotizaAhora.classList.remove('oculto');
            sectionPlanes.classList.remove('oculto');
            divSpinnerParcialCotiza.classList.add('oculto');
            //----------------------
            let offset = sectionPlanes.offsetTop;
            scrollTo(offset);
        }
    }


}
let contactar = (form) => {
    divAvisoErrorFormContacto.innerHTML='';
     //----------aactivar loader-------
    divSpinnerParcialContacto.classList.remove('oculto');
    divContacto.classList.add('oculto');
    //--------------------------------
   let peticion=enviarDatos(form);
   peticion.onload = function() {
        var datos = JSON.parse(peticion.responseText);

        let textAviso=document.createElement('p');
            textAviso.innerHTML = datos[1];
        if (datos[0]==0) {
             divAvisoOkFormContacto.appendChild(textAviso);

             //--------------limpiar inputs----------
             form[0].value='';
             form[1].value='';
             form[2].value='';
            //----------desactiva loader
            divContacto.classList.remove('oculto');
            divSpinnerParcialContacto.classList.add('oculto');
            divAvisoErrorFormContacto.classList.add('oculto');
            divAvisoOkFormContacto.classList.remove('oculto');
        } else {
            
            divAvisoErrorFormContacto.appendChild(textAviso);
            //----------desactiva loader
            divContacto.classList.remove('oculto');
            divSpinnerParcialContacto.classList.add('oculto');
            //----------------------
            divAvisoErrorFormContacto.classList.remove('oculto');
            divAvisoOkFormContacto.classList.add('oculto');
        }
        
    }
}



let activarLoaderParcial = (div) => {
    let html = "";
    switch (div) {
        case "cotizarAhora":
            divSpinnerParcialCotiza.classList.remove('oculto');
            divCotizaAhora.classList.add('oculto');
            break;
        case "formContacto":
            divSpinnerParcialContacto.classList.remove('oculto');
            divContacto.innerHTML = '';
            break;

        default:
            break;
    }

}


let getCartilla = (plan) => {
    thumbCartilla.innerHTML = '';
    let peticion = consulta_bd(`get_cartilla&plan=${plan}&localidad=${localidadGlobal}`);
    peticion.onload = function() {
        var datos = JSON.parse(peticion.responseText);
        let imgCartilla = document.createElement('img');
        imgCartilla.setAttribute("src", `./img/cartillas/${datos}`);
        thumbCartilla.appendChild(imgCartilla);
        divCartillas.classList.remove('oculto');
    }

}


window.addEventListener('load', function() { mostrarPagina(); });

btnCaracteristicas.addEventListener("click", function(e) {
    e.preventDefault();
    let offset = sectionCaracteristicas.offsetTop;
    scrollTo(offset);
});

btnCotizaAhora.addEventListener("click", function(e) {
    e.preventDefault();
    let offset = sectionCotizaAhora.offsetTop;
    scrollTo(offset);
});



btnCerrarAviso.addEventListener("click", function() { divCartillas.classList.add('oculto') });
formCotizaAhora.addEventListener("submit", function(e) {
    e.preventDefault();
    cotizar(this);
});
formContacto.addEventListener("submit", function(e) {
    e.preventDefault();
    contactar(this);
});

btnCartillaPlanA.addEventListener("click", function() { getCartilla('plana'); });
btnCartillaPlanB.addEventListener("click", function() { getCartilla('planb'); });
btnCartillaPlanC.addEventListener("click", function() { getCartilla('planc'); });