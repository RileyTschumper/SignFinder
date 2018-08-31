<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/style.css?">
</head>

<body>
    <div class="navBar">
        <a href="../index.html" id="logo">Sign Finder</a>

        <a id="mySigns">Table View</a>

    </div>
    <?php
// include 'xml_template.php';
include 'dbinfo.php';

// Create connection


$conn = new mysqli('localhost', $username, $password, $database);
// Check connection

$sql = "SELECT * FROM markers_icons WHERE cast(pickup as date) < CURDATE()  ORDER BY cast(pickup as date) asc";


$future = "SELECT * FROM markers_icons WHERE cast(pickup as date) > CURDATE() ORDER BY cast(pickup as date) asc";

$result = $conn->query($sql);

$fresult = $conn->query($future);

if ($result->num_rows > 0) {
    echo "<h3 class='tableTitle'>EXPIRED</h3><table class='tableView'><tr><th>PICK UP DATE</th><th>TYPE</th><th>LAT</th><th>LNG</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        
        
        echo strtotime($pickup);
        echo "<tr><td class='expiredDate'>" . $row['pickup']. "</td><td>" . $row['type']. "</td><td>" . $row['lat']. "</td><td>" . $row['lng']. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

if ($fresult->num_rows > 0) {
    echo "<h3 class='tableTitle'>UPCOMING</h3><table class='tableView'><tr><th>PICK UP DATE</th><th>TYPE</th><th>LAT</th><th>LNG</th></tr>";
    // output data of each row
    while($row = $fresult->fetch_assoc()) {
        
        
        echo strtotime($pickup);
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