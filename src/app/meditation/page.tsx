'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { FREE_PROGRAMS, PREMIUM_PROGRAMS, MeditationProgram, GuideStep } from '@/lib/audio-guides'
import { StepDetector } from '@/lib/step-detector'
import { VoiceGuide, VoiceGender } from '@/lib/tts'
import { saveSession, getStats, formatTotalTime, SessionStats } from '@/lib/session-history'

type Screen = 'onboarding' | 'select' | 'prepare' | 'playing' | 'complete'
type AmbientType = 'forest' | 'stream' | 'rain' | 'wind' | 'none'

/* ─── Icons ─── */
function BackIcon() {
  return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
}
function PlayIcon({ size = 32 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
}
function PauseIcon() {
  return <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
}
function LockIcon() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
}

/* ─── Ambient Sound ─── */
const AMBIENTS: { id: AmbientType; label: string; emoji: string }[] = [
  { id: 'forest', label: '森', emoji: '🌿' },
  { id: 'stream', label: '小川', emoji: '💧' },
  { id: 'rain', label: '雨', emoji: '🌧️' },
  { id: 'wind', label: '風', emoji: '🌬️' },
  { id: 'none', label: 'なし', emoji: '🔇' },
]

/* ─── Onboarding ─── */
const ONBOARDING_SLIDES = [
  {
    emoji: '🚶‍♂️',
    title: '歩く瞑想って？',
    body: '歩行瞑想（ウォーキングメディテーション）は、2500年以上の歴史を持つ瞑想法です。\n\n座る瞑想と違い、日常の「歩く」動作そのものを瞑想の対象にします。仏教の僧侶たちは食後の歩行瞑想を日課としており、現代の研究でもストレス軽減・集中力向上の効果が実証されています。',
  },
  {
    emoji: '🧠',
    title: 'なぜ効くの？',
    body: '歩くとき、私たちの脳は無意識にたくさんのことを処理しています。足裏の感覚、バランス、周囲の音...\n\nこれらに「意識的に」注意を向けることで、過去の後悔や未来の不安から離れ、「今ここ」に意識が集中します。\n\nたった5分間の歩行瞑想で、脳のストレスホルモン（コルチゾール）が平均23%低下するという研究結果もあります。',
  },
  {
    emoji: '✨',
    title: '歩禅の使い方',
    body: '① イヤホンをつける\n音声ガイドと自然の環境音が流れます。\n\n② いつもの道を歩くだけ\n通勤中でも散歩でもOK。特別な場所は不要です。\n\n③ 音声に身を任せる\n呼吸のタイミング、足の運び方を優しくガイドします。\n\n④ 5分間だけ\n最初は5分間から。慣れたら10分、15分と伸ばしていきましょう。',
  },
]

/* ─── localStorage helpers ─── */
function loadPreference<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const saved = localStorage.getItem(key)
    return saved ? (saved as unknown as T) : defaultValue
  } catch {
    return defaultValue
  }
}

/* ═════════════════════ Main Component ═════════════════════ */
export default function MeditationPage() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [onboardingPage, setOnboardingPage] = useState(0)
  const [selectedProgram, setSelectedProgram] = useState<MeditationProgram | null>(null)
  const [ambient, setAmbient] = useState<AmbientType>(() => loadPreference('hozen_ambient', 'forest') as AmbientType)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [steps, setSteps] = useState(0)
  const [currentGuide, setCurrentGuide] = useState<GuideStep | null>(null)
  const [breathPhase, setBreathPhase] = useState<'in' | 'out' | 'hold' | null>(null)
  const [voiceMuted, setVoiceMuted] = useState(false)
  const [voiceGender, setVoiceGender] = useState<VoiceGender>(() => loadPreference('hozen_voice_gender', 'female') as VoiceGender)
  const [countdown, setCountdown] = useState(-1)
  const [stats, setStats] = useState<SessionStats | null>(null)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepDetectorRef = useRef<StepDetector | null>(null)
  const voiceRef = useRef<VoiceGuide | null>(null)
  const ambientRef = useRef<HTMLAudioElement | null>(null)
  const guideIndexRef = useRef(0)
  const sessionSavedRef = useRef(false)

  // Load stats
  useEffect(() => {
    setStats(getStats())
  }, [screen])

  // Persist preferences
  useEffect(() => {
    try { localStorage.setItem('hozen_ambient', ambient) } catch {}
  }, [ambient])
  useEffect(() => {
    try { localStorage.setItem('hozen_voice_gender', voiceGender) } catch {}
  }, [voiceGender])

  // Check if onboarding already seen
  useEffect(() => {
    try {
      if (localStorage.getItem('hozen_onboarded') === '1') {
        setScreen('select')
      }
    } catch {}
  }, [])

  useEffect(() => {
    voiceRef.current = new VoiceGuide(voiceGender)
    return () => voiceRef.current?.stop()
  }, [])

  const finishOnboarding = () => {
    try { localStorage.setItem('hozen_onboarded', '1') } catch {}
    setScreen('select')
  }

  const switchVoiceGender = (gender: VoiceGender) => {
    setVoiceGender(gender)
    voiceRef.current?.setGender(gender)
  }

  /* ─── Save session ─── */
  const saveCurrentSession = useCallback(() => {
    if (sessionSavedRef.current || !selectedProgram) return
    sessionSavedRef.current = true
    saveSession({
      date: new Date().toISOString().slice(0, 10),
      programId: selectedProgram.id,
      durationSeconds: elapsed,
      steps,
      completedAt: new Date().toISOString(),
    })
    setStats(getStats())
  }, [selectedProgram, elapsed, steps])

  /* ─── Ambient audio ─── */
  const startAmbient = useCallback((type: AmbientType) => {
    if (ambientRef.current) {
      ambientRef.current.pause()
      ambientRef.current = null
    }
    if (type === 'none') return
    const audio = new Audio(`/audio/${type}.ogg`)
    audio.loop = true
    audio.volume = 0
    audio.play().catch(() => {})
    let vol = 0
    const fadeIn = setInterval(() => {
      vol += 0.02
      if (vol >= 0.35) { audio.volume = 0.35; clearInterval(fadeIn); return }
      audio.volume = vol
    }, 100)
    ambientRef.current = audio
  }, [])

  const stopAmbient = useCallback(() => {
    if (!ambientRef.current) return
    const audio = ambientRef.current
    let vol = audio.volume
    const fadeOut = setInterval(() => {
      vol -= 0.02
      if (vol <= 0) { audio.pause(); clearInterval(fadeOut); ambientRef.current = null; return }
      audio.volume = vol
    }, 80)
  }, [])

  /* ─── Meditation lifecycle ─── */
  const startMeditation = useCallback(async (program: MeditationProgram) => {
    if (program.isPremium) {
      window.location.href = '/pricing'
      return
    }

    // Unlock audio on user gesture (critical for iOS/Android)
    await voiceRef.current?.unlock()

    // Pre-cache guide audio for offline playback
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_GUIDES',
        gender: voiceRef.current?.getGender() || 'female',
      })
    }

    setSelectedProgram(program)
    setScreen('prepare')
    sessionSavedRef.current = false

    // 3-2-1 countdown
    setCountdown(3)
    for (let i = 3; i >= 1; i--) {
      await new Promise(r => setTimeout(r, 1000))
      setCountdown(i - 1)
    }

    setScreen('playing')
    setElapsed(0)
    setSteps(0)
    setIsPlaying(true)
    guideIndexRef.current = 0

    // Start ambient
    startAmbient(ambient)

    // Start step detector
    const detector = new StepDetector((count) => setSteps(count))
    stepDetectorRef.current = detector
    await detector.start()

    // First guide
    if (program.steps.length > 0) {
      setCurrentGuide(program.steps[0])
      setBreathPhase(program.steps[0].breathe || null)
      voiceRef.current?.speak(program.steps[0].speech, program.steps[0].fileKey)
    }
  }, [ambient, startAmbient])

  // Timer
  useEffect(() => {
    if (isPlaying && selectedProgram) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 1
          const totalSeconds = selectedProgram.duration * 60
          const programSteps = selectedProgram.steps
          const nextIndex = guideIndexRef.current + 1
          if (nextIndex < programSteps.length && next >= programSteps[nextIndex].time) {
            guideIndexRef.current = nextIndex
            setCurrentGuide(programSteps[nextIndex])
            setBreathPhase(programSteps[nextIndex].breathe || null)
            if (!voiceMuted) voiceRef.current?.speak(programSteps[nextIndex].speech, programSteps[nextIndex].fileKey)
          }
          if (next >= totalSeconds) {
            setIsPlaying(false)
            setScreen('complete')
            stepDetectorRef.current?.stop()
            stopAmbient()
            if (timerRef.current) clearInterval(timerRef.current)
          }
          return next
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPlaying, selectedProgram, voiceMuted, stopAmbient])

  // Save session when complete screen is shown
  useEffect(() => {
    if (screen === 'complete') {
      saveCurrentSession()
    }
  }, [screen, saveCurrentSession])

  const togglePlay = () => {
    if (isPlaying) {
      if (ambientRef.current) ambientRef.current.volume = 0.1
    } else {
      if (ambientRef.current) ambientRef.current.volume = 0.35
    }
    setIsPlaying(prev => !prev)
  }

  const stopMeditation = () => {
    setIsPlaying(false)
    stepDetectorRef.current?.stop()
    voiceRef.current?.stop()
    stopAmbient()
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

  /* ═══════════════ ONBOARDING ═══════════════ */
  if (screen === 'onboarding') {
    const slide = ONBOARDING_SLIDES[onboardingPage]
    const isLast = onboardingPage === ONBOARDING_SLIDES.length - 1
    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-lg mx-auto">
          <div className="text-7xl mb-8 float-animation">{slide.emoji}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center font-jp">
            {slide.title}
          </h2>
          <div className="text-white/80 text-base leading-relaxed whitespace-pre-line text-center">
            {slide.body}
          </div>
        </div>

        <div className="px-8 pb-12 max-w-lg mx-auto w-full">
          {/* Page dots */}
          <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="オンボーディングページ">
            {ONBOARDING_SLIDES.map((_, i) => (
              <div key={i} role="tab" aria-selected={i === onboardingPage} aria-label={`ページ ${i + 1}`} className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === onboardingPage ? 'bg-hozen-gold w-8' : 'bg-white/30'
              }`} />
            ))}
          </div>

          <button
            onClick={() => isLast ? finishOnboarding() : setOnboardingPage(p => p + 1)}
            aria-label={isLast ? 'はじめる' : '次のスライドへ'}
            className="w-full py-4 bg-hozen-gold text-hozen-dark font-bold rounded-full text-lg hover:bg-hozen-gold-light transition-all active:scale-95"
          >
            {isLast ? 'はじめる →' : '次へ'}
          </button>
          {!isLast && (
            <button onClick={finishOnboarding} aria-label="オンボーディングをスキップ" className="w-full mt-3 text-white/40 text-sm hover:text-white/60">
              スキップ
            </button>
          )}
        </div>
      </div>
    )
  }

  /* ═══════════════ PROGRAM SELECT ═══════════════ */
  if (screen === 'select') {
    return (
      <div className="min-h-screen bg-hozen-cream">
        <div className="max-w-lg mx-auto px-6 py-8">
          <Link href="/" aria-label="ホームに戻る" className="inline-flex items-center gap-2 text-hozen-green/60 hover:text-hozen-green mb-8">
            <BackIcon /><span>ホーム</span>
          </Link>

          <h1 className="text-3xl font-bold text-hozen-green mb-2 font-jp">歩禅プログラム</h1>
          <p className="text-hozen-dark/60 mb-6">今日の気分に合わせて選んでください</p>

          {/* Stats card */}
          {stats && stats.totalSessions > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-hozen-green/5 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-hozen-gold">{stats.streakDays}</div>
                  <div className="text-hozen-dark/40 text-xs mt-1">連続日数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hozen-gold">{stats.totalSessions}</div>
                  <div className="text-hozen-dark/40 text-xs mt-1">総セッション</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hozen-gold">{formatTotalTime(stats.totalSeconds)}</div>
                  <div className="text-hozen-dark/40 text-xs mt-1">累計時間</div>
                </div>
              </div>
            </div>
          )}

          {/* Ambient selector */}
          <div className="mb-8">
            <p className="text-sm font-medium text-hozen-dark/50 mb-3">環境音を選ぶ</p>
            <div className="flex gap-2 flex-wrap">
              {AMBIENTS.map(a => (
                <button
                  key={a.id}
                  onClick={() => setAmbient(a.id)}
                  aria-label={`${a.label}の環境音を選択`}
                  aria-pressed={ambient === a.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    ambient === a.id
                      ? 'bg-hozen-green text-white shadow-md'
                      : 'bg-white text-hozen-dark/60 border border-hozen-green/10 hover:border-hozen-green/30'
                  }`}
                >
                  {a.emoji} {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice gender selector */}
          <div className="mb-8">
            <p className="text-sm font-medium text-hozen-dark/50 mb-3">ナレーションの声</p>
            <div className="flex gap-2">
              <button
                onClick={() => switchVoiceGender('female')}
                aria-label="女性の声を選択"
                aria-pressed={voiceGender === 'female'}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  voiceGender === 'female'
                    ? 'bg-hozen-green text-white shadow-md'
                    : 'bg-white text-hozen-dark/60 border border-hozen-green/10 hover:border-hozen-green/30'
                }`}
              >
                👩 女性（Shiori）
              </button>
              <button
                onClick={() => switchVoiceGender('male')}
                aria-label="男性の声を選択"
                aria-pressed={voiceGender === 'male'}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  voiceGender === 'male'
                    ? 'bg-hozen-green text-white shadow-md'
                    : 'bg-white text-hozen-dark/60 border border-hozen-green/10 hover:border-hozen-green/30'
                }`}
              >
                👨 男性（Daichi）
              </button>
            </div>
          </div>

          {/* Free */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-hozen-green/60 uppercase tracking-wider mb-4">無料プログラム</h2>
            <div className="space-y-3">
              {FREE_PROGRAMS.map(p => (
                <button key={p.id} onClick={() => startMeditation(p)}
                  aria-label={`${p.title} ${p.duration}分`}
                  className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-hozen-green/5 active:scale-[0.98]">
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

          {/* Premium */}
          <div>
            <h2 className="text-sm font-semibold text-hozen-gold uppercase tracking-wider mb-4">プレミアム ✨</h2>
            <div className="space-y-3">
              {PREMIUM_PROGRAMS.map(p => (
                <button key={p.id} onClick={() => startMeditation(p)}
                  aria-label={`${p.title} ${p.duration}分 プレミアム`}
                  className="w-full text-left bg-white/60 rounded-2xl p-5 border border-hozen-gold/20 hover:border-hozen-gold/40 transition-all active:scale-[0.98]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-hozen-dark/80 text-lg font-jp">{p.title}</h3>
                      <p className="text-hozen-dark/40 text-sm mt-1">{p.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-hozen-dark/40">{p.duration}分</span>
                      <div className="w-10 h-10 bg-hozen-gold/10 rounded-full flex items-center justify-center text-hozen-gold"><LockIcon /></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-hozen-gold font-semibold hover:underline">
              プレミアムで全プログラム解放 →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ═══════════════ PREPARE (Countdown) ═══════════════ */
  if (screen === 'prepare') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green flex flex-col items-center justify-center px-6">
        <p className="text-white/60 text-lg mb-8 font-jp">深呼吸して、準備しましょう</p>
        <div className="w-32 h-32 rounded-full border-2 border-hozen-gold/40 flex items-center justify-center breathing-animation">
          <span className="text-6xl font-light text-white" aria-live="polite">
            {countdown > 0 ? countdown : '...'}
          </span>
        </div>
        <p className="text-white/40 mt-8 text-sm">イヤホンの装着を確認してください</p>
      </div>
    )
  }

  /* ═══════════════ PLAYING ═══════════════ */
  if (screen === 'playing' && selectedProgram) {
    const totalSeconds = selectedProgram.duration * 60
    const progress = elapsed / totalSeconds

    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green via-hozen-green-light to-hozen-green flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i}
              className="absolute rounded-full bg-white/5 breathing-animation"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 16}%`,
                animationDelay: `${i * 1.3}s`,
                animationDuration: `${6 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Stop */}
        <button onClick={stopMeditation} aria-label="瞑想を終了する" className="absolute top-8 right-6 text-white/30 hover:text-white/60 text-sm z-10">
          終了する
        </button>

        {/* Ambient label */}
        <div className="absolute top-8 left-6 text-white/20 text-sm z-10" aria-label={`環境音: ${AMBIENTS.find(a => a.id === ambient)?.label}`}>
          {AMBIENTS.find(a => a.id === ambient)?.emoji} {AMBIENTS.find(a => a.id === ambient)?.label}
        </div>

        {/* Breathing circle + timer */}
        <div className="relative mb-10 z-10">
          <div className={`w-52 h-52 rounded-full border-2 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            breathPhase === 'in'
              ? 'scale-125 border-hozen-gold/60 bg-hozen-gold/5'
              : breathPhase === 'out'
              ? 'scale-90 border-white/20 bg-white/3'
              : 'scale-100 border-white/15 bg-white/3'
          }`}>
            <div className="text-center">
              <div className="text-5xl font-light text-white tabular-nums" aria-live="off">{formatTime(elapsed)}</div>
              <div className="text-white/30 text-sm mt-1">/ {formatTime(totalSeconds)}</div>
            </div>
          </div>
          {/* Progress ring */}
          <svg className="absolute inset-0 w-52 h-52 -rotate-90" viewBox="0 0 208 208" aria-hidden="true">
            <circle cx="104" cy="104" r="98" fill="none" stroke="rgba(197,165,90,0.15)" strokeWidth="4" />
            <circle cx="104" cy="104" r="98" fill="none" stroke="#C5A55A" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 98}`}
              strokeDashoffset={`${2 * Math.PI * 98 * (1 - progress)}`}
              strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
        </div>

        {/* Guide text card */}
        <div className="text-center mb-10 min-h-[100px] z-10 max-w-sm">
          {currentGuide && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/10" aria-live="polite">
              <p className="text-white text-lg leading-relaxed font-light whitespace-pre-line">
                {currentGuide.text}
              </p>
              {breathPhase && (
                <p className="text-hozen-gold text-sm mt-3 font-medium">
                  {breathPhase === 'in' ? '🫁 吸って...' : breathPhase === 'out' ? '🫁 吐いて...' : '⏸️ 止めて...'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 z-10">
          <button onClick={toggleVoice} aria-label={voiceMuted ? '音声をオンにする' : '音声をオフにする'} className={`p-3 rounded-full transition-all ${voiceMuted ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white/70'}`}>
            {voiceMuted ? '🔇' : '🔊'}
          </button>
          <button onClick={togglePlay}
            aria-label={isPlaying ? '一時停止' : '再生'}
            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-95">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="p-3 rounded-full bg-white/10 text-white/70 text-sm min-w-[60px] text-center" aria-label={`歩数: ${steps}`}>
            🚶 {steps}
          </div>
        </div>

        {/* Step indicator */}
        <div className="absolute bottom-8 flex gap-1.5" aria-hidden="true">
          {[0,1,2].map(i => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              (steps % 4) > i ? 'bg-hozen-gold' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    )
  }

  /* ═══════════════ COMPLETE ═══════════════ */
  if (screen === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-hozen-green to-hozen-dark flex flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl mb-6 float-animation">🙏</div>
        <h1 className="text-3xl font-bold text-white mb-3 font-jp">お疲れさまでした</h1>
        <p className="text-white/50 text-lg mb-10">今日も一歩、心が整いました</p>

        {/* This session stats */}
        <div className="grid grid-cols-3 gap-6 mb-6 w-full max-w-xs">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="text-2xl font-bold text-hozen-gold">{formatTime(elapsed)}</div>
            <div className="text-white/40 text-xs mt-1">瞑想時間</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="text-2xl font-bold text-hozen-gold">{steps}</div>
            <div className="text-white/40 text-xs mt-1">歩数</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="text-2xl font-bold text-hozen-gold">{stats?.streakDays || 1}</div>
            <div className="text-white/40 text-xs mt-1">連続日数</div>
          </div>
        </div>

        {/* Cumulative stats */}
        {stats && stats.totalSessions > 1 && (
          <div className="bg-white/5 rounded-2xl p-4 mb-10 w-full max-w-xs border border-white/10">
            <p className="text-white/30 text-xs mb-3">累計記録</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-white/70">{stats.totalSessions}</div>
                <div className="text-white/30 text-xs">回</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white/70">{formatTotalTime(stats.totalSeconds)}</div>
                <div className="text-white/30 text-xs">累計</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white/70">{stats.totalSteps.toLocaleString()}</div>
                <div className="text-white/30 text-xs">歩</div>
              </div>
            </div>
          </div>
        )}

        {/* Today's insight */}
        {(!stats || stats.totalSessions <= 1) && (
          <div className="bg-white/5 rounded-2xl p-6 max-w-sm mb-10 border border-white/10">
            <p className="text-white/70 text-sm leading-relaxed italic">
              「歩く瞑想の要は、足の裏の感覚に気づくこと。それだけで、心は自然と静まります。」
            </p>
            <p className="text-white/30 text-xs mt-3">— ティク・ナット・ハン</p>
          </div>
        )}

        <div className="space-y-3 w-full max-w-xs">
          <button onClick={() => { setScreen('select'); setElapsed(0); setSteps(0) }}
            aria-label="もう一度瞑想する"
            className="w-full px-8 py-4 bg-hozen-gold text-hozen-dark font-semibold rounded-full text-lg hover:bg-hozen-gold-light transition-all active:scale-95">
            もう一度
          </button>
          <Link href="/pricing"
            className="w-full inline-block px-8 py-4 bg-white/10 text-white font-medium rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all text-center">
            プレミアムで更に深く →
          </Link>
          <Link href="/" aria-label="ホームに戻る" className="block text-white/30 hover:text-white/50 mt-4 text-sm">
            ホームに戻る
          </Link>
        </div>
      </div>
    )
  }

  return null
}
