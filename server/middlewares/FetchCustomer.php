<?php
require __DIR__ . '/../classes/JwtHandler.php';

class Auth extends JwtHandler
{

  protected $db;
  protected $headers;
  protected $token;
  public function __construct($db, $headers)
  {
    parent::__construct();
    $this->db = $db;
    $this->headers = $headers;
  }

  public function isAuth()
  {
    if (array_key_exists('Authorization', $this->headers) && !empty(trim($this->headers['Authorization']))) :
      $this->token = explode(" ", trim($this->headers['Authorization']));
      if (isset($this->token[1]) && !empty(trim($this->token[1]))) :

        $data = $this->_jwt_decode_data($this->token[1]);

        if (isset($data['auth']) && isset($data['data']->user_id) && $data['auth']) :
          $Customers = $this->fetchAllCustomers();
          return $Customers;

        else :
          return null;

        endif; // End of isset($this->token[1]) && !empty(trim($this->token[1]))

      else :
        return null;

      endif; // End of isset($this->token[1]) && !empty(trim($this->token[1]))

    else :
      return null;

    endif;
  }


  //fetch all Customers
  protected function fetchAllCustomers()
  {
    try {
      $fetch_customers = "SELECT id, 
                                 firstname, 
                                 lastname, 
                                 adress, 
                                 zip_city,
                                 birthdate,
                                 phone,
                                 mail,
                                 gender,
                                 createdBy,
                                 createdAt,
                                 updatedBy,
                                 updatedAt,
                                 subscriptionType,
                                 subscriptionUntil,
                                 subscriptionQuantity,
                                 subscriptionPaid  FROM `customers` ORDER BY `firstname` ASC";
      $query_stmt = $this->db->prepare($fetch_customers);
      $query_stmt->execute();

      if ($query_stmt->rowCount()) :
        $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
          'success' => 1,
          'status' => 200,
          'customers' => $row
        ];
      else :
        return null;
      endif;
    } catch (PDOException $e) {
      return null;
    }
  }
}
