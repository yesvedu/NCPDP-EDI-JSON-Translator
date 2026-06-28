<?php

header("Content-Type: application/json");

// Sample history data
$history = [

    [
        "filename" => "claim1.edi",
        "date" => "2026-06-26 10:30:15",
        "status" => "Valid"
    ],

    [
        "filename" => "claim2.edi",
        "date" => "2026-06-26 11:15:42",
        "status" => "Valid"
    ],

    [
        "filename" => "claim3.edi",
        "date" => "2026-06-26 12:05:18",
        "status" => "Invalid"
    ]

];

// Return JSON response
echo json_encode($history);

?>