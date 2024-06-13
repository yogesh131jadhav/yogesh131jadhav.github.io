<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
      $condition = ' `isActive`="1" ';
      if (isset($_REQUEST["id"])) {
        $condition = $condition . " and `id`='".$_REQUEST["id"]."' ";
      }
      if (!isset($_REQUEST["past"])) {
        $condition = $condition . " and `endDate` >= CURDATE()";
      }
      $sql = "SELECT * FROM `tour` WHERE ". $condition;
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
      $sql = "INSERT INTO `tour` (
        `name`, 
        `totalSeats`, 
        `availableSeats`, 
        `boarding`, 
        `dropping`, 
        `bookingPrice`, 
        `price`, 
        `cgst`, 
        `sgst`, 
        `description`, 
        `startDate`, 
        `endDate`, 
        `guideId`, 
        `guideDetail`, 
        `image`, 
        `itenary`, 
        `groupTour`,
        `createdAt`, 
        `createdBy`) VALUES (
        '".$_POST["name"]."',
        '".$_POST["totalSeats"]."',
        '".$_POST["totalSeats"]."',
        '".$_POST["boarding"]."',
        '".$_POST["dropping"]."',
        '".$_POST["bookingPrice"]."',
        '".$_POST["price"]."',
        '".$_POST["cgst"]."',
        '".$_POST["sgst"]."',
        '".$_POST["description"]."',
        '".$_POST["startDate"]."',
        '".$_POST["endDate"]."',
        '".$_POST["guideId"]."',
        '".$_POST["guideDetail"]."',
        '".implode(', ', $_POST['image'])."',
        '".implode(', ', $_POST['itenary'])."',
        '".$_POST["groupTour"]."',
        '".$_POST["createdAt"]."',
        '".$_POST["createdBy"]."')";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        $insertId = mysqli_insert_id($conn);
        $tourDetail = array(
          "name" => $_POST["name"],
          "startDate" => $_POST["startDate"],
          "endDate" => $_POST["endDate"],
          "price" => $_POST["price"],
          "totalSeats" => $_POST["totalSeats"],
          "availableSeats" => $_POST["totalSeats"],
          "guideDetail" => $_POST["guideDetail"]
        );
        $sqlCreate = "INSERT INTO `expense` (
          `tourId`, 
          `tourDetail`, 
          `tourGuide`, 
          `expense`, 
          `createdAt`, 
          `createdBy`) VALUES (
          '".$insertId."',
          '".json_encode($tourDetail)."',
          '".$_POST["guideId"]."',
          'null',
          '".$_POST["createdAt"]."',
          '".$_POST["createdBy"]."')";
        // echo $sql; exit;
        if (mysqli_query($conn, $sqlCreate)) {
          print '[]';
        } else {
          handleError('Error while system action1');
        }
      } else {
        handleError('Error while system action2');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
      $sql = "UPDATE `tour` SET
      `name`='".$_POST['name']."',
      `totalSeats`='".$_POST['totalSeats']."',
      `availableSeats`='".$_POST['availableSeats']."',
      `boarding`='".$_POST['boarding']."',
      `dropping`='".$_POST['dropping']."',
      `bookingPrice`='".$_POST['bookingPrice']."',
      `price`='".$_POST['price']."',
      `cgst`='".$_POST['cgst']."',
      `sgst`='".$_POST['sgst']."',
      `description`='".$_POST['description']."',
      `startDate`='".$_POST['startDate']."',
      `endDate`='".$_POST['endDate']."',
      `guideId`='".$_POST['guideId']."',
      `guideDetail`='".$_POST['guideDetail']."',
      `image`='".implode(', ', $_POST['image'])."',
      `itenary`='".implode(', ', $_POST['itenary'])."',
      `groupTour`='".$_POST['groupTour']."',
      `updatedAt`='".$_POST['updatedAt']."',
      `updatedBy`='".$_POST['updatedBy']."'
       WHERE `id`='".$_POST["id"]."'";
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        $tourDetail = array(
          "name" => $_POST["name"],
          "startDate" => $_POST["startDate"],
          "endDate" => $_POST["endDate"],
          "price" => $_POST["price"],
          "totalSeats" => $_POST["totalSeats"],
          "availableSeats" => $_POST["totalSeats"],
          "guideDetail" => $_POST["guideDetail"]
        );
        $sqlCreate = "UPDATE `expense` SET `tourDetail` = '".json_encode($tourDetail)."' WHERE `tourId`='".$_POST["id"]."'";
        // echo $sql; exit;
        if (mysqli_query($conn, $sqlCreate)) {
          print '[]';
        } else {
          handleError('Error while system action1');
        }
      } else {
        handleError('Error while system action');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $parts = parse_url($_SERVER['REQUEST_URI']);
      parse_str($parts['query'], $query);
      $sql = "UPDATE `tour` SET 
      `isActive`='0'
      WHERE `id`='".$query['id']."' and `available` = `totalSeats`";
      if (mysqli_query($conn, $sql)) {
        $sql = "UPDATE `expense` SET 
        `isActive`='0'
        WHERE `tourId`='".$query['id']."'";
        if (mysqli_query($conn, $sql)) {
          print '[]';
        } else {
          handleError('Error while system action');
        }
      } else {
        handleError('Unable to delete tour due to registered tourist');
      }
      exit;
    } else {
      handleError('Wrong input action');
    }
  }
?>
