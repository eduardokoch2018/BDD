<?php @session_start();
?>
<!doctype html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!--<meta http-equiv="pragma" content="no-cache" />-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/agenda.css">
  </head>
  <body>
    <div class="main">
      <div class="login-container">
        <div class="callout primary login">
          <h4>Inicia sesión</h4>
          <form>
            <div class="row align-center">
              <div class="small-7 columns">
                <label>Usuario
                  <input type="text" id="user" value="eduardo.koch@next-u.com" required>
                </label>
              </div>
              <div class="small-7 columns">
                <label>Contraseña
                  <input type="password" id="password" required>
                </label>
              </div>
              <div class="small-7 columns btn-container">
                <button type="submit" class="button">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.min.js"></script>
    <script src="js/agenda.js"></script>
  </body>
</html>
