<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
      $condition = ' `isActive`="1" ';
      if (isset($_REQUEST["id"])) {
        $condition = $condition . " and `id`='".$_REQUEST["id"]."' ";
      }
      if($authToken == '321') {
        $condition = $condition . " and `tourGuide`='".$userId."' ";
      }
      $sql = "SELECT * FROM `expense` WHERE ". $condition;
      // echo $sql; exit;
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
          $rows[] = $row;
        }
        print json_encode($rows);
      } else {
        print '[]';
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
      $sql = "UPDATE `expense` SET `tourDetail`='".json_encode($_POST['tourDetail'])."', `expense`='".json_encode($_POST['expense'])."' WHERE `id`='".$_POST["id"]."'";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while creating Expense Record');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $parts = parse_url($_SERVER['REQUEST_URI']);
      parse_str($parts['query'], $query);
      $sql = "UPDATE `expense` SET `isActive`='0' WHERE `id`='".$query['id']."'";
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while deleting Expense Record');
      }
      exit;
    } else {
      echo 'Wrong Input';
    }
  }
?>
