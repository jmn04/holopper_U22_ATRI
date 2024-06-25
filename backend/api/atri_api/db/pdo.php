<?php 
class Connect{

    const HOST='mysql-db';

    const UTF='utf8';

    const USER='user';

    const PASS='password';

    const DB_NAME = 'holopper';

    function getPDO(){
        $dsn = "mysql:dbname=".self::DB_NAME.";host=".self::HOST.";charset=".self::UTF;
        $user=self::USER;
        $pass=self::PASS;
        try{
            $pdo = new PDO($dsn,$user,$pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }catch(PDOException $Exception){
            die('接続エラー：' .$Exception->getMessage());
        }
        return $pdo;
    }
}
?>