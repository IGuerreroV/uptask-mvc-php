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
    $this->password_actual = $args['password_actual'] ?? ''; // Para cambiar el password
    $this->password_nuevo = $args['password_nuevo'] ?? '';
    $this->token = $args['token'] ?? '';
    $this->confirmado = $args['confirmado'] ?? 0;
  }

  // Validar el Login de Usuarios
  public function validarLogin()
  {
    if (!$this->email) {
      self::$alertas['error'][] = 'El email es obligatorio';
    }
    if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
      self::$alertas['error'][] = 'Email no válido';
    }
    if (!$this->password) {
      self::$alertas['error'][] = 'El password es obligatorio';
    }
    return self::$alertas;
  }

  // Validacion para cuentas nuevas
  public function validarNuevaCuenta()
  {
    if (!$this->nombre) {
      self::$alertas['error'][] = 'El nombre del Usuario es obligatorio';
    }
    if (!$this->email) {
      self::$alertas['error'][] = 'El email es obligatorio';
    }
    if (!$this->password) {
      self::$alertas['error'][] = 'El password no puede ir vacío';
    }
    if (strlen($this->password) < 6) {
      self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
    }
    if ($this->password !== $this->password2) {
      self::$alertas['error'][] = 'Los passwords no coinciden';
    }
    return self::$alertas;
  }

  // Valida un email
  public function ValidarEmail()
  {
    if (!$this->email) {
      self::$alertas['error'][] = 'El email es obligatorio';
    }
    if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
      self::$alertas['error'][] = 'Email no válido';
    }
    return self::$alertas;
  }

  // Valida el password
  public function validarPassword()
  {
    if (!$this->password) {
      self::$alertas['error'][] = 'El password no puede ir vacío';
    }
    if (strlen($this->password) < 6) {
      self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
    }
    return self::$alertas;
  }

  public function validar_perfil()
  {
    if (!$this->nombre) {
      self::$alertas['error'][] = 'El Nombre es obligatorio';
    }
    if (!$this->email) {
      self::$alertas['error'][] = 'El Email es obligatorio';
    }
    return self::$alertas;
  }

  public function nuevo_password()
  {
    if (!$this->password_actual) {
      self::$alertas['error'][] = 'El Password actual es obligatorio';
    }
    if (!$this->password_nuevo) {
      self::$alertas['error'][] = 'El Password Nuevo es obligatorio';
    }
    if (strlen($this->password_nuevo) < 6) {
      self::$alertas['error'][] = 'El Password Nuevo debe tener al menos 6 caracteres';
    }
    return self::$alertas;
  }

  // Hashear el password
  public function hashPassword()
  {
    $this->password = password_hash($this->password, PASSWORD_BCRYPT);
  }

  // Generar un token único
  public function crearToken()
  {
    $this->token = uniqid();
  }
}