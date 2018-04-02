<?php
// Busqueda de Casas por Criterio: Ciudad, Tipo de casa, Rango de Precios
// Eduardo Koch Freundt
// 02/04/2018

// Leer fichero JSON
$data = file_get_contents("http://localhost:8082/EF/data-1.json");

// Inicialización de variables de captura de datos de formulario
$d_ciudad="";
$d_tipo="";
$d_precio="";
$valorMin = "";
$valorMax = "";

// Validación de parámetro ciudad
if (isset($_GET['ciudad'])) {
  $d_ciudad = $_GET['ciudad'];
}
// Validación de parámetro tipo de docimicilio
if (isset($_GET['tipo'])) {
  $d_tipo = $_GET['tipo'];
}

// Validación de parámetro rango de precios
if (isset($_GET['precio'])) {
  $d_precio = $_GET['precio'];
  list($valorMin, $valorMax) = explode(';', $d_precio);
  if ($valorMin=="0" && $valorMax=="0") $d_precio="";
}

//decodificación de datos de JSON
$json_casas = json_decode($data, true);

// Validación de Filtros a aplicar
// x Ciudad
if ($d_ciudad != "") {
  $json_casas = filtarCiudad($json_casas, $d_ciudad);
}
// x Tipo
if ($d_tipo != "") {
  $json_casas = filtarTipo($json_casas, $d_tipo);
}
// x Rango de Precios
if ($d_precio != "") {
  $json_casas = filtarPrecio($json_casas, $valorMin, $valorMax);
}

// Retornar datos localizados
echo json_encode($json_casas);
exit();


// Filtrar por Ciudad
function filtarCiudad($json, $ciudad) {
  $casas = array();
  foreach($json as $row) {
      $Id = $row['Id'];
      $Direccion=$row['Direccion'];
      $Ciudad=$row['Ciudad'];
      $Telefono=$row['Telefono'];
      $Codigo_Postal=$row['Codigo_Postal'];
      $Tipo=$row['Tipo'];
      $Precio=$row['Precio'];
      if ($Ciudad == $ciudad) {
        $casas[] = array('Id'=> $Id, 'Direccion'=> $Direccion, 'Ciudad'=> $Ciudad, 'Telefono'=> $Telefono,
                   'Codigo_Postal'=> $Codigo_Postal, 'Tipo'=> $Tipo, 'Precio'=> $Precio);
      }
  }
  return $casas;
}

// Filtrar por Tipo de Vivienda
function filtarTipo($json, $tipo) {
  $casas = array();
  foreach($json as $row) {
      $Id = $row['Id'];
      $Direccion=$row['Direccion'];
      $Ciudad=$row['Ciudad'];
      $Telefono=$row['Telefono'];
      $Codigo_Postal=$row['Codigo_Postal'];
      $Tipo=$row['Tipo'];
      $Precio=$row['Precio'];
      if ($Tipo == $tipo) {
        $casas[] = array('Id'=> $Id, 'Direccion'=> $Direccion, 'Ciudad'=> $Ciudad, 'Telefono'=> $Telefono,
                   'Codigo_Postal'=> $Codigo_Postal, 'Tipo'=> $Tipo, 'Precio'=> $Precio);
      }
  }
  return $casas;
}

// Filtrar por Precio
function filtarPrecio($json, $precioMin, $precioMax) {
  $casas = array();
  foreach($json as $row) {
      $Id = $row['Id'];
      $Direccion=$row['Direccion'];
      $Ciudad=$row['Ciudad'];
      $Telefono=$row['Telefono'];
      $Codigo_Postal=$row['Codigo_Postal'];
      $Tipo=$row['Tipo'];
      $Precio=$row['Precio'];
      if (intval(quitarFormato($Precio)) >= intval($precioMin) && intval(quitarFormato($Precio)) <= intval($precioMax)) {
        $casas[] = array('Id'=> $Id, 'Direccion'=> $Direccion, 'Ciudad'=> $Ciudad, 'Telefono'=> $Telefono,
                   'Codigo_Postal'=> $Codigo_Postal, 'Tipo'=> $Tipo, 'Precio'=> $Precio);
      }
  }
  return $casas;
}

function quitarFormato($valor){
  return str_replace(array("$", ","), "", $valor);
}


?>
