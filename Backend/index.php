<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
  <link type="text/css" rel="stylesheet" href="css/customColors.css"  media="screen,projection"/>
  <link type="text/css" rel="stylesheet" href="css/ion.rangeSlider.css"  media="screen,projection"/>
  <link type="text/css" rel="stylesheet" href="css/ion.rangeSlider.skinFlat.css"  media="screen,projection"/>
  <link type="text/css" rel="stylesheet" href="css/index.css"  media="screen,projection"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Formulario</title>
</head>

<body>
  <!--
  <video src="img/video.mp4" id="vidFondo"></video>
  -->
  <div class="contenedor">
    <div class="card rowTitulo">
      <h1>Buscador</h1>
    </div>
    <div class="colFiltros">
      <form action="javascript:;" id="formulario">
        <div class="filtrosContenido">
          <div class="tituloFiltros">
            <h5>Realiza una búsqueda personalizada</h5>
          </div>
          <div class="filtroCiudad input-field">
            <label>Ciudad:</label><br />
            <select name="ciudad" id="selectCiudad">
              <option value="" disabled selected>Elige una Ciudad</option>
            </select>
          </div>
          <div class="filtroTipo input-field">
            <label for="selecTipo">Tipo:</label><br>
            <select name="tipo" id="selectTipo">
              <option value="" disabled selected>Elige un tipo</option>
            </select>
          </div>
          <div class="filtroPrecio">
            <label for="rangoPrecio">Precio:</label>
            <input type="text" id="rangoPrecio" name="precio" value="" />
          </div>
          <div class="botonField">
            <input type="submit" class="btn white" value="Buscar" id="submitButton">
          </div>
        </div>
      </form>
    </div>

    <div class="colContenido">
      <div class="tituloContenido card">
        <h5>Resultados de la búsqueda:</h5>
        <div class="divider"></div>
        <button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button>
      </div>
      <div id="resultados">

      </div>


  </div>
</div>

  <script type="text/javascript" src="js/jquery-3.0.0.js"></script>
  <script type="text/javascript" src="js/ion.rangeSlider.min.js"></script>
  <script type="text/javascript" src="js/materialize.min.js"></script>
  <script type="text/javascript" src="js/index.js"></script>
  <script type="text/javascript">

      fillFiltro('ciudad');
      fillFiltro('tipo');
      $('select').material_select();

      $('#mostrarTodos').click(function(event){
        mostrarDatos(event,'todos');
      });

      $('#formulario').submit(function(event) {
        mostrarDatos(event,'filtro');
      });

      function mostrarDatos(event, accion) {
        event.preventDefault();
        //alert(event.target.nodeName);
        var ciudad = $("[name='ciudad']").val();
        var tipo =  $("[name='tipo']").val();
        var precio =  $("[name='precio']").val();
        if (ciudad == null) ciudad = "";
        if (tipo == null) tipo = "";
        if (precio == null) precio="";
        //

        if (accion == "todos") {
          ciudad = ""; tipo = ""; precio = "0;0";
        }

        var getdetails = function() {
          return $.getJSON( "buscar.php", {"ciudad":ciudad, "tipo":tipo, "precio":precio});
        }

        getdetails()
          .done( function( data ) {
           var sTemp='';
           for(x=0; x < data.length; x++) {
             sTemp += '<div class="col s12 m12 l12">';
             sTemp += '  <div class="card horizontal">';
             sTemp += '     <div class="card-image">';
             sTemp += '        <img src="img/home.jpg">';
             sTemp += '     </div>';
             sTemp += '     <div class="card-stacked">';
             sTemp += '        <div class="card-content">';
             sTemp += '          <p>Dirección: '+data[x].Direccion+'</p>';
             sTemp += '          <p>Ciudad: '+data[x].Ciudad+'</p>';
             sTemp += '          <p>Teléfono: '+data[x].Telefono+'</p>';
             sTemp += '          <p>Código Postal: '+data[x].Codigo_Postal+'</p>';
             sTemp += '          <p>Tipo: '+data[x].Tipo+'</p>';
             sTemp += '          <p>Precio: '+data[x].Precio+'</p>';
             sTemp += '     </div>';
             sTemp += '     <div class="card-action">';
             sTemp += '       <a href="index.php?id='+data[x].Id+'" class="btn-flat waves-effect">VER MAS</a>';
             sTemp += '     </div>';
             sTemp += '   </div>';
             sTemp += ' </div>';
             sTemp += '</div>';
           }
           $('#resultados').html(sTemp);
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           alert(textStatus);
       });

      }


      // Llenar los Filtros de búsqueda
      function fillFiltro(tipoFiltro) {
        var getFiltros = function(filtro) {
          return $.getJSON( "filtros.php", { "filtro" : filtro});
        }

        getFiltros(tipoFiltro)
          .done( function( data ) {
           //
           sTemp='<option value="" disabled selected>Elige '+tipoFiltro+'</option>';
           var ciudad=new Array();
           for(x=0; x < data.length; x++) {
             if (tipoFiltro=='ciudad')  m = data[x].Ciudad; else m = data[x].Tipo;
             sTemp += sTemp='<option value="'+m+'" >'+m+'</option>';
           }
           if (tipoFiltro=='ciudad') {
             $('#selectCiudad').html(sTemp);
           }
           if (tipoFiltro=='tipo') {
             $('#selectTipo').html(sTemp);
           }
           $('select').material_select();
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           alert(textStatus);
       });
      }



  </script>
</body>
</html>
