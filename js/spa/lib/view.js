
// View
// Renders html and overrides default link behavior

import events from './events'

export default class View {

  // Initialize view

  constructor(el, template) {
    this.el = document.getElementById(el)
    this.template = Handlebars.compile(template)
  }

  // Render template using handlebars and supplied view data

  render(data) {
    var i = 0
    var links

    this.el.innerHTML = this.template(data)
    links = this.el.querySelectorAll('a[href]')
    for (i; i < links.length; i += 1) {
      links[i].addEventListener('click', e => {
        e.preventDefault()
        this.trigger('navigate', [e.target.attributes.href.value])
      })
    }
  }

}

// Mix in spa.events

Object.assign(View.prototype, events)