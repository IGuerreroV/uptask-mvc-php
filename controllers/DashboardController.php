<?php

namespace Controllers;

use Model\Proyecto;
use MVC\Router;

class DashboardController
{
  public static function index(Router $router)
  {
    session_start();
    isAuth();

    $id = $_SESSION['id'];

    $proyectos = Proyecto::belongsTo('propietario_id', $id);

    // debuguear($proyectos);

    // Render a la vista
    $router->render('dashboard/index', [
      'titulo' => 'Proyectos',
      'proyectos' => $proyectos
    ]);
  }

  public static function crear_proyecto(Router $router)
  {
    session_start();
    isAuth();

    $alertas = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $proyecto = new Proyecto($_POST);

      // Validación
      $alertas = $proyecto->validarProyecto();

      if (empty($alertas)) {
        // Generar una URL único
        $hash = bin2hex(random_bytes(16));
        $proyecto->url = $hash;

        // Almacenar el creador del proyecto
        $proyecto->propietario_id = $_SESSION['id']; // Almacena el ID del usuario

        // Guardar el proyecto
        $proyecto->guardar();

        // Redireccionar
        header('Location: /proyecto?url=' . $proyecto->url);

        // debuguear($proyecto);
      }

      // debuguear($proyecto);
    }

    // Render a la vista
    $router->render('dashboard/crear-proyecto', [
      'alertas' => $alertas,
      'titulo' => 'Crear Proyecto'
    ]);
  }

  public static function proyecto(Router $router)
  {
    session_start();
    isAuth(); // Proteger ruta

    $token = $_GET['url'];
    if (!$token) {
      header('Location: /dashboard');
    }

    // Revisar que la persona que visita el proyecto, es quien lo creo
    $proyecto = Proyecto::where('url', $token);
    if ($proyecto->propietario_id !== $_SESSION['id']) {
      header('Location: /dashboard');
    }

    // debuguear($_SESSION);

    // Render a la vista
    $router->render('dashboard/proyecto', [
      'titulo' => $proyecto->proyecto
    ]);
  }

  public static function perfil(Router $router)
  {
    session_start();

    // Render a la vista
    $router->render('dashboard/perfil', [
      'titulo' => 'Perfil'
    ]);
  }
}