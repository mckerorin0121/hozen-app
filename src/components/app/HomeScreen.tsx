'use client'

import Link from 'next/link'
import type { MeditationProgram } from '@/lib/audio-guides'
import type { SessionStats } from '@/lib/session-history'
import { formatTotalTime } from '@/lib/session-history'
import { useI18n } from '@/lib/i18n'
import { ChevronIcon, SettingsIcon } from './icons'

interface Props {
  recommended: MeditationProgram
  stats: SessionStats | null
  showHint: boolean
  onDismissHint: () => void
  onStart: () => void
  onOpenList: () => void
  onOpenSettings: () => void
}

export default function HomeScreen({
  recommended, stats, showHint, onDismissHint, onStart, onOpenList, onOpenSettings,
}: Props) {
  const { locale, t } = useI18n()
  const hasHistory = !!stats && stats.totalSessions > 0

  return (
    <div className="min-h-[100dvh] bg-hozen-paper text-hozen-ink flex flex-col">
      <header className="safe-top px-6 pb-2 flex items-center justify-between max-w-md w-full mx-auto">
        <span className="font-serif text-lg tracking-widest">歩禅</span>
        <button onClick={onOpenSettings} aria-label={t('app_settings')}
          className="-mr-2 p-2 text-hozen-ink/50 hover:text-hozen-ink transition-colors">
          <SettingsIcon size={22} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 max-w-md w-full mx-auto">
        {showHint && (
          <div className="fade-in mb-10 border-l-2 border-hozen-moss/40 pl-4">
            <p className="text-sm leading-relaxed text-hozen-ink/70 whitespace-pre-line">{t('app_hint')}</p>
            <button onClick={onDismissHint} className="mt-3 text-sm text-hozen-moss underline underline-offset-4">
              {t('app_hint_ok')}
            </button>
          </div>
        )}

        <p className="text-xs tracking-[0.2em] text-hozen-ink/40 mb-3">{t('app_today')}</p>
        <h1 className="font-serif text-2xl leading-snug mb-1">{recommended.title}</h1>
        <p className="text-sm text-hozen-ink/50 mb-10">{recommended.subtitle}</p>

        <button onClick={onStart}
          className="w-full py-5 rounded-full bg-hozen-moss text-hozen-paper text-lg tracking-widest active:scale-[0.98] transition-transform">
          {t('app_start')}
        </button>

        <button onClick={onOpenList}
          className="mt-6 self-center inline-flex items-center gap-1 text-sm text-hozen-ink/60 hover:text-hozen-ink py-2">
          {t('app_other_programs')} <ChevronIcon size={16} />
        </button>
      </main>

      <footer className="safe-bottom px-6 max-w-md w-full mx-auto text-center">
        {hasHistory && (
          <p className="text-xs text-hozen-ink/45 mb-4 tabular-nums">
            {t('select_stats_streak')} {stats.streakDays}{locale === 'en' ? (stats.streakDays === 1 ? ' day' : ' days') : t('select_stats_streak_days')}
            {'  ·  '}{stats.totalSessions}{locale === 'en' ? ' ' : ''}{t('select_stats_sessions')}
            {'  ·  '}{t('select_stats_total_time')} {formatTotalTime(stats.totalSeconds, locale)}
          </p>
        )}
        <Link href="/about" className="text-xs text-hozen-ink/40 hover:text-hozen-ink/70 underline underline-offset-4">
          {t('app_about')}
        </Link>
      </footer>
    </div>
  )
}
