import { Controller } from "@hotwired/stimulus"
import * as Tone from "tone"
import noUiSlider from 'nouislider';

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
                    "indicator",
                    "hihats_volume",
                    "snares_volume",
                    "kicks_volume",
  ]

  initialize() {
    const stepsCollection = this.gridTarget.children
    const stepsArray = Array.prototype.slice.call(stepsCollection)
    const drumsStepsArray = stepsArray.slice(32,80)

    const drumsRows = [
      drumsStepsArray.slice(0,16),  // hihats row
      drumsStepsArray.slice(16,32), // snares row
      drumsStepsArray.slice(32,48)  // kicks row 
    ]

    drumsRows[0].forEach((el) => {
      if (el.getAttribute('index') % 2 == 1) {
        if (el.getAttribute('index') % 4 == 1) {
          el.classList.remove('bg-gray-400')
          el.classList.add('bg-green-300')
          el.dataset.active = "true"
        } else {
          el.classList.add('bg-green-300')
          el.dataset.active = "true"
        }
      }
    })

    drumsRows[1].forEach((el) => {
      if (el.getAttribute('index') == 5 || el.getAttribute('index') == 13) {
        el.classList.remove('bg-gray-400')
        el.classList.add('bg-green-300')
        el.dataset.active = "true"
      }
    }) 
  }

  connect() {
    this.youtubeController = document.querySelector('[data-controller~="youtube"]')?.youtube

    this.hihatGain = new Tone.Gain(1).toDestination()
    this.snareGain = new Tone.Gain(1).toDestination()
    this.kickGain = new Tone.Gain(1).toDestination()

    this.hihatGain.gain.value = this.hihats_volumeTarget.value
    this.snareGain.gain.value = this.snares_volumeTarget.value
    this.kickGain.gain.value = this.kicks_volumeTarget.value
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
    if (this.isPlaying)  return

    await Tone.start();
  
    const grid_array = Array.from(this.gridTarget.children);
    const rows = [
      grid_array.slice(0,16),   // indicator
      grid_array.slice(16,32),  // chop
      grid_array.slice(32,48),  // hihat
      grid_array.slice(48,64),   // snare
      grid_array.slice(64,80)   // kick
    ];

    const players = new Tone.Players({
      hihat : this.fetchSampleSoundPath(this.current_hihatTarget.textContent),
      snare : this.fetchSampleSoundPath(this.current_snareTarget.textContent),
      kick  : this.fetchSampleSoundPath(this.current_kickTarget.textContent)
    }).toDestination()

    players.player("hihat").connect(this.hihatGain)
    players.player("snare").connect(this.snareGain)
    players.player("kick").connect(this.kickGain)
    
    let beat = 0;

    await Tone.Transport.scheduleRepeat((time) => {
      const padRow = rows[1]
      const currentStep = padRow[beat]
      const inputEl = currentStep.querySelector("input")

      if (inputEl && inputEl.value) {
        const key = inputEl.value.toLowerCase()
        if (this.youtubeController) {
          const Event = new KeyboardEvent("keydown", { key: key })
          this.youtubeController.play(Event)
        }
      }

      rows.forEach((row, index) => {
        const step = row[beat];
        if (step.dataset.active === "true") {
          const sample = step.getAttribute("sample");
          players.player(sample).start(time);
        }
      })
      this.highlightStep(beat)

      beat = (beat + 1) % 16;
    }, "16n");

    Tone.Transport.bpm.value = Number(this.current_bpmTarget.textContent)
    Tone.Transport.start()

    this.isPlaying = true
  }

  stopSequencer() {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.isPlaying = false
  }

  highlightStep(beat) {
    this.indicatorTargets.forEach((el, index) => {
      if (index === beat) {
        el.classList.add('bg-green-300')
      } else {
        el.classList.remove('bg-green-300')
      }
    })
  }

  fetchSampleSoundPath(input) {
    let sample_name
    
    if (input instanceof Event) {
      sample_name = input.target.parentNode.previousElementSibling.textContent
    } else {
      sample_name = input
    }
    
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

  setThePad(event) {

    // if the input letter *doesn't* include the following characters
    // which correspond to each pad key!
    if (![  't', 'y', 'u',
            'g', 'h', 'j',
            'b', 'n', 'm',
      
            'T', 'Y', 'U',
            'G', 'H', 'J',
            'B', 'N', 'M'

    ].includes(event.target.value)) {
      // this means that users can input the letter that corresponds to any pad key only.
      event.target.value = ''
    }

    event.target.value = event.target.value.toUpperCase()
  }

  hihatVolumeControl() {
    this.hihatGain.gain.value = this.hihats_volumeTarget.value
  }

  snareVolumeControl() {
    this.snareGain.gain.value = this.snares_volumeTarget.value
  }

  kickVolumeControl() {
    this.kickGain.gain.value = this.kicks_volumeTarget.value
  }

  resetAllStepsActive () {
    const stepsCollection = this.gridTarget.children
    const stepsArray = Array.prototype.slice.call(stepsCollection)
    const drumsStepsArray = stepsArray.slice(32,80)

    drumsStepsArray.forEach((step) => {
      const isActive = step.dataset.active === "true"
      if (isActive == true) {
        if (step.getAttribute('index') % 4 == 1) {
          step.classList.remove('bg-green-300')
          step.classList.add('bg-gray-400')
        } else {
          step.classList.remove('bg-green-300')
        }
      }
      
      step.setAttribute('data-active', 'false')
    })
  }
}
