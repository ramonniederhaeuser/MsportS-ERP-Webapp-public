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

  $id = trim($data->editTrainingID);
  $tags = trim($data->updateTraining_tags);
  $date = trim($data->updateTraining_date);
  $time = trim($data->updateTraining_time);
  $loginExpireDate = trim($data->updateTraining_loginExpireDate);
  $loginExpireTime = trim($data->updateTraining_loginExpireTime);
  $maxMember = trim($data->updateTraining_maxMember);
  $updatedBy = trim($data->updateTraining_updatedBy);

  try {

    $update_query = "UPDATE `trainings` SET `tags`=:tags,`date`=:date,`time`=:time,`loginExpireDate`=:loginExpireDate,`loginExpireTime`=:loginExpireTime,`maxMember`=:maxMember,`updatedBy`=:updatedBy WHERE `id`=:id";

    $update_stmt = $conn->prepare($update_query);

    // DATA BINDING
    $update_stmt->bindValue(':id', htmlspecialchars(strip_tags($id)), PDO::PARAM_INT);
    $update_stmt->bindValue(':tags', htmlspecialchars(strip_tags($tags)), PDO::PARAM_STR);
    $update_stmt->bindValue(':date', htmlspecialchars(strip_tags($date)), PDO::PARAM_STR);
    $update_stmt->bindValue(':time', htmlspecialchars(strip_tags($time)), PDO::PARAM_STR);
    $update_stmt->bindValue(':loginExpireDate', htmlspecialchars(strip_tags($loginExpireDate)), PDO::PARAM_STR);
    $update_stmt->bindValue(':loginExpireTime', htmlspecialchars(strip_tags($loginExpireTime)), PDO::PARAM_STR);
    $update_stmt->bindValue(':maxMember', htmlspecialchars(strip_tags($maxMember)), PDO::PARAM_STR);
    $update_stmt->bindValue(':updatedBy', htmlspecialchars(strip_tags($updatedBy)), PDO::PARAM_STR);

    $update_stmt->execute();

    $returnData = msg(1, 201, 'Training successfully updated.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
