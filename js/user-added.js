var map;
var marker;
var formwindow;
var messagewindow;

//Initializes map
function initMap() {

	//map location variable
	var california = {lat: 37.4419, lng: -122.1419};

	//creates new Map object, displayed at the div with id='map'
	map = new google.maps.Map(document.getElementById('map'), {
	    center: california,
	    zoom: 13
	});

	//creates an InfoWindow object
	formwindow = new google.maps.InfoWindow({
	    content: document.getElementById('form')
	});
	messagewindow = new google.maps.InfoWindow({
	    content: document.getElementById('message')
	});

	//adds an event listenter to the map, which performs the function on-click
	google.maps.event.addListener(map, 'click', function(event) {
		//adds a marker at the position of the click event on map
	    marker = new google.maps.Marker({
	        position: event.latLng,
	        map: map
		});

	    //opens formwindow if marker is clicked on
		google.maps.event.addListener(marker, 'click', function() {
	        formwindow.open(map, marker);
	    });
	});
}

function saveData() {
	//stores each input value as variable
	var name = escape(document.getElementById('name').value);
	var address = escape(document.getElementById('address').value);
	var type = document.getElementById('type').value;
	var latlng = marker.getPosition();
	//creates a URL with 5 parameters to $_GET in php
	var url = 'http://localhost/SignFinder/php/add-data.php?name=' + name + '&address=' + address + 
				'&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();


	downloadUrlUserAdd(url, function(data, responseCode) {
		//if request was fullfilled
	    if (responseCode == 200 && data.length <= 1) {
	    	//close infowidow and open "Location Saved" window
	        formwindow.close();
	        messagewindow.open(map, marker);
	    }
	});
}

function downloadUrlUserAdd(url, callback) {
	var request = window.ActiveXObject ?
	    new ActiveXObject('Microsoft.XMLHTTP') :
	    new XMLHttpRequest;

	request.onreadystatechange = function() {
	    if (request.readyState == 4) {
	        request.onreadystatechange = doNothing;
	        callback(request.responseText, request.status);
	    }
	};

	request.open('GET', url, true);
	request.send(null);
}

function doNothing () {}