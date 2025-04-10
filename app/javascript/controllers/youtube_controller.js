import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
                    "url",
                    "error_url",
                    "submit"
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
    } else {
      urlError.className = ""
      urlError.textContent = ""
    }
  }

  isValidSubmit() {
    if(this.error_urlTarget.textContent == "" && this.urlTarget.value !== "") {
      console.log("ボタンは有効化されます")
      this.submitTarget.disabled = true
      this.submitTarget.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    } else {
      this.submitTarget.disabled = false
      this.submitTarget.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded"
    }
  }

  fetch_url() {
    console.log(this.urlTarget.value)
  }
}
