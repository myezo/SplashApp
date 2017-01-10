var state = "";
var city = "";
var temperature;
var location;
var weather;
var icon;


var config = {
    apiKey: "AIzaSyBL9F1hDCmBKBCxcVdsajNopvQaLKzW4u4",
    authDomain: "splash-7a2d3.firebaseapp.com",
    databaseURL: "https://splash-7a2d3.firebaseio.com",
    storageBucket: "splash-7a2d3.appspot.com",
    messagingSenderId: "689193631677"
  };

  firebase.initializeApp(config);


function initMap() {
  //300 atrium drive 
  //Somerset, NJ
  var myLatLng = {lat: 40.5354340, lng: -74.5212870};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
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


function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Miami, Florida';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

function showResult(result) {
    console.log(result.geometry.location.lat());
    console.log(result.geometry.location.lng());
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



$('#submit').on("click", function(){
	
	var address;
	var cityState;
	var numGuests;
	var times;
	var water;
	var poolTemp;
	var cost;
	var comments;
	var latitude;
	var longitude;

	address = $("#address").val().trim();
    cityState = $("#cityState").val().trim();
    numGuests = $("#numGuests").val().trim();
    times = $("#poolTime").val().trim();
    water = $("#waterType").val().trim();
    poolTemp = $("#temperature").val().trim();
    cost = $("#cost").val().trim();
    comments = $("#comments").val().trim();

    getLatitudeLongitude(address);

    console.log(address);
    console.log(cityState);
    console.log(numGuests);
    console.log(times);
    console.log(water);
    console.log(poolTemp);
    console.log(cost);
    console.log(comments);

    firebase.database().ref().set({
  		address:address,
  		cityState:cityState,
  		numGuests:numGuests,
  		times:times,
  		water:water,
  		poolTemp:poolTemp,
  		cost:cost,
  		comments:comments
  		})

  	return false;

});

