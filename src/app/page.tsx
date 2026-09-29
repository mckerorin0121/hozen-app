'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getPrograms, MeditationProgram } from '@/lib/audio-guides'
import type { VoiceGender } from '@/lib/tts'
import { saveSession, getStats, localDate, SessionStats } from '@/lib/session-history'
import { useI18n } from '@/lib/i18n'
import { useMeditationSession, FinishedSession } from '@/hooks/useMeditationSession'
import HomeScreen from '@/components/app/HomeScreen'
import ProgramList from '@/components/app/ProgramList'
import SettingsSheet from '@/components/app/SettingsSheet'
import Player, { PrepareScreen } from '@/components/app/Player'
import CompleteScreen from '@/components/app/CompleteScreen'

const LAST_PROGRAM_KEY = 'hozen_last_program'
const COURSE_KEY = 'hozen_course_progress'

function readStorage(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function writeStorage(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch {}
}

export default function App() {
  const { locale, t } = useI18n()

  const [view, setView] = useState<'home' | 'list'>('home')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [gender, setGender] = useState<VoiceGender>('female')
  const [stats, setStats] = useState<SessionStats | null>(null)
  const [courseProgress, setCourseProgress] = useState<Set<string>>(new Set())
  const [lastProgramId, setLastProgramId] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)

  // localStorage is only available after mount
  useEffect(() => {
    setGender((readStorage('hozen_voice_gender') as VoiceGender) || 'female')
    setStats(getStats())
    setLastProgramId(readStorage(LAST_PROGRAM_KEY))
    setShowHint(readStorage('hozen_onboarded') !== '1')
    try {
      const saved = readStorage(COURSE_KEY)
      if (saved) setCourseProgress(new Set(JSON.parse(saved)))
    } catch {}
  }, [])

  const { free: programs, course } = useMemo(() => getPrograms(locale, (key) => t(key as any)), [locale, t])

  const isDayUnlocked = useCallback((index: number) =>
    index === 0 || courseProgress.has(`course-day${index}`), [courseProgress])

  // Next unfinished course day, then the last program used, then the first lesson
  const recommended = useMemo(() => {
    const nextDay = course.find((p, i) => !courseProgress.has(p.id) && isDayUnlocked(i))
    if (nextDay) return nextDay
    return [...programs, ...course].find(p => p.id === lastProgramId) ?? programs[0]
  }, [course, programs, courseProgress, lastProgramId, isDayUnlocked])

  const handleFinish = useCallback(({ program, elapsed, steps }: FinishedSession) => {
    saveSession({
      date: localDate(),
      programId: program.id,
      durationSeconds: elapsed,
      steps,
      completedAt: new Date().toISOString(),
    })
    if (program.id.startsWith('course-day')) {
      setCourseProgress(prev => {
        const next = new Set(prev).add(program.id)
        writeStorage(COURSE_KEY, JSON.stringify(Array.from(next)))
        return next
      })
    }
    setStats(getStats())
  }, [])

  const session = useMeditationSession(gender, locale, handleFinish)

  const begin = (program: MeditationProgram) => {
    writeStorage(LAST_PROGRAM_KEY, program.id)
    writeStorage('hozen_onboarded', '1')
    setLastProgramId(program.id)
    setShowHint(false)
    setView('home')
    session.start(program)
  }

  const changeGender = (g: VoiceGender) => {
    setGender(g)
    writeStorage('hozen_voice_gender', g)
  }

  if (session.phase === 'prepare') return <PrepareScreen countdown={session.countdown} />

  if (session.phase === 'playing' && session.program) {
    return (
      <Player program={session.program} guide={session.currentGuide} elapsed={session.elapsed}
        isPlaying={session.isPlaying} voiceMuted={session.voiceMuted}
        onTogglePlay={session.togglePlay} onToggleVoice={session.toggleVoice} onStop={session.stop} />
    )
  }

  if (session.phase === 'complete' && session.program) {
    const again = session.program
    return (
      <CompleteScreen elapsed={session.elapsed} steps={session.steps} streakDays={stats?.streakDays ?? 1}
        onHome={session.reset} onAgain={() => begin(again)} />
    )
  }

  return (
    <>
      {view === 'list' ? (
        <ProgramList programs={programs} course={course} completedDays={courseProgress}
          isDayUnlocked={isDayUnlocked} onSelect={begin} onBack={() => setView('home')} />
      ) : (
        <HomeScreen recommended={recommended} stats={stats} showHint={showHint}
          onDismissHint={() => { setShowHint(false); writeStorage('hozen_onboarded', '1') }}
          onStart={() => begin(recommended)} onOpenList={() => setView('list')}
          onOpenSettings={() => setSettingsOpen(true)} />
      )}
      <SettingsSheet open={settingsOpen} gender={gender} onGenderChange={changeGender}
        onClose={() => setSettingsOpen(false)} />
    </>
  )
}
