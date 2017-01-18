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


  function mapsReady(){
    dataRef.ref().on("value", function(snapshot){
    globalAddress = snapshot.val();
    getAddresses(globalAddress);
    console.log(globalAddress);
    });
  }
  
  

function initMap(user) {
 var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address= "+ user.address +", "+ user.city + ", "+ user.state +"&key=AIzaSyBPidPaBR5dgPFkxsPfkRvkLE1fFp48FX8";
 var marker;
 console.log(user);
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
      map = new google.maps.Map(document.getElementById('map'), {
     zoom: 6,
     center: myLatLng
   });

      
    for(var i = 0; i < addressArray.length; i++){
       marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: addressArray[0]
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
  for(var i = 0; i < globalAddress.length; i++){
    initMap(globalAddress[i]);
  }
  setTimeout(function() {
     google.maps.event.trigger(map, "resize");
    console.log("resized")
  }, 4000)

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



function getAddresses(addressData){
    for(key in addressData){
    addressArray.push(addressData[key]);
    }
    initMap(addressArray[0]);
    initMap(addressArray[1]);
    //console.log(addressArray);
    //(var i = 0; i < addressArray.length; i++){
     // initMap(addressArray[i]);
     //console.log(addressArray[i]);
    //}
}


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

