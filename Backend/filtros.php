<?php
// Devuelve un JSON con el tipo de filtro indicado: ciudad o tipo
// Eduardo Koch Freundt
// 02/04/2018

// Leer fichero JSON
$data = file_get_contents("http://localhost:8082/EF/data-1.json");

// Inicialización de variables de captura de datos de formulario
$d_filtro="";

// Validación de parámetro ciudad
if (isset($_GET['filtro'])) {
  $d_filtro = $_GET['filtro'];
}

//decodificación de datos de JSON
$json_casas = json_decode($data, true);

if ($d_filtro == "ciudad") {
  $json_ciudades = getCiudad($json_casas);
  echo json_encode($json_ciudades);
}
if ($d_filtro == "tipo") {
  $json_tipos = getTipos($json_casas);
  echo json_encode($json_tipos);
}


exit();

// Funciones para la Obtención de valores únicos
//
// Filtrar por Ciudad
function getCiudad($json) {
  $ciudades = array();
  foreach($json as $row) {
      $Ciudad=$row['Ciudad'];
      $sw=false;
      for($i=0; $i < count($ciudades); $i++) {
        $tmp = $ciudades[$i];
        if ($tmp['Ciudad'] == $Ciudad) {
          $sw=true; break;
        }
      }
      if ($sw==false) {
        $ciudades[] = array('Ciudad'=> $Ciudad);
      }
  }
  return $ciudades;
}

// Filtrar por Tipos
function getTipos($json) {
  $tipos = array();
  foreach($json as $row) {
      $Tipo=$row['Tipo'];
      $sw=false;
      for($i=0; $i< count($tipos); $i++) {
        $tmp = $tipos[$i];
        if ($tmp['Tipo'] == $Tipo) {
          $sw=true; break;
        }
      }
      if ($sw==false) {
        $tipos[] = array('Tipo'=> $Tipo);
      }
  }
  return $tipos;
}

?>
