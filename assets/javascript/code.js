var state = "";
var city = "";
var temperature;
var location;
var weather;
var icon;
var globalAddress;
var addressArray = [];
var map;


var config = {
        apiKey: "AIzaSyALOGtyzx0N9l-ucFeIdNpjpDHooe3H0mY",
        authDomain: "splash2-d7283.firebaseapp.com",
        databaseURL: "https://splash2-d7283.firebaseio.com",
        storageBucket: "splash2-d7283.appspot.com",
        messagingSenderId: "175988356325"
      };
      firebase.initializeApp(config);
      var dataRef = firebase.database();


    function initMap(){
      dataRef.ref().on("value", function(snapshot){
	      var locations = snapshot.val();
	      map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 10,
	        center: {lat:39.969847, lng : -74.220128}
	      });
	      for(var key in locations){
	      	//console.log(locations[key].address, locations[key].city, locations[key].state);
	      	var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address= "+ locations[key].address +", "+ locations[key].city + ", "+ locations[key].state +"&key=AIzaSyBPidPaBR5dgPFkxsPfkRvkLE1fFp48FX8";
	      	
	      	 $.ajax({
	      	       url: queryURL,
	      	       method: "GET"
	      	     })
	      	   .done(function(response) {
	      	     //console.log(response);
	      	     var myLatLng = {
	      	         lat : response.results[0].geometry.location.lat,
	      	         lng : response.results[0].geometry.location.lng
	      	      };
	      	      console.log(myLatLng);
	      	      var marker = new google.maps.Marker({
		      	        position: myLatLng,
		      	        map: map
	      	    	});
	      	  });
	      }
	     
      });
    }


    function getWeather(){
      var queryURL = "http://api.wunderground.com/api/11e28d64554d3afa/conditions/q/" + state + "/" +city+".json";
      $.ajax({
            url: queryURL,
            method: "GET"
          })
        .done(function(response) {
          console.log(response);

          icon = response.current_observation.icon_url;
          temperature = response.current_observation.dewpoint_f;
          weather = response.current_observation.weather;
          console.log(weather);
          
          console.log(temperature);

          $('#temperature').html(temperature + "&#8457;");
          $('#icon').html("<img src=\""+icon+"\">");
          $('#location').text(city + ", " + state);
          $('#weather').text(weather);
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
      // debugger;
      getMap();
      // debugger;
      getWeather();
      $("#query-result").removeClass("hidden");

      return false;
    });


    $('#submit').on("click", function(){
      
      var fullName;
      var address;
      var city;
      var state;
      var numGuests;
      var times;
      var water;
      var poolTemp;
      var cost;
      var comments;

        fullName = $("#fullName").val().trim();
        address = $("#address").val().trim();
        city = $("#city").val().trim();
        state = $("#state").val().trim();
        numGuests = $("#numGuests").val().trim();
        times = $("#poolTime").val().trim();
        water = $("#waterType").val().trim();
        poolTemp = $("#temperature").val().trim();
        cost = $("#cost").val().trim();
        comments = $("#comments").val().trim();


        dataRef.ref().push({
          fullName:fullName,
          address:address,
          city:city,
          state:state,
          numGuests:numGuests,
          times:times,
          water:water,
          poolTemp:poolTemp,
          cost:cost,
          comments:comments

          }, function (snapshot){
            dataRef.ref("address").once('value')
            .then(function(snapshot){
              snapshot.val();
              console.log(snapshot.val());
              var userData = snapshot.val();
              getAddresses(userData);
            });
          });



        return false;

    });
