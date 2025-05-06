import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="beat"
export default class extends Controller {

  static targets = [

    "beat_title",
    "save_button"

  ]

  static outlets = [ "step-sequencer", "youtube" ]

  connect() {
  }
}
