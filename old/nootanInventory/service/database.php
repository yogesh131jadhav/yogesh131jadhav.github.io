<?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "inventorymanagement";

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  
  /*$mysqli = new mysqli("localhost","root","","inventorymanagement");
  if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
  }*/
?>