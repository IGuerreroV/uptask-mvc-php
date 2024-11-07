<?php

namespace Controllers;

use Model\ActiveRecord;

class TareaController
{
  public static function index()
  {

  }

  public static function crear()
  {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {

      $respuesta = [ // Arrelgo asociativo
        'proyecto_id' => $_POST['proyecto_id']
      ];

      echo json_encode($respuesta);
    }
  }

  public static function actualizar()
  {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
      
    }
  }

  public static function eliminar()
  {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
      
    }
  }
}