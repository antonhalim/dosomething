var geocoder;
var map;
var schools;
getSchool();
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40.7903, -73.9597);
  var mapOptions = {
    zoom: 13,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // results[0].geometry.location["A"]
      // Display multiple schools on a map
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      // Loop through our array of markers & place each one on the map
      for( i = 0; i < schools.length; i++ ) {
        var position = new google.maps.LatLng(schools[i].lat, schools[i].lon);
        // latlng.extend(position);
        map.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: schools[i].name
        });

      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(schools[i].name);
          infoWindow.open(map, marker);
        }
      })(marker, i));
      // Automatically center the map fitting all markers on the screen
      // map.fitBounds(position);
      }
      //zipcode location on marker
      // map.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //     map: map,
      //     position: results[0].geometry.location
      // });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
