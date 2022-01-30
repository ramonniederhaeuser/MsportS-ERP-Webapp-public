<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success, $status, $message, $extra = [])
{
  return array_merge([
    'success' => $success,
    'status' => $status,
    'message' => $message
  ], $extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__ . '../../classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];


// IF REQUEST METHOD IS NOT POST
if ($_SERVER["REQUEST_METHOD"] != "POST") :
  $returnData = msg(0, 404, 'Page Not Found!');


// IF EVERYTHING IS OK
else :
  $userId = ($data->userid);

  try {
    $update_query = "DELETE FROM `admin`  WHERE id=:userId";

    $update_stmt = $conn->prepare($update_query);

    // DATA BINDING
    $update_stmt->bindParam(':userId', $userId, PDO::PARAM_INT);

    $update_stmt->execute();

    $returnData = msg(1, 202, 'User successfully deleted.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }


endif;

echo json_encode($returnData);
