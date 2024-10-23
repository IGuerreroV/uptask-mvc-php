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
    $this->password2 = $args['password2'] ?? '';
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
    if(!$this->password) {
      self::$alertas['error'][] = 'El password no puede ir vacío';
    }
    if(strlen($this->password) < 6) {
      self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
    }
    if($this->password !== $this->password2) {
      self::$alertas['error'][] = 'Los passwords no coinciden';
    }

    return self::$alertas;
  }
}