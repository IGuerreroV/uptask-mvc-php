<?php

function debuguear($vaiable) {
  echo "<pre>";
  var_dump($vaiable);
  echo "</pre>";
  exit;
}

// Escapa / Sanitiza el HTML
function s($html) : string {
  $s = htmlspecialchars($html);
  return $s;
}

// Función que revisa que el usuario este autenticado
function isAuth() : void {
  if(!isset($_SESSION['login'])) {
    header('Location: /');
  }
}