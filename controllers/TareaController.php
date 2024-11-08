<?php

namespace Controllers;

use Model\ActiveRecord;
use Model\Proyecto;

class TareaController
{
  public static function index()
  {

  }

  public static function crear()
  {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {

      session_start();
      $proyecto_id = $_POST['proyecto_id'];
      $proyecto = Proyecto::where('url', $proyecto_id);

      if (!$proyecto || $proyecto->propietario_id !== $_SESSION['id']) { // Si no existe el proyecto o no es del usuario
        $respuesta = [
          'tipo' => 'error',
          'mensaje' => 'Hubo un Error al Crear la Tarea'
        ];
        echo json_encode( $respuesta );
      } else {
        $respuesta = [
          'tipo' => 'exito',
          'mensaje' => 'Tarea Creada Correctamente'
        ];
        echo json_encode( $respuesta );
      }
      // echo json_encode($proyecto);
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