'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { FREE_PROGRAMS, PREMIUM_PROGRAMS, MeditationProgram, GuideStep } from '@/lib/audio-guides'
import { StepDetector } from '@/lib/step-detector'
import { VoiceGuide } from '@/lib/tts'

type Screen = 'select' | 'playing' | 'complete'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function MeditationPage() {
  const [screen, setScreen] = useState<Screen>('select')
  const [selectedProgram, setSelectedProgram] = useState<MeditationProgram | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [steps, setSteps] = useState(0)
  const [currentGuide, setCurrentGuide] = useState<GuideStep | null>(null)
  const [breathPhase, setBreathPhase] = useState<'in' | 'out' | 'hold' | null>(null)
  const [voiceMuted, setVoiceMuted] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepDetectorRef = useRef<StepDetector | null>(null)
  const voiceRef = useRef<VoiceGuide | null>(null)
  const guideIndexRef = useRef(0)

  // Initialize voice guide
  useEffect(() => {
    voiceRef.current = new VoiceGuide()
    return () => voiceRef.current?.stop()
  }, [])

  const startMeditation = useCallback(async (program: MeditationProgram) => {
    if (program.isPremium) {
      window.location.href = '/pricing'
      return
    }

    setSelectedProgram(program)
    setScreen('playing')
    setElapsed(0)
    setSteps(0)
    setIsPlaying(true)
    guideIndexRef.current = 0

    // Start step detector
    const detector = new StepDetector((count) => setSteps(count))
    stepDetectorRef.current = detector
    await detector.start()

    // Speak first guide
    if (program.steps.length > 0) {
      setCurrentGuide(program.steps[0])
      setBreathPhase(program.steps[0].breathe || null)
      voiceRef.current?.speak(program.steps[0].speech)
    }
  }, [])

  // Timer
  useEffect(() => {
    if (isPlaying && selectedProgram) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 1
          const totalSeconds = selectedProgram.duration * 60

          // Check for guide steps
          const steps = selectedProgram.steps
          const nextIndex = guideIndexRef.current + 1
          if (nextIndex < steps.length && next >= steps[nextIndex].time) {
            guideIndexRef.current = nextIndex
            setCurrentGuide(steps[nextIndex])
            setBreathPhase(steps[nextIndex].breathe || null)
            if (!voiceMuted) {
              voiceRef.current?.speak(steps[nextIndex].speech)
            }
          }

          // Complete
          if (next >= totalSeconds) {
            setIsPlaying(false)
            setScreen('complete')
            stepDetectorRef.current?.stop()
            if (timerRef.current) clearInterval(timerRef.current)
          }

          return next
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, selectedProgram, voiceMuted])

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  const stopMeditation = () => {
    setIsPlaying(false)
    stepDetectorRef.current?.stop()
    voiceRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    setScreen('complete')
  }

  const toggleVoice = () => {
    setVoiceMuted(prev => !prev)
    voiceRef.current?.toggle()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Program Selection Screen
  if (screen === 'select') {
    return (
      <div className="min-h-screen bg-hozen-cream">
        <div className="max-w-lg mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-8">
            <BackIcon />
            <span>ホーム</span>
          </Link>

          <h1 className="text-3xl font-bold text-hozen-green mb-2 font-jp">歩禅プログラム</h1>
          <p className="text-hozen-dark/60 mb-8">今日の気分に合わせて選んでください</p>

          {/* Free Programs */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-hozen-green/60 uppercase tracking-wider mb-4">
              無料プログラム
            </h2>
            <div className="space-y-3">
              {FREE_PROGRAMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => startMeditation(p)}
                  className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-hozen-green/5 active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-hozen-green text-lg font-jp">{p.title}</h3>
                      <p className="text-hozen-dark/50 text-sm mt-1">{p.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-hozen-dark/40">{p.duration}分</span>
                      <div className="w-10 h-10 bg-hozen-gold/10 rounded-full flex items-center justify-center text-hozen-gold">
                        <PlayIcon />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Programs */}
          <div>
            <h2 className="text-sm font-semibold text-hozen-gold uppercase tracking-wider mb-4">
              プレミアム ✨
            </h2>
            <div className="space-y-3">
              {PREMIUM_PROGRAMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => startMeditation(p)}
                  className="w-full text-left bg-white/60 rounded-2xl p-5 border border-hozen-gold/20 hover:border-hozen-gold/40 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-hozen-dark/80 text-lg font-jp">{p.title}</h3>
                      <p className="text-hozen-dark/40 text-sm mt-1">{p.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-hozen-dark/40">{p.duration}分</span>
                      <div className="w-10 h-10 bg-hozen-gold/10 rounded-full flex items-center justify-center text-hozen-gold">
                        <LockIcon />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-hozen-gold font-semibold hover:underline">
              プレミアムプランで全プログラム解放 →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Playing Screen
  if (screen === 'playing' && selectedProgram) {
    const totalSeconds = selectedProgram.duration * 60
    const progress = elapsed / totalSeconds

    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green flex flex-col items-center justify-center px-6 relative">
        {/* Stop button */}
        <button
          onClick={stopMeditation}
          className="absolute top-8 right-6 text-white/40 hover:text-white/80 text-sm"
        >
          終了する
        </button>

        {/* Breathing circle */}
        <div className="relative mb-12">
          <div
            className={`w-48 h-48 rounded-full border-2 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
              breathPhase === 'in'
                ? 'scale-125 border-hozen-gold/60 bg-hozen-gold/10'
                : breathPhase === 'out'
                ? 'scale-90 border-white/30 bg-white/5'
                : 'scale-100 border-white/20 bg-white/5'
            }`}
          >
            <div className="text-center">
              <div className="text-5xl font-light text-white mb-1">{formatTime(elapsed)}</div>
              <div className="text-white/40 text-sm">/ {formatTime(totalSeconds)}</div>
            </div>
          </div>

          {/* Progress ring */}
          <svg className="absolute inset-0 w-48 h-48 -rotate-90">
            <circle
              cx="96" cy="96" r="90"
              fill="none"
              stroke="rgba(197, 165, 90, 0.3)"
              strokeWidth="4"
            />
            <circle
              cx="96" cy="96" r="90"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
        </div>

        {/* Guide text */}
        <div className="text-center mb-12 min-h-[80px]">
          {currentGuide && (
            <p className="text-white text-xl leading-relaxed font-light whitespace-pre-line transition-opacity duration-500">
              {currentGuide.text}
            </p>
          )}
          {breathPhase && (
            <p className="text-hozen-gold/80 text-sm mt-3">
              {breathPhase === 'in' ? '吸って...' : breathPhase === 'out' ? '吐いて...' : '止めて...'}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button onClick={toggleVoice} className="text-white/50 hover:text-white/80 transition-colors p-2">
            <VolumeIcon muted={voiceMuted} />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="text-white/50 text-sm min-w-[60px] text-center">
            🚶 {steps} 歩
          </div>
        </div>
      </div>
    )
  }

  // Complete Screen
  if (screen === 'complete') {
    const totalMinutes = selectedProgram ? selectedProgram.duration : Math.floor(elapsed / 60)
    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green to-hozen-dark flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-8">🙏</div>
        <h1 className="text-3xl font-bold text-white mb-4 font-jp">お疲れさまでした</h1>
        <p className="text-white/60 text-lg mb-12">素晴らしい歩禅でした</p>

        <div className="grid grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-3xl font-bold text-hozen-gold">{formatTime(elapsed)}</div>
            <div className="text-white/40 text-sm mt-1">瞑想時間</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hozen-gold">{steps}</div>
            <div className="text-white/40 text-sm mt-1">歩数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hozen-gold">1</div>
            <div className="text-white/40 text-sm mt-1">連続日数</div>
          </div>
        </div>

        <div className="space-y-4 w-full max-w-xs">
          <button
            onClick={() => { setScreen('select'); setElapsed(0); setSteps(0) }}
            className="w-full px-8 py-4 bg-hozen-gold text-hozen-dark font-semibold rounded-full text-lg hover:bg-hozen-gold-light transition-all"
          >
            もう一度
          </button>
          <Link
            href="/pricing"
            className="w-full inline-block px-8 py-4 bg-white/10 text-white font-medium rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all text-center"
          >
            プレミアムで更に深く →
          </Link>
          <Link
            href="/"
            className="block text-white/40 hover:text-white/60 mt-4"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    )
  }

  return null
}
