<?php 

header('content-type: application/json; charset=utf-8');

require '../config.php';
require 'funciones.php';
require 'consultas.php';
$respuesta=[];
if (!$conexion) {
	 $respuesta=[2,'error de conexion con el servidor'];
}else{
	
	$consulta=string_cleanner($_POST['consulta']);

			switch ($consulta) {
				case 'get_cotizacion':			
					$respuesta=[getCotizacion()];
					break;
				case 'get_cartilla':			
					$respuesta=[getCartilla()];
					break;

			
			}
}

echo json_encode($respuesta);
 ?>