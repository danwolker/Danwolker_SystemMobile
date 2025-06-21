<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$input = $_POST;
if (empty($input)) {
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
}

$userInput = trim($input['user'] ?? '');

if (empty($userInput) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Usuário (email ou nome de usuário) e senha obrigatórios']);
    exit;
}

$result = loginUser($pdo, $userInput, $password);
echo json_encode($result);

function loginUser($pdo, $userInput, $password) {
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
    $stmt->execute([$userInput, $userInput]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        return ['status' => 'success', 'message' => 'Login efetuado com sucesso'];
    } else {
        return ['status' => 'error', 'message' => 'Credenciais inválidas'];
    }
}
?>