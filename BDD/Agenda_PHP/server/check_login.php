<?php

// Codigo Eduardo Koch
require('conector.php');

// Conectar a la BDD
$con = new ConectorBD('localhost','root','');

$response['conexion'] = $con->initConexion('agenda_db');
if ($response['conexion']=='OK') {
  $resultado_consulta = $con->consultar(['usuarios'],
  ['email', 'psw', 'id'], 'WHERE email="'.$_POST['username'].'"');

  if ($resultado_consulta->num_rows != 0) {
    $fila = $resultado_consulta->fetch_assoc();
    if ($_POST['passw']==$fila['psw']) {
      $response['msg'] = 'OK';

      $_SESSION["username"]=$fila['email'];
      $_SESSION["id"]=$fila['id'];
    }else {
      $response['motivo'] = 'Contraseña incorrecta';
      $response['msg'] = 'rechazado';
    }
  }else{
    $response['motivo'] = 'Email incorrecto';
    $response['msg'] = 'rechazado';
  }
}

echo json_encode($response);

$con->cerrarConexion();

?>
