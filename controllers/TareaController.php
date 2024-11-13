<?php

namespace Controllers;

use Model\Proyecto;
use Model\Tarea;

class TareaController
{
  public static function index()
  {
    $proyecto_id = $_GET['url'];

    if (!$proyecto_id) {
      header('Location: /dashboard');
    }
    
    $proyecto_id = Proyecto::where('url', $proyecto_id);
    session_start();
    if (!$proyecto_id || $proyecto_id->propietario_id !== $_SESSION['id']) {
      header('Location: /404');
    }

    $tareas = Tarea::belongsTo('proyecto_id', $proyecto_id->id);
    echo json_encode(['tareas' => $tareas]);
    // debuguear($_GET);
  }

  public static function crear()
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      session_start();
      $proyecto_id = $_POST['proyecto_id'];
      $proyecto = Proyecto::where('url', $proyecto_id);

      if (!$proyecto || $proyecto->propietario_id !== $_SESSION['id']) { // Si no existe el proyecto o no es del usuario
        $respuesta = [
          'tipo' => 'error',
          'mensaje' => 'Hubo un Error al Crear la Tarea'
        ];
        echo json_encode($respuesta);
        return;
      }

      // Todo bien, instanciar y crear la tarea
      $tarea = new Tarea($_POST);
      $tarea->proyecto_id = $proyecto->id;
      $resultado = $tarea->guardar();
      $respuesta = [
        'tipo' => 'exito',
        'id' => $resultado['id'],
        'mensaje' => 'Tarea creada correctamente',
        'proyecto_id' => $proyecto->id
      ];
      echo json_encode(value: $respuesta);
    }
  }

  public static function actualizar()
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    }
  }

  public static function eliminar()
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    }
  }
}