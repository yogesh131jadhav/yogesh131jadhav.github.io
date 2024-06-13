<?php
    $curl = curl_init();
    $_POST = json_decode(file_get_contents('php://input'), true);
    $merchantId = "SHREESADGURUTTONLINE";
    $transactionId = $_POST['transactionId'];
    $sha256 = hash('sha256', "/pg/v1/status/".$merchantId."/".$transactionId."191b77de-1064-453b-b9b1-a2e20ea4eb49");
    curl_setopt_array($curl, [
      CURLOPT_URL => "https://api.phonepe.com/apis/hermes/pg/v1/status/".$merchantId."/".$transactionId."",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "X-MERCHANT-ID: SHREESADGURUTTONLINE",
        "X-VERIFY: ".$sha256."###1",
        "accept: application/json"
      ],
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
      echo $response;
    }
?>
