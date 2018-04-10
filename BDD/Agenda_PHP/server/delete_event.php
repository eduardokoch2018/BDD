<?php

require('conector.php');

if (isset($_SESSION['username'])) {
  $con = new ConectorBD('localhost', 'root', '');
  if ($con->initConexion('agenda_db')=='OK') {
    if ($con->eliminarRegistro('eventos', 'id='.$_POST['id'])) {
      $response['msg']= 'OK';
    }else {
      $response['msg']= 'No se pudo realizar la eliminación de los datos';
    }
  }else {
    $response['msg']= 'No se pudo conectar a la base de datos';
  }
}else {
  $response['msg']= 'No se ha iniciado una sesión';
}

echo json_encode($response);


 ?>
