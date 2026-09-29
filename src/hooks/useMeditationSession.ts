'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { MeditationProgram, GuideStep } from '@/lib/audio-guides'
import { StepDetector } from '@/lib/step-detector'
import { VoiceGuide, VoiceGender } from '@/lib/tts'
import { playBell, playBellShort } from '@/lib/bell'
import type { Locale } from '@/lib/i18n'

export type SessionPhase = 'idle' | 'prepare' | 'playing' | 'complete'

export interface FinishedSession {
  program: MeditationProgram
  elapsed: number
  steps: number
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern)
  }
}

/** Day 7 steps are bell-only; everything else is narration. */
function playStep(step: GuideStep, voice: VoiceGuide | null) {
  if (step.fileKey?.startsWith('bell_')) {
    if (step.fileKey === 'bell_half') playBellShort(0.25).catch(() => {})
    else if (step.fileKey === 'bell_end') playBell(0.35).catch(() => {})
    else playBell(0.3).catch(() => {})
  } else if (step.speech) {
    voice?.speak(step.speech, step.fileKey)
  }
}

/**
 * Meditation session lifecycle: countdown, timer, guide progression, voice and step detection.
 * `onFinish` fires once per session, whether it ends naturally or the user stops it.
 */
export function useMeditationSession(
  gender: VoiceGender,
  locale: Locale,
  onFinish: (session: FinishedSession) => void,
) {
  const [phase, setPhase] = useState<SessionPhase>('idle')
  const [program, setProgram] = useState<MeditationProgram | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [steps, setSteps] = useState(0)
  const [currentGuide, setCurrentGuide] = useState<GuideStep | null>(null)
  const [countdown, setCountdown] = useState(-1)
  const [voiceMuted, setVoiceMuted] = useState(false)

  const voiceRef = useRef<VoiceGuide | null>(null)
  const stepDetectorRef = useRef<StepDetector | null>(null)
  const guideIndexRef = useRef(0)
  const elapsedRef = useRef(0)
  const stepsRef = useRef(0)
  const programRef = useRef<MeditationProgram | null>(null)
  const finishedRef = useRef(true)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  useEffect(() => {
    voiceRef.current = new VoiceGuide(gender, locale)
    return () => voiceRef.current?.stop()
    // Created once; gender/locale changes are pushed via the effects below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { voiceRef.current?.setGender(gender) }, [gender])
  useEffect(() => { voiceRef.current?.setLocale(locale) }, [locale])

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setIsPlaying(false)
    stepDetectorRef.current?.stop()
    setPhase('complete')
    if (programRef.current) {
      onFinishRef.current({ program: programRef.current, elapsed: elapsedRef.current, steps: stepsRef.current })
    }
  }, [])

  const start = useCallback(async (next: MeditationProgram) => {
    // Must run inside the tap handler so iOS allows audio playback
    await voiceRef.current?.unlock()

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_GUIDES',
        gender: voiceRef.current?.getGender() || 'female',
      })
    }

    programRef.current = next
    finishedRef.current = false
    elapsedRef.current = 0
    stepsRef.current = 0
    guideIndexRef.current = 0
    setProgram(next)
    setElapsed(0)
    setSteps(0)
    setCurrentGuide(null)
    setPhase('prepare')

    setCountdown(3)
    for (let i = 3; i >= 1; i--) {
      await new Promise(r => setTimeout(r, 1000))
      setCountdown(i - 1)
    }

    playBell(0.35).catch(() => {})
    vibrate(200)
    setPhase('playing')
    setIsPlaying(true)

    const detector = new StepDetector((count) => {
      stepsRef.current = count
      setSteps(count)
    })
    stepDetectorRef.current = detector
    await detector.start()

    if (next.steps.length > 0) {
      const first = next.steps[0]
      setCurrentGuide(first)
      playStep(first, voiceRef.current)
    }
  }, [])

  // One tick per second while playing
  useEffect(() => {
    if (!isPlaying || !program) return
    const timer = setInterval(() => {
      const nextElapsed = elapsedRef.current + 1
      elapsedRef.current = nextElapsed
      setElapsed(nextElapsed)

      const nextIndex = guideIndexRef.current + 1
      if (nextIndex < program.steps.length && nextElapsed >= program.steps[nextIndex].time) {
        guideIndexRef.current = nextIndex
        const step = program.steps[nextIndex]
        setCurrentGuide(step)
        vibrate(100)
        if (!voiceMuted) playStep(step, voiceRef.current)
      }

      if (nextElapsed >= program.duration * 60) {
        playBell(0.4).catch(() => {})
        vibrate([200, 100, 200])
        finish()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [isPlaying, program, voiceMuted, finish])

  const togglePlay = useCallback(() => setIsPlaying(p => !p), [])

  const toggleVoice = useCallback(() => {
    setVoiceMuted(m => !m)
    voiceRef.current?.toggle()
  }, [])

  const stop = useCallback(() => {
    voiceRef.current?.stop()
    playBellShort(0.25).catch(() => {})
    finish()
  }, [finish])

  const reset = useCallback(() => {
    setPhase('idle')
    setCurrentGuide(null)
  }, [])

  return {
    phase, program, isPlaying, elapsed, steps, currentGuide, countdown, voiceMuted,
    start, togglePlay, toggleVoice, stop, reset,
  }
}
