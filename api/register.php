<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

include 'config.php';

$input = $_POST;
if(empty($input)) {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);
    if(is_array($json)) {
        $input = $json;
    }
}

$email = $input['email'] ?? '';
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

$email = trim($email);
$username = trim($username);
$password = trim($password);

if(empty($password) || empty($email) || empty($username)) {
    echo json_encode(['status' => 'error', 'message' => 'Email, nome de usuário e senha obrigatórios']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$result = registerUser($pdo, $email, $username, $hash);
echo json_encode($result);

function registerUser($pdo, $email, $username, $hash) {

    // Checa se email já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if($stmt->fetchColumn() > 0) {
        return ['status' => 'error', 'message' => 'Email já cadastrado'];
    }

    // Checa se nome de usuário já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if($stmt->fetchColumn() > 0) {
        return ['status' => 'error', 'message' => 'Nome de usuário já cadastrado'];
    }

    // Insere novo usuário
    $stmt = $pdo->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    if($stmt->execute([$email, $username, $hash])) {
        return ['status' => 'success', 'message' => 'Usuário cadastrado com sucesso'];
    } else {
        return ['status' => 'error', 'message' => 'Erro ao cadastrar usuário'];
    }
}
?>