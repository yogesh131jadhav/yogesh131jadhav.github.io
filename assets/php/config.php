<?php
  $response = array();
  /*CORS setting*/
  /*if ($_SERVER['HTTP_HOST'] == 'localhost') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
  }*/
  /*DB setting*/
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "db_tours_production";
  /*$username = "lzqmoiqg_db_tours_production_user";
  $password = "3TEzS@nHXNVV";
  $dbname = "lzqmoiqg_db_tours_production";*/
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  $headers = getallheaders();
  $authToken = '123';
  $userId = '0';
  if(isset($headers['Authorization'])) {
    $token = explode('!', $headers['Authorization']);
    if (isset($token[0])) {
      $authToken = $token[0];
    }
    if (isset($token[1])) {
      $userId = $token[1];
    }
  }

  $_POST = json_decode(file_get_contents('php://input'), true);
  if (!$conn) { die("Connection failed: " . mysqli_connect_error()); }

  /*Error Handling*/
  function handleError($msg) {
    $error = array(
      'code' => 400,
      'message' => $msg
    );
    http_response_code(400);
    $response = $error;
    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }

  function handleSuccess($msg) {
    $success = array(
      'code' => 200,
      'message' => $msg
    );
    http_response_code(200);
    $response = $success;
    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
?>