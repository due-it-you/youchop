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

    if(urlInput.value === "") {
      console.log("中身がありませんよ")
      urlError.className = "text-red-500 border border-red-400"
      urlError.textContent = "put youtube video URL here"
    } else {
      urlError.className = ""
      urlError.textContent = ""
    }

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
