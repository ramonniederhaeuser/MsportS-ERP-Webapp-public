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

// CHECKING EMPTY FIELDS
elseif (
  !isset($data->newUser_username)
  || !isset($data->newUser_password)
  || empty(trim($data->newUser_username))
  || empty(trim($data->newUser_password))
) :
  $fields = ['fields' => ['newUser_username', 'newUser_password']];
  $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

  $username = trim($data->newUser_username);
  $password = trim($data->newUser_password);

  if (strlen($username) < 3) :
    $returnData = msg(0, 422, 'Your username must be at least 3 characters long!');

  elseif (strlen($password) < 5) :
    $returnData = msg(0, 422, 'Your password must be at least 5 characters long!');

  else :
    try {

      $check_username = "SELECT `username` FROM `admin` WHERE `username`=:username";
      $check_username_stmt = $conn->prepare($check_username);
      $check_username_stmt->bindValue(':username', $username, PDO::PARAM_STR);
      $check_username_stmt->execute();

      if ($check_username_stmt->rowCount()) :
        $returnData = msg(0, 422, 'This Username already in use!');

      else :
        $insert_query = "INSERT INTO `admin`(`username`,`password`) VALUES(:username,:password)";

        $insert_stmt = $conn->prepare($insert_query);

        // DATA BINDING
        $insert_stmt->bindValue(':username', htmlspecialchars(strip_tags($username)), PDO::PARAM_STR);
        $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

        $insert_stmt->execute();

        $returnData = msg(1, 201, 'You have successfully registered.');

      endif;
    } catch (PDOException $e) {
      $returnData = msg(0, 500, $e->getMessage());
    }
  endif;

endif;

echo json_encode($returnData);
