<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        /*$condition = ' `is_active`="1" ';
        if (isset($_REQUEST["name"])) {
          $condition = $condition . " and `name` like '%".$_REQUEST["name"]."%' ";
        }
        // $condition = $condition . " and `tourDate` >= CURDATE() and `availableSeats` > '0' ORDER BY tourDate";
        $condition = $condition . " and `tourDate` >= CURDATE() ORDER BY tourDate DESC";
        $sql = "SELECT `name`, `noOfSeats`, `availableSeats`, `tourDate`, `tourEndDate` FROM `tourMasters` WHERE ". $condition;
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
          print json_encode($rows);
        } else {
          print '[]';
        }
        exit;*/
        $condition = ' `isActive`="1" ';
        if (isset($_REQUEST["name"])) {
          $condition = $condition . " and `name` like '%".$_REQUEST["name"]."%' ";
        }
        // $condition = $condition . " and `tourDate` >= CURDATE() and `availableSeats` > '0' ORDER BY tourDate";
        $condition = $condition . " and `startDate` >= CURDATE() ORDER BY startDate ASC";
        $sql = "SELECT `name`, `totalSeats`, `availableSeats`, `startDate`, `endDate`, `description`, `itenary`, `price`, `image` FROM `tour` WHERE ". $condition;
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
    } else {
      echo 'Wrong Input';
    }
  }
?>
