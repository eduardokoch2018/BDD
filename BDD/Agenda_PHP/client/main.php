<?php
  if (!isset($_SESSION["username"])) {
    header("Location: index.php");
    exit();
  }
?>
<!doctype html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda</title>
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/fullcalendar.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
    <div class="top-bar">
      <div class="top-bar-left">
        <h3>Agenda</h3>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>
            <?php
               echo "Bienvenido: ".$_SESSION["username"]."<br />";
            ?>
            <a href="../server/logout.php" id="logout">Cerrar Sesión</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="expanded-row main-container">
      <div class="left-cont">
        <div class="calendario"></div>
      </div>
      <div class="right-cont">
        <div class="add-btn">
          <h5>Nuevo Evento</h5>
          <form>
            <div class="row">
              <div class="small-12 columns">
                <label>Título del evento
                  <input type="text" id="titulo">
                </label>
              </div>
              <div class="small-8 columns">
                <label>Fecha inicio
                  <input type="text" id="start_date">
                </label>
              </div>
              <fieldset class="large-4 columns" id="dia-set">
                <input id="allDay" type="checkbox"><label for="allDay">Día entero</label>
              </fieldset>
              <div class="small-8 columns">
                <label>Fecha fin
                  <input type="text" id="end_date">
                </label>
              </div>
              <div class="small-6 columns">
                <label>Hora de inicio
                  <input type="text" class="timepicker" id="start_hour">
                </label>
              </div>
              <div class="small-6 columns">
                <label>Hora fin
                  <input type="text" class="timepicker" id="end_hour">
                </label>
              </div>
              <div class="small-12 columns btn-cont-enviar">
                <button type="submit" class="success button">Añadir</button>
              </div>
            </div>
          </form>
        </div>
        <div class="delete-btn">
          <h6>Arrastra aquí un evento que desees eliminar</h6>
          <img src="img/trash.png" alt="Eliminar">
        </div>
      </div>
    </div>


    <script src="js/vendor/jquery.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.min.js"></script>
    <script src="http://momentjs.com/downloads/moment.min.js"></script>
    <script src="js/vendor/fullcalendar.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
