var state = "";
var city = "";
var temperature;
var location;
var weather;
var icon;


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

// $("#state").val('FL');
// $("#city").val('Miami');


/*function getMap(){
	var queryURL = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBPidPaBR5dgPFkxsPfkRvkLE1fFp48FX8";
	$.ajax({
        url: queryURL,
        method: "GET"
      })
	  .done(function(response) {
	    console.log(response);

	});
}

getMap();*/

function getMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(51.5, -0.2), 
    zoom: 10
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);
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

