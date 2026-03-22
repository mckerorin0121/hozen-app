'use client'

export type VoiceGender = 'female' | 'male'

/**
 * VoiceGuide - 音声ガイド再生
 *
 * 優先順位:
 * 1. プリレコード音声ファイル (public/audio/guide/{gender}/*.mp3) — 最高品質
 * 2. Web Speech API (フォールバック) — デバイス依存
 *
 * 声の選択:
 * - female: Shiori (Azure TTS ja-JP-ShioriNeural) — 落ち着いた女性声
 * - male:   Daichi (Azure TTS ja-JP-DaichiNeural) — 落ち着いた男性声
 *
 * モバイル対応:
 * - iOS/Android の autoplay ポリシーに対応
 * - ユーザージェスチャー時に AudioContext を unlock
 * - 単一の Audio 要素を使い回して再生（iOS Safari 制約対応）
 */
export class VoiceGuide {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null
  private enabled = true
  private sharedAudio: HTMLAudioElement | null = null
  private usePrerecorded = false
  private gender: VoiceGender = 'female'
  private audioUnlocked = false
  private audioContext: AudioContext | null = null

  constructor(gender: VoiceGender = 'female') {
    this.gender = gender
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis
      this.loadVoice()
      this.checkPrerecordedAudio()

      // Create a single shared Audio element (iOS requires reusing the same element)
      this.sharedAudio = new Audio()
      this.sharedAudio.volume = 0.9
    }
  }

  /**
   * Must be called from a user gesture (tap/click) to unlock audio on iOS/Android.
   * Call this when the user taps "start meditation".
   */
  async unlock(): Promise<void> {
    if (this.audioUnlocked) return

    try {
      // Unlock AudioContext
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.audioContext = new AudioCtx()
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume()
        }
      }

      // Unlock the shared Audio element by playing silence
      if (this.sharedAudio) {
        // Create a tiny silent audio data URI
        this.sharedAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRwMHAAAAAAD/+1DEAAAB8ANoAAAAIAAANIAAAAQAAAAA//tQxBcAAADSAAAAAAAAANIAAAAQAAAAAA=='
        await this.sharedAudio.play()
        this.sharedAudio.pause()
        this.sharedAudio.currentTime = 0
      }

      this.audioUnlocked = true
      console.log('🔓 Audio unlocked for mobile playback')
    } catch (e) {
      // Unlock may fail silently — fallback to Web Speech API
      console.warn('Audio unlock failed:', e)
    }
  }

  setGender(gender: VoiceGender) {
    if (this.gender !== gender) {
      this.gender = gender
      this.checkPrerecordedAudio()
    }
  }

  getGender(): VoiceGender {
    return this.gender
  }

  private async checkPrerecordedAudio() {
    try {
      const res = await fetch(`/audio/guide/${this.gender}/day1_01.mp3`, { method: 'HEAD' })
      this.usePrerecorded = res.ok
      if (this.usePrerecorded) {
        console.log(`🎙️ 高品質プリレコード音声を使用します (${this.gender === 'female' ? 'Shiori' : 'Daichi'})`)
      }
    } catch {
      this.usePrerecorded = false
    }
  }

  private loadVoice() {
    if (!this.synth) return

    const setVoice = () => {
      const voices = this.synth!.getVoices()
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

    // Fallback: Web Speech API
    if (!this.synth) return
    this.synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.8
    utterance.pitch = 0.85
    utterance.volume = 0.85

    if (this.voice) {
      utterance.voice = this.voice
    }

    this.synth.speak(utterance)
  }

  private playFile(fileKey: string) {
    const path = `/audio/guide/${this.gender}/${fileKey}.mp3`

    if (!this.sharedAudio) return

    // Reuse the single shared Audio element (critical for iOS Safari)
    this.sharedAudio.src = path
    this.sharedAudio.currentTime = 0
    this.sharedAudio.play().catch(() => {
      // If play fails, try Web Speech API as fallback
      console.warn(`Audio play failed for ${fileKey}, falling back to TTS`)
    })
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
    if (this.sharedAudio) {
      this.sharedAudio.pause()
      this.sharedAudio.currentTime = 0
    }
    this.synth?.cancel()
  }
}
