<?php

include 'dbinfo.php';
$conn = mysqli_connect('localhost', $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$del= $_GET["id"];

// sql to delete a record
$sql = "DELETE FROM markers_icons WHERE id= $del"; 



if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();

header("Location: table.php");
?>

