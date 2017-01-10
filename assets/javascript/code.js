var state = "";
var city = "";
var temperature;
var location;
var weather;
var icon;

function initMap() {
	//300 atrium drive 
	//Somerset, NJ
  var myLatLng = {lat: 40.5354340, lng: -74.5212870};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: 'pool-icon.png',
    title: 'Hello World!'
  });
}


function getWeather(){
	//var apiKey = "11e28d64554d3afa";
	var queryURL = "http://api.wunderground.com/api/11e28d64554d3afa/conditions/q/" + state + "/" +city+".json";
	$.ajax({
        url: queryURL,
        method: "GET"
      })
	  .done(function(response) {
	    console.log(response);

	    icon = response.current_observation.icon_url;
	    temperature = response.current_observation.dewpoint_string;
	    weather = response.current_observation.weather;
	    console.log(weather);
	    
	    console.log(temperature);
	   
	    //$('#location').text(location);
	    $('#icon').text(icon);
	    $('#weather').text(weather);
	    $('#temperature').text("Temperature: " + temperature);

	}); 
}


function getMap() {
	var div = $('<div>').attr('id', 'map');
	$('body').append(div);
	initMap();
}


$("#search").on("click", function() {
  state = $("#state").val().trim();
  city = $("#city").val().trim();
  console.log(state);
  console.log(city);
  getMap();
  getWeather();
  $("#query-result").removeClass("hidden");

  return false;
});

