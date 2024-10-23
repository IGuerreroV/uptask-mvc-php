<?php

namespace Model;

class Usuario extends ActiveRecord
{
  protected static $tabla = 'usuarios';
  protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];

  public function __construct($args = [])
  {
    $this->id = $args['id'] ?? null;
    $this->nombre = $args['nombre'] ?? '';
    $this->email = $args['email'] ?? '';
    $this->password = $args['password'] ?? '';
    $this->token = $args['token'] ?? '';
    $this->confirmado = $args['confirmado'] ?? '';
  }

  // Validacion para cuentas nuevas
  public function validarNuevaCuenta() {
    if(!$this->nombre) {
      self::$alertas['error'][] = 'El nombre del Usuario es obligatorio';
    }

    if(!$this->email) {
      self::$alertas['error'][] = 'El email es obligatorio';
    }

    return self::$alertas;
  }
}