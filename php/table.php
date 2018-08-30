<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/style.css?">
</head>

<body>
    <div class="navBar">
        <span id="logo">Sign Finder</span>

        <a href="php/table.php" id="mySigns">Table View</a>

    </div>
    <?php
// include 'xml_template.php';
include 'dbinfo.php';

// Create connection


$conn = new mysqli('localhost', $username, $password, $database);
// Check connection

$sql = "SELECT * FROM markers_icons";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>PICK UP DATE</th><th>TYPE</th><th>LAT</th><th>LNG</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row['pickup']. "</td><td>" . $row['type']. "</td><td>" . $row['lat']. "</td><td>" . $row['lng']. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>

</body>

</html>