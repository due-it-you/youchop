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
    this.videoId = data.youtubes_data.video_id
  }

  connect() {
    this.element['youtube'] = this
  
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
