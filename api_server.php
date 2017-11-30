<?php
$host = '';
$user = '';
$pass = '';
$db = '';

$mysqli = new mysqli($host, $user, $pass, $db);

$sql = "";

$results_array = [];

while ($row = $results->fetch_assoc()) {
  array_push($results_array, $row);
}

echo json_decode($results_array);
?>