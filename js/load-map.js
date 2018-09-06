var customLabel = {
  restaurant: {
    label: "R"
  },
  bar: {
    label: "B"
  }
};

var customIcon = {
  cone: {
    iconURL: "icons/cone.png"
  },
  closure: {
    iconURL: "icons/closure.png"
  },
  worker: {
    iconURL: "icons/worker.png"
  }
};

var map;
var marker;
var formwindow;
var messagewindow;

function initMap() {
  //map location variable
  var california = { lat: 0, lng: 0 };

  //creates new Map object, displayed at the div with id='map'

  map = new google.maps.Map(document.getElementById("map"), {
    center: california,
    zoom: 13
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      map.setCenter(initialLocation);
    });
  }

  downloadUrlDataAdd("php/xml_output.php", function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    Array.prototype.forEach.call(markers, function(markerElem) {
      var id = markerElem.getAttribute("id");
      var placed = markerElem.getAttribute("placed");
      var pickup = markerElem.getAttribute("pickup");
      var type = markerElem.getAttribute("type");
      var info = markerElem.getAttribute("info");
      var point = new google.maps.LatLng(
        parseFloat(markerElem.getAttribute("lat")),
        parseFloat(markerElem.getAttribute("lng"))
      );

      addMarker(type, point, pickup, info);
    });
  });

  /*
  //creates an InfoWindow object
  formwindow = new google.maps.InfoWindow({
    content: document.getElementById("form")
  });
  */
  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById("message")
  });

  addIconListeners();
}

function addIconListeners() {
  var cone = document.getElementById("cone");
  var worker = document.getElementById("worker");
  var closure = document.getElementById("closure");

  cone.onclick = function() {
    addMapListener("Traffic Cone", "icons/cone.png");
  };
  worker.onclick = function() {
    addMapListener("Workers Present", "icons/worker.png");
  };
  closure.onclick = function() {
    addMapListener("Road Closure", "icons/closure.png");
  };
}

function addMarker(type, point, pickup, info) {
  var infoWindow = new google.maps.InfoWindow();

  //Creates content for info window
  var infowincontent = document.createElement("div");
  var strong = document.createElement("strong");
  strong.textContent = getLongHand(type);
  infowincontent.appendChild(strong);

  infowincontent.appendChild(document.createElement("br"));

  var pickupText = document.createElement("text");
  pickupText.textContent = "Pickup Date: " + pickup;
  infowincontent.appendChild(pickupText);

  infowincontent.appendChild(document.createElement("br"));

  var text = document.createElement("text");
  text.textContent = "Notes: " + info;
  infowincontent.appendChild(text);

  //adds marker with custom icon
  var icon = customIcon[type] || {};
  var marker = new google.maps.Marker({
    map: map,
    position: point,
    icon: icon.iconURL
  });
  marker.addListener("click", function() {
    infoWindow.setContent(infowincontent);
    infoWindow.open(map, marker);
  });
}

function getShortHand(longHand) {
  var typeMap = new Map();

  typeMap.set("Traffic Cone", "cone");
  typeMap.set("Workers Present", "worker");
  typeMap.set("Road Closure", "closure");

  return typeMap.get(longHand);
}

function getLongHand(shortHand) {
  var typeMap = new Map();

  typeMap.set("cone", "Traffic Cone");
  typeMap.set("worker", "Workers Present");
  typeMap.set("closure", "Road Closure");

  return typeMap.get(shortHand);
}

//adds an event listenter to the map, which performs the function on-click
function addMapListener(iconType, iconLocation) {
  console.log("listening on map");
  google.maps.event.addListener(map, "click", function(event) {
    //adds a marker at the position of the click event on map
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      icon: iconLocation
    });
    //Only allows the user to place down one marker before clearing listener
    google.maps.event.clearInstanceListeners(map);

    //automatically opens form window when icon is placed down
    /* ********************************************************************************** */
    openFormWindow(map, marker);

    console.log("after openFromWindow");

    //adds current time and date to form
    //Bug: Doesn't use the users timezone. Checkout moment.js library for possible fix
    var d = new Date();
    console.log(d.toUTCString());

    //adds date place to form
    document.getElementById("date_placed").innerHTML = d.toUTCString();

    //adds sign type to form
    document.getElementById("sign_type").innerHTML = iconType;

    console.log(document.getElementById("form"));
  });
}

function deleteMarker() {
  //clears marker from the map
  marker.setMap(null);

  //cancels the map listener that causes an alert for not saving or canceling
  google.maps.event.clearInstanceListeners(map);
}

function saveData() {
  //stores each input value as variable
  var placedDate = document.getElementById("date_placed").innerHTML;
  var pickupDate = escape(document.getElementById("pickup_date").value);
  var pickupDateArray = pickupDate.split("/");
  var pickupDate1 =
    pickupDateArray[2] + "-" + pickupDateArray[0] + "-" + pickupDateArray[1];
  console.log(pickupDate1);
  var signType = getShortHand(document.getElementById("sign_type").innerHTML);
  console.log(signType);
  var additionalInfo = escape(document.getElementById("additional_info").value);
  var latlng = marker.getPosition();
  //creates a URL with 5 parameters to $_GET in php
  var url =
    "http://localhost/SignFinder/php/add-data.php?placedDate=" +
    placedDate +
    "&pickupDate=" +
    pickupDate1 +
    "&signType=" +
    signType +
    "&info=" +
    additionalInfo +
    "&lat=" +
    latlng.lat() +
    "&lng=" +
    latlng.lng();

  downloadUrlUserAdd(url, function(data, responseCode) {
    if (responseCode == 200 && data.length <= 1) {
      //close infowidow and open "Location Saved" window
      formwindow.close();
      messagewindow.open(map, marker);
    }
  });

  //cancels the map listener that causes an alert for not saving or canceling
  google.maps.event.clearInstanceListeners(map);

  //Reloads map
  window.location.reload(true);
}

function openFormWindow(googleMap, theMarker) {
  console.log("Inside openFormWindow");

  //console.log(document.getElementById("form"));

  formwindow = new google.maps.InfoWindow({
    content: document.getElementById("form")
  });

  console.log("after formwindow =");

  formwindow.open(googleMap, theMarker);

  console.log("after formwindow.open");

  google.maps.event.addListener(map, "click", function(event) {
    //adds a marker at the position of the click event on map
    alert("You must save or cancel marker");
  });
}

function downloadUrlDataAdd(url, callback) {
  var request = window.ActiveXObject
    ? new ActiveXObject("Microsoft.XMLHTTP")
    : new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open("GET", url, true);
  request.send(null);
}

function downloadUrlUserAdd(url, callback) {
  var request = window.ActiveXObject
    ? new ActiveXObject("Microsoft.XMLHTTP")
    : new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open("GET", url, true);
  request.send(null);
}

function doNothing() {}
