import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
                    "url",
                    "error_url",
                    "submit"
  ]

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
    const urlRegex = /^.*(youtu\.be\/|v\/|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = youtubeVideoUrl.match(urlRegex)
    const videoId = match[5]
  }
}
