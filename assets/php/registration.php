<?php
  include 'config.php';
  if(isset($_SERVER['REQUEST_METHOD'])) {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
      $condition = ' ((registration.isActive="1") OR (registration.isActive="0" and registration.booking="cancel") OR (registration.isActive="0" and registration.booking="refund"))';
      if (isset($_REQUEST["id"])) {
        $condition = $condition . " and (registration.id='".$_REQUEST["id"]."') ";
      }
      if (isset($_REQUEST["groupId"])) {
        $condition = $condition . " and (registration.groupId='".$_REQUEST["groupId"]."') ";
      }
      if (isset($_REQUEST["client"])) {
        $condition = $condition . " and (registration.clientId='".$_REQUEST["client"]."'  OR registration.createdBy='".$_REQUEST["client"]."') ";
      }
      if (isset($_REQUEST["clientId"])) {
        $condition = $condition . " and (registration.clientId='".$_REQUEST["clientId"]."') ";
      }
      if (isset($_REQUEST["tourId"])) {
        $condition = $condition . " and (registration.tourId='".$_REQUEST["tourId"]."') ";
      }
      if (isset($_REQUEST["maskContact"])) {
        // $condition = $condition . " and (`maskContact`='".$_REQUEST["maskContact"]."') ";
        $sql = "SELECT registration.*, client.primary FROM `registration` inner join client on registration.clientId = client.id and ". $condition;
      } else {
        $sql = "SELECT * FROM `registration` WHERE ". $condition;
      }
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
      $values = null;
      for ($i = 0; $i < count($_POST['members']); $i++) {
        $values = $values . "(
        '".$_POST['members'][$i]["tourId"]."',
        '".json_encode($_POST['members'][$i]["tourDetail"])."',
        '".$_POST['members'][$i]["groupId"]."',
        '".$_POST['members'][$i]["paymentStatus"]."',
        '".$_POST['members'][$i]["clientId"]."',
        '".json_encode($_POST['members'][$i]["clientDetail"])."',
        '".$_POST['members'][$i]["booking"]."',
        '".$_POST['members'][$i]["bookingDate"]."',
        '".$_POST['members'][$i]["bookingMode"]."',
        '".$_POST['members'][$i]["bookingTransactionDetail"]."',
        '".$_POST['members'][$i]["paid"]."',
        '".$_POST['members'][$i]["paidDate"]."',
        '".$_POST['members'][$i]["paidMode"]."',
        '".$_POST['members'][$i]["paidTransactionDetail"]."',
        '".$_POST['createdAt']."',
        '".$_POST['createdBy']."')";
        if ($i != count($_POST['members']) - 1) {
          $values = $values . ",";
        }
      }
      // echo $values; exit;
      $sql = "INSERT INTO `registration` (
        `tourId`, 
        `tourDetail`, 
        `groupId`, 
        `paymentStatus`, 
        `clientId`, 
        `clientDetail`, 
        `booking`, 
        `bookingDate`, 
        `bookingMode`, 
        `bookingTransactionDetail`, 
        `paid`, 
        `paidDate`, 
        `paidMode`, 
        `paidTransactionDetail`, 
        `createdAt`, 
        `createdBy`) VALUES " . $values;
      // echo $sql; exit;
      if (mysqli_query($conn, $sql)) {
        $tourSql = "select availableSeats from `tour` where id = '".$_POST['members'][0]["tourId"]."'";
        // echo $tourSql;exit;
        $tourResult = mysqli_query($conn, $tourSql);
        if (mysqli_num_rows($tourResult) > 0) {
          while($row = mysqli_fetch_assoc($tourResult)) {
              $rows[] = $row;
          }
          // echo $rows[0]['availableSeats'];exit;
          $updatedSeatCount = $rows[0]['availableSeats'] - count($_POST['members']);
          $sql = "UPDATE `tour` SET `availableSeats`='".$updatedSeatCount."' WHERE `id`='".$_POST['members'][0]["tourId"]."'";
          if (mysqli_query($conn, $sql)) {
            $expenseSql = "SELECT tourDetail FROM `expense` WHERE tourId='".$_POST['members'][0]["tourId"]."'";
            // echo $expenseSql; exit;
            $expenseResult = mysqli_query($conn, $expenseSql);
            if (mysqli_num_rows($expenseResult) > 0) {
              while($expenseRow = mysqli_fetch_assoc($expenseResult)) {
                $expenseRows[] = $expenseRow;
              }
              $tourDetail = json_decode($expenseRows[0]['tourDetail']);
              $tourDetail->availableSeats = $tourDetail->availableSeats - count($_POST['members']);
              $expenseSqlUpdate = "UPDATE `expense` SET `tourDetail`='".json_encode($tourDetail)."' WHERE tourId='".$_POST['members'][0]["tourId"]."'";
              // echo $expenseSqlUpdate;exit;
              if (mysqli_query($conn, $expenseSqlUpdate)) {
                print '[]';
              } else {
                handleError('Error while updatingtour details');
              }
            } else {
              handleError('Error while getting tour details');
            }
            exit;
          } else {
            handleError('Error while updating tour details');
          }
        } else {
          handleError('Error while fetching tour details');
        }
      } else {
        handleError('Error while registration1');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
      if(array_key_exists("transactionId", $_POST) && $_POST['transactionId']) {
        $sql = "UPDATE `registration` SET `isActive`='0' WHERE `booking`='".$_POST["transactionId"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'refund') {
        $sql = "UPDATE `registration` SET `isActive`='0', `booking`='refund', `paymentStatus`='refund' WHERE `id`='".$_POST["id"]."' and `tourId`='".$_POST["tourId"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'cancel') {
        $sql = "UPDATE `registration` SET `isActive`='0', `booking`='cancel', `paymentStatus`='cancel' WHERE `id`='".$_POST["id"]."' and `tourId`='".$_POST["tourId"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'discount') {
        $sql = "UPDATE `registration` SET `discount`='".$_POST["discount"]."' WHERE `id`='".$_POST["id"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'paidBank') {
        $sql = "UPDATE `registration` SET `paidAccount`='".$_POST["bank"]."' WHERE `id`='".$_POST["id"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'bookingBank') {
        $sql = "UPDATE `registration` SET `bookingAccount`='".$_POST["bank"]."' WHERE `id`='".$_POST["id"]."'";
      } else if(array_key_exists("action", $_POST) && $_POST['action'] == 'paidStatusChange') {
        $sql = "UPDATE `registration` SET `paymentStatus`='Paid', `paid`='".$_POST["bookingId"]."', `paidMode`='".$_POST["mode"]."', `paidTransactionDetail`='".$_POST["detail"]."', `paidAccount`='".$_POST["account"]."', `paidDate`='".$_POST["paidDate"]."' WHERE `id`='".$_POST["id"]."'";
      } else {
        $sql = "UPDATE `registration` SET
        `name`='".$_POST['name']."',
        `totalSeats`='".$_POST['totalSeats']."',
        `availableSeats`='".$_POST['availableSeats']."',
        `boarding`='".$_POST['boarding']."',
        `dropping`='".$_POST['dropping']."',
        `bookingPrice`='".$_POST['bookingPrice']."',
        `price`='".$_POST['price']."',
        `description`='".$_POST['description']."',
        `startDate`='".$_POST['startDate']."',
        `endDate`='".$_POST['endDate']."',
        `guideId`='".$_POST['guideId']."',
        `guideDetail`='".$_POST['guideDetail']."',
        `image`='".implode(', ', $_POST['image'])."',
        `itenary`='".implode(', ', $_POST['itenary'])."',
        `updatedAt`='".$_POST['updatedAt']."',
        `updatedBy`='".$_POST['updatedBy']."',
         WHERE `id`='".$_POST["id"]."'";
      }
      // echo $sql; exit;
      $result = mysqli_query($conn, $sql);
      if ($result) {
        $affectedRows = mysqli_affected_rows($conn);
        if ($_POST['action'] == 'cancel') {
          $updateTourSql = "UPDATE `tour` SET `availableSeats`=availableSeats + ". $affectedRows." WHERE `id`='".$_POST["tourId"]."'";
          // echo $updateTourSql; exit;
          if (mysqli_query($conn, $updateTourSql)) {
            $expenseSql = "SELECT tourDetail FROM `expense` WHERE tourId='".$_POST["tourId"]."'";
            // echo $expenseSql; exit;
            $expenseResult = mysqli_query($conn, $expenseSql);
            if (mysqli_num_rows($expenseResult) > 0) {
              while($expenseRow = mysqli_fetch_assoc($expenseResult)) {
                $expenseRows[] = $expenseRow;
              }
              $tourDetail = json_decode($expenseRows[0]['tourDetail']);
              $tourDetail->availableSeats = $tourDetail->availableSeats + $affectedRows;
              $expenseSqlUpdate = "UPDATE `expense` SET `tourDetail`='".json_encode($tourDetail)."' WHERE tourId='".$_POST["tourId"]."'";
              // echo $expenseSqlUpdate;exit;
              if (mysqli_query($conn, $expenseSqlUpdate)) {
                print '[]';
              } else {
                handleError('Error while updatingtour details');
              }
            } else {
              handleError('Error while getting tour details');
            }
          } else {
            handleError('Error while updating available seats');
          }
        } else {
          print '[]';
        }
      } else {
        handleError('Error while updating registration');
      }
      exit;
    } else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      $parts = parse_url($_SERVER['REQUEST_URI']);
      parse_str($parts['query'], $query);
      $sql = "UPDATE `registration` SET `isActive`='0' WHERE `id`='".$query['id']."'";
      if (mysqli_query($conn, $sql)) {
        $affectedRows = mysqli_affected_rows($conn);
        $updateTourSql = "UPDATE `tour` SET `availableSeats`=availableSeats + ". $affectedRows." WHERE `id`='".$query["tourId"]."'";
        // echo $updateTourSql; exit;
        if (mysqli_query($conn, $updateTourSql)) {
          $expenseSql = "SELECT tourDetail FROM `expense` WHERE tourId='".$query["tourId"]."'";
          // echo $expenseSql; exit;
          $expenseResult = mysqli_query($conn, $expenseSql);
          if (mysqli_num_rows($expenseResult) > 0) {
            while($expenseRow = mysqli_fetch_assoc($expenseResult)) {
              $expenseRows[] = $expenseRow;
            }
            $tourDetail = json_decode($expenseRows[0]['tourDetail']);
            $tourDetail->availableSeats = $tourDetail->availableSeats + $affectedRows;
            $expenseSqlUpdate = "UPDATE `expense` SET `tourDetail`='".json_encode($tourDetail)."' WHERE tourId='".$query["tourId"]."'";
            // echo $expenseSqlUpdate;exit;
            if (mysqli_query($conn, $expenseSqlUpdate)) {
              print '[]';
            } else {
              handleError('Error while updatingtour details');
            }
          } else {
            handleError('Error while getting tour details');
          }
        } else {
          handleError('Error while updating available seats');
        }
      } else {
        handleError('Error while deleting registration');
      }
      exit;
    } else {
      echo 'Wrong Input';
    }
  }
?>
