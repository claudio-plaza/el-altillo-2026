<?php
// ============================================
// FORMULARIO DE CONTACTO - EL ALTILLO
// ============================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

define('MAIL_TO', 'claudioplaza92@gmail.com');
define('MAIL_FROM', 'noreply@elaltillo.com.ar');

// Obtener datos
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;

$nombre   = isset($input['nombre'])   ? strip_tags(trim($input['nombre']))                    : '';
$email    = isset($input['email'])    ? filter_var($input['email'], FILTER_SANITIZE_EMAIL)     : '';
$telefono = isset($input['telefono']) ? strip_tags(trim($input['telefono']))                   : '';
$mensaje  = isset($input['mensaje'])  ? strip_tags(trim($input['mensaje']))                    : '';

if (empty($nombre) || empty($email) || empty($telefono)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor completá los campos requeridos.']);
    exit();
}

$subject = "Nueva consulta desde la web - Complejo El Altillo";
$headers  = "From: Web El Altillo <" . MAIL_FROM . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body  = "<h2>Nueva Consulta desde la Web</h2>";
$body .= "<p><strong>Nombre:</strong> $nombre</p>";
$body .= "<p><strong>Email:</strong> $email</p>";
$body .= "<p><strong>Teléfono:</strong> $telefono</p>";
$body .= "<p><strong>Mensaje:</strong><br>" . nl2br($mensaje) . "</p>";

try {
    $mail_sent = @mail(MAIL_TO, $subject, $body, $headers);

    if ($mail_sent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => '¡Tu mensaje ha sido enviado correctamente! Nos pondremos en contacto pronto.']);
    } else {
        throw new Exception("Error al enviar el mail");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'No se pudo enviar el mensaje. Por favor intentá nuevamente o contactanos por teléfono.']);
}
?>
