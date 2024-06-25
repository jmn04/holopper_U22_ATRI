<?php 

include("../db/pdo.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-Type: application/json; charset=utf-8");

/* $arr = json_decode(file_get_contents('php://input'),true); */

$isLogin = False;
$userID = "";
$name = "";
$msg = "";

$arr = json_decode(file_get_contents("php://input"),true);
/* $arr = $_POST; */

if (!$arr) {
    echo json_encode([
        "is_login" => $isLogin,
        "user_id"=>$userID,
        "name"=>$name,
        "message" => "Invalid JSON input"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try{
    $db = new Connect();
    $pdo = $db->getPDO();
} catch (PDOException $e) {
    echo json_encode([
        "is_login" => $isLogin,
        "user_id"=>$userID,
        "name"=>$name,
        "message" => "Database connection failed. Please try again later."
    ], JSON_UNESCAPED_UNICODE);
    error_log($e->getMessage()); // エラーメッセージをログに記録
    exit;
}

try{
    $stmt = $pdo->prepare("SELECT * FROM user WHERE mail = :mail");
    $stmt->bindParam(":mail",$arr["mail"], PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($arr['password'], $user['password'])) {
        $isLogin = True;
        $userID = $user['user_id'];
        $name = $user['name'];
        $msg = 'ログインしました。';
    } else {
        $msg = 'メールアドレスもしくはパスワードが間違っています。';
    }
} catch (PDOException $e) {
    $msg = "Query failed. Please try again later.";
    error_log($e->getMessage()); // エラーメッセージをログに記録
}

echo json_encode([
    "is_login"=>$isLogin,
    "user_id"=>$userID,
    "name"=>$name,
    "message"=>$msg
], JSON_UNESCAPED_UNICODE);

?>