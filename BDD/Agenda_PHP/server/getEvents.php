<?php
// Codigo Eduardo Koch
require('conector.php');
//$_POST['username']='eduardo.koch@next-u.com';
//$_POST['passw'] ='12345';
$con = new ConectorBD('localhost','root','');
$response['msg']='Incorrecto';
$response['conexion'] = $con->initConexion('agenda_db');
if ($response['conexion']=='OK') {
  if (isset($_SESSION['username'])) {
      $resultado_consulta = $con->consultar(['eventos'],
      ['id', 'titulo', 'fecha_inicio', 'hora_inicio','fecha_finalizacion','hora_finalizacion','dia_completo'], 'WHERE fk_usuario='.$_SESSION['id']);

      $i=0;

      while ($fila = $resultado_consulta->fetch_assoc()) {
         $response['eventos'][$i] = array('id'=>$fila['id'],'titulo'=>$fila['titulo'],'fecha_inicio'=>$fila['fecha_inicio'],'hora_inicio'=>$fila['hora_inicio'],
              'fecha_finalizacion'=>$fila['fecha_finalizacion'], 'hora_finalizacion'=>$fila['hora_finalizacion'],
              'dia_completo'=>$fila['dia_completo']);
         $i++;
      }
      //     session_start();
      $response['msg']='OK';
    } else {
      $response['msg']='No se Inició Sesión !!!';
    }
}
echo json_encode($response);
$con->cerrarConexion();
?>
