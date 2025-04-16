import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="step-sequencer"
export default class extends Controller {

  static targets = [
                    "bpm",
  ]

  connect() {
  }

  currentBPM() {
    console.log(this.bpmTarget.value)
  }
}
