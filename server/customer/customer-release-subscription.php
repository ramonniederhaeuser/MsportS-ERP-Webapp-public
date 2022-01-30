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
  //fetch all actual pricings
  $fetch_pricings = "SELECT * FROM `pricing` ORDER BY `id` ASC";
  $query_stmt = $conn->prepare($fetch_pricings);
  $query_stmt->execute();
  $pricings = $query_stmt->fetchAll();
  //loop through pricings and set var
  foreach ($pricings as $pricing) {
    if ($pricing['subscription_type'] == "subscription_10") {
      $subscription_10 = $pricing['subscription_price'];
    }
    if ($pricing['subscription_type'] == "subscription_30") {
      $subscription_30 = $pricing['subscription_price'];
    }
    if ($pricing['subscription_type'] == "subscription_180") {
      $subscription_180 = $pricing['subscription_price'];
    }
    if ($pricing['subscription_type'] == "subscription_365") {
      $subscription_365 = $pricing['subscription_price'];
    }
    if ($pricing['subscription_type'] == "subscription_mx") {
      $subscription_mx = $pricing['subscription_price'];
    }
    if ($pricing['subscription_type'] == "subscription_365_spez") {
      $subscription_365_spez = $pricing['subscription_price'];
    }
  }


  $id = trim($data->editCustomerID);
  $firstname = trim($data->customer_firstname);
  $lastname = trim($data->customer_lastname);
  $adress = trim($data->customer_adress);
  $zip_city = trim($data->customer_zip_city);
  $mail = trim($data->customer_mail);
  $phone = trim($data->customer_phone);
  $subscriptionType = trim($data->updateCustomer_subscriptionType);
  $subscriptionQuantity = trim($data->updateCustomer_subscriptionQuantity);
  $subscriptionUntil = trim($data->updateCustomer_subscriptionUntil);
  $subscriptionReason = trim($data->updateCustomer_subscriptionReason);
  $subscriptionDate = date("Y-m-d");
  $updatedBy = trim($data->updateCustomer_updatedBy);

  //create amount for accounting
  if ($subscriptionType == "10er Abo") {
    $amount = $subscription_10;
  }
  if ($subscriptionType == "1 Monat") {
    $amount = $subscription_30;
  }
  if ($subscriptionType == "6 Monate") {
    $amount = $subscription_180;
  }
  if ($subscriptionType == "12 Monate") {
    $amount = $subscription_365;
  }
  if ($subscriptionType == "5 Monate") {
    $amount = $subscription_mx;
  }
  if ($subscriptionType == "12 Monate spez") {
    $amount = $subscription_365_spez;
  }

  try {
    //Update Customer
    $update_query = "UPDATE `customers` SET `subscriptionPaid`=:subscriptionPaid,
                                            `subscriptionQuantity`=:subscriptionQuantity,
                                            `subscriptionUntil`=:subscriptionUntil,
                                            `updatedBy`=:updatedBy WHERE `id`=:id";

    $update_stmt = $conn->prepare($update_query);

    // DATA BINDING
    $update_stmt->bindValue(':id', htmlspecialchars(strip_tags($id)), PDO::PARAM_INT);
    $update_stmt->bindValue(':subscriptionPaid', htmlspecialchars(strip_tags($subscriptionDate)), PDO::PARAM_STR);
    $update_stmt->bindValue(':subscriptionUntil', htmlspecialchars(strip_tags($subscriptionUntil)), PDO::PARAM_STR);
    $update_stmt->bindValue(':subscriptionQuantity', htmlspecialchars(strip_tags($subscriptionQuantity)), PDO::PARAM_STR);
    $update_stmt->bindValue(':updatedBy', htmlspecialchars(strip_tags($updatedBy)), PDO::PARAM_STR);

    $update_stmt->execute();

    $returnData = msg(1, 201, 'Subscription successfully mark as Paid.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }


  try {
    //Create new Accounting
    $insert_query = "INSERT INTO `accounting`(`bookingReason`,`bookingDate`,`amount`,`createdBy`) VALUES(:bookingReason,:bookingDate,:amount,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':bookingReason', htmlspecialchars(strip_tags($subscriptionReason)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':bookingDate', htmlspecialchars(strip_tags($subscriptionDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':amount', htmlspecialchars(strip_tags($amount)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($updatedBy)), PDO::PARAM_STR);

    $insert_stmt->execute();
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

  try {
    //Create new Receipt
    $insert_query = "INSERT INTO `receipts`(`userid`,`firstname`,`lastname`,`adress`,`zip_city`,`mail`,`phone`,`subscriptionType`,`amount`,`subscriptionUntil`,`subscriptionPaid`,`createdBy`) 
                      VALUES(:userid,:firstname,:lastname,:adress,:zip_city,:mail,:phone,:subscriptionType,:amount,:subscriptionUntil,:subscriptionPaid,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':userid', htmlspecialchars(strip_tags($id)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':firstname', htmlspecialchars(strip_tags($firstname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':lastname', htmlspecialchars(strip_tags($lastname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':adress', htmlspecialchars(strip_tags($adress)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':zip_city', htmlspecialchars(strip_tags($zip_city)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':mail', htmlspecialchars(strip_tags($mail)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':phone', htmlspecialchars(strip_tags($phone)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':subscriptionType', htmlspecialchars(strip_tags($subscriptionType)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':amount', htmlspecialchars(strip_tags($amount)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':subscriptionUntil', htmlspecialchars(strip_tags($subscriptionUntil)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':subscriptionPaid', htmlspecialchars(strip_tags($subscriptionDate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($updatedBy)), PDO::PARAM_STR);

    $insert_stmt->execute();
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
