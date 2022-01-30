<?php
require __DIR__ . '../../classes/JwtHandler.php';
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
          $admin = $this->fetchAllAdmin();
          return $admin;

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

  protected function fetchAllAdmin()
  {
    try {
      $fetch_admins = "SELECT id, username, auth FROM `admin`";
      $query_stmt = $this->db->prepare($fetch_admins);
      $query_stmt->execute();

      if ($query_stmt->rowCount()) :
        $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
          'success' => 1,
          'status' => 200,
          'users' => $row
        ];
      else :
        return null;
      endif;
    } catch (PDOException $e) {
      return null;
    }
  }
}
