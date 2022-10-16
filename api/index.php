<?php
header(("Access-Control-Allow-Origin: *"));
header(("Access-Control-Allow-Headers: *"));
header(("Access-Control-Allow-Methods: *"));

include 'DbConnect.php';

$obDb = new DbConnect;
$conn = $obDb->connect();

$user = (file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/',$_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES (null, :name, :email, :mobile, :created_at)";

        $created_at = date('y-m-d');

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);
        
        if($stmt-> execute()){
            $response = ['status' => 1, 'message'=> 'record created successfully. '];  
        } else {
            $response = ['status' => 0, 'message'=> 'Failed to create the record. '];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET name= :name, email = :email , mobile = :mobile , updated_at = :updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);
        
        if($stmt-> execute()){
            $response = ['status' => 1, 'message'=> 'record updated successfully. '];  
        } else {
            $response = ['status' => 0, 'message'=> 'Failed to update the record. '];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = " DELETE FROM users WHERE id = :id";
        $path = explode('/',$_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt-> execute()){
            $response = ['status' => 1, 'message'=> 'record Deleted successfully. '];  
        } else {
            $response = ['status' => 0, 'message'=> 'Failed to delete the record. '];
        }
        echo json_encode($response);
        break; 
    

}

?>