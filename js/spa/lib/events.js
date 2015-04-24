
// Event mixin

export default {

  // Map of event listeners

  events: {},

  // Add event listener

  on(name, fn) {
    this.events[name] = this.events[name] || []
    this.events[name].push(fn)
  },

  // Remove event listener

  off(name, fn) {
    if (!this.events[name]) return
    this.events[name].forEach((func, i) => {
      if (func === fn) { this.events[name].splice(i, 1) }
    })
  },

  // Trigger an event

  trigger(name, args) {
    if (!this.events[name]) return
    this.events[name].forEach(fn => { fn(...args) })
  }
}