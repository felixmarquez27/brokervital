
<?php 
use PHPMailer\PHPMailer\PHPMailer;
	require '../vendor/autoload.php';
function consulta_bd_simple($campo,$tabla,$condicion,$parametro){
    global $conexion;
    $statement = $conexion->prepare("SELECT {$campo} FROM {$tabla} WHERE {$condicion}='$parametro'");
    $statement->execute();
    $resultado = $statement->fetch()[$campo];
    return $resultado;
}

function comprobar_correo_repetido($dato,$tabla,$campo){
	$repetido=0;
	global $conexion;
	$statement = $conexion->prepare("SELECT {$campo} FROM {$tabla}");
	$statement->execute();
	$resultado=$statement->fetchAll();
		foreach ($resultado as $key => $value) {
			if ($value[0]==$dato) {$repetido++;}
		}

		if ($repetido>0) {$respuesta=[1,"Ya existe una cuenta registrada con este correo"];
		}else{$respuesta=[0,"No hay registros repetidos en la base de datos"];}


		return $respuesta;
		

	}

	function comprobar_vacio($array){
		$vacio=0;
		foreach ($array as $key => $value) {
			if (empty($value)) {
				$vacio++;
			}
		}
		
		if($vacio>0){
			$resultado=[1,"Hay al menos 1 campo vacio"];
		}else{$resultado=[0,"No hay campos vacios"];}
	
		return $resultado;
	}
	
	function comprobar_correo($mail){
		$mail=email_cleanner($mail);
		if ($mail=='') {
			$respuesta=[1,'Por favor escribe un correo válido'];
		}else{
			$respuesta=[0,' formato correo correcto'];
		}
return $respuesta;
	}

	
	
function phpmailer_html_format($correo_remitente,$pass_remitente,$nombre_remitente,$correo_receptor,$nombre_receptor,$correo_respuesta,$nombre_respuesta,$asunto,$body,$mensaje_error,$mensaje_ok){
	$respuesta=[];
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com.ar';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = $correo_remitente;
    $mail->Password = $pass_remitente;
    $mail->setFrom($correo_remitente, $nombre_remitente);
    $mail->addAddress($correo_receptor, $nombre_receptor);
    //$mail-> AddEmbeddedImage('https://sazonurbano.com/img/banner-correos.png','cabecera', 'attachment', 'base64', 'image/jpg');

    if ($mail->addReplyTo($correo_respuesta, $nombre_respuesta)) { 
        $mail->Subject = $asunto;
        $mail->isHTML(true);
        $mail->Body = $body;
        if (!$mail->send()) {
        	$respuesta=[1,$mensaje_error];
        } else {
        	$respuesta=[0,$mensaje_ok];
        
        }
    } else {
        $respuesta = [1,'Invalid email address, message ignored'];
    }

return $respuesta;
}



function generar_correo($nombre,$correo,$mensaje){
		$respuesta='<html>
     <head>
        <STYLE TYPE="text/css">
        .contenedor{
            margin:auto;
            width:95%;
        }
            h1{
                color:black;
                text-align:center;
                font-size:2.5em;
            }
           

        p{
                display:block;
                text-align:left;
                color:black;
        }
        
        </STYLE>
        </head>
        <body><div style=width:95%;>
        <h1>Nuevo mensaje</h1>
        <p>Nombre: '.$nombre.'</p>
        <p>Correo: '.$correo.'</p>
        <p>Mensaje: '.$mensaje.'</p>
        </div></body>
        </html>';

        return $respuesta;
	}






//------------------------------------LIMPIEZA------------------------------
function string_cleanner($cadena){
	$cadena=trim($cadena);
	$cadena=filter_var($cadena,FILTER_SANITIZE_STRING);
	$cadena=stripcslashes($cadena);
	$cadena=htmlspecialchars($cadena);
	$cadena=strtolower($cadena);	
	return $cadena;

}

function number_cleanner($numero){
	if (!empty($numero) && is_numeric($numero)) {
		$numero=filter_var($numero,FILTER_SANITIZE_NUMBER_INT);
		$numero=(int)$numero;
		$numero =trim($numero);
		$numero = str_replace(' ', '', $numero);
		return $numero;
	}else{return '';}
	

}
function email_cleanner($mail){
	if ($mail!="") {
		$mail=trim($mail);
		$mail = str_replace(' ', '', $mail);
		$mail=filter_var($mail,FILTER_SANITIZE_EMAIL);
		$mail=filter_var($mail,FILTER_VALIDATE_EMAIL);
		$mail=strtolower($mail); 
	}else{$mail='';}


	return $mail;
}

?>