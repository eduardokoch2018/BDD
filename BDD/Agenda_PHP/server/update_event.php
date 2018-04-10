<?php
require('conector.php');

if (isset($_SESSION['username'])) {
  $con = new ConectorBD('localhost', 'root', '');
  if ($con->initConexion('agenda_db')=='OK') {
    $data['fecha_inicio'] = "'".$_POST['start_date']."'";
    $data['fecha_finalizacion'] = "'".$_POST['end_date']."'";
    $data['hora_inicio'] = "'".$_POST['start_hour']."'";
    $data['hora_finalizacion'] = "'".$_POST['end_hour']."'";

    if ($con->actualizarRegistro('eventos', $data,'id='.$_POST['id'])) {
      $response['msg']= 'OK';
    }else {
      $response['msg']= 'No se pudo realizar la actualización de los datos';
    }
  }else {
    $response['msg']= 'No se pudo conectar a la base de datos';
  }
}else {
  $response['msg']= 'No se ha iniciado una sesión';
}

echo json_encode($response);



 ?>
