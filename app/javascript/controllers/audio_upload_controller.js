import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    conversationId: Number
  }

  static targets = ["status"]
  mediaRecorder = null
  audioChunks = []
  stream = null

  clearSession() { window.location.href = '/' }

  connect() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data)
          const audioBlob = new Blob([event.data], { type: 'audio/wav' })
          this.uploadAudio(audioBlob)
        }
        this.mediaRecorder.onstop = () => {
          this.audioChunks = []
        }
      })
      .catch(error => console.error("Audio recording error:", error))
  }

  uploadAudio(audioBlob) {
    const formData = new FormData()
    formData.append('audio_data', audioBlob)
    formData.append('conversation_id', this.conversationIdValue)

    fetch('/conversation_messages', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'text/vnd.turbo-stream.html',
      },
    })
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          Turbo.renderStreamMessage(html)
          this.statusTarget.textContent = "Message sent."
        })
      } else {
        throw new Error('Network response was not ok')
      }
    })
    .catch(error => {
      console.error('Error:', error)
      this.statusTarget.textContent = "Upload failed."
    })
  }

  async toggleRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop()
      this.element.querySelector("button").textContent = "Start Recording"
      this.statusTarget.textContent = "Recording stopped"
      this.stream.getTracks().forEach(track => track.stop())
    } else {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.audioChunks = []
        
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data)
          const audioBlob = new Blob([event.data], { type: 'audio/wav' })
          this.uploadAudio(audioBlob)
        }
        
        this.mediaRecorder.onstop = () => {
          this.audioChunks = []
        }

        this.mediaRecorder.start(5000)
        this.element.querySelector("button").textContent = "Stop Recording"
        this.statusTarget.textContent = "Recording..."
      } catch (error) {
        console.error("Audio recording error:", error)
        this.statusTarget.textContent = "Failed to start recording"
      }
    }
  }
}

