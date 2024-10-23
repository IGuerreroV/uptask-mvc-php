<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
  protected $email;
  protected $nombre;
  protected $token;

  public function __construct($email, $nombre, $token)
  {
    $this->email = $email;
    $this->nombre = $nombre;
    $this->token = $token;
  }

  public function enviarConfirmacion() {
    // Crear el objeto de email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = $_ENV['EMAIL_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['EMAIL_USER'];
    $mail->Password = $_ENV['EMAIL_PASS'];
    $mail->Port = $_ENV['EMAIL_PORT'];

    // Información del remitente
    $mail->setFrom('cuentas@uptask.com');
    $mail->addAddress('cuentas@uptask.com', 'uptask.com');
    $mail->Subject = 'Confirma tu cuenta en UpTask';

    // Setear el contenido del email
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    // Contenido del email
    $contenido = "<html>";
    $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en UpTask, solo tienes que confirmarla presionando el siguiente enlace</p>";
    $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar?token=" .$this->token . "'>Confirmar Cuenta</a></p>";
    $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
    $contenido .= "</html>";

    $mail->Body = $contenido;

    // Enviar el email
    $mail->send();
  }
}