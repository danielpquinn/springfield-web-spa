
// Model
// Used to model data and perform data related operations

import events from './events'

export default class Model {

  // Initialize model. Override defaults with new properties

  constructor(props) {
    props = props || {}

    this._properties = Object.assign(this.config.defaults, props)
  }

  // Get a property

  get(key) {
    return this._properties[key]
  }

  // Set a property

  set(key, property) {
    this._properties[key] = property
    this.trigger('set', { key, property })
    return this
  }

  // Plain object representation of model

  toObject() {
    return this._properties
  }
}

// Model configuration, should be overriden in subclass

Model.prototype.config = {
  baseUrl: '',
  defaults: {}
}

// Mix in spa.events

Object.assign(Model.prototype, events)