<?php
  include 'config.php';
  $sql = "SELECT id, role, fullName, contact FROM `user` WHERE `isActive`='1' and `username`='".$_POST["name"]."' and `password`='".$_POST["pass"]."'";
  // echo $sql; exit;
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
    }
    $userData = array(
      'id' => $rows[0]['id'],
      'time' => $rows[0]['role'],
      'fullName' => $rows[0]['fullName'],
      'contact' => $rows[0]['contact']
    );
    print json_encode($userData);
  } else {
    handleError('No such user found in system');
  }
  exit;
?>
