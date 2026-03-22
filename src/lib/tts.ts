'use client'

/**
 * VoiceGuide - 音声ガイド再生
 *
 * 優先順位:
 * 1. プリレコード音声ファイル (public/audio/guide/*.mp3) — 最高品質
 * 2. Web Speech API (フォールバック) — デバイス依存
 */
export class VoiceGuide {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null
  private enabled = true
  private currentAudio: HTMLAudioElement | null = null
  private audioCache: Map<string, HTMLAudioElement> = new Map()
  private usePrerecorded = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis
      this.loadVoice()
      this.checkPrerecordedAudio()
    }
  }

  private async checkPrerecordedAudio() {
    // Check if pre-recorded audio files exist
    try {
      const res = await fetch('/audio/guide/day1_01.mp3', { method: 'HEAD' })
      this.usePrerecorded = res.ok
      if (this.usePrerecorded) {
        console.log('🎙️ 高品質プリレコード音声を使用します')
      }
    } catch {
      this.usePrerecorded = false
    }
  }

  private loadVoice() {
    if (!this.synth) return

    const setVoice = () => {
      const voices = this.synth!.getVoices()
      // Prefer O-Ren (Neural) > Kyoko (Enhanced) > any Japanese voice
      this.voice =
        voices.find(v => v.name.includes('O-Ren')) ||
        voices.find(v => v.name.includes('Kyoko') && v.name.includes('Enhanced')) ||
        voices.find(v => v.lang.startsWith('ja')) ||
        voices[0] || null
    }

    setVoice()
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice
    }
  }

  /**
   * Speak guide text
   * @param text - Text to speak (also used as fallback for TTS)
   * @param fileKey - Optional key for pre-recorded file (e.g. "day1_01")
   */
  speak(text: string, fileKey?: string) {
    if (!this.enabled) return

    // Stop any current playback
    this.stop()

    // Try pre-recorded audio first
    if (this.usePrerecorded && fileKey) {
      this.playFile(fileKey)
      return
    }

    // Fallback: Web Speech API with improved settings
    if (!this.synth) return
    this.synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.8   // Slower for meditation
    utterance.pitch = 0.85 // Lower for calm tone
    utterance.volume = 0.85

    if (this.voice) {
      utterance.voice = this.voice
    }

    this.synth.speak(utterance)
  }

  private playFile(fileKey: string) {
    const path = `/audio/guide/${fileKey}.mp3`

    let audio = this.audioCache.get(fileKey)
    if (!audio) {
      audio = new Audio(path)
      audio.volume = 0.9
      this.audioCache.set(fileKey, audio)
    }

    audio.currentTime = 0
    audio.play().catch(() => {})
    this.currentAudio = audio
  }

  toggle() {
    this.enabled = !this.enabled
    if (!this.enabled) this.stop()
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio = null
    }
    this.synth?.cancel()
  }
}
