import { Controller } from "@hotwired/stimulus"
import * as Tone from "tone"

// Connects to data-controller="step-sequencer"
export default class extends Controller {

  static targets = [
                    "bpm",
                    "current_bpm",
                    "step",
                    "grid",
                    "current_hihat",
                    "current_snare",
                    "current_kick",
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

  playSampleDemo(event) {
    const player = new Tone.Player(this.fetchSampleSoundPath(event)).toDestination();
    player.autostart = true;    
  }

  async playSequencer() {
    await Tone.start();
  
    const grid_array = Array.from(this.gridTarget.children);
    const rows = [
      grid_array.slice(0,16),   // chop
      grid_array.slice(16,32),  // hihat
      grid_array.slice(32,48),  // snare
      grid_array.slice(48,64)   // kick
    ];
  
    const players = new Tone.Players({
      chop  : '/samples/snares/boom-bap-snare.wav',
      hihat : this.fetchSampleSoundPath(this.current_hihatTarget.textContent),
      snare : '/samples/snares/boom-bap-snare.wav',
      kick  : '/samples/kicks/drum-boom-bap-kick_C_minor.wav'
    }).toDestination();
  
    let beat = 0;
  
    Tone.Transport.scheduleRepeat((time) => {
      rows.forEach((row, index) => {
        const step = row[beat];
        if (step.dataset.active === "true") {
          const sample = step.getAttribute("sample");
          players.player(sample).start(time);
        }
      });
  
      beat = (beat + 1) % 16;
    }, "16n");

    Tone.Transport.bpm.value = Number(this.current_bpmTarget.textContent)
  
    Tone.Transport.start();
  }
  

  fetchSampleSoundPath(event) {
    const sample_name = event.target.parentNode.previousElementSibling.textContent
    
    if (sample_name.includes('hihat')) {
      if(sample_name.includes('#1')) return "/samples/hihats/short-bouncy-hi-hat-one-shot_C_minor.wav"
      if(sample_name.includes('#2')) return "/samples/hihats/aggressive-short-hi-hat-one-shot.wav"
    }

    if (sample_name.includes('snare')) {
      if (sample_name.includes('#1')) return '/samples/snares/boom-bap-snare.wav'
      if (sample_name.includes('#2')) return '/samples/snares/old-school-snare.wav'
    }

    if (sample_name.includes('kick')) {
      if (sample_name.includes('#1')) return '/samples/kicks/drum-boom-bap-kick_C_minor.wav'
    }
  }

  setSelectedHihat(event) {
    const current_hihat_name = event.target.textContent
    this.current_hihatTarget.textContent = ""
    this.current_hihatTarget.textContent = current_hihat_name
  }

  setSelectedSnare(event) {
    const current_snare_name = event.target.textContent
    this.current_snareTarget.textContent = ""
    this.current_snareTarget.textContent = current_snare_name
  }

  setSelectedKick(event) {
    const current_kick_name = event.target.textContent
    this.current_kickTarget.textContent = ""
    this.current_kickTarget.textContent = current_kick_name
  }
}
