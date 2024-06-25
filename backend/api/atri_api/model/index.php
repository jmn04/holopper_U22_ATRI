<?php 

include("../db/pdo.php");  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-Type: application/json; charset=utf-8");

$modelData = array();
$msg = "";

$arr = json_decode(file_get_contents("php://input"),true);
/* $arr = $_POST; */

if (!$arr) {
    echo json_encode([
        "model_data" => $modelData,
        "message" => "Invalid JSON input"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try{
    $db = new Connect();
    $pdo = $db->getPDO();
} catch (PDOException $e) {
    echo json_encode([
        "model_data" => $modelData,
        "message" => "Database connection failed. Please try again later."
    ], JSON_UNESCAPED_UNICODE);
    error_log($e->getMessage()); // エラーメッセージをログに記録
    exit;
}

$detail_flg = false;

if(!empty($arr["model_id"])){
    $detail_flg = true;
}

try{
    $sql = "SELECT m.*,mp.img_file_name,mp.model_file_name FROM model m LEFT OUTER JOIN model_path mp ON mp.model_id = m.model_id WHERE m.user_id = :user_id";
    if($detail_flg){
        $sql .= " AND m.model_id = :model_id";
    }
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":user_id",$arr["user_id"], PDO::PARAM_STR);
    if($detail_flg){
        $stmt->bindParam(":model_id",$arr["model_id"], PDO::PARAM_STR);
    }
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $count = count($user);
    
    if ($user && $user > 0) {
        foreach($user as $row){
            $modelDataDetail = array(
                "user_id" => $row["user_id"],
                "model_id" => $row["model_id"],
                "title" => $row["title"],
                "description"=> $row["description"],
                "img_file_name"=> $row["img_file_name"],
                "model_file_name"=> $row["model_file_name"],
                "updated_date"=> $row["updated_date"]
            );
            array_push($modelData,$modelDataDetail);
        }
        $msg = "wow";
    } else {
        $msg = 'データがありません';
    }
} catch (PDOException $e) {
    $msg = "Query failed. Please try again later.";
    error_log($e->getMessage()); // エラーメッセージをログに記録
}


echo json_encode([
    "model_data" => $modelData,
    "message" => $msg
], JSON_UNESCAPED_UNICODE);

?>