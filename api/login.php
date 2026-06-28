<?php

header("Content-Type: application/json");

require_once("../database/db.php");

$username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
$password = isset($_POST["password"]) ? trim($_POST["password"]) : "";

if ($username == "" || $password == "") {

    echo json_encode([
        "success" => false,
        "message" => "Please enter username and password."
    ]);

    exit();
}

$sql = "SELECT * FROM users WHERE username = ? AND password = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("ss", $username, $password);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "success" => true,
        "message" => "Login Successful"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Invalid Username or Password"
    ]);

}

$stmt->close();

$conn->close();

?>