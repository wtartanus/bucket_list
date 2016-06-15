var connect = require('./request/get_request.js');
var CountryView = require("./views/countries_view");

window.onload = function() {
  console.log("app is running");
  var countries = new CountryView();
  countries.getData(connect);
  countries.getMoreData(connect);
  var map = new google.maps.Map(document.getElementById("map") ,{
    center: {lat: 0, lng: 0},
    zoom: 1
  });


};
