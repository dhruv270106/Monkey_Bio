<?php
// php/profile.php?username=alex
require_once 'db.php';

$username = $_GET['username'] ?? '';

if (empty($username)) {
    echo json_encode(['error' => 'Username required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM profiles WHERE username = ?");
$stmt->execute([$username]);
$profile = $stmt->fetch();

if (!$profile) {
    http_response_code(404);
    echo json_encode(['error' => 'Profile not found']);
    exit;
}

// Increment views
$update = $pdo->prepare("UPDATE profiles SET views = views + 1 WHERE id = ?");
$update->execute([$profile['id']]);

// Fetch Links
$stmt = $pdo->prepare("SELECT id, title, url FROM links WHERE profile_id = ? AND is_active = 1 ORDER BY sort_order ASC");
$stmt->execute([$profile['id']]);
$links = $stmt->fetchAll();

echo json_encode([
    'username' => $profile['username'],
    'displayName' => $profile['display_name'],
    'bio' => $profile['bio'],
    'avatarUrl' => $profile['avatar_url'],
    'links' => $links
]);
?>
