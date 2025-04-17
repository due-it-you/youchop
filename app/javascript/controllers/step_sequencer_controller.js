import { Controller } from "@hotwired/stimulus"
import * as Tone from "tone"

// Connects to data-controller="step-sequencer"
export default class extends Controller {

  static targets = [
                    "bpm",
                    "current_bpm",
                    "step",
                    "current_hihat",
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

  playHihatDemo(event) {
    const player = new Tone.Player(this.fetchSampleSoundPath(event)).toDestination();
    player.autostart = true;    
  }

  fetchSampleSoundPath(event) {
    const sample_name = event.target.parentNode.previousElementSibling.textContent
    if (sample_name.includes('hihat')) {
      if(sample_name.includes('#1')) return "/samples/hihats/short-bouncy-hi-hat-one-shot_C_minor.wav"
      if(sample_name.includes('#2')) return "/samples/hihats/aggressive-short-hi-hat-one-shot.wav"
    }
  }

  setSelectedHihat(event) {
    const current_hihat_name = event.target.textContent
    this.current_hihatTarget.textContent = ""
    this.current_hihatTarget.textContent = current_hihat_name
  }
}
