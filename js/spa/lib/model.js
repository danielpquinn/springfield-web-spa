
// Model
// Used to model data and perform data related operations

import events from './events'
import XHR from './xhr'

var properties = Symbol('properties')

export default class Model {

  // Initialize model. Override defaults with new properties

  constructor(props = {}) {
    this[properties] = Object.assign(this.constructor.config.defaults, props)
  }

  // List this model

  static list() {
    return new XHR().get(`${this.config.baseUrl}`)
      .then(response => { return JSON.parse(response) })
      .catch(console.log)
  }

  // Fetch this model by id

  fetch() {
    return new XHR().get(`${this.constructor.config.baseUrl}/${this.get('id')}`)
      .then(response => {
        Object.assign(this[properties], JSON.parse(response))
        return this
      })
  }

  // Get a property

  get(key) {
    return this[properties][key]
  }

  // Set a property

  set(key, property) {
    this[properties][key] = property
    this.trigger('set', { key, property })
    return this
  }

  // Plain object representation of model

  toObject() {
    return this[properties]
  }
}

// Model configuration, should be overriden in subclass

Model.config = { baseUrl: '', defaults: {} }

// Mix in spa.events

Object.assign(Model.prototype, events)
