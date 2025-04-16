import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="step-sequencer"
export default class extends Controller {

  static targets = [
                    "bpm",
                    "current_bpm",
                    "step",
  ]

  initialize() {
    const steps = this.stepTarget.children
    for (const step of steps) {
      if(step.getAttribute('index') % 4 == 1) {
        step.classList.add('bg-gray-400')
      }
    }
  }

  connect() {
  }

  currentBPM() {
    this.current_bpmTarget.textContent = this.bpmTarget.value
  }

  stepActiveControl(event) {
    const steps = this.stepTarget.children
    for (const step of steps) {
      // if step is 
      if(step.getAttribute("active") == "false") {
        console.log("falseです")
      } else {
        console.log("falseです")
      }
    }
  }
}
