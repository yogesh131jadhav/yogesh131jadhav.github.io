<?php 
  // print_r($_FILES);exit;
  include 'config.php';
  $targetDir = "./uploads/"; // The directory where you want to store uploaded files
  $uploadedFile = $targetDir . basename($_FILES["file"]["name"]);
  // echo json_encode($_FILES); exit;
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($uploadedFile, PATHINFO_EXTENSION));
  $allowedFileType = ["pdf","jpg","png","jpeg"];

  // Check if file already exists
  if (file_exists($uploadedFile)) {
    $uploadOk = 0;
    handleError('File already exists');
  }
  // echo $uploadedFile; exit;
  
  // Check file size (in this example, maximum file size is set to 2MB)
  if ($_FILES["file"]["size"] > 2 * 1024 * 1024) {
    $uploadOk = 0;
    handleError('File is too large');
  }

  // Allow only certain file types (e.g., images, pdf)
  if (!in_array($imageFileType, $allowedFileType)) {
    $uploadOk = 0;
    handleError('Only JPG, JPEG, PNG and PDF files are allowed');
  }

  if ($uploadOk == 0) {
    handleError('File could not be uploaded');
  } else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $uploadedFile)) {
      handleSuccess("./assets/php/uploads/".basename($_FILES["file"]["name"]));
    } else {
      handleError('Error uploading file');
    }
  }
?>