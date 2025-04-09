import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "url" ]

  fetch_url() {
    console.log(this.urlTarget.value)
  }
}
