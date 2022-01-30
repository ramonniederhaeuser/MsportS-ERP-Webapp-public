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


// IF THERE ARE NO EMPTY FIELDS THEN-
else :

  $tags = trim($data->newTraining_tags);
  $date = trim($data->newTraining_date);
  $time = trim($data->newTraining_time);
  $loginExpireDate = trim($data->newTraining_loginExpireDate);
  $loginExpireTime = trim($data->newTraining_loginExpireTime);
  $maxMember = trim($data->newTraining_maxMember);
  $createdBy = trim($data->newTraining_createdBy);

  try {

    $insert_query = "INSERT INTO `trainings`(`tags`,`date`,`time`,`loginExpireDate`,`loginExpireTime`,`maxMember`,`createdBy`) VALUES(:tags,:date,:time,:loginExpireDate,:loginExpireTime,:maxMember,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':tags', htmlspecialchars(strip_tags($tags)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':date', htmlspecialchars(strip_tags($date)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':time', htmlspecialchars(strip_tags($time)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':loginExpireDate', htmlspecialchars(strip_tags($loginExpireDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':loginExpireTime', htmlspecialchars(strip_tags($loginExpireTime)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':maxMember', htmlspecialchars(strip_tags($maxMember)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($createdBy)), PDO::PARAM_STR);

    $insert_stmt->execute();

    $returnData = msg(1, 201, 'Training successfully saved.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
