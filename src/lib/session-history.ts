'use client'

const STORAGE_KEY = 'hozen_sessions'

export interface SessionRecord {
  date: string           // YYYY-MM-DD
  programId: string
  durationSeconds: number
  steps: number
  completedAt: string    // ISO timestamp
}

export interface SessionStats {
  totalSessions: number
  totalSeconds: number
  totalSteps: number
  streakDays: number
  todaySessions: number
  thisWeekSessions: number
  lastSessionDate: string | null
}

export function saveSession(record: SessionRecord): void {
  try {
    const history = getHistory()
    history.push(record)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // localStorage unavailable or full
  }
}

export function getHistory(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getStats(): SessionStats {
  const history = getHistory()

  if (history.length === 0) {
    return {
      totalSessions: 0,
      totalSeconds: 0,
      totalSteps: 0,
      streakDays: 0,
      todaySessions: 0,
      thisWeekSessions: 0,
      lastSessionDate: null,
    }
  }

  const totalSessions = history.length
  const totalSeconds = history.reduce((sum, r) => sum + r.durationSeconds, 0)
  const totalSteps = history.reduce((sum, r) => sum + r.steps, 0)

  // Today's date in YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10)

  // Today's sessions
  const todaySessions = history.filter(r => r.date === today).length

  // This week's sessions (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekAgoStr = weekAgo.toISOString().slice(0, 10)
  const thisWeekSessions = history.filter(r => r.date >= weekAgoStr).length

  // Streak calculation
  const uniqueDates = Array.from(new Set(history.map(r => r.date))).sort().reverse()
  const lastSessionDate = uniqueDates[0] || null

  let streakDays = 0
  if (lastSessionDate) {
    // Check if the most recent session is today or yesterday
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().slice(0, 10)

    if (lastSessionDate === today || lastSessionDate === yesterdayStr) {
      // Walk backwards counting consecutive days
      const checkDate = new Date(lastSessionDate + 'T00:00:00')
      const dateSet = new Set(uniqueDates)

      for (let i = 0; i < 365; i++) {
        const dateStr = checkDate.toISOString().slice(0, 10)
        if (dateSet.has(dateStr)) {
          streakDays++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }
    // If the most recent session is older than yesterday, streak = 0
  }

  return {
    totalSessions,
    totalSeconds,
    totalSteps,
    streakDays,
    todaySessions,
    thisWeekSessions,
    lastSessionDate,
  }
}

export function formatTotalTime(seconds: number): string {
  if (seconds < 60) return `${seconds}秒`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}分`
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60
  return remainMinutes > 0 ? `${hours}時間${remainMinutes}分` : `${hours}時間`
}
