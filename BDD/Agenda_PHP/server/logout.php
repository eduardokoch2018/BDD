<?php
if (isset($_SESSION['username'])) {
  session_destroy();
}
header('Location: ../client/index.php');
die();
?>
