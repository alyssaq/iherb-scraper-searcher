/*
  Simple httprequest wrapper to return promises
*/
(function () {
  function Request() {}

  Request.prototype.getJSON = function (url) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'json';

      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('Request failed error:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('There was a network error.'));
      };
      request.send();
    });
  }

  window.App = window.App || {};
  window.App.Request = Request;
})();
