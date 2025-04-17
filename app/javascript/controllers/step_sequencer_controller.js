import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="step-sequencer"
export default class extends Controller {

  static targets = [
                    "bpm",
                    "current_bpm",
                    "step",
  ]

  initialize() {
  }

  connect() {
  }

  currentBPM() {
    this.current_bpmTarget.textContent = this.bpmTarget.value
  }

  stepActiveControl(event) {
    const stepClicked = event.target

    if (stepClicked.getAttribute('active') == "false") {
      stepClicked.classList.remove('bg-gray-400')
      stepClicked.classList.add('bg-green-300')
      stepClicked.setAttribute('active', 'true')
    }
  }
}
