<?php 

include("../db/pdo.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-Type: application/json; charset=utf-8");

/* $arr = json_decode(file_get_contents('php://input'),true); */

$isRegister = False;
$msg = "";

$arr = json_decode(file_get_contents("php://input"),true);
/* $arr = $_POST; */

/* if (!$arr) {
    echo json_encode([
        "is_register" => $isRegister,
        "message" => "Invalid JSON input"
    ], JSON_UNESCAPED_UNICODE);
    exit;
} */

try{
    $db = new Connect();
    $pdo = $db->getPDO();
} catch (PDOException $e) {
    echo json_encode([
        "is_register" => $isRegister,
        "message" => "Database connection failed. Please try again later."
    ], JSON_UNESCAPED_UNICODE);
    error_log($e->getMessage()); // エラーメッセージをログに記録
    exit;
}

try{
    $userID = mt_rand(0,999999999);
    $userName = $arr['username'];
    $mail = $arr['mail'];
    $password = password_hash($arr['password'], PASSWORD_DEFAULT);
    $nowDate = date("Y-m-d H:i:s");
    $sql = "INSERT INTO user (id, user_id, name, mail, password, created_date, updated_date) VALUES (:id, :user_id, :name, :mail, :password, :created_date, :updated_date)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', null);
    $stmt->bindValue(':user_id', $userID);
    $stmt->bindValue(':name', $userName);
    $stmt->bindValue(':mail', $mail);
    $stmt->bindValue(':password', $password);
    $stmt->bindValue(':created_date', $nowDate);
    $stmt->bindValue(':updated_date', $nowDate);
    $stmt->execute();
    $isRegister = True;
} catch (PDOException $e) {
    $msg = $e->getMessage();
    error_log($e->getMessage()); // エラーメッセージをログに記録
}

echo json_encode([
    "is_register"=>$isRegister,
    "message"=>$msg
], JSON_UNESCAPED_UNICODE);

?>