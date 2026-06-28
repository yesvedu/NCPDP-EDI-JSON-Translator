<?php

header("Content-Type: application/json");

require_once("../database/db.php");
require_once("../parser/parse.php");
require_once("../parser/validate.php");
require_once("../parser/intelligent.php");

$uploadDir = "../uploads/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!isset($_FILES["ediFile"])) {

    echo json_encode([
        "success" => false,
        "message" => "No file uploaded."
    ]);

    exit();
}

$file = $_FILES["ediFile"];

$extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

if ($extension != "edi" && $extension != "txt") {

    echo json_encode([
        "success" => false,
        "message" => "Only .edi and .txt files are allowed."
    ]);

    exit();
}

$newFileName = time() . "_" . basename($file["name"]);

$destination = $uploadDir . $newFileName;

if (!move_uploaded_file($file["tmp_name"], $destination)) {

    echo json_encode([
        "success" => false,
        "message" => "Upload failed."
    ]);

    exit();
}

// Read uploaded EDI
$ediText = file_get_contents($destination);

// Parse
$parsed = parseEDI($ediText);

// Validate
$validation = validateEDI($parsed);

// Convert to readable JSON
$json = convertReadable($parsed);

// Save JSON file
$jsonFileName = pathinfo($newFileName, PATHINFO_FILENAME) . ".json";

$jsonPath = $uploadDir . $jsonFileName;

file_put_contents(
    $jsonPath,
    json_encode($json, JSON_PRETTY_PRINT)
);

// Status
$status = $validation["valid"] ? "Valid" : "Invalid";

// Save to database
$stmt = $conn->prepare("INSERT INTO translation_history(filename,json_file,status) VALUES(?,?,?)");

$stmt->bind_param(
    "sss",
    $newFileName,
    $jsonFileName,
    $status
);

$stmt->execute();

$stmt->close();

$conn->close();

// Return response
echo json_encode([


"success"=>true,

"filename"=>$newFileName,

"jsonFile"=>$jsonFileName,

"status"=>$status,

"validation"=>$validation

]);

?>