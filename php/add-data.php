<?php
include 'dbinfo.php';

$placedDate = $_GET['placedDate'];
$pickupDate = $_GET['pickupDate'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$signType = $_GET['signType'];
$info = $_GET['info'];

$mysqli = new mysqli('localhost', $username, $password, $database);

// Inserts new row with place data.
// sprintf returns a formatted string
$query = sprintf("INSERT INTO markers_icons " .
         " (id, placed, pickup, type, info, lat, lng ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s', '%s', '%s');",
         $mysqli->real_escape_string($placedDate),
         $mysqli->real_escape_string($pickupDate),
         $mysqli->real_escape_string($signType),
         $mysqli->real_escape_string($info),
         $mysqli->real_escape_string($lat),
         $mysqli->real_escape_string($lng));

$result = $mysqli->query($query);

if (!$result) {
  die('Invalid query: ' . mysqli_error());
}

?>