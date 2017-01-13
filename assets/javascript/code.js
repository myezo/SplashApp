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
  var dataRef = firebase.database();


function initMap() {
 var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address= "+ city + ", "+ state +"&key=AIzaSyBPidPaBR5dgPFkxsPfkRvkLE1fFp48FX8";
 
 // var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address + " , "+ city +", "+ state +"&key=AIzaSyBPidPaBR5dgPFkxsPfkRvkLE1fFp48FX8";
  $.ajax({
        url: queryURL,
        method: "GET"
      })
    .done(function(response) {
      console.log(response);
      var myLatLng = {
          lat : response.results[0].geometry.location.lat,
          lng : response.results[0].geometry.location.lng
       };
      var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 15,
     center: myLatLng
   });

       var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Hello World!'
       });
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
      temperature = response.current_observation.dewpoint_f;
      weather = response.current_observation.weather;
      console.log(weather);
      
      console.log(temperature);
     
      //$('#location').text(location);
      //$("#temperature").attr('value', temperature+String.fromCharCode(176))
      $('#temperature').html(temperature + "&#8457;");
      $('#icon').html("<img src=\""+icon+"\">");
      $('#location').text(city + ", " + state);
      $('#weather').text(weather);
  }); 
}


function getMap() {
  var div = $('<div>').attr('id', 'map');
  $('body').append(div);
  // debugger;
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
      });

    return false;

});

