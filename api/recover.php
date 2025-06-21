<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = $_POST;
if(empty($input)) {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
}

$email = trim($input['email'] ?? '');

if(empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Email obrigatório para recuperação']);
    exit;
}

$result = recoverPassword($pdo, $email);
echo json_encode($result);

function recoverPassword($pdo, $email) {
    // Verifica se o email existe
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$user) {
        return ['status' => 'error', 'message' => 'Email não encontrado'];
    }

    $token = bin2hex(random_bytes(16));
    $stmt = $pdo->prepare("UPDATE users SET recovery_token = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?");
    $stmt->execute([$token, $email]);

    $reset_link = "https://gold-raccoon-197919.hostingersite.com/reset-password?token=$token&email=" . urlencode($email);

    $mail = new PHPMailer(true);
    try {

        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['MAIL_PORT'];
        $mail->setFrom($_ENV['MAIL_FROM'], $_ENV['MAIL_FROM_NAME']);
        $mail->addAddress($email, $user['username']);
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Recuperação de Senha';
        $mail->Body = "Olá, <br> Para recuperar sua senha, clique no link abaixo: <br> <a href='$reset_link'>Recuperar Senha</a> <br> Se você não solicitou essa recuperação, ignore este e-mail.";
        $mail->send();
        $mail->clearAddresses();

        return ['status' => 'success', 'message' => 'Instruções de recuperação enviadas para o email'];

    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Erro ao enviar e-mail: ' . $mail->ErrorInfo];
    }

    return ['status' => 'success', 'message' => 'Instruções de recuperação enviadas para o email'];
}