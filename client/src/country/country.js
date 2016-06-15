
var Country = function (country) {
  this.name = country.name;
  this.index = country.index;
  this.latlng = country.latlng;
};

Country.prototype = {
  save: function() {
    var url = "http://localhost:3000/countries";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if (request.status === 200) {
      }
    };
    request.send(JSON.stringify(this));
  }
};

module.exports = Country;
