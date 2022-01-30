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
          $trainings = $this->fetchAllAccountings();
          return $trainings;

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

  protected function fetchAllAccountings()
  {
    try {
      $fetch_accountings = "SELECT * FROM `accounting` ORDER BY `bookingDate` DESC";
      $query_stmt = $this->db->prepare($fetch_accountings);
      $query_stmt->execute();

      if ($query_stmt->rowCount()) :
        $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
          'success' => 1,
          'status' => 200,
          'accountings' => $row
        ];
      else :
        return null;
      endif;
    } catch (PDOException $e) {
      return null;
    }
  }
}
