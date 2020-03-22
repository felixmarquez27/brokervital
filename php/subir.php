<?php 
header('content-type: application/json; charset=utf-8');

require '../config.php';
require 'funciones.php';
require 'consultas.php';


if (!$conexion) {
	$respuesta = [
		'error'=> true
	];

}else {
		if (!empty($_POST["consulta"]) ) {
			$consulta=string_cleanner($_POST["consulta"]);
                switch ($consulta) {
                    case 'subir_datos':
                        $respuesta=subir_datos();
                        break;
                }
		}
			


}


echo json_encode($respuesta);

 ?>