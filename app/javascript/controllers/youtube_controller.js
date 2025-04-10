import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
                    "url",
                    "error_url",
  ]

  url_validation() {
    console.log(this.urlTarget.value)
    const urlInput = this.urlTarget
    const urlError = this.error_urlTarget
    const urlRegex = /^.*(youtu\.be\/|v\/|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

    if(!urlRegex.test(urlInput.value)) {
      console.log("正規表現と一致しません")
      urlError.className = "text-red-600 border border-red-600"
      urlError.textContent = "paste valid Youtube Video URL"
    }
  }

  fetch_url() {
    console.log(this.urlTarget.value)
  }
}
