<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-Type: application/json; charset=utf-8");
$file = $_GET['file'];
$file_path = '../assets/models/' . basename($file);

if (file_exists($file_path)) {
  header('Content-Type: model/gltf-binary');
  header('Content-Disposition: inline; filename="' . basename($file_path) . '"');
  header('Content-Length: ' . filesize($file_path));
  readfile($file_path);
} else {
  http_response_code(404);
  echo "File not found.";
}
exit;
?>
