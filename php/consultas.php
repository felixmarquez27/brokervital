
<?php 


function getCotizacion(){
    $errores=[];
    $respuesta=[];
    if (!empty($_POST['datos'])) {
        $array_datos=json_decode($_POST['datos']);
    }

    $tuEdad=number_cleanner($array_datos[0]);
    $tipoDeIngreso=string_cleanner($array_datos[1]);
    $localidad=string_cleanner($array_datos[2]);
    $edadConyugue=number_cleanner($array_datos[3]);
    $cantidadHijos=number_cleanner($array_datos[4]);
    $nombre=number_cleanner($array_datos[5]);
    $mail=number_cleanner($array_datos[6]);

//----Comprobaciones-----------------
if ($tuEdad>=0) {
    array_push($errores,[0,'Edad Correcta']);
}else{
    array_push($errores,[1,'Escribe una edad válida']);
}
if ($tipoDeIngreso!='ninguna') {
    array_push($errores,[0,'Tipo de ingreso correcto']);
}else{
    array_push($errores,[1,'Selecciona un Tipo de Ingreso']);
}

if ($localidad!='ninguna') {
    array_push($errores,[0,'Localidad Correcta']);
}else{
    array_push($errores,[1,'Selecciona una Localidad']);
}

if ($edadConyugue>=0) {
    array_push($errores,[0,'Edad de Conyugue Correcta']);
}else{
    array_push($errores,[1,'Escribe una edad de Conyugue válida']);
}

if ($cantidadHijos>=0) {
    array_push($errores,[0,'Cantidad de hijos Correcta']);
}else{
    array_push($errores,[1,'Escribe una Cantidad de Hijos válida']);
}






array_push($respuesta,$errores);


$error=0;
for ($i=0; $i < count($errores[0]); $i++) { 
    if ($errores[$i][0]==1) {
       $error++;
    }
}






    if ($tuEdad>=0) {
        $rangoedad=getRangoEdad($tuEdad);
        if ($rangoedad<6) {
            $preciosPlanes=getPreciosPlanesJovenes($rangoedad);
        }else{
            $preciosPlanes=getPreciosPlanesAdultoMayor($rangoedad);
        } 
        array_push($respuesta,$preciosPlanes);
    }
    
    if ($edadConyugue>=0) {
        $rangoedadconyugue=getRangoEdad($edadConyugue);
        if ($rangoedadconyugue<6) {
            $preciosConyugue=getPreciosPlanesJovenes($rangoedadconyugue);
        }else{
            $preciosConyugue=getPreciosPlanesAdultoMayor($rangoedadconyugue);
        }
        array_push($respuesta,$preciosConyugue);
    }
    if ($cantidadHijos>=0) {
           
        $precioporHijos=getPreciosPorHijos($cantidadHijos);
        array_push($respuesta,$precioporHijos);
    }
    
	return $respuesta;
}


    function getRangoEdad($edad){
            if($edad==0){
                $rango=0;
            }elseif ($edad>=1 && $edad<30) {
                $rango=1;
            }elseif ($edad>=30 && $edad<36) {
                $rango=2;
            }
            elseif ($edad>=36 && $edad<41) {
                $rango=3;
            }
            elseif ($edad>=41 && $edad<51) {
                 $rango=4;
            }
            elseif ($edad>=51 && $edad<61) {
                $rango=5;
            }
            elseif ($edad>=61 && $edad<66) {
                 $rango=6;
            }
            elseif ($edad>=66 && $edad<71) {
                $rango=7;
            }
            elseif ($edad>=71 && $edad<76) {
                 $rango=8;
            }
            elseif ($edad>=76 && $edad<81) {
                $rango=9;
            }
            elseif ($edad>80) {
                 $rango=10;
            }else{
                $rango=-1;
            }
            return $rango;
    }


function getPreciosPlanesJovenes($rangoedad){
    $respuesta=[];
	global $conexion;
	$statement= $conexion->prepare("SELECT delta, krono, quantium FROM precioplanes WHERE rangoedad=$rangoedad");
	$statement->execute();

	while ($fila = $statement->fetch()) {
				$info = [
				'plana'  =>  $fila['delta'],
				'planb'  =>  $fila['krono'],
				'planc'  => $fila['quantium']
				];
			
			array_push($respuesta, $info);		
				
    }
    
	return $respuesta;

    
}
function getPreciosPlanesAdultoMayor($rangoedad){
    $respuesta=[];
	global $conexion;
	$statement= $conexion->prepare("SELECT integral,total, planglobal FROM precioplanes WHERE rangoedad=$rangoedad");
	$statement->execute();

	while ($fila = $statement->fetch()) {
				$info = [
				'plana'  =>  $fila['integral'],
				'planb'  =>  $fila['total'],
				'planc'  =>  $fila['planglobal']
				];
			
			array_push($respuesta, $info);		
				
    }
    
	return $respuesta;

    
}


function getPreciosPorHijos($cantidadHijos){
    $primerHijo=[];
    $segundoHijo=[];
    $respuesta=[];
	global $conexion;
	$statement= $conexion->prepare("SELECT delta, krono, quantium FROM preciohijos WHERE cantidad=1");
	$statement->execute();

	while ($fila = $statement->fetch()) {
				$info = [
				'plana'  =>  $fila['delta'],
				'planb'  =>  $fila['krono'],
				'planc'  =>  $fila['quantium']
				];
			
			array_push($primerHijo, $info);		            
    }

    if ($cantidadHijos>1) {
        $statement= $conexion->prepare("SELECT delta, krono, quantium FROM preciohijos WHERE cantidad=2");
        $statement->execute();
    
        while ($fila = $statement->fetch()) {
                    $info = [
                    'plana'  =>  $fila['delta'],
                    'planb'  =>  $fila['krono'],
                    'planc'  =>  $fila['quantium']
                    ];
                
                array_push($segundoHijo, $info);		            
        }

        $total=[
            'plana'  =>round((intval($primerHijo[0]['plana']))+((intval($cantidadHijos-1))*(intval($segundoHijo[0]['plana']))),2),
            'planb'  =>round((intval($primerHijo[0]['planb']))+((intval($cantidadHijos-1))*(intval($segundoHijo[0]['planb']))),2),
            'planc'  =>round((intval($primerHijo[0]['planc']))+((intval($cantidadHijos-1))*(intval($segundoHijo[0]['planc']))),2)
           ];
           array_push($respuesta, $total);

    
    }elseif($cantidadHijos==1){
        $respuesta=$primerHijo;
    }else{
        $statement= $conexion->prepare("SELECT delta, krono, quantium FROM preciohijos WHERE cantidad=0");
	    $statement->execute();

            while ($fila = $statement->fetch()) {
                        $info = [
                        'plana'  =>  $fila['delta'],
                        'planb'  =>  $fila['krono'],
                        'planc'  =>  $fila['quantium']
                        ];
                    
                    array_push($respuesta, $info);		            
            }
    }

   
       

       
    
	return $respuesta;

}


function getCartilla(){
    $plan=string_cleanner($_POST['plan']);
    $localidad=string_cleanner($_POST['localidad']);
    $respuesta=consulta_bd_simple($plan,'cartillaclinicas','zona',$localidad);
    return $respuesta;
}

///---------------------------------subir datos----------------
function subir_datos(){
    $respuesta=[];
    $verificacion=[];
	$errores=0;
    
$formulario=string_cleanner($_POST['nombre_form']);

    if (!empty($_POST['array_datos'])) {
        $array_datos=json_decode($_POST['array_datos']);
    }

    $nombre=string_cleanner($array_datos[0]);
    $correo=email_cleanner($array_datos[1]);
    $mensaje=string_cleanner($array_datos[2]);
    
    array_push($verificacion,comprobar_correo($correo));
    array_push($verificacion,comprobar_vacio([$nombre]));
    foreach ($verificacion as $key => $value) {
        if ($value[0]==1) {
            $respuesta=$value;
            $errores++;
        break;
        }
    }
    if ($errores==0) {
        
        $mensajeHTML=generar_correo($nombre,$correo,$mensaje);
       $respuesta=phpmailer_html_format('info@brokervital.site','#@h$*;FE','Broker Vital','felixmarqueznegocios@gmail.com','Broker Vital',$correo,$nombre,'Nueva Consulta desde la brokervital.site',$mensajeHTML,'No se pudo enviar el mensaje','el mensaje se envio correctamente');
    }
    
   
return $respuesta;
}

    ?>