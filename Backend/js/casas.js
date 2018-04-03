
// Comprobar si se terminó carga de documento
$( document ).ready(function() {
  /*
    Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
  */
  $.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
  };
  /*
    Función que inicializa el elemento Slider
  */

  function inicializarSlider(){
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 200,
      to: 80000,
      prefix: "$"
    });
  }

  /*
    Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
  */
  /*function playVideoOnScroll(){
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
      .scroll((event)=>{
        var scrollActual = $(window).scrollTop();
        if (scrollActual > ultimoScroll){
         video.play();
       } else {
          //this.rewind(1.0, video, intervalRewind);
          video.play();
       }
       ultimoScroll = scrollActual;
      })
      .scrollEnd(()=>{
        video.pause();
      }, 10)
  }*/


  // Función General para pintar los datos de la búsqueda
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
    // Si la accion es Todos, pone en blanco los criterios de búsqueda
    if (accion == "todos") {
      ciudad = ""; tipo = ""; precio = "0;0";
    }

    // función ajax para conectar con PHP y retornar los valores en formato JSON
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
    // Conexion AJAX para obtener los datos desde PHP
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

  //
  inicializarSlider();
  /*playVideoOnScroll();*/

  // Llenar Filtros
  // Ciudad
  fillFiltro('ciudad');
  // Tipo
  fillFiltro('tipo');
  // Activar dropdowns
  $('select').material_select();
  // Evento Clic botón Mostrar Todos
  $('#mostrarTodos').click(function(event){
    mostrarDatos(event,'todos');
  });
  // Evento Submit de Buscar x Criterio
  $('#formulario').submit(function(event) {
    mostrarDatos(event,'filtro');
  });

});
