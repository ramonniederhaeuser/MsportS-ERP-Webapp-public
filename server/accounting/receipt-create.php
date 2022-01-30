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

  $userid = trim($data->newReceipt_customerid);
  $firstname = trim($data->newReceipt_firstname);
  $lastname = trim($data->newReceipt_lastname);
  $adress = trim($data->newReceipt_adress);
  $zip_city = trim($data->newReceipt_zip_city);
  $mail = trim($data->newReceipt_mail);
  $phone = trim($data->newReceipt_phone);
  $subscriptionType = trim($data->newReceipt_productType);
  $subscriptionQuantity = trim($data->newReceipt_subscriptionQuantity);
  $amount = trim($data->newReceipt_amount);
  $subscriptionDate = date("Y-m-d");
  $createdBy = trim($data->newReceipt_createdBy);

  try {
    //Create new Receipt
    $insert_query = "INSERT INTO `receipts`(`userid`,`firstname`,`lastname`,`adress`,`zip_city`,`mail`,`phone`,`subscriptionType`,`amount`,`subscriptionUntil`,`subscriptionPaid`,`createdBy`) 
                      VALUES(:userid,:firstname,:lastname,:adress,:zip_city,:mail,:phone,:subscriptionType,:amount,:subscriptionUntil,:subscriptionPaid,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':userid', htmlspecialchars(strip_tags($userid)), PDO::PARAM_INT);
    $insert_stmt->bindValue(':firstname', htmlspecialchars(strip_tags($firstname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':lastname', htmlspecialchars(strip_tags($lastname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':adress', htmlspecialchars(strip_tags($adress)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':zip_city', htmlspecialchars(strip_tags($zip_city)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':mail', htmlspecialchars(strip_tags($mail)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':phone', htmlspecialchars(strip_tags($phone)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':subscriptionType', htmlspecialchars(strip_tags($subscriptionType)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':amount', htmlspecialchars(strip_tags($amount)), PDO::PARAM_INT);
    $insert_stmt->bindValue(':subscriptionUntil', htmlspecialchars(strip_tags($subscriptionDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':subscriptionPaid', htmlspecialchars(strip_tags($subscriptionDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($createdBy)), PDO::PARAM_STR);

    $insert_stmt->execute();

    $returnData = msg(1, 201, 'Receipt successfully saved.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
