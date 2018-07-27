<?php
include 'dbinfo.php';

$name = $_GET['name'];
$address = $_GET['address'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$type = $_GET['type'];

$mysqli = new mysqli('localhost', $username, $password, $database);

// Inserts new row with place data.
// sprintf returns a formatted string
$query = sprintf("INSERT INTO markers " .
         " (id, name, address, lat, lng, type ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s', '%s');",
         $mysqli->real_escape_string($name),
         $mysqli->real_escape_string($address),
         $mysqli->real_escape_string($lat),
         $mysqli->real_escape_string($lng),
         $mysqli->real_escape_string($type));

$result = $mysqli->query($query);

if (!$result) {
  die('Invalid query: ' . mysqli_error());
}

?>