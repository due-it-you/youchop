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
                    "pads_volume",
                    "hihats_volume",
                    "snares_volume",
                    "kicks_volume",
  ]

  initialize() {
    this.loopId = null

    this._inactiveFirstStepBgColor = 'bg-gray-400'
    this._activeStepBgColor = 'bg-green-300'

    const stepsCollection = this.gridTarget.children
    const stepsArray = Array.prototype.slice.call(stepsCollection)
    const drumsStepsArray = stepsArray.slice(32,80)

    const drumsRows = [
      drumsStepsArray.slice(0,16),  // hihats row
      drumsStepsArray.slice(16,32), // snares row
      drumsStepsArray.slice(32,48)  // kicks row 
    ]

    if (document.querySelector('#topIndex')) {
      // active some of the hihats in default
      drumsRows[0].forEach((el) => {
        if (el.getAttribute('index') % 2 == 1) {
          if (el.getAttribute('index') % 4 == 1) {
            el.classList.remove(this._inactiveFirstStepBgColor)
            el.classList.add(this._activeStepBgColor)
            el.dataset.active = "true"
          } else {
            el.classList.add(this._activeStepBgColor)
            el.dataset.active = "true"
          }
        }
      })

      // active some of the snares in default
      drumsRows[1].forEach((el) => {
        if (el.getAttribute('index') == 5 || el.getAttribute('index') == 13) {
          el.classList.remove(this._inactiveFirstStepBgColor)
          el.classList.add(this._activeStepBgColor)
          el.dataset.active = "true"
        }
      })

      // active some of the kicks in default
      drumsRows[2].forEach((el) => {
        if (el.getAttribute('index') == 1 || el.getAttribute('index') == 9 ||  el.getAttribute('index') == 11) {
          if (el.getAttribute('index') % 4 == 1) {
            el.classList.remove(this._inactiveFirstStepBgColor)
            el.classList.add(this._activeStepBgColor)
            el.dataset.active = "true"
          } else {
            el.classList.add(this._activeStepBgColor)
            el.dataset.active = "true"
          }
        }
      })

      // set the pads on the sequencer in default
      const padStepsArray = stepsArray.slice(16,32)

      padStepsArray.forEach((el) => {
        switch (el.getAttribute('index')) {
          case "1":
            el.firstElementChild.value = "Y";
            break;
          case "7":
            el.firstElementChild.value = "Y";
            break;
          case "11":
            el.firstElementChild.value = "J";
            break;
          case "13":
            el.firstElementChild.value = "M";
            break;
        }
      })
    }
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

  setTheDataToSave () {
  }

  currentBPM() {
    this.current_bpmTarget.textContent = this.bpmTarget.value
  }

  stepActiveControl(event) {
    const stepClicked = event.target
    const isActive = stepClicked.dataset.active === "true"
    
    if (isActive == false) {
      if (stepClicked.getAttribute('index') % 4 == 1) {
        stepClicked.classList.remove(this._inactiveFirstStepBgColor)
        stepClicked.classList.add(this._activeStepBgColor)
      } else {
        stepClicked.classList.add(this._activeStepBgColor)
      }
    }

    if (isActive == true) {
      if (stepClicked.getAttribute('index') % 4 == 1) {
        stepClicked.classList.remove(this._activeStepBgColor)
        stepClicked.classList.add(this._inactiveFirstStepBgColor)
      } else {
        stepClicked.classList.remove(this._activeStepBgColor)
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

    await Tone.start()

    if (this.loopId) {
      Tone.Transport.clear(this.loopId)
    }
  
    const grid_array = Array.from(this.gridTarget.children)
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

    this.loopId = Tone.Transport.scheduleRepeat((time) => {
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
          const sample = step.getAttribute("sample")
          players.player(sample).start(time)
        }
      })
      this.highlightStep(beat)

      beat = (beat + 1) % 16;
    }, "16n");

    Tone.Transport.bpm.value = Number(this.current_bpmTarget.textContent)
    await Tone.loaded()
    Tone.Transport.start()

    this.isPlaying = true
  }

  stopSequencer() {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    if (this.loopId) {
      Tone.Transport.clear(this.loopId)
      this.loopId = null
    }
    this.isPlaying = false
  }

  highlightStep(beat) {
    this.indicatorTargets.forEach((el, index) => {
      if (index === beat) {
        el.classList.add(this._activeStepBgColor)
      } else {
        el.classList.remove(this._activeStepBgColor)
      }
    })
  }

  fetchSampleSoundPath(input) {
    let sampleName
    
    if (input instanceof Event) {
      sampleName = input.target.parentNode.previousElementSibling.textContent
    } else {
      sampleName = input
    }
    
    if (sampleName.includes('hihat')) {
      if(sampleName.includes('#1')) return "/samples/hihats/short-bouncy-hi-hat-one-shot_C_minor.wav"
      if(sampleName.includes('#2')) return "/samples/hihats/aggressive-short-hi-hat-one-shot.wav"
    }

    if (sampleName.includes('snare')) {
      if (sampleName.includes('#1')) return '/samples/snares/boom-bap-snare.wav'
      if (sampleName.includes('#2')) return '/samples/snares/old-school-snare.wav'
    }

    if (sampleName.includes('kick')) {
      if (sampleName.includes('#1')) return '/samples/kicks/drum-boom-bap-kick_C_minor.wav'
    }
  }

  setSelectedHihat(event) {
    const currentHihatName = event.target.textContent
    this.current_hihatTarget.textContent = ""
    this.current_hihatTarget.textContent = currentHihatName
  }

  setSelectedSnare(event) {
    const currentSnareName = event.target.textContent
    this.current_snareTarget.textContent = ""
    this.current_snareTarget.textContent = currentSnareName
  }

  setSelectedKick(event) {
    const currentKickName = event.target.textContent
    this.current_kickTarget.textContent = ""
    this.current_kickTarget.textContent = currentKickName
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
          step.classList.remove(this._activeStepBgColor)
          step.classList.add(this._inactiveFirstStepBgColor)
        } else {
          step.classList.remove(this._activeStepBgColor)
        }
      }
      
      step.setAttribute('data-active', 'false')
    })
  }

  get inactiveFirstStepBgColor () {
    return this._inactiveFirstStepBgColor
  }
}
