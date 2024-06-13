<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
      $condition = ' `isActive`="1" ';
      if (isset($_REQUEST["id"])) {
        $condition = $condition . " and `id`='".$_REQUEST["id"]."' ";
      }
      $sql = "SELECT 
        `id`,
        `fname`,
        `mname`,
        `lname`,
        `sl1`,
        `sl2`,
        `sl3`,
        `state`,
        `city`,
        `pin`,";
      if (isset($_REQUEST["maskContact"])) {
        $sql = $sql . "`primary`, `emergency`, `whatsapp`,";
      } else {
        $sql = $sql . "CONCAT('XXXXXX', SUBSTRING(`primary`, 7, 4)) AS `primary`,
        CONCAT('XXXXXX', SUBSTRING(`emergency`, 7, 4)) AS `emergency`,
        CONCAT('XXXXXX', SUBSTRING(`whatsapp`, 7, 4)) AS `whatsapp`,";
      }
        $sql = $sql . "`email`,
        `dob`,
        `sex`,
        `idPhoto`,
        `aadhar`,
        `isActive` 
        FROM `client` WHERE ". $condition;
      // echo $sql;exit;
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
      $validateSql = "SELECT id FROM `client` WHERE `fname`='".$_POST["fname"]."' and `mname`='".$_POST["mname"]."' and `lname`='".$_POST["lname"]."' and `primary`='".$_POST["primary"]."' and `isActive`='1'";
      $validateResult = $conn->query($validateSql);
      if ($validateResult->num_rows > 0) {
          handleError('Duplicate Record');
      } else {
        $sql = "INSERT INTO `client` (
          `fname`,
          `mname`,
          `lname`,
          `sl1`,
          `sl2`,
          `sl3`,
          `state`,
          `city`,
          `pin`,
          `primary`,
          `emergency`,
          `whatsapp`,
          `email`,
          `dob`,
          `sex`,
          `idPhoto`,
          `aadhar`,
          `createdAt`, 
          `createdBy`) VALUES (
          '".$_POST["fname"]."',
          '".(isset($_POST["mname"]) ? $_POST["mname"] : '')."',
          '".$_POST["lname"]."',
          '".$_POST["sl1"]."',
          '".(isset($_POST["sl2"]) ? $_POST["sl2"] : '')."',
          '".(isset($_POST["sl3"]) ? $_POST["sl3"] : '')."',
          '".$_POST["state"]."',
          '".$_POST["city"]."',
          '".$_POST["pin"]."',
          '".$_POST["primary"]."',
          '".(isset($_POST["emergency"]) ? $_POST["emergency"] : '')."',
          '".$_POST["whatsapp"]."',
          '".(isset($_POST["email"]) ? $_POST["email"] : '')."',
          '".$_POST["dob"]."',
          '".$_POST["sex"]."',
          '".(isset($_POST["idPhoto"]) ? implode(', ', $_POST["idPhoto"]) : '')."',
          '".(isset($_POST["aadhar"]) ? implode(', ', $_POST["aadhar"]) : '')."',
          '".$_POST["createdAt"]."',
          '".$_POST["createdBy"]."')";
        /// echo $sql; exit;
        if (mysqli_query($conn, $sql)) {
          print '[]';
        } else {
          handleError('Error while creating client');
        }
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
      $sql = "UPDATE `client` SET
      `fname`='".$_POST['fname']."',
      `mname`='".$_POST['mname']."',
      `lname`='".$_POST['lname']."',
      `sl1`='".$_POST['sl1']."',
      `sl2`='".$_POST['sl2']."',
      `sl3`='".$_POST['sl3']."',
      `state`='".$_POST['state']."',
      `city`='".$_POST['city']."',
      `pin`='".$_POST['pin']."',
      `primary`='".$_POST['primary']."',
      `emergency`='".$_POST['emergency']."',
      `whatsapp`='".$_POST['whatsapp']."',
      `email`='".$_POST['email']."',
      `dob`='".$_POST['dob']."',
      `sex`='".$_POST['sex']."',
      `idPhoto`='".implode(', ', $_POST["idPhoto"])."',
      `aadhar`='".implode(', ', $_POST["aadhar"])."',
      `updatedAt`='".$_POST['updatedAt']."',
      `updatedBy`='".$_POST['updatedBy']."'
       WHERE `id`='".$_POST["id"]."'";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while updating client');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $parts = parse_url($_SERVER['REQUEST_URI']);
      parse_str($parts['query'], $query);
      $sql = "UPDATE `client` SET 
      `isActive`='0'
      WHERE `id`='".$query['id']."'";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        print '[]';
      } else {
        handleError('Error while deleting client');
      }
      exit;
    } else {
      handleError('Wrong Input');
    }
  }
?>
