<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/style.css?1">
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


    echo "<h3 class='tableTitle'>EXPIRED</h3><table class='tableView'><tr><th>PICK UP DATE</th><th>TYPE</th><th>LAT</th><th>LNG</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        
        
        
        echo "<tr><td class='expiredDate'>" . $row['pickup']. "</td><td><a href=\"delete.php?id=" . $row['id']. "\">Delete</a></td><td>" . $row['type']. "</td><td>" . $row['lat']. "</td><td>" . $row['lng']. "</td></tr>";
    }
    echo "</table>";
if ($result->num_rows <= 0) {
    echo "0 EXPIRED SIGNS";
}


    echo "<h3 class='tableTitle'>UPCOMING</h3><table class='tableView'><tr><th>PICK UP DATE</th><th>DELETE</th><th>TYPE</th><th>LAT</th><th>LNG</th></tr>";
    // output data of each row
    while($row = $fresult->fetch_assoc()) {
        
        
        
        echo "<tr><td>" . $row['pickup']. "</td><td><a href=\"delete.php?id=" . $row['id']. "\">Delete</a></td><td>" . $row['type']. "</td><td>" . $row['lat']. "</td><td>" . $row['lng']. "</td></tr>";
    }
    echo "</table>";
if ($fresult->num_rows <= 0) {
    echo "0 UPCOMING SIGNS";
}

$conn->close();
?>

</body>

</html>