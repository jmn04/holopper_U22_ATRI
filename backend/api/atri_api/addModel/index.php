<?php
include("../db/pdo.php"); // データベース接続クラスをインクルード
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-Type: application/json; charset=utf-8");

$response = [
    "success" => false,
    "message" => "",
];

/* if ($_SERVER['REQUEST_METHOD'] === 'POST') { */
    if (!isset($_FILES['glb']) || !isset($_FILES['thumbnail'])) {
        $response["message"] = "No files uploaded.";
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $arr = $_POST;

    if (!$arr) {
        $response["message"] = "Invalid form data";
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $modelFile = $_FILES['glb'];
    $imgFile = $_FILES['thumbnail'];
    $modelUploadDir = '../assets/models/';
    $imgUploadDir = '../assets/img/';

    // ファイル名をユニークにするためにタイムスタンプを追加
    $modelFileName = time() . '_' . basename($modelFile['name']);
    $imgFileName = time() . '_' . basename($imgFile['name']);

    $modelUploadFilePath = $modelUploadDir . $modelFileName;
    $imgUploadFilePath = $imgUploadDir . $imgFileName;
    
    if (move_uploaded_file($modelFile['tmp_name'], $modelUploadFilePath) && move_uploaded_file($imgFile['tmp_name'], $imgUploadFilePath)) {

        function generateUniqueId() {
            return mt_rand(100000000, 999999999); // 9桁のランダムな数字を生成
        }

        function insertUniqueId($pdo, $arr, $modelFileName, $imgFileName,$response) {
            while (true) {
                $uniqueId = generateUniqueId();
            
                $pdo->beginTransaction();   
                $stmt = $pdo->prepare("SELECT * FROM model WHERE model_id = :model_id");
                $stmt->bindParam(":model_id", $uniqueId, PDO::PARAM_INT);
                $stmt->execute();
                $count = $stmt->fetchColumn();
            
                if ($count == 0) {
                    $modelID = $uniqueId;
                    $date = date("Y-m-d H:i:s");

                    try {
                        $stmt = $pdo->prepare("INSERT INTO model_path(id, model_id, img_file_name, model_file_name, created_date) VALUES (null, :model_id, :img_file_name, :model_file_name, :created_date)");
                        $stmt->bindParam(':model_id', $modelID, PDO::PARAM_INT);
                        $stmt->bindParam(':img_file_name', $imgFileName, PDO::PARAM_STR);
                        $stmt->bindParam(':model_file_name', $modelFileName, PDO::PARAM_STR);
                        $stmt->bindParam(':created_date', $date, PDO::PARAM_STR);
                        $stmt->execute();

                        // modelテーブルへの挿入
                        $userID = $arr["user_id"];
                        $title = $arr["title"];
                        $description = $arr["description"];
                        $stmt = $pdo->prepare("INSERT INTO model(id, user_id, model_id, title, description, created_date, updated_date) VALUES (null, :user_id, :model_id, :title, :description, :created_date, :updated_date)");
                        $stmt->bindParam(':user_id', $userID, PDO::PARAM_INT);
                        $stmt->bindParam(':model_id', $modelID, PDO::PARAM_INT);
                        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
                        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
                        $stmt->bindParam(':created_date', $date, PDO::PARAM_STR);
                        $stmt->bindParam(':updated_date', $date, PDO::PARAM_STR);
                        $stmt->execute();

                        $response["success"] = true;
                        $response["message"] = "Files and data uploaded successfully.";
                        $pdo->commit();
                    } catch (PDOException $e) {
                        $pdo->rollBack(); // エラーが発生した場合はロールバック
                        $response["message"] = "Database error: " . $e->getMessage();
                        return $response;
                        error_log($e->getMessage());
                        break;
                    }

                    $stmt->closeCursor();
                    return $response;
                    break;
                }
            }
        }
        

        $db = new Connect();
        $pdo = $db->getPDO();

        $response = insertUniqueId($pdo, $arr, $modelFileName, $imgFileName,$response);

        // コミット
        $response["success"] = True;
        
    } else {
        $response["message"] = "Failed to move uploaded files.";
    }
/* } else {
    $response["message"] = "Invalid request method.";
} */

echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>
