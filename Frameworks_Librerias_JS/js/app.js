// Match Game 1.0
// Eduardo Koch Freundt
// Next-U, 2018
// Ult. Actualización: 16/03/2017
// - Creación Juego

function matchGame() {
  var movim=0;
  var puntuacion=0;
  var tmMatch;
  var aGame = new Array();

  function efectoMatchElemento(elemento) {
    $(elemento).fadeIn(250).delay(125).fadeOut(250)
    $(elemento).fadeIn(200).delay(125).fadeOut(250)
    //$(elemento).fadeIn(200).delay(125).fadeOut(250)
    $(elemento).fadeIn(200).delay(125).fadeOut(250).fadeIn(200)
  }

  // Evalua las coincidencias Horizontal y Vertical de los Movimientos
  // pos tipo de dulce
  function evalMatriz(nDulce) {
    var aTempF = jQuery.extend(true, {}, aGame);
    var aTempC = jQuery.extend(true, {}, aGame);

    // Evaluar Filas
    for(i=0; i < 7; i++) {
        conta=0;
        for(j=0; j < 7; j++) {
          if (aTempF[j][i]==nDulce) {conta+=1;}
          else {
            if (conta > 0 && conta < 3) {
              for(k=0; k <= conta; k++) {
                aTempF[(j-k)][i]=0;
              }
            } else { aTempF[j][i]=0; }
            conta=0;
          }
        }
        if (conta > 0 && conta < 3) {
          for(k=0; k <= conta; k++) {
            aTempF[(j-k-1)][i]=0;
          }
        }
     }

     // Evaluar Columnas
     for(i=0; i < 7; i++) {
        conta=0;
        for(j=0; j < 7; j++)
        {
          if (aTempC[i][j]==nDulce) {conta += 1;}
          else {
             if (conta > 0 && conta < 3) {
               for(k=0; k <= conta; k++) {
                 aTempC[i][(j-k)]=0;
               }
             } else {aTempC[i][j]=0; }
             conta=0;
          }
        }
        if (conta > 0 && conta < 3) {
          for(k=0; k <= conta; k++) {
            aTempC[i][(j-k-1)]=0;
          }
        }
      }

      // Combinar Filas y Columnas
      var aTempR = jQuery.extend(true, {}, aTempF);
      for(i=0; i < 7; i++) {
         for(j=0; j < 7; j++) {
            if (aTempC[j][i] != 0) {
              aTempR[j][i] = aTempC[j][i];
            }
         }
      }
      return aTempR;
  }

  // Marcar Vertical y Horizontalmente los dulces > a 3 en raya
  function marcarDulces() {
    for(m=1; m <= 4; m++) {
      var tmpMat = jQuery.extend(true, {}, evalMatriz(m));
      for(i=0; i<7; i++) {
         for(j=0; j<7; j++) {
           if (tmpMat[j][i] != 0) {
             // Pintar el nuevo score (5 puntos por elemento)
             var score = $("#score-text").text()
             puntuacion = parseInt(score) + 5;
              $("#score-text").html(puntuacion)
             // Selección del dulce para darle el efecto de marcado
             var c2 = $(".col-"+(j+1)+" li")[i];
             efectoMatchElemento(c2);
             // Proceder a eliminar los dulces marcados
             var p2 = $(".col-"+(j+1)+" ul")[0]
             var num = Math.floor((Math.random()*4)+1);
             eliminarElemento(c2, p2, num)
           }
         }
      }
    }
  }

  // Actualizar la Matriz de Dulces con los nuevos cambios de posición e Info
  function updateInfo() {
    // Actualizar los nuevos datos
    for(i=0; i<7; i++) {
       for(j=0; j<7; j++) {
         c2 = $(".col-"+(i+1)+" li")[j].getAttribute( "data" )
         aGame[i][j]= parseInt(c2);
       }
    }

  }



  // Elimina los elementos de la fila coincidente y agrega a la primera Fila
  // los nuevos elementos generados aleatoriamente
  function eliminarElemento(elemRem, elemAdd, numElem) {
    $( elemRem ).hide( "slow", function() {
      this.remove();
      $(elemAdd).prepend("<li data='"+numElem+"'><img src='image/"+numElem+".png' class='elemento fig' /></li>")
    });
  }

  // Efecto color difuminado del Titulo
  function hilight(elementid){
      var hlight = "#fe1414";
      var aspeed = 1000;
      var orig = "#ffffff";
      elementid.stop().css("color", hlight).animate({color: orig}, aspeed);
  }

  // Repetición de efecto del título cada 2 segundos
  setInterval(function(){
    hilight($('.main-titulo'))
  },2000)



  // Definición de los eventos
  function initEventos() {
      // Evento para la figura, al arrastrar y soltar
      $(".lista").sortable({
        placeholder: "nuevo",
        start: function (event, ui) {       // Inicio de Arrastre del Objeto
          var currPos1 = ui.item.index();
        },
        change:  function (event, ui) {    // Al Soltar el elemento el el contenedor
          var currPos2 = ui.item.index();
          //alert("Posicion: "+ currPos2);
          movim += 1;
          $("#movimientos-text").html(movim);
        },
        update: function(event, ui) {    // Al terminar el drag and drop del objeto
          updateInfo();
          //evalClicFila(ui.item.index());
        }
      })

  }

  // Inicializa y pone las Figuras de Dulce en el área de Juego
  function initDulces() {
    var num, i,j;
    // Quitar Contenido de las Columnas
    for (i=1; i<8;i++) {
      $(".col-"+i).empty();
    }
    // Poner Contenido de las Columnas
    var sCol;
    aGame = [];
    for (i=1; i<8;i++) {
      sCol = "<ul class='lista'>";
      aTmp = [];
      for (j=1; j<8;j++) {
        num = Math.floor((Math.random()*4)+1);
        aTmp.push(num);
        //$(".col-"+i).append("<li><img src='image/"+num+".png' class='elemento fig' /></li>");
        sCol+="<li data='"+num+"'><img src='image/"+num+".png' class='elemento fig' /></li>";
      }
      aGame.push(aTmp);
      sCol += "</ul>";
      $(".col-"+i).append(sCol);
    }
  }

  // Inicializa el cronómetro a 2 minutos
  function initTime() {
    $('#timer').timer({
      countdown: true,
      duration: '2m',
      callback: function() {	// Al Concluir el tiempo programado
        // Presentación de Resultados
        // detener la búsqueda en el tablero
        stopMatch();
        //
        $(".panel-tablero").hide(500);
        $(".panel-score").css("width","90%").fadeIn(250);
        $(".end-game").css("visibility","visible");
        $(".time").hide();
      }
    });
    $("#timer").timer('pause'); // Poner en Pausa al Inicio del Juego
  }

  // Inicializar el Juego
  function inicializarJuego() {
    initDulces(); // Poner las Figuras
    initTime(); // Inicializar el cronómetro

    // Crear Evento para botón de Inicio / Reinicio del Juego
    $(".btn-reinicio").click(function(){
      $(".panel-score").css("width","25%").fadeIn(250);
      $(".end-game").css("visibility", "hidden");
      $(".panel-tablero").show(500);
      $(".time").show();
      initDulces();
      initEventos();
      // Inicializar score y movimientos
      $("#movimientos-text").html("0");
      $("#score-text").html("0");
      // Resetear el reloj
      $("#timer").timer('reset');
      // cambiar a Reiniciar el botón de incio
      $(".btn-reinicio").html('Reiniciar');
      // Iniciar el intervalo de tiempo de verificación de cambios en el tablero
      tmMatch = setInterval(startMatch, 4000);
    })
   }

   function startMatch() {
     updateInfo()
     marcarDulces()
     tmMatch = setInterval(initMarch, 4000);
   }

   function stopMatch() {
     clearInterval(tmMatch);
   }

  return {initGame:inicializarJuego};
}

$(document).ready(function(){
  var mg = matchGame();
  mg.initGame();
});
// Iniciar Juego
