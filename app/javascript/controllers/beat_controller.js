import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="beat"
export default class extends Controller {

  static targets = [

    "beat_title",
    "save_button",
    "hidden_beats_data_field",
    "hidden_youtubes_data_field",
    "hidden_sequencers_data_field",
    "hidden_pad_timings_data_field",

  ]

  static outlets = [ "step-sequencer", "youtube" ]

  connect() {
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
    const snaresActiveStr = hihatsActiveArray.toString()
    const kicksActiveStr = hihatsActiveArray.toString()

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
    const t_time_to_save = this.youtubeOutlet.t_start_timeTarget.value + '.' + this.youtubeOutlet.t_start_time_decimalTarget.value + '~' + this.youtubeOutlet.t_end_timeTarget.value + '.' + this.youtubeOutlet.t_end_time_decimalTarget.value
    const y_time_to_save = this.youtubeOutlet.y_start_timeTarget.value + '.' + this.youtubeOutlet.y_start_time_decimalTarget.value + '~' + this.youtubeOutlet.y_end_timeTarget.value + '.' + this.youtubeOutlet.y_end_time_decimalTarget.value
    const u_time_to_save = this.youtubeOutlet.u_start_timeTarget.value + '.' + this.youtubeOutlet.u_start_time_decimalTarget.value + '~' + this.youtubeOutlet.u_end_timeTarget.value + '.' + this.youtubeOutlet.u_end_time_decimalTarget.value
    const g_time_to_save = this.youtubeOutlet.g_start_timeTarget.value + '.' + this.youtubeOutlet.g_start_time_decimalTarget.value + '~' + this.youtubeOutlet.g_end_timeTarget.value + '.' + this.youtubeOutlet.g_end_time_decimalTarget.value
    const h_time_to_save = this.youtubeOutlet.h_start_timeTarget.value + '.' + this.youtubeOutlet.h_start_time_decimalTarget.value + '~' + this.youtubeOutlet.h_end_timeTarget.value + '.' + this.youtubeOutlet.h_end_time_decimalTarget.value
    const j_time_to_save = this.youtubeOutlet.j_start_timeTarget.value + '.' + this.youtubeOutlet.j_start_time_decimalTarget.value + '~' + this.youtubeOutlet.j_end_timeTarget.value + '.' + this.youtubeOutlet.j_end_time_decimalTarget.value
    const b_time_to_save = this.youtubeOutlet.b_start_timeTarget.value + '.' + this.youtubeOutlet.b_start_time_decimalTarget.value + '~' + this.youtubeOutlet.b_end_timeTarget.value + '.' + this.youtubeOutlet.b_end_time_decimalTarget.value
    const n_time_to_save = this.youtubeOutlet.n_start_timeTarget.value + '.' + this.youtubeOutlet.n_start_time_decimalTarget.value + '~' + this.youtubeOutlet.n_end_timeTarget.value + '.' + this.youtubeOutlet.n_end_time_decimalTarget.value
    const m_time_to_save = this.youtubeOutlet.m_start_timeTarget.value + '.' + this.youtubeOutlet.m_start_time_decimalTarget.value + '~' + this.youtubeOutlet.m_end_timeTarget.value + '.' + this.youtubeOutlet.m_end_time_decimalTarget.value

    // data_to_save
    const youtube_data_to_save = {
      video_title: this.youtubeOutlet.getPlayer.getVideoData().title,
      video_id: this.youtubeOutlet.getPlayer.getVideoData().video_id
    }

    const beat_title_data_to_save = {
      title: this.beat_titleTarget.value
    }

    const sequencer_data_to_save = {
      bpm: Number(this.stepSequencerOutlet.bpmTarget.value),
      hihats_active_index: hihatsActiveStr,
      snares_active_index: snaresActiveStr,
      kicks_active_index: kicksActiveStr,
      pads_assigned: padsAssignedStr,
      pad_active_index: padActiveIndexStr,
      youtube_volume: this.stepSequencerOutlet.pads_volumeTarget.value,
      hihats_volume: this.stepSequencerOutlet.hihats_volumeTarget.value,
      snares_volume: this.stepSequencerOutlet.snares_volumeTarget.value,
      kicks_volume: this.stepSequencerOutlet.kicks_volumeTarget.value
    }

    const pad_timings_data_to_save = {
      t_time: t_time_to_save,
      y_time: y_time_to_save,
      u_time: u_time_to_save,
      g_time: g_time_to_save,
      h_time: h_time_to_save,
      j_time: j_time_to_save,
      b_time: b_time_to_save,
      n_time: n_time_to_save,
      m_time: m_time_to_save
    }

    const data_to_save = {
      beats: beat_title_data_to_save,
      youtubes: youtube_data_to_save,
      sequencers: sequencer_data_to_save,
      pad_timings: pad_timings_data_to_save
    }

    return data_to_save
  }

  createTheBeat (event) {
    const data_to_save = this.setTheDataToSave()

    this.hidden_beats_data_fieldTarget.value = JSON.stringify(data_to_save.beats)
    this.hidden_youtubes_data_fieldTarget.value = JSON.stringify(data_to_save.youtubes)
    this.hidden_sequencers_data_fieldTarget.value = JSON.stringify(data_to_save.sequencers)
    this.hidden_pad_timings_data_fieldTarget.value = JSON.stringify(data_to_save.pad_timings)
    // this.event.requestSubmit()
  }
}
