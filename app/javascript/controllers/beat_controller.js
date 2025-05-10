import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="beat"
export default class extends Controller {

  static targets = [

    "beat_title_field",
    "save_button",
    "hidden_beats_data_field",
    "hidden_youtubes_data_field",
    "hidden_sequencers_data_field",
    "hidden_pad_timings_data_field",
    "beat_save_form"

  ]

  static outlets = [ "step-sequencer", "youtube" ]

  connect() {
    // re-open the modal after the turbo-frame is re-rendered
    // caution:  When using Flowbite, simply removing the hidden class does not show the modal.
    // you must use modalElement.show() method.
    document.addEventListener('turbo:frame-render', (event) => {
      if (event.target.id === "save_beat_form") {
        const modalElement = document.getElementById("SaveThisBeatModal")
        const modal = new Modal(modalElement)
        modal.show()
      }
    })
  }

  setTheDataToSave () {
    // hihats_active_index, snares_active_index, kicks_active_index | ex) "1,3,11,14"
    const stepsCollection = this.stepSequencerOutlet.gridTarget.children
    const stepsArray = Array.prototype.slice.call(stepsCollection)
    const drumsStepsArray = stepsArray.slice(32,80)

    const hihatsActiveArray = []
    const snaresActiveArray = []
    const kicksActiveArray = []

    const drumsRows = [
      drumsStepsArray.slice(0,16),  // hihats row
      drumsStepsArray.slice(16,32), // snares row
      drumsStepsArray.slice(32,48)  // kicks row 
    ]

    drumsRows[0].forEach((step) => {
      if (step.dataset.active == "true") {
        hihatsActiveArray.push(step.getAttribute('index'))
      }
    })

    drumsRows[1].forEach((step) => {
      if (step.dataset.active == "true") {
        snaresActiveArray.push(step.getAttribute('index'))
      }
    })

    drumsRows[2].forEach((step) => {
      if (step.dataset.active == "true") {
        kicksActiveArray.push(step.getAttribute('index'))
      }
    })

    const hihatsActiveStr = hihatsActiveArray.toString()
    const snaresActiveStr = snaresActiveArray.toString()
    const kicksActiveStr = kicksActiveArray.toString()

    // pads_assigned | "T,H,B"
    const padsStepsArray = stepsArray.slice(16,32)
    const padsAssignedArray = []

    const padActiveIndexArray = []

    padsStepsArray.forEach((step) => {
      if (['T','Y','U','G','H','J','B','N','M'].includes(step.firstElementChild.value)) {
        padsAssignedArray.push(step.firstElementChild.value)
        padActiveIndexArray.push(step.getAttribute('index'))
      }
    })

    const padsAssignedStr = padsAssignedArray.toString()
    const padActiveIndexStr = padActiveIndexArray.toString()

    // pad_timings | ex) "00:00:00.0"
    const tTimeToSave = this.youtubeOutlet.t_start_timeTarget.value + '.' + this.youtubeOutlet.t_start_time_decimalTarget.value + '~' + this.youtubeOutlet.t_end_timeTarget.value + '.' + this.youtubeOutlet.t_end_time_decimalTarget.value
    const yTimeToSave = this.youtubeOutlet.y_start_timeTarget.value + '.' + this.youtubeOutlet.y_start_time_decimalTarget.value + '~' + this.youtubeOutlet.y_end_timeTarget.value + '.' + this.youtubeOutlet.y_end_time_decimalTarget.value
    const uTimeToSave = this.youtubeOutlet.u_start_timeTarget.value + '.' + this.youtubeOutlet.u_start_time_decimalTarget.value + '~' + this.youtubeOutlet.u_end_timeTarget.value + '.' + this.youtubeOutlet.u_end_time_decimalTarget.value
    const gTimeToSave = this.youtubeOutlet.g_start_timeTarget.value + '.' + this.youtubeOutlet.g_start_time_decimalTarget.value + '~' + this.youtubeOutlet.g_end_timeTarget.value + '.' + this.youtubeOutlet.g_end_time_decimalTarget.value
    const hTimeToSave = this.youtubeOutlet.h_start_timeTarget.value + '.' + this.youtubeOutlet.h_start_time_decimalTarget.value + '~' + this.youtubeOutlet.h_end_timeTarget.value + '.' + this.youtubeOutlet.h_end_time_decimalTarget.value
    const jTimeToSave = this.youtubeOutlet.j_start_timeTarget.value + '.' + this.youtubeOutlet.j_start_time_decimalTarget.value + '~' + this.youtubeOutlet.j_end_timeTarget.value + '.' + this.youtubeOutlet.j_end_time_decimalTarget.value
    const bTimeToSave = this.youtubeOutlet.b_start_timeTarget.value + '.' + this.youtubeOutlet.b_start_time_decimalTarget.value + '~' + this.youtubeOutlet.b_end_timeTarget.value + '.' + this.youtubeOutlet.b_end_time_decimalTarget.value
    const nTimeToSave = this.youtubeOutlet.n_start_timeTarget.value + '.' + this.youtubeOutlet.n_start_time_decimalTarget.value + '~' + this.youtubeOutlet.n_end_timeTarget.value + '.' + this.youtubeOutlet.n_end_time_decimalTarget.value
    const mTimeToSave = this.youtubeOutlet.m_start_timeTarget.value + '.' + this.youtubeOutlet.m_start_time_decimalTarget.value + '~' + this.youtubeOutlet.m_end_timeTarget.value + '.' + this.youtubeOutlet.m_end_time_decimalTarget.value

    // data_to_save
    const youtubeDataToSave = {
      video_title: this.youtubeOutlet.getPlayer.getVideoData().title,
      video_id: this.youtubeOutlet.getPlayer.getVideoData().video_id
    }

    const beatTitleDataToSave = {
      title: this.beat_title_fieldTarget.value
    }

    const sequencerDataToSave = {
      bpm: Number(this.stepSequencerOutlet.bpmTarget.value),
      hihats_active_index: hihatsActiveStr,
      snares_active_index: snaresActiveStr,
      kicks_active_index: kicksActiveStr,
      pads_assigned: padsAssignedStr,
      pad_active_index: padActiveIndexStr,
      youtube_volume: this.stepSequencerOutlet.pads_volumeTarget.value,
      hihat_volume: this.stepSequencerOutlet.hihats_volumeTarget.value,
      snare_volume: this.stepSequencerOutlet.snares_volumeTarget.value,
      kick_volume: this.stepSequencerOutlet.kicks_volumeTarget.value
    }

    const padTimingsDataToSave = {
      t_time: tTimeToSave,
      y_time: yTimeToSave,
      u_time: uTimeToSave,
      g_time: gTimeToSave,
      h_time: hTimeToSave,
      j_time: jTimeToSave,
      b_time: bTimeToSave,
      n_time: nTimeToSave,
      m_time: mTimeToSave
    }

    const dataToSave = {
      beats: beatTitleDataToSave,
      youtubes: youtubeDataToSave,
      sequencers: sequencerDataToSave,
      pad_timings: padTimingsDataToSave
    }

    return dataToSave
  }

  createTheBeat () {
    const dataToSave = this.setTheDataToSave()

    this.hidden_beats_data_fieldTarget.value = JSON.stringify(dataToSave.beats)
    this.hidden_youtubes_data_fieldTarget.value = JSON.stringify(dataToSave.youtubes)
    this.hidden_sequencers_data_fieldTarget.value = JSON.stringify(dataToSave.sequencers)
    this.hidden_pad_timings_data_fieldTarget.value = JSON.stringify(dataToSave.pad_timings)

    this.beat_save_formTarget.requestSubmit()
  }
}
