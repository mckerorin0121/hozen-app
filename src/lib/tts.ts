'use client'

export class VoiceGuide {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null
  private enabled = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis
      this.loadVoice()
    }
  }

  private loadVoice() {
    if (!this.synth) return

    const setVoice = () => {
      const voices = this.synth!.getVoices()
      // Prefer Japanese voices
      this.voice = voices.find(v => v.lang.startsWith('ja')) ||
                   voices.find(v => v.lang.startsWith('ja-JP')) ||
                   voices[0] || null
    }

    setVoice()
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice
    }
  }

  speak(text: string) {
    if (!this.synth || !this.enabled) return

    // Cancel any ongoing speech
    this.synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.85  // Slightly slower for meditation
    utterance.pitch = 0.9  // Slightly lower for calm tone
    utterance.volume = 0.8

    if (this.voice) {
      utterance.voice = this.voice
    }

    this.synth.speak(utterance)
  }

  toggle() {
    this.enabled = !this.enabled
    if (!this.enabled) {
      this.synth?.cancel()
    }
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }

  stop() {
    this.synth?.cancel()
  }
}
