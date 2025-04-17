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
    const isActive = stepClicked.dataset.active === "true"
    
    if (isActive == false) {
      if (stepClicked.getAttribute('index') % 4 == 1) {
        stepClicked.classList.remove('bg-gray-400')
        stepClicked.classList.add('bg-green-300')
      } else {
        stepClicked.classList.add('bg-green-300')
      }
    }

    if (isActive == true) {
      if (stepClicked.getAttribute('index') % 4 == 1) {
        stepClicked.classList.remove('bg-green-300')
        stepClicked.classList.add('bg-gray-400')
      } else {
        stepClicked.classList.remove('bg-green-300')
      }
    }

    stepClicked.dataset.active = (!isActive).toString()
  }
}
