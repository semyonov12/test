<?php
// === Заголовки для доступа с других доменов и формата JSON ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$token = "8174083817:AAGElUwqNELWgrVnk7ctSsRlwG09HWzuMhw"; 
$chat_id = "304890023";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['message' => 'Жду POST запрос...']);
    exit;
}

$quantity = !empty($_POST['quantity']) ? htmlspecialchars($_POST['quantity']) : '-';
$date     = !empty($_POST['date'])     ? htmlspecialchars($_POST['date'])     : '-';
$time     = !empty($_POST['time'])     ? htmlspecialchars($_POST['time'])     : '-';
$tel      = !empty($_POST['tel'])      ? htmlspecialchars($_POST['tel'])      : '-';


$txt = "<b>📩 Рекламная прокладка 2</b>\n\n";
$txt .= "👥 <b>Гостей:</b> " . $quantity . "\n";
$txt .= "📅 <b>Дата:</b> " . $date . "\n";
$txt .= "⏰ <b>Время:</b> " . $time . "\n";
$txt .= "📞 <b>Телефон:</b> " . $tel;

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => "https://api.telegram.org/bot{$token}/sendMessage",
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => false, 
    CURLOPT_POSTFIELDS => [
        'chat_id' => $chat_id,
        'text' => $txt,
        'parse_mode' => 'HTML',
    ]
]);

$result = curl_exec($ch);
curl_close($ch);

// === Обработка ответа ===
$json = json_decode($result, true);

if (isset($json['ok']) && $json['ok']) {
    // Успех
    $response = [
        'status' => 'success',
        'message' => '✅ Форма успешно отправлена! Мы свяжемся с вами.'
    ];
} else {
    $response = [
        'status' => 'error',
        'message' => '❌ Ошибка отправки. Попробуйте позже.',
        'debug' => $json['description'] ?? 'Неизвестная ошибка'
    ];
}

echo json_encode($response);
?>