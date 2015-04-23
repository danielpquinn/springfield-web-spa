var spa = window.spa || {};

(function () {

  'use strict';

  // Model
  // Used to model data and perform data related operations

  function Model() {}

  // Model configuration, should be overriden in subclass

  Model.prototype.config = {
    baseUrl: '',
    defaults: {}
  };

  // Initialize model. Override defaults with new properties

  Model.prototype.initialize = function (props) {
    var self = this;

    props = props || {};

    self._properties = {};

    Object.keys(this.config.defaults).forEach(function (key) {
      self._properties[key] = props[key] || self.config.defaults[key];
    });
  };

  // Get a property

  Model.prototype.get = function (key) {
    return this._properties[key];
  };

  // Set a property

  Model.prototype.set = function (key, property) {
    this._properties[key] = property;
    this.trigger('set', { key: key, property: property });
    return this;
  };

  // Plain object representation of model

  Model.prototype.toObject = function () {
    return this._properties;
  };

  // Mix in spa.Events

  for (var key in spa.event) {
    Model.prototype[key] = spa.event[key];
  }

  // Export

  spa.Model = Model;

}());