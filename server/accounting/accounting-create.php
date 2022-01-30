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

  $amount = $data->newAccounting_amount;
  $bookingReason = trim($data->newAccounting_bookingReason);
  $bookingDate = trim($data->newAccounting_bookingDate);
  $createdBy = trim($data->newAccounting_createdBy);

  try {

    $insert_query = "INSERT INTO `accounting`(`amount`,`bookingReason`,`bookingDate`,`createdBy`) VALUES(:amount,:bookingReason,:bookingDate,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':amount', htmlspecialchars(strip_tags($amount)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':bookingReason', htmlspecialchars(strip_tags($bookingReason)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':bookingDate', htmlspecialchars(strip_tags($bookingDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($createdBy)), PDO::PARAM_STR);

    $insert_stmt->execute();

    $returnData = msg(1, 201, 'Accounting successfully saved.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
