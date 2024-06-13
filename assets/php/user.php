<?php
  include 'config.php';
  if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $condition = ' `isActive`="1" ';
    if (isset($_REQUEST["id"])) {
      $condition = $condition . " and `id`='".$_REQUEST["id"]."' ";
    }
    if (isset($_REQUEST["role"])) {
      $condition = $condition . " and `role`='".$_REQUEST["role"]."' ";
    }
    $sql = "SELECT id, fullName, contact FROM `user` WHERE ". $condition;
    // echo $sql; exit;
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
      }
      print json_encode($rows);
    } else {
      handleError('Error while system action');
    }
    exit;
  }
?>
