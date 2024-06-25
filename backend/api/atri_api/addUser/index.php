<?php 

include("../db/pdo.php");
$db = new Connect();
$pdo = $db->getPDO();
$date = date("Y-m-d H:i:s");
$hash = password_hash('password', PASSWORD_DEFAULT);

try {
    // プレースホルダーを使用してSQLクエリを準備
    $stmt = $pdo->prepare("INSERT INTO user (id, user_id, name, mail, password, created_date, updated_date) VALUES (null, :user_id, :name, :mail, :password, :created_date, :updated_date)");
    
    // パラメータをバインド
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':mail', $mail);
    $stmt->bindParam(':password', $hash);
    $stmt->bindParam(':created_date', $date);
    $stmt->bindParam(':updated_date', $date);
    
    // 値の設定
    $user_id = 123456789;
    $name = 'テスト';
    $mail = 'test@test.com';
    
    // クエリの実行
    $stmt->execute();

    echo "User added successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
