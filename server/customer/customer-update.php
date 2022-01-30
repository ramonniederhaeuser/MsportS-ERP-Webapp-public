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

  $id = trim($data->editCustomerID);
  $firstname = trim($data->updateCustomer_firstname);
  $lastname = trim($data->updateCustomer_lastname);
  $adress = trim($data->updateCustomer_adress);
  $zip_city = trim($data->updateCustomer_zip_city);
  $birthdate = trim($data->updateCustomer_birthdate);
  $phone = trim($data->updateCustomer_phone);
  $mail = trim($data->updateCustomer_mail);
  $gender = trim($data->updateCustomer_gender);
  $updatedBy = trim($data->updateCustomer_updatedBy);

  try {

    $update_query = "UPDATE `customers` SET `firstname`=:firstname,`lastname`=:lastname,`adress`=:adress,`zip_city`=:zip_city,`birthdate`=:birthdate,`phone`=:phone,`mail`=:mail,`gender`=:gender,`updatedBy`=:updatedBy WHERE `id`=:id";

    $update_stmt = $conn->prepare($update_query);

    // DATA BINDING
    $update_stmt->bindValue(':id', htmlspecialchars(strip_tags($id)), PDO::PARAM_INT);
    $update_stmt->bindValue(':firstname', htmlspecialchars(strip_tags($firstname)), PDO::PARAM_STR);
    $update_stmt->bindValue(':lastname', htmlspecialchars(strip_tags($lastname)), PDO::PARAM_STR);
    $update_stmt->bindValue(':adress', htmlspecialchars(strip_tags($adress)), PDO::PARAM_STR);
    $update_stmt->bindValue(':zip_city', htmlspecialchars(strip_tags($zip_city)), PDO::PARAM_STR);
    $update_stmt->bindValue(':birthdate', htmlspecialchars(strip_tags($birthdate)), PDO::PARAM_STR);
    $update_stmt->bindValue(':phone', htmlspecialchars(strip_tags($phone)), PDO::PARAM_STR);
    $update_stmt->bindValue(':mail', htmlspecialchars(strip_tags($mail)), PDO::PARAM_STR);
    $update_stmt->bindValue(':gender', htmlspecialchars(strip_tags($gender)), PDO::PARAM_STR);
    $update_stmt->bindValue(':updatedBy', htmlspecialchars(strip_tags($updatedBy)), PDO::PARAM_STR);

    $update_stmt->execute();

    $returnData = msg(1, 201, 'Customer successfully updated.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
