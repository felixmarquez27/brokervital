function consulta_bd(consulta) {
    let peticion = new XMLHttpRequest();
    peticion.open('POST', './php/getdata.php');
    let parametros = 'consulta=' + consulta;
    peticion.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    return peticion;

}

let enviarDatos = (form) => {



    let array_todos_los_datos = [];
    for (let i = 0; i < form.length - 1; i++) { // form.length-1 para que no incluya el boton de submit
        array_todos_los_datos[i] = form[i].value;
    }
    let datosJSON = JSON.stringify(array_todos_los_datos);
    let peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/subir.php');
    let parametros = `consulta=subir_datos&nombre_form=${form.name}&array_datos=${datosJSON}`;
    peticion.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    peticion.send(parametros);
    return peticion;

}


function limpiar_imputs(form) {
    for (var i = 0; i < form.length - 1; i++) { // form.length-1 para que no incluya el boton de submit
        form[i].value = '';
    }

}