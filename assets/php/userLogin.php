<?php
  include 'config.php';
  $sql = "SELECT * FROM `client` WHERE `isActive`='1' and LOWER(`fname`)='".strtolower($_POST["name"])."' and `dob`='".$_POST["dob"]."' and `primary`='".$_POST["contact"]."'";
  // echo $sql; exit;
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
    }
    print json_encode($rows[0]);
  } else {
    handleError('Invalid username or password');
  }
  exit;
?>
