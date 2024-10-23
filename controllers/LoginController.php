<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;

class LoginController
{
  public static function login(Router $router)
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    }

    // Render a la vista
    $router->render('auth/login', [
      'titulo' => 'Iniciar Sesión'
    ]);
  }

  public static function logout()
  {
    echo "Desde logout";
  }

  public static function crear(Router $router)
  {
    $alertas = [];
    $usuario = new Usuario();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $usuario->sincronizar($_POST);
      // debuguear($usuario);
      $alertas = $usuario->validarNuevaCuenta();
      // debuguear($alertas);

      if (empty($alertas)) {
        $existeUsuario = Usuario::where('email', $usuario->email);
        if ($existeUsuario) {
          Usuario::setAlerta('error', 'El usuario ya esta registrado');
          $alertas = Usuario::getAlertas();
        } else {
          // Hashear el password
          $usuario->hashPassword();

          // Eliminar Password2
          unset($usuario->password2);

          // Generar un token único
          $usuario->crearToken();

          // debuguear($usuario);

          // Crear el usuario
          $resultado = $usuario->guardar();
          if($resultado) {
            header('Location: /mensaje');
          }
        };
        // debuguear($existeUsuario);
      }

    }

    // Render a la vista
    $router->render('auth/crear', [
      'titulo' => 'Crea tu Cuenta en UpTask',
      'usuario' => $usuario,
      'alertas' => $alertas
    ]);
  }

  public static function olvide(Router $router)
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    }

    // Render a la vista
    $router->render('auth/olvide', [
      'titulo' => 'Olvide mi Password'
    ]);
  }

  public static function reestablecer(Router $router)
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    }

    // Render a la vista
    $router->render('auth/reestablecer', [
      'titulo' => 'Reestablecer Password'
    ]);
  }

  public static function mensaje(Router $router)
  {
    // Render a la vista
    $router->render('auth/mensaje', [
      'titulo' => 'Cuenta Creada Exitosamente',
    ]);
  }

  public static function confirmar(Router $router)
  {
    // Render a la vista
    $router->render('auth/confirmar', [
      'titulo' => 'Confirma tu Cuenta UpTask',
    ]);
  }
}