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

  $firstname = trim($data->newCustomer_firstname);
  $lastname = trim($data->newCustomer_lastname);
  $adress = trim($data->newCustomer_adress);
  $zip_city = trim($data->newCustomer_zip_city);
  $birthdate = trim($data->newCustomer_birthdate);
  $phone = trim($data->newCustomer_phone);
  $mail = trim($data->newCustomer_mail);
  $gender = trim($data->newCustomer_gender);
  $createdBy = trim($data->newCustomer_createdBy);


  try {

    $insert_query = "INSERT INTO `customers`(`firstname`,`lastname`,`adress`,`zip_city`,`birthdate`,`phone`,`mail`,`gender`,`createdBy`) VALUES(:firstname,:lastname,:adress,:zip_city,:birthdate,:phone,:mail,:gender,:createdBy)";

    $insert_stmt = $conn->prepare($insert_query);

    // DATA BINDING
    $insert_stmt->bindValue(':firstname', htmlspecialchars(strip_tags($firstname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':lastname', htmlspecialchars(strip_tags($lastname)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':adress', htmlspecialchars(strip_tags($adress)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':zip_city', htmlspecialchars(strip_tags($zip_city)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':birthdate', htmlspecialchars(strip_tags($birthdate)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':phone', htmlspecialchars(strip_tags($phone)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':mail', htmlspecialchars(strip_tags($mail)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':gender', htmlspecialchars(strip_tags($gender)), PDO::PARAM_STR);
    $insert_stmt->bindValue(':createdBy', htmlspecialchars(strip_tags($createdBy)), PDO::PARAM_STR);

    $insert_stmt->execute();

    //send mail to customer
    //Recipient
    $to = $mail;
    //Link Webapp
    $link = "https://app.msports.ch";
    //Subject
    $subject = "MsportS Benutzerkonto wurde erstellt";
    //Message
    $message = "<h2>Herzlich Willkommen bei MsportS.</h2><h4>Dein Benutzerkonto wurde erstellt.</h4><br />Du kannst dich unter " . $link . " anmelden<br/>Login: " . $to . "<br/>Passwort: msports <br/><h5>Besten Dank für dein Vertrauen.</h5>";
    //Headers
    $headers = "From: MsportS <info@msports.ch>\r\n";
    $headers .= "Reply-to: info@msports.ch\r\n";
    $headers .= "Content-type: text/html\r\n";
    //send Mail
    mail($to, $subject, $message, $headers);

    $returnData = msg(1, 201, 'Customer successfully saved.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
