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
          $trainings = $this->fetchAllPricings();
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

  protected function fetchAllPricings()
  {
    try {
      $fetch_receipts = "SELECT * FROM `receipts` ORDER BY ID DESC";
      $query_stmt = $this->db->prepare($fetch_receipts);
      $query_stmt->execute();

      if ($query_stmt->rowCount()) :
        $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
          'success' => 1,
          'status' => 200,
          'receipts' => $row
        ];
      else :
        return null;
      endif;
    } catch (PDOException $e) {
      return null;
    }
  }
}
