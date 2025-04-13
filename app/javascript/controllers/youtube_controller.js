import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
                    "url_melody",
                    "url_drums",
                    "error_url_melody",
                    "error_url_drums",
                    "submit",
                    "frame",
                    "t_start_time",
                    "y_start_time",
                    "u_start_time",
                    "g_start_time",
                    "h_start_time",
                    "j_start_time",
                    "b_start_time",
                    "n_start_time",
                    "m_start_time",
  ]

  initialize() {
    this.element['youtube'] = this
  }

  connect() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  url_validation(event) {
    const urlMelodyInput = this.url_melodyTarget
    const urlDrumsInput = this.url_drumsTarget
    const urlMelodyError = this.error_url_melodyTarget
    const urlDrumsError = this.error_url_drumsTarget
    const urlRegex = /^.*(youtu\.be\/|v\/|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

    if(event.target.id == "url_melody") {
      if(!urlRegex.test(urlMelodyInput.value)) {
        this.urlError.className = "text-red-600 border border-red-600"
        this.urlError.textContent = "paste valid Youtube Video URL"
      } else {
        this.urlError.className = ""
        this.urlError.textContent = ""
      }
    } else {
      if(!urlRegex.test(urlDrumsInput.value)) {
        urlDrumsError.className = "text-red-600 border border-red-600"
        urlDrumsError.textContent = "paste valid Youtube Video URL"
      } else {
        urlDrumsError.className = ""
        urlDrumsError.textContent = ""
      }
    }
  }

  urlInput(event) {
    if(event.target.id == "url_melody") return this.url_melodyTarget
    if(event.target.id == "url_drums") return this.url_drumsTarget
  }

  urlError(event) {
    if(event.target.id == "url_error_melody") return this.error_url_melodyTarget 
    if(event.target.id == "url_error_drums") return this.error_url_drumsTarget 
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
      const playerMelody = new YT.Player('player_melody', {
        height: '390',
        width: '640',
        videoId: extractedVideoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          onReady: (event) => {
            event.target.playVideo()
          }
        }
      });
      const playerDrums = new YT.Player('player_drums', {
        height: '390',
        width: '640',
        videoId: extractedVideoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          onReady: (event) => {
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
            event.target.playVideo()
          }
        }
      });
      this.youtube = player
    }
  }

  play(event) {
    if(event.target.closest(".ignore-keydown")) return
    if(this.frameTarget.tagName == "DIV") return

    const [m,s] = this.targetTime(event).value.split(":")
    const minSecArray = [m,s].map( str => parseInt(str, 10))
    const totalSecondResult = minSecArray[0]*60 + minSecArray[1]

    this.getPlayer.seekTo(totalSecondResult, true)
    this.getPlayer.playVideo()
  }

  targetTime(event) {
    if(event.key == "t") return this.t_start_timeTarget
    if(event.key == "y") return this.y_start_timeTarget
    if(event.key == "u") return this.u_start_timeTarget
    if(event.key == "g") return this.g_start_timeTarget
    if(event.key == "h") return this.h_start_timeTarget
    if(event.key == "j") return this.j_start_timeTarget
    if(event.key == "b") return this.b_start_timeTarget
    if(event.key == "n") return this.n_start_timeTarget
    if(event.key == "m") return this.m_start_timeTarget

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
