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

    // Render a la vista
    $router->render('dashboard/index', [
      'titulo' => 'Proyectos'
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

      if(empty($alertas)) {
        // Guardar el proyecto

        debuguear($proyecto);
      }

      // debuguear($proyecto);
    }

    // Render a la vista
    $router->render('dashboard/crear-proyecto', [
      'alertas' => $alertas,
      'titulo' => 'Crear Proyecto'
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