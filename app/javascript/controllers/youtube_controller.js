import { Controller } from "@hotwired/stimulus"
import noUiSlider from 'nouislider';

export default class extends Controller {
  static targets = [ 
                    "url",
                    "error_url",
                    "submit",
                    "frame",
                    "range",
                    "t_start_time",
                    "t_start_time_decimal",
                    "t_end_time",
                    "t_end_time_decimal",
                    "y_start_time",
                    "y_start_time_decimal",
                    "y_end_time",
                    "y_end_time_decimal",
                    "u_start_time",
                    "u_start_time_decimal",
                    "u_end_time",
                    "u_end_time_decimal",
                    "g_start_time",
                    "g_start_time_decimal",
                    "g_end_time",
                    "g_end_time_decimal",
                    "h_start_time",
                    "h_start_time_decimal",
                    "h_end_time",
                    "h_end_time_decimal",
                    "j_start_time",
                    "j_start_time_decimal",
                    "j_end_time",
                    "j_end_time_decimal",
                    "b_start_time",
                    "b_start_time_decimal",
                    "b_end_time",
                    "b_end_time_decimal",
                    "n_start_time",
                    "n_start_time_decimal",
                    "n_end_time",
                    "n_end_time_decimal",
                    "m_start_time",
                    "m_start_time_decimal",
                    "m_end_time",
                    "m_end_time_decimal",
                    "pads_volume",
                    "reset_confirmation",
                    "t_pad",
                    "y_pad",
                    "u_pad",
                    "g_pad",
                    "h_pad",
                    "j_pad",
                    "b_pad",
                    "n_pad",
                    "m_pad",
                    "beat_title"
  ]

  static outlets = [ "step-sequencer" ]

  static values = {
                    beatId: String
  }

  async initialize() {
    this.element['youtube'] = this

    // assign the default beat in top/index.html.erb
    
    this.t_start_timeTarget.value = "00:01:08"
    this.t_start_time_decimalTarget.value = "3"
    this.t_end_timeTarget.value = "00:59:10"

    this.y_start_timeTarget.value = "00:00:41"
    this.y_end_timeTarget.value = "00:00:42"
    this.y_end_time_decimalTarget.value = "1"

    this.u_start_timeTarget.value = "00:01:41"
    this.u_end_timeTarget.value = "00:59:10"

    this.g_start_timeTarget.value = "00:02:10"
    this.g_end_timeTarget.value = "00:59:10"

    this.h_start_timeTarget.value = "00:02:32"
    this.h_end_timeTarget.value = "00:59:10"

    this.j_start_timeTarget.value = "00:01:25"
    this.j_start_time_decimalTarget.value = "2"
    this.j_end_timeTarget.value = "00:59:10"

    this.b_start_timeTarget.value = "00:01:59"
    this.b_end_timeTarget.value = "00:59:10"

    this.n_start_timeTarget.value = "00:00:25"
    this.n_end_timeTarget.value = "00:59:10"

    this.m_start_timeTarget.value = "00:02:56"
    this.m_start_time_decimalTarget.value = "1"
    this.m_end_timeTarget.value = "00:59:10"

    if (document.querySelector("#topIndex")) {
      return
    }

    // assign the selected beat in the show.html.erb

    const response = await fetch(`/beats/${this.beatIdValue}.json`, {
      method: 'GET'
    })

    const data = await response.json()

    // pad_timings variables

    const tStartTime = data.pad_timings_data.t_time.split('~')[0] // 00:00:00.0
    const tEndTime = data.pad_timings_data.t_time.split('~')[1]   // 00:00:00.0
    const tStartTimeInteger = tStartTime.split('.')[0] // 00:00:00
    const tStartTimeDecimal = tStartTime.split('.')[1] // 0
    const tEndTimeInteger = tEndTime.split('.')[0] // 00:00:00
    const tEndTimeDecimal = tEndTime.split('.')[1] // 0

    const yStartTime = data.pad_timings_data.y_time.split('~')[0] // 00:00:00.0
    const yEndTime = data.pad_timings_data.y_time.split('~')[1]   // 00:00:00.0
    const yStartTimeInteger = yStartTime.split('.')[0] // 00:00:00
    const yStartTimeDecimal = yStartTime.split('.')[1] // 0
    const yEndTimeInteger = yEndTime.split('.')[0] // 00:00:00
    const yEndTimeDecimal = yEndTime.split('.')[1] // 0

    const uStartTime = data.pad_timings_data.u_time.split('~')[0] // 00:00:00.0
    const uEndTime = data.pad_timings_data.u_time.split('~')[1]   // 00:00:00.0
    const uStartTimeInteger = uStartTime.split('.')[0] // 00:00:00
    const uStartTimeDecimal = uStartTime.split('.')[1] // 0
    const uEndTimeInteger = uEndTime.split('.')[0] // 00:00:00
    const uEndTimeDecimal = uEndTime.split('.')[1]

    const gStartTime = data.pad_timings_data.g_time.split('~')[0] // 00:00:00.0
    const gEndTime = data.pad_timings_data.g_time.split('~')[1]   // 00:00:00.0
    const gStartTimeInteger = gStartTime.split('.')[0] // 00:00:00
    const gStartTimeDecimal = gStartTime.split('.')[1] // 0
    const gEndTimeInteger = gEndTime.split('.')[0] // 00:00:00
    const gEndTimeDecimal = gEndTime.split('.')[1] // 0

    const hStartTime = data.pad_timings_data.h_time.split('~')[0] // 00:00:00.0
    const hEndTime = data.pad_timings_data.h_time.split('~')[1]   // 00:00:00.0
    const hStartTimeInteger = hStartTime.split('.')[0] // 00:00:00
    const hStartTimeDecimal = hStartTime.split('.')[1] // 0
    const hEndTimeInteger = hEndTime.split('.')[0] // 00:00:00
    const hEndTimeDecimal = hEndTime.split('.')[1] // 0

    const jStartTime = data.pad_timings_data.j_time.split('~')[0] // 00:00:00.0
    const jEndTime = data.pad_timings_data.j_time.split('~')[1]   // 00:00:00.0
    const jStartTimeInteger = jStartTime.split('.')[0] // 00:00:00
    const jStartTimeDecimal = jStartTime.split('.')[1] // 0
    const jEndTimeInteger = jEndTime.split('.')[0] // 00:00:00
    const jEndTimeDecimal = jEndTime.split('.')[1] // 0

    const bStartTime = data.pad_timings_data.b_time.split('~')[0] // 00:00:00.0
    const bEndTime = data.pad_timings_data.b_time.split('~')[1]   // 00:00:00.0
    const bStartTimeInteger = bStartTime.split('.')[0] // 00:00:00
    const bStartTimeDecimal = bStartTime.split('.')[1] // 0
    const bEndTimeInteger = bEndTime.split('.')[0] // 00:00:00
    const bEndTimeDecimal = bEndTime.split('.')[1] // 0

    const nStartTime = data.pad_timings_data.n_time.split('~')[0] // 00:00:00.0
    const nEndTime = data.pad_timings_data.n_time.split('~')[1]   // 00:00:00.0
    const nStartTimeInteger = nStartTime.split('.')[0] // 00:00:00
    const n_starttime_decimal = nStartTime.split('.')[1] // 0
    const nEndTimeInteger = nEndTime.split('.')[0] // 00:00:00
    const nEndTimeDecimal = nEndTime.split('.')[1] // 0

    const mStartTime = data.pad_timings_data.m_time.split('~')[0] // 00:00:00.0
    const mEndTime = data.pad_timings_data.m_time.split('~')[1]   // 00:00:00.0
    const mStartTimeInteger = mStartTime.split('.')[0] // 00:00:00
    const mStartTimeDecimal = mStartTime.split('.')[1] // 0
    const mEndTimeInteger = mEndTime.split('.')[0] // 00:00:00
    const mEndTimeDecimal = mEndTime.split('.')[1] // 0

    // assign the pad timings
    this.t_start_timeTarget.value = tStartTimeInteger
    this.t_start_time_decimalTarget.value = tStartTimeDecimal
    this.t_end_timeTarget.value = tEndTimeInteger
    this.t_end_time_decimalTarget.value = tEndTimeDecimal

    this.y_start_timeTarget.value = yStartTimeInteger
    this.y_start_time_decimalTarget.value = yStartTimeDecimal
    this.y_end_timeTarget.value = yEndTimeInteger
    this.y_end_time_decimalTarget.value = yEndTimeDecimal

    this.u_start_timeTarget.value = uStartTimeInteger
    this.u_start_time_decimalTarget.value = uStartTimeDecimal
    this.u_end_timeTarget.value = uEndTimeInteger
    this.u_end_time_decimalTarget.value = uEndTimeDecimal

    this.g_start_timeTarget.value = gStartTimeInteger
    this.g_start_time_decimalTarget.value = gStartTimeDecimal
    this.g_end_timeTarget.value = gEndTimeInteger
    this.g_end_time_decimalTarget.value = gEndTimeDecimal

    this.h_start_timeTarget.value = hStartTimeInteger
    this.h_start_time_decimalTarget.value = hStartTimeDecimal
    this.h_end_timeTarget.value = hEndTimeInteger
    this.h_end_time_decimalTarget.value = hEndTimeDecimal

    this.j_start_timeTarget.value = jStartTimeInteger
    this.j_start_time_decimalTarget.value = jStartTimeDecimal
    this.j_end_timeTarget.value = jEndTimeInteger
    this.j_end_time_decimalTarget.value = jEndTimeDecimal

    this.b_start_timeTarget.value = bStartTimeInteger
    this.b_start_time_decimalTarget.value = bStartTimeDecimal
    this.b_end_timeTarget.value = bEndTimeInteger
    this.b_end_time_decimalTarget.value = bEndTimeDecimal

    this.n_start_timeTarget.value = nStartTimeInteger
    this.n_start_time_decimalTarget.value = nStartTimeDecimal
    this.n_end_timeTarget.value = nEndTimeInteger
    this.n_end_time_decimalTarget.value = nEndTimeDecimal

    this.m_start_timeTarget.value = mStartTimeInteger
    this.m_start_time_decimalTarget.value = mStartTimeDecimal
    this.m_end_timeTarget.value = mEndTimeInteger
    this.m_end_time_decimalTarget.value = mEndTimeDecimal

    // assign the bpm
    this.stepSequencerOutlet.bpmTarget.value = data.sequencers_data.bpm
    this.stepSequencerOutlet.current_bpmTarget.textContent = data.sequencers_data.bpm

    // assign the active index (hihats,  snares, kicks)
    const activatedHihatSteps = data.sequencers_data.hihats_active_index.split(',')

    const gridStepsArr = Array.from(this.stepSequencerOutlet.gridTarget.children)
    const stepsRowArr = [
      gridStepsArr.slice(16, 32), //pads
      gridStepsArr.slice(32, 48), //hihats
      gridStepsArr.slice(48, 64), //snares
      gridStepsArr.slice(64, 80)  //kicks
    ]

    stepsRowArr[1].forEach((step) => {
      activatedHihatSteps.forEach((stepActivated) => {
        if (step.getAttribute('index') == stepActivated) {
          if (step.classList.contains('bg-gray-400')) {
            step.classList.remove('bg-gray-400')
            step.classList.add('bg-green-300')
            step.dataset.active = "true"
          } else {
            step.classList.add('bg-green-300')
            step.dataset.active = "true"
          }
        }
      })
    })
    
  }

  async connect() {
    this.element['youtube'] = this

    if (!document.querySelector('#topIndex')) {

    const response = await fetch(`/beats/${this.beatIdValue}.json`, {
      method: 'GET'
    })

    const data = await response.json()
    this.videoId = await data.youtubes_data.video_id

    }
  
    if (window.YT) {
      this.initPlayer()
      return
    }

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  
    window.onYouTubeIframeAPIReady = () => {
      this.initPlayer()
    }
  }

  initPlayer() {
      this.youtube = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: document.querySelector('#topIndex') ? "a2LFVWBmoiw" : `${this.videoId}`,
        playerVars: {
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(20)
            event.target.setPlaybackRate(1.2)
            event.target.playVideo()
          }
        }
      })
  }
  
  

  url_validation() {
    const urlInput = this.urlTarget
    const urlError = this.error_urlTarget
    const urlRegex = /^.*(youtu\.be\/|v\/|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

    if(!urlRegex.test(urlInput.value)) {
      urlError.className = "text-red-600 border border-red-600"
      urlError.textContent = "paste valid Youtube Video URL"
    } else {
      urlError.className = ""
      urlError.textContent = ""
    }
  }

  isValidSubmit() {
    if(this.error_urlTarget.textContent == "" && this.urlTarget.value !== "") {
      this.submitTarget.disabled = false
      this.submitTarget.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    } else {
      this.submitTarget.disabled = true
      this.submitTarget.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded"
    }
  }

  embedVideo(event) {
    event.preventDefault();
    var youtubeVideoUrl = this.urlTarget.value
    const DivNotEmbeddedYet = new DOMParser().parseFromString('<div id="player" data-youtube-target="frame"></div>', "text/html").querySelector('#player')
    const urlRegex = /^.*(youtu\.be\/|v\/|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = youtubeVideoUrl.match(urlRegex)
    const extractedVideoId = match[5]

    if(this.frameTarget.tagName == "DIV") {
      const player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: extractedVideoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(20)
            event.target.playVideo()
          }
        }
      });
      this.youtube = player
    } else {
      this.frameTarget.replaceWith(DivNotEmbeddedYet)
      const player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: extractedVideoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(20)
            event.target.playVideo()
          }
        }
      });
      this.youtube = player
    }
  }

  play(event) {
    clearTimeout(this.timeoutId_)
    if(event.target?.closest?.(".ignore-keydown")) return
    if(this.frameTarget.tagName == "DIV") return

    // start time
    const [h, m, s] = this.targetTime(event).start.value.split(":")
    const startTimeHourMinSec = [h, m, s]
    const startTimeDecimalStr = this.targetTime(event).start_decimal.value
    const startTimeDecimalNum = Number('0.' + startTimeDecimalStr)
    const startTimeHourMinSecArray = startTimeHourMinSec.map( str => parseInt(str, 10))
    const startTimeTotalSecond = startTimeHourMinSecArray[0] * 60 * 60 + startTimeHourMinSecArray[1] * 60 + startTimeHourMinSecArray[2] + startTimeDecimalNum

    // end time
    const [end_h, end_m, end_s] = this.targetTime(event).end.value.split(":")
    const endTimeHourMinSec = [end_h, end_m, end_s]
    const endTimeDecimalStr = this.targetTime(event).end_decimal.value
    const endTimeDecimalNum = Number('0.' + endTimeDecimalStr)
    const endTimeHourMinSecArray = endTimeHourMinSec.map( str => parseInt(str, 10))
    const endTimeTotalSecond = endTimeHourMinSecArray[0] * 60 * 60 + endTimeHourMinSecArray[1] * 60 + endTimeHourMinSecArray[2] + endTimeDecimalNum

    // playing length
    const playingTimeTotalSecond = endTimeTotalSecond - startTimeTotalSecond

    this.getPlayer.seekTo(startTimeTotalSecond, true)
    this.getPlayer.playVideo()
    this.timeoutId_ = setTimeout(() => {
      this.getPlayer.pauseVideo()
    }, playingTimeTotalSecond * 1000)

    // highlight the pad when the pad is played
    this.targetTime(event).pad.classList.remove('bg-gray-100')
    this.targetTime(event).pad.classList.add('bg-green-300')
    setTimeout(() => {
      this.targetTime(event).pad.classList.remove('bg-green-300')
      this.targetTime(event).pad.classList.add('bg-gray-100')
    }, 150)
  }

  padVolumeControl () {
    this.getPlayer.setVolume(this.pads_volumeTarget.value)
  }

  setTheCurrentTime (event) {
    const currentTime = Math.floor(this.getPlayer.getCurrentTime() * 10) / 10
    const currentTimeIntPart = Math.trunc(currentTime)
    const currentTimeDecimalPart = Math.round((currentTime - currentTimeIntPart) * 10)

    // this is the hour part of 00:00:00
    if (currentTimeIntPart >= 3600) {
      var currentTimeHourPart = Math.trunc(currentTimeIntPart / 3600)

      if (currentTimeHourPart.toString().length == 1) {
        var currentTimeHourStr = '0' + currentTimeHourPart // 0x
      } else {
        var currentTimeHourStr = String(currentTimeHourPart) // xx
      }
    }

    // this is the min part of 00:00:00
    if (currentTimeIntPart >= 3600) {
      var currentTimeMinPart = Math.trunc((currentTimeIntPart / 60) - (currentTimeHourPart * 60))
    } else {
      var currentTimeMinPart = Math.trunc(currentTimeIntPart / 60)
    }
    
    if (currentTimeMinPart.toString().length == 1) {
      var currentTimeMinStr = '0' + currentTimeMinPart // 0x
    } else {
      var currentTimeMinStr = String(currentTimeMinPart) // xx
    }

    // this is the sec part of 00:00:00
    if (currentTimeIntPart >= 3600) {
      var currentTimeSecPart = currentTimeIntPart - (currentTimeMinPart * 60) - (currentTimeHourPart * 3600)
    } else {
      var currentTimeSecPart = currentTimeIntPart - (currentTimeMinPart * 60)
    }

    if (currentTimeSecPart.toString().length == 1) {
      var currentTimeSecStr = '0' + currentTimeSecPart // 0x
    } else {
      var currentTimeSecStr = String(currentTimeSecPart) // xx
    }

    if (currentTimeHourStr) {
      var inputCurrentTimeIntPart = currentTimeHourStr + ':' + currentTimeMinStr + ':' + currentTimeSecStr
    } else {
      var inputCurrentTimeIntPart = '00:' + currentTimeMinStr + ':' + currentTimeSecStr
    }

    switch (event.target.id) {
      case 't_set_current_time_button':
        var startTimeInput = this.t_start_timeTarget
        var startTimeDecimalPart = this.t_start_time_decimalTarget
        break;
      
      case 'y_set_current_time_button':
        var startTimeInput = this.y_start_timeTarget
        var startTimeDecimalPart = this.y_start_time_decimalTarget
        break;
      
      case 'u_set_current_time_button':
        var startTimeInput = this.u_start_timeTarget
        var startTimeDecimalPart = this.u_start_time_decimalTarget
        break;
      
      case 'g_set_current_time_button':
        var startTimeInput = this.g_start_timeTarget
        var startTimeDecimalPart = this.g_start_time_decimalTarget
        break;
      
      case 'h_set_current_time_button':
        var startTimeInput = this.h_start_timeTarget
        var startTimeDecimalPart = this.h_start_time_decimalTarget
        break;

      case 'j_set_current_time_button':
        var startTimeInput = this.j_start_timeTarget
        var startTimeDecimalPart = this.j_start_time_decimalTarget
        break;

      case 'b_set_current_time_button':
        var startTimeInput = this.b_start_timeTarget
        var startTimeDecimalPart = this.b_start_time_decimalTarget
        break;

      case 'n_set_current_time_button':
        var startTimeInput = this.n_start_timeTarget
        var startTimeDecimalPart = this.n_start_time_decimalTarget
        break;

      case 'm_set_current_time_button':
        var startTimeInput = this.m_start_timeTarget
        var startTimeDecimalPart = this.m_start_time_decimalTarget
        break;
    }

    startTimeInput.value = inputCurrentTimeIntPart
    startTimeDecimalPart.value = currentTimeDecimalPart
  }

  resetAllInputTimings () {
    this.t_start_timeTarget.value = "00:00"
    this.t_start_time_decimalTarget.value = "0"
    this.t_end_timeTarget.value = "00:00"
    this.t_end_time_decimalTarget.value = "0"

    this.y_start_timeTarget.value = "00:00"
    this.y_start_time_decimalTarget.value = "0"
    this.y_end_timeTarget.value = "00:00"
    this.y_end_time_decimalTarget.value = "0"

    this.u_start_timeTarget.value = "00:00"
    this.u_start_time_decimalTarget.value = "0"
    this.u_end_timeTarget.value = "00:00"
    this.u_end_time_decimalTarget.value = "0"

    this.g_start_timeTarget.value = "00:00"
    this.g_start_time_decimalTarget.value = "0"
    this.g_end_timeTarget.value = "00:00"
    this.g_end_time_decimalTarget.value = "0"

    this.h_start_timeTarget.value = "00:00"
    this.h_start_time_decimalTarget.value = "0"
    this.h_end_timeTarget.value = "00:00"
    this.h_end_time_decimalTarget.value = "0"

    this.j_start_timeTarget.value = "00:00"
    this.j_start_time_decimalTarget.value = "0"
    this.j_end_timeTarget.value = "00:00"
    this.j_end_time_decimalTarget.value = "0"

    this.b_start_timeTarget.value = "00:00"
    this.b_start_time_decimalTarget.value = "0"
    this.b_end_timeTarget.value = "00:00"
    this.b_end_time_decimalTarget.value = "0"

    this.n_start_timeTarget.value = "00:00"
    this.n_start_time_decimalTarget.value = "0"
    this.n_end_timeTarget.value = "00:00"
    this.n_end_time_decimalTarget.value = "0"

    this.m_start_timeTarget.value = "00:00"
    this.m_start_time_decimalTarget.value = "0"
    this.m_end_timeTarget.value = "00:00"
    this.m_end_time_decimalTarget.value = "0"
  }

  targetTime(event) {
    if(event.key == "t") return {
      start:          this.t_start_timeTarget, 
      start_decimal:  this.t_start_time_decimalTarget,
      end:            this.t_end_timeTarget,
      end_decimal:    this.t_end_time_decimalTarget,
      pad:            this.t_padTarget
    }
    if(event.key == "y") return {
      start:          this.y_start_timeTarget,
      start_decimal:  this.y_start_time_decimalTarget,
      end:            this.y_end_timeTarget,
      end_decimal:    this.y_end_time_decimalTarget,
      pad:            this.y_padTarget
    }
    if(event.key == "u") return {
      start:          this.u_start_timeTarget,
      start_decimal:  this.u_start_time_decimalTarget,
      end:            this.u_end_timeTarget,
      end_decimal:    this.u_end_time_decimalTarget,
      pad:            this.u_padTarget
    }
    if(event.key == "g") return {
      start:          this.g_start_timeTarget,
      start_decimal:  this.g_start_time_decimalTarget,
      end:            this.g_end_timeTarget,
      end_decimal:    this.g_end_time_decimalTarget,
      pad:            this.g_padTarget
    }
    if(event.key == "h") return {
      start:          this.h_start_timeTarget,
      start_decimal:  this.h_start_time_decimalTarget,
      end:            this.h_end_timeTarget,
      end_decimal:    this.h_end_time_decimalTarget,
      pad:            this.h_padTarget
    }
    if(event.key == "j") return {
      start:          this.j_start_timeTarget,
      start_decimal:  this.j_start_time_decimalTarget,
      end:            this.j_end_timeTarget,
      end_decimal:    this.j_end_time_decimalTarget,
      pad:            this.j_padTarget
    }
    if(event.key == "b") return {
      start:          this.b_start_timeTarget,
      start_decimal:  this.b_start_time_decimalTarget,
      end:            this.b_end_timeTarget,
      end_decimal:    this.b_end_time_decimalTarget,
      pad:            this.b_padTarget
    }
    if(event.key == "n") return {
      start:          this.n_start_timeTarget,
      start_decimal:  this.n_start_time_decimalTarget,
      end:            this.n_end_timeTarget,
      end_decimal:    this.n_end_time_decimalTarget,
      pad:            this.n_padTarget
    }
    if(event.key == "m") return {
      start:          this.m_start_timeTarget,
      start_decimal:  this.m_start_time_decimalTarget,
      end:            this.m_end_timeTarget,
      end_decimal:    this.m_end_time_decimalTarget,
      pad:            this.m_padTarget
    }

    if(event.target.id == "t_pad") return this.t_start_timeTarget
    if(event.target.id == "y_pad") return this.y_start_timeTarget
    if(event.target.id == "u_pad") return this.u_start_timeTarget
    if(event.target.id == "g_pad") return this.g_start_timeTarget
    if(event.target.id == "h_pad") return this.h_start_timeTarget
    if(event.target.id == "j_pad") return this.j_start_timeTarget
    if(event.target.id == "b_pad") return this.b_start_timeTarget
    if(event.target.id == "n_pad") return this.n_start_timeTarget
    if(event.target.id == "m_pad") return this.m_start_timeTarget
  }

  get getPlayer() {
    return this.youtube
  }
}
