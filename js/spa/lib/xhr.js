
// HXR
// Utility for making ajax requests

export default class XHR {

  constructor() {
    return this
  }

  sendRequest(method = 'get', url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', () => {
        resolve(xhr.response)
      })
      xhr.addEventListener('error', reject)

      xhr.open(method, url, true)
      xhr.send()
    })
  }

  get(url) {
    return this.sendRequest('get', url)
  }

  put(url) {
    return this.sendRequest('put', url)
  }

  post(url) {
    return this.sendRequest('post', url)
  }

  delete(url) {
    return this.sendRequest('delete', url)
  }
}