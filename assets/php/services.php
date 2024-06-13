<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
      $condition = ' `isActive`="1" ';
      if (isset($_REQUEST["id"])) {
        $condition = $condition . " and `id`='".$_REQUEST["id"]."' ";
      }
      if (isset($_REQUEST["clientId"])) {
        $condition = $condition . " and (clientId='".$_REQUEST["clientId"]."') ";
      }
      if (isset($_REQUEST["tourId"])) {
        $condition = $condition . " and (tourId='".$_REQUEST["tourId"]."') ";
      }
      $sql = "SELECT * FROM `service` WHERE ". $condition;
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
    } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
      $sql = "INSERT INTO `service` (
        `tourId`,
        `tourDetails`,
        `clientId`,
        `clientDetails`,
        `service`,
        `cost`,
        `createdAt`,
        `createdBy`) VALUES (
        '".$_POST["tourId"]."',
        '".$_POST["tourDetails"]."',
        '".$_POST["clientId"]."',
        '".$_POST["clientDetails"]."',
        '".$_POST["service"]."',
        '".$_POST["cost"]."',
        '".$_POST["createdAt"]."',
        '".$_POST["createdBy"]."')";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while system action');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
      $sql = "UPDATE `service` SET
      `tourId`='".$_POST['tourId']."',
      `clientId`='".$_POST['clientId']."',
      `service`='".$_POST['service']."',
      `cost`='".$_POST['cost']."',
      `updatedAt`='".$_POST['updatedAt']."',
      `updatedBy`='".$_POST['updatedBy']."'
       WHERE `id`='".$_POST["id"]."'";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while system action');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $parts = parse_url($_SERVER['REQUEST_URI']);
      parse_str($parts['query'], $query);
      $sql = "UPDATE `service` SET `isActive`='0' WHERE `id`='".$query['id']."'";
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Unable to delete service due to registered tourist');
      }
      exit;
    } else {
      handleError('Wrong input action');
    }
  }
?>
