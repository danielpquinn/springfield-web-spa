var spa = window.spa || {};

(function () {

  'use strict';

  function Model() {}

  Model.prototype.initialize = function (props) {
    var self = this;
    var properties = props;

    var sendRequest = function (method, url, cb) {
      var req = new XMLHttpRequest();
      req.open(method, url, cb);
      req.send();
    };

    self.baseUrl = '';

    self.list = function (cb) {
      sendRequest('GET', self.baseUrl, cb);
    };

    self.show = function (cb) {
      sendRequest('GET', self.baseUrl + self.get('id'), cb);
    };

    self.set = function (key, value) {
      props[key] = value;
      self.trigger('set', { key: key, value: value });
    };

    self.get = function (key) {
      return properties[key];
    };
  };

  Object.keys(spa.Event).forEach(function (key) {
    Model.prototype[key] = spa.Event[key];
  });

  spa.Model = Model;

}());