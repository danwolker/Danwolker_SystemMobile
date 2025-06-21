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

// Lê dados via JSON
$input = $_POST;
if(empty($input)) {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
}

$email = trim($input['email'] ?? '');
$token = trim($input['token'] ?? '');
$newPassword = $input['newPassword'] ?? '';

if(empty($email) || empty($token) || empty($newPassword)) {
    echo json_encode(['status' => 'error', 'message' => 'Dados incompletos para redefinir a senha.']);
    exit;
}

try {
    $user = validateToken($pdo, $email, $token);
    $result = resetPassword($pdo, $email, $newPassword);
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao redefinir a senha: ' . $e->getMessage()]);
}

function validateToken($pdo, $email, $token) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND recovery_token = ?");
    $stmt->execute([$email, $token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if($user) {
        return $user;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Token inválido ou expirado.']);
        exit;
    }
}

function resetPassword($pdo, $email, $newPassword) {
    $hash = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE users SET password = ?, recovery_token = NULL, updated_at = CURRENT_TIMESTAMP WHERE email = ?");

    if($stmt->execute([$hash, $email])) {
        return ['status' => 'success', 'message' => 'Senha redefinida com sucesso.'];
    } else {
        return ['status' => 'error', 'message' => 'Erro ao redefinir a senha.'];
    }
}
?>