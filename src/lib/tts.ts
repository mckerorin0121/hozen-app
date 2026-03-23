'use client'

import type { Locale } from './i18n'

export type VoiceGender = 'female' | 'male'

/**
 * VoiceGuide - 音声ガイド再生
 *
 * 声の選択:
 * - ja/female: Shiori (Azure TTS ja-JP-ShioriNeural)
 * - ja/male:   Daichi (Azure TTS ja-JP-DaichiNeural)
 * - en/female: Aria   (Azure TTS en-US-AriaNeural)
 * - en/male:   Guy    (Azure TTS en-US-GuyNeural)
 */
export class VoiceGuide {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null
  private enabled = true
  private sharedAudio: HTMLAudioElement | null = null
  private usePrerecorded = false
  private gender: VoiceGender = 'female'
  private locale: Locale = 'ja'
  private audioUnlocked = false
  private audioContext: AudioContext | null = null

  constructor(gender: VoiceGender = 'female', locale: Locale = 'ja') {
    this.gender = gender
    this.locale = locale
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis
      this.loadVoice()
      this.checkPrerecordedAudio()
      this.sharedAudio = new Audio()
      this.sharedAudio.volume = 0.9
    }
  }

  async unlock(): Promise<void> {
    if (this.audioUnlocked) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.audioContext = new AudioCtx()
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume()
        }
      }
      if (this.sharedAudio) {
        this.sharedAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRwMHAAAAAAD/+1DEAAAB8ANoAAAAIAAANIAAAAQAAAAA//tQxBcAAADSAAAAAAAAANIAAAAQAAAAAA=='
        await this.sharedAudio.play()
        this.sharedAudio.pause()
        this.sharedAudio.currentTime = 0
      }
      this.audioUnlocked = true
    } catch (e) {
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

  setLocale(locale: Locale) {
    if (this.locale !== locale) {
      this.locale = locale
      this.loadVoice()
      this.checkPrerecordedAudio()
    }
  }

  getLocale(): Locale {
    return this.locale
  }

  private getAudioPrefix(): string {
    if (this.locale === 'en') return `/audio/guide/en_${this.gender}`
    return `/audio/guide/${this.gender}`
  }

  private async checkPrerecordedAudio() {
    try {
      const res = await fetch(`${this.getAudioPrefix()}/day1_01.mp3`, { method: 'HEAD' })
      this.usePrerecorded = res.ok
    } catch {
      this.usePrerecorded = false
    }
  }

  private loadVoice() {
    if (!this.synth) return
    const setVoice = () => {
      const voices = this.synth!.getVoices()
      if (this.locale === 'en') {
        this.voice =
          voices.find(v => v.name.includes('Samantha')) ||
          voices.find(v => v.lang.startsWith('en') && v.name.includes('Enhanced')) ||
          voices.find(v => v.lang.startsWith('en')) ||
          voices[0] || null
      } else {
        this.voice =
          voices.find(v => v.name.includes('O-Ren')) ||
          voices.find(v => v.name.includes('Kyoko') && v.name.includes('Enhanced')) ||
          voices.find(v => v.lang.startsWith('ja')) ||
          voices[0] || null
      }
    }
    setVoice()
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice
    }
  }

  speak(text: string, fileKey?: string) {
    if (!this.enabled) return
    this.stop()

    if (this.usePrerecorded && fileKey) {
      this.playFile(fileKey)
      return
    }

    if (!this.synth) return
    this.synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = this.locale === 'en' ? 'en-US' : 'ja-JP'
    utterance.rate = 0.8
    utterance.pitch = 0.85
    utterance.volume = 0.85
    if (this.voice) utterance.voice = this.voice
    this.synth.speak(utterance)
  }

  private playFile(fileKey: string) {
    const path = `${this.getAudioPrefix()}/${fileKey}.mp3`
    if (!this.sharedAudio) return
    this.sharedAudio.src = path
    this.sharedAudio.currentTime = 0
    this.sharedAudio.play().catch(() => {
      console.warn(`Audio play failed for ${fileKey}`)
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
