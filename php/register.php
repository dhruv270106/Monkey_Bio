<?php
// php/register.php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password']) || !isset($data['username'])) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$username = strtolower(preg_replace('/[^a-z0-9]/', '', $data['username']));

try {
    $pdo->beginTransaction();

    $userId = generate_uuid();
    $stmt = $pdo->prepare("INSERT INTO users (id, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $email, $password]);

    $profileId = generate_uuid();
    $stmt = $pdo->prepare("INSERT INTO profiles (id, user_id, username, display_name) VALUES (?, ?, ?, ?)");
    $stmt->execute([$profileId, $userId, $username, $data['username']]);

    $pdo->commit();
    echo json_encode(['message' => 'Registration successful', 'userId' => $userId]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    if ($e->getCode() == 23000) {
        echo json_encode(['error' => 'Email or Username already exists']);
    } else {
        echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
    }
}
?>
