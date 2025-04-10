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

    if(this.urlTarget.value === "") {
      console.log("中身がありませんよ")
      urlError.className = "text-red-500 border border-red-400"
      urlError.textContent = "put youtube video URL here"
    } else {
      urlError.className = ""
      urlError.textContent = ""
    }
  }

  fetch_url() {
    console.log(this.urlTarget.value)
  }
}
