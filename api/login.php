<?php
// php/login.php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch();

if ($user && password_verify($data['password'], $user['password'])) {
    // In a real app, you would generate a JWT token here
    echo json_encode([
        'message' => 'Login successful',
        'userId' => $user['id'],
        'token' => 'dummy-php-token-' . bin2hex(random_bytes(16))
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
