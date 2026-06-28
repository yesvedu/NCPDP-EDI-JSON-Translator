<?php

header("Content-Type: application/json");

if(!isset($_GET["file"])){

echo json_encode([]);

exit();

}

$file="../uploads/".$_GET["file"];

if(file_exists($file)){

echo file_get_contents($file);

}else{

echo json_encode([]);

}

?>