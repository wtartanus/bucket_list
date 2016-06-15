/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var connect = __webpack_require__(1);
	var CountryView = __webpack_require__(2);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var getRequest = function (url, callback) {
	  var request = new XMLHttpRequest();
	  request.open("GET", url);
	
	  request.onload = function () {
	    if(request.status === 200 ) {
	      var result = JSON.parse(request.responseText);
	      callback(result);
	    }
	  };
	  request.send(null);
	};
	
	module.exports = getRequest;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var connect = __webpack_require__(1);
	var Country = __webpack_require__( 3 );
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map