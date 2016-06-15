var connect = require('../request/get_request.js');
var Country = require( '../country/country' );

var CountryView = function () {
  this.url = "https://restcountries.eu/rest/v1";
  this.onFetchSuccess = connect;
};

CountryView.prototype = {
  render: function (countries) {
    console.log("Countires Connected:", countries );
    var countrySelect = document.querySelector("#country-list");
    countries.forEach(function(item, index) {
      item.index = index;
      var option = document.createElement("option");
      option.value = index.toString();
      option.text = item.name;
      countrySelect.appendChild(option);
    });


    countrySelect.onchange = function() {
      console.log(this.value);
      console.log(countries);
      var bucketListSelect = document.querySelector( "#bucket-list" );
      var option = document.createElement( "option" );
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].index === parseInt(this.value)) {
          option.text = countries[i].name;
          var country = new Country(countries[i]);
          country.save();
        }
      }
      option.value = this.value;
      bucketListSelect.appendChild( option );
    };


  },
  render2: function (countries) {
    var bucketListSelect1 = document.querySelector( "#bucket-list" );

    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement( "option" );
        option.text = countries[i].name;
        option.value = countries[i].index;
        bucketListSelect1.appendChild( option );
    }
  },

  getData: function(connect) {
    connect(this.url, this.render);
  },

  getMoreData: function(connect) {
    
    var url = "http://localhost:3000/countries";
    connect(url, this.render2);

  }

};

module.exports = CountryView;
