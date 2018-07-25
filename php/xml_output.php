<?php

include 'xml_template.php';
include 'dbinfo.php';

$mysqli = new mysqli('localhost', $username, $password, $database);

// Select all the rows in the markers table
$query= "SELECT * FROM markers WHERE 1";
$result = $mysqli->query($query);

if (!$result) {
  die('Invalid query: ' . mysqli_error());
}


//creates a new SimpleXMLElement
$markers = new SimpleXMLElement($xmlstr);

// Iterate through the rows, adding XML nodes for each

while ($row = @mysqli_fetch_assoc($result)){
  // Add to XML document node
	$marker = $markers->addChild('marker');
	
	$marker->addAttribute('id', $row['id']);
	$marker->addAttribute('name', $row['name']);
	$marker->addAttribute('address', $row['address']);
	$marker->addAttribute('lat', $row['lat']);
	$marker->addAttribute('lng', $row['lng']);
	$marker->addAttribute('type', $row['type']);

}

header('Content-Type: text/xml'); 
echo $markers->asXML();
?>