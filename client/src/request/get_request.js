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
